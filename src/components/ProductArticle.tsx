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

interface customProps {
  data: Product;
}

const ProductArticle: React.FC<customProps> = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  const [showModal_01, setShowModal_01] = useState<boolean>(false);
  const [showModal_02, setShowModal_02] = useState<boolean>(false);
  const [showModal_03, setShowModal_03] = useState<boolean>(false);
  const [showModal_04, setShowModal_04] = useState<boolean>(false);

  return (
    <div>
      <section className="bg-white rounded-xl mb-5 p-5">
        <h2 className="text-xl font-bold">Ảnh sản phẩm</h2>
        <div className="flex">
          <Swiper
            freeMode={true}
            slidesPerView={6}
            watchSlidesProgress
            touchRatio={0.2}
            slideToClickedSlide={true}
            onSwiper={setThumbsSwiper}
            modules={[Navigation, Thumbs, Controller]}
            direction={"vertical"}
            className="cursor-pointer w-1/6 rounded"
          >
            {data.images.map((item, index) => (
              <SwiperSlide className="">
                <img src={item} alt="" className="w-max" />
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
              <SwiperSlide className="">
                <img src={item} alt="" className="w-max" />
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
        <h2 className="text-xl mb-4 font-bold">Đánh giá từ chuyên gia</h2>
        <div className="grid grid-cols-3 gap-5">
          {/* {data.specList[3].detail.rating?.expert.map((item, index) => (
            <div>
              <div className="flex content-between">
                <p className="flex-1">{item.title}</p>
                <p className="flex-1">{item.score}/10</p>
              </div>
              <div className="w-full my-2 bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-200">
                <div
                  className={`${
                    item.score >= 7 ? "bg-[#3BB346]" : "bg-[#FC8800]"
                  } h-1.5 rounded-full`}
                  style={{ width: `${(item.score / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))} */}
        </div>
      </section>
      <section className="my-5 p-5 bg-white rounded-xl">
        <div>
          <div className="flex flex-row justify-between">
            <h2 className="text-xl mb-4 font-bold">Cấu hình đặc điểm</h2>
            <div>
              <button
                type="button"
                onClick={() => {
                  setShowModal_01(!showModal_01);
                }}
              >
                <span className="text-blue-600">Xem cấu hình chi tiết</span>
                <FaAngleRight className="inline-block ml-2 pb-1 text-lg" />
              </button>
            </div>
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
          <table className="w-full">
            <tbody>
              {/* {data.specList[3].detail?.summarySpec?.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-200" : ""}`}
                >
                  <th className="text-left py-3 pl-3">{item.title}</th>
                  <td className="">{item.description}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
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
        <hr className="my-4 border-b-1 border-gray-300" />
        <div>
          <h2 className="text-xl mb-4 font-bold">Video review</h2>
        </div>
        <hr className="my-4 border-b-1 border-gray-300" />
        <div>
          <h2 className="text-xl mb-4 font-bold">Bài viết mô tả</h2>
          <article>in progress...</article>
        </div>
      </section>
    </div>
  );
};

export default ProductArticle;
