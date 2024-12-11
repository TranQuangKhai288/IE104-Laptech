import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import useDebounce from "../../customeHooks/useDebounce";
import {
  productColumns,
  ProductColumns,
} from "../../columnConfig/productColumns";
import * as ProductService from "../../apis/ProductService";
import { formatCurrency } from "../../customeHooks/formatCurrency";
import { useNavigate } from "react-router-dom";
import { set } from "firebase/database";

const SearchComponent: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [products, setProducts] = useState<ProductColumns[]>([]);
  const debouncedSearchTerm = useDebounce(searchValue, 1000);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
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
      }
      // Lướt lên đầu trang khi chuyển trang
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchProducts(1, 10, debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/search?key-word=${searchValue}`);
      setSearchValue("");
    }
  };

  const searchResults = (
    <div
      className="absolute w-full mt-2 bg-white shadow-lg border rounded-md z-10"
      style={{
        maxHeight: "500px",
        overflowY: "auto",
        width: "150%", // Dài gấp rưỡi so với thanh tìm kiếm
        left: "50%", // Đặt nó bắt đầu từ giữa của thanh tìm kiếm
        transform: "translateX(-50%)", // Căn chỉnh lại để đảm bảo phần kết quả ở giữa
      }}
    >
      {/* Map data products */}
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="flex justify-start items-center p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              navigate(`/product-details/${product._id}`);
              setSearchValue("");
            }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="ml-2">
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-xs text-gray-500">{product.description}</p>
              <p className="text-base text-red-500">
                {formatCurrency(product.price)}{" "}
                <span className="text-gray-500 line-through">
                  {formatCurrency(parseFloat(product.starting_price))}
                </span>
                <span className="ml-2 text-green-500">
                  (
                  {Math.round(
                    ((parseFloat(product.starting_price) - product.price) /
                      parseFloat(product.starting_price)) *
                      100
                  )}
                  % giảm)
                </span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="p-2 text-gray-500">Không có sản phẩm nào.</div>
      )}
    </div>
  );

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div>
        <Input
          value={searchValue}
          placeholder="Nhập từ khóa để tìm kiếm sản phẩm"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Thêm sự kiện keyDown
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Icon */}
        {searchValue ? (
          <CloseCircleOutlined
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setSearchValue("")}
          />
        ) : (
          <SearchOutlined className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
        )}
      </div>

      {/* Display results directly below the input */}
      {searchValue && searchResults}
    </div>
  );
};

export default SearchComponent;
