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

import * as OrderService from "../apis/OrderService";
import useDebounce from "../customeHooks/useDebounce";
import orderColumns from "../columnConfig/orderColumns";
import { Order } from "../interfaces/Order";
const { Title } = Typography;

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState([] as Order[]);
  //pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    totalPages: 0,
    count: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchOrders = async (page = 1, pageSize = 5, search = "") => {
    try {
      const res = await OrderService.getOrders(
        page,
        pageSize,
        "",
        "",
        "",
        search,
        ""
      );
      console.log("res", res);
      setOrders(res.data.orders);
      setPagination({
        current: page,
        pageSize: pageSize,
        totalPages: res.totalPages, // Assuming the response includes the total count of products
        count: res.count,
      });
    } catch (error) {
      console.log("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchOrders(1, pagination.pageSize, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <Title level={2}>QUẢN LÝ ĐƠN HÀNG</Title>
      </div>
      {/* Data Table */}
      <div className="overflow-auto rounded-md shadow-md p-2">
        <Table
          dataSource={orders}
          columns={orderColumns}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.count,
            onChange: (page, pageSize) => {
              fetchOrders(page, pageSize, debouncedSearchTerm);
            },
          }}
          scroll={{ x: 1200 }} // Đặt giá trị lớn hơn tổng độ rộng của cột
          rowKey="id"
          className="text-white"
        />
      </div>
    </div>
  );
};

export default OrderManagement;
