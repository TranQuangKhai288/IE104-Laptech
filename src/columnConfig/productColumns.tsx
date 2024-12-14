import React, { useState } from "react";
import { Tag, Space, Rate, Tooltip, Badge, Switch } from "antd";
import {
  EditTwoTone,
  DeleteTwoTone,
  GiftOutlined,
  StarFilled,
  ShoppingCartOutlined,
  TagOutlined,
} from "@ant-design/icons";
import ProductImageGallery from "../components/ProductImageGallery";

// Define interfaces
interface Color {
  title: string;
  hex: string;
  _id: string;
}

interface Specification {
  type: string;
  title: string;
  description: string;
  _id: string;
}

interface Review {
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  _id: string;
}

export interface ProductColumns {
  _id: string;
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  brand: string;
  price: number;
  starting_price: string;
  sale_percentage: number;
  stock: number;
  images: string[];
  colors: Color[];
  specifications: Specification[];
  gift_value: string;
  reviews: Review[];
  averageRating: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Helper components
const ColorPreview: React.FC<{ color: Color }> = ({ color }) => (
  <Tooltip title={color.title + " " + color.hex}>
    <div
      className="w-6 h-6 rounded-full border border-gray-200 cursor-pointer mx-1"
      style={{ backgroundColor: color.hex }}
    />
  </Tooltip>
);

const PriceDisplay: React.FC<{
  price: number;
  startingPrice: string;
}> = ({ price, startingPrice }) => {
  const salePercentage = Math.round(
    ((parseFloat(startingPrice) - price) / parseFloat(startingPrice)) * 100
  );

  return (
    <div className="flex flex-col">
      <span className="text-lg font-semibold text-blue-600">
        {Number(price).toLocaleString("vi-VN")} VND
      </span>

      <div className="flex items-center gap-2">
        <span className="text-sm line-through text-gray-500">
          {Number(startingPrice).toLocaleString("vi-VN")} VND
        </span>
        <Tag color="red">-{salePercentage}%</Tag>
      </div>
    </div>
  );
};

const SpecificationsList: React.FC<{ specs: Specification[] }> = ({
  specs,
}) => {
  const [showAll, setShowAll] = useState(false); // Trạng thái quản lý hiển thị toàn bộ thông số
  const MAX_VISIBLE = 3; // Số lượng thông số hiển thị mặc định

  // Chọn danh sách thông số dựa trên trạng thái
  const visibleSpecs = showAll ? specs : specs.slice(0, MAX_VISIBLE);

  return (
    <div className="space-y-1 justify-start items-start">
      {visibleSpecs.map((spec) => (
        <Tooltip key={spec._id} title={spec.description}>
          <Tag
            color="blue"
            className="mb-1"
            style={{
              maxWidth: 200, // Giới hạn chiều rộng tối đa của Tag
              whiteSpace: "normal", // Cho phép xuống dòng
              wordBreak: "break-word", // Chia từ nếu từ quá dài
            }}
          >
            {spec.type}: {spec.title}
          </Tag>
        </Tooltip>
      ))}

      {specs.length > MAX_VISIBLE && (
        <div
          onClick={() => setShowAll(!showAll)} // Đổi trạng thái hiển thị
          className="p-0 text-blue-500 hover:underline cursor-pointer" // Hiển thị link khi hover
        >
          {showAll ? "Ẩn bớt" : "Xem thêm"}
        </div>
      )}
    </div>
  );
};

// Column definitions
export const productColumns = ({
  handleEditProduct,
  handleDeleteClick,
  handleFeaturedStatusChange, // Add this for handling switch change
}: {
  handleEditProduct: (product: ProductColumns) => void;
  handleDeleteClick: (product: ProductColumns) => void;
  handleFeaturedStatusChange: (productId: string, status: boolean) => void; // Function to update featured status
}) => [
  {
    title: "Sản phẩm",
    dataIndex: "name",
    key: "name",
    width: 700,
    render: (name: string, record: ProductColumns) => (
      <div className="flex space-x-4 items-center">
        <div className="w-40 h-40 flex-shrink-0 relative">
          <ProductImageGallery images={record.images} />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <Tooltip title={name}>
              <p
                className="font-semibold text-lg overflow-hidden whitespace-break-spaces
                              line-clamp-2"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {name}
              </p>
            </Tooltip>
            <div className="text-sm text-gray-500">
              {record.brand} - {record.category} {record?.subCategory}
            </div>
            <div className="flex items-center mt-1">
              <Rate
                disabled
                defaultValue={record.averageRating}
                className="text-sm"
              />
              <span className="ml-2 text-sm text-gray-500">
                ({record.reviews?.length || 0} đánh giá)
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Switch
              checked={record.isFeatured}
              onChange={(checked) =>
                handleFeaturedStatusChange(record._id, checked)
              }
              checkedChildren="Bật"
              unCheckedChildren="Tắt"
            />
            {record.isFeatured && (
              <Tag color="gold" className="ml-2">
                <StarFilled className="mr-1" />
                Sản phẩm nổi bật
              </Tag>
            )}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Thông số",
    dataIndex: "specifications",
    key: "specifications",
    width: 500,
    render: (specs: Specification[]) => (
      <div
        className="flex"
        style={{
          minWidth: 300,
        }}
      >
        <SpecificationsList specs={specs} />
      </div>
    ),
  },
  {
    title: "Màu sắc",
    dataIndex: "colors",
    key: "colors",
    render: (colors: Color[]) => (
      <div className="flex">
        {colors.map((color) => (
          <ColorPreview key={color._id} color={color} />
        ))}
      </div>
    ),
  },
  {
    title: "Giá bán",
    key: "price",
    width: 300,
    render: (record: ProductColumns) => (
      <div className="space-y-2">
        <PriceDisplay
          price={record.price}
          startingPrice={record.starting_price}
          // salePercentage={record.sale_percentage}
        />
        {record.gift_value && (
          <Tooltip title="Giá trị quà tặng kèm">
            <Tag color="green" className="flex items-center w-fit">
              <GiftOutlined className="mr-1" />
              {record.gift_value}
            </Tag>
          </Tooltip>
        )}
      </div>
    ),
  },
  {
    title: "Kho hàng",
    dataIndex: "stock",
    key: "stock",
    width: 120,
    render: (stock: number) => {
      let color = "success";
      if (stock <= 10) color = "error";
      else if (stock <= 50) color = "warning";

      return (
        <Badge
          status={color as "success" | "error" | "warning"}
          text={<span className="font-medium">{stock} sản phẩm</span>}
        />
      );
    },
  },
  {
    title: "Trạng thái",
    key: "status",
    width: 120,
    render: (record: ProductColumns) => {
      const inStock = record.stock > 0;
      return (
        <Tag
          color={inStock ? "green" : "volcano"}
          className="flex items-center w-fit px-3 py-1"
        >
          {inStock ? (
            <ShoppingCartOutlined className="mr-1" />
          ) : (
            <TagOutlined className="mr-1" />
          )}
          <span>{inStock ? "Còn hàng" : "Hết hàng"}</span>
        </Tag>
      );
    },
  },
  {
    title: "Hành động",
    key: "actions",
    width: 120,
    render: (record: ProductColumns) => (
      <Space size="middle">
        <Tooltip title="Chỉnh sửa">
          <Tag
            color="blue"
            className="flex items-center p-2 cursor-pointer hover:opacity-80"
            onClick={() => handleEditProduct(record)} // Trigger edit modal
          >
            <EditTwoTone twoToneColor="#0f00ff" className="text-xl" />
          </Tag>
        </Tooltip>
        <Tooltip title="Xóa">
          <Tag
            color="red"
            className="flex items-center p-2 cursor-pointer hover:opacity-80"
            onClick={() => handleDeleteClick(record)}
          >
            <DeleteTwoTone twoToneColor="#ff0000" className="text-xl" />
          </Tag>
        </Tooltip>
      </Space>
    ),
  },
];
