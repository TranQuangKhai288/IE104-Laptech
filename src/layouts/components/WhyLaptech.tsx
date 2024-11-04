const WhyLaptech = () => {
  return (
    <div className="flex items-center space-x-3 w-full">
      <a
        href="/"
        className="flex-1 h-[120px] relative rounded-xl bg-[#F2D4FF] hover:shadow-md"
      >
        <span className="absolute top-2 left-2 w-[100px] h-auto font-bold">
          Trải nghiệm tận tay
        </span>
        <button className="absolute bottom-2 left-2 bg-white rounded-full px-3 py-1 shadow-md">
          Khám phá &gt;
        </button>
        <div className="absolute bottom-0 right-0 w-[100px]">
          <img src="/images/homepage/quality/01.png" alt="" />
        </div>
      </a>
      <a
        href="/"
        className="flex-1 h-[120px] relative rounded-xl bg-[#fcefcc] hover:shadow-md"
      >
        <span className="absolute top-2 left-2 w-[100px] h-auto font-bold">
          Tư vấn viên tận tâm
        </span>
        <button className="absolute bottom-2 left-2 bg-white rounded-full px-3 py-1 shadow-md">
          Khám phá &gt;
        </button>
        <div className="absolute bottom-0 right-0 w-[100px]">
          <img src="/images/homepage/quality/02.png" alt="" />
        </div>
      </a>
      <a
        href="/"
        className="flex-1 h-[120px] relative rounded-xl bg-[#cee6fe] hover:shadow-md"
      >
        <span className="absolute top-2 left-2 w-[100px] h-auto font-bold">
          Trung tâm bảo vệ khách hàng
        </span>
        <button className="absolute bottom-2 left-2 bg-white rounded-full px-3 py-1 shadow-md">
          Khám phá &gt;
        </button>
        <div className="absolute bottom-0 right-0 w-[100px]">
          <img src="/images/homepage/quality/03.png" alt="" />
        </div>
      </a>
      <a
        href="/"
        className="flex-1 h-[120px] relative rounded-xl bg-[#f9cfd8] hover:shadow-md"
      >
        <span className="absolute top-2 left-2 w-[100px] h-auto font-bold">
          Phục vụ đến 24 giờ
        </span>
        <button className="absolute bottom-2 left-2 bg-white rounded-full px-3 py-1 shadow-md">
          Khám phá &gt;
        </button>
        <div className="absolute bottom-0 right-0 w-[100px]">
          <img src="/images/homepage/quality/04.png" alt="" />
        </div>
      </a>
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
