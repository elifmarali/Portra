import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IPortfolioCurrentPage {
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
export const currentStep = (state : {portfolioCurrentPage : IPortfolioCurrentPage}) => state.portfolioCurrentPage.currentStep;