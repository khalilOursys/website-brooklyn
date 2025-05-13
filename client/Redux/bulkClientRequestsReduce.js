import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";

// Ensure localStorage is only accesed in the browser
let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("x-acces-token");
}

// Async Thunks
export const loginFetch = createAsyncThunk(
  "bulkClientRequests/login",
  async (payload) => {
    const response = await fetch(`${Configuration.BACK_BASEURL}auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  }
);

export const addBulkClientRequests = createAsyncThunk(
  "bulkClientRequests/addBulkClientRequests",
  async (payload) => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}bulkClientRequests`,
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

export const editBulkClientRequests = createAsyncThunk(
  "bulkClientRequests/editBulkClientRequests",
  async (payload) => {
    const { id, ...bulkClientRequestsData } = payload; // Extract `id` from payload and keep the rest as `bulkClientRequestsData`

    /* if (!token) {
    throw new Error("No token found in localStorage");
  } */

    const response = await fetch(
      `${Configuration.BACK_BASEURL}bulkClientRequests/${id}`,
      {
        method: "PUT", // Use PUT for updating
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token
        },
        body: JSON.stringify(bulkClientRequestsData), // Send only the bulkClientRequests data (without `id`) in the body
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update bulkClientRequests");
    }

    return response.json();
  }
);

export const fetchBulkClientRequests = createAsyncThunk(
  "bulkClientRequests/fetchBulkClientRequests",
  async () => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}bulkClientRequests`,
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

export const getUserWithBulkRequest = createAsyncThunk(
  "bulkClientRequests/getUserWithBulkRequest",
  async (id) => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}bulkClientRequests/getUserWithBulkRequest/${id}`,
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
const bulkClientRequestsSlice = createSlice({
  name: "bulkClientRequests",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    profilUpdated(state, action) {
      fetch(`${Configuration.BACK_BASEURL}bulkClientRequests/updateProfile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-acces-token": token || "",
        },
        body: JSON.stringify(action.payload),
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBulkClientRequestsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBulkClientRequestsById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = [...state.entities, action.payload];
      })
      .addCase(getBulkClientRequestsById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { profilUpdated } = bulkClientRequestsSlice.actions;
export default bulkClientRequestsSlice.reducer;
