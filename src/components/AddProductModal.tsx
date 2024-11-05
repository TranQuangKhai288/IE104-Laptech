import React, { useState } from "react";
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
const { Option } = Select;

interface AddProductModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleAddProduct: (values: any) => void;
}

interface ColorItem {
  title: string;
  hex: string;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isModalOpen,
  handleCloseModal,
  handleAddProduct,
}) => {
  const [form] = Form.useForm();
  const [specifications, setSpecifications] = useState<any[]>([]);
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [colors, setColors] = useState<ColorItem[]>([]);
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
    // Kiểm tra định dạng file
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ có thể tải lên file ảnh!");
      return false;
    }

    // Kiểm tra kích thước file (ví dụ: giới hạn 5MB)
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Kích thước ảnh phải nhỏ hơn 5MB!");
      return false;
    }

    // Convert RcFile to File type
    const newFile = new File([file], file.name, {
      type: file.type,
    });

    setFileList((prev) => [
      ...prev,
      {
        ...file,
        originFileObj: newFile,
      } as unknown as UploadFile,
    ]);
    return false;
  };

  const handleRemoveFile = (file: UploadFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const handleSubmit = async (values: any) => {
    try {
      setUploading(true);
      // console.log(values, "values");

      const validFiles = fileList.filter((file) => file.originFileObj);

      if (validFiles.length === 0) {
        throw new Error("Không có file hợp lệ để upload");
      }

      const imageFiles = validFiles.map((file) => file.originFileObj as File);

      console.log("Processing files for upload:", imageFiles);

      // Upload images to Firebase Storage
      const imageUrls = await uploadMultipleFiles(imageFiles);

      const productData = {
        ...values,
        images: imageUrls,
        colors,
        specifications: specifications.filter(
          (spec) => spec.type && spec.title && spec.description
        ),
        createdAt: new Date().toISOString(),
      };

      console.log("Product data:", productData);

      // Submit product data
      handleAddProduct(productData);

      // Reset form and states
      form.resetFields();
      setFileList([]);
      setColors([]);
      setSpecifications([]);
      handleCloseModal();
    } catch (error) {
      console.error("Error adding product:", error);
      message.error(
        error instanceof Error ? error.message : "Lỗi khi thêm sản phẩm!"
      );

      // Clean up uploaded images if product creation fails
      if (error && values.images?.length > 0) {
        try {
          await deleteMultipleFiles(values.images);
        } catch (deleteError) {
          console.error("Error deleting uploaded images:", deleteError);
        }
      }
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setSpecifications([]);
    handleCloseModal();
  };

  return (
    <Modal
      title="Thêm sản phẩm mới"
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
            <Option value="laptop">Laptop</Option>
            <Option value="pc">PC</Option>
            <Option value="phone">Điện thoại</Option>
            <Option value="accessory">Phụ kiện</Option>
            <Option value="tablet">Máy tính bảng</Option>
            <Option value="other">Khác</Option>
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

        <Form.Item
          name="images"
          label="Hình ảnh"
          valuePropName="fileList"
          rules={[
            { required: true, message: "Vui lòng tải lên ít nhất 1 ảnh!" },
          ]}
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            listType="picture"
            beforeUpload={handleBeforeUpload}
            onRemove={handleRemoveFile}
            multiple
          >
            <Button icon={<UploadOutlined />}>Upload hình ảnh</Button>
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
              {uploading ? "Đang thêm sản phẩm..." : "Thêm sản phẩm"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
