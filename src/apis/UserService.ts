import baseURL from "./Customize-axios";
interface response {
  status: string ;
  data: any; // Replace with the correct type for your data
  message: string;
  access_token: string;
  refresh_token: string;
}

export const loginUser = async (data: any) => {
  const res: response = await baseURL.post(`/user/login`, data);
  return res; // Assuming you want to return the data from the response
};


export const registerUser = async (data: any): Promise<response> => {
  const res: response = await baseURL.post(`/user/register`, data );
  return res; // Assuming you want to return the data from the response
};

export const getDetailsUser = async (access_token: string): Promise<response> => {
  const res: response = await baseURL.get(`/user/`,
  
    {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    }
   );
  return res; // Assuming you want to return the data from the response
};

export const updateDetailsUser = async (data: any, access_token: string): Promise<response> => {
  const res: response = await baseURL.put(`/user/`, data,
  {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
   
  return res; // Assuming you want to return the data from the response
};


export const createProduct = async (data: any) => {
  const res: response = await baseURL.post(`/product/login`, data);
  return res; // Assuming you want to return the data from the response
};