import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation} from "swiper/modules";
import "swiper/css/navigation";

import CheckLightBg from "../../components/CheckLightBg";
import salesData from "../../data/sales.json";

const Sales = () => {
  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={4}
      navigation={true}
      modules={[Navigation]}
      style={{ padding: "10px 0" }}
    >
      {salesData.map((sale) => (
        <SwiperSlide key={sale.id}>
          <a
            href={sale.url}
            className="p-4 rounded bg-white shadow-md transition ease-in-out hover:-translate-y-1 hover:bg-gray-50 block"
            style={{ height: "520px" }}
          >
            <img src={sale.image} alt="" />
            <div className="font-bold">{sale.title}</div>
            <div className="flex flex-row space-x-2">
              <div>Từ</div>
              <div className="font-bold text-red-500">
                {sale.starting_price}
              </div>
              <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                {sale.sale_percentage}%
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div>Màu</div>
              {sale.colors.map((color, index) => (
                <div key={index} className="flex items-center justify-end">
                  <CheckLightBg bgColor={color.hex} />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {sale.specs.map((part, index) => (
                <div key={index} className="text-sm px-2 rounded bg-gray-100">
                  {part.description}
                </div>
              ))}
            </div>
            {Object.keys(sale.gift_value).length === 0 ? (
              ""
            ) : (
              <div>
                <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
                <div className="underline">Qùa tặng {sale.gift_value}</div>
              </div>
            )}
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Sales;
