// import { MutationSetProductVisiblityArgs } from './../types';
import { gql } from "@apollo/client";

const MUTATIONS = {
  /** 옵션 체크 on/off */
  SET_VISIBLE_STATE_TO_PRODUCT_OPTION_VALUE_BY_SOMEONE: gql`
    mutation SET_VISIBLE_STATE_TO_PRODUCT_OPTION_VALUE_BY_SOMEONE($productOptionValueId: Int!, $isActive: Boolean!) {
      setVisibleStateToProductOptionValueBySomeone(productOptionValueId: $productOptionValueId, isActive: $isActive)
    }
  `,
  //??
  SET_PRODUCT_VISIBILITY: gql`
    mutation ($productId: [Int!]!, $isVisible: Boolean!) {
      setProductVisiblity(productId: $productId, isVisible: $isVisible)
    }
  `,
  CARD_PAY_TEST: gql`
    mutation cardPayTest($email: String!) {
      cardPayTest(email: $email)
    }
  `,
  //시작

  SIGN_UP_USER: gql`
    mutation ($email: String!, $password: String!, $phone: String!, $verificationId: Int!) {
      signUpUserByEveryone(email: $email, password: $password, phone: $phone, verificationId: $verificationId)
    }
  `,

  SIGN_IN_USER: gql`
    mutation ($userType: UserSocialType!, $email: String!, $password: String!) {
      signInUserByEveryone(userType: $userType, email: $email, password: $password) {
        accessToken
        refreshToken
      }
    }
  `,

  CHAGNE_PASSWORD: gql`
    mutation ($currentPassword: String!, $newPassword: String!) {
      changePasswordByUser(currentPassword: $currentPassword, newPassword: $newPassword)
    }
  `,

  UPDATE_MY_INFO: gql`
    mutation (
      $marginRate: Float
      $defaultShippingFee: Int
      $fixImageTop: Upload
      $fixImageBottom: Upload
      $cnyRate: Float
      $additionalShippingFeeJeju: Int
      $asTel: String
      $asInformation: String
      $refundShippingFee: Int
      $exchangeShippingFee: Int
    ) {
      updateMyDataByUser(
        marginRate: $marginRate
        defaultShippingFee: $defaultShippingFee
        fixImageTop: $fixImageTop
        fixImageBottom: $fixImageBottom
        cnyRate: $cnyRate
        additionalShippingFeeJeju: $additionalShippingFeeJeju
        asTel: $asTel
        asInformation: $asInformation
        refundShippingFee: $refundShippingFee
        exchangeShippingFee: $exchangeShippingFee
      )
    }
  `,

  CONNECT_SOCIAL_ID: gql`
    mutation ($userType: UserSocialType!, $socialId: String!) {
      connectSocialIdByUser(userType: $userType, socialId: $socialId) {
        id
      }
    }
  `,

  CREATE_SHOP_DATA_BY_USER: gql`
    mutation CREATE_SHOP_DATA_BY_USER(
      $siteCode: String!
      $siteUserId: String!
      $siteUserPw: String!
      $siteUseretc1: String!
      $siteUseretc2: String!
      $siteUseretc3: String!
      $siteUseretc4: String!
      $siteUseretc5: String!
      $siteUseretc6: String!
    ) {
      createShopDataByUser(
        siteCode: $siteCode
        siteUserId: $siteUserId
        siteUserPw: $siteUserPw
        siteUseretc1: $siteUseretc1
        siteUseretc2: $siteUseretc2
        siteUseretc3: $siteUseretc3
        siteUseretc4: $siteUseretc4
        siteUseretc5: $siteUseretc5
        siteUseretc6: $siteUseretc6
      ) {
        id
        siteUseretc2 # 네이버가 쓴다
        siteUseretc5 # 쿠팡이 쓴다
      }
    }
  `,

  UPDATE_SHOP_DATA: gql`
    mutation (
      $userShopDataId: Int!
      $siteUserId: String
      $siteUserPw: String
      $siteUseretc1: String
      $siteUseretc2: String
      $siteUseretc3: String
      $siteUseretc4: String
      $siteUseretc5: String
      $siteUseretc6: String
    ) {
      updateShopDataByUser(
        userShopDataId: $userShopDataId
        siteUserId: $siteUserId
        siteUserPw: $siteUserPw
        siteUseretc1: $siteUseretc1
        siteUseretc2: $siteUseretc2
        siteUseretc3: $siteUseretc3
        siteUseretc4: $siteUseretc4
        siteUseretc5: $siteUseretc5
        siteUseretc6: $siteUseretc6
      ) {
        id
      }
    }
  `,

  UPDATE_PRODUCT_PRICE_BY_USER: gql`
    mutation (
      $productIds: [Int!]!
      $cnyRate: Float!
      $marginRate: Float!
      $marginUnitType: String!
      $shippingFee: Int!
      $localShippingFee: Int!
      $localShippingCode: Int
    ) {
      updateProductPriceByUser(
        productIds: $productIds
        cnyRate: $cnyRate
        marginRate: $marginRate
        marginUnitType: $marginUnitType
        shippingFee: $shippingFee
        localShippingFee: $localShippingFee
        localShippingCode: $localShippingCode
      )
    }
  `,

  REQUEST_PHONE_VERIFICATION: gql`
    mutation ($phoneNumber: String!) {
      requestPhoneVerificationByEveryone(phoneNumber: $phoneNumber)
    }
  `,

  VERIFY_PHONE: gql`
    mutation ($phoneNumber: String!, $verificationNumber: String!) {
      verifyPhoneByEveryone(phoneNumber: $phoneNumber, verificationNumber: $verificationNumber)
    }
  `,

  UPDATE_PHONE_NUMBER: gql`
    mutation ($phone: String!, $verificationId: Int!) {
      updatePhoneByUser(phone: $phone, verificationId: $verificationId)
    }
  `,

  GET_TAOBAO_ITEM_WORD: gql`
    mutation ($query: String!, $orderBy: TaobaoItemOrderBy!, $startPrice: Float, $endPrice: Float, $pageCount: Int, $categoryCode: String, $siilCode: String) {
      getTaobaoItemsByUser(
        query: $query
        orderBy: $orderBy
        startPrice: $startPrice
        endPrice: $endPrice
        pageCount: $pageCount
        categoryCode: $categoryCode
        siilCode: $siilCode
      )
    }
  `,

  GET_TAOBAO_ITEM_WORD_BY_ADMIN: gql`
    mutation (
      $query: String!
      $orderBy: TaobaoItemOrderBy!
      $startPrice: Float
      $endPrice: Float
      $pageCount: Int
      $categoryCode: String
      $siilCode: String
      $userId: Int
    ) {
      getTaobaoItemsByAdmin(
        query: $query
        orderBy: $orderBy
        startPrice: $startPrice
        endPrice: $endPrice
        pageCount: $pageCount
        categoryCode: $categoryCode
        siilCode: $siilCode
        userId: $userId
      )
    }
  `,

  GET_TAOBAO_ITEM_ID: gql`
    mutation ($taobaoIds: [String!]!, $categoryCode: String, $siilCode: String) {
      getTaobaoItemUsingNumIidsByUser(taobaoIds: $taobaoIds, categoryCode: $categoryCode, siilCode: $siilCode)
    }
  `,

  GET_TAOBAO_ITEM_ID_BY_ADMIN: gql`
    mutation ($taobaoIds: [String!]!, $categoryCode: String, $siilCode: String, $userId: Int) {
      getTaobaoItemUsingNumIidsByAdmin(taobaoIds: $taobaoIds, categoryCode: $categoryCode, siilCode: $siilCode, userId: $userId)
    }
  `,

  INIT_PRODUCT_IMAGE: gql`
    mutation ($productId: Int!) {
      initProductImageByUser(productId: $productId)
    }
  `,

  UPDATE_PRODUCT_STORE_URL_DATA: gql`
    mutation ($productStoreId: Int!, $etcVendorItemId: String!) {
      updateProductStoreUrlInfoBySomeone(productStoreId: $productStoreId, etcVendorItemId: $etcVendorItemId)
    }
  `,

  UPDATE_PRODUCT_DATA: gql`
    mutation (
      $productId: Int!
      $name: String
      $price: Int
      $description: String
      $shippingFee: Int
      $localShippingFee: Int
      $localShippingCode: Int
      $options: [ProductOptionUpdateInput!]!
      $optionNames: [ProductOptionNameUpdateInput!]!
      $optionValues: [ProductOptionValueUpdateInput!]!
      $thumbnails: [ProductThumbnailUpdateInput!]
      $categoryCode: String
      $categoryA077: String
      $categoryA077Name: String
      $categoryB378: String
      $categoryB378Name: String
      $categoryA112: String
      $categoryA112Name: String
      $categoryA027: String
      $categoryA027Name: String
      $categoryA001: String
      $categoryA001Name: String
      $categoryA006: String
      $categoryA006Name: String
      $categoryB719: String
      $categoryB719Name: String
      $categoryA113: String
      $categoryA113Name: String
      $categoryA524: String
      $categoryA524Name: String
      $categoryA525: String
      $categoryA525Name: String
      $categoryB956: String
      $categoryB956Name: String
      $siilCode: String
      $siilData: [SiilInput!]
      $searchTags: String
    ) {
      updateProductByUser(
        productId: $productId
        name: $name
        price: $price
        description: $description
        shippingFee: $shippingFee
        localShippingFee: $localShippingFee
        localShippingCode: $localShippingCode
        options: $options
        optionNames: $optionNames
        optionValues: $optionValues
        thumbnails: $thumbnails
        categoryCode: $categoryCode
        categoryA077: $categoryA077
        categoryA077Name: $categoryA077Name
        categoryB378: $categoryB378
        categoryB378Name: $categoryB378Name
        categoryA112: $categoryA112
        categoryA112Name: $categoryA112Name
        categoryA027: $categoryA027
        categoryA027Name: $categoryA027Name
        categoryA001: $categoryA001
        categoryA001Name: $categoryA001Name
        categoryA006: $categoryA006
        categoryA006Name: $categoryA006Name
        categoryB719: $categoryB719
        categoryB719Name: $categoryB719Name
        categoryA113: $categoryA113
        categoryA113Name: $categoryA113Name
        categoryA524: $categoryA524
        categoryA524Name: $categoryA524Name
        categoryA525: $categoryA525
        categoryA525Name: $categoryA525Name
        categoryB956: $categoryB956
        categoryB956Name: $categoryB956Name
        siilCode: $siilCode
        siilData: $siilData
        searchTags: $searchTags
      ) {
        id
      }
    }
  `,

  UPDATE_PRODUCT_NAME: gql`
    mutation ($productId: Int!, $name: String!) {
      updateProductNameByUser(productId: $productId, name: $name) {
        id
      }
    }
  `,

  UPDATE_PRODUCT_NAME_BY_ADMIN: gql`
    mutation ($productId: Int!, $name: String!) {
      updateProductNameByAdmin(productId: $productId, name: $name) {
        id
      }
    }
  `,

  DELETE_PRODUCT: gql`
    mutation ($productId: Int!) {
      deleteProductByUser(productId: $productId)
    }
  `,
  REGISTER_PRODUCT_BY_USER: gql`
    mutation ($productIds: [Int!]!, $setDataId: Int!) {
      registerProductByUser(productIds: $productIds, setDataId: $setDataId)
    }
  `,
  REGISTER_PRODUCTS_BY_USER: gql`
    mutation ($productIds: [Int!]!, $setDataIds: [Int!]!) {
      registerProductsByUser(productIds: $productIds, setDataIds: $setDataIds)
    }
  `,

  UPDATE_MANY_PRODUCT_TAG: gql`
    mutation ($productIds: [Int!]!, $searchTags: String!) {
      updateManyProductTagByUser(productIds: $productIds, searchTags: $searchTags)
    }
  `,

  UPDATE_MANY_PRODUCT_NAME: gql`
    mutation ($productIds: [Int!]!, $headText: String!, $bodyText: String!, $tailText: String!) {
      updateManyProductNameByUser(productIds: $productIds, head: $headText, body: $bodyText, tail: $tailText)
    }
  `,

  UPDATE_MANY_PRODUCT_SIIL_INFO: gql`
    mutation ($productIds: [Int!]!, $siilCode: String!) {
      updateManyProductSiilInfoByUser(productIds: $productIds, siilCode: $siilCode)
    }
  `,

  UPDATE_MANY_PRODUCT_CATEGORY: gql`
    mutation (
      $productIds: [Int!]!
      $categoryA077: String
      $categoryA077Name: String
      $categoryB378: String
      $categoryB378Name: String
      $categoryA112: String
      $categoryA112Name: String
      $categoryA027: String
      $categoryA027Name: String
      $categoryA001: String
      $categoryA001Name: String
      $categoryA006: String
      $categoryA006Name: String
      $categoryB719: String
      $categoryB719Name: String
      $categoryA113: String
      $categoryA113Name: String
      $categoryA524: String
      $categoryA524Name: String
      $categoryA525: String
      $categoryA525Name: String
      $categoryB956: String
      $categoryB956Name: String
    ) {
      updateManyProductCategoryByUser(
        productIds: $productIds
        categoryA077: $categoryA077
        categoryA077Name: $categoryA077Name
        categoryB378: $categoryB378
        categoryB378Name: $categoryB378Name
        categoryA112: $categoryA112
        categoryA112Name: $categoryA112Name
        categoryA027: $categoryA027
        categoryA027Name: $categoryA027Name
        categoryA001: $categoryA001
        categoryA001Name: $categoryA001Name
        categoryA006: $categoryA006
        categoryA006Name: $categoryA006Name
        categoryB719: $categoryB719
        categoryB719Name: $categoryB719Name
        categoryA113: $categoryA113
        categoryA113Name: $categoryA113Name
        categoryA524: $categoryA524
        categoryA524Name: $categoryA524Name
        categoryA525: $categoryA525
        categoryA525Name: $categoryA525Name
        categoryB956: $categoryB956
        categoryB956Name: $categoryB956Name
      )
    }
  `,

  TRANSLATE_PRODUCT_TEXT: gql`
    mutation ($type: TranslateTargetEnumType!, $id: Int!) {
      translateProductTextByUser(type: $type, id: $id)
    }
  `,

  TRANSLATE_PRODUCTS_TEXT: gql`
    mutation ($type: TranslateTargetEnumType!, $ids: [Int!]!) {
      translateProductsTextByUser(type: $type, ids: $ids)
    }
  `,

  UPLOAD_EXCEL_FILE: gql`
    mutation ($data: Upload!, $categoryCode: String, $siilCode: String) {
      getTaobaoItemUsingExcelFileByUser(data: $data, categoryCode: $categoryCode, siilCode: $siilCode)
    }
  `,

  UPLOAD_EXCEL_FILE_BY_ADMIN: gql`
    mutation ($data: Upload!, $categoryCode: String, $siilCode: String, $userId: Int) {
      getTaobaoItemUsingExcelFileByAdmin(data: $data, categoryCode: $categoryCode, siilCode: $siilCode, userId: $userId)
    }
  `,

  END_PRODUCT_SELL_STATE_BY_USER: gql`
    mutation ($productIds: [Int!]!) {
      endProductSellStateByUser(productIds: $productIds)
    }
  `,

  //끝

  RENEW_TOKEN: gql`
    mutation ($accessToken: String!, $refreshToken: String!) {
      renewToken(accessToken: $accessToken, refreshToken: $refreshToken) {
        accessToken
        refreshToken
      }
    }
  `,

  SCRAP_ORDER: gql`
    mutation ($shopDataId: Int!, $collectNewOrder: Boolean!) {
      scrapOrderByUser(shopDataId: $shopDataId, collectNewOrder: $collectNewOrder)
    }
  `,

  //결제요청,결제취소 뮤태이션
  PURCHASE_PLAN_BY_USER: gql`
    mutation ($planInfoId: Int!, $merchantUid: String!) {
      purchasePlanByUser(planInfoId: $planInfoId, merchantUid: $merchantUid)
    }
  `,
  CANCEL_PURCHASE_PLAN_BY_USER: gql`
    mutation ($merchantUid: String!) {
      cancelPurchasePlanByUser(merchantUid: $merchantUid)
    }
  `,

  CHANGE_ORDER_STATE_BY_USER: gql`
    mutation ($orderIds: [String!]!, $destState: OrderState!) {
      changeOrderStateByUser(orderIds: $orderIds, destState: $destState)
    }
  `,

  ADD_WORD_BY_USER: gql`
    mutation ($findWord: String!, $replaceWord: String) {
      addWordByUser(findWord: $findWord, replaceWord: $replaceWord)
    }
  `,

  DELETE_WORD_BY_USER: gql`
    mutation ($wordId: Int!) {
      deleteWordByUser(wordId: $wordId)
    }
  `,

  MODIFY_WORD_BY_USER: gql`
    mutation ($wordId: Int!, $findWord: String!, $replaceWord: String) {
      modifyWordByUser(wordId: $wordId, findWord: $findWord, replaceWord: $replaceWord)
    }
  `,

  ADD_WORD_BY_EXCEL_BY_USER: gql`
    mutation ($data: Upload!, $isReplace: Boolean!) {
      addWordByExcelByUser(data: $data, isReplace: $isReplace)
    }
  `,

  CREATE_USER_QUESTION_BY_USER: gql`
    mutation ($title: String!, $content: String!, $attachment: [Upload!]) {
      createUserQuestionByUser(title: $title, content: $content, attachment: $attachment)
    }
  `,

  ///어드민
  SIGN_IN_ADMIN: gql`
    mutation ($id: String!, $password: String!) {
      signInAdminByEveryone(id: $id, password: $password) {
        accessToken
        refreshToken
      }
    }
  `,

  SIGN_UP_ADMIN: gql`
    mutation ($id: String!, $password: String!) {
      signUpAdminByAdmin(id: $id, password: $password)
    }
  `,

  CHANGE_PASSWORD_BY_ADMIN: gql`
    mutation ($currentPassword: String!, $newPassword: String!) {
      changeMyPasswordByAdmin(currentPassword: $currentPassword, newPassword: $newPassword)
    }
  `,

  CATEGORY_UPDATE: gql`
    mutation {
      updateCategoryStoreDataByAdmin
    }
  `,
  UPDATE_CNY_RATE: gql`
    mutation ($cnyRate: Float!) {
      updateCnyRateByAdmin(cnyRate: $cnyRate)
    }
  `,

  UPDATE_PLAN_INFO_BY_ADMIN: gql`
    mutation ($planId: Int!, $name: String, $description: String, $price: Int, $isActive: Boolean) {
      updatePlanInfoByAdmin(planId: $planId, name: $name, description: $description, price: $price, isActive: $isActive) {
        id
      }
    }
  `,

  CREATE_NOTICE_BY_ADMIN: gql`
    mutation ($title: String!, $content: String!, $attachment: Upload) {
      createNoticeByAdmin(title: $title, content: $content, attachment: $attachment)
    }
  `,

  UPDATE_NOTICE_BY_ADMIN: gql`
    mutation ($noticeId: Int!, $title: String, $content: String, $attachment: Upload) {
      updateNoticeByAdmin(noticeId: $noticeId, title: $title, content: $content, attachment: $attachment)
    }
  `,

  DELETA_NOTICE_BY_ADMIN: gql`
    mutation ($noticeIds: [Int!]!) {
      deleteNoticeByAdmin(noticeIds: $noticeIds)
    }
  `,

  //FAQ 카테고리 추가(탭)
  CREATE_FAQ_CATEGORY_BY_ADMIN: gql`
    mutation ($name: String!) {
      createFaqCategoryByAdmin(name: $name) {
        id
        name
        order
        isActive
      }
    }
  `,

  //FAQ 카테고리 삭제(탭)
  DELETE_FAQ_CATEGORY_BY_ADMIN: gql`
    mutation ($faqCategoryId: Int!) {
      deleteFaqCategoryByAdmin(faqCategoryId: $faqCategoryId)
    }
  `,

  //FAQ 카테고리 수정(탭)
  MODIFY_FAQ_CATEGORY_BY_ADMIN: gql`
    mutation ($faqCategoryId: Int!, $name: String, $isActive: Boolean) {
      modifyFaqCategoryByAdmin(faqCategoryId: $faqCategoryId, name: $name, isActive: $isActive) {
        id
      }
    }
  `,
  //FAQ 카테고리 순서 변경(탭)
  SORT_FAQ_CATEGORY_BY_ADMIN: gql`
    mutation ($faqCategoryIds: [Int!]!) {
      sortFaqCategoryByAdmin(faqCategoryIds: $faqCategoryIds)
    }
  `,

  //FAQ 추가
  CREATE_FAQ_BY_ADMIN: gql`
    mutation ($faqCategoryId: Int!, $title: String!, $content: String!) {
      createFaqByAdmin(faqCategoryId: $faqCategoryId, title: $title, content: $content)
    }
  `,
  //FAQ 수정
  UPDATE_FAQ_BY_ADMIN: gql`
    mutation ($faqId: Int!, $faqCategoryId: Int, $title: String, $content: String) {
      updateFaqByAdmin(faqId: $faqId, faqCategoryId: $faqCategoryId, title: $title, content: $content)
    }
  `,

  //FAQ 삭제
  DELETE_FAQ_BY_ADMIN: gql`
    mutation ($faqIds: [Int!]!) {
      deleteFaqByAdmin(faqIds: $faqIds)
    }
  `,

  //문의사항 답글
  UPDATE_USER_QUESTION_BY_ADMIN: gql`
    mutation ($userQuestionId: Int!, $answer: String!) {
      updateUserQuestionByAdmin(userQuestionId: $userQuestionId, answer: $answer)
    }
  `,

  //어드민 실코드 수정
  UPDATE_MANY_PRODUCT_SIIL_INFO_BY_ADMIN: gql`
    mutation ($productIds: [Int!]!, $siilCode: String!) {
      updateManyProductSiilInfoByAdmin(productIds: $productIds, siilCode: $siilCode)
    }
  `,

  //어드민 가격 수정
  UPDATE_PRODUCT_PRICE_BY_ADMIN: gql`
    mutation ($productIds: [Int!]!, $cnyRate: Float!, $marginRate: Float!, $shippingFee: Int!, $localShippingFee: Int!) {
      updateProductPriceByAdmin(
        productIds: $productIds
        cnyRate: $cnyRate
        marginRate: $marginRate
        shippingFee: $shippingFee
        localShippingFee: $localShippingFee
      )
    }
  `,
  // 목록에서 상품 삭제
  DELETE_PRODUCT_BY_ADMIN: gql`
    mutation ($productId: Int!) {
      deleteProductByAdmin(productId: $productId)
    }
  `,
  // 상품 판매종료
  END_PRODUCT_SELL_STATE_BY_ADMIN: gql`
    mutation ($productIds: [Int!]!) {
      endProductSellStateByAdmin(productIds: $productIds)
    }
  `,
  //상품 카테고리 수정
  UPDATE_MANY_PRODUCT_CATEGORY_BY_ADMIN: gql`
    mutation (
      $productIds: [Int!]!
      $categoryA077: String
      $categoryB378: String
      $categoryA112: String
      $categoryA027: String
      $categoryA001: String
      $categoryA006: String
      $categoryB719: String
      $categoryA113: String
      $categoryA524: String
      $categoryA525: String
      $categoryB956: String
    ) {
      updateManyProductCategoryByAdmin(
        productIds: $productIds
        categoryA077: $categoryA077
        categoryB378: $categoryB378
        categoryA112: $categoryA112
        categoryA027: $categoryA027
        categoryA001: $categoryA001
        categoryA006: $categoryA006
        categoryB719: $categoryB719
        categoryA113: $categoryA113
        categoryA524: $categoryA524
        categoryA525: $categoryA525
        categoryB956: $categoryB956
      )
    }
  `,

  //상품 상세보기 페이지 값 수정
  UPDATE_PRODUCT_DATA_BY_ADMIN: gql`
    mutation (
      $productId: Int!
      $name: String
      $price: Int
      $description: String
      $shippingFee: Int
      $localShippingFee: Int
      $options: [ProductOptionUpdateInput!]!
      $optionNames: [ProductOptionNameUpdateInput!]!
      $optionValues: [ProductOptionValueUpdateInput!]!
      $thumbnails: [ProductThumbnailUpdateInput!]
      $categoryCode: String
      $siilCode: String
      $siilData: [SiilInput!]
    ) {
      updateProductByAdmin(
        productId: $productId
        name: $name
        price: $price
        description: $description
        shippingFee: $shippingFee
        localShippingFee: $localShippingFee
        options: $options
        optionNames: $optionNames
        optionValues: $optionValues
        thumbnails: $thumbnails
        categoryCode: $categoryCode
        siilCode: $siilCode
        siilData: $siilData
      ) {
        id
      }
    }
  `,

  REGISTER_PRODUCTS_BY_ADMIN: gql`
    mutation ($productIds: [Int!]!, $setDataIds: [Int!]!) {
      registerProductsByAdmin(productIds: $productIds, setDataIds: $setDataIds)
    }
  `,

  SET_PURCHASE_INFO_BY_ADMIN: gql`
    mutation ($userId: Int!, $planInfoId: Int!, $expiredAt: DateTime) {
      setPurchaseInfoByAdmin(userId: $userId, planInfoId: $planInfoId, expiredAt: $expiredAt)
    }
  `,

  SET_MULTI_PURCHASE_INFO_BY_ADMIN: gql`
    mutation ($purchaseInputs: [purchaseInputs!]!, $credit: Int!) {
      setMultiPurchaseInfoByAdmin(purchaseInputs: $purchaseInputs, credit: $credit)
    }
  `,

  SET_USER_STOP_TEST: gql`
    mutation ($userId: Int!) {
      setUserStopTest(userId: $userId)
    }
  `,

  DELETE_STORE: gql`
    mutation ($store: String!, $id: Int!) {
      deleteStore(id: $id, store: $store)
    }
  `,
  SET_MAX_PRODUCT_LIMIT_BY_ADMIN: gql`
    mutation ($userId: Int!, $productLimit: Int) {
      setMaxProductLimitByAdmin(userId: $userId, productLimit: $productLimit)
    }
  `,

  UPDATE_USER_LOG_BY_USER: gql`
    mutation ($id: Int!, $isRead: Boolean!) {
      updateUserLogByUser(id: $id, isRead: $isRead)
    }
  `,

  CREATE_USER_LOG_BY_USER: gql`
    mutation ($title: String!, $payloadData: String!) {
      createUserLogByUser(title: $title, payloadData: $payloadData)
    }
  `,

  DISABLE_USER_OPTION: gql`
    mutation ($id: Int!) {
      disableUserOption(id: $id)
    }
  `,

  EXTEND_MY_ACCOUNT_BY_USER: gql`
    mutation ($masterId: Int!, $slaveIds: [Int!]!) {
      extendMyAccountByUser(masterId: $masterId, slaveIds: $slaveIds)
    }
  `,

  DELETE_USER_BY_ADMIN: gql`
    mutation ($userId: [Int!]!) {
      deleteUserByAdmin(userId: $userId)
    }
  `,
};

export default MUTATIONS;
