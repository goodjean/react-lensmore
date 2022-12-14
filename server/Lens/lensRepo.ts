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

  getLensColorList(): Promise<IColors[]> {
    return new Promise((resolve) => {
      connection.query<IColorsEntity[]>(
        "SELECT * FROM colors;",
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
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

  getFilteredLenslist(
    period: string[],
    color: string[],
    graphic: number[],
    price: number[],
    brand: string[]
  ): Promise<IFilteredLensList[]> {
    return new Promise((resolve) => {
      connection.query<IFilteredLensListEntity[]>(
        `SELECT lens.id, name, price, img FROM lens LEFT JOIN days ON lens.period_classifi = days.en LEFT JOIN colors ON lens.color_id = colors.id LEFT JOIN brands ON lens.brand_id = brands.id WHERE days.ko IN (${period.map(
          (p) => `"${p}"`
        )}) AND colors.color IN (${color.map(
          (c) => `"${c}"`
        )}) AND brands.ko_name IN (${brand.map(
          (b) => `"${b}"`
        )}) AND lens.price >= cast(${
          price[0]
        } as unsigned) AND lens.price < cast(${
          price[1]
        } as unsigned) AND lens.graphic >= cast(${
          graphic[0]
        } as unsigned) AND lens.graphic <= cast(${graphic[1]} as unsigned);`,
        (err, rows) => {
          if (err) throw err;
          console.log(rows);
          resolve(rows);
        }
      );
    });
  }
}
