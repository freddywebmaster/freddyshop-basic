import axios from "axios";

export const clientApi = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/"
});
