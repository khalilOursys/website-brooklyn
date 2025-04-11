import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";

// Ensure localStorage is only accessed in the browser
let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("x-access-token");
}

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (payload) => {
    const response = await fetch(`${Configuration.BACK_BASEURL}categories`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  }
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async (payload) => {
    const { id, ...categoryData } = payload; // Extract `id` from payload and keep the rest as `categoryData`

    /* if (!token) {
    throw new Error("No token found in localStorage");
  } */

    const response = await fetch(
      `${Configuration.BACK_BASEURL}categories/${id}`,
      {
        method: "PUT", // Use PUT for updating
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token
        },
        body: JSON.stringify(categoryData), // Send only the category data (without `id`) in the body
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update category");
    }

    return response.json();
  }
);

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await fetch(`${Configuration.BACK_BASEURL}categories`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
    });
    return response.json();
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (id) => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}categories/getCategoryById/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token
        },
      }
    );
    return response.json();
  }
);

// Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    profilUpdated(state, action) {
      fetch(`${Configuration.BACK_BASEURL}category/updateProfile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token || "",
        },
        body: JSON.stringify(action.payload),
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = [...state.entities, action.payload];
      })
      .addCase(getCategoryById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { profilUpdated } = categoriesSlice.actions;
export default categoriesSlice.reducer;
