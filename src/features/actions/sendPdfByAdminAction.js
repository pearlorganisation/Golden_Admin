import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

export const sendPdfByAdmin= createAsyncThunk(
    "send/pdf-byadmin",async(formData, {rejectWithValue})=>{
        try {
            console.log("the form data is ", formData)
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const data = await axiosInstance.post(`/sendpdf`,formData, config);
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)