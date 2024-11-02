// client\src\dataProviders\products.js
import axiosInstance from "../configs/axios";

export async function getProducts(params = {}) {
  try {
    console.log("Fetching products with params:", params);
    const queryString = new URLSearchParams();
    
    // Добавяне на параметрите към URL
    Object.entries(params).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        queryString.append(key, value);
      }
    });

    const url = `/products?${queryString.toString()}`;
    console.log("Request URL:", url);
    
    const res = await axiosInstance.get(url);
    console.log("Products response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
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

export async function favoriteProduct(id) {
  try {
    const res = await axiosInstance.get(`/favorite/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function comment(id, comment) {
  console.log(comment);
  try {
    const res = await axiosInstance.post(`/comment/${id}`, comment);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getLatestProducts() {
  try {
    const res = await axiosInstance.get("/latest-products");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchProducts({ query, page = 1, limit = 10, sortBy = "createdAt", order = "desc", filters = {} }) {
  try {
    // Премахваме филтрите със стойност null, undefined или NaN
    const validFilters = {};
    for (const key in filters) {
      const value = filters[key];
      if (value !== null && value !== undefined && !Number.isNaN(value) && value !== "") {
        validFilters[key] = value;
      }
    }

    const params = new URLSearchParams({
      q: query,
      page,
      limit,
      sortBy,
      order,
      ...validFilters
    });

    const res = await axiosInstance.get(`/search?${params.toString()}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
