import { gql } from "@apollo/client";

const QUERIES = {
  WHO_AM_I: gql`
    query {
      whoami
    }
  `,
  SELECT_MY_INFO: gql`
    query SELECT_MY_INFO {
      selectMyInfoByUser {
        id
        email

        connectedUsers {
          id
          email
          master

          purchaseInfo {
            level
            levelExpiredAt
          }
        }

        userInfo {
          phone
        }

        purchaseInfo {
          level
          levelExpiredAt
        }

        refCode,
        refAvailable,

        credit,

        master
      }
    }
  `,
  //내 결제 레벨 선택
  MY_PURCHASE_LEVEL: gql`
    query {
      selectMyInfoByUser {
        purchaseInfo {
          level
        }
      }
    }
  `,

  //환율 마진율 배송료 관련 정보 뽑기
  SELECT_MY_PRICE_INFO: gql`
    query {
      selectMyInfoByUser {
        userInfo {
          marginRate
          marginUnitType
          defaultShippingFee
          # refundAccountInfoData
          cnyRate
        }
      }
    }
  `,

  //결제용 정보 뽑기
  MYINFO_TO_PURCHASE: gql`
    query {
      selectMyInfoByUser {
        id
        email
        userInfo {
          phone
        }
      }
    }
  `,
  /** 기본정보 - 계정정보 */
  // SELECT_MY_SHOP_DATA_BY_USER_FOR_INFO: gql`
  //   query SELECT_MY_SHOP_DATA_BY_USER_FOR_INFO(
  //     $where: UserShopDataWhereInput
  //     $skip: Int
  //     $take: Int
  //     $orderBy: [UserShopDataOrderByWithRelationInput!]
  //   ) {
  //     selectMyShopDataByUser(
  //       where: $where
  //       skip: $skip
  //       take: $take
  //       orderBy: $orderBy
  //     ) {
  //       id
  //       # userId
  //       siteCode
  //       # siteUserId
  //       # siteUserPw
  //       # siteUseretc1
  //       siteUseretc2
  //       # siteUseretc3
  //       # siteUseretc4
  //       siteUseretc5
  //       # siteUseretc6
  //     }
  //   }
  // `,
  /** 스토어 계정정보 */
  // SELECT_MY_SHOP_LIST: gql`
  //   query SELECT_MY_SHOP_LIST(
  //     $where: UserShopDataWhereInput
  //     $skip: Int
  //     $take: Int
  //     $orderBy: [UserShopDataOrderByWithRelationInput!]
  //   ) {
  //     selectMyShopDataByUser(
  //       where: $where
  //       skip: $skip
  //       take: $take
  //       orderBy: $orderBy
  //     ) {
  //       id
  //       userId
  //       siteCode
  //       siteUserId
  //       siteUserPw
  //       siteUseretc1
  //       siteUseretc2
  //       siteUseretc3
  //       siteUseretc4
  //       siteUseretc5
  //       siteUseretc6
  //     }
  //   }
  // `,

  CHECK_MY_SHOP_LIST: gql`
    query SELECT_MY_SHOP_LIST {
      selectMyShopDataByUser {
        siteCode
      }
    }
  `,

  GET_USER_SET_OBJECT: gql`
    query GET_USER_SET_OBJECT($userShopDataId: Int, $userSetDataId: Int) {
      getUserSetObjectByUser(
        userShopDataId: $userShopDataId
        userSetDataId: $userSetDataId
      ) {
        userCode
        sol_type
        siteCode
        number
        siteUserId
        siteUserPw
        siteUseretc1
        siteUseretc2
        siteUseretc3
        siteUseretc4
        siteUseretc5
        siteUseretc6
        encodedSetInfo
      }
    }
  `,
  // SELECT_MY_SET_DATA: gql`
  //   query {
  //     selectMySetDataByUser {
  //       id
  //       setFilePath
  //       userShopDataId
  //       userShopData {
  //         siteCode
  //         siteUserId
  //         userSetData {
  //           id
  //           name
  //           setFilePath
  //           userShopDataId
  //         }
  //       }
  //     }
  //   }
  // `,

  // SELECT_MY_PRODUCT: gql`
  //   query {
  //     selectMyProductByUser {
  //       id
  //       userId
  //       taobaoProductId
  //       state
  //       name
  //       price
  //       localShippingFee
  //       description
  //       createdAt
  //       modifiedAt
  //     }
  //   }
  // `,

  SELECT_MY_PRODUCT_LIST_COUNT: gql`
    query SELECT_MY_PRODUCT_LIST_COUNT($where: ProductWhereInput) {
      selectMyProductsCountByUser(where: $where)
    }
  `,

  //수집 상품
  SELECT_MY_PRODUCT_LIST: gql`
    query SELECT_MY_PRODUCT_LIST(
      $where: ProductWhereInput
      $skip: Int
      $take: Int
    ) {
      selectMyProductByUser(
        where: $where
        orderBy: { createdAt: desc }
        skip: $skip
        take: $take
      ) {
        #수정후
        id
        taobaoProductId
        productCode
        # state
        name
        price
        isNameTranslated
        isImageTranslated
        shippingFee
        localShippingFee
        localShippingCode
        imageThumbnail
        createdAt
        siilCode
        searchTags
        category {
          c1Name
          c2Name
          c3Name
          c4Name
        }
        categoryA077
        categoryA077Name
        categoryB378
        categoryB378Name
        categoryA112
        categoryA112Name
        categoryA027
        categoryA027Name
        categoryA001
        categoryA001Name
        categoryA006
        categoryA006Name
        categoryA113
        categoryA113Name
        categoryB719
        categoryB719Name
        categoryA524
        categoryA524Name
        categoryA525
        categoryA525Name
        categoryB956
        categoryB956Name
        productStateEnum {
          state
        }
        taobaoProduct {
          name
          imageThumbnail
          originalData
          taobaoNumIid
          price
          videoUrl
        }
        productOption(take: 1) {
          id
          name
          price
          isActive
        }
        activeProductStore {
          id
          storeUrl
          storeProductId # 스토어의 고유 id 1
          etcVendorItemId # 스토어의 고유 id 2
          siteCode # 판매채널 아이콘용
          # userShopData {
          #   siteCode # 어느 스토어인지
          # }
          # userSetData {
          #   # 어느 스토어인지 갖고오려고
          #   userShopData {
          #     siteCode # 어느 스토어인지
          #   }
          # }
          state # 이 스토어에 등록된 상품의 현재 상태(상품의 상태랑은 다름)
          connectedAt
          productStoreState {
            # 이 스토어에 등록된 상품의 현재 상태에 대한 설명(상품의 상태랑은 다름)
            name
            description
          }
          productStoreLog(take: 1, orderBy: [{ modifiedAt: desc }]) {
            # 이 스토어에서 작업한 작업 로그 (take:1 orderby)
            destState
            productStoreState {
              description
            }
            uploadState # 업로드 처리결과
            errorMessage # 에러메시지 (성공시에는 '')
          }
        }
        # productStore {
        # }
        #수정 전
        # id
        # taobaoProductId
        # state
        # name
        # price
        # isNameTranslated
        # localShippingFee
        # # description
        # createdAt
        # # modifiedAt
        # siilCode
        # category {
        #   c1
        #   c2
        #   c3
        #   c4
        #   c1Name
        #   c2Name
        #   c3Name
        #   c4Name
        # }
        # taobaoProduct {
        #   # id
        #   name
        #   imageThumbnail
        #   taobaoNumIid
        #   price
        #   # brand
        #   # taobaoBrandId
        #   # taobaoCategoryId
        # }
        # productOption {
        #   id
        #   name
        #   price
        #   isActive
        # }
        # productOptionName {
        #   id
        #   name
        #   taobaoPid
        #   productOptionValue {
        #     id
        #     name
        #     image
        #     taobaoVid
        #   }
        # }
        # productStore(take:1,orderBy:[{id:desc}]) {
        #   id
        #   storeUrl
        #   storeProductId # 스토어의 고유 id
        #   userSetData {
        #     # 어느 스토어인지 갖고오려고
        #     userShopData {
        #       siteCode # 어느 스토어인지
        #     }
        #   }
        #   state # 이 스토어에 등록된 상품의 현재 상태(상품의 상태랑은 다름)
        #   productStoreState {
        #     # 이 스토어에 등록된 상품의 현재 상태에 대한 설명(상품의 상태랑은 다름)
        #     description
        #   }
        #   productStoreLog(take: 1, orderBy: [{ modifiedAt: desc }]) {
        #     # 이 스토어에서 작업한 작업 로그 (take:1 orderby)
        #     destState
        #     productStoreState {
        #       description
        #     }
        #     uploadState # 업로드 처리결과
        #     errorMessage # 에러메시지 (성공시에는 '')
        #   }
        # }
      }
    }
  `,

  SELECT_MY_PRODUCT_DETAIL: gql`
    query SELECT_MY_PRODUCT_DETAIL($where: ProductWhereInput) {
      selectMyProductByUser(where: $where) {
        id
        taobaoProductId
        state
        name
        isNameTranslated
        productCode
        price
        localShippingFee
        localShippingCode
        description
        createdAt
        modifiedAt
        siilCode
        imageThumbnail
        imageThumbnailData
        marginRate
        marginUnitType
        cnyRate
        shippingFee
        searchTags
        taobaoProduct {
          id
          imageThumbnail
          taobaoNumIid
          originalData
          name
          price
          brand
          taobaoBrandId
          taobaoCategoryId
          options {
            option {
              name
              taobaoSkuId
            }
            optionName {
              taobaoPid
              name
            }
            optionValue {
              taobaoVid
              name
              image
            }
          }
        }
        productOption {
          id
          isActive
          taobaoSkuId
          # taobaoOptionName
          name
          priceCny
          price
          # image
          optionString
          stock
        }
        productOptionName {
          id
          name
          taobaoPid
          productOptionValue {
            id
            name
            image
            taobaoVid
            isActive
          }
        }
        category {
          id
          code
          c1
          c2
          c3
          c4
          c1Name
          c2Name
          c3Name
          c4Name
        }
        categoryA077
        categoryB378
        categoryA112
        categoryA027
        categoryA001
        categoryA006
        categoryA113
        categoryB719
        categoryA524
        categoryA525
        categoryB956
      }
    }
  `,

  GET_ITEM_STATE: gql`
    query GET_ITEM_STATE($where: ProductWhereInput) {
      selectMyProductByUser(where: $where) {
        productStateEnum{
          state
        } 
      }
    }
  `,

  SELECT_TAOBAO_PRODUCTS_BY_USER: gql`
    query (
      $where: TaobaoProductWhereInput
      $orderBy: [TaobaoProductOrderByWithRelationInput!]
      $take: Int
      $skip: Int
    ) {
      selectTaobaoProductsByUser(
        where: $where
        orderBy: $orderBy
        take: $take
        skip: $skip
      ) {
        id
        taobaoNumIid
        imageThumbnail
        price
        brand
        taobaoBrandId
        taobaoCategoryId
        createdAt
        modifiedAt
        product {
          name
        }
      }
    }
  `,

  TRANSLATE_TEXT: gql`
    query ($text: String!) {
      translateText(text: $text)
    }
  `,

  SEARCH_CATEGORY: gql`
    query ($keyword: String!) {
      searchCategoriesBySomeone(keyword: $keyword) {
        id
        code
        c1
        c2
        c3
        c4
        c1Name
        c2Name
        c3Name
        c4Name
        siilCode
      }
    }
  `,

  CATEGORY_LIST: gql`
    query {
      selectCategoriesBySomeone {
        id
        code
        c1
        c2
        c3
        c4
        c1Name
        c2Name
        c3Name
        c4Name
      }
    }
  `,

  SELECT_CATEGORIES_BY_HIERARCHICAL: gql`
    query ($code: String) {
      selectCategoriesByHierarchicalBySomeone(code: $code) {
        code
        name
      }
    }
  `,
  SELECT_CATEGORIES_TO_LAZY_QUERY: gql`
    query ($where: CategoryWhereInput) {
      selectCategoriesBySomeone(where: $where) {
        siilCode
        code
      }
    }
  `,

  SEARCH_CATEGORY_INFO_A077: gql`
    query ($code: String, $keyword: String) {
      searchCategoryInfoA077BySomeone(code: $code, keyword: $keyword) {
        code
        name
        code_b378
        code_a112
        code_a027
        code_a001
        code_a006
        code_b719
        code_a113
        code_a524
        code_a525
        code_b956
      }
    }
  `,

  SEARCH_CATEGORY_INFO_B378: gql`
    query ($code: String, $keyword: String) {
      searchCategoryInfoB378BySomeone(code: $code, keyword: $keyword) {
        code
        name
        code_a077
      }
    }
  `,

  SEARCH_CATEGORY_INFO_A112: gql`
    query ($code: String, $keyword: String) {
      searchCategoryInfoA112BySomeone(code: $code, keyword: $keyword) {
        code
        name
      }
    }
  `,

  SEARCH_CATEGORY_INFO_A027: gql`
    query ($code: String, $keyword: String) {
      searchCategoryInfoA027BySomeone(code: $code, keyword: $keyword) {
        code
        name
      }
    }
  `,

  SEARCH_CATEGORY_INFO_A001: gql`
    query ($code: String, $keyword: String) {
      searchCategoryInfoA001BySomeone(code: $code, keyword: $keyword) {
        code
        name
      }
    }
  `,

  SEARCH_CATEGORY_INFO_A006: gql`
    query ($code: String, $keyword: String) {
      searchCategoryInfoA006BySomeone(code: $code, keyword: $keyword) {
        code
        name
      }
    }
  `,

  SEARCH_CATEGORY_INFO_B719: gql`
    query ($code: String, $keyword: String) {
      searchCategoryInfoB719BySomeone(code: $code, keyword: $keyword) {
        code
        name
      }
    }
  `,

  SEARCH_CATEGORY_INFO_A113: gql`
    query ($code: String, $keyword: String) {
      searchCategoryInfoA113BySomeone(code: $code, keyword: $keyword) {
        code
        name
      }
    }
  `,

  SEARCH_CATEGORY_INFO_A524: gql`
    query ($code: String, $keyword: String) {
      searchCategoryInfoA524BySomeone(code: $code, keyword: $keyword) {
        code
        name
      }
    }
  `,

  SEARCH_CATEGORY_INFO_A525: gql`
    query ($code: String, $keyword: String) {
      searchCategoryInfoA525BySomeone(code: $code, keyword: $keyword) {
        code
        name
      }
    }
  `,

  SEARCH_CATEGORY_INFO_B956: gql`
    query ($code: String, $keyword: String) {
      searchCategoryInfoB956BySomeone(code: $code, keyword: $keyword) {
        code
        name
      }
    }
  `,

  SELECT_SILL_DATA: gql`
    query ($code: String!) {
      selectSiilInfoBySomeone(code: $code) {
        description
        data {
          name
          inputType
          options
          code
        }
      }
    }
  `,

  //엑셀 다운로드
  GET_EXCEL_SAMPLE_URL_BY_SOMEONE: gql`
    query ($type: ExcelSampleEnum!) {
      getExcelSampleUrlBySomeone(type: $type)
    }
  `,

  //수집된 주문 정보
  SELECT_ORDERS_BY_USER: gql`
    query SELECT_ORDERS_BY_USER($where: OrderWhereInput) {
      selectOrdersByUser(where: $where) {
        id
        state
        # userShopDataId
        orderProductNumber
        storeProductId
        orderState
        productName
        optionName
        quantity
        productId
        payPrice
        shippingFee
        buyerName
        receiverName
        customId
        orderedAt
        deliveryExpiredAt
        storeUrl
        sellerProductCode
        isCustomIdValid
        product {
          id
          taobaoProduct {
            price
          }
        }
        # userShopData {
        #   siteCode
        #   siteUserId
        # }
      }
    }
  `,
  SELECT_ORDERS_BY_USER_COUNT: gql`
    query SELECT_ORDERS_BY_USER_COUNT($where: OrderWhereInput) {
      selectOrdersByUser(where: $where) {
        state
      }
    }
  `,

  SELECT_ORDER_ITEM: gql`
    query ($where: OrderWhereInput) {
      selectOrdersByUser(where: $where) {
        id
        originalData
        orderProductNumber
      }
    }
  `,

  PLAN_INFO: gql`
    query PLAN_INFO {
      selectPlanInfosForEveryone {
        id
        planLevel
        name
        description
        month
        price
        externalFeatureVariableId
        isActive
      }
    }
  `,

  NOTICE_DATA_BY_USER: gql`
    query ($noticeId: Int!) {
      selectNoticeByEveryone(noticeId: $noticeId) {
        id
        title
        content
        attachmentFile
        isVisible
        viewCount
        createdAt
      }
    }
  `,

  SELECT_WORD_TABLES_BY_SOMEONE: gql`
    query SELECT_WORD_TABLES_BY_SOMEONE {
      selectWordTablesBySomeone {
        id
        userId
        findWord
        replaceWord
      }
    }
  `,

  ///////////////////////////////////////어드민///////////////////////////////////////
  //고시환율 조회
  GET_CNY_RATE: gql`
    query {
      selectCnyRateByEveryone
    }
  `,

  //고객관리
  USER_LIST_BY_ADMIN: gql`
    query USER_LIST_BY_ADMIN($where: UserWhereInput) {
      selectUsersByAdmin(where: $where, orderBy: { createdAt: desc }) {
        id
        email
        naverId
        kakaoId
        state
        master
        masterUserId
        userInfo {
          userId
          phone
          maxProductLimit
          naverStoreUrl
          coupangLoginId
          coupangVendorId
          coupangAccessKey
          coupangSecretKey
          streetApiKey
          esmplusMasterId
          esmplusAuctionId
          esmplusGmarketId
          interparkCertKey
          interparkSecretKey
          streetNormalApiKey
          wemakepriceId
          tmonId
          lotteonApiKey
          lotteonVendorId
        }
        purchaseInfo {
          level
          levelExpiredAt
          additionalInfo {
            type
            expiredAt
          }
          history
        }
        productCount
      }
    }
  `,
  // USER_LIST_BY_ADMIN: gql`
  //   query USER_LIST_BY_ADMIN ($where: UserShopDataWhereInput) {
  //     selectShopDataByAdmin(where:$where) {
  //       id
  //       userId
  //       siteCode
  //       siteUserId
  //       user {
  //         email
  //         state
  //         naverId
  //         kakaoId
  //         createdAt
  //         userInfo {
  //           phone
  //         }
  //         companyInfo {
  //           name
  //         }
  //       }
  //     }
  //   }
  // `,
  USER_DETAIL_DATA_BY_ADMIN: gql`
    query USER_DETAIL_DATA_BY_ADMIN($where: UserWhereInput) {
      selectUsersByAdmin(where: $where) {
        id
        email
        naverId
        kakaoId
        # companyInfo {
        #   name
        #   code
        #   ownerName
        # }
        userInfo {
          userId
          phone
          maxProductLimit
          naverStoreUrl
          coupangLoginId
          coupangVendorId
          coupangAccessKey
          coupangSecretKey
          streetApiKey
          esmplusMasterId
          esmplusAuctionId
          esmplusGmarketId
        }
        # userShopData {
        #   id
        #   siteCode
        #   siteUserId
        #   siteUserPw
        #   userSetData {
        #     name
        #   }
        # }
        purchaseInfo {
          level
          levelExpiredAt
          additionalInfo {
            type
            expiredAt
          }
        }
        productCount
      }
    }
  `,

  //상품관리
  SELECT_PRODUCT_LIST_BY_ADMIN: gql`
    query SELECT_PRODUCT_LIST_BY_ADMIN(
      $where: ProductWhereInput
      $take: Int
      $skip: Int
    ) {
      selectProductsByAdmin(
        where: $where
        orderBy: { createdAt: desc }
        take: $take
        skip: $skip
      ) {
        user {
          email
        }
        id
        taobaoProductId
        productCode
        state
        name
        price
        isNameTranslated
        isImageTranslated
        shippingFee
        localShippingFee
        imageThumbnail
        createdAt
        siilCode
        category {
          c1Name
          c2Name
          c3Name
          c4Name
        }
        taobaoProduct {
          name
          imageThumbnail
          taobaoNumIid
          price
          videoUrl
          originalData
        }
        productOption(take: 1) {
          id
        }
        productStore: activeProductStore {
          id
          storeUrl
          state
          storeProductId # 스토어의 고유 id
          etcVendorItemId
          siteCode
          # userSetData {# 어느 스토어인지 갖고오려고
          #   userShopData {
          #     siteCode # 어느 스토어인지
          #   }
          # }
          state # 이 스토어에 등록된 상품의 현재 상태(상품의 상태랑은 다름)
          productStoreState {
            # 이 스토어에 등록된 상품의 현재 상태에 대한 설명(상품의 상태랑은 다름)
            description
          }
          productStoreLog(take: 1, orderBy: [{ modifiedAt: desc }]) {
            # 이 스토어에서 작업한 작업 로그 (take:1 orderby)
            destState
            productStoreState {
              description
            }
            uploadState # 업로드 처리결과
            errorMessage # 에러메시지 (성공시에는 '')
          }
        }
      }
    }
  `,

  SELECT_PRODUCT_COUNT_BY_ADMIN: gql`
    query SELECT_PRODUCT_COUNT_BY_ADMIN($where: ProductWhereInput) {
      selectProductsCountByAdmin(where: $where)
    }
  `,
  
  PRODUCT_COUNT_TO_TABS: gql`
    query PRODUCT_COUNT_TO_TABS($where: ProductWhereInput) {
      selectProductsCountByAdmin(where: $where)
    }
  `,
  SELECT_PRODUCT_BY_ADMIN: gql`
    query SELECT_PRODUCT_BY_ADMIN($where: ProductWhereInput) {
      selectProductsByAdmin(where: $where) {
        id
        taobaoProductId
        state
        name
        isNameTranslated
        price
        localShippingFee
        description
        createdAt
        modifiedAt
        siilCode
        imageThumbnail
        imageThumbnailData
        marginRate
        marginUnitType
        cnyRate
        shippingFee
        localShippingFee
        taobaoProduct {
          id
          imageThumbnail
          taobaoNumIid
          name
          price
          brand
          taobaoBrandId
          taobaoCategoryId
          originalData
          options {
            option {
              name
              taobaoSkuId
            }
            optionName {
              taobaoPid
              name
            }
            optionValue {
              taobaoVid
              name
              image
            }
          }
        }
        productOption {
          id
          isActive
          taobaoSkuId
          # taobaoOptionName
          name
          priceCny
          price
          # image
          optionString
          stock
        }
        productOptionName {
          id
          name
          taobaoPid
          productOptionValue {
            id
            name
            image
            taobaoVid
            isActive
          }
        }
        category {
          id
          code
          c1
          c2
          c3
          c4
          c1Name
          c2Name
          c3Name
          c4Name
        }
      }
    }
  `,

  //faq 수정시 불러올데이터
  SELECT_FAQS_BY_EVERYONE: gql`
    query ($where: FaqWhereInput) {
      selectFaqsByEveryone(where: $where) {
        id
        categoryId
        title
        content
        contentSummary
        createdAt
        FaqCategory {
          id
          name
        }
      }
    }
  `,

  ////////////공용
  NOTICE_DATA_LIST: gql`
    query NOTICE_DATA_LIST($where: NoticeWhereInput) {
      selectNoticesByEveryone(where: $where, orderBy: { id: desc }) {
        id
        title
        content
        attachmentFile
        contentSummary(wordCount: 20)
        isVisible
        viewCount
        createdAt
      }
    }
  `,

  FAQ_DATA_LIST: gql`
    query FAQ_DATA_LIST {
      selectFaqCategoriesByEveryone(orderBy: { order: asc }) {
        id
        name
        order
        isActive
        faq {
          id
          categoryId
          title
          content
        }
      }
    }
  `,

  QUESTION_BY_SOMEONE: gql`
    query ($where: UserQuestionWhereInput) {
      selectUserQuestionBySomeone(where: $where, orderBy: { createdAt: desc }) {
        id
        userId
        title
        content
        attachmentFile
        attachmentFiles
        answer
        isActive
        answeredAt
        createdAt
        user {
          email
        }
      }
    }
  `,

  SELECT_USER_LOG_BY_USER: gql`
    query SELECT_USER_LOG_BY_USER {
      selectUserLogsByUser {
        id
        userId
        title
        payloadData
        isRead
        createdAt
      }
    }
  `
};

export default QUERIES;
