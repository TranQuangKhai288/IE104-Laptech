import React from "react";

import DealBanner from "../components/DealBanner";
import ProductCategories from "../components/ProductCategories";
import Deals from "../components/Deals";
import Sales from "../components/Sales";
import PreOrders from "../components/PreOrders";
import WhyLaptech from "../components/WhyLaptech";
import ProductSuggestions from "../components/ProductSuggestions";
import MostSearchedTags from "../components/MostSearchedTags";
import Socials from "../components/Socials";

import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <section>
        <DealBanner />
      </section>

      {/* link to product detail example page
      <section className="mt-5">
        <h2 className="inline-block">Product detail example page:</h2>
        <Link to="/product/product-detail-example" className="font-bold text-blue-600"> CLICK ME!</Link>
      </section> */}

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">DANH MỤC NỔI BẬT 🔎</h2>
        <ProductCategories />
      </section>
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">Khuyến mãi 🎉</h2>
        <div className="p-8 bg-blue-50 border-2 border-dashed border-blue-500 rounded-xl">
          <section>
            <h3 className="text-2xl mb-4 font-bold">
              Chương trình khuyến mãi nổi bật
            </h3>
            <Deals />
          </section>
          <section className="mt-12">
            <h3 className="text-2xl mb-4 font-bold">
              Sản phẩm khuyến mãi nổi bật
            </h3>
            <Sales />
          </section>
          <section className="mt-12">
            <h3 className="text-2xl mb-4 font-bold">
              Pre-Order{" "}
              <span className="text-2xl mb-4 font-bold text-yellow-500">
                Đặt sớm giá ngon 💰
              </span>
            </h3>
            <PreOrders />
          </section>
        </div>
      </div>
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">
          Chọn Laptech?{" "}
          <span className="text-2xl mb-4 font-bold text-red-300">
            Chọn sự Thoải mái, An tâm vì có sự Tận tâm ❤️
          </span>
        </h2>
        <WhyLaptech />
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Gợi ý cho bạn ✨</h2>
        <ProductSuggestions />
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Tìm kiếm nhiều</h2>
        <MostSearchedTags />
      </section>
      <Socials />
    </div>
  );
};

export default Home;
