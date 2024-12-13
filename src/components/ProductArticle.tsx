import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Controller } from "swiper/modules";
import SwiperCore from "swiper";
import Marquee from "react-fast-marquee";
import {
  FaHandHoldingHeart,
  FaHeadset,
  FaLaughWink,
  FaClock,
  FaAngleRight,
} from "react-icons/fa";
import Modal from "./Modal";
import ProductDetailTable from "./ProdctDetailTable";
import { Product } from "../interfaces/Product";
import ProductReviews from "./ProductReviews";

interface customProps {
  data: Product;
}

const ProductArticle: React.FC<customProps> = ({ data }) => {
  console.log(data, "data product article");
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  const [showModal_01, setShowModal_01] = useState<boolean>(false);
  const [showModal_02, setShowModal_02] = useState<boolean>(false);
  const [showModal_03, setShowModal_03] = useState<boolean>(false);
  const [showModal_04, setShowModal_04] = useState<boolean>(false);

  // Ánh xạ các loại cấu hình từ tiếng Anh sang tiếng Việt
  const typeMap: { [key: string]: string } = {
    CPU: "Loại CPU",
    RAM: "Bộ nhớ",
    Storage: "Dung lượng lưu trữ",
    Display: "Màn hình",
    Battery: "Pin",
    Camera: "Camera",
    OS: "Hệ điều hành",
    GPU: "Card đồ hoạ",
    Connectivity: "Khả năng kết nối",
    Ports: "Cổng kết nối",
    Audio: "Âm thanh",
  };

  const defaultSpecifications = [
    {
      type: "Loại CPU",
      title:
        data?.specifications?.find((spec) => spec.type === "CPU")?.title ||
        "Không có",
      descriptions:
        data?.specifications?.find((spec) => spec.type === "CPU")
          ?.description || "Không có",
    },
    {
      type: "Bộ nhớ",
      title:
        data?.specifications?.find((spec) => spec.type === "RAM")?.title ||
        "Không có",
      descriptions:
        data?.specifications?.find((spec) => spec.type === "CPU")
          ?.description || "Không có",
    },
    {
      type: "Dung lượng lưu trữ",
      title:
        data?.specifications?.find((spec) => spec.type === "Storage")?.title ||
        "Không có",
      descriptions:
        data?.specifications?.find((spec) => spec.type === "CPU")
          ?.description || "Không có",
    },
    {
      type: "Màn hình",
      title:
        data?.specifications?.find((spec) => spec.type === "Display")?.title ||
        "Không có",
      descriptions:
        data?.specifications?.find((spec) => spec.type === "CPU")
          ?.description || "Không có",
    },
    {
      type: "Pin",
      title:
        data?.specifications?.find((spec) => spec.type === "Battery")?.title ||
        "Không có",
      descriptions:
        data?.specifications?.find((spec) => spec.type === "CPU")
          ?.description || "Không có",
    },
    {
      type: "Camera",
      title:
        data?.specifications?.find((spec) => spec.type === "Camera")?.title ||
        "Không có",
      descriptions:
        data?.specifications?.find((spec) => spec.type === "CPU")
          ?.description || "Không có",
    },
    {
      type: "Hệ điều hành",
      title:
        data?.specifications?.find((spec) => spec.type === "OS")?.title ||
        "Không có",
      descriptions:
        data?.specifications?.find((spec) => spec.type === "CPU")
          ?.description || "Không có",
    },
    {
      type: "Card đồ hoạ",
      title:
        data?.specifications?.find((spec) => spec.type === "GPU")?.title ||
        "Không có",
      descriptions:
        data?.specifications?.find((spec) => spec.type === "CPU")
          ?.description || "Không có",
    },
    {
      type: "Khả năng kết nối",
      title:
        data?.specifications?.find((spec) => spec.type === "Connectivity")
          ?.title || "Không có",
      descriptions:
        data?.specifications?.find((spec) => spec.type === "CPU")
          ?.description || "Không có",
    },
    {
      type: "Cổng kết nối",
      title:
        data?.specifications?.find((spec) => spec.type === "Ports")?.title ||
        "Không có",
      descriptions:
        data?.specifications?.find((spec) => spec.type === "CPU")
          ?.description || "Không có",
    },
    {
      type: "Âm thanh",
      title:
        data?.specifications?.find((spec) => spec.type === "Audio")?.title ||
        "Không có",
      descriptions:
        data?.specifications?.find((spec) => spec.type === "CPU")
          ?.description || "Không có",
    },
  ];

  return (
    <div>
      <section className="bg-white rounded-xl mb-5 p-5">
        <h2 className="text-xl font-bold">Ảnh sản phẩm</h2>
        <div className="flex">
          <Swiper
            freeMode={true} // Cho phép lướt tự do
            slidesPerView={3} // Hiển thị 3 ảnh trong một lần
            spaceBetween={10} // Khoảng cách giữa các ảnh
            watchSlidesProgress
            touchRatio={0.2}
            slideToClickedSlide={true}
            onSwiper={setThumbsSwiper}
            modules={[Navigation, Thumbs, Controller]}
            direction={"vertical"} // Lướt theo chiều dọc
            className="cursor-pointer w-1/6 rounded"
          >
            {data.images.map((item, index) => (
              <SwiperSlide className="mb-8 max-h-24" key={index}>
                <img src={item} alt="" className="w-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            spaceBetween={10}
            grabCursor={true}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs, Controller]}
            className="flex-1"
          >
            {data.images.map((item, index) => (
              <SwiperSlide className="" key={index}>
                <img src={item} alt="" className="w-full h-max object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="my-5 p-5 bg-white rounded-xl">
        <h2 className="text-xl mb-4">
          <span className="font-bold mr-4">Laptech</span>
          <span className="text-green-600">
            Là nơi để bạn và người thân tin tưởng lựa chọn ✅
          </span>
        </h2>
        <Marquee className="bg-[#f5fdff] py-2 rounded">
          <div className="mx-3">
            <FaHandHoldingHeart className="inline-block mr-2 h-6 w-6 p-1 rounded-full bg-[#3cd2ff]" />
            <span>Trải nghiệm</span>
          </div>
          <div className="mx-3">
            <FaHeadset className="inline-block mr-2 h-6 w-6 p-1 rounded-full bg-[#3cd2ff] mb-1" />
            <span>Tận tâm tư vấn</span>
          </div>
          <div className="mx-3">
            <FaLaughWink className="inline-block mr-2 h-6 w-6 p-1 rounded-full bg-[#3cd2ff] mb-1" />
            <span>Trung tâm bảo vệ quyền lợi khách hàng</span>
          </div>
          <div className="mx-3">
            <FaClock className="inline-block mr-2 h-6 w-6 p-1 rounded-full bg-[#3cd2ff] mb-1" />
            <span>Phục vụ 24/7</span>
          </div>
        </Marquee>
      </section>

      <section className="my-5 p-5 bg-white rounded-xl">
        <>
          <div className=" bg-white">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Cấu hình đặc điểm</h2>
              <div>
                <button
                  type="button"
                  onClick={() => setShowModal_01(!showModal_01)}
                >
                  <span className="text-blue-600 hover:underline">
                    Xem cấu hình chi tiết
                  </span>
                  <FaAngleRight className="inline-block ml-1 text-blue-600 text-lg" />
                </button>
              </div>
            </div>
            <table className="w-full">
              <tbody>
                {defaultSpecifications.map((spec, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-slate-100" : "bg-white"
                    }`}
                  >
                    <td className="py-2 px-2 text-gray-600 font-medium">
                      {spec.type}
                    </td>
                    <td className="py-2 px-2 text-gray-900 text-right">
                      {spec.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <Modal
              title="Cấu hình chi tiết"
              isOpen={showModal_01}
              onClose={() => {
                setShowModal_01(!showModal_01);
              }}
            >
              <ProductDetailTable data={data} />
            </Modal>
          </div>
        </>
        <hr className="my-4 border-b-1 border-gray-300" />
        <div>
          <div className="flex flex-row justify-between">
            <h2 className="text-xl mb-4 font-bold">Sẵn hàng & Trưng bày</h2>
            <div>
              <button
                type="button"
                onClick={() => {
                  setShowModal_02(!showModal_02);
                }}
              >
                <span className="text-blue-600">3 chi nhánh</span>
                <FaAngleRight className="inline-block ml-2 pb-1 text-lg" />
              </button>
            </div>
          </div>
          <div>
            <Modal
              title="Sẵn hàng và trưng bày"
              isOpen={showModal_02}
              onClose={() => {
                setShowModal_02(!showModal_02);
              }}
            >
              <div>in progress...</div>
            </Modal>
          </div>
        </div>
        <hr className="my-4 border-b-1 border-gray-300" />
        <div>
          <div className="flex flex-row justify-between">
            <h2 className="text-xl mb-4 font-bold">Vận chuyển</h2>
            <div>
              <button
                type="button"
                onClick={() => {
                  setShowModal_03(!showModal_03);
                }}
              >
                <span className="text-blue-600">Chọn địa chỉ giao hàng</span>
                <FaAngleRight className="inline-block ml-2 pb-1 text-lg" />
              </button>
            </div>
          </div>
          <p className="text-green-400 text-base">Miễn phí HN, TP HCM</p>
          <div>
            <Modal
              title="Chọn Tỉnh / Thành phố"
              isOpen={showModal_03}
              onClose={() => {
                setShowModal_03(!showModal_03);
              }}
            >
              <div>in progress...</div>
            </Modal>
          </div>
        </div>
        <hr className="my-4 border-b-1 border-gray-300" />
        <div>
          <div className="flex flex-row justify-between">
            <h2 className="text-xl mb-4 font-bold">Bảo hành & Đổi trả</h2>
            <div>
              <button
                type="button"
                onClick={() => {
                  setShowModal_04(!showModal_04);
                }}
              >
                {/* <span className="text-blue-600">
                  <span>{data.specList[3].detail?.warranty?.duration}</span>{" "}
                  <span>{data.specList[3].detail?.warranty?.unit}</span>
                </span> */}
                <FaAngleRight className="inline-block ml-2 pb-1 text-lg" />
              </button>
            </div>
          </div>
          <div>
            <Modal
              title="Bảo hành"
              isOpen={showModal_04}
              onClose={() => {
                setShowModal_04(!showModal_04);
              }}
            >
              <div>in progress...</div>
            </Modal>
          </div>
          <div>
            <ul className="list-disc list-inside">
              <li role="list">
                Bảo hành{" "}
                <b>
                  {/* <span>{data.specList[3].detail?.warranty?.duration}</span>{" "}
                  <span>{data.specList[3].detail?.warranty?.unit}</span>{" "}
                  <span>tại chuỗi cửa hàng</span> */}
                </b>
              </li>
              <li>Đổi mới trong 15 ngày đầu tiên</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="my-5 p-5 bg-white rounded-xl">
        <h2 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h2>
        <ProductReviews data={data} />
      </section>
    </div>
  );
};

export default ProductArticle;
