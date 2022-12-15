import express, { Request } from "express";
import { ReqQuery } from "./Lens/lens";
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

app.get(
  "/filter/result-items",
  async (req: Request<{}, {}, {}, ReqQuery>, res) => {
    const { period, color, graphic, price, brand } = req.query;
    console.log(period, color, graphic, price, brand);
    res.json(
      await lensService.getFilteredLenslist(
        period,
        color,
        graphic,
        price,
        brand
      )
    );
  }
);

app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});
