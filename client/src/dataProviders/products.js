// client\src\dataProviders\products.js
import axiosInstance from "../configs/axios";

export async function getProducts(type) {
  try {
    const res = await axiosInstance.get(`/${type}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getProduct(id) {
  try {
    const res = await axiosInstance.get(`/details/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addProduct(productData) {
  try {
    const res = await axiosInstance.post("/add", productData);
    return res.data;
  } catch (error) {
    let backendError = error.response.data.error;
    return { error: backendError };
  }
}

export async function editProduct(productData, id) {
  try {
    const res = await axiosInstance.post(`/edit/${id}`, productData);
    return res.data;
  } catch (error) {
    let backendError = error.response.data.error;
    return { error: backendError };
  }
}

export async function deleteProduct(id) {
  try {
    const res = await axiosInstance.get(`/delete/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function likeProduct(id) {
  try {
    const res = await axiosInstance.get(`/vote-up/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function dislikeProduct(id) {
  try {
    const res = await axiosInstance.get(`/vote-down/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
