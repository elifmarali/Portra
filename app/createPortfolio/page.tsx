"use client";

import "./style.css";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { createPortfolioValidation } from "@/validation/createPortfolioValidation";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Form, Formik, useFormikContext } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as motion from "motion/react-client";
import { RiDeleteBin2Line } from "react-icons/ri";
import Stepper from "@/components/Stepper";
import Step0 from "@/components/Steps/Step0";
import Step1 from "@/components/Steps/Step1";
import Step2 from "@/components/Steps/Step2";
import Step3 from "@/components/Steps/Step3";
import Step4 from "@/components/Steps/Step4";
import Step5 from "@/components/Steps/Step5";
import { FaEye } from "react-icons/fa6";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { convertToBase64 } from "@/functions/convertToBase64";
import Step6 from "@/components/Steps/Step6";
import { ICreatePortfolio } from "./IProps";
import { currentAuth } from "@/lib/redux/features/auth/authSlice";
import axios from "axios";

function FormikWatcher({ setFormData }: { setFormData: React.Dispatch<React.SetStateAction<ICreatePortfolio>> }) {
  const { values } = useFormikContext<ICreatePortfolio>();

  useEffect(() => {
    setFormData((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(values)) {
        return values
      }
      return prev;
    })
  }, [values, setFormData]);

  return null;
}

interface IExtendFile extends File {
  previewUrl: string;
}

interface Props {
  stepParam: string;
}

function CreatePortfolio({ stepParam }: Props) {
  const auth = useSelector(currentAuth);
  const step = parseInt(stepParam || "0", 10);
  const [formId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("portfolioFormId");
      if (saved) return saved;

      const newId = Math.floor(Math.random() * 7449741984988489).toString();
      sessionStorage.setItem("portfolioFormId", newId);
      return newId;
    }
    return "";
  });

  // Sadece formId değişirse bu obje baştan hesaplanır.
  // formId sabit olduğu sürece initialValues sabit kalır.
  // durduk yere formu sıfırlamaz ( her next veya back de sıfırlaması gibi)
  //  useMemo = “Render başına değil, bağımlılık değişince çalış!” garantisi.
  // useMemo = “Gereksiz sıfırlama yok, performans stabil!”
  const initialValues = useMemo(() => ({
    author: {
      name: auth.name,
      surname: auth.surname,
      username: auth.username,
      email: auth.email,
      role: auth.role
    },
    id: formId,
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
    workExperiences: [],
    educations: [],
    projects: []
  }), [formId]);

  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(`portfolioForm-${formId}`);
      return saved ? JSON.parse(saved) : initialValues;
    }
    return initialValues;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`portfolioForm-${formId}`, JSON.stringify(formData));
    }
  }, [formData, formId]);

  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);
  const [photo, setPhoto] = useState<IExtendFile | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log("formData : ", formData);
  }, [formData])

  useEffect(() => {
    if (
      formData.photo &&
      typeof formData.photo === "object" &&
      formData.photo.base64File &&
      formData.photo.name &&
      !photo
    ) {
      fetch(formData.photo.base64File)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], formData.photo.name, { type: blob.type });
          const previewUrl = URL.createObjectURL(blob);
          const extendedFile: IExtendFile = Object.assign(file, { previewUrl });
          setPhoto(extendedFile);
        });
    }
  }, [formData.photo]);

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        backgroundColor: theme === "dark" ? "#000" : "#fff",
        minHeight: "calc(100vh - 7.5rem)",
      }}
    >
      <Grid sx={{ width: "90%", marginTop: { xs: 4, sm: 4, md: 4, lg: 2 } }}>
        <Grid size={12}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "600",
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
            initialValues={formData}
            enableReinitialize={true}
            validationSchema={createPortfolioValidation}
            validateOnBlur={false}
            onSubmit={(values) => {
              console.log("Form Submit:", JSON.stringify(values, null, 2));
              try { axios.post("/api/portfolioList", { formData }) }
              catch (err) {
                console.log("hatalandııık :)");

              }
              /*               sessionStorage.removeItem(`portfolioForm-${formId}`);
                            sessionStorage.removeItem("portfolioFormId"); */
            }}
          >
            {({ values, errors, setFieldValue }) => {
              return (
                <>
                  <FormikWatcher setFormData={setFormData} />
                  <Form>
                    <Grid container spacing={{ xs: 2, sm: 2, md: 6 }}>
                      {step === 0 && (
                        <>
                          <Grid size={12}>
                            <Typography
                              variant="h4"
                              sx={{
                                color:
                                  theme === "dark"
                                    ? colorOptions[color].light
                                    : colorOptions[color].dark,
                              }}
                            >
                              Profil Fotoğrafı{" "}
                              <span className="labelRequired">*</span>
                            </Typography>
                          </Grid>

                          <Grid size={12}>
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                minHeight: "calc(100vh - 400px)",
                              }}
                            >
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
                                <Typography sx={{ color: "#aaa", textAlign: "center" }}>
                                  Fotoğraf yükle
                                </Typography>
                                <input
                                  ref={inputRef}
                                  type="file"
                                  name="photo"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    setPhoto(null);
                                    const file = e.currentTarget.files?.[0];
                                    if (file) {
                                      const extendedFile: IExtendFile = Object.assign(
                                        file,
                                        { previewUrl: URL.createObjectURL(file) }
                                      );
                                      const base64File = await convertToBase64(extendedFile);
                                      setFieldValue("photo", {
                                        name: file.name,
                                        base64File
                                      });
                                      setPhoto(extendedFile);
                                    }
                                  }}
                                  style={{ opacity: 0, position: "absolute", cursor: "pointer" }}
                                />
                              </Box>

                              {typeof errors?.photo === "string" && (
                                <Box sx={{ mt: 1 }}>
                                  <Typography sx={{ color: "#d32f2f" }}>
                                    {errors?.photo}
                                  </Typography>
                                </Box>
                              )}

                              {photo && (
                                <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
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
                                  <Box className="flex gap-4" sx={{ ml: 2 }}>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                                      <Button
                                        variant="contained"
                                        sx={{ backgroundColor: colorOptions[color].dark }}
                                        onClick={() => window.open(photo.previewUrl)}
                                      >
                                        <FaEye size={20} />
                                      </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                                      <Button
                                        variant="contained"
                                        sx={{ backgroundColor: colorOptions["red"].dark }}
                                        onClick={() => {
                                          setPhoto(null);
                                          if (inputRef.current) inputRef.current.value = "";
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
                      {step === 6 && <Step5 />}
                      {step === 7 && <Step6 />}
                      {step >= 8 && step <= 9 && (
                        <Typography sx={{ color: "#fff" }}>Step {step}</Typography>
                      )}
                    </Grid>

                    <Grid size={12} sx={{ my: 4 }}>
                      <Stepper step={step} />
                    </Grid>

                    <Grid size={12} display="flex" justifyContent="center">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            backgroundColor: colorOptions[color].dark,
                            padding: "12px 24px",
                            fontSize: "16px",
                          }}
                        >
                          Portfolyo Oluştur
                        </Button>
                      </motion.div>
                    </Grid>
                  </Form>
                </>
              );
            }}
          </Formik>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}

export default CreatePortfolio;
