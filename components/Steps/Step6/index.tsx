"use client";
import { ICreatePortfolio, IProjects } from "@/app/createPortfolio/IProps";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Step6() {
    const formik = useFormikContext<ICreatePortfolio>();
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);
    const projectsError = formik.errors.projects as FormikErrors<IProjects>[] | undefined;
    const projectsTouched = formik.touched.projects as Array<FormikTouched<IProjects> | undefined>;

    useEffect(() => {
        console.log("formik.values.projects : ", formik.values.projects);
    }, [formik.values.projects])

    return (
        <>
            <Grid size={12} display="flex" flexDirection="column" gap={4}>
                <Typography sx={{ color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }} variant="h4">
                    Projeler ve Üretimler
                </Typography>
            </Grid>
            {
                formik.values.projects.length > 0 && (
                    formik.values.projects.map((projectItem: IProjects, projectIndex: number) => (
                        <Grid
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "30px",
                                border: `1px solid ${theme === "dark" ? colorOptions[color].light : colorOptions[color].dark}`,
                                padding: "30px 20px 20px 20px",
                                position: "relative",
                                width: "100%"
                            }}
                            key={projectIndex}>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }} display="flex">
                                <FormControl className="portfolioLabel">Proje Başlığı <span className="labelRequired">*</span></FormControl>
                                <TextField className="portfolioInput"
                                    name={`projects[${projectIndex}].title`}
                                    id={`projectTitle-${projectIndex}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.projects[projectIndex].title}
                                    error={Boolean(projectsError?.[projectIndex]?.title && projectsTouched?.[projectIndex]?.title)}
                                    helperText={projectsTouched?.[projectIndex]?.title && projectsError?.[projectIndex]?.title} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }} display="flex">
                                <FormControl className="portfolioLabel">Açıklama <span className="labelRequired">*</span></FormControl>
                                <TextField className="portfolioInput"
                                    name={`projects[${projectIndex}].description`}
                                    id={`projectDescription-${projectIndex}`}
                                    onChange={formik.handleChange}
                                    value={formik.values.projects[projectIndex].description}
                                    error={Boolean(projectsError?.[projectIndex]?.description && projectsTouched?.[projectIndex]?.description)}
                                    helperText={projectsTouched?.[projectIndex]?.description && projectsError?.[projectIndex]?.description}
                                    multiline
                                    rows={4} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }} display="flex" justifyContent="start" width={"100%"}>
                                <Button variant="outlined"
                                    sx={{ fontSize: "20px", width: "20%", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>Link Ekle</Button>
                            </Grid>
                        </Grid>
                    ))
                )
            }
            <Grid size={12} display="flex" justifyContent="center">
                <Button
                    variant="outlined"
                    sx={{ fontSize: "30px", width: "30%", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
                    onClick={() => {
                        const currentProjects = formik.values.projects || [];
                        const lastId = formik.values.projects?.length > 0 ? formik.values.projects[formik.values.projects.length - 1].id + 1 : 1;
                        const newItem = {
                            id: lastId,
                            title: "",
                            attachment: null,
                            links: []
                        };
                        formik.setFieldValue("projects", [...currentProjects, newItem]);
                    }}
                >{formik.values.projects?.length > 0 ? "Ekle" : "Yeni ekle"}</Button>
            </Grid>
        </>
    )
}

export default Step6;