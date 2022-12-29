import axios from "axios";
import { IFilterLensTest } from "../types/lens";

export default class FilterApi {
  async getFilteredLensList(period: string[], color: string[], graphic: string[], price: string[], brand: string[]) {
    const res = await axios.get(`/filter/result-items`, {
      params: { period, color, graphic, price, brand },
    });
    return res.data;
  }

  async getTestFilterResult(
    period: string[],
    color: number[],
    graphic: { min: number; max: number; isPositive: boolean }[],
    price: { min: number; max: number; isPositive: boolean }[],
    brand: number[]
  ): Promise<IFilterLensTest[]> {
    const res = await axios.get(`/filter-test/result-items`, {
      params: { period, color, graphic, price, brand },
    });
    return res.data;
  }
}
