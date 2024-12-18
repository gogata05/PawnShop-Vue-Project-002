// client\src\dataProviders\products.js
import axiosInstance from "../configs/axios";

export async function getProducts(params = {}) {
  try {
    console.log("Fetching products with params:", params);
    const queryString = new URLSearchParams();

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
    if (error.response?.status === 500 || !error.response) {
      // window.location.href = "/server-error";
      return;
    }
    return null;
  }
}

export async function getProduct(id) {
  try {
    console.log("Fetching product details for ID:", id);
    const res = await axiosInstance.get(`/details/${id}`);

    if (res.data.isInFavorites !== undefined) {
      const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts") || "{}");
      favoriteProducts[id] = res.data.isInFavorites;
      localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
    }

    console.log("Product details response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
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

export async function getTop10Products() {
  try {
    console.log("Fetching top 10 products");
    const res = await axiosInstance.get("/top-10");
    console.log("Top 10 response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching top 10 products:", error);
    return null;
  }
}

export async function toggleFavorite(id) {
  try {
    console.log("Toggling favorite for product:", id);
    const res = await axiosInstance.post(`/products/favorites/toggle/${id}`);
    console.log("Toggle response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return null;
  }
}
