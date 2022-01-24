import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { MenuItemList } from "#c/components/NavHeader/MenuItemList";
import Logo from "#c/images/logo.png";

import "#c/components/NavHeader/NavHeader.css";

const { Header } = Layout;
const { Item: MenuItem } = Menu;

export const NavHeader: React.FC = () => {
    const location = useLocation();

    return (
        <Layout>
            <Header id="NavBar--Base">
                <div id="NavBar--Logo">
                    <img src={Logo} width={140} style={{ paddingBottom: 5 }} />
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    id="NavBar--Menu"
                >
                    {MenuItemList.map(({ path, text }) => {
                        return (
                            <MenuItem key={path}>
                                <Link to={path}>{text}</Link>
                            </MenuItem>
                        );
                    })}
                </Menu>
                <Link to="/login" id="NavBar--Login">
                    {" "}
                    LOG IN <UserOutlined />
                </Link>
            </Header>
            <div style={{ marginTop: 64 }} />
        </Layout>
    );
};