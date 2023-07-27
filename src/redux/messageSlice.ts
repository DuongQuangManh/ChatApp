import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { FriendModel, MessageModel } from '../models'
import { MESS_ADD, MESS_GET } from '../utils'

export const getMessage = createAsyncThunk('messageSlice/get',async ({id}:any)=>{
    const res= await fetch(`${MESS_GET}/${id}`,{
        method:"GET",
    });
    if(res.status === 200){
        const data =await res.json();
        return data;
    }else{
        return {error:"Lỗi"}
    }
})

export const addMessage = createAsyncThunk("messageSlice/add",async({obj}:any)=>{
    const res =await fetch(`${MESS_ADD}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(obj)
    });
    if(res.status === 200){
        const data = await res.json();
        return data;
    }else{
        return {error:"Lôi"};
    }
})
const initialState={
    data:[] as MessageModel[],
    roomPick:{
        _id:"",
        user_id:"",
        friend_id:"",
    }as FriendModel,
    error:"" as string |undefined,
    loading:false,
}

const messageSlice = createSlice({
    name:"messageSlice",
    initialState,
    reducers:{
        setRoomChat:(state,action)=>{
            state.roomPick = action.payload
        }
    },
    extraReducers:builder=>{
        builder.addCase(getMessage.pending,state=>{
            state.loading = true;
        }).addCase(getMessage.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload.data;
        }).addCase(getMessage.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        }).addCase(addMessage.pending,state=>{
            state.loading = true;
        }).addCase(addMessage.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload.data;
        }).addCase(addMessage.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const {setRoomChat} = messageSlice.actions;
export default messageSlice.reducer;