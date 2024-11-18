import React from "react";
import {
  FaCopy,
  FaStar,
  FaInfoCircle,
  FaGift,
  FaAngleRight,
  FaCheckCircle,
} from "react-icons/fa";
import { Product } from "../interfaces/Product";

interface customProps {
  data: Product;
}

const ProductOverview: React.FC<customProps> = ({ data }) => {
  return (
    <div className="sticky top-24">
      <section>
        <h1 className="rounded-xl bg-[#f93966] text-white text-base font-bold h-30 p-5 text-center">
          {data.name}
        </h1>
      </section>
      <section className="bg-white rounded-xl p-5 my-5">
        <h2 className="font-bold text-xl mt-4">
          <span>{data.brand} </span>
          <span>{data.name}</span>
        </h2>
        <p className="mt-4">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar className="text-yellow-400 text-xl inline-block mr-1 pb-1" />
          ))}
          <a
            href="/product/product-detail-example"
            className="text-blue-600 ml-2"
          >
            3 đánh giá
          </a>
        </p>
        <hr className="my-4 border-b-1 border-gray-300" />
        <div>
          <h3 className="font-semibold text-gray-500 mb-4">Phiên bản</h3>
          <div className="flex flex-col space-y-2">
            {data.specifications.map((item, index) => (
              <div className="flex-1">
                <p
                  key={index}
                  className={`text-xs rounded-lg border ${
                    index === 3
                      ? "border-[#355eee] bg-[#ecf3ff] text-[#355eee]"
                      : "border-[#e6e8ea]"
                  } py-2 px-4 inline-block font-semibold cursor-pointer`}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <h3 className="font-semibold text-gray-500 my-4">Màu</h3>
          <div className="flex flex-wrap gap-2">
            {data.colors?.map((item, index) => (
              <div className="w-auto h-auto">
                <p
                  key={index}
                  className={`text-xs rounded-lg border ${
                    index === 0
                      ? "border-[#355eee] bg-[#ecf3ff] text-[#355eee]"
                      : "border-[#e6e8ea]"
                  } py-2 px-4 inline-block font-semibold cursor-pointer`}
                >
                  {item.hex}
                </p>
              </div>
            ))}
          </div>
          <h3 className="font-semibold text-gray-500 my-4">Loại hàng</h3>
          <div className="flex flex-wrap gap-2">
            {/* {data.specList[3].detail.type?.map((item, index) => (
              <div className="w-auto h-auto">
                <p
                  key={index}
                  className={`text-xs rounded-lg border ${
                    index === 0
                      ? "border-[#355eee] bg-[#ecf3ff] text-[#355eee]"
                      : "border-[#e6e8ea]"
                  } py-2 px-4 inline-block font-semibold cursor-pointer`}
                >
                  <span>{item}</span>
                  <FaInfoCircle className="inline-block text-xl pb-1 ml-1" />
                </p>
              </div>
            ))} */}
          </div>
        </div>
        <hr className="my-4 border-b-1 border-gray-300" />
        <div className="flex flex-row gap-8">
          <div className="flex-none">
            <p className="text-xl font-semibold text-[#f93966]">
              {/* {data.specList[3].detail?.saledPrice} */}
            </p>
            <div className="text-xs">
              <span className="line-through">
                {/* {data.specList[3].detail?.originalPrice} */}
              </span>
              <span className="text-[#f93966] ml-2">
                {/* -{data.specList[3].detail?.salePercentage} */}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-row font-bold h-full gap-2">
              <button className="flex-1 bg-[#f6f9fc] text-blue-600 rounded-lg h-full">
                <a href="/cart">THÊM VÀO GIỎ</a>
              </button>
              <button className="flex-1 bg-[#f93966] text-white rounded-lg h-full">
                <a href="/cart">MUA NGAY!</a>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl p-5 my-5">
        <div>
          <div className="flex flex-row gap-4">
            <div className="flex-none w-10">
              <FaGift className="text-[#f93966] text-2xl my-3 mx-2" />
            </div>
            <div className="flex-1">
              <div className="flex flex-row justify-between">
                <div className="">
                  <h2 className="inline-block font-bold text-lg">
                    Quà tặng miễn phí
                  </h2>
                  <div className="my-1 text-xs">
                    {/* {data.specList[3].detail?.gift} */}
                  </div>
                </div>
                <button className="text-[#f93966]">
                  <span>Thay đổi</span>
                  <FaAngleRight className="inline-block ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl p-5 my-5">
        <div>
          <div className="flex flex-row gap-4">
            <div className="flex-none">
              <img src={data.images[0]} alt="" className="w-10 my-2" />
            </div>
            <div className="flex-1">
              <div className="flex flex-row justify-between">
                <div className="">
                  <h2 className="inline-block font-bold text-lg">
                    {data.name}
                  </h2>
                  <div className="my-1 text-xs">
                    Laptech là nhà bán lẻ chính thức
                    <FaCheckCircle className="inline-block ml-2 text-lg text-blue-500" />
                  </div>
                </div>
                <button className="">
                  <span>Xem tất cả</span>
                  <FaAngleRight className="inline-block ml-1 text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductOverview;
