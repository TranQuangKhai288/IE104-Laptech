import whyLaptechData from "../data/why-laptech.json";
import { FaAngleRight } from "react-icons/fa";

const WhyLaptech = () => {
  return (
    <div className="flex items-center space-x-3 w-full">
      {whyLaptechData.map((card) => (
        <a
          href={card.url}
          className="flex-1 h-[125px] relative rounded-xl transition ease-in-out hover:-translate-y-2 hover:shadow-lg"
          style={{ backgroundColor: card.background_color }}
        >
          <span className="absolute top-2 left-2 w-[100px] h-auto font-bold">
            {card.title}
          </span>
          <button className="absolute bottom-2 left-2 bg-white rounded-full px-3 py-1 shadow-md">
            <span>Khám phá</span>
            <span>
              <FaAngleRight className="inline-block" />
            </span>
          </button>
          <div className="absolute bottom-0 right-0 w-[100px]">
            <img src={card.img} alt="" />
          </div>
        </a>
      ))}
      <div className="flex-1 rounded-xl w-20 h-[120px] bg-white p-4">
        <div className="bg-[#3eb444] inline-block rounded-full text-white font-bold px-2">
          ✓
        </div>
        <div className="text-sm">
          Thành viên thuộc UIT Group. Tập đoàn bán lẻ từ 2003 với nguyên tắc
          hoạt động: <span className="font-bold">Khách hàng là trung tâm.</span>
        </div>
      </div>
    </div>
  );
};

export default WhyLaptech;
