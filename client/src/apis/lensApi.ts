import axios from "axios";
import { IBrands, IColors, IDays, ILens, ILensItem } from "../types/lens";

export default class LensApi {
  async getAllLensList(): Promise<Array<ILens>> {
    const res = await axios.get("/products/all-lens");
    const allLenslist = res.data;
    return allLenslist;
  }

  async getLenslistByPeriod(period: string): Promise<ILensItem[]> {
    const res = await axios.get(`/products/all-period-list/${period}`);
    return res.data;
  }

  async getLenslistByPeriodByOffset(period: string, page: number, limit: number): Promise<ILensItem[]> {
    const res = await axios.get(`/products/period-list/${period}/${page}/${limit}`);
    return res.data;
  }

  async getLenslistByPeriodAndBrand(period: string, brandId: number) {
    const res = await axios.get(`/products/list/${period}/${brandId}`);
    return res.data;
  }

  async getLensBrandList(): Promise<IBrands[]> {
    const res = await axios.get(`/brand-list`);
    return res.data;
  }

  async getLensDayList(): Promise<IDays[]> {
    const res = await axios.get("/day-list");
    return res.data;
  }

  async getLensColorList(): Promise<IColors[]> {
    const res = await axios.get("/color-list");
    return res.data;
  }

  async getLensListByWishList(): Promise<ILensItem[]> {
    const res = await axios.get("/products/wishlist");
    return res.data;
  }
}
