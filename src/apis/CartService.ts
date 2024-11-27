import baseURL from "./Customize-axios";
interface response {
  status: string | number;
  data: any; // Replace with the correct type for your data
  message: string;
}

export const getCartUser = async (access_token: string): Promise<response> => {
  try{
    const res: response = await baseURL.get(`/cart/`,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
     );
    return res; // Assuming you want to return the data from the response
  }catch(err){
    console.log(err);
    return {
      status: 'error',
      data: err,
      message: 'An error occurred',
    };
  }
};

export const addToCart = async (access_token: string, productId: string, quantity:number): Promise<response> => {
  try{
    const res: response = await baseURL.post(`/cart/`,
      {
        productId :productId,
        quantity: quantity
      },
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res; // Assuming you want to return the data from the response

  }catch(err){
    console.log(err);
    return {
      status: 'error',
      data: err,
      message: 'An error occurred',
    };
  }
};

export const updateCart = async (access_token: string, productId: string, quantity:number): Promise<response> => {
  try{
    const res: response = await baseURL.put(`/cart/`,
      {
        productId: productId,
        quantity: quantity
      },
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      },
    )
    return res; 
  }catch(err){
    console.log(err);
    return {
      status: 'error',
      data: err,
      message: 'An error occurred',
    };
  }
}


export const removeFromCart = async (access_token: string, productId: string): Promise<response> => {
  try{
    const res: response = await baseURL.delete(`/cart/${productId}`,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res; // Assuming you want to return the data from the response
  }catch(err){
    console.log(err);
    return {
      status: 'error',
      data: err,
      message: 'An error occurred',
    };
  }
}




