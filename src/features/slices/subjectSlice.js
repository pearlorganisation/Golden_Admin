import { createSlice } from "@reduxjs/toolkit";

import { toast } from "sonner";
import {
  deleteSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
} from "../actions/subjectActions";

const initialState = {
  isLoading: false,
  subjects: null,
  singleSubject: null,
  pagination: null,
  isError: false,
  message: null,
  isSuccess: false,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  extraReducers: (builder) => {
    // all subjects
    builder.addCase(getAllSubjects.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getAllSubjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, { position: "top-center" });
      }),
      builder
        .addCase(getAllSubjects.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.subjects = action.payload.data;
          state.pagination = action.payload.pagination;
          state.message = "";
          toast.success("Subjects Fetched Successfully", {
            position: "top-center",
          });
        })

        // get single subject
        .addCase(getSingleSubject.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getSingleSubject.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.singleSubject = action.payload;

          toast.success("Subject Fetched Successfully", {
            position: "top-center",
          });
        })
        .addCase(getSingleSubject.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(updateSubject.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateSubject.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.isUpdated = true;
          state.singleSubject = action.payload;
          toast.success("Subject Updated Successfully", {
            position: "top-center",
          });
        })
        .addCase(updateSubject.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          toast.error(action.error, {
            position: "top-center",
          });
        })

        // delete subject

        .addCase(deleteSubject.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteSubject.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.isDeleted = true;
          state.singleSubject = action.payload;
          toast.success("Subject Deleted Successfully", {
            position: "top-center",
          });
        })
        .addCase(deleteSubject.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          toast.error(action.error, {
            position: "top-center",
          });
        });
  },
});

export default subjectSlice.reducer;
