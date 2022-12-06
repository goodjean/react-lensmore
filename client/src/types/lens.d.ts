export interface ILens {
  id: number;
  title: string;
  color: string;
  graphicSize: number;
  name: string;
  price: number;
  period: string;
  img: string;
  brand: string;
  reviewCount: number;
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

export interface IHotKeyword {
  id: number;
  name: string;
  reviewcount: number;
}

export interface ILensItem {
  id: number;
  name: string;
  price: number;
  img: string;
  reviewcount: number;
}

export interface IFilterLens {
  id: number;
  name: string;
  color_img: string;
}
