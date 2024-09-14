import React from "react";
import { Table, Typography } from "antd";

const { Title } = Typography;

// Dữ liệu mẫu (thay thế bằng dữ liệu thực tế của bạn)
const mockDataCustomerDept = [
  {
    id: "1",
    name: "John Doe",
    phone: "123-456-7890",
    email: "john@example.com",
    cost: "100.00",
    date: "2023-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "098-765-4321",
    email: "jane@example.com",
    cost: "200.50",
    date: "2023-02-01",
  },
  // Thêm các dữ liệu khác ở đây...
];

const CustomerDept: React.FC = () => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: "10%" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "text-green-300",
      width: "20%",
    },
    { title: "Phone Number", dataIndex: "phone", key: "phone", width: "15%" },
    { title: "Email", dataIndex: "email", key: "email", width: "20%" },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      width: "15%",
      render: (cost: string) => (
        <Typography className="text-green-500">${cost}</Typography>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date", width: "20%" },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <Title level={2}>TEAM</Title>
        <p className="text-gray-500">Managing the Team Members</p>
      </div>
      {/* Data Table */}
      <div className="overflow-auto rounded-md shadow-md">
        <Table
          dataSource={mockDataCustomerDept}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          className="text-white"
        />
      </div>
    </div>
  );
};

export default CustomerDept;
