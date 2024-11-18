import React, { useState } from "react";
import { Card, Progress } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

interface RevenueData {
  current: { totalRevenue: number; ordersCount: number }[];
  previous: { totalRevenue: number }[];
}

const RevenueCard = ({
  data,
  type = "daily",
}: {
  data: RevenueData;
  type?: string;
}) => {
  // Calculate total revenue and percentage change
  const currentRevenue = data.current[0]?.totalRevenue || 0;
  const previousRevenue = data.previous[0]?.totalRevenue || 0;
  const ordersCount = data.current[0]?.ordersCount || 0;

  // Calculate percentage change
  const percentageChange = previousRevenue
    ? parseFloat(
        (((currentRevenue - previousRevenue) / previousRevenue) * 100).toFixed(
          1
        )
      )
    : 0;

  // Determine title based on type
  const cardTitle = type === "daily" ? "Daily Revenue" : "Monthly Revenue";

  return (
    <Card className="col-span-3 flex items-center justify-center bg-violet-300 text-white">
      <div className="text-center">
        <DollarOutlined style={{ fontSize: 26, color: "#52c41a" }} />
        <Title level={5} className="text-white">
          {cardTitle}: ${currentRevenue.toLocaleString()}
        </Title>
        <Progress
          percent={Math.min(100, Math.abs(percentageChange))}
          status={percentageChange >= 0 ? "success" : "exception"}
        />
        <p
          className={percentageChange >= 0 ? "text-green-500" : "text-red-500"}
        >
          {percentageChange >= 0 ? "+" : ""}
          {percentageChange}%
        </p>
        <p className="text-white">Orders: {ordersCount}</p>
      </div>
    </Card>
  );
};

export default RevenueCard;
