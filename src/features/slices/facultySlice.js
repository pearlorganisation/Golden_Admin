import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { CreateFaculty } from "../actions/facultyAction";




const initialState={
    isLoading:false,
   faculty:null,
   pagination:null,
   isError:false,
   message:null,
   isSuccess:false
}


const facultySlice = createSlice({
    name:"faculty",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(CreateFaculty.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(CreateFaculty.fulfilled,(state,action)=>{
   state.isLoading=false;
   state.isError=false;
   state.isSuccess=true;
   toast.success("Subject Fetched Successfully", {
    position: "top-center",
  });

        })
        .addCase(CreateFaculty.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
          })


    }
})

export default facultySlice.reducer;









