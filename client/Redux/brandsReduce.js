import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";

// Ensure localStorage is only accessed in the browser
let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("x-access-token");
}

export const addBrand = createAsyncThunk("brand/addBrand", async (payload) => {
  const response = await fetch(`${Configuration.BACK_BASEURL}brands`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add the Bearer token
    },
    body: JSON.stringify(payload),
  });
  return response.json();
});

export const editBrand = createAsyncThunk(
  "brand/editBrand",
  async (payload) => {
    const { id, ...brandData } = payload; // Extract `id` from payload and keep the rest as `brandData`

    /* if (!token) {
    throw new Error("No token found in localStorage");
  } */

    const response = await fetch(`${Configuration.BACK_BASEURL}brands/${id}`, {
      method: "PUT", // Use PUT for updating
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
      body: JSON.stringify(brandData), // Send only the brand data (without `id`) in the body
    });

    if (!response.ok) {
      throw new Error("Failed to update brand");
    }

    return response.json();
  }
);

export const fetchBrands = createAsyncThunk("brand/fetchBrands", async () => {
  const response = await fetch(`${Configuration.BACK_BASEURL}brands`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add the Bearer token
    },
  });
  return response.json();
});

export const getBrandById = createAsyncThunk(
  "brands/getBrandById",
  async (id) => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}brands/getBrandById/${id}`,
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
const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    profilUpdated(state, action) {
      fetch(`${Configuration.BACK_BASEURL}brand/updateProfile`, {
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
      .addCase(getBrandById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBrandById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = [...state.entities, action.payload];
      })
      .addCase(getBrandById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { profilUpdated } = brandsSlice.actions;
export default brandsSlice.reducer;
