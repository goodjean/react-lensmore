import express, { Request } from "express";
import { ReqQuery, ReqQueryLensId, ReqQueryTest } from "./Lens/lens";
import LensService from "./Lens/lensService";

const app = express();
const port = 5000;

app.use(express.json());

const lensService = new LensService();
// app.get("/products/all-lens", async (req, res) => {
//   res.json(await lensService.getAllProducts());
// });

app.get("/brand-list", async (req, res) => {
  res.json(await lensService.getLensBrandList());
});

app.get("/day-list", async (req, res) => {
  res.json(await lensService.getLensDayList());
});

app.get("/color-list", async (req, res) => {
  res.json(await lensService.getLensColorList());
});

app.get("/search/results?keyword=keyword", (req, res) => {
  const { keyword } = req.query;
  console.log(keyword);
});

app.get("/promotion/products/:period", async (req, res) => {
  const { period } = req.params;
  res.json(await lensService.getPromotionProducts(period));
});

app.get("/products/all-period-list/:period", async (req, res) => {
  const { period } = req.params;
  res.json(await lensService.getLenslistByPeriod(period));
});

app.get("/products/period-list/:period/:page/:limit", async (req, res) => {
  const { period, page, limit } = req.params;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  res.json(await lensService.getLenslistByPeriodByOffset(period, pageNum, limitNum));
});

app.get("/products/list/:period/:brand", async (req, res) => {
  const { period, brand }: { period: string; brand: string } = req.params;
  const brandId = Number(brand);
  res.json(await lensService.getProductsByPeriodAndBrandId(period, brandId));
});

app.get("/product/detail/:id", async (req, res) => {
  const { id } = req.params;
  const lensId = Number(id);
  res.json(await lensService.getProductById(lensId));
});

app.get("/search/products/hot-keyword", async (req, res) => {
  res.json(await lensService.getProductsByHotKeyword());
});

app.get("/search/all-results-keyword/:name", async (req, res) => {
  const { name } = req.params;
  res.json(await lensService.getLensitemListByKeyword(name));
});

app.get("/search/results-keyword/:name/:page/:limit", async (req, res) => {
  const { name, page, limit } = req.params;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  res.json(await lensService.getLensitemListByKeywordByOffset(name, pageNum, limitNum));
});

app.get("/filter/all-results", async (req: Request<{}, {}, {}, ReqQuery>, res) => {
  const { period, color, graphic, price, brand } = req.query;
  const graphicValue = graphic.map((g) => ({ ...g, isPositive: JSON.parse(g.isPositive) }));
  const priceValue = price.map((p) => ({ ...p, isPositive: JSON.parse(p.isPositive) }));
  res.json(await lensService.getFilteredLenslist(period, color, graphicValue, priceValue, brand));
});

app.get("/filter/result-items", async (req: Request<{}, {}, {}, ReqQueryTest>, res) => {
  const { period, color, graphic, price, brand, page, limit } = req.query;
  const graphicValue = graphic.map((g) => ({ ...g, isPositive: JSON.parse(g.isPositive) }));
  const priceValue = price.map((p) => ({ ...p, isPositive: JSON.parse(p.isPositive) }));
  const pageNum = Number(page);
  const limitNum = Number(limit);
  res.json(
    await lensService.getFilteredLenslistByOffset(period, color, graphicValue, priceValue, brand, pageNum, limitNum)
  );
});

app.get("/my-page", async (req, res) => {
  if (req.headers.cookie?.includes("connect.id")) {
    const [, sessionId] = req.headers.cookie.split("=");
    const userId = await lensService.getUserId(sessionId);
    if (userId) {
      res.json(userId);
    } else {
      res.json(false);
    }
  } else {
    res.json(false); //마이페이지에 대한 작업 userInfo 어떻게 넘길건지
  }
});

app.get("/user/signin-check", async (req: Request<{}, {}, {}, ReqQueryLensId>, res) => {
  const { lensId } = req.query;
  const lensid = Number(lensId);
  if (req.headers.cookie?.includes("connect.id")) {
    const [, sessionId] = req.headers.cookie.split("=");
    const wishlist = await lensService.subscribeLens(sessionId, lensid);
    //해당 키를 가진 유저아이디를 통해 유저db에 일치하는 회원을 찾아 wishlist에 lens id추가 또는 삭제
    res.json(wishlist);
  } else {
    res.json(false);
  }
});

app.get("/products/wishlist", async (req, res) => {
  if (req.headers.cookie?.includes("connect.id")) {
    const [, sessionId] = req.headers.cookie.split("=");
    const lenslist = await lensService.getWishList(sessionId);
    res.json(lenslist);
  } else {
    res.json([]);
  }
});

app.get("/user/info", async (req: Request<{}, {}, {}, { id: string }>, res) => {
  const { id } = req.query;
  const userInfo = await lensService.getUserInfo(id);
  res.json(userInfo);
});

app.get("/user/wishlist-signin", async (req, res) => {
  if (req.headers.cookie?.includes("connect.id")) {
    const [, sessionId] = req.headers.cookie.split("=");
    const isSignin = await lensService.checkLogin(sessionId);
    res.json(isSignin);
  } else {
    res.json(false);
  }
});

app.post("/sign-in", async (req, res) => {
  const { userId, userPassword } = req.body;
  const sessionKey = await lensService.login(userId, userPassword);
  if (sessionKey) {
    res.setHeader("Set-Cookie", `connect.id=${sessionKey};path=/`);
    res.json(true);
  } else {
    res.json(false);
  }
});

app.post("/sign-up", async (req, res) => {
  const { userId, userPassword, userName } = req.body;
  res.json(lensService.signup(userId, userPassword, userName));
});

app.get("/sign-out", async (req, res) => {
  if (req.headers.cookie?.includes("connect.id")) {
    const [, sessionId] = req.headers.cookie.split("=");
    const response = await lensService.logout(sessionId);
    res.clearCookie("connect.id");
    res.json(response);
  } else {
    res.json(false);
  }
});

app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});
