import { RowDataPacket } from "mysql2";

export interface ILensEntity extends RowDataPacket {
  id: number;
  ref_id: number;
  name: string;
  color: string;
  color_img: string;
  price: number;
  mid_price: number;
  high_price: number;
  graphic: string;
  img: string;
  detail_img: string;
  eye_thumbnail: string;
  model_thumbnail: string;
  period: string;
  reviewcount: string;
  brand: string;
}

export interface IPromotionEntity extends RowDataPacket {
  id: number;
  name: string;
  model_thumbnail: string;
  period: string;
}

export interface ILensItemEntity extends RowDataPacket {
  id: number;
  name: string;
  price: number;
  img: string;
  period: string;
  reviewcount: number;
  brand: string;
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
  brand: string;
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
