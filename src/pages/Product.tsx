import React, { useState } from "react";
import {
  Table,
  Tag,
  Typography,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
} from "antd";
import {
  PlusOutlined,
  EditTwoTone,
  DeleteTwoTone,
  UploadOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  FileExcelTwoTone,
} from "@ant-design/icons";
import * as XLSX from "xlsx"; // Import thư viện xlsx

const { Title } = Typography;

const mockDataProducts = [
  {
    id: "1",
    name: "Product A",
    category: "Electronics",
    price: "$199.99",
    stock: 120,
    status: "Còn hàng",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Product B",
    category: "Home Appliances",
    price: "$89.99",
    stock: 45,
    status: "Hết hàng",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Product C",
    category: "Books",
    price: "$15.99",
    stock: 200,
    status: "Còn hàng",
    image: "https://via.placeholder.com/150",
  },
  // Add more data as needed...
];

const ProductManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(mockDataProducts); // State để lưu dữ liệu sản phẩm
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = (values: any) => {
    console.log("Product added:", values);
    const newProduct = {
      ...values,
      id: (products.length + 1).toString(), // Tạo ID cho sản phẩm mới
      status: values.stock > 0 ? "Còn hàng" : "Hết hàng",
    };
    setProducts([...products, newProduct]);
    setIsModalOpen(false);
  };

  const handleUploadExcel = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const newProducts = jsonData.map((product: any) => ({
        id: (products.length + 1).toString(),
        name: product["Tên sản phẩm"],
        category: product["Phân loại"],
        price: product["Đơn giá"],
        stock: product["Số lượng"],
        status: product["Số lượng"] > 0 ? "Còn hàng" : "Hết hàng",
        image: product["Hình ảnh"] || "https://via.placeholder.com/150",
      }));

      setProducts([...products, ...newProducts]);
      message.success("Thêm sản phẩm thành công!");
    };

    reader.readAsArrayBuffer(file);
    return false; // Prevent auto upload
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="Product" className="w-full object-cover" />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <div className="flex rounded-lg p-4 w-full shadow-md transition duration-300 cursor-pointer hover:scale-105">
          <p>{name}</p>
        </div>
      ),
    },
    {
      title: "Phân loại",
      dataIndex: "category",
      key: "category",
      render: (category: string) => (
        <div className="flex rounded-lg p-4 w-full shadow-md transition duration-300 cursor-pointer hover:scale-105">
          <p>{category}</p>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price: string) => (
        <div className="flex rounded-lg p-4 w-full shadow-md transition duration-300 cursor-pointer hover:scale-105">
          <p>{price}</p>
        </div>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => (
        <div className="flex rounded-lg p-4 w-full shadow-md transition duration-300 cursor-pointer hover:scale-105">
          <p>{stock}</p>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = status === "Còn hàng" ? "green" : "volcano";

        return (
          <Tag
            color={color}
            className="flex rounded-lg p-4 shadow-md transition duration-300 cursor-pointer hover:scale-105"
          >
            {status === "Còn hàng" ? (
              <ShoppingCartOutlined
                style={{ color: "green", fontSize: 20 }}
                className="mr-2"
              />
            ) : (
              <TagOutlined />
            )}
            <span className="capitalize">{status}</span>
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (record: any) => (
        <Space size="middle">
          <Tag
            color={"blue"}
            className="flex rounded-lg p-4 shadow-md transition duration-300 cursor-pointer hover:scale-105"
          >
            <EditTwoTone twoToneColor="#0f00ff" className="text-xl" />
          </Tag>
          <Tag
            color={"red"}
            className="flex rounded-lg p-4 shadow-md transition duration-300 cursor-pointer hover:scale-105"
          >
            <DeleteTwoTone twoToneColor="#ff0000" className="text-xl" />
          </Tag>
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <Title level={2}>QUẢN LÝ SẢN PHẨM</Title>
      </div>
      {/* Data Table */}
      <div className="overflow-auto rounded-md shadow-md p-2">
        <div className="flex items-center justify-end mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined style={{ fontSize: 28 }} />}
            className="bg-blue-600 h-10"
            onClick={handleOpenModal}
          >
            Thêm sản phẩm
          </Button>
          <p className="mx-4">hoặc</p>

          <Upload
            accept=".xlsx, .xls"
            showUploadList={false}
            beforeUpload={handleUploadExcel}
          >
            <Button
              type="primary"
              icon={<FileExcelTwoTone style={{ fontSize: 28 }} />}
              className="bg-blue-600 h-10"
            >
              Thêm sản phẩm bằng file Excel
            </Button>
          </Upload>
        </div>

        <Table
          dataSource={products}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          className="text-white"
        />
      </div>

      {/* Modal for Adding Product */}
      <Modal
        title="Thêm sản phẩm mới"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddProduct}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Phân loại"
            rules={[{ required: true, message: "Vui lòng nhập phân loại!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Đơn giá"
            rules={[{ required: true, message: "Vui lòng nhập đơn giá!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Số lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Hình ảnh"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} // Prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>Upload hình ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
