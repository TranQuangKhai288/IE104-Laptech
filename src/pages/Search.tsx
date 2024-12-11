import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductHomeItem from "../components/ProductHomeItem";
import { Product } from "../interfaces/Product";
import * as ProductService from "../apis/ProductService";
import { useLocation } from "react-router-dom";
const Search: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  // lấy key-word từ params
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("key-word");
  // Fetch sản phẩm từ API
  const fetchProduct = async () => {
    try {
      const res = await ProductService.getProducts(
        1,
        pageSize,
        "",
        "",
        "",
        searchQuery ?? "",
        ""
      );
      if (res?.status === "OK") {
        setProducts(res.data);
      }
      setIsLoading(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [searchQuery, pageSize]); // Gọi lại khi `type` hoặc `pageSize` thay đổi

  const handleLoadMore = () => setPageSize((prevPageSize) => prevPageSize + 10);

  return products?.length === 0 ? (
    <div>
      <div className="text-3xl font-bold mb-4">
        Kết quả tìm kiếm cho {searchQuery}
      </div>
      <div className="text-center text-xl">Không có sản phẩm nào</div>
    </div>
  ) : (
    <div>
      <div className="text-3xl font-bold mb-4">
        Kết quả tìm kiếm cho {searchQuery}
      </div>
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

export default Search;
