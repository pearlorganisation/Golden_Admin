import { createSlice } from "@reduxjs/toolkit"
import { sendPdfByAdmin } from "../actions/sendPdfByAdminAction"
import { toast } from "sonner"

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError:false
}

const createSendPdfSlice = createSlice({
    name:"pdfbyadmin",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(sendPdfByAdmin.pending,state=>{
            state.isLoading= true
            state.isSuccess = false
            state.isError= false
        })
        .addCase(sendPdfByAdmin.rejected,(state,action)=>{
            state.isSuccess= false
            state.isError= true
            state.isLoading= false
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(sendPdfByAdmin.fulfilled, (state,action)=>{
            state.isError= false
            state.isSuccess= true
            state.isLoading= false
            toast.success("PDF sent successfully",{position:"top-right"})
        })
    }
})


export default createSendPdfSlice.reducer