"use client";

import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { colorOptions } from '@/lists/color';
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { FormikErrors, useFormikContext } from 'formik';
import { ICity, ICityWorkExperience, ICountry, ICountryWorkExperience, ICreatePortfolio, IWorkExperiences } from '@/app/createPortfolio/IProps';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import CustomizedHook from '@/components/Autocompleted';
import axios from 'axios';

function Step4() {
  const formik = useFormikContext<ICreatePortfolio>();
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);

  const [countryListState, setCountryListState] = useState<ICountry[]>([]);
  const [cityListState, setCityListState] = useState<any[]>([]);
  const [selectedCountryWorkExperience, setSelectedCountryWorkExperience] = useState<ICountryWorkExperience[]>([]);
  const [selectedCityWorkExperience, setSelectedCityWorkExperience] = useState<ICityWorkExperience[]>([]);

  useEffect(() => {
    console.log("workExperience : ", formik.values.workExperiences);
  }, [formik.values.workExperiences]);

  useEffect(() => {
    getCountryList();
  }, []);

  const getCountryList = async () => {
    try {
      const res = await axios.get("/api/countryList");
      if (res.status === 200) {
        setCountryListState(res.data.data);
      } else {
        setCountryListState([]);
      }
    } catch {
      setCountryListState([]);
    }
  };

  const handleCountryChange = async (country: ICountry | null, workItemIndex: number) => {
    const updatedCountry = [...selectedCountryWorkExperience];
    const idx = updatedCountry.findIndex(item => item.workExperienceId === workItemIndex);

    if (country === null) {
      if (idx !== -1) updatedCountry.splice(idx, 1);

      setSelectedCityWorkExperience(prev => {
        if (!Array.isArray(prev)) return [];
        const newArr = [...prev];
        newArr.splice(workItemIndex, 1);
        return newArr;
      });
      setCityListState(prev => {
        if (!Array.isArray(prev)) return [];
        const newArr = [...prev];
        newArr.splice(workItemIndex, 1);
        return newArr;
      });
    } else {
      const newCountry: ICountryWorkExperience = {
        id: country.id,
        name: country.name,
        workExperienceId: workItemIndex,
      };

      if (idx !== -1) updatedCountry[idx] = newCountry;
      else updatedCountry.push(newCountry);

      try {
        const res = await axios.get("/api/cityList", { params: { country_id: country.id } });
        if (res.status === 200) {
          setCityListState(prev => {
            if (!Array.isArray(prev)) return [];
            const newArr = [...prev];
            newArr[workItemIndex] = res.data.data;
            return newArr;
          });
        } else {
          setCityListState(prev => {
            if (!Array.isArray(prev)) return [];
            const newArr = [...prev];
            newArr[workItemIndex] = [];
            return newArr;
          });
        }
      } catch {
        setCityListState(prev => {
          if (!Array.isArray(prev)) return [];
          const newArr = [...prev];
          newArr[workItemIndex] = [];
          return newArr;
        });
      }
    }

    setSelectedCountryWorkExperience(updatedCountry);
    setSelectedCityWorkExperience((prev: any) => {
      if (!Array.isArray(prev)) return [];
      const newArr = [...prev];
      newArr[workItemIndex] = null;
      return newArr;
    });

    formik.setFieldValue(`workExperiences[${workItemIndex}].country`, country?.name || "");
    formik.setFieldValue(`workExperiences[${workItemIndex}].city`, "");
  };

  const handleCityChange = (city: ICityWorkExperience | null, workItemIndex: number) => {
    setSelectedCityWorkExperience((prev: any) => {
      if (!Array.isArray(prev)) return [];
      const newArr = [...prev];
      newArr[workItemIndex] = city;
      return newArr;
    });

    formik.setFieldValue(`workExperiences[${workItemIndex}].city`, city?.name || "");
  };

  useEffect(() => {
    console.log("selectedCountryWorkExperience : ", selectedCountryWorkExperience);
  }, [selectedCountryWorkExperience])

  
  useEffect(() => {
    console.log("selectedCityWorkExperience : ", selectedCityWorkExperience);
  }, [selectedCityWorkExperience])

  return (
    <>
      <Grid size={12}>
        <Typography sx={{ color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }} variant="h4">
          İş Deneyimi
        </Typography>
      </Grid>

      {formik.values.workExperiences.map((workItem: IWorkExperiences, workItemIndex) => (
        <Grid
          key={workItemIndex}
          size={12}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            border: `1px solid ${theme === "dark" ? colorOptions[color].light : colorOptions[color].dark}`,
            padding: "30px 20px 20px 20px",
            position: "relative",
          }}
        >
          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" sx={{ marginTop: 4 }}>
            <FormControl className="portfolioLabel">Pozisyon</FormControl>
            <TextField
              name={`workExperiences[${workItemIndex}].position`}
              id={`position-${workItemIndex}`}
              value={formik.values.workExperiences[workItemIndex].position}
              onChange={formik.handleChange}
              className="portfolioInput"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" sx={{ marginTop: 4 }}>
            <FormControl className="portfolioLabel">Firma Adı</FormControl>
            <TextField
              name={`workExperiences[${workItemIndex}].title`}
              id={`title-${workItemIndex}`}
              value={formik.values.workExperiences[workItemIndex].title}
              onChange={formik.handleChange}
              className="portfolioInput"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" sx={{ marginTop: 4 }}>
            <FormControl className="portfolioLabel">Çalışma Şekli </FormControl>
            <RadioGroup
              row
              className="portfolioRadio"
              sx={{ display: "flex", justifyContent: "space-between", width: "89%" }}
              name={`workExperiences[${workItemIndex}].workingMethod`}
              value={formik.values.workExperiences[workItemIndex].workingMethod}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="remote" control={<Radio />} label="Remote" />
              <FormControlLabel value="hibrit" control={<Radio />} label="Hibrit" />
              <FormControlLabel value="ofisten" control={<Radio />} label="Ofisten" />
            </RadioGroup>
          </Grid>

          {/* Ülke */}
          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" justifyContent="space-between" sx={{ marginTop: 4 }}>
            <FormControl className="portfolioLabel">
              Ülke <span className="labelRequired">*</span>
            </FormControl>
            <CustomizedHook
              type="countryWorkExperience"
              list={countryListState}
              selectedCountryWorkExperience={selectedCountryWorkExperience.find(item => item.workExperienceId === workItemIndex) || null}
              setSelectedCountryWorkExperience={(val: ICountry | null) => handleCountryChange(val, workItemIndex)}
              setSelectedCityWorkExperience={(val: ICityWorkExperience | null) => handleCityChange(val, workItemIndex)}
              workItemIndex={workItemIndex}
              errorText={
                formik.touched?.workExperiences?.[workItemIndex]?.country &&
                typeof formik.errors?.workExperiences?.[workItemIndex] === "object" &&
                (formik.errors?.workExperiences?.[workItemIndex] as FormikErrors<IWorkExperiences>)?.country
              }
            />
          </Grid>

          {/* İl */}
          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" justifyContent="space-between" sx={{ marginTop: 4 }}>
            <FormControl className="portfolioLabel">
              İl <span className="labelRequired">*</span>
            </FormControl>
            <CustomizedHook
              type="cityWorkExperience"
              list={cityListState?.[workItemIndex] ?? []}
              selectedCityWorkExperience={selectedCityWorkExperience?.[workItemIndex] ?? null}
              setSelectedCityWorkExperience={(val: ICityWorkExperience | null) => handleCityChange(val, workItemIndex)}
              workItemIndex={workItemIndex}
              errorText={
                formik.touched?.workExperiences?.[workItemIndex]?.city &&
                typeof formik.errors?.workExperiences?.[workItemIndex] === "object" &&
                (formik.errors?.workExperiences?.[workItemIndex] as FormikErrors<IWorkExperiences>)?.city
              }
            />
          </Grid>

          <Button
            type="button"
            onClick={() => {
              const newList = [...formik.values.workExperiences];
              newList.splice(workItemIndex, 1);
              formik.setFieldValue("workExperiences", newList);

              // Seçimleri de temizle
              setSelectedCountryWorkExperience(prev => {
                if (!Array.isArray(prev)) return [];
                const updated = [...prev];
                const idx = updated.findIndex(item => item.workExperienceId === workItemIndex);
                if (idx !== -1) updated.splice(idx, 1);
                return updated;
              });

              setSelectedCityWorkExperience(prev => {
                if (!Array.isArray(prev)) return [];
                const updated = [...prev];
                updated.splice(workItemIndex, 1);
                return updated;
              });

              setCityListState(prev => {
                if (!Array.isArray(prev)) return [];
                const updated = [...prev];
                updated.splice(workItemIndex, 1);
                return updated;
              });
            }}
            sx={{
              backgroundColor: colorOptions["red"].dark,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: 600,
              position: "absolute",
              top: "0px",
              right: "0px",
              fontSize: "14px",
              color: "#fff",
              margin: "10px 20px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Sil
            <IoMdClose />
          </Button>
        </Grid>
      ))}

      <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          sx={{ fontSize: "30px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
          onClick={() => {
            const current = formik.values.workExperiences || [];
            const lastId = current.length > 0 ? current[current.length - 1].id + 1 : 1;
            const newItem: IWorkExperiences = {
              id: lastId,
              position: "",
              title: "",
              workingMethod: "",
              country: "",
              city: "",
              startDate: null,
              endDate: null,
              description: "",
              isWorking: false,
            };
            formik.setFieldValue("workExperiences", [...current, newItem]);
          }}
        >
          {formik.values.workExperiences.length === 0 ? "Yeni Ekle" : "Ekle"} <IoMdAdd fontSize={30} />
        </Button>
      </Grid>
    </>
  );
}

export default Step4;
