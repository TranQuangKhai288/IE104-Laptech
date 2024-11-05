import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  Select,
  Space,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import {
  uploadMultipleFiles,
  deleteMultipleFiles,
} from "../apis/StorageService";
import { ProductColumns } from "../columnConfig/productColumns";
const { Option } = Select;

interface ColorItem {
  title: string;
  hex: string;
}

const availableTypes = [
  "CPU",
  "RAM",
  "Storage",
  "Display",
  "Battery",
  "Camera",
  "OS",
  "GPU",
  "Connectivity",
  "Ports",
  "Audio",
  "Sensors",
  "Features",
];

const EditProductModal: React.FC<{
  isModalOpen: boolean;
  product: ProductColumns | null;
  handleCloseModal: () => void;
  handleEditProduct: (values: any) => void;
}> = ({ isModalOpen, product, handleCloseModal, handleEditProduct }) => {
  const [form] = Form.useForm();
  const [specifications, setSpecifications] = useState<any[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [colors, setColors] = useState<ColorItem[]>([]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);

      // Set file list from product images
      setFileList(
        product.images.map((url, index) => ({
          uid: index.toString(),
          name: `Image ${index + 1}`,
          status: "done",
          url,
        }))
      );

      // Set colors and specifications
      setColors(product.colors || []);
      setSpecifications(product.specifications || []);
    }
  }, [product, form]);

  const handleAddColor = () => {
    setColors([...colors, { title: "", hex: "" }]);
  };

  const handleColorChange = (
    index: number,
    key: "title" | "hex",
    value: string
  ) => {
    const newColors = [...colors];
    newColors[index][key] = value;
    setColors(newColors);
  };

  const handleRemoveColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const handleAddSpecification = () => {
    setSpecifications([
      ...specifications,
      { type: "", title: "", description: "" },
    ]);
  };

  const handleSpecificationChange = (
    index: number,
    key: string,
    value: string
  ) => {
    const newSpecifications = [...specifications];
    newSpecifications[index][key] = value;
    setSpecifications(newSpecifications);
  };

  const handleRemoveSpecification = (index: number) => {
    const newSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecifications);
  };

  const handleBeforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ có thể tải lên file ảnh!");
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Kích thước ảnh phải nhỏ hơn 5MB!");
      return false;
    }

    setFileList((prev) => [
      ...prev,
      {
        ...file,
        originFileObj: file,
      } as UploadFile,
    ]);
    return false;
  };

  const handleRemoveFile = (file: UploadFile) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setSpecifications([]);
    setColors([]);
    handleCloseModal();
  };

  const handleSubmit = async (values: any) => {
    setUploading(true);
    const updatedProduct = {
      ...values,
      images: fileList.map((file) => file.url || file.originFileObj),
      colors,
      specifications,
    };
    await handleEditProduct(updatedProduct);
    setUploading(false);
    handleCloseModal();
  };

  return (
    <Modal
      title="Chỉnh sửa sản phẩm"
      open={isModalOpen}
      onCancel={handleCloseModal}
      footer={null}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Phân loại"
          rules={[{ required: true, message: "Vui lòng nhập phân loại!" }]}
        >
          <Select placeholder="Chọn phân loại">
            <Select.Option value="laptop">Laptop</Select.Option>
            <Select.Option value="pc">PC</Select.Option>
            <Select.Option value="phone">Điện thoại</Select.Option>
            <Select.Option value="accessory">Phụ kiện</Select.Option>
            <Select.Option value="tablet">Máy tính bảng</Select.Option>
            <Select.Option value="other">Khác</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="brand"
          label="Thương hiệu"
          rules={[{ required: true, message: "Vui lòng nhập thương hiệu!" }]}
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
          name="starting_price"
          label="Giá khởi điểm"
          rules={[{ required: true, message: "Vui lòng nhập giá khởi điểm!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="sale_percentage"
          label="Phần trăm giảm giá"
          rules={[
            { required: true, message: "Vui lòng nhập phần trăm giảm giá!" },
          ]}
        >
          <InputNumber min={0} max={100} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Số lượng"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Hình ảnh" required>
          <Upload
            listType="picture"
            beforeUpload={handleBeforeUpload}
            onRemove={handleRemoveFile}
            fileList={fileList}
            multiple
          >
            <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Màu sắc">
          {colors.map((color, index) => (
            <Space key={index} style={{ display: "flex", marginBottom: 8 }}>
              <Input
                value={color.title}
                onChange={(e) =>
                  handleColorChange(index, "title", e.target.value)
                }
                placeholder="Tên màu"
                style={{ width: "200px" }}
              />
              <Input
                value={color.hex}
                onChange={(e) =>
                  handleColorChange(index, "hex", e.target.value)
                }
                placeholder="Mã màu (HEX)"
                style={{ width: "150px" }}
              />
              <Button type="link" onClick={() => handleRemoveColor(index)}>
                Xóa
              </Button>
            </Space>
          ))}
          <Button type="dashed" onClick={handleAddColor}>
            Thêm màu
          </Button>
        </Form.Item>

        <Form.Item label="Thông số kỹ thuật">
          {specifications.map((spec, index) => (
            <Space key={index} style={{ display: "flex", marginBottom: 8 }}>
              <Select
                value={spec.type}
                onChange={(value) =>
                  handleSpecificationChange(index, "type", value)
                }
                placeholder="Chọn loại"
                style={{ width: "150px" }}
              >
                {availableTypes
                  .filter(
                    (type) => !specifications.some((s) => s.type === type)
                  ) // Lọc loại đã chọn
                  .map((type) => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
              </Select>
              <Input
                value={spec.title}
                onChange={(e) =>
                  handleSpecificationChange(index, "title", e.target.value)
                }
                placeholder="Thông số"
                style={{ width: "150px" }}
              />
              <Input
                value={spec.description}
                onChange={(e) =>
                  handleSpecificationChange(
                    index,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Mô tả chi tiết"
                style={{ width: "300px" }}
              />
              <Button
                type="link"
                onClick={() => handleRemoveSpecification(index)}
              >
                Xóa
              </Button>
            </Space>
          ))}
          <Button type="dashed" onClick={handleAddSpecification}>
            Thêm thông số
          </Button>
        </Form.Item>

        <Form.Item
          name="gift_value"
          label="Giá trị quà tặng"
          rules={[
            { required: true, message: "Vui lòng nhập giá trị quà tặng!" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Space>
            <Button onClick={handleCancel}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={uploading}
              disabled={uploading || fileList.length === 0}
            >
              {uploading ? "Đang chỉnh sửa sản phẩm..." : "Chỉnh sửa sản phẩm"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
