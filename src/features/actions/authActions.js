import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

export const adminLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        `/v1/auth/login`,
        { email, password },
        config
      );

      console.log(data, "asdasdasdasddasdasdasdasd");

      return data.data;
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



 export const getAlluser= createAsyncThunk("get/alluser",
  async(_,{rejectWithValue})=>{
    try{
      const  config ={
        headers:{
          "Content-Type":"application/json"
        }
      }
const response = await axiosInstance.get("/v1/auth/get-users",config)
return response.data
    }catch(error){
      if(error.response && error.response.data.message){
        toast.error(error.response && error.response.data.message)
      return rejectWithValue(error.response && error.response.data.message)}
        else{      
      toast.error(error.message);
      return rejectWithValue(error.message);}
    }
  }
 )
