import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IPortfolioCurrentPage {
  currentStep: number;
}

const initialState: IPortfolioCurrentPage = {
  currentStep: 0,
};

export const portfolioCurrentPageSlice = createSlice({
  name: "portfolioCurrentPage",
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});


export const {changeCurrentPage} = portfolioCurrentPageSlice.actions;
export const portfolioCurrentPageReducer = portfolioCurrentPageSlice.reducer;
export const currentStep = (state : {currentStep : IPortfolioCurrentPage}) => state.currentStep;