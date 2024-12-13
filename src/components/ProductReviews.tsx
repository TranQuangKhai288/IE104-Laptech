import React from "react";
import { Product } from "../interfaces/Product";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  votes: number;
  variant: string; // Ví dụ: cấu hình sản phẩm
}

interface ProductReviewsProps {
  data: Product;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ data }) => {
  const totalReviews = data.reviews.length;
  const transformReviewsToRatingBreakdown = (reviews: any) => {
    // Khởi tạo mảng ratingBreakdown với các rating từ 1 đến 5
    const ratingBreakdown = [
      { rating: 5, count: 0 },
      { rating: 4, count: 0 },
      { rating: 3, count: 0 },
      { rating: 2, count: 0 },
      { rating: 1, count: 0 },
    ];

    // Duyệt qua tất cả các review
    reviews.forEach((review: any) => {
      const { rating } = review;

      // Tìm đối tượng tương ứng với rating
      const ratingObj = ratingBreakdown.find((item) => item.rating === rating);

      // Nếu tìm thấy đối tượng, tăng count lên 1
      if (ratingObj) {
        ratingObj.count += 1;
      }
    });

    return ratingBreakdown;
  };
  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Đánh giá sản phẩm</h2>
        <a href="#" className="text-blue-500 text-sm">
          Xem tất cả
        </a>
      </div>

      <div className="flex">
        {/* Tổng điểm */}
        <div className="w-1/3 text-center">
          <p className="text-4xl font-bold">{data.averageRating.toFixed(1)}</p>
          <div className="text-yellow-500 text-lg">
            {"⭐".repeat(Math.round(data.averageRating))}
          </div>
          <p className="text-gray-500">{totalReviews} đánh giá</p>
        </div>

        {/* Phân bổ sao */}
        <div className="w-2/3 pl-5">
          {transformReviewsToRatingBreakdown(data.reviews).map((item) => (
            <div key={item.rating} className="flex items-center mb-1">
              <p className="w-10 text-sm text-gray-600">{item.rating} ★</p>
              <div className="w-full bg-gray-200 h-2 rounded-full mx-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{
                    width: `${(item.count / totalReviews) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Danh sách đánh giá */}
      <div className="mt-4">
        {data.reviews.map((review) => (
          <div
            key={review._id}
            className="p-4 bg-gray-100 rounded-lg shadow-sm mb-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={review.userId.avatar}
                  alt="user avatar"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div className="flex-col items-center">
                  <h4 className="font-semibold">{review.userId.name}</h4>
                  <p className="text-sm text-gray-500">{review.userId.email}</p>
                </div>
              </div>
              <div className="text-yellow-500">
                {"⭐".repeat(review.rating)}
              </div>
            </div>
            <p className="mt-2 ml-12 text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Nút hành động */}
      <div className="flex justify-between mt-5">
        <button className="bg-gray-100 text-blue-500 px-4 py-2 rounded-lg">
          Xem tất cả
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Đánh giá ngay
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;
