import React, { useState } from "react";
import {
  Button,
  Typography,
  Card,
  Progress,
  Table,
  Space,
  Tooltip,
} from "antd";
import {
  DownloadOutlined,
  MailOutlined,
  ShopOutlined,
  UserAddOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import RevenueCard from "../components/RevenueCard";

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

  // Revenue type (daily or monthly)
  const [typeRevenue, setTypeRevenue] = useState("daily");

  const dataRevenue = {
    current: {
      _id: null,
      totalRevenue: 750,
      ordersCount: 1,
      averageOrderValue: 750,
    },
    previous: {
      totalRevenue: 0,
      ordersCount: 0,
      averageOrderValue: 0,
    },
    revenueDifference: {
      totalRevenue: 750,
      ordersCount: 1,
      averageOrderValue: 750,
    },
  };

  const dataClients = {
    newCustomers: 2,
  };

  const topBuyingCustomer = [
    {
      totalSpent: 4298,
      customerId: "671cd31ad8d7ea0f3dc39b14",
      name: "test",
      email: "test@gmail.com",
      avatar: "https://cdn-icons-png.freepik.com/512/8742/8742495.png",
    },
  ];

  const topProductsSelling = [
    {
      _id: "673841fb2a6d81c10a46fb20",
      name: "HP Khai",
      totalQuantity: 2,
      totalRevenue: 2798,
      productDetails: {
        name: "HP Khai",
        category: "pc",
        brand: "HP",
        price: 1399,
        images: [
          "https://imagor.owtg.one/unsafe/fit-in/1000x1000/filters:quality(100)/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2022/9/30/lenovo-thinkpad-x1-carbon-gen8-thinkpro-02.jpg",
          "https://imagor.owtg.one/unsafe/filters:quality(100)/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2024/9/19/lenovo-ideapad-slim-5-light-14abr8-82xs0006vn-undefined.jpg",
        ],
      },
    },
    {
      _id: "6729e56fab941e7dc964cf1d",
      name: "Samsung Galaxy Tab S8",
      totalQuantity: 2,
      totalRevenue: 1500,
      productDetails: {
        name: "Samsung Galaxy Tab S8",
        category: "tablet",
        brand: "Samsung",
        price: 750,
        images: [
          "https://imagor.owtg.one/unsafe/filters:quality(100)/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2022/6/7/macbook-air-starlight-gallery1-20220606.jpeg",
          "https://imagor.owtg.one/unsafe/filters:quality(100)/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2022/6/7/macbook-air-starlight-gallery1-20220606.jpeg",
        ],
      },
    },
  ];

  const lowStockProducts = [
    {
      _id: "672a511e120642a2123d9919",
      name: "Lap Xịn <3",
      category: "laptop",
      brand: "TQKhai",
      price: 900,
      stock: 1,
      images: [
        "https://firebasestorage.googleapis.com/v0/b/cupidecho-030828.appspot.com/o/products%2F1730826525289-hrkx54.jpg?alt=media&token=730f74b4-4bff-4f88-9d04-9ce69a2460ef",
        "https://firebasestorage.googleapis.com/v0/b/cupidecho-030828.appspot.com/o/products%2F1730826525290-lnkzxy.jpg?alt=media&token=e253d9b9-af34-46b4-887f-4b9302ff48c1",
      ],
    },
    {
      _id: "672a5187120642a2123d9935",
      name: "Edit Test",
      category: "phone",
      brand: "TQKhai",
      price: 900,
      stock: 1,
      images: [
        "https://firebasestorage.googleapis.com/v0/b/cupidecho-030828.appspot.com/o/products%2F1730826630386-m9hqpz.jpg?alt=media&token=d5fac757-ae6c-452b-9638-8c6cd41f222a",
      ],
    },
    {
      _id: "6729f2b6ab941e7dc964d3f4",
      name: "Asus ROG Zephyrus G14",
      category: "laptop",
      brand: "Asus",
      price: 1699,
      stock: 8,
      images: [
        "https://imagor.owtg.one/unsafe/fit-in/1000x1000/filters:quality(100)/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2022/9/30/lenovo-thinkpad-x1-carbon-gen8-thinkpro-02.jpg",
        "https://imagor.owtg.one/unsafe/filters:quality(100)/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2024/9/19/lenovo-ideapad-slim-5-light-14abr8-82xs0006vn-undefined.jpg",
      ],
    },
  ];
  return (
    <>
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
        <Card className="col-span-2 flex items-center justify-center bg-violet-300 text-white">
          <Space direction="vertical" className="text-center">
            <Tooltip
              title={`Click for show ${
                typeRevenue === "daily" ? "monthly" : "daily"
              }`}
            >
              <div
                onClick={() => {
                  if (typeRevenue === "daily") setTypeRevenue("monthly");
                  else setTypeRevenue("daily");
                }}
              >
                <RevenueCard
                  data={{
                    current: [{ totalRevenue: 750, ordersCount: 1 }],
                    previous: [],
                  }}
                  type={typeRevenue}
                />
              </div>
            </Tooltip>
          </Space>
        </Card>

        <Card className="col-span-2 flex items-center justify-center bg-violet-300 text-white">
          <Space direction="vertical" className="text-center">
            <ShopOutlined style={{ fontSize: 26, color: "#52c41a" }} />
            <Title level={5} className="text-white">
              {dataRevenue.current.ordersCount} Orders Placed
            </Title>
            <Progress percent={50} />
            <p>+21%</p>
          </Space>
        </Card>

        <Card className="col-span-2 flex items-center justify-center bg-violet-300 text-white">
          <Space direction="vertical" className="text-center">
            <UserAddOutlined style={{ fontSize: 26, color: "#52c41a" }} />
            <Title level={5} className="text-white">
              {dataClients.newCustomers} New Clients
            </Title>
            <Progress percent={30} />
            <p>+5%</p>
          </Space>
        </Card>

        <Card className="col-span-6 bg-violet-300 text-white p-5 ">
          <div className="justify-center items-center">
            <div className="flex justify-center items-center">
              <AreaChartOutlined style={{ fontSize: 26, color: "#52c41a" }} />

              <Title level={3} className="text-white">
                Top Buying Customer
              </Title>
            </div>
            <div className="flex flex-row justify-center items-center flex-wrap border-2 p-2">
              {topBuyingCustomer.map((customer) => (
                <div
                  key={customer.customerId}
                  className="flex flex-col items-center justify-center border-2 rounded-lg border-gray-500 p-2 py-4 w-1/4 max-w-xs 
                    bg-slate-700
                  "
                >
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="max-w-16 w-full rounded-full border-2 border-gray-300 mb-2"
                  />
                  <div className="flex flex-col items-center space-y-2 w-full">
                    <p className="text-center text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-full">
                      Name: {customer.name}
                    </p>
                    <p className="text-center text-sm overflow-hidden text-ellipsis whitespace-nowrap w-full">
                      Email: {customer.email}
                    </p>
                    <p className="text-center text-sm text-green-500 font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-full">
                      Spent: {customer.totalSpent}$
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Row 2 - Revenue Generated Chart */}
        <Card className="col-span-6 bg-violet-300 text-white ">
          <div className="flex justify-between items-center">
            <Title level={4} className="text-white">
              Top Selling Products
            </Title>

            {/* <Button icon={<DownloadOutlined />} size="large" /> */}
          </div>
          <div className="h-72 bg-gray-700 p-2 overflow-y-scroll">
            {topProductsSelling.map((product) => (
              <div
                key={product._id}
                className="flex flex-row items-center justify-between border-2 p-2 rounded-lg border-gray-500 mb-2"
              >
                <div className="flex flex-row items-center">
                  <img
                    src={product.productDetails.images[0]}
                    alt={product.productDetails.name}
                    className="w-16 h-16 object-cover mr-2"
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      {product.productDetails.name}
                    </p>
                    <p className="text-gray-600">
                      {product.productDetails.category}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <p className="text-lg font-semibold">
                    {product.totalQuantity} units
                  </p>
                  <p className="text-lg font-semibold ml-4">
                    {product.totalRevenue}$
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-6 bg-violet-300 text-white">
          <div className="flex justify-between items-center ">
            <Title level={4} className="text-white">
              Low Stock Products
            </Title>

            {/* <Button icon={<DownloadOutlined />} size="large" /> */}
          </div>
          <div className="h-72 bg-gray-700 p-2 overflow-y-scroll">
            {lowStockProducts.map((product) => (
              <div
                key={product._id}
                className="flex flex-row items-center justify-between border-2 p-2 rounded-lg border-gray-500 mb-2"
              >
                <div className="flex flex-row items-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover mr-2"
                  />
                  <div>
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-gray-600">{product.category}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <p className="text-lg font-semibold">{product.stock} units</p>
                  <p className="text-lg font-semibold ml-4">{product.price}$</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Row 3 */}
        <Card className="col-span-4 bg-violet-300 text-white p-5">
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

        <Card className="col-span-4 bg-violet-300 text-white p-5">
          <Title level={4}>Sales Quantity</Title>
          {/* Replace with actual BarChart component */}
          <div className="h-64 bg-gray-700 mt-5">Bar Chart Component</div>
        </Card>

        <Card className="col-span-4 bg-violet-300 text-white p-5">
          <Title level={4}>Geography Based Traffic</Title>
          {/* Replace with actual GeographyChart component */}
          <div className="h-48 bg-gray-700 mt-5">Geography Chart Component</div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
