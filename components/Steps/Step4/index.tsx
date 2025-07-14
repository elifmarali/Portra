"use client";
import "./style.css";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import {
  ICityWorkExperience,
  ICountry,
  ICountryWorkExperience,
  ICreatePortfolio,
  IWorkExperiences,
} from "@/app/createPortfolio/IProps";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import CustomizedHook from "@/components/Autocompleted";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function Step4() {
  const formik = useFormikContext<ICreatePortfolio>();
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);
  const workExperienceErrors = formik.errors.workExperiences as
    | FormikErrors<IWorkExperiences>[]
    | undefined;
  const workExperienceTouched = formik.touched.workExperiences as Array<
    FormikTouched<IWorkExperiences> | undefined
  >;

  const [countryListState, setCountryListState] = useState<ICountry[]>([]);
  const [cityListState, setCityListState] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [selectedCountryWorkExperience, setSelectedCountryWorkExperience] =
    useState<ICountryWorkExperience[]>([]);
  const [selectedCityWorkExperience, setSelectedCityWorkExperience] = useState<
    ICityWorkExperience[]
  >([]);

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

  const handleCountryChange = async (
    country: ICountry | null,
    workItemIndex: number
  ) => {
    const updatedCountry = [...selectedCountryWorkExperience];
    const idx = updatedCountry.findIndex(
      (item) => item.workExperienceId === workItemIndex
    );

    if (country === null) {
      if (idx !== -1) updatedCountry.splice(idx, 1);

      setSelectedCityWorkExperience((prev) => {
        if (!Array.isArray(prev)) return [];
        const newArr = [...prev];
        newArr.splice(workItemIndex, 1);
        return newArr;
      });
      setCityListState((prev) => {
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
        const res = await axios.get("/api/cityList", {
          params: { country_id: country.id },
        });
        if (res.status === 200) {
          setCityListState((prev) => {
            if (!Array.isArray(prev)) return [];
            const newArr = [...prev];
            newArr[workItemIndex] = res.data.data;
            return newArr;
          });
        } else {
          setCityListState((prev) => {
            if (!Array.isArray(prev)) return [];
            const newArr = [...prev];
            newArr[workItemIndex] = [];
            return newArr;
          });
        }
      } catch {
        setCityListState((prev) => {
          if (!Array.isArray(prev)) return [];
          const newArr = [...prev];
          newArr[workItemIndex] = [];
          return newArr;
        });
      }
    }

    setSelectedCountryWorkExperience(updatedCountry);
    setSelectedCityWorkExperience((prev: any) => {
      // eslint-disable-line @typescript-eslint/no-explicit-any
      if (!Array.isArray(prev)) return [];
      const newArr = [...prev];
      newArr[workItemIndex] = null;
      return newArr;
    });

    formik.setFieldValue(
      `workExperiences[${workItemIndex}].country`,
      country?.name || ""
    );
    formik.setFieldValue(`workExperiences[${workItemIndex}].city`, "");
  };

  const handleCityChange = (
    city: ICityWorkExperience | null,
    workItemIndex: number
  ) => {
    setSelectedCityWorkExperience((prev: any) => {
      // eslint-disable-line @typescript-eslint/no-explicit-any
      if (!Array.isArray(prev)) return [];
      const newArr = [...prev];
      newArr[workItemIndex] = city;
      return newArr;
    });

    formik.setFieldValue(
      `workExperiences[${workItemIndex}].city`,
      city?.name || ""
    );
  };

  return (
    <>
      <Grid size={12}>
        <Typography
          sx={{
            color:
              theme === "dark"
                ? colorOptions[color].light
                : colorOptions[color].dark,
          }}
          variant="h4"
        >
          İş Deneyimi
        </Typography>
      </Grid>
      {formik.values.workExperiences.map(
        (workItem: IWorkExperiences, workItemIndex) => (
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
            <Grid
              size={{ xs: 12, sm: 12, md: 6 }}
              display="flex"
              alignItems="start"
              sx={{ marginTop: 4 }}
            >
              <FormControl className="portfolioLabel">
                Pozisyon <span className="labelRequired">*</span>
              </FormControl>
              <TextField
                name={`workExperiences[${workItemIndex}].position`}
                id={`position-${workItemIndex}`}
                value={formik.values.workExperiences[workItemIndex].position}
                onChange={formik.handleChange}
                className="portfolioInput"
                helperText={
                  workExperienceTouched?.[workItemIndex]?.position &&
                  workExperienceErrors?.[workItemIndex]?.position
                }
                error={Boolean(
                  workExperienceTouched?.[workItemIndex]?.position &&
                    workExperienceErrors?.[workItemIndex]?.position
                )}
              />
            </Grid>
            <Grid
              size={{ xs: 12, sm: 12, md: 6 }}
              display="flex"
              alignItems="start"
              sx={{ marginTop: 4 }}
            >
              <FormControl className="portfolioLabel">
                Firma Adı <span className="labelRequired">*</span>
              </FormControl>
              <TextField
                name={`workExperiences[${workItemIndex}].title`}
                id={`title-${workItemIndex}`}
                value={formik.values.workExperiences[workItemIndex].title}
                onChange={formik.handleChange}
                className="portfolioInput"
                helperText={
                  workExperienceTouched?.[workItemIndex]?.title &&
                  workExperienceErrors?.[workItemIndex]?.title
                }
                error={Boolean(
                  workExperienceTouched?.[workItemIndex]?.title &&
                    workExperienceErrors?.[workItemIndex]?.title
                )}
              />
            </Grid>
            {/* Çalışma Şekli */}
            <Grid
              size={{ xs: 12, sm: 12, md: 12 }}
              display="flex"
              alignItems="start"
              justifyContent="space-between"
              sx={{ marginTop: 4, width: "98% !important" }}
            >
              <FormControl
                className="portfolioLabel"
                sx={{
                  width: {
                    xs: "89% !important",
                    sm: "89% !important",
                    md: "220% !important",
                  },
                }}
              >
                Çalışma Şekli <span className="labelRequired">*</span>
              </FormControl>
              <RadioGroup
                row
                className="portfolioRadio"
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: {
                    xs: "220% !important",
                    sm: "220% !important",
                    md: "2000% !important",
                  },
                }}
                name={`workExperiences[${workItemIndex}].workingMethod`}
                value={
                  formik.values.workExperiences[workItemIndex].workingMethod
                }
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="remote"
                  control={<Radio />}
                  label="Remote"
                />
                <FormControlLabel
                  value="hibrit"
                  control={<Radio />}
                  label="Hibrit"
                />
                <FormControlLabel
                  value="ofisten"
                  control={<Radio />}
                  label="Ofisten"
                />
              </RadioGroup>
            </Grid>
            {/* Ülke - İl */}
            {(formik.values.workExperiences[workItemIndex].workingMethod ===
              "hibrit" ||
              formik.values.workExperiences[workItemIndex].workingMethod ===
                "ofisten") && (
              <>
                <Grid
                  size={{ xs: 12, sm: 12, md: 6 }}
                  display="flex"
                  alignItems="start"
                  justifyContent="space-between"
                  sx={{ marginTop: 4 }}
                >
                  <FormControl className="portfolioLabel">
                    Ülke <span className="labelRequired">*</span>
                  </FormControl>
                  <CustomizedHook
                    type="countryWorkExperience"
                    list={countryListState}
                    selectedCountryWorkExperience={
                      selectedCountryWorkExperience.find(
                        (item) => item.workExperienceId === workItemIndex
                      ) || null
                    }
                    setSelectedCountryWorkExperience={(val: ICountry | null) =>
                      handleCountryChange(val, workItemIndex)
                    }
                    setSelectedCityWorkExperience={(
                      val: ICityWorkExperience | null
                    ) => handleCityChange(val, workItemIndex)}
                    workItemIndex={workItemIndex}
                    errorText={
                      formik.touched?.workExperiences?.[workItemIndex]
                        ?.country &&
                      typeof formik.errors?.workExperiences?.[workItemIndex] ===
                        "object" &&
                      (
                        formik.errors?.workExperiences?.[
                          workItemIndex
                        ] as FormikErrors<IWorkExperiences>
                      )?.country
                    }
                  />
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 12, md: 6 }}
                  display="flex"
                  alignItems="start"
                  justifyContent="space-between"
                  sx={{ marginTop: 4 }}
                >
                  <FormControl className="portfolioLabel">
                    İl <span className="labelRequired">*</span>
                  </FormControl>
                  <CustomizedHook
                    type="cityWorkExperience"
                    list={cityListState?.[workItemIndex] ?? []}
                    selectedCityWorkExperience={
                      selectedCityWorkExperience?.[workItemIndex] ?? null
                    }
                    setSelectedCityWorkExperience={(
                      val: ICityWorkExperience | null
                    ) => handleCityChange(val, workItemIndex)}
                    workItemIndex={workItemIndex}
                    errorText={
                      formik.touched?.workExperiences?.[workItemIndex]?.city &&
                      typeof formik.errors?.workExperiences?.[workItemIndex] ===
                        "object" &&
                      (
                        formik.errors?.workExperiences?.[
                          workItemIndex
                        ] as FormikErrors<IWorkExperiences>
                      )?.city
                    }
                  />
                </Grid>
              </>
            )}
            {/* Başlangıç Tarihi */}
            <Grid
              size={{ xs: 12, sm: 12, md: 6 }}
              display="flex"
              alignItems="start"
              sx={{ marginTop: 4 }}
            >
              <FormControl className="portfolioLabel">
                Başlangıç Tarihi <span className="labelRequired">*</span>
              </FormControl>
              <Grid width="90%" display="flex" flexDirection="column">
                <DatePicker
                  sx={{
                    width: "100%",
                    "& .MuiPickersOutlinedInput-notchedOutline ": {
                      borderColor:
                        typeof formik.errors.workExperiences?.[
                          workItemIndex
                        ] === "object" &&
                        (
                          formik.errors.workExperiences?.[
                            workItemIndex
                          ] as FormikErrors<IWorkExperiences>
                        )?.startDate &&
                        formik.touched.workExperiences?.[workItemIndex]
                          .startDate
                          ? "#d32f2f !important"
                          : theme === "dark"
                            ? "#fff !important"
                            : "rgba(0,0,0,0.36) !important",
                    },
                    "& .MuiIconButton-root": {
                      color: theme === "dark" ? "#fff" : "rgba(0,0,0,0.54)",
                    },
                    "& .MuiPickersSectionList-root": {
                      color: theme === "dark" ? "#fff" : "rgba(0,0,0,1)",
                    },
                  }}
                  format="DD/MM/YYYY"
                  value={dayjs(workItem.startDate, "DD/MM/YYYY")}
                  onChange={(newValue) => {
                    formik.setFieldValue(
                      `workExperiences[${workItemIndex}].startDate`,
                      newValue?.format("DD/MM/YYYY")
                    );
                  }}
                />
                {workExperienceErrors?.[workItemIndex].startDate &&
                  workExperienceTouched?.[workItemIndex]?.startDate && (
                    <p
                      className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                      style={{
                        color: "#d32f2f",
                        marginTop: "4px",
                        marginLeft: "14px",
                      }}
                    >
                      {workExperienceErrors?.[workItemIndex].startDate}
                    </p>
                  )}
              </Grid>
            </Grid>
            {/* Bitiş Tarihi */}
            <Grid
              size={{ xs: 12, sm: 12, md: 6 }}
              display="flex"
              alignItems="start"
              sx={{ marginTop: 4 }}
            >
              <FormControl className="portfolioLabel">
                Bitiş Tarihi
                <span className="labelRequired labelRequiredEndDate">
                  ?*
                  <span className="tooltipEndDate">
                    Şu anda burada çalışmıyorsanız bitiş tarihi alanı
                    doldurulmalıdır!
                  </span>
                </span>
              </FormControl>
              <Grid width="90%" display="flex" flexDirection="column">
                <DatePicker
                  sx={{
                    width: "100%",
                    "& .MuiPickersOutlinedInput-notchedOutline ": {
                      borderColor:
                        typeof formik.errors.workExperiences?.[
                          workItemIndex
                        ] === "object" &&
                        (
                          formik.errors.workExperiences?.[
                            workItemIndex
                          ] as FormikErrors<IWorkExperiences>
                        )?.endDate &&
                        formik.touched.workExperiences?.[workItemIndex].endDate
                          ? "#d32f2f !important"
                          : theme === "dark"
                            ? "#fff !important"
                            : "rgba(0,0,0,0.36) !important",
                    },
                    "& .MuiIconButton-root": {
                      color: theme === "dark" ? "#fff" : "rgba(0,0,0,0.54)",
                    },
                    "& .MuiPickersSectionList-root": {
                      color: theme === "dark" ? "#fff" : "rgba(0,0,0,1)",
                    },
                  }}
                  format="DD/MM/YYYY"
                  value={dayjs(workItem.endDate, "DD/MM/YYYY")}
                  onChange={(newValue) => {
                    formik.setFieldValue(
                      `workExperiences[${workItemIndex}].endDate`,
                      newValue?.format("DD/MM/YYYY")
                    );
                  }}
                  disabled={workItem.startDate === null}
                  minDate={
                    typeof workItem.startDate === "string"
                      ? dayjs(workItem.startDate, "DD/MM/YYYY")
                      : undefined
                  }
                />
                {workExperienceErrors?.[workItemIndex].endDate &&
                  workExperienceTouched?.[workItemIndex]?.endDate && (
                    <p
                      className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                      style={{
                        color: "#d32f2f",
                        marginTop: "4px",
                        marginLeft: "14px",
                      }}
                    >
                      {workExperienceErrors?.[workItemIndex].endDate}
                    </p>
                  )}
              </Grid>
            </Grid>
            {/* Açıklama */}
            <Grid
              size={{ xs: 12, sm: 12, md: 12 }}
              display="flex"
              alignItems="start"
              justifyContent="space-between"
              sx={{ marginTop: 4, width: "98% !important" }}
            >
              <FormControl className="portfolioLabel">Açıklama</FormControl>
              <TextField
                className="portfolioInput"
                onChange={formik.handleChange}
                value={workItem.description}
                name={`workExperiences[${workItemIndex}].description`}
                id={`description-${workItemIndex}`}
                rows={4}
                multiline
                sx={{
                  width: {
                    xs: "89% !important",
                    sm: "89% !important",
                    md: "220% !important",
                  },
                }}
              />
            </Grid>
            {/* Şu anda burada çalışıyorum */}
            <Grid
              size={{ xs: 12, sm: 12, md: 12 }}
              display="flex"
              alignItems="start"
              justifyContent="space-between"
              sx={{ marginTop: 4, width: "98% !important" }}
            >
              <FormControl
                className="portfolioLabel"
                sx={{ width: "100% !important" }}
              >
                Şu anda burada çalışıyorum
              </FormControl>
              <Checkbox
                onChange={formik.handleChange}
                value={workItem.isWorking}
                name={`workExperiences[${workItemIndex}].isWorking`}
                id={`isWorking-${workItemIndex}`}
                sx={{
                  color: "var(--label-color)",
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "0px",
                }}
                size="large"
              />
            </Grid>
            <Button
              type="button"
              onClick={() => {
                const newList = [...formik.values.workExperiences];
                newList.splice(workItemIndex, 1);
                formik.setFieldValue("workExperiences", newList);
                // Seçimleri de temizle
                setSelectedCountryWorkExperience((prev) => {
                  if (!Array.isArray(prev)) return [];
                  const updated = [...prev];
                  const idx = updated.findIndex(
                    (item) => item.workExperienceId === workItemIndex
                  );
                  if (idx !== -1) updated.splice(idx, 1);
                  return updated;
                });

                setSelectedCityWorkExperience((prev) => {
                  if (!Array.isArray(prev)) return [];
                  const updated = [...prev];
                  updated.splice(workItemIndex, 1);
                  return updated;
                });

                setCityListState((prev) => {
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
        )
      )}
      <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          sx={{
            fontSize: "30px",
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
          onClick={() => {
            const current = formik.values.workExperiences || [];
            const lastId =
              current.length > 0 ? current[current.length - 1].id + 1 : 1;
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
          {formik.values.workExperiences.length === 0 ? "Yeni Ekle" : "Ekle"}{" "}
          <IoMdAdd fontSize={30} />
        </Button>
      </Grid>
    </>
  );
}

export default Step4;
