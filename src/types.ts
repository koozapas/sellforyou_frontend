export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type SignInType = {
  __typename?: "SignInType";
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["Int"];
  email: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
  state: UserState;
  master?: Scalars["Int"];
  masterUserId?: Scalars["Int"];
  naverId?: Maybe<Scalars["String"]>;
  kakaoId?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  product: Array<Product>;
  userInfo?: Maybe<UserInfo>;
  userLog: Array<UserLog>;
  purchaseInfo: UserPurchaseInfo;
  productCount: Scalars["Int"];
  connectedUsers: Maybe<Array<Maybe<User>>>;
  refCode: Scalars["String"];
  refAvailable: Scalars["Boolean"];
  credit: Scalars["Int"];
};

export type UserProductArgs = {
  where?: Maybe<ProductWhereInput>;
  orderBy?: Maybe<Array<ProductOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductWhereUniqueInput>;
};

export type UserUserLogArgs = {
  where?: Maybe<UserLogWhereInput>;
  orderBy?: Maybe<Array<UserLogOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<UserLogWhereUniqueInput>;
};

export type UserInfo = {
  __typename?: "UserInfo";
  userId: Scalars["Int"];
  phone?: Maybe<Scalars["String"]>;
  marginRate: Scalars["Float"];
  marginUnitType: Scalars["String"];
  defaultShippingFee: Scalars["Int"];
  fixImageTop?: Maybe<Scalars["String"]>;
  fixImageBottom?: Maybe<Scalars["String"]>;
  cnyRate: Scalars["Float"];
  productCollectCount: Scalars["Int"];
  maxProductLimit?: Maybe<Scalars["Int"]>;
  additionalShippingFeeJeju: Scalars["Int"];
  asTel?: Maybe<Scalars["String"]>;
  asInformation?: Maybe<Scalars["String"]>;
  refundShippingFee: Scalars["Int"];
  exchangeShippingFee: Scalars["Int"];
  naverOriginCode: Scalars["String"];
  naverOrigin: Scalars["String"];
  naverStoreUrl: Scalars["String"];
  naverStoreOnly: Scalars["String"];
  naverFee: Scalars["Float"];
  coupangOutboundShippingTimeDay: Scalars["Int"];
  coupangUnionDeliveryType: Scalars["String"];
  coupangMaximumBuyForPerson: Scalars["Int"];
  coupangLoginId: Scalars["String"];
  coupangVendorId: Scalars["String"];
  coupangAccessKey: Scalars["String"];
  coupangSecretKey: Scalars["String"];
  coupangImageOpt: Scalars["String"];
  coupangFee: Scalars["Float"];
  coupangDefaultOutbound: Scalars["String"];
  coupangDefaultInbound: Scalars["String"];
  streetApiKey: Scalars["String"];
  streetSellerType: Scalars["Int"];
  streetFee: Scalars["Float"];
  streetDefaultOutbound: Scalars["String"];
  streetDefaultInbound: Scalars["String"];
  streetNormalApiKey: Scalars["String"];
  streetNormalOutbound: Scalars["String"];
  streetNormalInbound: Scalars["String"];
  streetNormalFee: Scalars["Float"];
  interparkCertKey: Scalars["String"];
  interparkSecretKey: Scalars["String"];
  interparkFee: Scalars["Float"];
  esmplusMasterId: Scalars["String"];
  esmplusAuctionId: Scalars["String"];
  esmplusGmarketId: Scalars["String"];
  gmarketFee: Scalars["Float"];
  auctionFee: Scalars["Float"];
  lotteonVendorId: Scalars["String"];
  lotteonApiKey: Scalars["String"];
  lotteonFee: Scalars["Float"];
  lotteonNormalFee: Scalars["Float"];
  wemakepriceId: Scalars["String"];
  wemakepriceFee: Scalars["Float"];
  tmonId: Scalars["String"];
  tmonFee: Scalars["Float"];
  optionAlignTop: Scalars["String"];
  optionTwoWays: Scalars["String"];
  optionIndexType: Scalars["Int"];
  discountAmount: Scalars["Int"];
  discountUnitType: Scalars["String"];
  descriptionShowTitle: Scalars["String"];
  collectTimeout: Scalars["Int"];
  collectStock: Scalars["Int"];
  extraShippingFee: Scalars["Int"];
  user: User;
};

export type AccountInfo = {
  __typename?: "AccountInfo";
  bankName: Scalars["String"];
  accountHolder: Scalars["String"];
  accountNumber: Scalars["String"];
};

export type UserPurchaseInfo = {
  __typename?: "UserPurchaseInfo";
  history: Scalars["String"];
  level: Scalars["Int"];
  levelExpiredAt: Scalars["DateTime"];
  additionalInfo: Array<UserPurchaseAdditionalInfo>;
};

export enum UserPurchaseAdditionalInfoEnumType {
  ImageTranslate = "IMAGE_TRANSLATE",
  Stock = "STOCK",
}

export type UserPurchaseAdditionalInfo = {
  __typename?: "UserPurchaseAdditionalInfo";
  type: UserPurchaseAdditionalInfoEnumType;
  expiredAt: Scalars["DateTime"];
};

export type AccountInfoInput = {
  bankName: Scalars["String"];
  accountHolder: Scalars["String"];
  accountNumber: Scalars["String"];
};

export type UserCompanyInfoInput = {
  name: Scalars["String"];
  code: Scalars["String"];
  ownerName: Scalars["String"];
};

export type UserLog = {
  __typename?: "UserLog";
  id: Scalars["Int"];
  userId: Scalars["Int"];
  title: Scalars["String"];
  payloadData: Scalars["String"];
  isRead: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  user: User;
};

export type TaobaoProduct = {
  __typename?: "TaobaoProduct";
  id: Scalars["Int"];
  taobaoNumIid: Scalars["String"];
  name: Scalars["String"];
  imageThumbnail: Scalars["String"];
  price: Scalars["Float"];
  brand: Scalars["String"];
  taobaoBrandId?: Maybe<Scalars["String"]>;
  taobaoCategoryId: Scalars["String"];
  originalData: Scalars["String"];
  videoUrl?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  modifiedAt: Scalars["DateTime"];
  product: Array<Product>;
  options: TaobaoProductOptionInfo;
};

export type TaobaoProductProductArgs = {
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductWhereUniqueInput>;
};

export type TaobaoProductOptionInfo = {
  __typename?: "TaobaoProductOptionInfo";
  option: Array<TaobaoProductOption>;
  optionName: Array<TaobaoProductOptionName>;
  optionValue: Array<TaobaoProductOptionValue>;
};

export type TaobaoProductOptionName = {
  __typename?: "TaobaoProductOptionName";
  taobaoPid: Scalars["String"];
  name: Scalars["String"];
};

export type TaobaoProductOptionValue = {
  __typename?: "TaobaoProductOptionValue";
  taobaoVid: Scalars["String"];
  name: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
};

export type TaobaoProductOption = {
  __typename?: "TaobaoProductOption";
  taobaoSkuId: Scalars["String"];
  name: Scalars["String"];
};

export type productStateEnum = {
  id: Scalars["Int"];
  state: Scalars["String"];
};

export type Product = {
  __typename?: "Product";
  id: Scalars["Int"];
  userId?: Maybe<Scalars["Int"]>;
  adminId?: Maybe<Scalars["Int"]>;
  taobaoProductId: Scalars["Int"];
  productCode: Scalars["String"];
  // state: ProductState;
  name: Scalars["String"];
  isNameTranslated: Scalars["Boolean"];
  isImageTranslated: Scalars["Boolean"];
  price: Scalars["Int"];
  localShippingFee: Scalars["Int"];
  localShippingCode: Scalars["Int"];
  description: Scalars["String"];
  createdAt: Scalars["DateTime"];
  modifiedAt: Scalars["DateTime"];
  stockUpdatedAt: Scalars["DateTime"];
  categoryCode?: Maybe<Scalars["String"]>;
  siilCode?: Maybe<Scalars["String"]>;
  imageThumbnailData: Scalars["String"];
  imageThumbnail: Array<Scalars["String"]>;
  siilData?: Maybe<Scalars["String"]>;
  siilInfo?: Maybe<SiilSavedData>;
  category?: Maybe<Category>;
  categoryA077?: Scalars["String"];
  categoryA077Name?: Scalars["String"];
  categoryB378?: Scalars["String"];
  categoryB378Name?: Scalars["String"];
  categoryA112?: Scalars["String"];
  categoryA112Name?: Scalars["String"];
  categoryA027?: Scalars["String"];
  categoryA027Name?: Scalars["String"];
  categoryA001?: Scalars["String"];
  categoryA001Name?: Scalars["String"];
  categoryA006?: Scalars["String"];
  categoryA006Name?: Scalars["String"];
  categoryA113?: Scalars["String"];
  categoryA113Name?: Scalars["String"];
  categoryB719?: Scalars["String"];
  categoryB719Name?: Scalars["String"];
  categoryA524?: Scalars["String"];
  categoryA524Name?: Scalars["String"];
  categoryA525?: Scalars["String"];
  categoryA525Name?: Scalars["String"];
  categoryB956?: Scalars["String"];
  categoryB956Name?: Scalars["String"];
  taobaoProduct: TaobaoProduct;
  productStateEnum?: Maybe<productStateEnum>;
  user?: Maybe<User>;
  admin?: Maybe<Admin>;
  productOption: Array<ProductOption>;
  productOptionName: Array<ProductOptionName>;
  productStore: Array<ProductStore>;
  activeProductStore: Array<ProductStore>;
  optionInfoHtml: Scalars["String"];
  marginRate: Scalars["Float"];
  marginUnitType: Scalars["String"];
  cnyRate: Scalars["Float"];
  shippingFee: Scalars["Int"];
  searchTags: Scalars["String"];
};

export type ProductProductOptionArgs = {
  where?: Maybe<ProductOptionWhereInput>;
  orderBy?: Maybe<Array<ProductOptionOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductOptionWhereUniqueInput>;
};

export type ProductProductOptionNameArgs = {
  where?: Maybe<ProductOptionNameWhereInput>;
  orderBy?: Maybe<Array<ProductOptionNameOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductOptionNameWhereUniqueInput>;
};

export type ProductProductStoreArgs = {
  where?: Maybe<ProductStoreWhereInput>;
  orderBy?: Maybe<Array<ProductStoreOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductStoreWhereUniqueInput>;
};

export type ProductOption = {
  __typename?: "ProductOption";
  id: Scalars["Int"];
  productId: Scalars["Int"];
  optionValue1Id: Scalars["Int"];
  optionValue2Id?: Maybe<Scalars["Int"]>;
  optionValue3Id?: Maybe<Scalars["Int"]>;
  name: Scalars["String"];
  isActive: Scalars["Boolean"];
  taobaoSkuId: Scalars["String"];
  priceCny: Scalars["Float"];
  price: Scalars["Int"];
  stock?: Maybe<Scalars["Int"]>;
  optionString: Scalars["String"];
  optionValue1: ProductOptionValue;
  optionValue2?: Maybe<ProductOptionValue>;
  optionValue3?: Maybe<ProductOptionValue>;
  product: Product;
};

export type ProductOptionName = {
  __typename?: "ProductOptionName";
  id: Scalars["Int"];
  productId: Scalars["Int"];
  order: Scalars["Int"];
  name: Scalars["String"];
  isNameTranslated: Scalars["Boolean"];
  taobaoPid: Scalars["String"];
  product: Product;
  productOptionValue: Array<ProductOptionValue>;
};

export type ProductOptionNameProductOptionValueArgs = {
  where?: Maybe<ProductOptionValueWhereInput>;
  orderBy?: Maybe<Array<ProductOptionValueOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductOptionValueWhereUniqueInput>;
};

export type ProductOptionValue = {
  __typename?: "ProductOptionValue";
  id: Scalars["Int"];
  productOptionNameId: Scalars["Int"];
  optionNameOrder: Scalars["Int"];
  name: Scalars["String"];
  isNameTranslated: Scalars["Boolean"];
  taobaoVid: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  number: Scalars["Int"];
  isActive: Scalars["Boolean"];
  productOptionName: ProductOptionName;
  productOption: Array<ProductOption>;
  productOption1: Array<ProductOption>;
  productOption2: Array<ProductOption>;
  productOption3: Array<ProductOption>;
};

export type ProductOptionValueProductOptionArgs = {
  where?: Maybe<ProductOptionWhereInput>;
  orderBy?: Maybe<Array<Maybe<ProductOptionOrderByWithRelationInput>>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductOptionWhereUniqueInput>;
};

