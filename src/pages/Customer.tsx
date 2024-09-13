import React from "react";
import { Table, Tag, Typography, Space } from "antd";
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

// Mock data (same as your existing data)
const mockDataTeam = [
  {
    id: "1",
    name: "John Doe",
    age: 32,
    phone: "123-456-7890",
    email: "john@example.com",
    access: "admin",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 28,
    phone: "098-765-4321",
    email: "jane@example.com",
    access: "manager",
  },
  // Add more data as needed...
];

const Customer: React.FC = () => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "text-green-300",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a: any, b: any) => a.age - b.age,
    },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Access Level",
      dataIndex: "access",
      key: "access",
      render: (access: string) => {
        let color = "";
        let icon = null;

        switch (access) {
          case "admin":
            color = "green";
            icon = <UserOutlined />;
            break;
          case "manager":
            color = "blue";
            icon = <SafetyCertificateOutlined />;
            break;
          default:
            color = "volcano";
            icon = <LockOutlined />;
            break;
        }

        return (
          <Tag
            color={color}
            className="flex items-center justify-center gap-2 w-24 mx-auto"
          >
            {icon}
            <span className="capitalize">{access}</span>
          </Tag>
        );
      },
    },
  ];

  return (
    <div className="m-5">
      {/* Header */}
      <div className="mb-6">
        <Title level={2}>TEAM</Title>
        <p className="text-gray-500">Managing the Team Members</p>
      </div>

      {/* Data Table */}
      <div className="overflow-auto bg-gray-800 p-5 rounded-md shadow-md">
        <Table
          dataSource={mockDataTeam}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          className="text-white"
          style={{ backgroundColor: "rgb(31 41 55)", color: "white" }}
        />
      </div>
    </div>
  );
};

export default Customer;
