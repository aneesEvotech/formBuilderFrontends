import axios from "axios";

export const handleRequest = async (requestPromise) => {
  try {
    const { data } = await requestPromise;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred";
      throw new Error(msg);
    }
    throw error;
  }
};
