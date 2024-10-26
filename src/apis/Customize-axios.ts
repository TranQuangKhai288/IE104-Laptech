import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

// Tạo một instance của axios với cấu hình cơ bản
const instance = axios.create({
  baseURL: process.env.REACT_APP_DEV_API_BASE_URL,
});

// Hàm để xử lý lỗi
const handleError = (error: AxiosError): Promise<never> => {
  if (error.response) {
    const errorMessage = (error.response.data as { message: string }).message || "Unknown error occurred";
    const statusCode = error.response.status;

    switch (statusCode) {
      case 400:
        return Promise.reject(new Error(`Login failed: ${errorMessage || "Invalid credentials"}`));
      // Bạn có thể thêm nhiều case khác tùy theo yêu cầu của bạn
      default:
        return Promise.reject(new Error(`Error ${statusCode}: ${errorMessage}`));
    }
  } else {
    return Promise.reject(new Error("An unexpected error occurred."));
  }
};

// Thêm một interceptor để xử lý các yêu cầu
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Có thể thêm các xử lý trước khi gửi yêu cầu ở đây
    return config;
  },
  (error: AxiosError) => {
    // Xử lý lỗi trước khi gửi yêu cầu
    return Promise.reject(error);
  }
);

// Thêm một interceptor để xử lý các phản hồi
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Trả về dữ liệu từ phản hồi
    return response?.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Kiểm tra lỗi jwt expired
    if ((error.response?.data as { message?: string })?.message === "jwt expired") {
      try {
        console.log("calling refresh token");
        const result: { access_token: string } = await instance.post('/user/refresh-token', {
          withCredentials: true,
        });
        console.log("Refresh token result", result.access_token);
        const access_token = result.access_token;
        if (originalRequest) {
          originalRequest.headers["authorization"] = `Bearer ${access_token}`;
        }
        if (originalRequest) {
          return instance(originalRequest);
        }
        return Promise.reject(new Error("Original request is undefined."));
      } catch (error) {
        console.log("Refresh token failed", error);
      }
    }

    // Gọi hàm xử lý lỗi
    return handleError(error);
  }
);

export default instance;
