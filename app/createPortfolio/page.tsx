"use client";
import "./style.css"
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { colorOptions } from "@/lists/color";
import { createPortfolioValidation } from "@/validation/createPortfolioValidation";
import { Autocomplete, Box, Button, FormControl, Grid, Select, TextField, Typography } from '@mui/material';
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import * as motion from "motion/react-client";
import { currentStep } from "@/lib/redux/features/portfolioCurrentPage/portfolioCurrentPageSlice";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from "axios";
import CustomizedHook from "@/components/Autocompleted";


interface IExtendFile extends File {
  previewUrl: string;
}

function CreatePortfolio() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const step = useSelector(currentStep);
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);
  const [photo, setPhoto] = useState<IExtendFile | null>(null);
  const [jobList, setJobList] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: null,
      surname: null,
      title: null,
      photo: null,
      shortBiography: null,
      email: null,
      job: {
        name: null,
        id: null
      },
      otherJob: null
    },
    validationSchema: createPortfolioValidation,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    }
  })

  useEffect(() => {
    console.log("jobList : ", jobList);
  }, [jobList])

  useEffect(() => {
    getJobList();
  }, []);

  const getJobList = async () => {
    const res = await axios.get("/api/jobList");
    console.log("jobList response: ", res.data.data);
    if (res.status === 200) {
      const sorted = res.data.data.sort((a: any, b: any) => a.id - b.id);
      setJobList(sorted);
    } else {
      setJobList([]);
    }
  };


  return (
    <Grid container display="flex" justifyContent="center" sx={{ backgroundColor: theme === "dark" ? "#000" : "#fff", minHeight: 'calc(100vh - 7.5rem)' }} >
      <Grid sx={{ width: "90%", marginTop: { xs: 4, sm: 4, md: 4, lg: 2 } }}>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h3' sx={{ fontWeight: "600", fontFamily: "inherit", textAlign: "center", color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }}>Portfolyo Oluştur</Typography>
        </Grid>
        <Grid container spacing={{ xs: 2, sm: 2, md: 8 }}>
          {/* Name */}
          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" sx={{ marginTop: 4 }}>
            <FormControl className='portfolioLabel'>Ad</FormControl>
            <TextField
              name='name'
              id='name'
              className='portfolioInput'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          {/* Surname */}
          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" sx={{ marginTop: 4 }}>
            <FormControl className='portfolioLabel'>Soyad</FormControl>
            <TextField
              name="surname"
              id="surname"
              className='portfolioInput'
              value={formik.values.surname}
              onChange={formik.handleChange}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
            />
          </Grid>
          {/* Title */}
          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" sx={{ marginTop: 4 }}>
            <FormControl className='portfolioLabel'>Başlık / Unvan</FormControl>
            <TextField
              name="title"
              id="title"
              className='portfolioInput'
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          {/* Photo */}
          <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ marginTop: 4 }}>
            <Box display="flex" alignItems="start">
              <FormControl className='portfolioLabel'>Profil Fotoğrafı</FormControl>
              <Box sx={{ width: "100%", position: "relative" }}>
                <TextField
                  inputRef={inputRef}
                  sx={{ position: "absolute", left: "20px", top: "0px", width: "97%" }}
                  name="photo"
                  id="photo"
                  type="file"
                  className='portfolioInput'
                  inputProps={{ accept: "image/*" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPhoto(null);
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      const extendedFile: IExtendFile = Object.assign(file, {
                        previewUrl: URL.createObjectURL(file)
                      })
                      setPhoto(extendedFile);
                      formik.setFieldValue("photo", file);
                    }
                  }}
                  error={formik.touched.photo && Boolean(formik.errors.photo)}
                  helperText={formik.touched.photo && formik.errors.photo}
                />
                {photo && (
                  <Box sx={{
                    mt: 1,
                    position: "absolute",
                    left: "26px",
                    top: "60px",
                    width: "97%",
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <Typography
                      sx={{
                        color: theme === "dark" ? colorOptions[color].light : "#000",
                      }}>
                      {photo?.name}
                    </Typography>
                    <Box className="flex gap-4 absolute right-2.5">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
                        <Button variant="contained"
                          sx={{ backgroundColor: colorOptions[color].dark }}
                          onClick={() => window.open(photo.previewUrl)}
                        >
                          <FaEye size={20} />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: colorOptions["red"].dark }}
                          onClick={() => {
                            setPhoto(null);
                            formik.setFieldValue("photo", null);
                            if (inputRef.current) {
                              inputRef.current.value = "";
                            }
                          }}
                        >
                          <RiDeleteBin2Line size={20} />
                        </Button>
                      </motion.div>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          {/* Short Biography */}
          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" sx={{ marginTop: 4 }}>
            <FormControl className='portfolioLabel'>Kısa Biyografi <br /> <span style={{ fontSize: ".9rem" }}>(max:300 karakter)</span></FormControl>
            <TextField
              multiline
              rows={4}
              name="shortBiography"
              id="shortBiography"
              className="portfolioInput"
              value={formik.values.shortBiography}
              onChange={formik.handleChange}
              error={formik.touched.shortBiography && Boolean(formik.errors.shortBiography)}
              helperText={formik.touched.shortBiography && formik.errors.shortBiography}
            />
          </Grid>
          {/* Email */}
          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" sx={{ marginTop: 4 }}>
            <FormControl className='portfolioLabel'>Email</FormControl>
            <TextField
              name='email'
              id='email'
              className='portfolioInput'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          {/* Uzmanlık Alanı / Meslek */}
          <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" sx={{ marginTop: 4 }}>
            <FormControl className="portfolioLabel">Meslek / Unvan</FormControl>
            {/* <Autocomplete
              className="portfolioInput"
              disablePortal
              options={jobList}
              getOptionLabel={(option: any) => option.name}
              onChange={(event, value) => {
                formik.setFieldValue("job", value);
                formik.setFieldValue("otherJob", null);
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  name="job"
                  autoComplete="off"
                  error={formik.touched.job && Boolean(formik.errors.job)}
                  helperText={formik.touched.job && formik.errors.job}
                />
              )}
            /> */}
            <CustomizedHook jobList={jobList} />
          </Grid>
          {/* Diğer Meslek / Unvan */}
          {
            formik.values.job.name === "Diğer" && (
              <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" justifyContent="space-between" sx={{ marginTop: 4 }}>
                <FormControl className='portfolioLabel'>Diğer Meslek / Unvan</FormControl>
                <TextField
                  name='otherJob'
                  id='otherJob'
                  className='portfolioInput'
                  value={formik.values.otherJob}
                  onChange={formik.handleChange}
                  error={formik.touched.otherJob && Boolean(formik.errors.otherJob)}
                  helperText={formik.touched.otherJob && formik.errors.otherJob}
                />
              </Grid>
            )
          }
          {/* Buton */}
          <Grid size={12} display="flex" justifyContent="center" sx={{ marginBottom: "10px" }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: colorOptions[color].dark, padding: "12px", fontSize: "16px" }}
                onClick={() => formik.handleSubmit()}>Portfolyo Oluştur</Button>
            </motion.div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CreatePortfolio
