import { clientApi } from "./clientApi";

export const getAllCategories = async () => {
  try {
    const res = await clientApi.get("/categories");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllProducts = async () => {
  try {
    const res = await clientApi.get("/products");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const res = await clientApi.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getProductsByCategory = async (id) => {
  try {
    const res = await clientApi.get(`/categories/${id}/products`);
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
