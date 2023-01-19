import React from "react";
import { Route, Switch, } from "react-router-dom";
import { 
  AdminCustomer, 
  AdminFaq, 
  AdminWriteFAQ, 
  AdminNotice,
  AdminWriteNotice, 
  AdminInquiry, 
  AdminInquiryDetail, 
  AdminServicePay, 
  ManageAdmin, 
  AdminPreferences, 
  
  WrongPage } from "./code-split";
const PrivateRoute = () => {

  return (
    <Switch>
      <Route exact path="/admin/customer" component={AdminCustomer} />
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
