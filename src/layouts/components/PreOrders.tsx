import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation} from "swiper/modules";
import "swiper/css/navigation";

import CheckLightBg from "../../components/CheckLightBg";
import preOrderData from "../../data/pre-order.json";

const Sales = () => {
  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={4}
      navigation={true}
      pagination={{ type: "fraction" }}
      modules={[Navigation]}
      style={{ paddingBottom: "10px" }}
    >
      {preOrderData.map((order) => (
        <SwiperSlide key={order.id}>
          <a
            href={order.url}
            className="p-4 rounded bg-white shadow-md hover:bg-gray-50 block"
            style={{ height: "450px" }}
          >
            <img src={order.image} alt="" />
            <div className="font-bold">{order.title}</div>
            <div className="flex flex-row space-x-2">
              <div>Từ</div>
              <div className="font-bold text-red-500">
                {order.starting_price}
              </div>
              <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                {order.sale_percentage}%
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div>Màu</div>
              {order.colors.map((color, index) => (
                <div key={index} className="flex items-center justify-end">
                  <CheckLightBg bgColor={color.hex} />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {order.specs.map((part, index) => (
                <div key={index} className="text-sm px-2 rounded bg-gray-100">
                  {part.description}
                </div>
              ))}
            </div>
            {Object.keys(order.gift_value).length === 0 ? (
              ""
            ) : (
              <div>
                <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
                <div className="underline">Qùa tặng {order.gift_value}</div>
              </div>
            )}
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Sales;
