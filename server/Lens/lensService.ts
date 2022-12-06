import {
  IBrands,
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

  // async getFilteredLenslist(
  //   periodList: string,
  //   colorList: string,
  //   graphicList: string,
  //   priceList: string,
  //   brandList: string
  // ) {
  //   const period = JSON.parse(periodList);
  //   const color = JSON.parse(colorList);
  //   // const graphic = JSON.parse(graphicList);
  //   // const price = JSON.parse(priceList);
  //   const brand = JSON.parse(brandList);

  //   const period_class = period.map((p: string) =>
  //     p
  //       .replace("원데이", "oneday")
  //       .replace("2주/한달착용", "weekly-1month")
  //       .replace("장기착용", "long-term")
  //   );
  //   const brand_class = brand.map((b: string) =>
  //     b
  //       .replace("오렌즈", "olens")
  //       .replace("렌즈미", "lensme")
  //       .replace("렌즈타운", "lenstown")
  //   );

  //   return await this.lensRepo.getFilteredLenslist(
  //     period_class,
  //     color,
  //     // graphic , price는 어케함 ㅠㅜ
  //     brand_class
  //   );
  // }
}
