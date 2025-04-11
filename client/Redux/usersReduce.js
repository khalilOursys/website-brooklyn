import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Configuration from "../configuration";

// Ensure localStorage is only accessed in the browser
let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("x-access-token");
}

// Async Thunks
export const loginFetch = createAsyncThunk("user/login", async (payload) => {
  const response = await fetch(`${Configuration.BACK_BASEURL}auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
});

export const addUser = createAsyncThunk("user/addUser", async (payload) => {
  const response = await fetch(`${Configuration.BACK_BASEURL}users`, {
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

export const editUser = createAsyncThunk("user/editUser", async (payload) => {
  const { id, ...userData } = payload; // Extract `id` from payload and keep the rest as `userData`

  /* if (!token) {
    throw new Error("No token found in localStorage");
  } */

  const response = await fetch(`${Configuration.BACK_BASEURL}users/${id}`, {
    method: "PUT", // Use PUT for updating
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add the Bearer token
    },
    body: JSON.stringify(userData), // Send only the user data (without `id`) in the body
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
});

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch(`${Configuration.BACK_BASEURL}users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add the Bearer token
    },
  });
  return response.json();
});

export const getUserById = createAsyncThunk("users/getUserById", async (id) => {
  const response = await fetch(
    `${Configuration.BACK_BASEURL}users/getUserById/${id}`,
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

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    profilUpdated(state, action) {
      fetch(`${Configuration.BACK_BASEURL}user/updateProfile`, {
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
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = [...state.entities, action.payload];
      })
      .addCase(getUserById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { profilUpdated } = usersSlice.actions;
export default usersSlice.reducer;
