import axios from "axios";
import { IBrands, IDays, ILens } from "../types/lens";

export default class LensApi {
  async getAllLensList(): Promise<Array<ILens>> {
    const res = await axios.get("/products/all-lens");
    const allLenslist = res.data;
    return allLenslist;
  }
  // async getLenslistByPeriod(period: string) {
  //   const allLenslist = await this.getAllLensList();
  //   const lenslistByPeriod = allLenslist.filter((lens) => lens.period === period);
  //   return lenslistByPeriod;
  // }
  async getLenslistByPeriodAndBrand(period: string, brandId: number) {
    const res = await axios.get(`products/list/${period}/${brandId}`);
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
}
