import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography, Avatar, message, Modal, Button } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  ContactsOutlined,
  UserOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../provider/StoreProvider";

const { Sider } = Layout;
const { Title, Text } = Typography;

const menuConfig = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: "Bảng Thống Kê",
    path: "",
  },
  {
    key: "sub2",
    icon: <ContactsOutlined />,
    title: "Quản Lý",
    items: [
      { key: "2", label: "Quản Lý Người Dùng", path: "customers" },
      { key: "3", label: "Quản Lý Sản Phẩm", path: "products" },
      { key: "4", label: "Quản Lý Đơn Hàng", path: "order-management" },
    ],
  },
  // {
  //   key: "sub3",
  //   icon: <BarChartOutlined />,
  //   title: "An Ninh & Cảnh Báo",
  //   items: [
  //     { key: "7", label: "An Ninh", path: "security" },
  //     { key: "8", label: "Cảnh Báo", path: "warning" },
  //     { key: "9", label: "Xem Lại Camera", path: "record" },
  //   ],
  // },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { state, dispatch } = useAppContext();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (path: string) => {
    navigate(`/admin/${path}`);
  };

  // Extract current path from location
  const currentPath = location.pathname.split("/admin/")[1] || "";

  // Determine the selected keys and open keys based on the current path
  const getSelectedAndOpenKeys = () => {
    if (currentPath === "") {
      return { selectedKeys: ["1"], openKeys: [] };
    }

    for (const menu of menuConfig) {
      if (menu.items) {
        const item = menu.items.find((item) => item.path === currentPath);
        if (item) {
          return { selectedKeys: [item.key], openKeys: [menu.key] };
        }
      } else if (menu.path === currentPath) {
        return { selectedKeys: [menu.key], openKeys: [] };
      }
    }
    return { selectedKeys: [], openKeys: [] };
  };

  useEffect(() => {
    const { selectedKeys: newSelectedKeys, openKeys: newOpenKeys } =
      getSelectedAndOpenKeys();
    setSelectedKeys(newSelectedKeys);

    // Only set openKeys on initial load or page reload
    if (isInitialLoad) {
      setOpenKeys(newOpenKeys);
      setIsInitialLoad(false);
    }
  }, [currentPath, isInitialLoad]);

  useEffect(() => {
    // Reset isInitialLoad when the page is reloaded
    const handleBeforeUnload = () => {
      setIsInitialLoad(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Sider
      collapsed={collapsed}
      className="min-h-screen bg-gray-800"
      width={250}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          {!collapsed && (
            <Title level={3} style={{ color: "white" }}>
              LapTech
            </Title>
          )}
          <button
            onClick={toggleCollapsed}
            className="text-white hover:text-blue-400 bg-gray-700 p-2 rounded-lg ml-2"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <Avatar
            size={collapsed ? 48 : 80}
            src={state?.user?.avatar}
            icon={<UserOutlined />}
          />
        </div>
        {!collapsed && (
          <div className="text-center mb-4">
            <Text strong className="text-white text-lg">
              {state?.user?.name}
            </Text>
            <Text className="text-green-400 block">LapTech Admin Page</Text>
          </div>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
        className="border-r-0"
      >
        {menuConfig.map((menu) =>
          menu.items ? (
            <Menu.SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
              {menu.items.map((item) => (
                <Menu.Item
                  key={item.key}
                  onClick={() => handleMenuClick(item.path)}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={menu.key}
              icon={menu.icon}
              onClick={() => handleMenuClick(menu.path)}
            >
              {menu.label}
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
