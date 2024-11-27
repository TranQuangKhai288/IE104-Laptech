import React from "react";
import { Tag, Space, Rate, Tooltip, Badge } from "antd";
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
  salePercentage: number;
}> = ({ price, startingPrice, salePercentage }) => (
  <div className="flex flex-col">
    <span className="text-lg font-semibold text-blue-600">
      {Number(startingPrice).toLocaleString("vi-VN")} VND
    </span>
    {salePercentage > 0 && (
      <div className="flex items-center gap-2">
        <span className="text-sm line-through text-gray-500">
          {Number(price).toLocaleString("vi-VN")} VND
        </span>
        <Tag color="red">-{salePercentage}%</Tag>
      </div>
    )}
  </div>
);

const SpecificationsList: React.FC<{ specs: Specification[] }> = ({
  specs,
}) => (
  <div className="space-y-1">
    {specs.map((spec) => (
      <Tooltip key={spec._id} title={spec.description}>
        <Tag color="blue" className="mb-1">
          {spec.type}: {spec.title}
        </Tag>
      </Tooltip>
    ))}
  </div>
);

// Column definitions
export const productColumns = ({
  handleEditProduct,
  handleDeleteClick,
}: {
  handleEditProduct: (product: ProductColumns) => void;
  handleDeleteClick: (product: ProductColumns) => void;
}) => [
  {
    title: "Sản phẩm",
    dataIndex: "name",
    key: "name",
    width: 250,
    render: (name: string, record: ProductColumns) => (
      <div className="flex space-x-4 items-center">
        <div className="w-48">
          <ProductImageGallery images={record.images} />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <Tooltip title={name}>
              <div
                className="font-semibold text-lg overflow-hidden overflow-ellipsis whitespace-nowrap 
                              line-clamp-2"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 2,
                }}
              >
                {name}
              </div>
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
                ({record.reviews.length} đánh giá)
              </span>
            </div>
          </div>
          {record.isFeatured && (
            <Tag color="gold" className="w-fit">
              <StarFilled className="mr-1" />
              Sản phẩm nổi bật
            </Tag>
          )}
        </div>
      </div>
    ),
  },
  {
    title: "Thông số",
    dataIndex: "specifications",
    key: "specifications",
    width: 250,
    render: (specs: Specification[]) => <SpecificationsList specs={specs} />,
  },
  {
    title: "Màu sắc",
    dataIndex: "colors",
    key: "colors",
    width: 150,
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
    width: 150,
    render: (record: ProductColumns) => (
      <div className="space-y-2">
        <PriceDisplay
          price={record.price}
          startingPrice={record.starting_price}
          salePercentage={record.sale_percentage}
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
