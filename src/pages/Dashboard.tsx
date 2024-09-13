import React from "react";
import { Button, Typography, Card, Progress, Table, Space } from "antd";
import {
  DownloadOutlined,
  MailOutlined,
  ShopOutlined,
  UserAddOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

// Mock data (same as your existing data)
const mockTransactions = [
  { txId: "TX123", user: "John Doe", date: "2024-09-10", cost: 240 },
  { txId: "TX124", user: "Jane Smith", date: "2024-09-11", cost: 180 },
  // Add more transactions as needed...
];

const Dashboard: React.FC = () => {
  const columns = [
    { title: "Transaction ID", dataIndex: "txId", key: "txId" },
    { title: "User", dataIndex: "user", key: "user" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      render: (cost: number) => `$${cost}`,
    },
  ];

  return (
    <div className="m-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2}>DASHBOARD</Title>
          <p className="text-gray-500">Welcome to your dashboard</p>
        </div>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size="large"
          className="bg-blue-600"
        >
          Download Reports
        </Button>
      </div>

      {/* Grid & Charts */}
      <div className="grid grid-cols-12 gap-5">
        {/* Row 1 */}
        <Card className="col-span-3 flex items-center justify-center bg-gray-800 text-white">
          <Space direction="vertical" className="text-center">
            <MailOutlined style={{ fontSize: 26, color: "#52c41a" }} />
            <Title level={5} className="text-white">
              12,361 Emails Sent
            </Title>
            <Progress percent={75} />
            <p>+14%</p>
          </Space>
        </Card>

        <Card className="col-span-3 flex items-center justify-center bg-gray-800 text-white">
          <Space direction="vertical" className="text-center">
            <ShopOutlined style={{ fontSize: 26, color: "#52c41a" }} />
            <Title level={5} className="text-white">
              431,225 Sales Obtained
            </Title>
            <Progress percent={50} />
            <p>+21%</p>
          </Space>
        </Card>

        <Card className="col-span-3 flex items-center justify-center bg-gray-800 text-white">
          <Space direction="vertical" className="text-center">
            <UserAddOutlined style={{ fontSize: 26, color: "#52c41a" }} />
            <Title level={5} className="text-white">
              32,441 New Clients
            </Title>
            <Progress percent={30} />
            <p>+5%</p>
          </Space>
        </Card>

        <Card className="col-span-3 flex items-center justify-center bg-gray-800 text-white">
          <Space direction="vertical" className="text-center">
            <AreaChartOutlined style={{ fontSize: 26, color: "#52c41a" }} />
            <Title level={5} className="text-white">
              1,325,134 Traffic Received
            </Title>
            <Progress percent={80} />
            <p>+43%</p>
          </Space>
        </Card>

        {/* Row 2 - Revenue Generated Chart */}
        <Card className="col-span-8 bg-gray-800 text-white p-5">
          <div className="flex justify-between items-center mb-5">
            <div>
              <Title level={4} className="text-white">
                Revenue Generated
              </Title>
              <Title level={2} className="text-green-500">
                $59,342.32
              </Title>
            </div>
            <Button icon={<DownloadOutlined />} size="large" />
          </div>
          {/* Replace with actual chart component */}
          <div className="h-64 bg-gray-700">Line Chart Component</div>
        </Card>

        {/* Recent Transactions */}
        <Card className="col-span-4 bg-gray-800 text-white p-5 overflow-auto">
          <Title level={4} className="text-white mb-4">
            Recent Transactions
          </Title>
          <Table
            columns={columns}
            dataSource={mockTransactions}
            pagination={false}
          />
        </Card>

        {/* Row 3 */}
        <Card className="col-span-4 bg-gray-800 text-white p-5">
          <Title level={4}>Campaign</Title>
          <div className="flex flex-col items-center mt-5">
            {/* Replace with actual ProgressCircle component */}
            <div className="h-32 w-32 rounded-full bg-green-500"></div>
            <Title level={5} className="text-green-500 mt-4">
              $48,352 revenue generated
            </Title>
            <p>Includes extra misc expenditures and costs</p>
          </div>
        </Card>

        <Card className="col-span-4 bg-gray-800 text-white p-5">
          <Title level={4}>Sales Quantity</Title>
          {/* Replace with actual BarChart component */}
          <div className="h-64 bg-gray-700 mt-5">Bar Chart Component</div>
        </Card>

        <Card className="col-span-4 bg-gray-800 text-white p-5">
          <Title level={4}>Geography Based Traffic</Title>
          {/* Replace with actual GeographyChart component */}
          <div className="h-48 bg-gray-700 mt-5">Geography Chart Component</div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
