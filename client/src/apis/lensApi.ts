import axios from "axios";
import { ILens } from "../types/lens";

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
  async getLenslistByPeriodAndBrand(period: string, brand: string) {
    const replacedPeriod = period.replace("/", "");
    const res = await axios.get(`products/list/${replacedPeriod}/${brand}`);
    return res.data;
  }
}
