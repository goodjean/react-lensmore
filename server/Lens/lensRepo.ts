import mysql from "mysql2";
import dbConfig from "../dbconfig/database";
import {
  IBrands,
  IColors,
  IDays,
  IFilteredLensList,
  IHotKeyword,
  ILens,
  ILensDetail,
  ILensItem,
  ILensItemByKeyword,
  IPromotion,
} from "./lens";
import {
  IBrandsEntity,
  IColorsEntity,
  IDaysEntity,
  IFilteredLensListEntity,
  IHotKeywordEntity,
  ILensDetailEntity,
  ILensEntity,
  ILensItemEntity,
  ILensItemEntityByKeyword,
  IPromotionEntity,
} from "./lensEntity";

const connection = mysql.createConnection(dbConfig);

const users: { id: string; password: string; name: string; wishlist: number[] }[] = [];

const session: {
  [key: string]: { id: string };
} = {}; /////배열로 바꾸기

export default class LensRepo {
  convertLensDetailPageEntityToDomainModel(lensDetailPageEntity: ILensDetailEntity[]): ILensDetail[] {
    return lensDetailPageEntity.map((ld) => ({
      id: ld.id,
      name: ld.name,
      color: ld.color,
      color_img: ld.color_img,
      price: ld.price,
      graphic: ld.graphic,
      detail_img: ld.detail_img,
      eye_thumbnail: ld.eye_thumbnail,
      model_thumbnail: ld.model_thumbnail,
      period: ld.period,
      reviewcount: ld.reviewcount,
      page_url: ld.page_url,
      brand: ld.ko_name,
    }));
  }

