import { createSlice } from "@reduxjs/toolkit";
import { getAllorders } from "../actions/ordersAction";
import { toast } from "react-toastify"; // Import toast

const initialState = {
  isloading: false,
  orders: null,
  isError: false,
  message: null,
  isSuccess: null,
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllorders.pending, (state) => {
        state.isloading = true;
        state.isSuccess = null;
        state.isError = false;
      })
      .addCase(getAllorders.fulfilled, (state, action) => {
        state.isloading = false;
        state.orders = action.payload;
        state.isSuccess = true;
        state.isError = false;
        toast.success("All orders fetched successfully", {
          position: "top-center",
        });
      })
      .addCase(getAllorders.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload; // Use payload instead of action.error
        toast.error(action.payload || "Failed to fetch orders", {
          position: "top-center",
        });
      });
  },
});

export default OrderSlice.reducer;
