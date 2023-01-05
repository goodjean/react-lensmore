import axios from "axios";

export default class SearchApi {
  async getLenslistByHotKeyword() {
    const res = await axios.get("/search/products/hot-keyword");
    return res.data;
  }
  async getLensitemListByKeyword(name: string) {
    const res = await axios.get(`/search/all-results-keyword/${name}`);
    return res.data;
  }
  async getLensitemListByKeywordByOffset(name: string, page: number, limit: number) {
    const res = await axios.get(`/search/results-keyword/${name}/${page}/${limit}`);
    return res.data;
  }
}
