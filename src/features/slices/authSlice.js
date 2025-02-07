import { createSlice } from "@reduxjs/toolkit";

import { PURGE } from "redux-persist";
import { toast } from "sonner";
import { adminLogin, getAlluser } from "../actions/authActions";

const initialState = {
  isLoading: false,
  isAdminLoggedIn: false,
  isError: false,
  message: null,
  isSuccess: false,
  user:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.isUserLoggedIn = false;
      state.adminInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, { position: "top-center" });
      }),
      builder.addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isAdminLoggedIn = true;
        state.message = "";
        toast.success("Login Successful!!", { position: "top-center" });
      });

    builder.addCase(PURGE, () => {
      return initialState;
    }),

    builder.addCase(getAlluser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getAlluser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, { position: "top-center" });
      }),
      builder.addCase(getAlluser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user=action.payload;
        state.message = "";
        toast.success("Login Successful!!", { position: "top-center" });
      });

  },
  
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
