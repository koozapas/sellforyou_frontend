import React from "react";
import { Route, Switch, } from "react-router-dom";
import { 
  AdminCustomer, 
  AdminProductDelivery, 
  AdminProductCollection, 
  AdminFaq, 
  AdminWriteFAQ, 
  AdminNotice,
  AdminWriteNotice, 
  AdminInquiry, 
  AdminInquiryDetail, 
  AdminServicePay, 
  ManageAdmin, 
  AdminPreferences, 
  
  UserNotice,
  UserShowNotice,
  UserMarketSetWord, 
  UserMarketInfo, 
  UserOrderList, 
  UserProductDelivery, 
  UserDownloads,
  UserServicePay, 
  Test,
  
  WrongPage } from "./code-split";
const PrivateRoute = () => {

  return (
    <Switch>
      <Route exact path="/user/notice" component={UserNotice} />
      <Route exact path="/user/notice/show" component={UserShowNotice} />
      {/* 유저 - 마켓관리 */}
      <Route exact path="/user/market/info" component={UserMarketInfo} />
      <Route exact path="/user/market/set-word" component={UserMarketSetWord} />
      {/* 유저 - 상품관리 */}
      <Route exact path="/user/product/product-delivery" component={UserProductDelivery} />
      {/* 유저 - 자료실 */}
      <Route exact path="/user/downloads" component={UserDownloads} />
      {/* 유저 - 주문관리 */}
      <Route exact path="/user/order/order-list" component={UserOrderList} />
      {/* 유저 - 결제관리 */}
      <Route exact path="/user/payment/service-pay" component={UserServicePay} />
      {/* test */}
      <Route exact path = "/user/payment" component={Test} />
      {/* 관리자 - 유저관리 */}
      <Route exact path="/admin/customer" component={AdminCustomer} />
      {/* 관리자 - 상품관리 */}
      <Route exact path="/admin/product/product-delivery" component={AdminProductDelivery} />
      <Route exact path="/admin/product/product-collection" component={AdminProductCollection} />
      {/* 관리자 - 결제관리 */}
      <Route exact path="/admin/payment/service-pay" component={AdminServicePay} />
      {/* 관리자 - 고객센터 */}
      <Route exact path="/admin/customer-center/notice" component={AdminNotice} />
      <Route exact path="/admin/customer-center/write-notice" component={AdminWriteNotice} />
      <Route exact path="/admin/customer-center/faq" component={AdminFaq} />
      <Route exact path="/admin/customer-center/write-faq" component={AdminWriteFAQ} />
      <Route exact path="/admin/customer-center/inquiry" component={AdminInquiry} />
      <Route exact path="/admin/customer-center/inquiry-detail" component={AdminInquiryDetail} />
      {/* 관리자 - 관리자설정 */}
      <Route exact path="/admin/manage-admin" component={ManageAdmin} />
      {/* 관리자 - 환경설정 */}
      <Route exact path="/admin/preferences" component={AdminPreferences} />
      {/* 에러 페이지 */}
      <Route path="*" component={WrongPage} />
    </Switch>
  );
}

export default PrivateRoute;
