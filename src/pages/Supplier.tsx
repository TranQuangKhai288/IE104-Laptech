import React from "react";
import { Table, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

// Mock data (thay thế với dữ liệu thực tế của bạn)
const mockDataSupplier = [
  {
    id: "1",
    registrarId: "Reg-001",
    name: "John Doe",
    age: 32,
    phone: "123-456-7890",
    email: "john@example.com",
    address: "123 Main St",
    city: "New York",
    zipCode: "10001",
  },
  {
    id: "2",
    registrarId: "Reg-002",
    name: "Jane Smith",
    age: 28,
    phone: "098-765-4321",
    email: "jane@example.com",
    address: "456 Market St",
    city: "Los Angeles",
    zipCode: "90001",
  },
  // Thêm các dữ liệu khác ở đây...
];

const Supplier: React.FC = () => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: "10%" },
    {
      title: "Registrar ID",
      dataIndex: "registrarId",
      key: "registrarId",
      width: "15%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "text-green-300",
      width: "20%",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a: any, b: any) => a.age - b.age,
      width: "10%",
    },
    { title: "Phone Number", dataIndex: "phone", key: "phone", width: "15%" },
    { title: "Email", dataIndex: "email", key: "email", width: "20%" },
    { title: "Address", dataIndex: "address", key: "address", width: "20%" },
    { title: "City", dataIndex: "city", key: "city", width: "10%" },
    { title: "Zip Code", dataIndex: "zipCode", key: "zipCode", width: "10%" },
  ];

  return (
    <div className="m-5">
      {/* Header */}
      <div className="mb-6">
        <Title level={2}>CONTACTS</Title>
        <p className="text-gray-500">List of Contacts for Future Reference</p>
      </div>

      {/* Data Table */}
      <div className="overflow-auto bg-gray-800 p-5 rounded-md shadow-md">
        <Table
          dataSource={mockDataSupplier}
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

export default Supplier;
