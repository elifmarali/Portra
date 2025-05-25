"use client";
import { ICity, ICountry, IDistrict, IJob } from "@/app/createPortfolio/IProps";
import { IListMultiple } from "@/components/AutocomplatedMultiple";
import CustomizedHook, { IList } from "@/components/Autocompleted";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import {
  createPortfolio,
  updateForms,
} from "@/lib/redux/features/createPortfolio/createPortfolioSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { FormControl, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Step1() {
  const color = useSelector(selectColor);
  const dispatch = useDispatch();
  const { country, city, district } = useSelector(createPortfolio);
  const [selectedCountryState, setSelectedCountryState] =
    useState<ICountry | null>(null);
  const [countryListState, setCountryListState] = useState<ICountry[] | []>([]);
  const [cityListState, setCityListState] = useState<ICity[] | []>([]);
  const [selectedCityState, setSelectedCityState] = useState<ICity | null>(
    null
  );
  const [districtListState, setDistrictListState] = useState<IDistrict[] | []>(
    []
  );
  const [selectedDistrictState, setSelectedDistrictState] =
    useState<IDistrict | null>(null);

  const initialValues = {
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

  useEffect(() => {
    getCountryList();
  }, []);

  const getCountryList = async () => {
    const res = await axios.get("/api/countryList");
    if (res.status === 200) {
      setCountryListState(res.data.data);
    } else {
      setCountryListState([]);
    }
  };

  useEffect(() => {
    dispatch(updateForms({ country: selectedCountryState }));
    dispatch(updateForms({ city: "" }));
    dispatch(updateForms({ district: "" }));
    setCityListState([]);
    if (selectedCountryState) {
      getCityList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountryState]);

  useEffect(() => {
    dispatch(updateForms({ city: selectedCityState }));
    dispatch(updateForms({ district: "" }));
    setDistrictListState([]);
    if (selectedCityState) {
      getDistrict();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCityState]);

  const getCityList = async () => {
    const res = await axios.get("/api/cityList", {
      params: {
        country_id: selectedCountryState?.id,
      },
    });
    if (res.status === 200) {
      setCityListState(res.data.data);
    } else {
      setCityListState([]);
    }
  };

  const getDistrict = async () => {
    const res = await axios.get("/api/districtList", {
      params: {
        city_id: selectedCityState?.id,
      },
    });
    if (res.status === 200) {
      setDistrictListState(res.data.data);
    } else {
      setDistrictListState([]);
    }
  };

  useEffect(() => {
    dispatch(updateForms({ district: selectedDistrictState }));
  }, [selectedDistrictState]);

  return (
    <>
      <Grid size={12}>
        <Typography sx={{ color: colorOptions[color].light }} variant="h4">
          Lokasyon
        </Typography>
      </Grid>
      {/* Ülke */}
      <Grid
        size={{ xs: 12, sm: 12, md: 6 }}
        display="flex"
        alignItems="start"
        justifyContent="space-between"
        sx={{ marginTop: 4 }}
      >
        <FormControl className="portfolioLabel">Ülke</FormControl>
        <CustomizedHook
          type="country"
          list={countryListState}
          selectedCountry={selectedCountryState}
          setSelectedCountry={setSelectedCountryState}
          setSelectedCity={setSelectedCityState}
          setSelectedDistrict={setSelectedDistrictState}
        />
      </Grid>
      {/* İl */}
      <Grid
        size={{ xs: 12, sm: 12, md: 6 }}
        display="flex"
        alignItems="start"
        justifyContent="space-between"
        sx={{ marginTop: 4 }}
      >
        <FormControl className="portfolioLabel">İl</FormControl>
        <CustomizedHook
          type="city"
          list={cityListState}
          selectedCity={selectedCityState}
          setSelectedCity={setSelectedCityState}
          setSelectedDistrict={setSelectedDistrictState}
        />
      </Grid>
      {/* İlçe */}
      <Grid
        size={{ xs: 12, sm: 12, md: 6 }}
        display="flex"
        alignItems="start"
        justifyContent="space-between"
        sx={{ marginTop: 4 }}
      >
        <FormControl className="portfolioLabel">İlçe</FormControl>
        <CustomizedHook
          type="district"
          list={districtListState}
          selectedDistrict={selectedDistrictState}
          setSelectedDistrict={setSelectedDistrictState}
        />
      </Grid>
    </>
  );
}

export default Step1;
