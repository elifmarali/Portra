import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IColor{
    color:string;
};

const initialState:IColor = {
    color:"blue"
};

export const colorSlice = createSlice({
    name:"color",
    initialState,
    reducers:{
        changeColor: (state,action : PayloadAction<string>) => {
            state.color = action.payload;
        }
    }
});


export const {changeColor} = colorSlice.actions;
export const colorReducer = colorSlice.reducer;
export const selectColor = (state: { color: IColor }) => state.color.color;
