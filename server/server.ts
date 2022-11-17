import express from "express";
import LensService from "./Lens/lensService";

const app = express();
const port = 5000;

app.use(express.json());

// const BrandName = {
//   OLens: "olens"
//   DDD: "",
// }
// enum 말고 const 로 type 정리 , cli & serveer 따로

const lens = [
  {
    id: 1,
    title: "비비링",
    color: "gray",
    graphicSize: 3.4,
    name: "비비링 그레이",
    price: 20000,
    period: "원데이",
    img: "https://mediaqa.o-lens.com/6613ddcb-3c63-424b-9e8f-31080d7c498c__613SUM.png",
    brand: "오렌즈",
    reviewCount: 43,
  },
  {
    id: 2,
    title: "글로이",
    color: "gray",
    graphicSize: 3.2,
    name: "글로이 그레이",
    price: 10000,
    period: "원데이",
    img: "https://mediaqa.o-lens.com/4f6f830b-e4bb-4d0f-b7b7-b676ad5a0ac9__612SUM.png",
    brand: "오렌즈",
    reviewCount: 40,
  },
  {
    id: 3,
    title: "비버",
    color: "gray",
    graphicSize: 3.4,
    name: "비비 그레이",
    price: 20000,
    period: "2주/한달착용",
    img: "https://mediaqa.o-lens.com/c0a7d103-aee4-4136-8f6d-a373b3d1bff8__french_gr_sum.png",
    brand: "렌즈타운",
    reviewCount: 20,
  },
  {
    id: 4,
    title: "말티",
    color: "gray",
    graphicSize: 3.5,
    name: "말티 그레이",
    price: 15000,
    period: "원데이",
    img: "https://mediaqa.o-lens.com/dcf616cb-b429-4e64-a030-3e67b7d6f318__146SUM.png",
    brand: "오렌즈",
    reviewCount: 20,
  },
  {
    id: 5,
    title: "홀팝",
    color: "gray",
    graphicSize: 3.5,
    name: "홀팝 그레이",
    price: 25000,
    period: "원데이",
    img: "https://lenstown.co.kr/goodsImage/3/detail_2/detail_2-1644223132.jpg",
    brand: "렌즈타운",
    reviewCount: 50,
  },
  {
    id: 6,
    title: "티티",
    color: "brown",
    graphicSize: 3.5,
    name: "티티 브라운",
    price: 25000,
    period: "원데이",
    img: "https://www.lens-me.com/web/product/medium/202208/124910f775b35fa75276a4e4bce8de24.jpg",
    brand: "렌즈미",
    reviewCount: 50,
  },
  {
    id: 7,
    title: "트로피칼",
    color: "gray",
    graphicSize: 3.5,
    name: "트로피칼 그레이",
    price: 25000,
    period: "원데이",
    img: "https://www.lens-me.com/web/product/medium/202201/237ec77f2465f3de63f3e4455e7a3b9d.jpg",
    brand: "렌즈미",
    reviewCount: 50,
  },
  {
    id: 8,
    title: "포포",
    color: "black",
    graphicSize: 3.5,
    name: "트로피칼 블랙",
    price: 25000,
    period: "원데이",
    img: "https://www.lens-me.com/web/product/medium/202109/42a843add34ac1bd7c7846e41bc74e62.jpg",
    brand: "렌즈미",
    reviewCount: 50,
  },
  {
    id: 9,
    title: "캉캉",
    color: "pink",
    graphicSize: 3.5,
    name: "캉캉 핑크",
    price: 25000,
    period: "원데이",
    img: "https://lenstown.co.kr/goodsImage/3/detail_2/detail_2-1644223132.jpg",
    brand: "렌즈타운",
    reviewCount: 50,
  },
  {
    id: 10,
    title: "호랑이",
    color: "black",
    graphicSize: 3.5,
    name: "호랑이 블랙",
    price: 25000,
    period: "원데이",
    img: "https://lenstown.co.kr/goodsImage/3/detail_2/detail_2-1644557506.jpg",
    brand: "렌즈타운",
    reviewCount: 50,
  },
  {
    id: 11,
    title: "비비링",
    color: "gray",
    graphicSize: 3.4,
    name: "비비링 그레이",
    price: 20000,
    period: "2주/한달착용",
    img: "https://mediaqa.o-lens.com/6613ddcb-3c63-424b-9e8f-31080d7c498c__613SUM.png",
    brand: "오렌즈",
    reviewCount: 43,
  },
  {
    id: 12,
    title: "글로이",
    color: "gray",
    graphicSize: 3.2,
    name: "글로이 그레이",
    price: 10000,
    period: "2주/한달착용",
    img: "https://mediaqa.o-lens.com/4f6f830b-e4bb-4d0f-b7b7-b676ad5a0ac9__612SUM.png",
    brand: "오렌즈",
    reviewCount: 40,
  },
  {
    id: 13,
    title: "말티",
    color: "gray",
    graphicSize: 3.5,
    name: "말티 그레이",
    price: 15000,
    period: "2주/한달착용",
    img: "https://mediaqa.o-lens.com/dcf616cb-b429-4e64-a030-3e67b7d6f318__146SUM.png",
    brand: "오렌즈",
    reviewCount: 20,
  },
  {
    id: 14,
    title: "홀팝",
    color: "gray",
    graphicSize: 3.5,
    name: "홀팝 그레이",
    price: 25000,
    period: "2주/한달착용",
    img: "https://lenstown.co.kr/goodsImage/3/detail_2/detail_2-1644223132.jpg",
    brand: "렌즈타운",
    reviewCount: 50,
  },
  {
    id: 15,
    title: "티티",
    color: "brown",
    graphicSize: 3.5,
    name: "티티 브라운",
    price: 25000,
    period: "2주/한달착용",
    img: "https://www.lens-me.com/web/product/medium/202208/124910f775b35fa75276a4e4bce8de24.jpg",
    brand: "렌즈미",
    reviewCount: 50,
  },
  {
    id: 16,
    title: "트로피칼",
    color: "gray",
    graphicSize: 3.5,
    name: "트로피칼 그레이",
    price: 25000,
    period: "2주/한달착용",
    img: "https://www.lens-me.com/web/product/medium/202201/237ec77f2465f3de63f3e4455e7a3b9d.jpg",
    brand: "렌즈미",
    reviewCount: 50,
  },
  {
    id: 17,
    title: "포포",
    color: "black",
    graphicSize: 3.5,
    name: "트로피칼 블랙",
    price: 25000,
    period: "2주/한달착용",
    img: "https://www.lens-me.com/web/product/medium/202109/42a843add34ac1bd7c7846e41bc74e62.jpg",
    brand: "렌즈미",
    reviewCount: 50,
  },
  {
    id: 18,
    title: "캉캉",
    color: "pink",
    graphicSize: 3.5,
    name: "캉캉 핑크",
    price: 25000,
    period: "2주/한달착용",
    img: "https://lenstown.co.kr/goodsImage/3/detail_2/detail_2-1644223132.jpg",
    brand: "렌즈타운",
    reviewCount: 50,
  },
  {
    id: 19,
    title: "호랑이",
    color: "black",
    graphicSize: 3.5,
    name: "호랑이 블랙",
    price: 25000,
    period: "2주/한달착용",
    img: "https://lenstown.co.kr/goodsImage/3/detail_2/detail_2-1644557506.jpg",
    brand: "렌즈타운",
    reviewCount: 50,
  },
  {
    id: 20,
    title: "트로피칼",
    color: "gray",
    graphicSize: 3.5,
    name: "트로피칼 그레이",
    price: 25000,
    period: "장기착용",
    img: "https://www.lens-me.com/web/product/medium/202201/237ec77f2465f3de63f3e4455e7a3b9d.jpg",
    brand: "렌즈미",
    reviewCount: 50,
  },
  {
    id: 21,
    title: "포포",
    color: "black",
    graphicSize: 3.5,
    name: "트로피칼 블랙",
    price: 25000,
    period: "장기착용",
    img: "https://www.lens-me.com/web/product/medium/202109/42a843add34ac1bd7c7846e41bc74e62.jpg",
    brand: "렌즈미",
    reviewCount: 50,
  },
  {
    id: 22,
    title: "캉캉",
    color: "pink",
    graphicSize: 3.5,
    name: "캉캉 핑크",
    price: 25000,
    period: "장기착용",
    img: "https://lenstown.co.kr/goodsImage/3/detail_2/detail_2-1644223132.jpg",
    brand: "렌즈타운",
    reviewCount: 50,
  },
  {
    id: 23,
    title: "호랑이",
    color: "black",
    graphicSize: 3.5,
    name: "호랑이 블랙",
    price: 25000,
    period: "장기착용",
    img: "https://lenstown.co.kr/goodsImage/3/detail_2/detail_2-1644557506.jpg",
    brand: "렌즈타운",
    reviewCount: 50,
  },
  {
    id: 24,
    title: "비비링",
    color: "gray",
    graphicSize: 3.4,
    name: "비비링 그레이",
    price: 20000,
    period: "장기착용",
    img: "https://mediaqa.o-lens.com/6613ddcb-3c63-424b-9e8f-31080d7c498c__613SUM.png",
    brand: "오렌즈",
    reviewCount: 43,
  },
  {
    id: 25,
    title: "글로이",
    color: "gray",
    graphicSize: 3.2,
    name: "글로이 그레이",
    price: 10000,
    period: "장기착용",
    img: "https://mediaqa.o-lens.com/4f6f830b-e4bb-4d0f-b7b7-b676ad5a0ac9__612SUM.png",
    brand: "오렌즈",
    reviewCount: 40,
  },
  {
    id: 26,
    title: "비버",
    color: "gray",
    graphicSize: 3.4,
    name: "비비 그레이",
    price: 20000,
    period: "장기착용",
    img: "https://mediaqa.o-lens.com/c0a7d103-aee4-4136-8f6d-a373b3d1bff8__french_gr_sum.png",
    brand: "렌즈타운",
    reviewCount: 20,
  },
  {
    id: 27,
    title: "말티",
    color: "gray",
    graphicSize: 3.5,
    name: "말티 그레이",
    price: 15000,
    period: "장기착용",
    img: "https://mediaqa.o-lens.com/dcf616cb-b429-4e64-a030-3e67b7d6f318__146SUM.png",
    brand: "오렌즈",
    reviewCount: 20,
  },
  {
    id: 28,
    title: "홀팝",
    color: "gray",
    graphicSize: 3.5,
    name: "홀팝 그레이",
    price: 25000,
    period: "장기착용",
    img: "https://lenstown.co.kr/goodsImage/3/detail_2/detail_2-1644223132.jpg",
    brand: "렌즈타운",
    reviewCount: 50,
  },
  {
    id: 29,
    title: "티티",
    color: "brown",
    graphicSize: 3.5,
    name: "티티 브라운",
    price: 25000,
    period: "장기착용",
    img: "https://www.lens-me.com/web/product/medium/202208/124910f775b35fa75276a4e4bce8de24.jpg",
    brand: "렌즈미",
    reviewCount: 50,
  },
];

