import { useState, useEffect } from "react";
import * as ProductService from "../apis/ProductService";
import ProductHomeItem from "./ProductHomeItem";

import { Product } from "../interfaces/Product";

const ProductSuggestions = () => {
  const [suggestionsData, setSuggestionsData] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState(10); // Quản lý số lượng sản phẩm hiển thị
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = async () => {
    try {
      setIsLoading(true); // Hiển thị trạng thái loading khi fetch API
      const res = await ProductService.getProducts(
        1,
        pageSize,
        "",
        "",
        "",
        "",
        ""
      );

      if (res.status === "OK") {
        setSuggestionsData(res.data);
      } else {
        console.log(res.message, "error at fetchSuggestions");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [pageSize]); // Gọi API mỗi khi `pageSize` thay đổi

  const handleLoadMore = () => {
    setPageSize((prevPageSize) => prevPageSize + 10); // Tăng thêm 10 sản phẩm
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {suggestionsData?.length !== 0 &&
            suggestionsData.map((suggestion) => (
              <ProductHomeItem key={suggestion._id} product={suggestion} />
            ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-12">
        <button
          onClick={handleLoadMore} // Gọi hàm load thêm
          disabled={isLoading} // Vô hiệu hóa khi đang tải
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

export default ProductSuggestions;
