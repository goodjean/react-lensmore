import {
  IBrands,
  IColors,
  IDays,
  IFilteredLensList,
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
    const promotion = promotionEntites.filter((prom) => prom.model_thumbnail !== undefined);
    return promotion[3];
  }

  async getLenslistByPeriod(period: string): Promise<ILensItemByKeyword[]> {
    const lenslistByPeriod = await this.lensRepo.getLenslistByPeriod(period);
    return lenslistByPeriod;
  }

  async getLenslistByPeriodByOffset(period: string, page: number, limit: number): Promise<ILensItemByKeyword[]> {
    const lenslistByPeriod = await this.lensRepo.getLenslistByPeriodByOffset(period, page, limit);
    return lenslistByPeriod;
  }

  async getProductsByPeriodAndBrandId(period: string, brandId: number): Promise<ILensItem[]> {
    const lensItems = await this.lensRepo.getProductsByPeriodAndBrandId(period, brandId);
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

  async getLensitemListByKeywordByOffset(name: string, page: number, limit: number): Promise<ILensItemByKeyword[]> {
    const productListByKeywordByOffset = await this.lensRepo.getLensitemListByKeywordByOffset(name, page, limit);
    return productListByKeywordByOffset;
  }

  async getFilteredLenslist(
    period: string[],
    color: number[],
    graphic: { min: number; max: number; isPositive: boolean }[],
    price: { min: number; max: number; isPositive: boolean }[],
    brand: number[]
  ): Promise<IFilteredLensList[]> {
    return await this.lensRepo.getFilteredLenslist(period, color, graphic, price, brand);
  }

  async getFilteredLenslistByOffset(
    period: string[],
    color: number[],
    graphic: { min: number; max: number; isPositive: boolean }[],
    price: { min: number; max: number; isPositive: boolean }[],
    brand: number[],
    page: number,
    limit: number
  ): Promise<IFilteredLensList[]> {
    return await this.lensRepo.getFilteredLenslistByOffset(period, color, graphic, price, brand, page, limit);
  }

  async login(userId: string, userPassword: string) {
    const userInfo = this.lensRepo.login(userId, userPassword);
    return userInfo;
  }

  async getUserInfo(sessionId: string) {
    const userInfo = this.lensRepo.getUserId(sessionId);
    console.log(userInfo);
    return userInfo;
  }

  signup(userId: string, userPassword: string, userName: string): boolean {
    const userInfo = this.lensRepo.signup(userId, userPassword, userName);
    if (userInfo.id === userId) {
      return true;
    } else {
      return false;
    }
  }
}
