import axios from "axios";
import { IPromotion } from "../types/promotion";

export default class PromotionApi {
  async getPromotionProductByPeriod(period: string): Promise<IPromotion> {
    const res = await axios.get(`/promotion/products/${period}`);
    return res.data;
  }
}