export type ProductOptionValueProductOption1Args = {
  where?: Maybe<ProductOptionWhereInput>;
  orderBy?: Maybe<Array<ProductOptionOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductOptionWhereUniqueInput>;
};

export type ProductOptionValueProductOption2Args = {
  where?: Maybe<ProductOptionWhereInput>;
  orderBy?: Maybe<Array<ProductOptionOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductOptionWhereUniqueInput>;
};

export type ProductOptionValueProductOption3Args = {
  where?: Maybe<ProductOptionWhereInput>;
  orderBy?: Maybe<Array<ProductOptionOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductOptionWhereUniqueInput>;
};

export type ProductOptionUpdateInput = {
  id: Scalars["Int"];
  price: Scalars["Int"];
  isActive: Scalars["Boolean"];
  stock: Scalars["Int"];
};

export type ProductOptionNameUpdateInput = {
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type ProductOptionValueUpdateInput = {
  id: Scalars["Int"];
  name: Scalars["String"];
  isActive?: Maybe<Scalars["Boolean"]>;
  image?: Maybe<Scalars["String"]>;
  newImage?: Maybe<Scalars["Upload"]>;
  newImageBase64?: Maybe<Scalars["String"]>;
};

export type ProductOptionValueImageUpdateInput = {
  id: Scalars["Int"];
  image?: Maybe<Scalars["String"]>;
  newImageBase64?: Maybe<Scalars["String"]>;
};

export type ProductThumbnailUpdateInput = {
  defaultImage: Scalars["String"];
  uploadImage?: Maybe<Scalars["Upload"]>;
};

export type ProductThumbnailImageUpdateInput = {
  defaultImage: Scalars["String"];
  uploadImageBase64?: Maybe<Scalars["String"]>;
};

export type ProductStore = {
  __typename?: "ProductStore";
  id: Scalars["Int"];
  productId: Scalars["Int"];
  userId: Scalars["Int"];
  user: User;
  siteCode: Scalars["String"];
  state: Scalars["Int"];
  productStoreState: ProductStoreState;
  storeProductId?: Maybe<Scalars["String"]>;
  product: Product;
  productStoreLog: Array<ProductStoreLog>;
  etcVendorItemId?: Maybe<Scalars["String"]>;
  storeUrl?: Maybe<Scalars["String"]>;
  connectedAt: Scalars["DateTime"];
};

export type ProductStoreProductStoreLogArgs = {
  where?: Maybe<ProductStoreLogWhereInput>;
  orderBy?: Maybe<Array<ProductStoreLogOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductStoreLogWhereUniqueInput>;
};

export type ProductStoreState = {
  __typename?: "ProductStoreState";
  id: Scalars["Int"];
  name: Scalars["String"];
  description: Scalars["String"];
};

export type ProductStoreLog = {
  __typename?: "ProductStoreLog";
  id: Scalars["Int"];
  productStoreId: Scalars["Int"];
  jobId: Scalars["String"];
  destState: Scalars["Int"];
  uploadState: ProductStoreLogUploadState;
  errorMessage: Scalars["String"];
  createdAt: Scalars["DateTime"];
  modifiedAt: Scalars["DateTime"];
  productStoreState: ProductStoreState;
  productStore: ProductStore;
};

export type Category = {
  __typename?: "Category";
  id: Scalars["Int"];
  code: Scalars["String"];
  c1: Scalars["String"];
  c2: Scalars["String"];
  c3: Scalars["String"];
  c4: Scalars["String"];
  c1Name: Scalars["String"];
  c2Name: Scalars["String"];
  c3Name: Scalars["String"];
  c4Name: Scalars["String"];
  siilCode: Scalars["String"];
  a077Code: Scalars["String"];
  b378Code: Scalars["Int"];
};

export type CategoryStore = {
  __typename?: "CategoryStore";
  id: Scalars["Int"];
  acode: Scalars["String"];
  pcode: Scalars["String"];
  ccode: Scalars["String"];
  dc1: Scalars["String"];
  dc2: Scalars["String"];
  dc3: Scalars["String"];
  dc4: Scalars["String"];
  dc1Name: Scalars["String"];
  dc2Name: Scalars["String"];
  dc3Name: Scalars["String"];
  dc4Name: Scalars["String"];
  state: CategoryStoreState;
  cateStatePdate?: Maybe<Scalars["DateTime"]>;
  cateStateCdate?: Maybe<Scalars["DateTime"]>;
};

export type CategorySelectType = {
  __typename?: "CategorySelectType";
  code: Scalars["String"];
  name: Scalars["String"];
};

export type CategoryInformationType = {
  code: Scalars["String"];
  depth1: Scalars["String"];
  depth2: Scalars["String"];
  depth3: Scalars["String"];
  depth4: Scalars["String"];
  depth5: Scalars["String"];
  depth6: Scalars["String"];
  name: Scalars["String"];

  code_a077: Maybe<Scalars["String"]>;
  code_b378: Maybe<Scalars["String"]>;
  code_a112: Maybe<Scalars["String"]>;
  code_a027: Maybe<Scalars["String"]>;
  code_a001: Maybe<Scalars["String"]>;
  code_a006: Maybe<Scalars["String"]>;
  code_b719: Maybe<Scalars["String"]>;
  code_a113: Maybe<Scalars["String"]>;
  code_a524: Maybe<Scalars["String"]>;
  code_a525: Maybe<Scalars["String"]>;
  code_b956: Maybe<Scalars["String"]>;
};

export enum ExcelSampleEnum {
  CollectProduct = "COLLECT_PRODUCT",
  ReplaceWord = "REPLACE_WORD",
  DenyWord = "DENY_WORD",
}

export type Faq = {
  __typename?: "Faq";
  id: Scalars["Int"];
  categoryId: Scalars["Int"];
  title: Scalars["String"];
  content: Scalars["String"];
  contentSummary: Scalars["String"];
  createdAt: Scalars["DateTime"];
  FaqCategory: FaqCategory;
};

export type FaqContentSummaryArgs = {
  wordCount?: Maybe<Scalars["Int"]>;
};

export type FaqCategory = {
  __typename?: "FaqCategory";
  id: Scalars["Int"];
  name: Scalars["String"];
  order: Scalars["Int"];
  isActive: Scalars["Boolean"];
  faq: Array<Faq>;
};

export type FaqCategoryFaqArgs = {
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<FaqWhereUniqueInput>;
};

export type Notice = {
  __typename?: "Notice";
  id: Scalars["Int"];
  title: Scalars["String"];
  content: Scalars["String"];
  contentSummary: Scalars["String"];
  attachmentFile?: Maybe<Scalars["String"]>;
  isVisible: Scalars["Boolean"];
  viewCount: Scalars["Int"];
  createdAt: Scalars["DateTime"];
};

export type NoticeContentSummaryArgs = {
  wordCount?: Maybe<Scalars["Int"]>;
};

export type UserQuestion = {
  __typename?: "UserQuestion";
  id: Scalars["Int"];
  userId: Scalars["Int"];
  title: Scalars["String"];
  content: Scalars["String"];
  attachmentFile?: Maybe<Scalars["String"]>;
  attachmentFiles: Array<Scalars["String"]>;
  answer?: Maybe<Scalars["String"]>;
  isActive: Scalars["Boolean"];
  answeredAt?: Maybe<Scalars["DateTime"]>;
  createdAt: Scalars["DateTime"];
  user: User;
};

export type Order = {
  __typename?: "Order";
  id: Scalars["String"];
  userId: Scalars["Int"];
  state: OrderState;
  orderProductNumber: Scalars["String"];
  storeProductId: Scalars["String"];
  orderState: Scalars["Int"];
  productName: Scalars["String"];
  optionName: Scalars["String"];
  quantity: Scalars["Int"];
  productId?: Maybe<Scalars["Int"]>;
  payPrice: Scalars["Int"];
  shippingFee: Scalars["Int"];
  buyerName: Scalars["String"];
  receiverName: Scalars["String"];
  customId: Scalars["String"];
  isCustomIdValid?: Maybe<Scalars["Boolean"]>;
  orderedAt: Scalars["DateTime"];
  deliveryExpiredAt: Scalars["DateTime"];
  originalData: Scalars["String"];
  sellerProductCode: Scalars["String"];
  user: User;
  product?: Maybe<Product>;
  storeUrl?: Maybe<Scalars["String"]>;
};

export type PlanInfo = {
  __typename?: "PlanInfo";
  id: Scalars["Int"];
  planLevel?: Maybe<Scalars["Int"]>;
  name: Scalars["String"];
  description: Scalars["String"];
  month: Scalars["Int"];
  price: Scalars["Int"];
  externalFeatureVariableId?: Maybe<Scalars["String"]>;
  isActive: Scalars["Boolean"];
};

export type purchaseInputs = {
  __typename?: "purchaseInputs";
  userId: Scalars["Int"];
  planInfoId: Scalars["Int"];
  expiredAt: Scalars["DateTime"];
};

export type PurchaseLog = {
  __typename?: "PurchaseLog";
  id: Scalars["Int"];
  userId: Scalars["Int"];
  payAmount: Scalars["Int"];
  payId?: Maybe<Scalars["String"]>;
  state: PurchaseLogState;
  planInfo: Scalars["String"];
  type: PurchaseLogType;
  purchasedAt: Scalars["DateTime"];
  expiredAt: Scalars["DateTime"];
  user: User;
};

export type Admin = {
  __typename?: "Admin";
  id: Scalars["Int"];
  loginId: Scalars["String"];
  state: AdminState;
  createdAt: Scalars["DateTime"];
};

export type TaobaoOrder = {
  __typename?: "TaobaoOrder";
  id: Scalars["Int"];
  taobaoId: Scalars["String"];
  taobaoOrderNum: Scalars["String"];
  state: TaobaoOrderState;
  logisticCompany?: Maybe<Scalars["String"]>;
  waybill?: Maybe<Scalars["String"]>;
  buyerMessage?: Maybe<Scalars["String"]>;
  realMoney?: Maybe<Scalars["Float"]>;
  originalData: Scalars["String"];
  createdAt: Scalars["DateTime"];
  modifiedAt: Scalars["DateTime"];
  order: Array<Order>;
};

export type TaobaoOrderOrderArgs = {
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<OrderWhereUniqueInput>;
};

export type WordTable = {
  __typename?: "WordTable";
  id: Scalars["Int"];
  userId: Scalars["Int"];
  findWord: Scalars["String"];
  replaceWord?: Maybe<Scalars["String"]>;
  user: User;
};

export type PhoneVerification = {
  __typename?: "PhoneVerification";
  id: Scalars["Int"];
  tel: Scalars["String"];
  verificationNumber: Scalars["String"];
  createdAt: Scalars["DateTime"];
};

export enum UserSocialType {
  Email = "EMAIL",
  Kakao = "KAKAO",
  Naver = "NAVER",
}

export enum UserLoginType {
  Admin = "ADMIN",
  Email = "EMAIL",
  Kakao = "KAKAO",
  Naver = "NAVER",
}

export enum TaobaoItemOrderBy {
  /** 판매량순 */
  Sale = "SALE",
  /** 판매자 신용 순 */
  Credit = "CREDIT",
}

export enum SiilItemTypeEnum {
  Select = "SELECT",
  Input = "INPUT",
  Yesno = "YESNO",
}

export type SiilItem = {
  __typename?: "SiilItem";
  name: Scalars["String"];
  inputType: SiilItemTypeEnum;
  options?: Maybe<Array<Scalars["String"]>>;
  code: Scalars["String"];
};

export type SiilItems = {
  __typename?: "SiilItems";
  description: Scalars["String"];
  data: Array<SiilItem>;
};

export type SiilInput = {
  code: Scalars["String"];
  value: Scalars["String"];
};

export type SiilSavedItem = {
  __typename?: "SiilSavedItem";
  code: Scalars["String"];
  value: Scalars["String"];
};

export type SiilSavedData = {
  __typename?: "SiilSavedData";
  code: Scalars["String"];
  data: Array<SiilSavedItem>;
};

export enum TranslateEngineEnumType {
  Papago = "PAPAGO",
  Google = "GOOGLE",
  Baidu = "BAIDU",
}

export enum TranslateTargetEnumType {
  /** 상품 전체 일괄번역,id:Product */
  ProductAll = "PRODUCT_ALL",
  /** 상품 옵션 일괄번역,id:ProductOptionName */
  ProductOptionAll = "PRODUCT_OPTION_ALL",
  /** 상품 이름 번역,id:Product */
  ProductName = "PRODUCT_NAME",
  /** 상품 옵션 이름 번역,id:ProductOptionName */
  ProductOptionName = "PRODUCT_OPTION_NAME",
  /** 상품 옵션별 이름 번역,id:ProductOptionValue */
  ProductOptionValue = "PRODUCT_OPTION_VALUE",
}

export enum UserState {
  Active = "ACTIVE",
  Deleted = "DELETED",
}

export type productStateEnumWhereInput = {
  AND?: Maybe<Array<productStateEnumWhereInput>>;
  OR?: Maybe<Array<productStateEnumWhereInput>>;
  NOT?: Maybe<Array<productStateEnumWhereInput>>;
  id?: Maybe<IntFilter>;
  state?: Maybe<StringFilter>;
  // product: Maybe<ProductListRelationFilter>;
};

export type ProductWhereInput = {
  AND?: Maybe<Array<ProductWhereInput>>;
  OR?: Maybe<Array<ProductWhereInput>>;
  NOT?: Maybe<Array<ProductWhereInput>>;
  id?: Maybe<IntFilter>;
  userId?: Maybe<IntNullableFilter>;
  adminId?: Maybe<IntNullableFilter>;
  taobaoProductId?: Maybe<IntFilter>;
  productCode?: Maybe<StringFilter>;
  state?: Maybe<EnumProductStateFilter>;
  name?: Maybe<StringFilter>;
  price?: Maybe<IntFilter>;
  localShippingFee?: Maybe<IntFilter>;
  description?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  stockUpdatedAt?: Maybe<DateTimeFilter>;
  categoryCode?: Maybe<StringNullableFilter>;
  siilData?: Maybe<StringNullableFilter>;
  siilCode?: Maybe<StringNullableFilter>;
  isNameTranslated?: Maybe<BoolFilter>;
  isImageTranslated?: Maybe<BoolFilter>;
  imageThumbnailData?: Maybe<StringFilter>;
  marginRate?: Maybe<FloatFilter>;
  cnyRate?: Maybe<FloatFilter>;
  shippingFee?: Maybe<IntFilter>;
  admin?: Maybe<AdminWhereInput>;
  category?: Maybe<CategoryWhereInput>;
  taobaoProduct?: Maybe<TaobaoProductWhereInput>;
  user?: Maybe<UserWhereInput>;
  order?: Maybe<OrderListRelationFilter>;
  productOption?: Maybe<ProductOptionListRelationFilter>;
  productOptionName?: Maybe<ProductOptionNameListRelationFilter>;
  productStore?: Maybe<ProductStoreListRelationFilter>;
  productStateEnum?: Maybe<productStateEnumWhereInput>;
};

export type ProductOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  adminId?: Maybe<SortOrder>;
  taobaoProductId?: Maybe<SortOrder>;
  productCode?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
  localShippingFee?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  modifiedAt?: Maybe<SortOrder>;
  stockUpdatedAt?: Maybe<SortOrder>;
  categoryCode?: Maybe<SortOrder>;
  siilData?: Maybe<SortOrder>;
  siilCode?: Maybe<SortOrder>;
  isNameTranslated?: Maybe<SortOrder>;
  isImageTranslated?: Maybe<SortOrder>;
  imageThumbnailData?: Maybe<SortOrder>;
  marginRate?: Maybe<SortOrder>;
  cnyRate?: Maybe<SortOrder>;
  shippingFee?: Maybe<SortOrder>;
  admin?: Maybe<AdminOrderByWithRelationInput>;
  category?: Maybe<CategoryOrderByWithRelationInput>;
  taobaoProduct?: Maybe<TaobaoProductOrderByWithRelationInput>;
  user?: Maybe<UserOrderByWithRelationInput>;
  order?: Maybe<OrderOrderByRelationAggregateInput>;
  productOption?: Maybe<ProductOptionOrderByRelationAggregateInput>;
  productOptionName?: Maybe<ProductOptionNameOrderByRelationAggregateInput>;
  productStore?: Maybe<ProductStoreOrderByRelationAggregateInput>;
};

