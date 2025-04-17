"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import { Button, Checkbox, FormControl, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { colorOptions } from "@/lists/color";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be 3 characters at minimum")
    .max(30, "Name must be 30 characters at maximum")
    .required("Name is required"),
  surname: yup
    .string()
    .min(3, "Surname must be 3 characters at minimum")
    .max(30, "Surname must be 30 characters at maximum")
    .required("Surname is required"),
  username: yup
    .string()
    .min(3, "Username must be 3 characters at minimum")
    .max(30, "Username must be 30 characters at maximum")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters at minimum")
    .max(30, "Password must be 30 characters at maximum")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(8, "Confirm password must be 8 characters at minimum")
    .max(30, "Confirm password must be 30 characters at maximum")
    .oneOf([yup.ref("password")], "Password did not match")
    .required("Confirm password is required"),
});

function RegisterComponent() {
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      admin: false, // Default admin value
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("values : ", JSON.stringify(values, null, 2))
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-15 md:mt-0 md:h-full md:w-full md:justify-center items-center !h-[calc(100vh - 7.5rem)]">
      <Grid container size={12} direction="row" spacing={2}>
        <Grid size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
              color: theme === "dark" ? "#fff" :  "#303030"
            }}
          >
            Name
          </FormControl>
          <TextField
            fullWidth
            size="small"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark, // varsayılan border rengi
                },
                "&:hover fieldset": {
                  borderColor: colorOptions[color].dark, // hover olduğunda
                },
                "&.Mui-focused fieldset": {
                  borderColor: colorOptions[color].dark, // odaklanıldığında
                },
              },
            }}
          />
        </Grid>
        <Grid size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
              color: theme === "dark" ? "#fff" :  "#303030"
            }}
          >
            Surname
          </FormControl>
          <TextField
            fullWidth
            size="small"
            id="surname"
            name="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark, // varsayılan border rengi
                },
                "&:hover fieldset": {
                  borderColor: colorOptions[color].dark, // hover olduğunda
                },
                "&.Mui-focused fieldset": {
                  borderColor: colorOptions[color].dark, // odaklanıldığında
                },
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container size={12} direction="row" spacing={2}>
        <Grid size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
              color: theme === "dark" ? "#fff" :  "#303030"
            }}
          >
            Username
          </FormControl>
          <TextField
            fullWidth
            size="small"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark, // varsayılan border rengi
                },
                "&:hover fieldset": {
                  borderColor: colorOptions[color].dark, // hover olduğunda
                },
                "&.Mui-focused fieldset": {
                  borderColor: colorOptions[color].dark, // odaklanıldığında
                },
              },
            }}
          />
        </Grid>
        <Grid size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
              color: theme === "dark" ? "#fff" :  "#303030"
            }}
          >
            E-Mail
          </FormControl>
          <TextField
            fullWidth
            size="small"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark, // varsayılan border rengi
                },
                "&:hover fieldset": {
                  borderColor: colorOptions[color].dark, // hover olduğunda
                },
                "&.Mui-focused fieldset": {
                  borderColor: colorOptions[color].dark, // odaklanıldığında
                },
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container size={12} direction="row" spacing={2}>
        <Grid size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
              color: theme === "dark" ? "#fff" :  "#303030"
            }}
          >
            Password
          </FormControl>
          <TextField
            type="password"
            fullWidth
            size="small"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark, // varsayılan border rengi
                },
                "&:hover fieldset": {
                  borderColor: colorOptions[color].dark, // hover olduğunda
                },
                "&.Mui-focused fieldset": {
                  borderColor: colorOptions[color].dark, // odaklanıldığında
                },
              },
            }}
          />
        </Grid>
        <Grid size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
              color: theme === "dark" ? "#fff" :  "#303030"
            }}
          >
            Confirm Password
          </FormControl>
          <TextField
            type="password"
            fullWidth
            size="small"
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark, // varsayılan border rengi
                },
                "&:hover fieldset": {
                  borderColor: colorOptions[color].dark, // hover olduğunda
                },
                "&.Mui-focused fieldset": {
                  borderColor: colorOptions[color].dark, // odaklanıldığında
                },
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container size={12} direction="row" justifyContent="center">
        <Grid
          size={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
              color: theme === "dark" ? "#fff" :  "#303030"
            }}
          >
            Do you want to be an admin?
          </FormControl>
          <Checkbox
            size="small"
            id="admin"
            checked={formik.values.admin}
            onChange={formik.handleChange}
            sx={{
              color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark,
              '&.Mui-checked': {
                color: colorOptions[color].dark, // işaretliykenki rengi
              },
              '& .MuiSvgIcon-root': {
                fontSize: 20, // boyut isteğe göre
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container size={12}>
        <Button
          type="submit"
          fullWidth
          sx={{
            fontSize: "16px",
            fontWeight:"600",
            background: theme==="dark" ? colorOptions[color].light : colorOptions[color].dark,
            color: theme ==="dark" ? colorOptions[color].dark : colorOptions[color].light,
            padding: "6px",
            ":hover": { background: colorOptions[color].dark , color:colorOptions[color].light},
          }}
        >
          Kayıt Ol
        </Button>
      </Grid>
    </form>
  );
}

export default RegisterComponent;