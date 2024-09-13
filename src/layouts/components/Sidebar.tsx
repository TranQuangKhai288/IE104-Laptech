import React, { useState } from "react";
import { Layout, Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  ContactsOutlined,
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;
const { Title, Text } = Typography;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  to: string;
}

const items: MenuItem[] = [
  { key: "1", icon: <HomeOutlined />, label: "Bảng Thống Kê", to: "" },
  {
    key: "2",
    icon: <TeamOutlined />,
    label: "Thông Tin Khách Hàng",
    to: "customers",
  },
  {
    key: "3",
    icon: <ContactsOutlined />,
    label: "Thông Tin Nhà Cung Cấp",
    to: "suppliers",
  },

  {
    key: "4",
    icon: <ContactsOutlined />,
    label: "Quản Lý Sản Phẩm",
    to: "products",
  },

  {
    key: "5",
    icon: <FileTextOutlined />,
    label: "Ghi Nợ Khách Hàng",
    to: "dept",
  },
  {
    key: "6",
    icon: <UserOutlined />,
    label: "Thêm Khách Hàng Mới",
    to: "create-customer",
  },
  {
    key: "7",
    icon: <CalendarOutlined />,
    label: "Lịch Trình",
    to: "calendar",
  },
  { key: "8", icon: <BarChartOutlined />, label: "An Ninh", to: "security" },
  { key: "9", icon: <PieChartOutlined />, label: "Cảnh Báo", to: "warning" },
  {
    key: "10",
    icon: <LineChartOutlined />,
    label: "Xem Lại Camera",
    to: "record",
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (path: string) => {
    navigate(`/admin/${path}`);
  };
  const currentPath = location.pathname.split("/admin/")[1] || "";
  console.log(currentPath, "currentPath");
  return (
    <Sider
      collapsed={collapsed}
      className="min-h-screen bg-gray-800"
      width={250}
    >
      <div className="p-4">
        <div className="flex items-center  justify-between mb-4">
          {!collapsed && (
            <Title
              level={3}
              style={{
                color: "white",
              }}
            >
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
        defaultSelectedKeys={["1"]}
        // selectedKeys={[currentPath]}
        className="border-r-0"
      >
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => handleMenuClick(item.to)}
          >
            <div>{item.label}</div>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
