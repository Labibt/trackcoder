import axios from "axios";
import { baseUri } from "../data/constantLink";

export const pingServer = async () => {
  try {
    const response = await axios.get(`${baseUri}/`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error pinging server:", error);
    throw error;
  }
}; 