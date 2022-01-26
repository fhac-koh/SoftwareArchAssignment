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
                <div id="NavBar--LeftSide">
                    <div id="NavBar--Logo">
                        <img id="NavBar--LogoImage" src={Logo} />
                    </div>
                    <Menu
                        id="NavBar--Menu"
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                    >
                        {MenuItemList.map(({ path, text }) => {
                            return (
                                <MenuItem key={path}>
                                    <Link to={path}>{text}</Link>
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </div>
                <div id="NavBar--RightSide">
                    <Link to="/login" id="NavBar--Login">
                        {" "}
                        LOG IN <UserOutlined />
                    </Link>
                </div>
            </Header>
            <div id="NavBar--Margin" />
        </Layout>
    );
};
