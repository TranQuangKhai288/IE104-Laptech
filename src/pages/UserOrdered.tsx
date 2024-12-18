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
import { useAppContext } from "../provider/StoreProvider";

const { Title } = Typography;

const UserOrdered: React.FC = () => {
  const [orders, setOrders] = useState([] as Order[]);
  const [loading, setLoading] = useState(false);
  const { state } = useAppContext();
  //pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    totalPages: 0,
    count: 0,
  });
  console.log(orders, "orders");

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchOrders = async (page = 1, pageSize = 5, search = "") => {
    try {
      if (!state.user?.access_token) return;
      setLoading(true);
      const res = await OrderService.getMyOrders(
        page,
        pageSize,
        state.user?.access_token || ""
      );
      setLoading(false);
      console.log("res", res);
      if (!res) {
        console.log("Failed to fetch orders");
        return;
      }
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
  }, [debouncedSearchTerm, state.user?.access_token]);

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <Title level={2}>ĐƠN HÀNG ĐÃ ĐẶT</Title>
      </div>
      {/* Data Table */}

      <Table
        dataSource={orders}
        columns={orderColumns}
        loading={loading}
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
  );
};

export default UserOrdered;