export type ProductWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
  UQ_user_id_taobao_product_id?: Maybe<ProductUq_User_Id_Taobao_Product_IdCompoundUniqueInput>;
};

export type UserLogWhereInput = {
  AND?: Maybe<Array<UserLogWhereInput>>;
  OR?: Maybe<Array<UserLogWhereInput>>;
  NOT?: Maybe<Array<UserLogWhereInput>>;
  id?: Maybe<IntFilter>;
  userId?: Maybe<IntFilter>;
  title?: Maybe<StringFilter>;
  payloadData?: Maybe<StringFilter>;
  isRead?: Maybe<BoolFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserWhereInput>;
};

export type UserLogOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  payloadData?: Maybe<SortOrder>;
  isRead?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  user?: Maybe<UserOrderByWithRelationInput>;
};

export type UserLogWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<IntFilter>;
  master?: Maybe<IntFilter>;
  masterUserId?: Maybe<IntFilter>;
  email?: Maybe<StringFilter>;
  password?: Maybe<StringFilter>;
  state?: Maybe<EnumUserStateFilter>;
  naverId?: Maybe<StringNullableFilter>;
  kakaoId?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  order?: Maybe<OrderListRelationFilter>;
  product?: Maybe<ProductListRelationFilter>;
  productStore?: Maybe<ProductStoreListRelationFilter>;
  purchaseLog?: Maybe<PurchaseLogListRelationFilter>;
  userInfo?: Maybe<UserInfoWhereInput>;
  userLog?: Maybe<UserLogListRelationFilter>;
  userQuestion?: Maybe<UserQuestionListRelationFilter>;
  wordTable?: Maybe<WordTableListRelationFilter>;
};

export type UserOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  naverId?: Maybe<SortOrder>;
  kakaoId?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  order?: Maybe<OrderOrderByRelationAggregateInput>;
  product?: Maybe<ProductOrderByRelationAggregateInput>;
  productStore?: Maybe<ProductStoreOrderByRelationAggregateInput>;
  purchaseLog?: Maybe<PurchaseLogOrderByRelationAggregateInput>;
  userInfo?: Maybe<UserInfoOrderByWithRelationInput>;
  userLog?: Maybe<UserLogOrderByRelationAggregateInput>;
  userQuestion?: Maybe<UserQuestionOrderByRelationAggregateInput>;
  wordTable?: Maybe<WordTableOrderByRelationAggregateInput>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
  email?: Maybe<Scalars["String"]>;
  naverId?: Maybe<Scalars["String"]>;
  kakaoId?: Maybe<Scalars["String"]>;
};

export type TaobaoProductWhereInput = {
  AND?: Maybe<Array<TaobaoProductWhereInput>>;
  OR?: Maybe<Array<TaobaoProductWhereInput>>;
  NOT?: Maybe<Array<TaobaoProductWhereInput>>;
  id?: Maybe<IntFilter>;
  taobaoNumIid?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  imageThumbnail?: Maybe<StringFilter>;
  price?: Maybe<FloatFilter>;
  brand?: Maybe<StringFilter>;
  taobaoBrandId?: Maybe<StringNullableFilter>;
  taobaoCategoryId?: Maybe<StringFilter>;
  originalData?: Maybe<StringFilter>;
  videoUrl?: Maybe<StringNullableFilter>;
  translateData?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  product?: Maybe<ProductListRelationFilter>;
};

export type TaobaoProductOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  taobaoNumIid?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  imageThumbnail?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
  brand?: Maybe<SortOrder>;
  taobaoBrandId?: Maybe<SortOrder>;
  taobaoCategoryId?: Maybe<SortOrder>;
  originalData?: Maybe<SortOrder>;
  videoUrl?: Maybe<SortOrder>;
  translateData?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  modifiedAt?: Maybe<SortOrder>;
  product?: Maybe<ProductOrderByRelationAggregateInput>;
};

export type TaobaoProductWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
  taobaoNumIid?: Maybe<Scalars["String"]>;
};

export enum ProductState {
  Collected = "COLLECTED",
  OnSale = "ON_SALE",
  UploadWaiting = "UPLOAD_WAITING",
  UploadFailed = "UPLOAD_FAILED",
  SellDone = "SELL_DONE",
}

export type ProductOptionWhereInput = {
  AND?: Maybe<Array<ProductOptionWhereInput>>;
  OR?: Maybe<Array<ProductOptionWhereInput>>;
  NOT?: Maybe<Array<ProductOptionWhereInput>>;
  id?: Maybe<IntFilter>;
  productId?: Maybe<IntFilter>;
  optionValue1Id?: Maybe<IntFilter>;
  optionValue2Id?: Maybe<IntNullableFilter>;
  optionValue3Id?: Maybe<IntNullableFilter>;
  isActive?: Maybe<BoolFilter>;
  taobaoSkuId?: Maybe<StringFilter>;
  priceCny?: Maybe<FloatFilter>;
  price?: Maybe<IntFilter>;
  stock?: Maybe<IntNullableFilter>;
  optionString?: Maybe<StringFilter>;
  optionValue1?: Maybe<ProductOptionValueWhereInput>;
  optionValue2?: Maybe<ProductOptionValueWhereInput>;
  optionValue3?: Maybe<ProductOptionValueWhereInput>;
  product?: Maybe<ProductWhereInput>;
};

export type ProductOptionOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  productId?: Maybe<SortOrder>;
  optionValue1Id?: Maybe<SortOrder>;
  optionValue2Id?: Maybe<SortOrder>;
  optionValue3Id?: Maybe<SortOrder>;
  isActive?: Maybe<SortOrder>;
  taobaoSkuId?: Maybe<SortOrder>;
  priceCny?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
  stock?: Maybe<SortOrder>;
  optionString?: Maybe<SortOrder>;
  optionValue1?: Maybe<ProductOptionValueOrderByWithRelationInput>;
  optionValue2?: Maybe<ProductOptionValueOrderByWithRelationInput>;
  optionValue3?: Maybe<ProductOptionValueOrderByWithRelationInput>;
  product?: Maybe<ProductOrderByWithRelationInput>;
};

export type ProductOptionWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
  UQ_product_id_sku_id?: Maybe<ProductOptionUq_Product_Id_Sku_IdCompoundUniqueInput>;
  UQ_product_option?: Maybe<ProductOptionUq_Product_OptionCompoundUniqueInput>;
};

export type ProductOptionNameWhereInput = {
  AND?: Maybe<Array<ProductOptionNameWhereInput>>;
  OR?: Maybe<Array<ProductOptionNameWhereInput>>;
  NOT?: Maybe<Array<ProductOptionNameWhereInput>>;
  id?: Maybe<IntFilter>;
  productId?: Maybe<IntFilter>;
  order?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  taobaoPid?: Maybe<StringFilter>;
  isNameTranslated?: Maybe<BoolFilter>;
  hasImage?: Maybe<BoolFilter>;
  product?: Maybe<ProductWhereInput>;
  productOptionValue?: Maybe<ProductOptionValueListRelationFilter>;
};

export type ProductOptionNameOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  productId?: Maybe<SortOrder>;
  order?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  taobaoPid?: Maybe<SortOrder>;
  isNameTranslated?: Maybe<SortOrder>;
  hasImage?: Maybe<SortOrder>;
  product?: Maybe<ProductOrderByWithRelationInput>;
  productOptionValue?: Maybe<ProductOptionValueOrderByRelationAggregateInput>;
};

export type ProductOptionNameWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export type ProductStoreWhereInput = {
  AND?: Maybe<Array<ProductStoreWhereInput>>;
  OR?: Maybe<Array<ProductStoreWhereInput>>;
  NOT?: Maybe<Array<ProductStoreWhereInput>>;
  id?: Maybe<IntFilter>;
  userId?: Maybe<IntFilter>;
  productId?: Maybe<IntFilter>;
  state?: Maybe<IntFilter>;
  storeProductId?: Maybe<StringNullableFilter>;
  etcVendorItemId?: Maybe<StringNullableFilter>;
  siteCode?: Maybe<StringFilter>;
  storeUrl?: Maybe<StringNullableFilter>;
  product?: Maybe<ProductWhereInput>;
  productStoreState?: Maybe<ProductStoreStateWhereInput>;
  user?: Maybe<UserWhereInput>;
  productStoreLog?: Maybe<ProductStoreLogListRelationFilter>;
};

