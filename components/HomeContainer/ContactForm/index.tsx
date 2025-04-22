import React from 'react'
import { useFormik } from "formik";
import { Box, Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { colorOptions } from '@/lists/color';
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import * as motion from "motion/react-client";

function ContactForm() {
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);

    const formik = useFormik({
        initialValues: {
            email: "",
            subject: "",
            message: ""
        },
        /*validationSchema:contactValidation,*/
        onSubmit: async (values: IInitialValues) => {
            try {
                const res = await fetch("/api/send", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: values.email,
                        subject: values.subject,
                        message: values.message
                    })
                });

                const result = await res.json();

                if (!res.ok) {
                    console.error("Hata:", result.error || "Bilinmeyen bir hata");
                    alert("Mesaj gönderilirken bir hata oluştu.");
                } else {
                    alert("Mesaj başarıyla gönderildi!");
                }
            } catch (error) {
                console.error("Fetch sırasında hata:", error);
                alert("Mesaj gönderilemedi.");
            }
        }

    })
    return (
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" ,width:"100%"}}>
            <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ background: theme === "dark" ? "#333c45" : "gray", borderRadius: "4px", '& .MuiFormLabel-root': { color: "#fff" } }}
            />
            <TextField
                fullWidth
                id="subject"
                name="subject"
                label="Konu"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
                sx={{ background: theme === "dark" ? "#333c45" : "gray", borderRadius: "4px", '& .MuiFormLabel-root': { color: "#fff" } }}
            />
            <TextField
                fullWidth
                id="message"
                name="message"
                label="Mesaj"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
                sx={{ background: theme === "dark" ? "#333c45" : "gray", borderRadius: "4px", '& .MuiFormLabel-root': { color: "#fff" } }}
            />
            <motion.div whileHover={{ scaleY: 1.1 }} whileTap={{ scaleY: 0.8 }}>
                <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" sx={{ width: "50%", backgroundColor: colorOptions[color].dark, paddingY: "6px" }} type='submit'>Gönder</Button>
                </Box>
            </ motion.div>
        </form>
    )
}

export default ContactForm

interface IInitialValues {
    email: string,
    subject: string,
    message: string
}