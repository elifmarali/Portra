"use client";
import "./style.css";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { createPortfolioValidation } from "@/validation/createPortfolioValidation";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as motion from "motion/react-client";
import { RiDeleteBin2Line } from "react-icons/ri";
import Stepper from "@/components/Stepper";
import { currentStep } from "@/lib/redux/features/portfolioCurrentPage/portfolioCurrentPageSlice";
import Step0 from "@/components/Steps/Step0";
import Step1 from "@/components/Steps/Step1";
import Step2 from "@/components/Steps/Step2";
import { FaEye } from "react-icons/fa6";
import { convertToBase64 } from "@/functions/convertToBase64";
import Step3 from "@/components/Steps/Step3";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Step4 from "@/components/Steps/Step4";

interface IExtendFile extends File {
  previewUrl: string;
}

function CreatePortfolio() {
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
    languages: [{ id: -1, name: "", level: "" }],
    certificates: [],
    workExperiences:[]
  };
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);
  const step = useSelector(currentStep);
  const [photo, setPhoto] = useState<IExtendFile | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      sx={{
        backgroundColor: theme === "dark" ? "#000" : "#fff",
        minHeight: "calc(100vh - 7.5rem)",
      }}
    >
      <Grid sx={{ width: "90%", marginTop: { xs: 4, sm: 4, md: 4, lg: 2 } }}>
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "600",
              fontFamily: "inherit",
              textAlign: "center",
              color:
                theme === "dark"
                  ? colorOptions[color].light
                  : colorOptions[color].dark,
            }}
          >
            Portfolyo Oluştur
          </Typography>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={createPortfolioValidation}
            validateOnBlur={false}
            onSubmit={(values) => {
              console.log(JSON.stringify(values, null, 2));
            }}
          >
            {
              ({ errors, setFieldValue }) => (
                <Form>
                  <Grid container spacing={{ xs: 2, sm: 2, md: 6 }}>
                    {/* Photo */}
                    {step === 0 && (
                      <>
                        <Grid size={12}>
                          <Typography
                            sx={{ color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }}
                            variant="h4"
                          >
                            Profil Fotoğrafı <span className="labelRequired">*</span>
                          </Typography>
                        </Grid>
                        <Grid size={12}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              minHeight: "calc(100vh - 400px)",
                            }}
                          >
                            {/* File Upload Circle */}
                            <Box
                              sx={{
                                width: 300,
                                height: 300,
                                borderRadius: "50%",
                                border: "1px solid #fff",
                                background: "#fff",
                                overflow: "hidden",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onClick={() => inputRef.current?.click()}
                            >
                              {/* Görsel olarak bir + işareti veya açıklama */}
                              <Typography sx={{ color: "#aaa", textAlign: "center" }}>
                                Fotoğraf yükle
                              </Typography>

                              {/* Gerçek input */}
                              <input
                                ref={inputRef}
                                type="file"
                                name="photo"
                                id="photo"
                                accept="image/*"
                                onChange={async (
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setPhoto(null);
                                  const file = e.currentTarget.files?.[0];
                                  if (file) {
                                    const extendedFile: IExtendFile = Object.assign(
                                      file,
                                      {
                                        previewUrl: URL.createObjectURL(file),
                                      }
                                    );
                                    const base64File = await convertToBase64(extendedFile);
                                    setFieldValue("photo", base64File);
                                    setPhoto(extendedFile);
                                  }
                                }}
                                style={{
                                  opacity: 0,
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  cursor: "pointer",
                                }}
                              />
                            </Box>
                            {
                              errors.photo && typeof errors.photo === "string" && (
                                <Box
                                  sx={{
                                    mt: 1,
                                    width: "90%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <p
                                    className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                                    id="photo-helper-text"
                                    style={{ color: "#d32f2f" }}
                                  >
                                    {errors.photo}
                                  </p>
                                </Box>
                              )
                            }
                            {/* Photo Preview & Actions */}
                            {photo && (
                              <Box
                                sx={{
                                  mt: 1,
                                  width: "30%",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color:
                                      theme === "dark"
                                        ? colorOptions[color].light
                                        : "#000",
                                  }}
                                >
                                  {photo.name}
                                </Typography>
                                <Box className="flex gap-4">
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.8 }}
                                  >
                                    <Button
                                      variant="contained"
                                      sx={{
                                        backgroundColor: colorOptions[color].dark,
                                      }}
                                      onClick={() => window.open(photo.previewUrl)}
                                    >
                                      <FaEye size={20} />
                                    </Button>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.8 }}
                                  >
                                    <Button
                                      variant="contained"
                                      sx={{
                                        backgroundColor: colorOptions["red"].dark,
                                      }}
                                      onClick={() => {
                                        setPhoto(null);
                                        if (inputRef.current)
                                          inputRef.current.value = "";
                                      }}
                                    >
                                      <RiDeleteBin2Line size={20} />
                                    </Button>
                                  </motion.div>
                                </Box>
                              </Box>
                            )}
                          </Box>
                        </Grid>
                      </>
                    )}

                    {step === 1 && <Step0 />}
                    {step === 2 && <Step1 />}
                    {step === 3 && <Step2 />}
                    {step === 4 && <Step3 />}
                    {step === 5 && <Step4 />}
                    {step === 6 && <div style={{ color: "#fff" }}>Step 7</div>}
                  </Grid>
                  <Grid size={12} sx={{ margin: "30px 0" }}>
                    <Stepper />
                  </Grid>
                  {/* Buton */}
                  <Grid
                    size={12}
                    display="flex"
                    justifyContent="center"
                    sx={{ marginBottom: "10px" }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: colorOptions[color].dark,
                          padding: "12px",
                          fontSize: "16px",
                        }}
                        type="submit"
                      >
                        Portfolyo Oluştur
                      </Button>
                    </motion.div>
                  </Grid>
                </Form>
              )
            }
          </Formik>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}

export default CreatePortfolio;