export type ProductStoreOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  productId?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  storeProductId?: Maybe<SortOrder>;
  etcVendorItemId?: Maybe<SortOrder>;
  siteCode?: Maybe<SortOrder>;
  storeUrl?: Maybe<SortOrder>;
  product?: Maybe<ProductOrderByWithRelationInput>;
  productStoreState?: Maybe<ProductStoreStateOrderByWithRelationInput>;
  user?: Maybe<UserOrderByWithRelationInput>;
  productStoreLog?: Maybe<ProductStoreLogOrderByRelationAggregateInput>;
};

export type ProductStoreWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export type ProductOptionValueWhereInput = {
  AND?: Maybe<Array<ProductOptionValueWhereInput>>;
  OR?: Maybe<Array<ProductOptionValueWhereInput>>;
  NOT?: Maybe<Array<ProductOptionValueWhereInput>>;
  id?: Maybe<IntFilter>;
  productOptionNameId?: Maybe<IntFilter>;
  optionNameOrder?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  taobaoVid?: Maybe<StringFilter>;
  image?: Maybe<StringNullableFilter>;
  number?: Maybe<IntFilter>;
  isNameTranslated?: Maybe<BoolFilter>;
  isActive?: Maybe<BoolFilter>;
  productOptionName?: Maybe<ProductOptionNameWhereInput>;
  productOption1?: Maybe<ProductOptionListRelationFilter>;
  productOption2?: Maybe<ProductOptionListRelationFilter>;
  productOption3?: Maybe<ProductOptionListRelationFilter>;
};

export type ProductOptionValueOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  productOptionNameId?: Maybe<SortOrder>;
  optionNameOrder?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  taobaoVid?: Maybe<SortOrder>;
  image?: Maybe<SortOrder>;
  number?: Maybe<SortOrder>;
  isNameTranslated?: Maybe<SortOrder>;
  isActive?: Maybe<SortOrder>;
  productOptionName?: Maybe<ProductOptionNameOrderByWithRelationInput>;
  productOption1?: Maybe<ProductOptionOrderByRelationAggregateInput>;
  productOption2?: Maybe<ProductOptionOrderByRelationAggregateInput>;
  productOption3?: Maybe<ProductOptionOrderByRelationAggregateInput>;
};

export type ProductOptionValueWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export type ProductStoreLogWhereInput = {
  AND?: Maybe<Array<ProductStoreLogWhereInput>>;
  OR?: Maybe<Array<ProductStoreLogWhereInput>>;
  NOT?: Maybe<Array<ProductStoreLogWhereInput>>;
  id?: Maybe<IntFilter>;
  productStoreId?: Maybe<IntFilter>;
  jobId?: Maybe<StringFilter>;
  destState?: Maybe<IntFilter>;
  uploadState?: Maybe<EnumProductStoreLogUploadStateFilter>;
  errorMessage?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  productStoreState?: Maybe<ProductStoreStateWhereInput>;
  productStore?: Maybe<ProductStoreWhereInput>;
};

export type ProductStoreLogOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  productStoreId?: Maybe<SortOrder>;
  jobId?: Maybe<SortOrder>;
  destState?: Maybe<SortOrder>;
  uploadState?: Maybe<SortOrder>;
  errorMessage?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  modifiedAt?: Maybe<SortOrder>;
  productStoreState?: Maybe<ProductStoreStateOrderByWithRelationInput>;
  productStore?: Maybe<ProductStoreOrderByWithRelationInput>;
};

export type ProductStoreLogWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export enum ProductStoreLogUploadState {
  Wait = "WAIT",
  Success = "SUCCESS",
  Fail = "FAIL",
  Cancel = "CANCEL",
  OnProgress = "ON_PROGRESS",
}

export enum CategoryStoreState {
  Normal = "NORMAL",
  Delete = "DELETE",
  Change = "CHANGE",
}

export type CategoryWhereInput = {
  AND?: Maybe<Array<CategoryWhereInput>>;
  OR?: Maybe<Array<CategoryWhereInput>>;
  NOT?: Maybe<Array<CategoryWhereInput>>;
  id?: Maybe<IntFilter>;
  code?: Maybe<StringFilter>;
  c1?: Maybe<StringFilter>;
  c2?: Maybe<StringFilter>;
  c3?: Maybe<StringFilter>;
  c4?: Maybe<StringFilter>;
  c1Name?: Maybe<StringFilter>;
  c2Name?: Maybe<StringFilter>;
  c3Name?: Maybe<StringFilter>;
  c4Name?: Maybe<StringFilter>;
  siilCode?: Maybe<StringFilter>;
  a077Code?: Maybe<StringFilter>;
  b378Code?: Maybe<IntFilter>;
  product?: Maybe<ProductListRelationFilter>;
};

export type CategoryOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  c1?: Maybe<SortOrder>;
  c2?: Maybe<SortOrder>;
  c3?: Maybe<SortOrder>;
  c4?: Maybe<SortOrder>;
  c1Name?: Maybe<SortOrder>;
  c2Name?: Maybe<SortOrder>;
  c3Name?: Maybe<SortOrder>;
  c4Name?: Maybe<SortOrder>;
  siilCode?: Maybe<SortOrder>;
  a077Code?: Maybe<SortOrder>;
  b378Code?: Maybe<SortOrder>;
  product?: Maybe<ProductOrderByRelationAggregateInput>;
};

export type CategoryWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
  code?: Maybe<Scalars["String"]>;
  a077Code?: Maybe<Scalars["String"]>;
};

export type FaqWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export type FaqCategoryWhereInput = {
  AND?: Maybe<Array<FaqCategoryWhereInput>>;
  OR?: Maybe<Array<FaqCategoryWhereInput>>;
  NOT?: Maybe<Array<FaqCategoryWhereInput>>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  order?: Maybe<IntFilter>;
  isActive?: Maybe<BoolFilter>;
  faq?: Maybe<FaqListRelationFilter>;
};

export type FaqCategoryOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  order?: Maybe<SortOrder>;
  isActive?: Maybe<SortOrder>;
  faq?: Maybe<FaqOrderByRelationAggregateInput>;
};

export type FaqCategoryWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export type FaqWhereInput = {
  AND?: Maybe<Array<FaqWhereInput>>;
  OR?: Maybe<Array<FaqWhereInput>>;
  NOT?: Maybe<Array<FaqWhereInput>>;
  id?: Maybe<IntFilter>;
  categoryId?: Maybe<IntFilter>;
  title?: Maybe<StringFilter>;
  content?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  FaqCategory?: Maybe<FaqCategoryWhereInput>;
};

export type FaqOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  categoryId?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  content?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  FaqCategory?: Maybe<FaqCategoryOrderByWithRelationInput>;
};

export type NoticeWhereInput = {
  AND?: Maybe<Array<NoticeWhereInput>>;
  OR?: Maybe<Array<NoticeWhereInput>>;
  NOT?: Maybe<Array<NoticeWhereInput>>;
  id?: Maybe<IntFilter>;
  title?: Maybe<StringFilter>;
  content?: Maybe<StringFilter>;
  attachmentFile?: Maybe<StringNullableFilter>;
  isVisible?: Maybe<BoolFilter>;
  viewCount?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
};

export type NoticeOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  content?: Maybe<SortOrder>;
  attachmentFile?: Maybe<SortOrder>;
  isVisible?: Maybe<SortOrder>;
  viewCount?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
};

export type NoticeWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export type UserQuestionWhereInput = {
  AND?: Maybe<Array<UserQuestionWhereInput>>;
  OR?: Maybe<Array<UserQuestionWhereInput>>;
  NOT?: Maybe<Array<UserQuestionWhereInput>>;
  id?: Maybe<IntFilter>;
  userId?: Maybe<IntFilter>;
  title?: Maybe<StringFilter>;
  content?: Maybe<StringFilter>;
  attachmentFile?: Maybe<StringNullableFilter>;
  answer?: Maybe<StringNullableFilter>;
  isActive?: Maybe<BoolFilter>;
  answeredAt?: Maybe<DateTimeNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserWhereInput>;
};

export type UserQuestionOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  content?: Maybe<SortOrder>;
  attachmentFile?: Maybe<SortOrder>;
  answer?: Maybe<SortOrder>;
  isActive?: Maybe<SortOrder>;
  answeredAt?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  user?: Maybe<UserOrderByWithRelationInput>;
};

export type UserQuestionWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export enum OrderState {
  New = "NEW",
  Ordered = "ORDERED",
  Claimed = "CLAIMED",
  Shipping = "SHIPPING",
  Delivered = "DELIVERED",
}

export type OrderWhereInput = {
  AND?: Maybe<Array<OrderWhereInput>>;
  OR?: Maybe<Array<OrderWhereInput>>;
  NOT?: Maybe<Array<OrderWhereInput>>;
  id?: Maybe<StringFilter>;
  userId?: Maybe<IntFilter>;
  state?: Maybe<EnumOrderStateFilter>;
  orderProductNumber?: Maybe<StringFilter>;
  storeProductId?: Maybe<StringFilter>;
  orderState?: Maybe<IntFilter>;
  productName?: Maybe<StringFilter>;
  optionName?: Maybe<StringFilter>;
  quantity?: Maybe<IntFilter>;
  productId?: Maybe<IntNullableFilter>;
  payPrice?: Maybe<IntFilter>;
  shippingType?: Maybe<StringFilter>;
  shippingFee?: Maybe<IntFilter>;
  buyerName?: Maybe<StringFilter>;
  receiverName?: Maybe<StringFilter>;
  customId?: Maybe<StringFilter>;
  isCustomIdValid?: Maybe<BoolNullableFilter>;
  orderedAt?: Maybe<DateTimeFilter>;
  deliveryExpiredAt?: Maybe<DateTimeFilter>;
  originalData?: Maybe<StringFilter>;
  taobaoOrderId?: Maybe<IntNullableFilter>;
  sellerProductCode?: Maybe<StringFilter>;
  product?: Maybe<ProductWhereInput>;
  taobaoOrder?: Maybe<TaobaoOrderWhereInput>;
  user?: Maybe<UserWhereInput>;
};

export type OrderOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  orderProductNumber?: Maybe<SortOrder>;
  storeProductId?: Maybe<SortOrder>;
  orderState?: Maybe<SortOrder>;
  productName?: Maybe<SortOrder>;
  optionName?: Maybe<SortOrder>;
  quantity?: Maybe<SortOrder>;
  productId?: Maybe<SortOrder>;
  payPrice?: Maybe<SortOrder>;
  shippingType?: Maybe<SortOrder>;
  shippingFee?: Maybe<SortOrder>;
  buyerName?: Maybe<SortOrder>;
  receiverName?: Maybe<SortOrder>;
  customId?: Maybe<SortOrder>;
  isCustomIdValid?: Maybe<SortOrder>;
  orderedAt?: Maybe<SortOrder>;
  deliveryExpiredAt?: Maybe<SortOrder>;
  originalData?: Maybe<SortOrder>;
  taobaoOrderId?: Maybe<SortOrder>;
  sellerProductCode?: Maybe<SortOrder>;
  product?: Maybe<ProductOrderByWithRelationInput>;
  taobaoOrder?: Maybe<TaobaoOrderOrderByWithRelationInput>;
  user?: Maybe<UserOrderByWithRelationInput>;
};

export type OrderWhereUniqueInput = {
  id?: Maybe<Scalars["String"]>;
};

export enum PurchaseLogState {
  WaitPayment = "WAIT_PAYMENT",
  WaitDeposit = "WAIT_DEPOSIT",
  Active = "ACTIVE",
  Ended = "ENDED",
  Refunded = "REFUNDED",
}

export enum PurchaseLogType {
  Plan = "PLAN",
  ImageTranslate = "IMAGE_TRANSLATE",
  Stock = "STOCK",
}

export type PlanInfoWhereInput = {
  AND?: Maybe<Array<PlanInfoWhereInput>>;
  OR?: Maybe<Array<PlanInfoWhereInput>>;
  NOT?: Maybe<Array<PlanInfoWhereInput>>;
  id?: Maybe<IntFilter>;
  planLevel?: Maybe<IntNullableFilter>;
  name?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  month?: Maybe<IntFilter>;
  price?: Maybe<IntFilter>;
  externalFeatureVariableId?: Maybe<StringNullableFilter>;
  isActive?: Maybe<BoolFilter>;
};

export type PlanInfoOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  planLevel?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  month?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
  externalFeatureVariableId?: Maybe<SortOrder>;
  isActive?: Maybe<SortOrder>;
};

export type PlanInfoWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export enum AdminState {
  Active = "ACTIVE",
  Deleted = "DELETED",
}

