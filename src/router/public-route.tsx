import React from "react";
import AdminRoute from "./admin-route";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Main } from "./code-split";
import { BackTop } from "antd";
import { UpOutlined } from "@ant-design/icons";

const PublicRoutes = () => {
  return (
    <>
      <BackTop>
        <div
          style={{
            height: 50,
            width: 50,
            lineHeight: "50px",
            borderRadius: 30,
            border: "1px solid lightgray",
            backgroundColor: "white",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          <UpOutlined />
        </div>
      </BackTop>

      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/admin" component={AdminRoute} />
        </Switch>
      </Router>
    </>
  );
};

export default PublicRoutes;
