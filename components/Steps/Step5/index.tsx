"use client";
import { ICreatePortfolio, IEducations, IJob } from "@/app/createPortfolio/IProps";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { degreeList } from "@/lists/DegreeList";
import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";

function Step5() {
    const [departmentList, setDepartmentList] = useState<[] | IJob[]>([]);
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);
    const formik = useFormikContext<ICreatePortfolio>();

    useEffect(() => {
        getDepartmentList();
    }, []);

    const getDepartmentList = async () => {
        try {
            const res = await axios.get("/api/jobList");
            if (res.status === 200) {
                setDepartmentList(res.data?.data);
            }
        } catch (err) {
            console.error("ERR [Step5/getDepartmentList] : ", err instanceof Error ? err.message : err);
        }
    };

    useEffect(() => {
        console.log("formik.values.educations : ", formik.values.educations);

    }, [formik.values.educations])

    return (
        <>
            <Grid size={12} display="flex" flexDirection="column" gap={4}>
                <Typography sx={{ color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }} variant="h4">
                    Eğitim Bilgileri
                </Typography>
                {
                    formik.values.educations?.length > 0 && (
                        formik.values.educations.map((educationItem: IEducations, educationIndex: number) => {
                            return (
                                <Grid
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "30px",
                                        border: `1px solid ${theme === "dark" ? colorOptions[color].light : colorOptions[color].dark}`,
                                        padding: "30px 20px 20px 20px",
                                        position: "relative",
                                    }}
                                    key={educationIndex}
                                >
                                    {/* Okul Adı */}
                                    <Grid size={{ xs: 12, sm: 12, md: 12 }} sx={{ display: "flex" }}
                                    >
                                        <FormControl
                                            sx={{
                                                "&.portfolioLabel": {
                                                    // xs için
                                                    width: "14.5% !important",
                                                    // md için
                                                    "@media (max-width: 900px)": {
                                                        width: "35% !important",
                                                    }
                                                }
                                            }}
                                            className="portfolioLabel">Okul Adı</FormControl>
                                        <TextField
                                            className="portfolioInput"
                                            name={`educations[${educationIndex}].schoolName`}
                                            id={`schoolName-${educationIndex}`}
                                            onChange={formik.handleChange}
                                            value={formik.values.educations[educationIndex].schoolName}
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                    {/* Bölüm */}
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ display: "flex" }}>
                                        <FormControl className="portfolioLabel">Bölüm</FormControl>
                                        <Select
                                            className="portfolioSelect"
                                            name={`educations[${educationIndex}].department`}
                                            id={`department-${educationIndex}`}
                                            onChange={(e) => {
                                                const filteredDepartment = departmentList?.filter((departmentItem: IJob) => {
                                                    return e.target.value === departmentItem.id
                                                });

                                                formik.setFieldValue(`educations[${educationIndex}].department`, filteredDepartment?.[0]);
                                            }}
                                            value={formik.values.educations?.[educationIndex]?.department?.id || ""}
                                        >
                                            {
                                                departmentList.length > 0 && (
                                                    departmentList.map((departmentItem: IJob, departmentItemIndex: number) => (
                                                        <MenuItem key={departmentItemIndex} value={departmentItem.id}>{departmentItem.name}</MenuItem>
                                                    ))
                                                )
                                            }
                                        </Select>
                                    </Grid>
                                    {/* Derece */}
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ display: "flex" }}>
                                        <FormControl className="portfolioLabel">Derece</FormControl>
                                        <Select
                                            className="portfolioSelect"
                                            name={`educations[${educationIndex}].degree`}
                                            id={`degree-${educationIndex}`}
                                            onChange={(e: any) => {
                                                const fiteredDegree = degreeList.filter((degreeItem: IJob) => degreeItem.id === e.target.value)
                                                formik.setFieldValue(`educations[${educationIndex}].degree`, fiteredDegree?.[0]);
                                            }}
                                            value={educationItem.degreee || ""}
                                        >
                                            {
                                                degreeList.length > 0 && (
                                                    degreeList.map((degree: IJob, degreeIndex: number) => {
                                                        return (
                                                            <MenuItem key={degreeIndex} value={degree.id}>{degree.name}</MenuItem>
                                                        )
                                                    })
                                                )
                                            }
                                        </Select>
                                    </Grid>
                                </Grid>
                            )
                        })
                    )
                }
                <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        sx={{ fontSize: "30px", width: "30%", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
                        onClick={() => {
                            const currentEducation = formik.values.educations || [];
                            const lastId = currentEducation.length > 0 ? currentEducation[currentEducation.length - 1].id + 1 : 1;
                            const newItem: IEducations = {
                                id: lastId,
                                schoolName: "",
                                department: null,
                                degreee: "",
                                startDate: null,
                                endDate: null,
                            };
                            formik.setFieldValue("educations", [...currentEducation, newItem]);
                        }}
                    >
                        {formik.values.educations?.length === 0 ? "Yeni Ekle" : "Ekle"} <IoMdAdd fontSize={30} />
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Step5;