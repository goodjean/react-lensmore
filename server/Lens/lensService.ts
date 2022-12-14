import {
  IBrands,
  IColors,
  IDays,
  IHotKeyword,
  ILensDetail,
  ILensItem,
  ILensItemByKeyword,
  IPromotion,
} from "./lens";
import LensRepo from "./lensRepo";

export default class LensService {
  lensRepo = new LensRepo();

  // async getAllProducts() {
  //   return await this.lensRepo.getAllProducts();
  // }

  async getLensBrandList(): Promise<IBrands[]> {
    return await this.lensRepo.getLensBrandList();
  }

  async getLensDayList(): Promise<IDays[]> {
    return await this.lensRepo.getLensDayList();
  }

  async getLensColorList(): Promise<IColors[]> {
    return await this.lensRepo.getLensColorList();
  }

  async getPromotionProducts(period: string): Promise<IPromotion | undefined> {
    const promotionEntites = await this.lensRepo.getPromotionProducts(period);
    const promotion = promotionEntites.filter(
      (prom) => prom.model_thumbnail !== undefined
    );
    return promotion[2];
  }

  async getProductsByPeriodAndBrandId(
    period: string,
    brandId: number
  ): Promise<ILensItem[]> {
    const lensItems = await this.lensRepo.getProductsByPeriodAndBrandId(
      period,
      brandId
    );
    lensItems.sort(function (a, b) {
      return b.reviewcount - a.reviewcount;
    });
    const lensItemByPeriodAndBrand = lensItems.slice(0, 3);
    return lensItemByPeriodAndBrand;
  }

  async getProductById(id: number): Promise<ILensDetail | undefined> {
    const productListByid = await this.lensRepo.getProductById(id);
    const product = productListByid.find((lensDetail) => lensDetail.id === id);
    return product;
  }

  async getProductsByHotKeyword(): Promise<IHotKeyword[]> {
    const productListByHotKeyword = await (
      await this.lensRepo.getProductByHotKeyword()
    ).slice(0, 10);
    productListByHotKeyword.sort(function (a, b) {
      return b.reviewcount - a.reviewcount;
    });
    return productListByHotKeyword;
  }

  async getLensitemListByKeyword(name: string): Promise<ILensItemByKeyword[]> {
    const productList = await this.lensRepo.getLensitemListByKeyword();
    const productListByKeyword = productList?.filter((lens) =>
      lens.name.includes(name)
    );
    return productListByKeyword;
  }

  async getFilteredLenslist(
    period: string[],
    color: string[],
    graphic: string[],
    price: string[],
    brand: string[]
  ) {
    let graphicList: number[] = [];

    graphic.forEach((gp) => {
      if (gp === "13.7 ~") {
        graphicList = [13.7, 16];
      } else {
        const graphicSpl = gp.split("~");
        graphicList = graphicSpl.map((gp) => Number(gp));
      }
    });

    let priceList: number[] = [];

    price.forEach((pc) => {
      const priceRpl = pc.replace("원", "").replace("이상", "").trim();
      if (priceRpl === "30000") {
        priceList = [30000, 300000];
      } else {
      }
      const priceSpl = priceRpl.split("~");
      priceList = priceSpl.map((pc) => Number(pc));
    });
    return await this.lensRepo.getFilteredLenslist(
      period,
      color,
      graphicList,
      priceList,
      brand
    );
  }
}
