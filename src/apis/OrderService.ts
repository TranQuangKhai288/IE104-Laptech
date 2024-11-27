import baseURL from "./Customize-axios";
interface response {
  status: string | number;
  data: any; // Replace with the correct type for your data
  message: string;
  totalPages: number;
  count: number;
}

export const createAOrder = async (data: any, access_token: string) => {
  try{
    const res: response = await baseURL.post(`/order/`, data,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res; // Assuming you want to return the data from the response
  }catch (e){
    console.error("Error creating order:", e);
    // throw new Error("Failed to create order");
  }
};


export const getOrders = async (
  page: number = 1,
  limit: number = 10,
  search: string = '',
  status: string = '',
  paymentStatus: string = '',
  startDate: string = '',
  endDate: string = ''
): Promise<response> => {
  try {
    // Create a query object to build the URL search parameters
    const queryParams: any = {
      page: page.toString(),
      limit: limit.toString(),
      search,
      status,
      paymentStatus,
      startDate,
      endDate,
    };

    // Remove empty values from the query object to avoid passing unnecessary parameters
    Object.keys(queryParams).forEach(key => {
      if (!queryParams[key]) {
        delete queryParams[key];
      }
    });

    // Build the query string using URLSearchParams
    const url = `/order?${new URLSearchParams(queryParams).toString()}`;

    // Make the GET request
    const res:response = await baseURL.get(url);
    return res; // Return the response data
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

export const getOrderDetails = async (id: string) => {
  const res: response = await baseURL.get(`/order/${id}`);
  return res; // Assuming you want to return the data from the response
};

export const getMyOrders = async () => {
  const res: response = await baseURL.get(`/order/my-orders`);
  return res; // Assuming you want to return the data from the response
}

export const updateStatusOrder = async (id: string, data: any, access_token: string) => {
  const res: response = await baseURL.patch(`/order/${id}/status`, data, {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  }
  );
  return res; // Assuming you want to return the data from the response
};
