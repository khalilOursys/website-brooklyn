import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";

// Ensure localStorage is only accessed in the browser
let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("x-access-token");
}

export const addOrder = createAsyncThunk("order/addOrder", async (payload) => {
  const response = await fetch(`${Configuration.BACK_BASEURL}orders`, {
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

export const editOrder = createAsyncThunk(
  "order/editOrder",
  async (payload) => {
    const { id, ...orderData } = payload; // Extract `id` from payload and keep the rest as `orderData`

    /* if (!token) {
    throw new Error("No token found in localStorage");
  } */

    const response = await fetch(`${Configuration.BACK_BASEURL}orders/${id}`, {
      method: "PUT", // Use PUT for updating
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
      body: JSON.stringify(orderData), // Send only the order data (without `id`) in the body
    });

    if (!response.ok) {
      throw new Error("Failed to update order");
    }

    return response.json();
  }
);

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const response = await fetch(
    `${Configuration.BACK_BASEURL}orders/getOrderType/0`,
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
});

export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (id) => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}orders/getOrderById/${id}`,
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

//bulk order
export const fetchOrdersBulk = createAsyncThunk(
  "order/fetchOrdersBulk",
  async () => {
    const response = await fetch(
      `${Configuration.BACK_BASEURL}orders/getOrderType/1`,
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
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    profilUpdated(state, action) {
      fetch(`${Configuration.BACK_BASEURL}order/updateProfile`, {
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
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = [...state.entities, action.payload];
      })
      .addCase(getOrderById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { profilUpdated } = ordersSlice.actions;
export default ordersSlice.reducer;
