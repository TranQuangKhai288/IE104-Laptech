import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import dealsData from "../data/deals.json";

const Deals = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={2}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={true}
      loop={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination, Autoplay]}
      style={{ padding: "15px 0px 50px 0px" }}
    >
      {dealsData.map((deal) => (
        <SwiperSlide key={deal.id} className="flex justify-center items-center">
          <a
            href={deal.url}
            className="w-[600px] rounded-lg bg-white p-4 shadow-md transition ease-in-out hover:-translate-y-2 hover:shadow-xl hover:border-blue-500 border-2 border-white block"
          >
            <div className="flex flex-row text-sm">
              {deal.categories.map((category, index) => (
                <div key={index} className="bg-gray-200 rounded px-2 mr-2">
                  {category.quantity} {category.title}
                </div>
              ))}
              {deal.gifts.map((gift, index) => (
                <div className="bg-gray-200 rounded px-2 mr-2">
                  {gift.quantity} {gift.title}
                </div>
              ))}
            </div>
            <div className="text-lg font-bold my-3">{deal.title}</div>
            <div className="flex flex-row text-sm">
              <div className="bg-[#FFEAEA] rounded px-2 font-bold text-red-400">
                -{deal.sale_percentage}%
              </div>
              <div className="bg-[#FFEAEA] rounded px-2 ml-2 font-bold text-red-400">
                Giá chỉ từ {deal.starting_price}
              </div>
            </div>
            <div className="text-sm my-3">
              Từ {deal.from_date}
              {Object.keys(deal.to_date).length === 0 ? (
                ""
              ) : (
                <span> đến {deal.to_date}</span>
              )}
            </div>
            <div className="flex flex-row h-20">
              {deal.images.map((image, index) => (
                <img key={index} src={image} alt="" />
              ))}
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Deals;
