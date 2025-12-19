import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Ensure localStorage is only accessed in the browser
let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("x-access-token");
}

export const addHeroBanner = createAsyncThunk(
  "brand/addHeroBanner",
  async (payload) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}hero-banner`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token
        },
        body: JSON.stringify(payload),
      }
    );
    return response.json();
  }
);

export const editHeroBanner = createAsyncThunk(
  "brand/editHeroBanner",
  async (payload) => {
    const { id, ...brandData } = payload; // Extract `id` from payload and keep the rest as `brandData`

    /* if (!token) {
    throw new Error("No token found in localStorage");
  } */

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}hero-banner/${id}`,
      {
        method: "PUT", // Use PUT for updating
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token
        },
        body: JSON.stringify(brandData), // Send only the brand data (without `id`) in the body
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update brand");
    }

    return response.json();
  }
);

export const fetchHeroBanner = createAsyncThunk(
  "brand/fetchHeroBanner",
  async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}hero-banner`,
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

export const getHeroBannerById = createAsyncThunk(
  "hero-banner/getHeroBannerById",
  async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}hero-banner/getHeroBannerById/${id}`,
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

export const toggleHeroBannerStatus = createAsyncThunk(
  "hero-banner/toggleStatus",
  async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}hero-banner/toggle-status/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to toggle hero-banner status");
    }

    const result = await response.json();
    return { id, isActive: result.isActive };
  }
);
// Slice
const heroBannerSlice = createSlice({
  name: "hero-banner",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    profilUpdated(state, action) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}brand/updateProfile`, {
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
      .addCase(getHeroBannerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHeroBannerById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = [...state.entities, action.payload];
      })
      .addCase(getHeroBannerById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { profilUpdated } = heroBannerSlice.actions;
export default heroBannerSlice.reducer;
