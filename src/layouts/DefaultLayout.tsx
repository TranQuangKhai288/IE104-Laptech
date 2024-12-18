import Header from "./components/Header";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { useAppContext } from "../provider/StoreProvider";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false); // Hiển thị modal
  const [countdown, setCountdown] = useState(5); // Đếm ngược 5 giây

  useEffect(() => {
    if (!state?.user?.isAdmin) {
      setModalVisible(true);

      // Bắt đầu đếm ngược
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval); // Dừng đếm ngược khi về 0
            navigate("/"); // Chuyển về trang chủ
          }
          return prev - 1;
        });
      }, 1000);

      // Dọn dẹp interval khi component bị unmount
      return () => clearInterval(interval);
    }
  }, [state?.user?.isAdmin, navigate]);

  // Không render Sidebar nếu không phải Admin
  if (!state?.user?.isAdmin) {
    return (
      <Modal
        title="Thông Báo"
        open={modalVisible}
        closable={false} // Không cho đóng modal
        footer={[
          <Button key="home" type="primary" onClick={() => navigate("/")}>
            Trở về trang chủ ngay
          </Button>,
        ]}
      >
        <p>
          Bạn không phải Admin. Bạn sẽ được chuyển về trang chủ trong{" "}
          <strong>{countdown}s</strong>.
        </p>
      </Modal>
    );
  }

  return (
    <div className="flex flex-row min-h-screen ">
      <div className="sticky top-0 left-0 h-screen z-[999]">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full bg-[#f6f9fc]">
        {/* Header */}
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        {/* Main Content Area */}

        <main className="flex-grow sm:px-8 md:mx-2 my-2 bg-[#f6f9fc] py-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
