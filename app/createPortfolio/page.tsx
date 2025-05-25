"use client";
import "./style.css";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { createPortfolioValidation } from "@/validation/createPortfolioValidation";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as motion from "motion/react-client";
import { RiDeleteBin2Line } from "react-icons/ri";
import Stepper from "@/components/Stepper";
import { currentStep } from "@/lib/redux/features/portfolioCurrentPage/portfolioCurrentPageSlice";
import Step0 from "@/components/Steps/Step0";
import {
  createPortfolio,
  submitForms,
  updateForms,
} from "@/lib/redux/features/createPortfolio/createPortfolioSlice";
import Step1 from "@/components/Steps/Step1";
import Step2 from "@/components/Steps/Step2";
import { FaEye } from "react-icons/fa6";

interface IExtendFile extends File {
  previewUrl: string;
}

function CreatePortfolio() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);
  const step = useSelector(currentStep);
  const initialValues = useSelector(createPortfolio);
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
        <Formik
          initialValues={initialValues}
          validationSchema={createPortfolioValidation}
          onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
        >
          <Form>
            <Grid container spacing={{ xs: 2, sm: 2, md: 6 }}>
              {/* Photo */}
              {step === 0 && (
                <>
                  <Grid size={12}>
                    <Typography
                      sx={{ color: colorOptions[color].light }}
                      variant="h4"
                    >
                      Profil Fotoğrafı
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <Box
                      sx={{
                        width: "100%",
                        position: "relative",
                        height: "100%",
                        minHeight: "calc(100vh - 400px)",
                      }}
                    >
                      {/* File Upload Circle */}
                      <Box
                        sx={{
                          position: "absolute",
                          left: "82%",
                          top: "calc(100vh - 750px)",
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
                          onChange={(
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
                              setPhoto(extendedFile);
                              dispatch(updateForms({ photo: file }));
                            }
                          }}
                          style={{
                            opacity: 0,
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            cursor: "pointer",
                          }}
                        />
                      </Box>

                      {/* Photo Preview & Actions */}
                      {photo && (
                        <Box
                          sx={{
                            mt: 1,
                            position: "absolute",
                            left: "60%",
                            top: "90%",
                            width: "97%",
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
                          <Box className="flex gap-4 absolute right-2.5">
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
                                  dispatch(updateForms({ photo: null }));
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
              {step === 4 && <div style={{ color: "#fff" }}>Step 5</div>}
              {step === 5 && <div style={{ color: "#fff" }}>Step 6</div>}
              {step === 6 && <div style={{ color: "#fff" }}>Step 7</div>}
            </Grid>
          </Form>
        </Formik>
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
              onClick={() => dispatch(submitForms())}
            >
              Portfolyo Oluştur
            </Button>
          </motion.div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CreatePortfolio;
