import baseURL from "./Customize-axios";
interface response {
  status: string | number;
  data: any; // Replace with the correct type for your data
  documentType: string,
  modelAnswer: string,
  message: string;
  access_token: string;
  refresh_token: string;
}

export const loginUser = async (data: any) => {
  const res: response = await baseURL.post(`/user/login`, data);
  return res; // Assuming you want to return the data from the response
};

export const registerUser = async (data: any) => {
  const res = await baseURL.post(`/user/register`, data);
  return res; // Assuming you want to return the data from the response
};

export const getDetailsUser = async (id: string): Promise<response> => {
  const res: response = await baseURL.get(`/user/get-detail-user/${id}` );
  return res; // Assuming you want to return the data from the response
};


export const sendQuestion = async (question: string, repository_name:string): Promise<response>=> {
  console.log(question, "question");
  console.log(repository_name, "repository_name");
  const res: response = await baseURL.post(`/user/search/${repository_name}`, {
    question: question,
  } );
  return res; 
};