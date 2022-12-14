import { RowDataPacket } from "mysql2";

export interface ILensEntity extends RowDataPacket {
  id: number;
  ref_id: number;
  name: string;
  color: string;
  color_img: string;
  price: number;
  graphic: number;
  img: string;
  detail_img: string;
  eye_thumbnail: string;
  model_thumbnail: string;
  period: string;
  period_classifi: string;
  reviewcount: string;
  brand: string;
}

export interface IBrandsEntity extends RowDataPacket {
  id: number;
  en_name: string;
  ko_name: string;
}

export interface IDaysEntity extends RowDataPacket {
  id: number;
  en: string;
  ko: string;
}

export interface IColorsEntity extends RowDataPacket {
  id: number;
  color: string;
}

export interface IPromotionEntity extends RowDataPacket {
  id: number;
  name: string;
  model_thumbnail: string;
  period_classifi: string;
}

export interface ILensItemEntity extends RowDataPacket {
  id: number;
  name: string;
  price: number;
  img: string;
  reviewcount: number;
}

export interface ILensDetailEntity extends RowDataPacket {
  id: number;
  name: string;
  color: string;
  color_img: string;
  price: number;
  graphic: string;
  detail_img: string;
  eye_thumbnail: string;
  model_thumbnail: string;
  period: string;
  reviewcount: string;
  page_url: string;
  ko_name: string;
}

export interface IHotKeywordEntity extends RowDataPacket {
  id: number;
  name: string;
  reviewcount: number;
}

export interface ILensItemEntityByKeyword extends RowDataPacket {
  id: number;
  name: string;
  price: number;
  img: string;
}

export interface IFilteredLensListEntity extends RowDataPacket {
  id: number;
  name: string;
  price: number;
  img: string;
}
