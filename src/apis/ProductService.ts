import baseURL from "./Customize-axios";
interface response {
  status: string | number;
  data: any; // Replace with the correct type for your data
  message: string;
  totalPages: number;
  count: number;
}

export const createAProduct = async (data: any) => {
  const res: response = await baseURL.post(`/product/`, data);
  return res; // Assuming you want to return the data from the response
};

export const createManyProducts = async (data: any) => {
    const res: response = await baseURL.post(`/product/bulk`, data);
    return res; // Assuming you want to return the data from the response
  };

export const getProducts = async (
  page = 1,
  limit = 10,
  category = '',
  subCategory = '',
  brand = '',
  search = '',
  isFeatured = ''

) => {
    const res: response = await baseURL.get(`/product?page=${page}&limit=${limit}&category=${category}&subCategory=${subCategory}&brand=${brand}&search=${search}&isFeatured=${isFeatured}`);
    return res; // Assuming you want to return the data from the response
};

export const getProductDetails = async (id: string) => {
    const res: response = await baseURL.get(`/product/${id}`);
    return res; // Assuming you want to return the data from the response
};

export const updateProduct = async (id: string, data: any) => {
    const res: response = await baseURL.put(`/product/${id}`, data);
    return res; // Assuming you want to return the data from the response
};

export const deleteProduct = async (id: string) => {
    const res: response = await baseURL.delete(`/product/${id}`);
    return res; // Assuming you want to return the data from the response
};