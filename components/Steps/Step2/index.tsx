"use client";
import { ICreatePortfolio, IJob } from "@/app/createPortfolio/IProps";
import CustomizedHookMultiple, {
  IListMultiple,
} from "@/components/AutocomplatedMultiple";
import { IList } from "@/components/Autocompleted";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { ILanguage, ILanguageArray } from "./IProps";
import { useFormikContext } from "formik";

function Step2() {
  const formik = useFormikContext<ICreatePortfolio>();
  const [otherJobState, setOtherJobState] = useState(formik.values.otherJob);
  const [jobListState, setJobListState] = useState([]);
  const [selectedJobListState, setSelectedJobListState] = useState<
    IListMultiple[] | []
  >(formik.values.jobs);
  const [skillsState, setSkillsState] = useState("");
  const [skillsArrayState, setSkillsArrayState] = useState<String[] | []>([]);
  const [skillLengthAlertState, setSkillLengthAlertState] = useState(false);
  const [languageList, setLanguageList] = useState([]);
  const [selectLanguageArray, setSelectLanguageArray] = useState<ILanguageArray[]>(formik.values.languages);
  const [languageCount, setLanguageCount] = useState(formik.values.languages.length);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const errorText =
    Array.isArray(formik.errors.jobs) && formik.touched.jobs && jobListState.length === 0
      ? formik.errors.jobs.join(", ")
      : typeof formik.errors.jobs === "string" && formik.touched.jobs
        ? formik.errors.jobs
        : "";


  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    getJobList();
    getLanguageList();
  }, []);

  const getJobList = async () => {
    const res = await axios.get("/api/jobList");
    if (res.status === 200) {
      const sorted = res.data.data.sort((a: IJob, b: IJob) => a.id - b.id);
      setJobListState(sorted);
    } else {
      setJobListState([]);
    }
  };

  useEffect(() => {
    formik.setFieldValue("skills", skillsArrayState);
  }, [skillsArrayState]);

  useEffect(() => {
    if (skillsState.length > 50) {
      setSkillLengthAlertState(true);
    } else {
      setSkillLengthAlertState(false);
    }
  }, [skillsState]);

  useEffect(() => {
    formik.setFieldValue("jobs", selectedJobListState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJobListState]);

  useEffect(() => {
    if (selectedJobListState.length > 0) {
      const diğerMevcutMu = selectedJobListState.some(
        (selectedJobItem: IList) => selectedJobItem.name === "Diğer"
      );
      if (!diğerMevcutMu) {
        formik.setFieldValue("otherJob", "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJobListState]);

  const getLanguageList = async () => {
    const res = await axios.get("/api/languageList");
    if (res.data.data.length > 0) {
      setLanguageList(res.data.data);
    }
  }

  useEffect(() => {
    const isFilled = selectLanguageArray.some((item: ILanguageArray) => item.id !== -1 || item.name !== "" || item.level !== "");
    const filteredLanguageList = selectLanguageArray.filter((item: ILanguageArray) => item.id !== -1 || item.name !== "" || item.level !== "");
    if ((selectLanguageArray.length === 1 && isFilled) || selectLanguageArray.length > 1) {
      setShowDeleteButton(true);
      formik.setFieldValue("languages", filteredLanguageList);
    } else {
      setShowDeleteButton(false);
    }
  }, [selectLanguageArray]);

  useEffect(() => {
    if (formik.values.skills) {
      setSkillsArrayState(formik.values.skills);
    }
    if (formik.values.jobs) {
      setSelectedJobListState(formik.values.jobs);
    }
    if (formik.values.languages) {
      setSelectLanguageArray(formik.values.languages);
    }
    if (formik.values.otherJob) {
      setOtherJobState(formik.values.otherJob);
    }
  }, []);

  useEffect(() => {
    setOtherJobState(formik.values.otherJob);
  }, [formik.values.otherJob]);

  useEffect(() => {
    if (selectLanguageArray.length >= 1) {
      setLanguageCount(selectLanguageArray.length);
    }
    else {
      setLanguageCount(1);
    }
  }, [selectLanguageArray]);

  return (
    <>
      <Grid size={12}>
        <Typography sx={{ color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }}
          variant="h4">
          Uzmanlık ve Yetenekler
        </Typography>
      </Grid>
      {/* Uzmanlık Alanı / Meslek */}
      <Grid
        size={{ xs: 12, sm: 12, md: 6 }}
        display="flex"
        alignItems="start"
        sx={{ marginTop: 4 }}
      >
        <FormControl className="portfolioLabel">Meslek / Unvan <span className="labelRequired">*</span></FormControl>
        <CustomizedHookMultiple
          type="job"
          list={jobListState}
          selectedJobList={selectedJobListState}
          setSelectedJobList={setSelectedJobListState}
          errorText={errorText}
        />
      </Grid>
      {/* Diğer Meslek / Unvan */}
      {formik.values.jobs.find((jobItem: IList) => jobItem.name === "Diğer") && (
        <Grid
          size={{ xs: 12, sm: 12, md: 6 }}
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          sx={{ marginTop: 4 }}
        >
          <FormControl className="portfolioLabel">
            Diğer Meslek / Unvan <span className="labelRequired">*</span>
          </FormControl>
          <TextField
            name="otherJob"
            id="otherJob"
            className="portfolioInput"
            value={otherJobState}
            onChange={(e) => {
              setOtherJobState(e.target.value);
              formik.setFieldValue("otherJob", e.target.value);
            }}
            onBlur={formik.handleBlur}
            helperText={selectedJobListState.some((jobItem) => jobItem.id === 0) && otherJobState === "" && formik.touched.otherJob && formik.errors.otherJob}
            error={Boolean(selectedJobListState.some((jobItem) => jobItem.id === 0) && otherJobState === "" && formik.touched.otherJob && formik.errors.otherJob)}
            required
          />
        </Grid>
      )}
      {/* Yetenekler */}
      <Grid
        size={{ xs: 12, sm: 12, md: 6 }}
        display="flex"
        alignItems="start"
        sx={{ marginTop: 4 }}
      >
        <FormControl className="portfolioLabel">Yetenekler <span className="labelRequired">*</span></FormControl>
        <Grid display="flex" flexDirection="column" width="100%">
          <TextField
            name="skills"
            id="skills"
            className="portfolioInput"
            // value={formik.values.skills}
            value={skillsState}
            onChange={(e) => {
              setSkillsState(e.target.value);
            }}
            error={Boolean(formik.touched.skills && formik.errors.skills)}
            helperText={formik.touched.skills && formik.errors.skills}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={() => {
                      if (
                        skillsState?.trim() !== "" &&
                        !skillLengthAlertState
                      ) {
                        setSkillsArrayState((prev: any) => [
                          ...prev,
                          skillsState,
                        ]);
                        setSkillsState("");
                        setSkillLengthAlertState(false);
                      }
                    }}
                  >
                    Ekle
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {skillLengthAlertState && (
            <p
              className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
              id="photo-helper-text"
            >
              Yetenek maximum 50 karakter uzunlukta olmalıdır
            </p>
          )}
          <Grid
            display="flex"
            gap={2}
            marginTop={2}
            maxWidth="90%"
            flexWrap="wrap"
          >
            {skillsArrayState.length > 0 &&
              skillsArrayState.map((skillItem, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      padding: 1,
                      color: theme === "dark" ? "#fff " : "#3a3a3a",
                      border: `1px solid ${colorOptions[color].dark}`,
                      borderRadius: "4px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      maxWidth: "100%",
                    }}
                  >
                    {skillItem}
                    <RiDeleteBin2Line
                      size={30}
                      style={{
                        color: colorOptions[color].dark,
                        minWidth: "9%",
                      }}
                      onClick={(e: any) => {
                        const newSkillsArray = skillsArrayState.filter(
                          (item) => item !== skillItem
                        );

                        setSkillsArrayState(newSkillsArray);
                      }}
                    />
                  </Box>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
      {/* Dil Bilgisi */}
      <Grid
        size={{ xs: 12, sm: 12, md: 6 }}
        display="flex"
        alignItems="start"
        sx={{ marginTop: 4 }}
        gap={4}
      >
        <FormControl className="portfolioLabel">
          Dil Bilgisi <span className="labelRequired">*</span>
        </FormControl>

        <Grid width="100%" display="flex" flexDirection="column" gap={2}>
          {Array.from(selectLanguageArray).map((_, index) => {
            return (
              <Grid className='flex flex-col' key={index}>
                <Grid
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  width="100%"
                >
                  {/* Dil ve Seviye Seçimi */}
                  <Grid display="flex" justifyContent="space-between" gap={2} width="74%">
                    {/* Dil Seçimi */}
                    <FormControl fullWidth error={!!formik.errors.languages}>
                      <Select
                        className="portfolioSelect"
                        value={String(selectLanguageArray[index]?.id)}
                        onChange={(e: SelectChangeEvent) => {
                          const updatedArray = [...selectLanguageArray];
                          const selectedLanguage: any = languageList.find(
                            (lang: ILanguage) => lang.id === Number(e.target.value)
                          );
                          updatedArray[index] = {
                            ...(updatedArray[index] || {}),
                            id: selectedLanguage?.id ?? -1,
                            name: selectedLanguage?.name ?? "",
                          };
                          setSelectLanguageArray(updatedArray);
                          formik.setFieldTouched(`languages[${index}].id`, true);
                          formik.setFieldValue(`languages[${index}].id`, selectedLanguage?.id ?? -1);
                        }}
                      >
                        {languageList.map((languageItem: ILanguage) => (
                          <MenuItem key={languageItem.id} value={languageItem.id}>
                            {languageItem.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Seviye Seçimi */}
                    <FormControl fullWidth error={!!formik.errors.languages}>
                      <Select
                        className="portfolioSelect"
                        value={selectLanguageArray[index]?.level ?? ""}
                        onChange={(e: SelectChangeEvent) => {
                          const updatedArray = [...selectLanguageArray];
                          updatedArray[index] = {
                            ...(updatedArray[index] || {}),
                            level: e.target.value,
                          };
                          setSelectLanguageArray(updatedArray);
                        }}
                      >
                        {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
                          <MenuItem key={level} value={level}>
                            {level}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Butonlar */}
                  <Grid display="flex" justifyContent="center" width="20%" gap={1}>
                    {/* Silme Butonu */}
                    {showDeleteButton && (
                      <Button
                        sx={{ height: "58px", fontSize: "3rem" }}
                        onClick={() => {
                          const updatedArray = [...selectLanguageArray];
                          updatedArray.splice(index, 1);
                          setSelectLanguageArray(updatedArray);

                          if (languageCount >= 2) {
                            setLanguageCount((prev) => prev - 1);
                          }
                        }}
                      >
                        🗑
                      </Button>
                    )}

                    {/* Ekleme Butonu */}
                    {((selectLanguageArray.length > 0 &&
                      selectLanguageArray.length - 1 === index) ||
                      languageCount === 1) && (
                        <Button
                          sx={{ height: "58px", fontSize: "3rem" }}
                          onClick={() => {
                            const isComplete = !selectLanguageArray.find(
                              (item) =>
                                item.id === -1 || item.name === "" || item.level === ""
                            );

                            if (isComplete) {
                              setLanguageCount((prev) => prev + 1);
                              setSelectLanguageArray((prev) => [
                                ...prev,
                                { id: -1, name: "", level: "" },
                              ]);
                            }
                          }}
                        >
                          +
                        </Button>
                      )}
                  </Grid>
                </Grid>

                <Grid>
                  {Array.isArray(formik.errors.languages) && formik.touched.languages &&
                    formik.errors.languages.map((error: any, idx: number) => (
                      idx === index && (
                        <div key={idx}>
                          {error && typeof error === "object" ? (
                            <>
                              {/* name hatası varsa */}
                              {error.name && (
                                <p
                                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                                  style={{ color: "#d32f2f" }}
                                >
                                  {`${error.name}`}
                                </p>
                              )}
                              {/* level hatası varsa */}
                              {error.level && (
                                <p
                                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                                  style={{ color: "#d32f2f" }}
                                >
                                  {`${error.level}`}
                                </p>
                              )}
                            </>
                          ) : (
                            // Eğer error direkt string ise
                            <p
                              className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                              style={{ color: "#d32f2f" }}
                            >
                              {`${error}`}
                            </p>
                          )}
                        </div>
                      )
                    ))}
                </Grid>
              </Grid>

            );
          })}
        </Grid>
      </Grid>
    </>
  );
}

export default Step2;
