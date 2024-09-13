import React, { useState } from "react";
import { Input, Popover } from "antd";
// import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";

const SearchComponent: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    setShowResult(!!inputValue);
  };

  const searchResults = (
    <div className="p-4 w-64">
      {/* Dummy data for search results */}
      <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
        <img
          src="placeholder-image-url.jpg"
          alt="Product Name"
          className="w-16 h-16 mr-2"
        />
        <div>
          <p className="font-semibold">Product Name</p>
          <p className="text-red-500">1,000,000 Đ</p>
        </div>
      </div>
      {/* Additional search results can be added here */}
    </div>
  );

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Popover
        content={searchResults}
        trigger="click"
        open={showResult}
        onOpenChange={setShowResult}
        placement="bottom"
      >
        <Input
          // ref={inputRef}
          value={searchValue}
          placeholder="Nhập từ khóa để tìm kiếm sản phẩm"
          onChange={handleInputChange}
          onFocus={() => setShowResult(true)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Popover>
    </div>
  );
};

export default SearchComponent;
