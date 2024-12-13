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
import { useAppContext } from "../provider/StoreProvider";
import Lottie from "lottie-react";
import { formatCurrency } from "../customeHooks/formatCurrency";
interface customProps {
  data: Product;
}

const ProductOverview: React.FC<customProps> = ({ data }) => {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    dispatch({
      type: "ADD_PRODUCT_TO_CART",
      payload: { productId: data, quantity: 1 },
    });
    setIsLoading(false);
  };
  return (
    <div className="sticky top-4">
      <section>
        <h1 className="rounded-xl bg-[#f93966] text-white text-base font-bold h-30 p-5 text-center">
          {data.category} {data.subCategory} {data.brand}: {data.name}
        </h1>
      </section>
      <section className="bg-white rounded-xl p-5 my-5">
        <h2 className="font-bold text-xl mt-4">
          <span>{data.name}</span>
        </h2>
        <h2 className="font-bold text-xl mt-4 text-red-500">
          {formatCurrency(data.price || 0)}{" "}
          <span className="text-gray-500 line-through">
            {formatCurrency(parseFloat(data.starting_price))}
          </span>
          <span className="ml-2 text-green-500">
            (
            {Math.round(
              ((parseFloat(data.starting_price) - (data.price || 0)) /
                parseFloat(data.starting_price)) *
                100
            )}
            % giảm)
          </span>
        </h2>
        <p className="mt-4 flex-row flex items-center">
          {Array.from(
            { length: parseInt(data.averageRating.toString()) },
            (_, i) => (
              <FaStar
                key={i}
                className="text-yellow-400 text-xl inline-block mr-1 pb-1"
              />
            )
          )}
          <div className="text-blue-600 ml-2 mb-1 hover:underline cursor-pointer">
            {data.reviews.length} đánh giá
          </div>
        </p>
        <hr className="my-4 border-b-1 border-gray-300" />
        <div>
          <h3 className="font-semibold text-gray-500 mb-4">Cấu hình</h3>
          <div className="flex flex-wrap">
            {data.specifications.map((item, index) => (
              <div className="mx-2 mb-2">
                <p
                  key={index}
                  className={`text-xs rounded-lg border border-[#e6e8ea] py-2 px-4 inline-block font-semibold cursor-pointer
                    hover:bg-[#f6f9fc] hover:border-[#355eee] hover:text-[#355eee]
                    `}
                >
                  {item.type}: {item.title}
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
                  className={`text-xs rounded-lg border border-[#e6e8ea] py-2 px-4 inline-block font-semibold cursor-pointer 
                    hover:border-[${item.hex}] hover:text-[#355eee]`}
                  style={{ backgroundColor: "transparent" }} // background mặc định
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = item.hex; // đổi màu nền khi hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"; // trả lại màu nền ban đầu khi bỏ hover
                  }}
                >
                  <span>{item.title}</span>
                </p>
              </div>
            ))}
          </div>
          {data.category === "laptop" && (
            <>
              <h3 className="font-semibold text-gray-500 my-4">Loại hàng</h3>
              {/* hiển thị subCategory */}
              <p className="text-xs rounded-lg border border-[#e6e8ea] py-2 px-4 inline-block font-semibold cursor-pointer">
                <span>
                  {data.category} {data?.subCategory}
                </span>
              </p>
            </>
          )}
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
              <button
                className="flex-1 p-2 bg-[#f6f9fc] text-blue-600 rounded-lg h-full"
                onClick={() => {
                  handleAddToCart();
                }}
              >
                {isLoading ? (
                  <Lottie
                    animationData={require("../assets/animation/loadingAnimation.json")}
                    height={30}
                    width={30}
                  />
                ) : (
                  <>
                    <p>Thêm vào giỏ hàng</p>
                  </>
                )}
              </button>
              <button
                className="flex-1 p-2 bg-[#f93966] text-white rounded-lg h-full"
                disabled={isLoading}
              >
                <p>MUA NGAY!</p>
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