export enum TaobaoOrderState {
  WaitSend = "WAIT_SEND",
  WaitConfirm = "WAIT_CONFIRM",
  Done = "DONE",
}

export type TaobaoOrderWhereInput = {
  AND?: Maybe<Array<TaobaoOrderWhereInput>>;
  OR?: Maybe<Array<TaobaoOrderWhereInput>>;
  NOT?: Maybe<Array<TaobaoOrderWhereInput>>;
  id?: Maybe<IntFilter>;
  taobaoId?: Maybe<StringFilter>;
  taobaoOrderNum?: Maybe<StringFilter>;
  state?: Maybe<EnumTaobaoOrderStateFilter>;
  logisticCompany?: Maybe<StringNullableFilter>;
  waybill?: Maybe<StringNullableFilter>;
  buyerMessage?: Maybe<StringNullableFilter>;
  realMoney?: Maybe<FloatNullableFilter>;
  originalData?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  order?: Maybe<OrderListRelationFilter>;
};

export type TaobaoOrderOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  taobaoId?: Maybe<SortOrder>;
  taobaoOrderNum?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  logisticCompany?: Maybe<SortOrder>;
  waybill?: Maybe<SortOrder>;
  buyerMessage?: Maybe<SortOrder>;
  realMoney?: Maybe<SortOrder>;
  originalData?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  modifiedAt?: Maybe<SortOrder>;
  order?: Maybe<OrderOrderByRelationAggregateInput>;
};

export type TaobaoOrderWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export type WordTableWhereInput = {
  AND?: Maybe<Array<WordTableWhereInput>>;
  OR?: Maybe<Array<WordTableWhereInput>>;
  NOT?: Maybe<Array<WordTableWhereInput>>;
  id?: Maybe<IntFilter>;
  userId?: Maybe<IntFilter>;
  findWord?: Maybe<StringFilter>;
  replaceWord?: Maybe<StringNullableFilter>;
  user?: Maybe<UserWhereInput>;
};

export type WordTableOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  findWord?: Maybe<SortOrder>;
  replaceWord?: Maybe<SortOrder>;
  user?: Maybe<UserOrderByWithRelationInput>;
};

export type WordTableWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
  UQ_word_table_word?: Maybe<WordTableUq_Word_Table_WordCompoundUniqueInput>;
};

export type IntFilter = {
  equals?: Maybe<Scalars["Int"]>;
  in?: Maybe<Array<Scalars["Int"]>>;
  notIn?: Maybe<Array<Scalars["Int"]>>;
  lt?: Maybe<Scalars["Int"]>;
  lte?: Maybe<Scalars["Int"]>;
  gt?: Maybe<Scalars["Int"]>;
  gte?: Maybe<Scalars["Int"]>;
  not?: Maybe<NestedIntFilter>;
};

export type IntNullableFilter = {
  equals?: Maybe<Scalars["Int"]>;
  in?: Maybe<Array<Scalars["Int"]>>;
  notIn?: Maybe<Array<Scalars["Int"]>>;
  lt?: Maybe<Scalars["Int"]>;
  lte?: Maybe<Scalars["Int"]>;
  gt?: Maybe<Scalars["Int"]>;
  gte?: Maybe<Scalars["Int"]>;
  not?: Maybe<NestedIntNullableFilter>;
};

export type StringFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  not?: Maybe<NestedStringFilter>;
};

export type EnumProductStateFilter = {
  equals?: Maybe<ProductState>;
  in?: Maybe<Array<ProductState>>;
  notIn?: Maybe<Array<ProductState>>;
  not?: Maybe<NestedEnumProductStateFilter>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type StringNullableFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type BoolFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolFilter>;
};

export type FloatFilter = {
  equals?: Maybe<Scalars["Float"]>;
  in?: Maybe<Array<Scalars["Float"]>>;
  notIn?: Maybe<Array<Scalars["Float"]>>;
  lt?: Maybe<Scalars["Float"]>;
  lte?: Maybe<Scalars["Float"]>;
  gt?: Maybe<Scalars["Float"]>;
  gte?: Maybe<Scalars["Float"]>;
  not?: Maybe<NestedFloatFilter>;
};

export type AdminWhereInput = {
  AND?: Maybe<Array<AdminWhereInput>>;
  OR?: Maybe<Array<AdminWhereInput>>;
  NOT?: Maybe<Array<AdminWhereInput>>;
  id?: Maybe<IntFilter>;
  loginId?: Maybe<StringFilter>;
  password?: Maybe<StringFilter>;
  state?: Maybe<EnumAdminStateFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  product?: Maybe<ProductListRelationFilter>;
};

export type OrderListRelationFilter = {
  every?: Maybe<OrderWhereInput>;
  some?: Maybe<OrderWhereInput>;
  none?: Maybe<OrderWhereInput>;
};

export type ProductOptionListRelationFilter = {
  every?: Maybe<ProductOptionWhereInput>;
  some?: Maybe<ProductOptionWhereInput>;
  none?: Maybe<ProductOptionWhereInput>;
};

export type ProductOptionNameListRelationFilter = {
  every?: Maybe<ProductOptionNameWhereInput>;
  some?: Maybe<ProductOptionNameWhereInput>;
  none?: Maybe<ProductOptionNameWhereInput>;
};

export type ProductStoreListRelationFilter = {
  every?: Maybe<ProductStoreWhereInput>;
  some?: Maybe<ProductStoreWhereInput>;
  none?: Maybe<ProductStoreWhereInput>;
};

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export type AdminOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  loginId?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  product?: Maybe<ProductOrderByRelationAggregateInput>;
};

export type OrderOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type ProductOptionOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type ProductOptionNameOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type ProductStoreOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type ProductUq_User_Id_Taobao_Product_IdCompoundUniqueInput = {
  userId: Scalars["Int"];
  taobaoProductId: Scalars["Int"];
};

export type EnumUserStateFilter = {
  equals?: Maybe<UserState>;
  in?: Maybe<Array<UserState>>;
  notIn?: Maybe<Array<UserState>>;
  not?: Maybe<NestedEnumUserStateFilter>;
};

export type ProductListRelationFilter = {
  every?: Maybe<ProductWhereInput>;
  some?: Maybe<ProductWhereInput>;
  none?: Maybe<ProductWhereInput>;
};

export type PurchaseLogListRelationFilter = {
  every?: Maybe<PurchaseLogWhereInput>;
  some?: Maybe<PurchaseLogWhereInput>;
  none?: Maybe<PurchaseLogWhereInput>;
};

export type UserInfoWhereInput = {
  AND?: Maybe<Array<UserInfoWhereInput>>;
  OR?: Maybe<Array<UserInfoWhereInput>>;
  NOT?: Maybe<Array<UserInfoWhereInput>>;
  userId?: Maybe<IntFilter>;
  phone?: Maybe<StringNullableFilter>;
  marginRate?: Maybe<FloatFilter>;
  defaultShippingFee?: Maybe<IntFilter>;
  fixImageTop?: Maybe<StringNullableFilter>;
  fixImageBottom?: Maybe<StringNullableFilter>;
  cnyRate?: Maybe<FloatFilter>;
  productCollectCount?: Maybe<IntFilter>;
  maxProductLimit?: Maybe<IntNullableFilter>;
  additionalShippingFeeJeju?: Maybe<IntFilter>;
  asTel?: Maybe<StringNullableFilter>;
  asInformation?: Maybe<StringNullableFilter>;
  refundShippingFee?: Maybe<IntFilter>;
  exchangeShippingFee?: Maybe<IntFilter>;
  naverOriginCode?: Maybe<StringFilter>;
  naverOrigin?: Maybe<StringFilter>;
  coupangOutboundShippingTimeDay?: Maybe<IntFilter>;
  coupangUnionDeliveryType?: Maybe<StringFilter>;
  coupangMaximumBuyForPerson?: Maybe<IntFilter>;
  naverStoreUrl?: Maybe<StringFilter>;
  coupangLoginId?: Maybe<StringFilter>;
  coupangVendorId?: Maybe<StringFilter>;
  coupangAccessKey?: Maybe<StringFilter>;
  coupangSecretKey?: Maybe<StringFilter>;
  user?: Maybe<UserWhereInput>;
};

export type UserLogListRelationFilter = {
  every?: Maybe<UserLogWhereInput>;
  some?: Maybe<UserLogWhereInput>;
  none?: Maybe<UserLogWhereInput>;
};

export type UserQuestionListRelationFilter = {
  every?: Maybe<UserQuestionWhereInput>;
  some?: Maybe<UserQuestionWhereInput>;
  none?: Maybe<UserQuestionWhereInput>;
};

export type WordTableListRelationFilter = {
  every?: Maybe<WordTableWhereInput>;
  some?: Maybe<WordTableWhereInput>;
  none?: Maybe<WordTableWhereInput>;
};

export type ProductOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type PurchaseLogOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type UserInfoOrderByWithRelationInput = {
  userId?: Maybe<SortOrder>;
  phone?: Maybe<SortOrder>;
  marginRate?: Maybe<SortOrder>;
  defaultShippingFee?: Maybe<SortOrder>;
  fixImageTop?: Maybe<SortOrder>;
  fixImageBottom?: Maybe<SortOrder>;
  cnyRate?: Maybe<SortOrder>;
  productCollectCount?: Maybe<SortOrder>;
  maxProductLimit?: Maybe<SortOrder>;
  additionalShippingFeeJeju?: Maybe<SortOrder>;
  asTel?: Maybe<SortOrder>;
  asInformation?: Maybe<SortOrder>;
  refundShippingFee?: Maybe<SortOrder>;
  exchangeShippingFee?: Maybe<SortOrder>;
  naverOriginCode?: Maybe<SortOrder>;
  naverOrigin?: Maybe<SortOrder>;
  coupangOutboundShippingTimeDay?: Maybe<SortOrder>;
  coupangUnionDeliveryType?: Maybe<SortOrder>;
  coupangMaximumBuyForPerson?: Maybe<SortOrder>;
  naverStoreUrl?: Maybe<SortOrder>;
  coupangLoginId?: Maybe<SortOrder>;
  coupangVendorId?: Maybe<SortOrder>;
  coupangAccessKey?: Maybe<SortOrder>;
  coupangSecretKey?: Maybe<SortOrder>;
  user?: Maybe<UserOrderByWithRelationInput>;
};

export type UserLogOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type UserQuestionOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type WordTableOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type ProductOptionUq_Product_Id_Sku_IdCompoundUniqueInput = {
  productId: Scalars["Int"];
  taobaoSkuId: Scalars["String"];
};

export type ProductOptionUq_Product_OptionCompoundUniqueInput = {
  optionValue1Id: Scalars["Int"];
  optionValue2Id: Scalars["Int"];
  optionValue3Id: Scalars["Int"];
};

export type ProductOptionValueListRelationFilter = {
  every?: Maybe<ProductOptionValueWhereInput>;
  some?: Maybe<ProductOptionValueWhereInput>;
  none?: Maybe<ProductOptionValueWhereInput>;
};

export type ProductOptionValueOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type ProductStoreStateWhereInput = {
  AND?: Maybe<Array<ProductStoreStateWhereInput>>;
  OR?: Maybe<Array<ProductStoreStateWhereInput>>;
  NOT?: Maybe<Array<ProductStoreStateWhereInput>>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  productStore?: Maybe<ProductStoreListRelationFilter>;
  productStoreLog?: Maybe<ProductStoreLogListRelationFilter>;
};

export type ProductStoreLogListRelationFilter = {
  every?: Maybe<ProductStoreLogWhereInput>;
  some?: Maybe<ProductStoreLogWhereInput>;
  none?: Maybe<ProductStoreLogWhereInput>;
};

export type ProductStoreStateOrderByWithRelationInput = {
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  productStore?: Maybe<ProductStoreOrderByRelationAggregateInput>;
  productStoreLog?: Maybe<ProductStoreLogOrderByRelationAggregateInput>;
};

export type ProductStoreLogOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type EnumProductStoreLogUploadStateFilter = {
  equals?: Maybe<ProductStoreLogUploadState>;
  in?: Maybe<Array<ProductStoreLogUploadState>>;
  notIn?: Maybe<Array<ProductStoreLogUploadState>>;
  not?: Maybe<NestedEnumProductStoreLogUploadStateFilter>;
};

export type FaqListRelationFilter = {
  every?: Maybe<FaqWhereInput>;
  some?: Maybe<FaqWhereInput>;
  none?: Maybe<FaqWhereInput>;
};

