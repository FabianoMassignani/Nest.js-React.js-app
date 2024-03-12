import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { setNavigate } from "../store/actions/ui";

import { useDispatch, useSelector } from "react-redux";

import { HomeOutlined } from "@ant-design/icons";

import { Layout, Menu } from "antd";

export const Navbar = (props) => {
  const ui = useSelector((state) => state.ui);
  const optionNavigate = ui?.navigate || "/";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const { Header, Content, Footer, Sider } = Layout;

  useEffect(() => {
    navigate(optionNavigate, { replace: true });
  }, [dispatch, optionNavigate]);

  let items = [
    {
      label: "Inicio",
      key: "/",
      icon: <HomeOutlined />,
    },
  ];

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        width={170}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="nav" />
        <Menu
          selectedKeys={[optionNavigate]}
          onClick={(item) => {
            if (item.key === "/logout") {
              dispatch({ type: "LOGOUT" });
              dispatch(setNavigate("/login"));
              return;
            }

            dispatch(setNavigate(item.key));
          }}
          items={items}
          theme="dark"
        />
      </Sider>

      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Content>
          <div className="container">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
