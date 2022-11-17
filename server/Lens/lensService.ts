import { IHotKeyword, ILensDetail, ILensItem, ILensItemByKeyword, IPromotion } from "./lens";
import LensRepo from "./lensRepo";

export default class LensService {
  lensRepo = new LensRepo();

  async getAllProducts() {
    return await this.lensRepo.getAllProducts();
  }
  async getPromotionProducts(period: string): Promise<IPromotion | undefined> {
    const promotionEntites = await this.lensRepo.getPromotionProducts();
    const promotion = promotionEntites.find((prom) => prom.period === period);
    return promotion;
  }
  async getProductsByPeriodAndBrand(period: string, brand: string): Promise<ILensItem[]> {
    const lensItems = await this.lensRepo.getProductsByPeriodAndBrand();
    const lensItemByPeriodAndBrand = lensItems.filter((lens) => lens.brand === brand && lens.period.includes(period));
    lensItemByPeriodAndBrand.sort(function (a, b) {
      return b.reviewcount - a.reviewcount;
    });
    return lensItemByPeriodAndBrand;
  }
  async getProductById(id: number): Promise<ILensDetail | undefined> {
    const productListByid = await this.lensRepo.getProductById(id);
    const product = productListByid.find((lensDetail) => lensDetail.id === id);
    return product;
  }
  async getProductsByHotKeyword(): Promise<IHotKeyword[]> {
    const productListByHotKeyword = await (await this.lensRepo.getProductByHotKeyword()).slice(0, 10);
    productListByHotKeyword.sort(function (a, b) {
      return b.reviewcount - a.reviewcount;
    });
    return productListByHotKeyword;
  }
  async getLensitemListByKeyword(name: string): Promise<ILensItemByKeyword[]> {
    const productList = await this.lensRepo.getLensitemListByKeyword();
    const productListByKeyword = productList?.filter((lens) => lens.name.includes(name));
    return productListByKeyword;
  }
}
