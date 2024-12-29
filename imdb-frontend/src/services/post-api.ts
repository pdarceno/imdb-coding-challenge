import axios from "axios";
import { movieCache } from "../utils/cache";

// Mock API call
export const mockApiCall = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 750);
  });
};
