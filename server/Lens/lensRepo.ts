import mysql from "mysql2";
import dbConfig from "../dbconfig/database";
import {
  IBrands,
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

export default class LensRepo {
  convertLensDetailPageEntityToDomainModel(
    lensDetailPageEntity: ILensDetailEntity[]
  ): ILensDetail[] {
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
      connection.query<IBrandsEntity[]>(
        "SELECT * FROM brands;",
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
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

  getProductsByPeriodAndBrandId(
    period: string,
    brandId: number
  ): Promise<ILensItem[]> {
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
      connection.query<IHotKeywordEntity[]>(
        "SELECT id, name, reviewcount FROM lens;",
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
    });
  }

  getLensitemListByKeyword(): Promise<ILensItemByKeyword[]> {
    return new Promise((resolve) => {
      connection.query<ILensItemEntityByKeyword[]>(
        "SELECT id, name, price, img FROM lens;",
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
    });
  }

  //   getFilteredLenslist(
  //     period: string[],
  //     color: string[],

  //     brand: string[]
  //   ): Promise<IFilteredLensList[]> {
  //     return new Promise((resolve) => {
  //       connection.query<IFilteredLensListEntity[]>(
  //         `SELECT id, name, color_img FROM lens WHERE period_classifi IN ("${period[0]}", "${period[1]}", "${period[2]}") AND color IN ("${color[0]}", "${color[1]}", "${color[2]}", "${color[3]}", "${color[4]}", "${color[5]}", "${color[6]}") AND brand IN("${brand[0]}", "${brand[1]}", "${brand[2]}");`, //graphic은 min max 저장으로 맞추고 db에서 period ... 들고오기.
  //         (err, rows) => {
  //           if (err) throw err;
  //           resolve(rows);
  //         }
  //       );
  //     });
  //   }
}
