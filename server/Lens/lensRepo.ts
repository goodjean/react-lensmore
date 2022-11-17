import mysql from "mysql2";
import { resolve } from "path";
import dbConfig from "../dbconfig/database";
import { IHotKeyword, ILens, ILensDetail, ILensItem, ILensItemByKeyword, IPromotion } from "./lens";
import {
  IHotKeywordEntity,
  ILensDetailEntity,
  ILensEntity,
  ILensItemEntity,
  ILensItemEntityByKeyword,
  IPromotionEntity,
} from "./lensEntity";

const connection = mysql.createConnection(dbConfig);

export default class LensRepo {
  convertPeriodName(period: string): string {
    return period
      .replace(/1DAY/gi, "원데이")
      .replace(/1day/gi, "원데이")
      .replace(/2weeks/gi, "2주한달착용")
      .replace(/1month/gi, "2주한달착용")
      .replace(/3month/gi, "장기착용")
      .replace(/6month/gi, "장기착용")
      .replace(/1year/gi, "장기착용");
  }
  convertBrandName(brand: string): string {
    return brand.replace("olens", "오렌즈").replace("lenstown", "렌즈타운");
  }
  convertPromotionDomainModel(lensEntity: IPromotionEntity[]): IPromotion[] {
    return lensEntity.map((lens) => {
      const productPeriod = this.convertPeriodName(lens.period);
      return { id: lens.id, name: lens.name, model_thumbnail: lens.model_thumbnail, period: productPeriod };
    });
  }
  convertLensItemDomainModel(lensEntity: ILensItemEntity[]): ILensItem[] {
    return lensEntity.map((lens) => {
      const productPeriod = this.convertPeriodName(lens.period);
      const productBrand = this.convertBrandName(lens.brand);
      return {
        id: lens.id,
        name: lens.name,
        price: lens.price,
        img: lens.img,
        period: productPeriod,
        reviewcount: lens.reviewcount,
        brand: productBrand,
      };
    });
  }
  convertLensDetailDomainModel(lensEntity: ILensDetailEntity[]): ILensDetail[] {
    return lensEntity.map((lens) => {
      const productPeriod = this.convertPeriodName(lens.period);
      const productBrand = this.convertBrandName(lens.brand);
      return {
        id: lens.id,
        name: lens.name,
        color: lens.color,
        color_img: lens.color_img,
        price: lens.price,
        graphic: lens.graphic,
        detail_img: lens.detail_img,
        eye_thumbnail: lens.eye_thumbnail,
        model_thumbnail: lens.model_thumbnail,
        period: productPeriod,
        reviewcount: lens.reviewcount,
        brand: productBrand,
      };
    });
  }

  getAllProducts(): Promise<ILens[]> {
    return new Promise((resolve) => {
      connection.query<ILensEntity[]>("SELECT * FROM lens;", (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }
  getPromotionProducts(): Promise<IPromotion[]> {
    return new Promise((resolve) => {
      connection.query<IPromotionEntity[]>("SELECT id, name, model_thumbnail, period FROM lens;", (err, rows) => {
        if (err) throw err;
        resolve(this.convertPromotionDomainModel(rows));
      });
    });
  }
  getProductsByPeriodAndBrand(): Promise<ILensItem[]> {
    return new Promise((resolve) => {
      connection.query<ILensItemEntity[]>(
        "SELECT id, name, price, img, period, reviewcount, brand FROM lens;",
        (err, rows) => {
          if (err) throw err;
          resolve(this.convertLensItemDomainModel(rows));
        }
      );
    });
  }
  getProductById(id: number): Promise<ILensDetail[]> {
    return new Promise((resolve) => {
      connection.query<ILensDetailEntity[]>(
        `SELECT id, name, color, color_img, price, graphic, detail_img, eye_thumbnail, model_thumbnail, period, reviewcount, brand FROM lens WHERE id=${id};`,
        (err, rows) => {
          if (err) throw err;
          resolve(this.convertLensDetailDomainModel(rows));
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
      connection.query<ILensItemEntityByKeyword[]>("SELECT id, name, price, img FROM lens", (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }
}
