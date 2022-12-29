export interface ILens {
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

export interface IBrands {
  id: number;
  en_name: string;
  ko_name: string;
}

export interface IDays {
  id: number;
  en: string;
  ko: string;
}

export interface IColors {
  id: number;
  color: string;
}

export interface IPromotion {
  id: number;
  name: string;
  model_thumbnail: string;
  period_classifi: string;
}

export interface ILensItem {
  id: number;
  name: string;
  price: number;
  img: string;
  reviewcount: number;
}

export interface ILensDetail {
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
  brand: string;
}

export interface IHotKeyword {
  id: number;
  name: string;
  reviewcount: number;
}

export interface ILensItemByKeyword {
  id: number;
  name: string;
  price: number;
  img: string;
}

export interface IFilteredLensList {
  id: number;
  name: string;
  price: number;
  img: string;
}

export type ReqQuery = {
  period: string[];
  color: string[];
  graphic: string[];
  price: string[];
  brand: string[];
};

export type ReqQueryTest = {
  period: string[];
  color: number[];
  graphic: { min: number; max: number; isPositive: string }[];
  price: { min: number; max: number; isPositive: string }[];
  brand: number[];
};
