import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";
import { toast } from "react-toastify";

export const getAllSubjects = createAsyncThunk(
  "/get-all",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(`/subject?page=${page}`, config);

      console.log(data, "subjects API");

      return data;
    } catch (error) {
      console.log("Error", error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSingleSubject = createAsyncThunk(
  "singleSubject/get",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/subject/${id}`);

      console.log(data, "single subject data");
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createSubject = createAsyncThunk(
  "create/subject",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      console.log("-----------", userData);

      userData.pdf;
      userData.banner.forEach((image) => {
        formData.append("banner", image);
      });
      for (const key in userData) {
        if (key !== "banner") {
          formData.append(key, userData[key]);
        }
      }

      const { data } = await axiosInstance.post(`/subject`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Subject Created Successfully");
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

// export const createSubject = createAsyncThunk(
//   "subject/post",
//   async (userdata, thunkAPI) => {
//     console.log("userdata111", userdata);

//     try {
//       const formData = new FormData();

//       formData.append("banner", userdata.banner);

//       for (const key in userdata) {
//         if (key !== "banner") {
//           console.log(key);
//           formData.append(key, userdata[key]);
//         }
//       }

//       const { data } = await axiosInstance.post(`/subject`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log(data, "data alpah");

//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const updateSubject = createAsyncThunk(
  "subject/put",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/subject/${id}`, data);
      console.log(response, "response");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteSubject = createAsyncThunk(
  "subject/delete",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/subject/${id}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
