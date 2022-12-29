import axios from "axios";

export default class UserApi {
  async goMyPage() {
    const res = await axios.get("/my-page");
    return res.data;
  }
}
