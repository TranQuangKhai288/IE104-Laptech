import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductHomeItem from "../components/ProductHomeItem";
import { Product } from "../interfaces/Product";
import * as ProductService from "../apis/ProductService";
import { Spin } from "antd";

const ProductWithType: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  // Xác định tiêu đề và danh mục từ `type`
  const getCategoryAndTitle = useCallback((type: string | undefined) => {
    switch (type) {
      case "laptop-gaming":
        return {
          title: "Laptop Gaming",
          category: "Laptop",
          subCategory: "Gaming",
        };
      case "laptop-office":
        return {
          title: "Laptop văn phòng",
          category: "Laptop",
          subCategory: "Office",
        };
      case "laptop-ultrabook":
        return {
          title: "Laptop mỏng nhẹ",
          category: "Laptop",
          subCategory: "Ultrabook",
        };
      case "laptop-2-in-1":
        return {
          title: "Laptop 2 trong 1",
          category: "Laptop",
          subCategory: "2-in-1",
        };
      case "laptop-workstation":
        return {
          title: "Laptop Workstation",
          category: "Laptop",
          subCategory: "Workstation",
        };
      case "laptop-budget":
        return {
          title: "Laptop giá rẻ",
          category: "Laptop",
          subCategory: "Budget",
        };
      case "personal-computer":
        return {
          title: "Máy tính để bàn",
          category: "desktop",
          subCategory: "",
        };
      case "phone":
        return { title: "Điện thoại", category: "phone", subCategory: "" };
      case "tablet":
        return { title: "Máy tính bảng", category: "tablet", subCategory: "" };
      case "accessories":
        return { title: "Phụ kiện", category: "accessory", subCategory: "" };
      default:
        return { title: "Sản phẩm", category: "", subCategory: "" };
    }
  }, []);

  const { title, category, subCategory } = getCategoryAndTitle(type);

  // Fetch sản phẩm từ API
  const fetchProduct = async () => {
    if (!category) return; // Không gọi API nếu `category` không hợp lệ
    try {
      setIsLoading(true);
      const res = await ProductService.getProducts(
        1,
        pageSize,
        category,
        subCategory,
        "",
        "",
        ""
      );
      if (res && res.status === "OK") {
        setProducts(res.data);
      } else {
        console.error("Fetch Product Error:", res?.message);
      }
    } catch (error) {
      console.error("Fetch Product Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [type, pageSize]); // Gọi lại khi `type` hoặc `pageSize` thay đổi

  const handleLoadMore = () => setPageSize((prevPageSize) => prevPageSize + 10);

  return products?.length === 0 ? (
    <div>
      <div className="text-3xl font-bold mb-4">{title}</div>
      <div className="text-center text-xl">
        {isLoading ? (
          <>
            <Spin size="large" tip="Đang tải..." />
          </>
        ) : (
          "Không có sản phẩm nào"
        )}
      </div>
    </div>
  ) : (
    <div>
      <div className="text-3xl font-bold mb-4">{title}</div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {products.map((product) => (
            <ProductHomeItem key={product._id} product={product} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-12">
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className={`bg-white font-bold text-xl text-blue-500 py-4 px-24 rounded-lg shadow transition ease-in-out hover:bg-blue-50 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? "Đang tải..." : "Xem thêm"}
        </button>
      </div>
    </div>
  );
};

export default ProductWithType;
