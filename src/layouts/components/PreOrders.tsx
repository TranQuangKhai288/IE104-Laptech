import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

// import salesData from "../../data/sales.json";
import ProductHomeItem from "../../components/ProductHomeItem";
import * as ProductService from "../../apis/ProductService";
import { Product } from "../../interfaces/Product";
import { useEffect, useState } from "react";
const PreOrder = () => {
  const [salesData, setSalesData] = useState<Product[]>([]);

  const fetchSales = async () => {
    try {
      const res = await ProductService.getProducts(
        1,
        10,
        "",
        "",
        "",
        "",
        "true"
      );
      if (res.status === "OK") {
        setSalesData(res.data);
      } else {
        console.log(res.message, "error at fetchSales");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={4}
      navigation={true}
      modules={[Navigation]}
      style={{ padding: "15px 0 35px 0" }}
    >
      {salesData.map((sale) => (
        <SwiperSlide key={sale._id}>
          <ProductHomeItem product={sale} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PreOrder;
