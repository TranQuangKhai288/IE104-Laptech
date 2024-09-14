import React, { useState } from "react";
import {
  Table,
  Tag,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  PlusOutlined,
  FileExcelTwoTone,
  UploadOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

// Mock data (same as your existing data)
const mockDataUser = [
  {
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
    phone: "123-456-7890",
    email: "john@example.com",
    access: "admin",
  },
  {
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/150",
    phone: "098-765-4321",
    email: "jane@example.com",
    access: "manager",
  },
  // Add more data as needed...
];

const Customer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState(mockDataUser); // State để lưu dữ liệu sản phẩm
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Ảnh đại diện",
      width: "15%",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => (
        <img src={avatar} alt="avatar" className="w-full object-cover" />
      ),
    },
    {
      title: "Thông tin cá nhân",
      render: (record: any) => (
        <div className="flex flex-col rounded-lg p-4 w-full shadow-md transition duration-300 cursor-pointer hover:scale-105">
          <p>
            <strong>Tên: </strong>
            {record.name}
          </p>
          <p>
            <strong>Email: </strong>
            {record.email}
          </p>
          <p>
            <strong>Địa chỉ: </strong>
            {record.address}
          </p>
          <p>
            <strong>Số điện thoại: </strong>
            {record.phone}
          </p>
        </div>
      ),
    },
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
            icon = <UserOutlined className="text-3xl" />;
            break;
          case "manager":
            color = "blue";
            icon = <SafetyCertificateOutlined className="text-3xl" />;
            break;
          default:
            color = "volcano";
            icon = <LockOutlined className="text-3xl" />;
            break;
        }

        return (
          <Tag
            color={color}
            className="flex w-full h-20 items-center justify-center gap-2 w-24 mx-auto"
          >
            {icon}
            <span className="capitalize text-base">{access}</span>
          </Tag>
        );
      },
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddUser = (values: any) => {
    console.log("User added:", values);
    const newUser = {
      ...values,
      status: values.stock > 0 ? "Còn hàng" : "Hết hàng",
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
  };

  console.log(users, "users");

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Title level={2}>DANH SÁCH THÔNG TIN KHÁCH HÀNG</Title>
      </div>
      {/* Data Table */}
      <div className="overflow-auto rounded-md shadow-md">
        <div className="flex items-center justify-end mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined style={{ fontSize: 28 }} />}
            className="bg-blue-600 h-10"
            onClick={handleOpenModal}
          >
            Thêm khách hàng
          </Button>

          <p className="mx-4">hoặc</p>

          <Button
            type="primary"
            icon={<FileExcelTwoTone style={{ fontSize: 28 }} />}
            className="bg-blue-600 h-10"
          >
            Thêm khách hàng bằng file Excel
          </Button>
        </div>
        <Table
          dataSource={users}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          className="text-white"
        />
      </div>
      <Modal
        title="Thêm khách hàng mới"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddUser}>
          <Form.Item
            name="name"
            label="Tên khách hàng"
            rules={[
              { required: true, message: "Vui lòng nhập Tên khách hàng!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="Ảnh đại diện"
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

export default Customer;