//=====================================================================================

const promotionProducts = [
  {
    id: 1,
    contents: "Oneday viviring big sale event",
    thumbnailUrl:
      "https://mediaqa.o-lens.com/56d471b2-2bdc-4ab6-856f-d7fbb292d12e__%EB%A9%94%EC%9D%B8_%EC%83%81%EB%8B%A8%EB%B9%84%EC%A3%BC%EC%96%BC__686_858_%ED%94%84%EB%A0%8C%EC%B9%98%EA%B3%A8%EB%93%9C.jpg",
    kind: "원데이",
  },
  {
    id: 2,
    contents: "1Month item Autumn 50% sale",
    thumbnailUrl: "https://www.lens-me.com/web/upload/NNEditor/20220310/ea95a50ca7700963d35d1a8065da15c9.jpg",
    kind: "2주/한달착용",
  },
  {
    id: 3,
    contents: "Super Big Sale",
    thumbnailUrl: "https://lenstown.co.kr/_DATA_/banner_image/2fe6111a755a9d3f01633b630.jpg",
    kind: "장기착용",
  },
];

//=====================================================================================

const lensDetail = [
  {
    id: 1,
    title: "비비링",
    name: "비비링 그레이",
    color: "gray",
    graphicSize: 3.4,
    price: 20000,
    period: "원데이",
    reviewCount: 43,
    thumbnail: "https://mediaqa.o-lens.com/f8034ed1-bdfa-4bc6-bcee-5c626be126fe__656M1.png",
    imgs: [
      "https://media.o-lens.com/video/20220527/220527_re_1d_2.mp4",
      "https://s3.ap-northeast-2.amazonaws.com/images.qa/b00041bb-20d5-477a-b4bc-c56ee650d2ff",
    ],
    brand: "렌즈미",
    contents: "이렌즈는 눈이 빛나보이게 해주는 렌즈이다.",
  },
  {
    id: 2,
    title: "비비링",
    name: "비비링 브라운",
    color: "brown",
    graphicSize: 3.4,
    price: 20000,
    period: "원데이",
    reviewCount: 50,
    thumbnail: "https://mediaqa.o-lens.com/e15f46a9-9a43-4d43-960c-e8e24eca9b90__655M1.png",
    imgs: [
      "https://media.o-lens.com/video/20220527/220527_re_1d_2.mp4",
      "https://s3.ap-northeast-2.amazonaws.com/images.qa/b00041bb-20d5-477a-b4bc-c56ee650d2ff",
    ],
    brand: "렌즈미",
    contents: "이렌즈는 눈이 빛나보이게 해주는 렌즈이다.",
  },
  {
    id: 3,
    title: "비비링",
    name: "비비링 블랙",
    color: "black",
    graphicSize: 3.4,
    price: 20000,
    period: "원데이",
    reviewCount: 20,
    thumbnail: "https://mediaqa.o-lens.com/7a778f8d-0312-45c8-b01d-b2aa68f51b0a__167M1.jpg",
    imgs: [
      "https://media.o-lens.com/video/20220527/220527_re_1d_2.mp4",
      "https://s3.ap-northeast-2.amazonaws.com/images.qa/b00041bb-20d5-477a-b4bc-c56ee650d2ff",
    ],
    brand: "렌즈미",
    contents: "이렌즈는 눈이 빛나보이게 해주는 렌즈이다.",
  },
  {
    id: 4,
    title: "글로이",
    name: "글로이 그레이",
    color: "gray",
    graphicSize: 3.2,
    price: 10000,
    period: "원데이",
    reviewCount: 40,
    thumbnail: "url",
    imgs: ["url1", "url2"],
    brand: "오렌즈",
    contents: "이렌즈는 눈을 편한하게 해주는 눈물렌즈이다..",
  },
];

const lensService = new LensService();
app.get("/products/all-lens", async (req, res) => {
  res.json(await lensService.getAllProducts());
});

// app.get("/search/results?keyword=keyword", (req, res) => {
//   const {keyword} = req.query;
//   console.log(keyword);
// });

app.get("/promotion/products/:period", async (req, res) => {
  const { period } = req.params;
  res.json(await lensService.getPromotionProducts(period));
});

app.get("/products/list/:period/:brand", async (req, res) => {
  const { period, brand }: { period: string; brand: string } = req.params;
  res.json(await lensService.getProductsByPeriodAndBrand(period, brand));
});

app.get("/product/detail/:id", async (req, res) => {
  const { id } = req.params;
  const lensId = parseInt(id);
  res.json(await lensService.getProductById(lensId));
});

app.get("/search/products/hot-keyword", async (req, res) => {
  res.json(await lensService.getProductsByHotKeyword());
});

app.get("/search/results-keyword/:name", async (req, res) => {
  const { name } = req.params;
  res.json(await lensService.getLensitemListByKeyword(name));
});

app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});
