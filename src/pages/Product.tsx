import React, { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Button,
  Form,
  Upload,
  message,
  notification,
} from "antd";
import { PlusOutlined, FileExcelTwoTone } from "@ant-design/icons";
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
  image: string;
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
              if (resDelete.status === "OK") {
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
    if (resNewProduct.status === "OK") {
      message.success("Thêm sản phẩm thành công!");
      fetchProducts();
    } else {
      message.error("Thêm sản phẩm thất bại!");
    }
    setIsModalOpen(false);
  };

  const handleUploadExcel = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const newProducts: Product[] = jsonData.map((product: any) => ({
        id: (products.length + 1).toString(),
        name: product["Tên sản phẩm"],
        category: product["Phân loại"],
        price: product["Đơn giá"],
        stock: product["Số lượng"],
        status: product["Số lượng"] > 0 ? "Còn hàng" : "Hết hàng",
        image: product["Hình ảnh"] || "https://via.placeholder.com/150",
      }));

      // setProducts([...products, ...newProducts]);
      message.success("Thêm sản phẩm thành công!");
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
      console.log("Products:", res.data);
      setProducts(res.data);
      setPagination({
        current: page,
        pageSize: pageSize,
        totalPages: res.totalPages, // Assuming the response includes the total count of products
        count: res.count,
      });
      // lướt lên đầu trang khi chuyển trang
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(1, pagination.pageSize, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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
        </div>

        <Table
          dataSource={products}
          columns={productColumns({ handleEditProduct, handleDeleteClick })}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.count,
            onChange: (page, pageSize) => {
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
