import axios from "axios";
import { ILensDetail } from "../types/lensDetail";

export default class LensDetailApi {
  async getLensDetailById(id: string): Promise<ILensDetail> {
    const res = await axios.get(`/product/detail/${id}`);
    const lensDetail = res.data;
    return lensDetail;
  }
  async getLensDetailByTitle(title: string): Promise<ILensDetail[]> {
    const res = await axios.get(`/product/detail-list/${title}`);
    const lensDetail = res.data;
    return lensDetail;
  }
}
