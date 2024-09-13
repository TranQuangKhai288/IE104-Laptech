import React from "react";
import { Table, Tag, Typography } from "antd";
import { ShoppingCartOutlined, TagOutlined } from "@ant-design/icons";

const { Title } = Typography;

// Mock data for products
const mockDataProducts = [
  {
    id: "1",
    name: "Product A",
    category: "Electronics",
    price: "$199.99",
    stock: 120,
    status: "Available",
  },
  {
    id: "2",
    name: "Product B",
    category: "Home Appliances",
    price: "$89.99",
    stock: 45,
    status: "Out of Stock",
  },
  {
    id: "3",
    name: "Product C",
    category: "Books",
    price: "$15.99",
    stock: 200,
    status: "Available",
  },
  // Add more data as needed...
];

const ProductManagement: React.FC = () => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "text-green-300",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a: any, b: any) => a.stock - b.stock,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = status === "Available" ? "green" : "volcano";

        return (
          <Tag
            color={color}
            className="flex items-center justify-center gap-2 w-24 mx-auto"
          >
            {status === "Available" ? (
              <ShoppingCartOutlined />
            ) : (
              <TagOutlined />
            )}
            <span className="capitalize">{status}</span>
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      // render: (_, record: any) => (
      //   <Space size="middle">
      //     <Button type="primary" icon={<EditOutlined />} />
      //     <Button type="danger" icon={<DeleteOutlined />} />
      //   </Space>
      // ),
    },
  ];

  return (
    <div className="m-5">
      {/* Header */}
      <div className="mb-6">
        <Title level={2}>Product Management</Title>
        <p className="text-gray-500">Manage your products effectively</p>
      </div>

      {/* Data Table */}
      <div className="overflow-auto bg-gray-800 p-5 rounded-md shadow-md">
        <Table
          dataSource={mockDataProducts}
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

export default ProductManagement;
