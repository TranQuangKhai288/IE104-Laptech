import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  ContactsOutlined,
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

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
    key: "sub1",
    icon: <TeamOutlined />,
    title: "Thông Tin",
    items: [
      { key: "2", label: "Thông Tin Khách Hàng", path: "customers" },
      { key: "3", label: "Thông Tin Nhà Cung Cấp", path: "suppliers" },
      { key: "4", label: "Ghi Nợ Khách Hàng", path: "dept" },
    ],
  },
  {
    key: "sub2",
    icon: <ContactsOutlined />,
    title: "Quản Lý",
    items: [
      { key: "5", label: "Quản Lý Sản Phẩm", path: "products" },
      { key: "6", label: "Lịch Trình", path: "calendar" },
    ],
  },
  {
    key: "sub3",
    icon: <BarChartOutlined />,
    title: "An Ninh & Cảnh Báo",
    items: [
      { key: "7", label: "An Ninh", path: "security" },
      { key: "8", label: "Cảnh Báo", path: "warning" },
      { key: "9", label: "Xem Lại Camera", path: "record" },
    ],
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
              WareVision
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
            src="/path/to/user-image.png"
            icon={<UserOutlined />}
          />
        </div>
        {!collapsed && (
          <div className="text-center mb-4">
            <Text strong className="text-white text-lg">
              Ed Roh
            </Text>
            <Text className="text-green-400 block">VP Fancy Admin</Text>
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
