import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

export const  CreateFaculty= createAsyncThunk(
    "/faculty",async(userData,{rejectWithValue})=>{
        try{
const response = axiosInstance .post('/faculty',userData)
return response.data
}catch(error){
return rejectWithValue(error.response?.data || "failed to create faculty");
}
}
)