export type FaqOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type DateTimeNullableFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeNullableFilter>;
};

export type EnumOrderStateFilter = {
  equals?: Maybe<OrderState>;
  in?: Maybe<Array<OrderState>>;
  notIn?: Maybe<Array<OrderState>>;
  not?: Maybe<NestedEnumOrderStateFilter>;
};

export type BoolNullableFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolNullableFilter>;
};

export type EnumTaobaoOrderStateFilter = {
  equals?: Maybe<TaobaoOrderState>;
  in?: Maybe<Array<TaobaoOrderState>>;
  notIn?: Maybe<Array<TaobaoOrderState>>;
  not?: Maybe<NestedEnumTaobaoOrderStateFilter>;
};

export type FloatNullableFilter = {
  equals?: Maybe<Scalars["Float"]>;
  in?: Maybe<Array<Scalars["Float"]>>;
  notIn?: Maybe<Array<Scalars["Float"]>>;
  lt?: Maybe<Scalars["Float"]>;
  lte?: Maybe<Scalars["Float"]>;
  gt?: Maybe<Scalars["Float"]>;
  gte?: Maybe<Scalars["Float"]>;
  not?: Maybe<NestedFloatNullableFilter>;
};

export type WordTableUq_Word_Table_WordCompoundUniqueInput = {
  userId: Scalars["Int"];
  findWord: Scalars["String"];
};

export type NestedIntFilter = {
  equals?: Maybe<Scalars["Int"]>;
  in?: Maybe<Array<Scalars["Int"]>>;
  notIn?: Maybe<Array<Scalars["Int"]>>;
  lt?: Maybe<Scalars["Int"]>;
  lte?: Maybe<Scalars["Int"]>;
  gt?: Maybe<Scalars["Int"]>;
  gte?: Maybe<Scalars["Int"]>;
  not?: Maybe<NestedIntFilter>;
};

export type NestedIntNullableFilter = {
  equals?: Maybe<Scalars["Int"]>;
  in?: Maybe<Array<Scalars["Int"]>>;
  notIn?: Maybe<Array<Scalars["Int"]>>;
  lt?: Maybe<Scalars["Int"]>;
  lte?: Maybe<Scalars["Int"]>;
  gt?: Maybe<Scalars["Int"]>;
  gte?: Maybe<Scalars["Int"]>;
  not?: Maybe<NestedIntNullableFilter>;
};

export type NestedStringFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  not?: Maybe<NestedStringFilter>;
};

export type NestedEnumProductStateFilter = {
  equals?: Maybe<ProductState>;
  in?: Maybe<Array<ProductState>>;
  notIn?: Maybe<Array<ProductState>>;
  not?: Maybe<NestedEnumProductStateFilter>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type NestedStringNullableFilter = {
  equals?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  notIn?: Maybe<Array<Scalars["String"]>>;
  lt?: Maybe<Scalars["String"]>;
  lte?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  gte?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  startsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type NestedBoolFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolFilter>;
};

export type NestedFloatFilter = {
  equals?: Maybe<Scalars["Float"]>;
  in?: Maybe<Array<Scalars["Float"]>>;
  notIn?: Maybe<Array<Scalars["Float"]>>;
  lt?: Maybe<Scalars["Float"]>;
  lte?: Maybe<Scalars["Float"]>;
  gt?: Maybe<Scalars["Float"]>;
  gte?: Maybe<Scalars["Float"]>;
  not?: Maybe<NestedFloatFilter>;
};

export type EnumAdminStateFilter = {
  equals?: Maybe<AdminState>;
  in?: Maybe<Array<AdminState>>;
  notIn?: Maybe<Array<AdminState>>;
  not?: Maybe<NestedEnumAdminStateFilter>;
};

export type NestedEnumUserStateFilter = {
  equals?: Maybe<UserState>;
  in?: Maybe<Array<UserState>>;
  notIn?: Maybe<Array<UserState>>;
  not?: Maybe<NestedEnumUserStateFilter>;
};

export type PurchaseLogWhereInput = {
  AND?: Maybe<Array<PurchaseLogWhereInput>>;
  OR?: Maybe<Array<PurchaseLogWhereInput>>;
  NOT?: Maybe<Array<PurchaseLogWhereInput>>;
  id?: Maybe<IntFilter>;
  userId?: Maybe<IntFilter>;
  payAmount?: Maybe<IntFilter>;
  payId?: Maybe<StringNullableFilter>;
  state?: Maybe<EnumPurchaseLogStateFilter>;
  planInfo?: Maybe<StringFilter>;
  type?: Maybe<EnumPurchaseLogTypeFilter>;
  purchasedAt?: Maybe<DateTimeFilter>;
  expiredAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserWhereInput>;
};

export type NestedEnumProductStoreLogUploadStateFilter = {
  equals?: Maybe<ProductStoreLogUploadState>;
  in?: Maybe<Array<ProductStoreLogUploadState>>;
  notIn?: Maybe<Array<ProductStoreLogUploadState>>;
  not?: Maybe<NestedEnumProductStoreLogUploadStateFilter>;
};

export type NestedDateTimeNullableFilter = {
  equals?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  notIn?: Maybe<Array<Scalars["DateTime"]>>;
  lt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  gt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  not?: Maybe<NestedDateTimeNullableFilter>;
};

export type NestedEnumOrderStateFilter = {
  equals?: Maybe<OrderState>;
  in?: Maybe<Array<OrderState>>;
  notIn?: Maybe<Array<OrderState>>;
  not?: Maybe<NestedEnumOrderStateFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: Maybe<Scalars["Boolean"]>;
  not?: Maybe<NestedBoolNullableFilter>;
};

export type NestedEnumTaobaoOrderStateFilter = {
  equals?: Maybe<TaobaoOrderState>;
  in?: Maybe<Array<TaobaoOrderState>>;
  notIn?: Maybe<Array<TaobaoOrderState>>;
  not?: Maybe<NestedEnumTaobaoOrderStateFilter>;
};

export type NestedFloatNullableFilter = {
  equals?: Maybe<Scalars["Float"]>;
  in?: Maybe<Array<Scalars["Float"]>>;
  notIn?: Maybe<Array<Scalars["Float"]>>;
  lt?: Maybe<Scalars["Float"]>;
  lte?: Maybe<Scalars["Float"]>;
  gt?: Maybe<Scalars["Float"]>;
  gte?: Maybe<Scalars["Float"]>;
  not?: Maybe<NestedFloatNullableFilter>;
};

export type NestedEnumAdminStateFilter = {
  equals?: Maybe<AdminState>;
  in?: Maybe<Array<AdminState>>;
  notIn?: Maybe<Array<AdminState>>;
  not?: Maybe<NestedEnumAdminStateFilter>;
};

export type EnumPurchaseLogStateFilter = {
  equals?: Maybe<PurchaseLogState>;
  in?: Maybe<Array<PurchaseLogState>>;
  notIn?: Maybe<Array<PurchaseLogState>>;
  not?: Maybe<NestedEnumPurchaseLogStateFilter>;
};

export type EnumPurchaseLogTypeFilter = {
  equals?: Maybe<PurchaseLogType>;
  in?: Maybe<Array<PurchaseLogType>>;
  notIn?: Maybe<Array<PurchaseLogType>>;
  not?: Maybe<NestedEnumPurchaseLogTypeFilter>;
};

export type NestedEnumPurchaseLogStateFilter = {
  equals?: Maybe<PurchaseLogState>;
  in?: Maybe<Array<PurchaseLogState>>;
  notIn?: Maybe<Array<PurchaseLogState>>;
  not?: Maybe<NestedEnumPurchaseLogStateFilter>;
};

export type NestedEnumPurchaseLogTypeFilter = {
  equals?: Maybe<PurchaseLogType>;
  in?: Maybe<Array<PurchaseLogType>>;
  notIn?: Maybe<Array<PurchaseLogType>>;
  not?: Maybe<NestedEnumPurchaseLogTypeFilter>;
};

export type Query = {
  __typename?: "Query";
  whoami?: Maybe<Scalars["String"]>;
  selectMyInfoByUser: User;
  selectUsersByAdmin: Array<User>;
  selectUsersCountByAdmin: Scalars["Int"];
  selectCnyRateByEveryone: Scalars["Float"];
  selectTaobaoRefreshDayByEveryone: Scalars["Int"];
  selectFreeUserProductLimitByAdmin: Scalars["Int"];
  selectFreeUserDayLimitByAdmin: Scalars["Int"];
  selectTaobaoProductsByUser: Array<TaobaoProduct>;
  selectTaobaoProductsByAdmin: Array<TaobaoProduct>;
  selectTaobaoProductsCountByAdmin?: Maybe<Scalars["Int"]>;
  selectMyProductByUser: Array<Product>;
  selectMyProductsCountByUser: Scalars["Int"];
  selectProductsByAdmin: Array<Product>;
  selectProductsCountByAdmin?: Maybe<Scalars["Int"]>;
  selectProductsBySomeone: Array<Product>;
  selectProductsCountBySomeone?: Maybe<Scalars["Int"]>;
  getRegisterProductsDataByUser: Scalars["String"];
  selectCategoriesBySomeone: Array<Category>;
  searchCategoriesBySomeone: Array<Category>;
  selectCategoriesByHierarchicalBySomeone: Array<CategorySelectType>;
  getExcelSampleUrlBySomeone: Scalars["String"];
  selectFaqCategoriesByEveryone: Array<FaqCategory>;
  selectFaqsByEveryone: Array<Faq>;
  selectNoticesByEveryone: Array<Notice>;
  selectNoticeByEveryone: Notice;
  selectFaqCategoryCountByAdmin?: Maybe<Scalars["Int"]>;
  selectFaqCountByAdmin?: Maybe<Scalars["Int"]>;
  selectNoticeCountByAdmin?: Maybe<Scalars["Int"]>;
  selectUserQuestionBySomeone: Array<UserQuestion>;
  selectUserQuestionCountBySomeone?: Maybe<Scalars["Int"]>;
  selectOrdersByUser: Array<Order>;
  selectPlanInfosForEveryone: Array<PlanInfo>;
  selectTaobaoOrdersByAdmin: Array<TaobaoOrder>;
  selectWordTablesBySomeone: Array<WordTable>;
  selectSiilInfoBySomeone: Array<SiilItems>;
  t_getEncodedSetInfo?: Maybe<Scalars["String"]>;
  t_get?: Maybe<Scalars["String"]>;
  translateText: Scalars["String"];
};

export type QuerySelectUsersByAdminArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<UserWhereUniqueInput>;
};

export type QuerySelectUsersCountByAdminArgs = {
  where?: Maybe<UserWhereInput>;
};

export type QuerySelectTaobaoProductsByUserArgs = {
  where?: Maybe<TaobaoProductWhereInput>;
  orderBy?: Maybe<Array<TaobaoProductOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<TaobaoProductWhereUniqueInput>;
};

export type QuerySelectTaobaoProductsByAdminArgs = {
  where?: Maybe<TaobaoProductWhereInput>;
  orderBy?: Maybe<Array<TaobaoProductOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<TaobaoProductWhereUniqueInput>;
};

export type QuerySelectTaobaoProductsCountByAdminArgs = {
  where?: Maybe<TaobaoProductWhereInput>;
};

export type QuerySelectMyProductByUserArgs = {
  where?: Maybe<ProductWhereInput>;
  orderBy?: Maybe<Array<ProductOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductWhereUniqueInput>;
};

export type QuerySelectMyProductsCountByUserArgs = {
  where?: Maybe<ProductWhereInput>;
};

export type QuerySelectProductsByAdminArgs = {
  where?: Maybe<ProductWhereInput>;
  orderBy?: Maybe<Array<ProductOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductWhereUniqueInput>;
};

export type QuerySelectProductsCountByAdminArgs = {
  where?: Maybe<ProductWhereInput>;
};

export type QuerySelectProductsBySomeoneArgs = {
  where?: Maybe<ProductWhereInput>;
  orderBy?: Maybe<Array<ProductOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<ProductWhereUniqueInput>;
};

export type QuerySelectProductsCountBySomeoneArgs = {
  where?: Maybe<ProductWhereInput>;
};

export type QueryGetRegisterProductsDataByUserArgs = {
  productIds: Array<Scalars["Int"]>;
  siteCode: Scalars["String"];
};

export type QuerySelectCategoriesBySomeoneArgs = {
  where?: Maybe<CategoryWhereInput>;
  orderBy?: Maybe<Array<CategoryOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<CategoryWhereUniqueInput>;
};

