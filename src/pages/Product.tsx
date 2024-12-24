import React, { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Button,
  Form,
  Upload,
  message,
  notification,
  Modal,
} from "antd";
import {
  PlusOutlined,
  FileExcelTwoTone,
  DownloadOutlined,
} from "@ant-design/icons";
import { set } from "firebase/database";

import * as XLSX from "xlsx"; // Import thư viện xlsx
import { productColumns, ProductColumns } from "../columnConfig/productColumns";
import AddProductModal from "../components/AddProductModal";
import * as ProductService from "../apis/ProductService";
import useDebounce from "../customeHooks/useDebounce";
import EditProductModal from "../components/EditProductModal";
const { Title } = Typography;

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "Còn hàng" | "Hết hàng";
  images: string[];
};

const ProductManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductColumns | null>(
    null
  );
  const [products, setProducts] = useState([] as ProductColumns[]);
  //pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    totalPages: 0,
    count: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditProduct = (product: ProductColumns) => {
    console.log("Edit product:", product);
    setEditingProduct(product); // Set the product being edited
    fetchProducts(); // Refetch the products
    setIsEditModalOpen(true); // Open the modal
  };

  const handleDeleteClick = (product: ProductColumns) => {
    console.log("Delete product:", product._id);
    notification.warning({
      message: `Bạn có chắc chắn xoá sản phẩm ${product.name}`,
      description: (
        <div className="flex justify-end ">
          <Button
            type="primary"
            danger
            className="mr-2"
            onClick={async () => {
              console.log("Delete product:", product._id);

              notification.destroy();

              const resDelete = await ProductService.deleteProduct(product._id);
              if (resDelete && resDelete.status === "OK") {
                notification.success({
                  message: `Xoá sản phẩm ${product.name} thành công`,
                });
                fetchProducts();
              }
            }}
          >
            Xoá
          </Button>
          <Button
            type="primary"
            onClick={() => {
              notification.destroy();
            }}
          >
            Hủy
          </Button>
        </div>
      ),
    });
  };
  const handleAddProduct = async (values: any) => {
    console.log("Product added:", values);
    const resNewProduct = await ProductService.createAProduct(values);
    if (resNewProduct && resNewProduct.status === "OK") {
      message.success("Thêm sản phẩm thành công!");
      fetchProducts();
    } else {
      message.error("Thêm sản phẩm thất bại!");
    }
    setIsModalOpen(false);
  };

  const handleUploadExcel = (file: any) => {
    const validateCategory = (category: string) => {
      return ["Laptop", "Pc", "Phone", "Accessory", "Tablet", "Other"].includes(
        category
      );
    };

    const validateSubCategory = (category: string, subCategory: string) => {
      if (category !== "Laptop") return true;
      return [
        "Gaming",
        "Office",
        "Ultrabook",
        "2-in-1",
        "Workstation",
        "Budget",
        "Student",
        "Business",
      ].includes(subCategory);
    };

    const validateSpecType = (type: string) => {
      return [
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
      ].includes(type);
    };
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Convert Excel data to match your schema
      const formattedProducts: any = jsonData.map((product: any) => ({
        name: product["Tên sản phẩm"] || "Unnamed Product",
        description: product["Mô tả"] || "",
        category: product["Phân loại"],
        subCategory: product["Loại"] || null,
        brand: product["Thương hiệu"],
        price: product["Đơn giá"] || 0,
        starting_price: product["Giá khởi điểm"] || null,
        stock: product["Số lượng"] || 0,
        images: product["Images"]
          ? product["Images"].split(",").map((url: string) => url?.trim())
          : [],
        colors: product["Colors"]
          ? product["Colors"].split(";").map((color: string) => {
              const [title, hex] = color.split("|");
              return { title: title?.trim(), hex: hex?.trim() };
            })
          : [],
        specifications: product["Specifications"]
          ? product["Specifications"].split(";").map((spec: string) => {
              const [type, title, description] = spec.split("|");
              if (!validateSpecType(type?.trim())) {
                throw new Error(
                  `Invalid specification type "${type}" for product ${product["Tên sản phẩm"]}`
                );
              }
              return {
                type: type.trim(),
                title: title.trim(),
                description: description.trim(),
              };
            })
          : [],
        gift_value: product["GiftValue"] || "",
        averageRating: product["AverageRating"] || 0,
        isFeatured: product["IsFeatured"] || false,
      }));

      console.log("Formatted products:", formattedProducts);
      setProducts(formattedProducts);
      try {
        const resbulk = await ProductService.createManyProducts(
          formattedProducts
        );

        const thanhCong: any[] = [];
        const trungLap: any[] = [];

        Array.isArray(resbulk?.data) &&
          resbulk?.data.forEach((result: any, index: number) => {
            if (
              typeof result === "string" &&
              result.includes("already exists")
            ) {
              trungLap.push({
                product: formattedProducts[index],
                index,
              });
            } else {
              thanhCong.push(result);
            }
          });

        // Thông báo sản phẩm thành công
        if (thanhCong.length > 0) {
          message.success(`Đã thêm thành công ${thanhCong.length} sản phẩm`);
        }

        // Nếu có sản phẩm trùng, hiển thị modal
        if (trungLap.length > 0) {
          Modal.confirm({
            title: "Phát hiện sản phẩm trùng lặp",
            content: (
              <div>
                <p>Các sản phẩm sau đã tồn tại trong hệ thống:</p>
                <ul>
                  {trungLap.map((item, idx) => (
                    <li key={idx}>
                      {item.product.name} ({item.product.brand})
                    </li>
                  ))}
                </ul>
                <p>Bạn có muốn bỏ qua các sản phẩm trùng lặp?</p>
              </div>
            ),
            okText: "Bỏ qua sản phẩm trùng",
            cancelText: "Hủy",
            onOk() {
              //modal off and refect data
              fetchProducts();
            },
          });
        } else {
          fetchProducts();
        }
      } catch (error) {
        console.error(error);
        message.error("Thêm sản phẩm thất bại!");
      }
    };

    reader.readAsArrayBuffer(file);
    return false; // Prevent auto upload
  };

  const fetchProducts = async (page = 1, pageSize = 5, search = "") => {
    try {
      const res = await ProductService.getProducts(
        page,
        pageSize,
        "",
        "",
        "",
        search,
        ""
      );
      if (res) {
        console.log("Products:", res.data);
        setProducts(res.data);
        setPagination({
          current: page,
          pageSize: pageSize,
          totalPages: res.totalPages, // Assuming the response includes the total count of products
          count: res.count,
        });
      }
      // lướt lên đầu trang khi chuyển trang
    } catch (error) {
      console.log("Failed to fetch products:", error);
    }
  };

  const handleFeaturedStatusChange = async (
    productId: string,
    status: boolean
  ) => {
    console.log("Featured status change:", productId, status);

    try {
      // Assuming the ProductService has an updateProduct method
      const res = await ProductService.updateProduct(productId, {
        isFeatured: status,
      });

      if (res && res.status === "OK") {
        message.success("Cập nhật trạng thái nổi bật thành công!");
        fetchProducts(
          pagination.current,
          pagination.pageSize,
          debouncedSearchTerm
        ); // Refresh the list of products
      } else {
        message.error("Cập nhật trạng thái nổi bật thất bại!");
      }
    } catch (error) {
      console.log("Error updating featured status:", error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };
  useEffect(() => {
    fetchProducts(1, pagination.pageSize, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleDownload = () => {
    // Đường dẫn tới file trong thư mục public
    const fileUrl = `${process.env.PUBLIC_URL}/template/Products.xlsx`;
    // Tạo link ẩn để tải file
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Products.xlsx"; // Tên file tải về
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <Title level={2}>QUẢN LÝ SẢN PHẨM</Title>
      </div>
      {/* Data Table */}
      <div className="overflow-auto rounded-md shadow-md p-2">
        <div className="flex items-center  justify-between mb-4">
          <Form layout="inline">
            <Form.Item
              label={
                <span className="text-base font-semibold">Tìm kiếm nhanh</span>
              }
            >
              <input
                type="text"
                className="w-64 px-2 py-1 rounded-md border border-gray-300"
                placeholder="Tìm kiếm sản phẩm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />{" "}
            </Form.Item>
          </Form>
          <div className="flex items-center justify-center mb-4">
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
              accept=".xlsx, .xls .csv"
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

            <Button
              type="primary"
              icon={<DownloadOutlined style={{ fontSize: 28 }} />}
              className="bg-blue-600 h-10 ml-4"
              onClick={handleDownload}
            >
              Tải mẫu Excel
            </Button>
          </div>
        </div>

        <Table
          dataSource={products}
          columns={productColumns({
            handleEditProduct,
            handleDeleteClick,
            handleFeaturedStatusChange,
          })}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.count,
            onChange: (page, pageSize) => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              fetchProducts(page, pageSize, debouncedSearchTerm);
            },
          }}
          rowKey="id"
          className="text-white"
        />
      </div>

      {/* Modal for Adding Product */}
      <AddProductModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleAddProduct={handleAddProduct}
      />
      {/* Edit Modal */}
      {editingProduct && (
        <EditProductModal
          isModalOpen={isEditModalOpen}
          product={editingProduct}
          handleCloseModal={() => setIsEditModalOpen(false)}
          handleEditProduct={handleEditProduct} // Update logic
        />
      )}
    </div>
  );
};

export default ProductManagement;
