import { ColumnsType } from "antd/es/table";
import { Order } from "../interfaces/Order";
import {
  Tag,
  Space,
  Tooltip,
  Button,
  Select,
  message,
  Image,
  Modal,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import ProductImageGallery from "../components/ProductImageGallery";
import * as OrderService from "../apis/OrderService";
import { useState } from "react";
import { useAppContext } from "../provider/StoreProvider";
const { Option } = Select;

// Define status configurations
const statusConfig = {
  pending: { color: "orange", label: "Waiting for confirmation" },
  confirmed: { color: "blue", label: "Confirmed" },
  processing: { color: "cyan", label: "Processing" },
  shipping: { color: "purple", label: "Shipping" },
  delivered: { color: "green", label: "Delivered" },
  cancelled: { color: "red", label: "Cancelled" },
  refunded: { color: "grey", label: "Refunded" },
};
const OrderItemDisplay = ({ items }: { items: any[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedItems = isExpanded ? items : items.slice(0, 1);
  const hasMoreItems = items.length > 1;

  return (
    <div>
      {displayedItems.map((item: any) => (
        <div
          key={item._id}
          className="flex flex-row justify-center items-center mb-4"
        >
          <div
            style={{
              width: "200px",
              height: "200px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProductImageGallery images={item.images} />
          </div>

          <div className="ml-2 w-64">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-l font-semibold">Đơn giá: {item.price}</p>
            <p className="text-l font-semibold">Số lượng: {item.quantity}</p>
          </div>
        </div>
      ))}

      {hasMoreItems && (
        <Button
          type="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center"
        >
          {isExpanded ? (
            <>
              <UpOutlined className="mr-1" />
              Thu gọn
            </>
          ) : (
            <>
              <DownOutlined className="mr-1" />
              Xem thêm {items.length - 1} sản phẩm
            </>
          )}
        </Button>
      )}
    </div>
  );
};
const PaymentMethodCell: React.FC<{ record: Order }> = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { state } = useAppContext();

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const isInteractivePayment =
    !state.user?.isAdmin &&
    ["banking", "momo", "zalo pay"].includes(
      record.paymentMethod.toLowerCase()
    );

  console.log(isInteractivePayment, "isInteractivePayment");
  return (
    <div className="w-full flex flex-col">
      <Tooltip title={record.paymentMethod}>
        <Tag color="blue">{record.paymentMethod.toUpperCase()}</Tag>
      </Tooltip>

      <Tooltip title={isInteractivePayment && "Click to pay"} className="mt-2">
        {isInteractivePayment ? (
          <Tag
            color={record.paymentStatus === "pending" ? "orange" : "green"}
            onClick={handleModalOpen}
            style={{ cursor: "pointer" }}
          >
            {record.paymentStatus.toUpperCase()}
          </Tag>
        ) : (
          <Tag color={record.paymentStatus === "pending" ? "orange" : "green"}>
            {record.paymentStatus.toUpperCase()}
          </Tag>
        )}
      </Tooltip>

      <Modal
        title="Payment Details"
        open={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
      >
        <p>
          <strong>Payment Method:</strong> {record.paymentMethod}
        </p>
        {/* <p>
          <strong>Account Name:</strong>{" "}
          {record.paymentDetails?.accountName || "N/A"}
        </p>
        <p>
          <strong>Account Number:</strong>{" "}
          {record.paymentDetails?.accountNumber || "N/A"}
        </p>
        <p>
          <strong>Bank Name:</strong> {record.paymentDetails?.bankName || "N/A"}
        </p>
        <p>
          <strong>Note:</strong> {record.paymentDetails?.note || "N/A"}
        </p> */}
      </Modal>
    </div>
  );
};

// Function to update order status
const updateOrderStatus = async (
  orderId: string,
  newStatus: string,
  access_token: string
) => {
  try {
    // Replace this with your actual API call
    const res = await OrderService.updateStatusOrder(
      orderId,
      { status: newStatus },
      access_token
    );
    console.log(res, "res update status");
    if (res?.status === "OK") {
      message.success("Order status updated successfully");
    } else {
      message.error("Failed to update order status");
      console.error("Error updating order status:", res?.message);
    }
  } catch (error) {
    message.error("Failed to update order status");
    console.error("Error updating order status:", error);
  }
};

const StatusSelect = ({
  status,
  orderId,
}: {
  status: string;
  orderId: string;
}) => {
  const { state } = useAppContext();
  const handleStatusChange = (newStatus: string) => {
    updateOrderStatus(orderId, newStatus, state.user?.access_token || "");
  };

  return (
    <Select
      defaultValue={status}
      style={{ width: 200 }}
      onChange={handleStatusChange}
    >
      {Object.entries(statusConfig).map(([key, { color, label }]) => (
        <Option key={key} value={key}>
          <Tag color={color}>{key.toUpperCase()}</Tag>
        </Option>
      ))}
    </Select>
  );
};

const orderColumns: ColumnsType<Order> = [
  {
    title: "Products Information",
    key: "items",
    dataIndex: "items",
    width: 300, // Cập nhật độ rộng
    render: (items: any, record: Order) => <OrderItemDisplay items={items} />,
  },
  {
    title: "Delivery Information",
    key: "shippingAddress",
    dataIndex: "shippingAddress",

    render: (shippingAddress: any, record: Order) => {
      console.log("shippingAddress", shippingAddress);
      return (
        <div
          key={shippingAddress._id}
          className="flex flex-row justify-center items-center"
        >
          <div className="ml-2 w-64">
            <h3 className="text-xl font-semibold">
              {shippingAddress.fullName}
            </h3>

            <p className="text-l font-semibold">
              Phone: {shippingAddress.phone}
            </p>
            <p className="text-l font-semibold">
              Address: {shippingAddress.detailAddress}, {shippingAddress.city},{" "}
              {shippingAddress.country}
            </p>

            {record.notes && (
              <p className="text-l font-semibold">Notes: {record.notes}</p>
            )}
          </div>
        </div>
      );
    },
  },

  {
    title: "User Information",
    key: "userId",
    dataIndex: "userId",
    render: (user: any, record: Order) => {
      return (
        <div
          key={user._id}
          className="flex flex-row justify-center items-center"
        >
          <div className="ml-2 w-64">
            <Image src={user.avatar} alt={user.name} width={50} height={50} />
            <div>
              <p className="text-l font-semibold">Id: {user._id}</p>
              <p className="text-l font-semibold">Name: {user.name}</p>
              <p className="text-l font-semibold">Email: {user.email}</p>
              <p className="text-l font-semibold">Phone: {user.phone}</p>
            </div>
          </div>
        </div>
      );
    },
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 50,
    render: (status: string, record: Order) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { state } = useAppContext(); // Truy cập state từ context
      const TAG = Object.entries(statusConfig).map(
        ([key, { color, label }]) => {
          return key === status && <Tag color={color}>{key.toUpperCase()}</Tag>;
        }
      );
      return state.user?.isAdmin ? (
        <StatusSelect status={status} orderId={record._id} />
      ) : (
        TAG
      );
    },
  },
  {
    title: "Payment Method",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
    render: (paymentMethod: string, record: Order) => (
      <PaymentMethodCell record={record} />
    ),
  },

  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (total: number) => `$${total.toFixed(2)}`,
  },
];

// Action handler for deleting an order
const handleDelete = (orderId: string) => {
  // Logic for deleting the order goes here
  console.log("Delete order:", orderId);
};

export default orderColumns;