export type QuerySearchCategoriesBySomeoneArgs = {
  code?: Maybe<Scalars["String"]>;
  keyword?: Maybe<Scalars["String"]>;
};

export type QuerySelectCategoriesByHierarchicalBySomeoneArgs = {
  code?: Maybe<Scalars["String"]>;
};

export type QueryGetExcelSampleUrlBySomeoneArgs = {
  type: ExcelSampleEnum;
};

export type QuerySelectFaqCategoriesByEveryoneArgs = {
  where?: Maybe<FaqCategoryWhereInput>;
  orderBy?: Maybe<Array<FaqCategoryOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<FaqCategoryWhereUniqueInput>;
};

export type QuerySelectFaqsByEveryoneArgs = {
  where?: Maybe<FaqWhereInput>;
  orderBy?: Maybe<Array<FaqOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<FaqWhereUniqueInput>;
};

export type QuerySelectNoticesByEveryoneArgs = {
  where?: Maybe<NoticeWhereInput>;
  orderBy?: Maybe<Array<NoticeOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<NoticeWhereUniqueInput>;
};

export type QuerySelectNoticeByEveryoneArgs = {
  noticeId: Scalars["Int"];
};

export type QuerySelectFaqCategoryCountByAdminArgs = {
  where?: Maybe<FaqCategoryWhereInput>;
};

export type QuerySelectFaqCountByAdminArgs = {
  where?: Maybe<FaqWhereInput>;
};

export type QuerySelectNoticeCountByAdminArgs = {
  where?: Maybe<NoticeWhereInput>;
};

export type QuerySelectUserQuestionBySomeoneArgs = {
  where?: Maybe<UserQuestionWhereInput>;
  orderBy?: Maybe<Array<UserQuestionOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<UserQuestionWhereUniqueInput>;
};

export type QuerySelectUserQuestionCountBySomeoneArgs = {
  where?: Maybe<UserQuestionWhereInput>;
};

export type QuerySelectOrdersByUserArgs = {
  where?: Maybe<OrderWhereInput>;
  orderBy?: Maybe<Array<OrderOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<OrderWhereUniqueInput>;
};

export type QuerySelectPlanInfosForEveryoneArgs = {
  where?: Maybe<PlanInfoWhereInput>;
  orderBy?: Maybe<Array<PlanInfoOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<PlanInfoWhereUniqueInput>;
};

export type QuerySelectTaobaoOrdersByAdminArgs = {
  where?: Maybe<TaobaoOrderWhereInput>;
  orderBy?: Maybe<Array<TaobaoOrderOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<TaobaoOrderWhereUniqueInput>;
};

export type QuerySelectWordTablesBySomeoneArgs = {
  where?: Maybe<WordTableWhereInput>;
  orderBy?: Maybe<Array<WordTableOrderByWithRelationInput>>;
  take?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<WordTableWhereUniqueInput>;
};

export type QuerySelectSiilInfoBySomeoneArgs = {
  code: Scalars["String"];
};

export type QueryTranslateTextArgs = {
  engine?: TranslateEngineEnumType;
  text: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  signUpUserByEveryone: Scalars["String"];
  signInUserByEveryone: SignInType;
  signInUserForImageProgramByEveryone: Scalars["String"];
  connectSocialIdByUser: User;
  updatePhoneByUser: Scalars["Boolean"];
  updateMyDataByUser: Scalars["Boolean"];
  changePasswordByUser: Scalars["Boolean"];
  withdrawByUser: Scalars["Boolean"];
  setMaxProductLimitByAdmin: Scalars["Boolean"];
  updateCnyRateByAdmin: Scalars["Float"];
  updateTaobaoRefreshDayByAdmin: Scalars["Int"];
  updateFreeUserProductLimitByAdmin: Scalars["Int"];
  updateFreeUserDayLimitByAdmin: Scalars["Int"];
  /** 키워드 검색으로 상품 가져오기 */
  getTaobaoItemsByUser: Scalars["Boolean"];
  /** 상품 ID/URL로 상품 가져오기 */
  getTaobaoItemUsingNumIidsByUser: Scalars["Int"];
  /** 상품 ID/URL로 상품 가져오기 */
  getTaobaoItemUsingExcelFileByUser: Scalars["Int"];
  /** 키워드 검색으로 상품 가져오기 */
  getTaobaoItemsByAdmin: Scalars["Boolean"];
  /** 상품 ID/URL로 상품 가져오기 */
  getTaobaoItemUsingNumIidsByAdmin: Scalars["Int"];
  /** 상품 ID/URL로 상품 가져오기 */
  getTaobaoItemUsingExcelFileByAdmin: Scalars["Int"];
  getTaobaoItemUsingExtensionByUser: Scalars["String"];
  updateProductImageBySomeone: Product;
  updateProductByUser: Product;
  updateProductNameByUser: Product;
  updateManyProductCategoryByUser: Scalars["Int"];
  updateManyProductSiilInfoByUser: Scalars["Int"];
  deleteProductByUser: Scalars["Boolean"];
  updateProductPriceByUser: Scalars["Int"];
  endProductSellStateByUser: Scalars["Int"];
  updateProductByAdmin: Product;
  updateProductNameByAdmin: Product;
  updateManyProductCategoryByAdmin: Scalars["Int"];
  updateManyProductSiilInfoByAdmin: Scalars["Int"];
  deleteProductByAdmin: Scalars["Boolean"];
  updateProductPriceByAdmin: Scalars["Int"];
  endProductSellStateByAdmin: Scalars["Int"];
  transferProductsToUserByAdmin: Scalars["String"];
  setVisibleStateToProductOptionValueBySomeone: Scalars["Boolean"];
  updateProductStoreUrlInfoBySomeone: Scalars["Boolean"];
  createNoticeByAdmin: Scalars["Boolean"];
  updateNoticeByAdmin: Scalars["Boolean"];
  deleteNoticeByAdmin: Scalars["Int"];
  createFaqCategoryByAdmin: FaqCategory;
  modifyFaqCategoryByAdmin: FaqCategory;
  sortFaqCategoryByAdmin: Scalars["Boolean"];
  deleteFaqCategoryByAdmin: Scalars["Boolean"];
  createFaqByAdmin: Scalars["Boolean"];
  updateFaqByAdmin: Scalars["Boolean"];
  deleteFaqByAdmin: Scalars["Int"];
  createUserQuestionByUser: Scalars["Boolean"];
  updateUserQuestionByAdmin: Scalars["Boolean"];
  scrapOrderByUser: Scalars["String"];
  changeOrderStateByUser: Scalars["String"];
  purchasePlanByUser: Scalars["Int"];
  cancelPurchasePlanByUser: Scalars["Boolean"];
  updatePlanInfoByAdmin: PlanInfo;
  setPurchaseInfoByAdmin: Scalars["Boolean"];
  setUserStopTest: Scalars["Boolean"];
  deleteStore: Scalars["Boolean"];
  invalidatePurchaseInfoByAdmin: Scalars["Boolean"];
  signUpAdminByAdmin: Scalars["Boolean"];
  signInAdminByEveryone: SignInType;
  changeMyPasswordByAdmin: Scalars["Boolean"];
  addWordByUser: Scalars["Boolean"];
  modifyWordByUser: Scalars["Boolean"];
  deleteWordByUser: Scalars["Boolean"];
  addWordByExcelByUser: Scalars["Boolean"];
  renewToken?: Maybe<SignInType>;
  requestPhoneVerificationByEveryone: Scalars["Boolean"];
  verifyPhoneByEveryone: Scalars["Int"];
  t_createProduct?: Maybe<Scalars["Boolean"]>;
  translateProductTextByUser: Scalars["String"];
  translateProductsTextByUser: Scalars["String"];
  cardPayTest: Scalars["String"];
};

export type MutationUpdateUserLogArgs = {
  id: Scalars["Int"];
  isRead: Scalars["Boolean"];
};

export type MutationCreateUserLogArgs = {
  title: Scalars["String"];
  payloadData: Scalars["String"];
};

export type MutationExtendMyAccountByUser = {
  masterId: Scalars["Int"];
  slaveIds: Array<Scalars["Int"]>;
};

export type MutationSignUpUserByEveryoneArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  phone: Scalars["String"];
  verificationId: Scalars["Int"];
};

