"use client";
import { IJob } from "@/app/createPortfolio/IProps";
import CustomizedHookMultiple, {
  IListMultiple,
} from "@/components/AutocomplatedMultiple";
import { IList } from "@/components/Autocompleted";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import {
  createPortfolio,
  updateForms,
} from "@/lib/redux/features/createPortfolio/createPortfolioSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormikContext } from "formik";
import { color } from "framer-motion";
import React, { useEffect, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

function Step2() {
  const dispatch = useDispatch();
  const formik = useFormikContext<any>();
  const [jobListState, setJobListState] = useState([]);
  const [selectedJobListState, setSelectedJobListState] = useState<
    IListMultiple[] | []
  >([]);
  const [skillsState, setSkillsState] = useState("");
  const [skillsArrayState, setSkillsArrayState] = useState<String[] | []>([]);
  const [skillLengthAlertState, setSkillLengthAlertState] = useState(false);

  const color = useSelector(selectColor);
  const theme = useSelector(selectTheme);
  const { jobs, otherJob, skills } = useSelector(createPortfolio);

  useEffect(() => {
    getJobList();
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
    dispatch(updateForms({ skills: skillsArrayState }));
  }, [skillsArrayState]);

  useEffect(() => {
    if (skillsState.length > 50) {
      setSkillLengthAlertState(true);
    } else {
      setSkillLengthAlertState(false);
    }
  }, [skillsState]);

  useEffect(() => {
    dispatch(updateForms({ jobs: selectedJobListState }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJobListState]);

  useEffect(() => {
    const diğerMevcutMu = selectedJobListState.some(
      (selectedJobItem: IList) => selectedJobItem.name === "Diğer"
    );
    if (!diğerMevcutMu) {
      dispatch(updateForms({ otherJob: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJobListState]);

  return (
    <>
      <Grid size={12}>
        <Typography sx={{ color: colorOptions[color].light }} variant="h4">
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
        <FormControl className="portfolioLabel">Meslek / Unvan</FormControl>
        <CustomizedHookMultiple
          type="job"
          list={jobListState}
          selectedJobList={selectedJobListState}
          setSelectedJobList={setSelectedJobListState}
        />
      </Grid>
      {/* Diğer Meslek / Unvan */}
      {jobs.find((jobItem: IList) => jobItem.name === "Diğer") && (
        <Grid
          size={{ xs: 12, sm: 12, md: 6 }}
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          sx={{ marginTop: 4 }}
        >
          <FormControl className="portfolioLabel">
            Diğer Meslek / Unvan
          </FormControl>
          <TextField
            name="otherJob"
            id="otherJob"
            className="portfolioInput"
            value={otherJob}
            onChange={(e) => {
              dispatch(updateForms({ otherJob: e.target.value }));
            }}
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
        <FormControl className="portfolioLabel">Yetenekler</FormControl>
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
                        console.log("newSkillsArray : ", newSkillsArray);

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
      >
        <FormControl className="portfolioLabel">Dil Bilgisi</FormControl>
        {/* <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={"abc"}
                  label="Age"                  
                >
                  <MenuItem value={10}>abc</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select> */}
      </Grid>
    </>
  );
}

export default Step2;
