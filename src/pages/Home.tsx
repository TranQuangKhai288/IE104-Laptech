import React, { useRef } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Home: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -550, // Adjust the value as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 550, // Adjust the value as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <section className="bg-black rounded container mx-auto flex flex-col md:flex-row items-center">
        {/* Text Region */}
        <div className="md:w-2/5 text-white md:text-left md:px-8">
          <h2 className="text-3xl font-bold mb-4">
            💥 Khuyến Mãi mới cực HOT!
          </h2>
          <p className="mb-6">
            Laptech ra mắt chương trình Deal Hời Mỗi Ngày, giúp bạn dễ dàng mua
            sắm các sản phẩm công nghệ chất lượng với Giá Rẻ Nhất Thị Trường!!
          </p>
          <a
            href="localhost"
            className="border border-2 border-blue-600 font-bold text-blue-400 px-6 py-2 rounded-lg hover:text-white"
          >
            Tìm hiểu ngay &gt;
          </a>
        </div>

        {/* Image Region */}
        <div className="md:w-3/5 mt-8 md:mt-0">
          <a href="localhost">
            <img
              src="/images/homepage/sale-banner.webp"
              alt="Example"
              className="h-full w-auto object-cover shadow-md"
            />
          </a>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">DANH MỤC NỔI BẬT 🔎</h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <a
              href="/"
              className="p-6 container flex flex-col items-center md:flex-row rounded-lg shadow-md bg-white hover:bg-gray-100"
            >
              <div className="md:w-1/5">
                <img
                  src="/images/homepage/popular/laptop-gaming.webp"
                  alt="Laptop Gaming"
                />
              </div>
              <div className="md:w-4/5 md:px-8">
                <p className="font-bold text-xl">Laptop Gaming</p>
                <p className="text-sm">153 sản phẩm</p>
              </div>
            </a>
            <a
              href="/"
              className="p-6 container flex flex-col items-center md:flex-row rounded-lg shadow-md bg-white hover:bg-gray-100"
            >
              <div className="md:w-1/5">
                <img
                  src="/images/homepage/popular/laptop-van-phong.webp"
                  alt="Laptop văn phòng"
                />
              </div>
              <div className="md:w-4/5 md:px-8">
                <p className="font-bold text-xl">Laptop văn phòng</p>
                <p className="text-sm">229 sản phẩm</p>
              </div>
            </a>
            <a
              href="/"
              className="p-6 container flex flex-col items-center md:flex-row rounded-lg shadow-md bg-white hover:bg-gray-100"
            >
              <div className="md:w-1/5">
                <img
                  src="/images/homepage/popular/laptop-mong-nhe.webp"
                  alt="Laptop mỏng nhẹ"
                />
              </div>
              <div className="md:w-4/5 md:px-8">
                <p className="font-bold text-xl">Laptop mỏng nhẹ</p>
                <p className="text-sm">78 sản phẩm</p>
              </div>
            </a>
            <a
              href="/"
              className="p-6 container flex flex-col items-center md:flex-row rounded-lg shadow-md bg-white hover:bg-gray-100"
            >
              <div className="md:w-1/5">
                <img
                  src="/images/homepage/popular/macbook.webp"
                  alt="Macbook"
                />
              </div>
              <div className="md:w-4/5 md:px-8">
                <p className="font-bold text-xl">Macbook</p>
                <p className="text-sm">57 sản phẩm</p>
              </div>
            </a>
            <a
              href="/"
              className="p-6 container flex flex-col items-center md:flex-row rounded-lg shadow-md bg-white hover:bg-gray-100"
            >
              <div className="md:w-1/5">
                <img
                  src="/images/homepage/popular/workstation.webp"
                  alt="Workstation"
                />
              </div>
              <div className="md:w-4/5 md:px-8">
                <p className="font-bold text-xl">Workstation</p>
                <p className="text-sm">49 sản phẩm</p>
              </div>
            </a>
            <a
              href="/"
              className="p-6 container flex flex-col items-center md:flex-row rounded-lg shadow-md bg-white hover:bg-gray-100"
            >
              <div className="md:w-1/5">
                <img src="/images/homepage/popular/may-cu.webp" alt="Máy cũ" />
              </div>
              <div className="md:w-4/5 md:px-8">
                <p className="font-bold text-xl">Máy cũ</p>
                <p className="text-sm">174 sản phẩm</p>
              </div>
            </a>
            <a
              href="/"
              className="p-6 container flex flex-col items-center md:flex-row rounded-lg shadow-md bg-white hover:bg-gray-100"
            >
              <div className="md:w-1/5">
                <img
                  src="/images/homepage/popular/keyboard-mouse.webp"
                  alt="Bàn phím / Chuột"
                />
              </div>
              <div className="md:w-4/5 md:px-8">
                <p className="font-bold text-xl">Bàn phím / Chuột</p>
                <p className="text-sm">229 sản phẩm</p>
              </div>
            </a>
            <a
              href="/"
              className="p-6 container flex flex-col items-center md:flex-row rounded-lg shadow-md bg-white hover:bg-gray-100"
            >
              <div className="md:w-1/5">
                <img
                  src="/images/homepage/popular/stand.webp"
                  alt="Giá đỡ laptop"
                />
              </div>
              <div className="md:w-4/5 md:px-8">
                <p className="font-bold text-xl">Giá đỡ laptop</p>
                <p className="text-sm">67 sản phẩm</p>
              </div>
            </a>
            <a
              href="/"
              className="p-6 container flex flex-col items-center md:flex-row rounded-lg shadow-md bg-white hover:bg-gray-100"
            >
              <div className="md:w-1/5">
                <img
                  src="/images/homepage/popular/backpack.webp"
                  alt="Balo / Túi đựng laptop"
                />
              </div>
              <div className="md:w-4/5 md:px-8">
                <p className="font-bold text-xl">Balo / Túi đựng laptop</p>
                <p className="text-sm">85 sản phẩm</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">Khuyến mãi 🎉</h2>
        <div className="p-8 bg-blue-50 border-2 border-dashed border-blue-500 rounded-xl">
          <section>
            <h3 className="text-2xl mb-4 font-bold">
              Chương trình khuyến mãi nổi bật
            </h3>
            <div className="container mx-auto px-4">
              <div className="relative">
                {/* Left Arrow Button */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-700"
                >
                  <FaArrowLeft />
                </button>

                {/* Scrollable Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-scroll space-x-4 scrollbar-hide px-8"
                >
                  {/* List Items */}
                  <a
                    href="/"
                    className="min-w-[550px] rounded-lg bg-white p-4 shadow-md hover:bg-gray-50"
                  >
                    <div className="flex flex-row text-sm">
                      <div className="bg-gray-200 rounded px-2">117 Laptop</div>
                      <div className="bg-gray-200 rounded px-2 ml-2">
                        1 Máy chơi game/ Game console
                      </div>
                    </div>
                    <div className="text-lg font-bold my-3">
                      LAPTOP CHÍNH HÃNG - DEAL RẺ VÔ ĐỊCH
                    </div>
                    <div className="flex flex-row text-sm">
                      <div className="bg-gray-200 rounded px-2 font-bold text-red-400">
                        -32%
                      </div>
                      <div className="bg-gray-200 rounded px-2 ml-2 font-bold text-red-400">
                        Chỉ từ 11.990.000
                      </div>
                    </div>
                    <div className="text-sm my-3">Từ 27/09 đến 31/10/2024</div>
                    <div className="flex flex-row h-20">
                      <img src="/images/homepage/deal/laptop/01.png" alt="" />
                      <img src="/images/homepage/deal/laptop/02.png" alt="" />
                      <img src="/images/homepage/deal/laptop/03.png" alt="" />
                      <img src="/images/homepage/deal/laptop/04.png" alt="" />
                      <img src="/images/homepage/deal/laptop/05.png" alt="" />
                      <img src="/images/homepage/deal/laptop/06.png" alt="" />
                    </div>
                  </a>

                  <a
                    href="/"
                    className="min-w-[550px] rounded-lg bg-white p-4 shadow-md hover:bg-gray-50"
                  >
                    <div className="flex flex-row text-sm">
                      <div className="bg-gray-200 rounded px-2">79 Laptop</div>
                      <div className="bg-gray-200 rounded px-2 ml-2">
                        3 tai nghe
                      </div>
                    </div>
                    <div className="text-lg font-bold my-3">
                      ASUS SALE TO - LO CHI VỀ GIÁ
                    </div>
                    <div className="flex flex-row text-sm">
                      <div className="bg-gray-200 rounded px-2 font-bold text-red-400">
                        -48%
                      </div>
                      <div className="bg-gray-200 rounded px-2 ml-2 font-bold text-red-400">
                        Chỉ từ 9.990.000
                      </div>
                    </div>
                    <div className="text-sm my-3">Từ 18/03/2023</div>
                    <div className="flex flex-row h-20">
                      <img src="/images/homepage/deal/asus/01.webp" alt="" />
                      <img src="/images/homepage/deal/asus/02.webp" alt="" />
                      <img src="/images/homepage/deal/asus/03.webp" alt="" />
                      <img src="/images/homepage/deal/asus/04.webp" alt="" />
                      <img src="/images/homepage/deal/asus/05.webp" alt="" />
                      <img src="/images/homepage/deal/asus/06.webp" alt="" />
                    </div>
                  </a>
                  <a
                    href="/"
                    className="min-w-[550px] rounded-lg bg-white p-4 shadow-md hover:bg-gray-50"
                  >
                    <div className="flex flex-row text-sm">
                      <div className="bg-gray-200 rounded px-2">58 Laptop</div>
                      <div className="bg-gray-200 rounded px-2 ml-2">
                        1 cục sạc type-C đa năng Ugreen
                      </div>
                    </div>
                    <div className="text-lg font-bold my-3">
                      HIỆU NĂNG ĐỈNH CAO
                    </div>
                    <div className="flex flex-row text-sm">
                      <div className="bg-gray-200 rounded px-2 font-bold text-red-400">
                        -42%
                      </div>
                      <div className="bg-gray-200 rounded px-2 ml-2 font-bold text-red-400">
                        Chỉ từ 12.590.000
                      </div>
                    </div>
                    <div className="text-sm my-3">Từ 18/03/2023</div>
                    <div className="flex flex-row h-20">
                      <img
                        src="/images/homepage/deal/workstation/01.webp"
                        alt=""
                      />
                      <img
                        src="/images/homepage/deal/workstation/02.webp"
                        alt=""
                      />
                      <img
                        src="/images/homepage/deal/workstation/03.webp"
                        alt=""
                      />
                      <img
                        src="/images/homepage/deal/workstation/04.webp"
                        alt=""
                      />
                      <img
                        src="/images/homepage/deal/workstation/05.webp"
                        alt=""
                      />
                      <img
                        src="/images/homepage/deal/workstation/06.webp"
                        alt=""
                      />
                    </div>
                  </a>
                  <a
                    href="/"
                    className="min-w-[550px] rounded-lg bg-white p-4 shadow-md hover:bg-gray-50"
                  >
                    <div className="flex flex-row text-sm">
                      <div className="bg-gray-200 rounded px-2">151 Laptop</div>
                      <div className="bg-gray-200 rounded px-2 ml-2">
                        Chuột Gaming Logitech G120 Aura RGB
                      </div>
                    </div>
                    <div className="text-lg font-bold my-3">
                      🔥 HOT SALE 🔥 MUA LAPTOP GAMING TẶNG CHUỘT GAMING
                    </div>
                    <div className="flex flex-row text-sm">
                      <div className="bg-gray-200 rounded px-2 font-bold text-red-400">
                        -50%
                      </div>
                      <div className="bg-gray-200 rounded px-2 ml-2 font-bold text-red-400">
                        Chỉ từ 10.290.000
                      </div>
                    </div>
                    <div className="text-sm my-3">Từ 23/09/2024</div>
                    <div className="flex flex-row h-20">
                      <img src="/images/homepage/deal/gaming/01.png" alt="" />
                      <img src="/images/homepage/deal/gaming/02.jpg" alt="" />
                      <img src="/images/homepage/deal/gaming/03.jpg" alt="" />
                      <img src="/images/homepage/deal/gaming/04.jpg" alt="" />
                      <img src="/images/homepage/deal/gaming/05.png" alt="" />
                      <img src="/images/homepage/deal/gaming/06.png" alt="" />
                    </div>
                  </a>
                  <a
                    href="/"
                    className="min-w-[550px] rounded-lg bg-white p-4 shadow-md hover:bg-gray-50"
                  >
                    <div className="flex flex-row text-sm">
                      <div className="bg-gray-200 rounded px-2">37 Balo</div>
                      <div className="bg-gray-200 rounded px-2 ml-2">
                        30 túi
                      </div>
                      <div className="bg-gray-200 rounded px-2 ml-2">
                        1 Quà tặng
                      </div>
                      <div className="bg-gray-200 rounded px-2 ml-2">
                        3 Phụ kiện & Setup
                      </div>
                    </div>
                    <div className="text-lg font-bold my-3">
                      BALO TÚI GIẢM GIÁ MÙA BACK TO SCHOOL
                    </div>
                    <div className="flex flex-row text-sm">
                      <div className="bg-gray-200 rounded px-2 font-bold text-red-400">
                        -75%
                      </div>
                      <div className="bg-gray-200 rounded px-2 ml-2 font-bold text-red-400">
                        Chỉ từ 199.000
                      </div>
                    </div>
                    <div className="text-sm my-3">Từ 18/07/2024</div>
                    <div className="flex flex-row h-20">
                      <img src="/images/homepage/deal/backpack/01.png" alt="" />
                      <img src="/images/homepage/deal/backpack/02.png" alt="" />
                      <img src="/images/homepage/deal/backpack/03.jpg" alt="" />
                      <img src="/images/homepage/deal/backpack/04.jpg" alt="" />
                      <img src="/images/homepage/deal/backpack/05.png" alt="" />
                      <img src="/images/homepage/deal/backpack/06.jpg" alt="" />
                    </div>
                  </a>
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-700"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </section>
          <section className="mt-12">
            <h3 className="text-2xl mb-4 font-bold">
              Sản phẩm khuyến mãi nổi bật
            </h3>
            <div className="flex flex-row space-x-4 p-4">
              <a
                href="/"
                className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
              >
                <img src="/images/homepage/sale/01.png" alt="" />
                <div className="font-bold">
                  Lenovo ThinkPad X1 Nano Gen 2 i7 1280P, 32GB, 512GB, 2K. LTE
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Từ</div>
                  <div className="font-bold text-red-500">31.390.000</div>
                  <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                    -22%
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Màu</div>
                  <div className="flex items-center justify-end">
                    <div className="w-4 h-4 bg-black rounded"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-sm px-2 rounded bg-gray-100">
                    i7 1280p
                  </div>
                  <div className="text-sm px-2 rounded bg-gray-100">32GB</div>
                  <div className="text-sm px-2 rounded bg-gray-100">512GB</div>
                  <div className="text-sm px-2 rounded bg-gray-100">
                    2K. LTE
                  </div>
                </div>
              </a>
              <a
                href="/"
                className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
              >
                <img src="/images/homepage/sale/02.png" alt="" />
                <div className="font-bold">
                  Lenovo ThinkPad X1 Carbon Gen 9 Core i7 1185G7, 32GB, 512GB,
                  4K HDR
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Từ</div>
                  <div className="font-bold text-red-500">21.990.000</div>
                  <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                    -12%
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Màu</div>
                  <div className="flex items-center justify-end">
                    <div className="w-4 h-4 bg-black rounded"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-sm px-2 rounded bg-gray-100">
                    Core i7 1185G7
                  </div>
                  <div className="text-sm px-2 rounded bg-gray-100">32GB</div>
                  <div className="text-sm px-2 rounded bg-gray-100">512GB</div>
                  <div className="text-sm px-2 rounded bg-gray-100">4K HDR</div>
                </div>
                <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
                <div className="underline">Qùa tặng 797.000</div>
              </a>
              <a
                href="/"
                className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
              >
                <img src="/images/homepage/sale/03.png" alt="" />
                <div className="font-bold">
                  Dell Inspiron 14 Plus (7420) i7 12700H, 16GB, 512GB, 2.2K
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Từ</div>
                  <div className="font-bold text-red-500">16.790.000</div>
                  <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                    -40%
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Màu</div>
                  <div className="flex items-center justify-end">
                    <div className="w-4 h-4 bg-green-900 rounded"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-sm px-2 rounded bg-gray-100">
                    i7 12700H
                  </div>
                  <div className="text-sm px-2 rounded bg-gray-100">16GB</div>
                  <div className="text-sm px-2 rounded bg-gray-100">512GB</div>
                  <div className="text-sm px-2 rounded bg-gray-100">2.2K</div>
                </div>
              </a>
              <a
                href="/"
                className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
              >
                <img src="/images/homepage/sale/04.png" alt="" />
                <div className="font-bold">
                  Dell XPS 13 9315 (2022) I5 1235U 8GB 512GB FHD+
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Từ</div>
                  <div className="font-bold text-red-500">29.990.000</div>
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Màu</div>
                  <div className="flex items-center justify-end">
                    <div className="w-4 h-4 bg-blue-200 rounded"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-sm px-2 rounded bg-gray-100">
                    i5 1253U
                  </div>
                  <div className="text-sm px-2 rounded bg-gray-100">8GB</div>
                  <div className="text-sm px-2 rounded bg-gray-100">512GB</div>
                  <div className="text-sm px-2 rounded bg-gray-100">FHD+</div>
                </div>
                <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
                <div className="underline">Quà tặng 100.000</div>
              </a>
            </div>
          </section>
          <section className="mt-12">
            <h3 className="text-2xl mb-4 font-bold">
              Pre-Order{" "}
              <span className="text-2xl mb-4 font-bold text-yellow-500">
                Đặt sớm giá ngon 💰
              </span>
            </h3>
            <div className="flex flex-row space-x-4 p-4">
              <a
                href="/"
                className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
              >
                <img src="/images/homepage/pre-order/01.png" alt="" />
                <div className="font-bold">
                  Dell XPS 13 9350 (2025) Ultra 7 268V, 32GB, 1TB, 2.8K OLED
                  60Hz
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Từ</div>
                  <div className="font-bold text-red-500">71.990.000</div>
                  <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                    -10%
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Màu</div>
                  <div className="flex items-center justify-end">
                    <div className="w-4 h-4 bg-black rounded"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-sm px-2 rounded bg-gray-100">
                    Ultra 7 268V
                  </div>
                  <div className="text-sm px-2 rounded bg-gray-100">32GB</div>
                  <div className="text-sm px-2 rounded bg-gray-100">1TB</div>
                  <div className="text-sm px-2 rounded bg-gray-100">
                    2.8K OLED 60Hz
                  </div>
                </div>
              </a>
              <a
                href="/"
                className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
              >
                <img src="/images/homepage/pre-order/02.jpg" alt="" />
                <div className="font-bold">
                  Bàn phím cơ AKKO MU02 MU02 - Autumn
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Từ</div>
                  <div className="font-bold text-red-500">2.790.000</div>
                  <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                    -18%
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Màu</div>
                  <div className="flex items-center justify-end">
                    <div className="w-4 h-4 bg-orange-900 rounded"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-sm px-2 rounded bg-gray-100">
                    MU02 - Autumn
                  </div>
                </div>
              </a>
              <a
                href="/"
                className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
              >
                <img src="/images/homepage/pre-order/03.jpg" alt="" />
                <div className="font-bold">
                  Bàn Phím Cơ Lofree Flow Lite 100 Keys
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Từ</div>
                  <div className="font-bold text-red-500">2.490.000</div>
                  <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                    -14%
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Màu</div>
                  <div className="flex items-center justify-end">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="w-4 h-4 border-2 border-gray-400 bg-white rounded"></div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="w-4 h-4 bg-red-200 rounded"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-sm px-2 rounded bg-gray-100">
                    100 Keys
                  </div>
                </div>
              </a>
              <a
                href="/"
                className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
              >
                <img src="/images/homepage/pre-order/04.jpg" alt="" />
                <div className="font-bold">
                  Bàn phím cơ AKKO MU02 MU02 - Mountain Seclusion
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Từ</div>
                  <div className="font-bold text-red-500">3.090.000</div>
                  <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                    -9%
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <div>Màu</div>
                  <div className="flex items-center justify-end">
                    <div className="w-4 h-4 bg-orange-900 rounded"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-sm px-2 rounded bg-gray-100">
                    MU02 - Mountain Seclusion
                  </div>
                </div>
              </a>
            </div>
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
              hoạt động:{" "}
              <span className="font-bold">Khách hàng là trung tâm.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Gợi ý cho bạn ✨</h2>
        <div className="flex flex-row space-x-4 p-4">
          <a
            href="/"
            className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
          >
            <img src="/images/homepage/suggest/01.webp" alt="" />
            <div className="font-bold">
              Lenovo ThinkPad T16 Gen 3 21MN007EVA Ultra 7 155H, 16GB, 512GB,
              WUXGA
            </div>
            <div className="flex flex-row space-x-2">
              <div>Từ</div>
              <div className="font-bold text-red-500">32.990.000</div>
              <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                -4%
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div>Màu</div>
              <div className="flex items-center justify-end">
                <div className="w-4 h-4 bg-black rounded"></div>
              </div>
            </div>
            <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
            <div className="text-sm text-gray-500">
              CPU: Core Ultra 7 155H, 16 Cores
              <br />
              RAM: 16GB, 5600Mhz
              <br />Ổ cứng: SSD 512 GB
              <br />
              Màn hình: 16", 1920x1200, 60Hz
              <br />
              Card: Intel® Arc™ Graphics
            </div>
          </a>
          <a
            href="/"
            className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
          >
            <img src="/images/homepage/suggest/02.webp" alt="" />
            <div className="font-bold">
              Lenovo Slim 7 16 Gen 7 i7 12700H, A370M 4GB, 32GB, 1TB, 2.5K Touch
              120Hz
            </div>
            <div className="flex flex-row space-x-2">
              <div>Từ</div>
              <div className="font-bold text-red-500">19.690.000</div>
              <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                -42%
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div>Màu</div>
              <div className="flex items-center justify-end">
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
              </div>
            </div>
            <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
            <div className="text-sm text-gray-500">
              CPU: Core i7 12700H, 14 Cores
              <br />
              RAM: 32GB, 4800Mhz
              <br />Ổ cứng: SSD 1 TB
              <br />
              Màn hình: 16", 2560 x 1600, 120Hz
              <br />
              Card: Arc A370M 4GB
            </div>
            <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
            <div className="underline">Qùa tặng 350.000</div>
          </a>
          <a
            href="/"
            className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
          >
            <img src="/images/homepage/suggest/03.webp" alt="" />
            <div className="font-bold">
              Lenovo Thinkpad T14 Gen 1 R5 4650U, 16GB, 256GB, FHD
            </div>
            <div className="flex flex-row space-x-2">
              <div>Từ</div>
              <div className="font-bold text-red-500">8.790.000</div>
              <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                -45%
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div>Màu</div>
              <div className="flex items-center justify-end">
                <div className="w-4 h-4 bg-black rounded"></div>
              </div>
            </div>
            <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
            <div className="text-sm text-gray-500">
              CPU: Ryzen 5 4650U, 4 Cores
              <br />
              RAM: 16GB, 2666Mhz
              <br />
              Ổ cứng: SSD 256 GB
              <br />
              Màn hình: 14", 1920 x 1080, 60Hz
              <br />
              Card: AMD Radeon
            </div>
          </a>
          <a
            href="/"
            className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
          >
            <img src="/images/homepage/suggest/04.webp" alt="" />
            <div className="font-bold">
              Dell Inspiron 14 5430 i5 1340P, 16GB, 512GB, FHD+
            </div>
            <div className="flex flex-row space-x-2">
              <div>Từ</div>
              <div className="font-bold text-red-500">15.990.000</div>
              <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                -45%
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div>Màu</div>
              <div className="flex items-center justify-end">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
            <div className="text-sm text-gray-500">
              CPU: Core i5 1340P, 12 Cores
              <br />
              RAM: 16GB, 4800Mhz
              <br />
              Ổ cứng: SSD 512 GB
              <br />
              Màn hình: 14", 1920 x 1200, 60Hz
              <br />
              Card: Intel Iris Xe Graphics
            </div>
            <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
            <div className="underline">Quà tặng 398.000</div>
          </a>
          <a
            href="/"
            className="flex-1 p-4 rounded bg-white shadow-md hover:bg-gray-50"
          >
            <img src="/images/homepage/suggest/05.webp" alt="" />
            <div className="font-bold">
              Lenovo ThinkPad X1 Carbon Gen 10 i7 1280P, 32GB, 512GB, 4K HDR,
              LTE
            </div>
            <div className="flex flex-row space-x-2">
              <div>Từ</div>
              <div className="font-bold text-red-500">27.490.000</div>
              <div className="text-sm rounded bg-gray-100 px-1 text-red-500">
                -5%
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div>Màu</div>
              <div className="flex items-center justify-end">
                <div className="w-4 h-4 bg-black rounded"></div>
              </div>
            </div>

            <hr className="my-4 border-b-1 border-gray-300 border-b-0 mb-4" />
            <div className="text-sm text-gray-500">
              CPU: Core i7 1280P, 14 Cores
              <br />
              RAM: 32GB, 5200Mhz
              <br />
              Ổ cứng: SSD 512 GB
              <br />
              Màn hình: 14", 3840 x 2400, 60Hz
              <br />
              Card: Intel Iris Xe Graphics
            </div>
          </a>
        </div>
        <div className="flex items-center justify-center mt-12">
          <button className="bg-white font-bold text-xl text-blue-500 py-4 px-24 rounded-lg shadow">
            Xem thêm
          </button>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Tìm kiếm nhiều</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            dell xps
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            lenovo thinkpad
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            lenovo thinkbook
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            dell inspiron 14 plus 7420
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            legion 5 2024
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            dell xps 9315 2 in 1
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            surface pro 8
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            dell g16 7630
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            asus zenbook 14x oled q420va
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            thinkpad p1 gen 3
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            thinkpad x1 carbon gen 7
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            thinkpad t14s gen 3
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            thinkpad t14s gen 4
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            lenovo slim7 gen 7
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            lenovo yoga 7 2 in 1
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            asus rog flow x13
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            dell inspiron 5430
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            dell latitude 7430
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            dell latitude 9420
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            dell precision
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            inspiron 16 plus 7630
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            lofree flow
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            darmoshark top75
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            rainy 75
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            aula f75
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            macbook air 2022
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            macbook pro 2023
          </a>
          <a
            href="/"
            className="bg-white rounded-full py-2 px-4 text-gray-500 text-sm hover:shadow-md"
          >
            hp victus
          </a>
        </div>
      </section>
      <div className="fixed bottom-5 right-5 flex flex-col space-y-2">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-400 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-500 transition"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-pink-600 transition"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default Home;
