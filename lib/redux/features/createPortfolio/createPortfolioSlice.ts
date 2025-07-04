import { ICity, ICountry, IDistrict, IJob } from "@/app/createPortfolio/IProps";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  surname: "",
  title: "",
  photo: null,
  shortBiography: "",
  email: "",
  jobs: [],
  otherJob: "",
  country: null,
  city: null,
  district: null,
  skills: [],
};

export const createPortfolioSlice = createSlice({
  name: "createPortfolio",
  initialState,
  reducers: {
    updateForms: (state: any, action) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      const payload = action.payload;
      if ("key" in payload && "value" in payload) {
        state[payload.key] = payload.value;
      } else {
        Object.entries(payload).forEach(([key, value]) => {
          (state as any)[key] = value; // eslint-disable-line @typescript-eslint/no-explicit-any
        });
      }
    },
    submitForms: (state) => {
      console.log("Submit Forms : ", JSON.stringify(state, null, 2));
    },
  },
});

export const createPortfolioReducer = createPortfolioSlice.reducer;
export const { updateForms, submitForms } = createPortfolioSlice.actions;
export const createPortfolio = (state: { createPortfolio: ICreatePortfolio }) =>
  state.createPortfolio;

interface ICreatePortfolio {
  name: string;
  surname: string;
  title: string;
  photo: null | File;
  shortBiography: string;
  email: string;
  jobs: [] | IJob[];
  otherJob: string;
  country: null | ICountry;
  city: null | ICity;
  district: null | IDistrict;
  skills: [] | string[];
}
