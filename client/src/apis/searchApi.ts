import axios from "axios";

export default class SearchApi {
  async getLenslistByHotKeyword() {
    const res = await axios.get("/search/products/hot-keyword");
    return res.data;
  }
  async getLensitemListByKeyword(name: string) {
    const res = await axios.get(`/search/results-keyword/${name}`);
    return res.data;
  }
}
