import axios from "axios";
import { IPromotion } from "../types/promotion";

export default class PromotionApi {
  async getPromotionProductByPeriod(period: string) {
    const replacedPeriod = period.replace("/", "");
    const res = await axios.get(`/promotion/products/${replacedPeriod}`);
    return res.data;
  }
}
