import dealBannerData from "../data/deal-banner.json";
import { FaArrowRight } from "react-icons/fa";

const DealBanner = () => {
  return (
    <div className="bg-black rounded container mx-auto flex flex-col md:flex-row items-center">
      <div className="md:w-2/5 text-white md:text-left md:px-8">
        <h2 className="text-3xl font-bold mb-4">{dealBannerData.title}</h2>
        <p className="mb-10">{dealBannerData.message}</p>
        <a
          href="/"
          className="box-border border-2 border-blue-600 font-bold text-blue-400 text-lg pl-6 py-4 rounded-2xl transition-all duration-200 hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500 hover:text-white hover:bg-blue-600 hover:border-transparent group"
        >
          <span>Tìm hiểu ngay</span>
          <span className="pr-6 pl-1 transition-all duration-200 group-hover:pl-3 group-hover:pr-4">
            <FaArrowRight className="text-2xl inline-block" />
          </span>
        </a>
      </div>
      <div className="md:w-3/5 mt-8 md:mt-0">
        <a href="/">
          <img
            src={dealBannerData.image.src}
            alt={dealBannerData.image.alt}
            className="h-full w-auto object-cover shadow-md"
          />
        </a>
      </div>
    </div>
  );
};

export default DealBanner;
