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
}