export type MutationSignInUserByEveryoneArgs = {
  userType: UserSocialType;
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSignInUserForImageProgramByEveryoneArgs = {
  userType: UserLoginType;
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationConnectSocialIdByUserArgs = {
  userType: UserSocialType;
  socialId: Scalars["String"];
};

export type MutationUpdatePhoneByUserArgs = {
  phone: Scalars["String"];
  verificationId: Scalars["Int"];
};

export type MutationUpdateMyDataByUserArgs = {
  marginRate?: Maybe<Scalars["Float"]>;
  defaultShippingFee?: Maybe<Scalars["Int"]>;
  fixImageTop?: Maybe<Scalars["Upload"]>;
  fixImageBottom?: Maybe<Scalars["Upload"]>;
  cnyRate?: Maybe<Scalars["Float"]>;
  additionalShippingFeeJeju?: Maybe<Scalars["Int"]>;
  asTel?: Maybe<Scalars["String"]>;
  asInformation?: Maybe<Scalars["String"]>;
  refundShippingFee?: Maybe<Scalars["Int"]>;
  exchangeShippingFee?: Maybe<Scalars["Int"]>;
  naverOriginCode?: Maybe<Scalars["String"]>;
  naverOrigin?: Maybe<Scalars["String"]>;
  coupangOutboundShippingTimeDay?: Maybe<Scalars["Int"]>;
  coupangUnionDeliveryType?: Maybe<Scalars["String"]>;
  coupangMaximumBuyForPerson?: Maybe<Scalars["Int"]>;
  naverStoreUrl?: Maybe<Scalars["String"]>;
  coupangLoginId?: Maybe<Scalars["String"]>;
  coupangVendorId?: Maybe<Scalars["String"]>;
  coupangAccessKey?: Maybe<Scalars["String"]>;
  coupangSecretKey?: Maybe<Scalars["String"]>;
};

export type MutationChangePasswordByUserArgs = {
  currentPassword: Scalars["String"];
  newPassword: Scalars["String"];
};

export type MutationSetMaxProductLimitByAdminArgs = {
  userId: Scalars["Int"];
  productLimit?: Maybe<Scalars["Int"]>;
};

export type MutationDeleteStore = {
  id: Scalars["Int"];
  store: Scalars["String"];
};

export type MutationcardPayTest = {
  email: Scalars["String"];
};

export type MutationUpdateCnyRateByAdminArgs = {
  cnyRate: Scalars["Float"];
};

export type MutationUpdateTaobaoRefreshDayByAdminArgs = {
  day: Scalars["Int"];
};

export type MutationUpdateFreeUserProductLimitByAdminArgs = {
  day: Scalars["Int"];
};

export type MutationUpdateFreeUserDayLimitByAdminArgs = {
  day: Scalars["Int"];
};

export type MutationGetTaobaoItemsByUserArgs = {
  query: Scalars["String"];
  orderBy: TaobaoItemOrderBy;
  startPrice?: Maybe<Scalars["Float"]>;
  endPrice?: Maybe<Scalars["Float"]>;
  page?: Maybe<Scalars["Int"]>;
  pageCount?: Maybe<Scalars["Int"]>;
  categoryCode?: Maybe<Scalars["String"]>;
  siilCode?: Maybe<Scalars["String"]>;
};

export type MutationGetTaobaoItemUsingNumIidsByUserArgs = {
  taobaoIds: Array<Scalars["String"]>;
  categoryCode?: Maybe<Scalars["String"]>;
  siilCode?: Maybe<Scalars["String"]>;
};

export type MutationGetTaobaoItemUsingExcelFileByUserArgs = {
  data: Scalars["Upload"];
  categoryCode?: Maybe<Scalars["String"]>;
  siilCode?: Maybe<Scalars["String"]>;
};

export type MutationGetTaobaoItemsByAdminArgs = {
  query: Scalars["String"];
  orderBy: TaobaoItemOrderBy;
  startPrice?: Maybe<Scalars["Float"]>;
  endPrice?: Maybe<Scalars["Float"]>;
  page?: Maybe<Scalars["Int"]>;
  pageCount?: Maybe<Scalars["Int"]>;
  categoryCode?: Maybe<Scalars["String"]>;
  siilCode?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["Int"]>;
};

export type MutationGetTaobaoItemUsingNumIidsByAdminArgs = {
  taobaoIds: Array<Scalars["String"]>;
  categoryCode?: Maybe<Scalars["String"]>;
  siilCode?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["Int"]>;
};

export type MutationGetTaobaoItemUsingExcelFileByAdminArgs = {
  data: Scalars["Upload"];
  categoryCode?: Maybe<Scalars["String"]>;
  siilCode?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["Int"]>;
};

export type MutationGetTaobaoItemUsingExtensionByUserArgs = {
  data: Scalars["String"];
};

export type MutationInitProductImageArgs = {
  productId: Scalars["Int"];
};

export type MutationUpdateProductImageBySomeoneArgs = {
  productId: Scalars["Int"];
  description?: Maybe<Scalars["String"]>;
  optionValues: Array<ProductOptionValueImageUpdateInput>;
  thumbnails?: Maybe<Array<ProductThumbnailImageUpdateInput>>;
};

export type MutationUpdateProductByUserArgs = {
  productId: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  localShippingFee?: Maybe<Scalars["Int"]>;
  localShippingCode?: Maybe<Scalars["Int"]>;
  shippingFee?: Maybe<Scalars["Int"]>;
  options: Array<ProductOptionUpdateInput>;
  optionNames: Array<ProductOptionNameUpdateInput>;
  optionValues: Array<ProductOptionValueUpdateInput>;
  thumbnails?: Maybe<Array<ProductThumbnailUpdateInput>>;
  categoryCode?: Maybe<Scalars["String"]>;
  categoryA077?: Maybe<Scalars["String"]>;
  categoryA077Name?: Maybe<Scalars["String"]>;
  categoryB378?: Maybe<Scalars["String"]>;
  categoryB378Name?: Maybe<Scalars["String"]>;
  categoryA112?: Maybe<Scalars["String"]>;
  categoryA112Name?: Maybe<Scalars["String"]>;
  categoryA027?: Maybe<Scalars["String"]>;
  categoryA027Name?: Maybe<Scalars["String"]>;
  categoryA001?: Maybe<Scalars["String"]>;
  categoryA001Name?: Maybe<Scalars["String"]>;
  categoryA006?: Maybe<Scalars["String"]>;
  categoryA006Name?: Maybe<Scalars["String"]>;
  categoryB719?: Maybe<Scalars["String"]>;
  categoryB719Name?: Maybe<Scalars["String"]>;
  categoryA113?: Maybe<Scalars["String"]>;
  categoryA113Name?: Maybe<Scalars["String"]>;
  categoryA524?: Maybe<Scalars["String"]>;
  categoryA524Name?: Maybe<Scalars["String"]>;
  categoryA525?: Maybe<Scalars["String"]>;
  categoryA525Name?: Maybe<Scalars["String"]>;
  categoryB956?: Maybe<Scalars["String"]>;
  categoryB956Name?: Maybe<Scalars["String"]>;
  siilCode?: Maybe<Scalars["String"]>;
  siilData?: Maybe<Array<SiilInput>>;
  searchTags?: Maybe<Scalars["String"]>;
};

export type MutationDisableUserOptionArgs = {
  id: Scalars["Int"];
};

export type MutationUpdateProductNameByUserArgs = {
  productId: Scalars["Int"];
  name: Scalars["String"];
};

export type MutationUpdateManyProductTagByUserArgs = {
  productIds: Array<Scalars["Int"]>;
  searchTags: Scalars["String"];
};

export type MutationUpdateManyProductNameByUserArgs = {
  productIds: Array<Scalars["Int"]>;
  headText: Scalars["String"];
  bodyText: Scalars["String"];
  tailText: Scalars["String"];
};

export type MutationUpdateManyProductCategoryByUserArgs = {
  productIds: Array<Scalars["Int"]>;
  categoryA077?: Maybe<Scalars["String"]>;
  categoryA077Name?: Maybe<Scalars["String"]>;
  categoryB378?: Maybe<Scalars["String"]>;
  categoryB378Name?: Maybe<Scalars["String"]>;
  categoryA112?: Maybe<Scalars["String"]>;
  categoryA112Name?: Maybe<Scalars["String"]>;
  categoryA027?: Maybe<Scalars["String"]>;
  categoryA027Name?: Maybe<Scalars["String"]>;
  categoryA001?: Maybe<Scalars["String"]>;
  categoryA001Name?: Maybe<Scalars["String"]>;
  categoryA006?: Maybe<Scalars["String"]>;
  categoryA006Name?: Maybe<Scalars["String"]>;
  categoryB719?: Maybe<Scalars["String"]>;
  categoryB719Name?: Maybe<Scalars["String"]>;
  categoryA113?: Maybe<Scalars["String"]>;
  categoryA113Name?: Maybe<Scalars["String"]>;
  categoryA524?: Maybe<Scalars["String"]>;
  categoryA524Name?: Maybe<Scalars["String"]>;
  categoryA525?: Maybe<Scalars["String"]>;
  categoryA525Name?: Maybe<Scalars["String"]>;
  categoryB956?: Maybe<Scalars["String"]>;
  categoryB956Name?: Maybe<Scalars["String"]>;
};

export type MutationUpdateManyProductSiilInfoByUserArgs = {
  productIds: Array<Scalars["Int"]>;
  siilCode: Scalars["String"];
};

export type MutationDeleteProductByUserArgs = {
  productId: Scalars["Int"];
};

export type MutationUpdateProductPriceByUserArgs = {
  productIds: Array<Scalars["Int"]>;
  cnyRate: Scalars["Float"];
  marginRate: Scalars["Float"];
  marginUnitType: Scalars["String"];
  shippingFee: Scalars["Int"];
  localShippingFee: Scalars["Int"];
  localShippingCode: Scalars["Int"];
};

export type MutationEndProductSellStateByUserArgs = {
  productIds: Array<Scalars["Int"]>;
};

export type MutationUpdateProductByAdminArgs = {
  productId: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  localShippingFee?: Maybe<Scalars["Int"]>;
  shippingFee?: Maybe<Scalars["Int"]>;
  options: Array<ProductOptionUpdateInput>;
  optionNames: Array<ProductOptionNameUpdateInput>;
  optionValues: Array<ProductOptionValueUpdateInput>;
  thumbnails?: Maybe<Array<ProductThumbnailUpdateInput>>;
  categoryCode?: Maybe<Scalars["String"]>;
  siilCode?: Maybe<Scalars["String"]>;
  siilData?: Maybe<Array<SiilInput>>;
};

export type MutationUpdateProductNameByAdminArgs = {
  productId: Scalars["Int"];
  name: Scalars["String"];
};

export type MutationUpdateManyProductCategoryByAdminArgs = {
  productIds: Array<Scalars["Int"]>;
  categoryCode: Scalars["String"];
};

export type MutationUpdateManyProductSiilInfoByAdminArgs = {
  productIds: Array<Scalars["Int"]>;
  siilCode: Scalars["String"];
};

export type MutationDeleteProductByAdminArgs = {
  productId: Scalars["Int"];
};

export type MutationUpdateProductPriceByAdminArgs = {
  productIds: Array<Scalars["Int"]>;
  cnyRate: Scalars["Float"];
  marginRate: Scalars["Float"];
  shippingFee: Scalars["Int"];
  localShippingFee: Scalars["Int"];
  localShippingCode: Scalars["Int"];
};

export type MutationEndProductSellStateByAdminArgs = {
  productIds: Array<Scalars["Int"]>;
};

export type MutationTransferProductsToUserByAdminArgs = {
  productIds: Array<Scalars["Int"]>;
  targetUserId: Scalars["Int"];
};

export type MutationSetVisibleStateToProductOptionValueBySomeoneArgs = {
  productOptionValueId: Scalars["Int"];
  isActive: Scalars["Boolean"];
};

export type MutationUpdateProductStoreUrlInfoBySomeoneArgs = {
  productStoreId: Scalars["Int"];
  etcVendorItemId: Scalars["String"];
};

export type MutationCreateNoticeByAdminArgs = {
  title: Scalars["String"];
  content: Scalars["String"];
  attachment?: Maybe<Scalars["Upload"]>;
};

export type MutationUpdateNoticeByAdminArgs = {
  noticeId: Scalars["Int"];
  title?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  attachment?: Maybe<Scalars["Upload"]>;
};

export type MutationDeleteNoticeByAdminArgs = {
  noticeIds: Array<Scalars["Int"]>;
};

export type MutationCreateFaqCategoryByAdminArgs = {
  name: Scalars["String"];
};

export type MutationModifyFaqCategoryByAdminArgs = {
  faqCategoryId: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
  isActive?: Maybe<Scalars["Boolean"]>;
};

export type MutationSortFaqCategoryByAdminArgs = {
  faqCategoryIds: Array<Scalars["Int"]>;
};

export type MutationDeleteFaqCategoryByAdminArgs = {
  faqCategoryId: Scalars["Int"];
};

export type MutationCreateFaqByAdminArgs = {
  faqCategoryId: Scalars["Int"];
  title: Scalars["String"];
  content: Scalars["String"];
};

export type MutationUpdateFaqByAdminArgs = {
  faqId: Scalars["Int"];
  faqCategoryId?: Maybe<Scalars["Int"]>;
  title?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
};

export type MutationDeleteFaqByAdminArgs = {
  faqIds: Array<Scalars["Int"]>;
};

export type MutationCreateUserQuestionByUserArgs = {
  title: Scalars["String"];
  content: Scalars["String"];
  attachment?: Maybe<Array<Scalars["Upload"]>>;
};

export type MutationUpdateUserQuestionByAdminArgs = {
  userQuestionId: Scalars["Int"];
  answer: Scalars["String"];
};

export type MutationScrapOrderByUserArgs = {
  shopDataId: Scalars["Int"];
  collectNewOrder: Scalars["Boolean"];
};

export type MutationChangeOrderStateByUserArgs = {
  orderIds: Array<Scalars["String"]>;
  destState: OrderState;
};

export type MutationPurchasePlanByUserArgs = {
  planInfoId: Scalars["Int"];
  merchantUid: Scalars["String"];
};

export type MutationCancelPurchasePlanByUserArgs = {
  merchantUid: Scalars["String"];
};

export type MutationUpdatePlanInfoByAdminArgs = {
  planId: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Int"]>;
  isActive?: Maybe<Scalars["Boolean"]>;
};

export type MutationSetPurchaseInfoByAdminArgs = {
  userId: Scalars["Int"];
  planInfoId: Scalars["Int"];
  expiredAt?: Maybe<Scalars["DateTime"]>;
};

export type MutationSetMultiPurchaseInfoByAdminArgs = {
  purchaseInputs: Array<purchaseInputs>;
  credit: Scalars["Int"];
};

export type MutationsetUserStopTest = {
  userId: Scalars["Int"];
};

export type MutationInvalidatePurchaseInfoByAdminArgs = {
  purchaseLogId: Scalars["Int"];
};

export type MutationSignUpAdminByAdminArgs = {
  id: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSignInAdminByEveryoneArgs = {
  id: Scalars["String"];
  password: Scalars["String"];
};

export type MutationChangeMyPasswordByAdminArgs = {
  currentPassword: Scalars["String"];
  newPassword: Scalars["String"];
};

export type MutationAddWordByUserArgs = {
  findWord: Scalars["String"];
  replaceWord?: Maybe<Scalars["String"]>;
};

export type MutationModifyWordByUserArgs = {
  wordId: Scalars["Int"];
  findWord: Scalars["String"];
  replaceWord?: Maybe<Scalars["String"]>;
};

export type MutationDeleteWordByUserArgs = {
  wordId: Scalars["Int"];
};

export type MutationAddWordByExcelByUserArgs = {
  data: Scalars["Upload"];
  isReplace: Scalars["Boolean"];
};

export type MutationRenewTokenArgs = {
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
};

export type MutationRequestPhoneVerificationByEveryoneArgs = {
  phoneNumber: Scalars["String"];
};

export type MutationVerifyPhoneByEveryoneArgs = {
  phoneNumber: Scalars["String"];
  verificationNumber: Scalars["String"];
};

export type MutationTranslateProductTextByUserArgs = {
  type: TranslateTargetEnumType;
  id: Scalars["Int"];
};

export type MutationTranslateProductsTextByUserArgs = {
  type: TranslateTargetEnumType;
  ids: Array<Scalars["Int"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  subscribeUserEvent?: Maybe<UserLog>;
  subscribeTaobaoOrderQueueEventByAdmin: Scalars["Int"];
};

export type MutationDeleteUser = {
  userId: Scalars["Int"];
};
