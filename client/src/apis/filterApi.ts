import axios from "axios";

export default class FilterApi {
  async getFilteredLensList(
    period: string[],
    color: string[],
    graphic: string[],
    price: string[],
    brand: string[]
  ) {
    // const searchParams = new URLSearchParams(location.search);
    const res = await axios.get(`/filter/result-items`, {
      params: { period, color, graphic, price, brand },
    });
    return res.data;
  }
}