  getAllProducts(): Promise<ILens[]> {
    return new Promise((resolve) => {
      connection.query<ILensEntity[]>("SELECT * FROM lens;", (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }

  getLensBrandList(): Promise<IBrands[]> {
    return new Promise((resolve) => {
      connection.query<IBrandsEntity[]>("SELECT * FROM brands;", (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }

  getLensDayList(): Promise<IDays[]> {
    return new Promise((resolve) => {
      connection.query<IDaysEntity[]>("SELECT * FROM days;", (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }

  getLensColorList(): Promise<IColors[]> {
    return new Promise((resolve) => {
      connection.query<IColorsEntity[]>("SELECT * FROM colors;", (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }

  getPromotionProducts(period: string): Promise<IPromotion[]> {
    return new Promise((resolve) => {
      connection.query<IPromotionEntity[]>(
        `SELECT id, name, model_thumbnail, period_classifi FROM lens WHERE period_classifi=?;`,
        [period],
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
    });
  }

  getLenslistByPeriod(period: string): Promise<ILensItemByKeyword[]> {
    return new Promise((resolve) => {
      connection.query<ILensItemEntityByKeyword[]>(
        `SELECT id, name, price, img FROM lens WHERE period_classifi=?`,
        [period],
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
    });
  }

  getLenslistByPeriodByOffset(period: string, page: number, limit: number): Promise<ILensItemByKeyword[]> {
    return new Promise((resolve) => {
      connection.query<ILensItemEntityByKeyword[]>(
        `SELECT id, name, price, img FROM lens WHERE period_classifi=? LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
        [period],
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
    });
  }

  getProductsByPeriodAndBrandId(period: string, brandId: number): Promise<ILensItem[]> {
    return new Promise((resolve) => {
      connection.query<ILensItemEntity[]>(
        `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi=? AND brand_id=?;`,
        [period, brandId],
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
    });
  }

  getProductById(id: number): Promise<ILensDetail[]> {
    return new Promise((resolve) => {
      connection.query<ILensDetailEntity[]>(
        `SELECT lens.id, name, color, color_img, price, graphic, detail_img, eye_thumbnail, model_thumbnail, period, reviewcount, page_url, ko_name FROM lens LEFT JOIN brands ON lens.brand_id = brands.id WHERE lens.id=${id};`,
        (err, rows) => {
          if (err) throw err;
          resolve(this.convertLensDetailPageEntityToDomainModel(rows));
        }
      );
    });
  }

  getProductByHotKeyword(): Promise<IHotKeyword[]> {
    return new Promise((resolve) => {
      connection.query<IHotKeywordEntity[]>("SELECT id, name, reviewcount FROM lens;", (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }

  getLensitemListByKeyword(): Promise<ILensItemByKeyword[]> {
    return new Promise((resolve) => {
      connection.query<ILensItemEntityByKeyword[]>("SELECT id, name, price, img FROM lens;", (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }

  getLensitemListByKeywordByOffset(name: string, page: number, limit: number): Promise<ILensItemByKeyword[]> {
    const query = "%" + name + "%";
    return new Promise((resolve) => {
      connection.query<ILensItemEntityByKeyword[]>(
        `SELECT id, name, price, img FROM lens WHERE name LIKE ? LIMIT ${limit} OFFSET ${(page - 1) * limit};`,
        [query],
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
    });
  }

  getFilteredLenslist(
    period: string[],
    color: number[],
    graphic: { min: number; max: number; isPositive: boolean }[],
    price: { min: number; max: number; isPositive: boolean }[],
    brand: number[]
  ): Promise<IFilteredLensList[]> {
    return new Promise((resolve) => {
      if (!graphic[0].isPositive) {
        if (!price[0].isPositive) {
          connection.query<IFilteredLensListEntity[]>(
            `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
              (p) => `"${p}"`
            )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
              (b) => `"${b}"`
            )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
              price[0].max
            } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
              graphic[0].max
            } as unsigned);`,
            (err, rows) => {
              if (err) throw err;
              resolve(rows);
            }
          );
        } else {
          ///해야할것 graphic 소수점 고치기, 부정문 긍정문(posi, nega에 따른 between, not between, css, 원래 필터에 옮기기, brand페이지, 혹시 안되면 result페이지에 있는거 다 되돌리기)
          connection.query<IFilteredLensListEntity[]>(
            `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
              (p) => `"${p}"`
            )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
              (b) => `"${b}"`
            )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
              price[0].max
            } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
              graphic[0].max
            } as unsigned);`,
            (err, rows) => {
              if (err) throw err;
              resolve(rows);
            }
          );
        }
      } else if (!price[0].isPositive) {
        connection.query<IFilteredLensListEntity[]>(
          `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned);`,
          (err, rows) => {
            if (err) throw err;
            resolve(rows);
          }
        );
      } else {
        connection.query<IFilteredLensListEntity[]>(
          `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned);`,
          (err, rows) => {
            if (err) throw err;
            resolve(rows);
          }
        );
      }
    });
  }

  getFilteredLenslistByOffset(
    period: string[],
    color: number[],
    graphic: { min: number; max: number; isPositive: boolean }[],
    price: { min: number; max: number; isPositive: boolean }[],
    brand: number[],
    page: number,
    limit: number
  ): Promise<IFilteredLensList[]> {
    return new Promise((resolve) => {
      if (!graphic[0].isPositive) {
        if (!price[0].isPositive) {
          connection.query<IFilteredLensListEntity[]>(
            `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
              (p) => `"${p}"`
            )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
              (b) => `"${b}"`
            )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
              price[0].max
            } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
              graphic[0].max
            } as unsigned) LIMIT ${limit} OFFSET ${(page - 1) * limit};`,
            (err, rows) => {
              if (err) throw err;
              resolve(rows);
            }
          );
        } else {
          ///해야할것 graphic 소수점 고치기, 부정문 긍정문(posi, nega에 따른 between, not between, css, 원래 필터에 옮기기, brand페이지, 혹시 안되면 result페이지에 있는거 다 되돌리기)
          connection.query<IFilteredLensListEntity[]>(
            `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
              (p) => `"${p}"`
            )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
              (b) => `"${b}"`
            )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
              price[0].max
            } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
              graphic[0].max
            } as unsigned) LIMIT ${limit} OFFSET ${(page - 1) * limit};`,
            (err, rows) => {
              if (err) throw err;
              resolve(rows);
            }
          );
        }
      } else if (!price[0].isPositive) {
        connection.query<IFilteredLensListEntity[]>(
          `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned) LIMIT ${limit} OFFSET ${(page - 1) * limit};`,
          (err, rows) => {
            if (err) throw err;
            resolve(rows);
          }
        );
      } else {
        connection.query<IFilteredLensListEntity[]>(
          `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned) LIMIT ${limit} OFFSET ${(page - 1) * limit};`,
          (err, rows) => {
            if (err) throw err;
            resolve(rows);
          }
        );
      }
    });
  }

  login(userId: string, userPassword: string): string | boolean {
    const user = users.find((u) => u.id === userId && u.password === userPassword);
    if (user) {
      const privateKey = String(Math.floor(Math.random() * 1000000000));
      session[privateKey] = { id: user.id };
      return privateKey;
    } else {
      return false;
    }
  }

  getUserId(sessionId: string) {
    const userId = session[sessionId];
    console.log("[sss]", userId);
    const userInfo = users.find((user) => user.id === userId?.id);
    return userInfo?.id;
  }

  getUserInfo(id: string) {
    const userInfo = users.find((user) => user.id === id);
    return { id: userInfo?.id, name: userInfo?.name };
  }

  signup(userId: string, userPassword: string, userName: string): { id: string; password: string; name: string } {
    console.log(users);
    let newUser = { id: userId, password: userPassword, name: userName, wishlist: [] };
    users.push(newUser);
    return newUser;
  }

  subscribeLens(sessionId: string, lensId: number) {
    const userId = session[sessionId];
    const foundUser = users.find((user) => user.id === userId.id);

    if (!foundUser?.wishlist.includes(lensId)) {
      foundUser?.wishlist.push(lensId);
    } else {
      foundUser?.wishlist.forEach((lenid, index) => {
        if (lenid === lensId) {
          foundUser.wishlist.splice(index, 1);
        }
      });
    }
    return foundUser?.wishlist; //
  }

  checkLogin(sessionId: string) {
    const sessionCheck = session.hasOwnProperty(sessionId);
    return sessionCheck;
  }

  getWishList(sessionId: string): Promise<ILensItemByKeyword[]> {
    const userId = session[sessionId];
    const foundUser = users.find((user) => user.id === userId.id);
    const wishListId = foundUser?.wishlist;

    return new Promise((resolve) => {
      if (wishListId?.length) {
        connection.query<ILensItemEntityByKeyword[]>(
          `SELECT id, name, price, img FROM lens WHERE id IN (${wishListId.map((p) => `"${p}"`)})`,
          (err, rows) => {
            if (err) throw err;
            resolve(rows);
          }
        );
      } else {
        resolve([]);
      }
    });
  }

  logout(sessionId: string): string {
    delete session[sessionId];
    return "success";
  }
}
