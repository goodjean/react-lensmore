import axios from "axios";

export default class UserApi {
  async goMyPage() {
    const res = await axios.get("/my-page");
    return res.data;
  }

  async getUserInfo(state: string) {
    const res = await axios.get("/user/info", { params: { id: state } });
    return res.data;
  }

  async logout(): Promise<boolean | string> {
    const res = await axios.get("/sign-out");
    return res.data;
  }

  async subscribeLens(lensId: number): Promise<boolean | number[]> {
    const res = await axios.get("/user/signin-check", { params: { lensId } });
    return res.data;
  }

  async checkLogin() {
    const res = await axios.get("/user/wishlist-signin");
    return res.data;
  }
}
