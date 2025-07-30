"use client";
import { ICity, ICountry, ICreatePortfolio, IDistrict } from "@/app/createPortfolio/IProps";
import CustomizedHook from "@/components/Autocompleted";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { FormControl, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Step1() {
  const formik = useFormikContext<ICreatePortfolio>();
  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);
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
    formik.setFieldValue("country", selectedCountryState);
    formik.setFieldValue("city", null);
    formik.setFieldValue("district", null);
    setCityListState([]);
    if (selectedCountryState) {
      getCityList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountryState]);

  useEffect(() => {
    formik.setFieldValue("city", selectedCityState);
    formik.setFieldValue("district", null);
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
    formik.setFieldValue("district", selectedDistrictState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrictState]);

  useEffect(() => {
    if (formik.values.country) {
      setSelectedCountryState(formik.values.country);
    }
    if (formik.values.city) {
      setSelectedCityState(formik.values.city);
    }
    if (formik.values.district) {
      setSelectedDistrictState(formik.values.district);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Grid size={12}>
        <Typography sx={{ color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }}
          variant="h4">
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
        <FormControl className="portfolioLabel">Ülke <span className="labelRequired">*</span></FormControl>
        <CustomizedHook
          type="country"
          list={countryListState}
          selectedCountry={selectedCountryState}
          setSelectedCountry={setSelectedCountryState}
          setSelectedCity={setSelectedCityState}
          setSelectedDistrict={setSelectedDistrictState}
          errorText={selectedCountryState === null && formik.touched.country && formik.errors.country}
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
        <FormControl className="portfolioLabel">İl <span className="labelRequired">*</span></FormControl>
        <CustomizedHook
          type="city"
          list={cityListState}
          selectedCity={selectedCityState}
          setSelectedCity={setSelectedCityState}
          setSelectedDistrict={setSelectedDistrictState}
          errorText={selectedCityState === null && formik.touched.city && formik.errors.city}
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
        <FormControl className="portfolioLabel">İlçe <span className="labelRequired">*</span></FormControl>
        <CustomizedHook
          type="district"
          list={districtListState}
          selectedDistrict={selectedDistrictState}
          setSelectedDistrict={setSelectedDistrictState}
          errorText={selectedDistrictState === null && formik.touched.district && formik.errors.district}
        />
      </Grid>
    </>
  );
}

export default Step1;
