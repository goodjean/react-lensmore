import express, { Request } from "express";
import { ReqQuery, ReqQueryTest } from "./Lens/lens";
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

app.get("/products/list/:period", async (req, res) => {
  const { period } = req.params;
  res.json(await lensService.getLenslistByPeriod(period));
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

app.get("/search/results-keyword/:name", async (req, res) => {
  const { name } = req.params;
  res.json(await lensService.getLensitemListByKeyword(name));
});

app.get("/filter/result-items", async (req: Request<{}, {}, {}, ReqQuery>, res) => {
  const { period, color, graphic, price, brand } = req.query;
  res.json(await lensService.getFilteredLenslist(period, color, graphic, price, brand));
});

app.get("/my-page", async (req, res) => {
  console.log(req.headers.cookie);
  if (req.headers.cookie?.includes("connect.id")) {
    const [, connectId] = req.headers.cookie.split(";");
    const [, sessionId] = connectId.split("=");
    const userInfo = await lensService.getUserInfo(sessionId);
    if (userInfo) {
      res.json(userInfo);
    } else {
      res.json(false);
    }
  } else {
    res.json(false); //마이페이지에 대한 작업 userInfo 어떻게 넘길건지
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

app.get("/filter-test/result-items", async (req: Request<{}, {}, {}, ReqQueryTest>, res) => {
  const { period, color, graphic, price, brand } = req.query;
  const graphicValue = graphic.map((g) => ({ ...g, isPositive: JSON.parse(g.isPositive) }));
  const priceValue = price.map((p) => ({ ...p, isPositive: JSON.parse(p.isPositive) }));
  res.json(await lensService.getFilterLensTest(period, color, graphicValue, priceValue, brand));
});

app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});
