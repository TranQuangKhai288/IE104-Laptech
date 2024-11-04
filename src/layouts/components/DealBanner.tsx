const DealBanner = () => {
  return (
    <div className="bg-black rounded container mx-auto flex flex-col md:flex-row items-center">
      <div className="md:w-2/5 text-white md:text-left md:px-8">
        <h2 className="text-3xl font-bold mb-4">💥 Khuyến Mãi mới cực HOT!</h2>
        <p className="mb-6">
          Laptech ra mắt chương trình Deal Hời Mỗi Ngày, giúp bạn dễ dàng mua
          sắm các sản phẩm công nghệ chất lượng với Giá Rẻ Nhất Thị Trường!!
        </p>
        <a
          href="/"
          className="border-2 border-blue-600 font-bold text-blue-400 px-6 py-2 rounded-lg hover:text-white"
        >
          Tìm hiểu ngay &gt;
        </a>
      </div>
      <div className="md:w-3/5 mt-8 md:mt-0">
        <a href="/">
          <img
            src="/images/homepage/sale-banner.webp"
            alt="DEAL HỜI MỖI NGÀY SĂN NGAY KẺO HẾT"
            className="h-full w-auto object-cover shadow-md"
          />
        </a>
      </div>
    </div>
  );
};

export default DealBanner;
