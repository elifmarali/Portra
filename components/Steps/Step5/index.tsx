"use client";
import { ICreatePortfolio, IEducations, IJob } from "@/app/createPortfolio/IProps";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { degreeList } from "@/lists/DegreeList";
import { Button, Checkbox, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs from "dayjs";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

function Step5() {
    const [departmentList, setDepartmentList] = useState<[] | IJob[]>([]);
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);
    const formik = useFormikContext<ICreatePortfolio>();
    const educationsErrors = formik.errors.educations as FormikErrors<IEducations>[] | undefined;
    const educationsTouched = formik.touched.educations as Array<FormikTouched<IEducations> | undefined>;

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
                                    <Grid size={12}>
                                        <Button
                                            type="button"
                                            sx={{
                                                backgroundColor: colorOptions["red"].dark,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                fontWeight: 600,
                                                position: "absolute",
                                                top: "0px",
                                                right: "0px",
                                                fontSize: "14px",
                                                color: "#fff",
                                                margin: "10px 20px",
                                                cursor: "pointer",
                                                border: "none",
                                            }}
                                            onClick={() => {
                                                const currentList = formik.values.educations;
                                                const newList = currentList.filter((educationItemCurrent: IEducations) => educationItemCurrent.id !== educationItem.id);
                                                formik.setFieldValue("educations", newList);
                                            }}>Sil<IoMdClose />
                                        </Button>
                                    </Grid>
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
                                            className="portfolioLabel">Okul Adı <span className="labelRequired">*</span></FormControl>
                                        <TextField
                                            className="portfolioInput"
                                            name={`educations[${educationIndex}].schoolName`}
                                            id={`schoolName-${educationIndex}`}
                                            onChange={formik.handleChange}
                                            value={formik.values.educations[educationIndex].schoolName}
                                            sx={{ width: "100%" }}
                                            error={Boolean(educationsErrors?.[educationIndex]?.schoolName && educationsTouched?.[educationIndex]?.schoolName)}
                                            helperText={educationsErrors?.[educationIndex]?.schoolName && educationsTouched?.[educationIndex]?.schoolName}
                                        />
                                    </Grid>
                                    {/* Bölüm */}
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} display="column">
                                        <Grid size={12} sx={{ display: "flex" }}>
                                            <FormControl className="portfolioLabel">Bölüm</FormControl>
                                            <Select
                                                error={Boolean(educationsErrors?.[educationIndex]?.department && educationsTouched?.[educationIndex]?.department)}
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
                                        {
                                            Boolean(educationsErrors?.[educationIndex].department && educationsTouched?.[educationIndex]?.department) && (
                                                <p
                                                    className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                                                    id="photo-helper-text"
                                                    style={{ color: "#d32f2f", width: "54%", display: "flex", justifyContent: "end", marginTop: "10px" }}
                                                >
                                                    {educationsErrors?.[educationIndex].department}
                                                </p>
                                            )
                                        }
                                    </Grid>
                                    {/* Derece */}
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} display="column">
                                        <Grid size={12} sx={{ display: "flex" }}>
                                            <FormControl className="portfolioLabel">Derece <span className="labelRequired">*</span></FormControl>
                                            <Select
                                                error={Boolean(educationsErrors?.[educationIndex]?.degree && educationsTouched?.[educationIndex]?.degree)}
                                                className="portfolioSelect"
                                                name={`educations[${educationIndex}].degree`}
                                                id={`degree-${educationIndex}`}
                                                onChange={(e) => {
                                                    const fiteredDegree = degreeList.filter((degreeItem: IJob) => degreeItem.id === e.target.value)
                                                    formik.setFieldValue(`educations[${educationIndex}].degree`, fiteredDegree?.[0]);
                                                }}
                                                value={educationItem?.degree?.id || ""}
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
                                        {
                                            Boolean(educationsErrors?.[educationIndex].degree && educationsTouched?.[educationIndex]?.degree) && (
                                                <p
                                                    className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                                                    id="photo-helper-text"
                                                    style={{ color: "#d32f2f", width: "50%", display: "flex", justifyContent: "end", marginTop: "10px" }}
                                                >
                                                    {educationsErrors?.[educationIndex].degree}
                                                </p>
                                            )
                                        }
                                    </Grid>
                                    {/* Başlangıç Tarihi */}
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" sx={{ marginTop: 4 }}>
                                        <FormControl className="portfolioLabel">Başlangıç Tarihi <span className="labelRequired">*</span></FormControl>
                                        <Grid width="90%" display="flex" flexDirection="column">
                                            <DatePicker
                                                sx={{
                                                    width: "100%",
                                                    "& .MuiPickersOutlinedInput-notchedOutline ": {
                                                        borderColor:
                                                            typeof formik.errors.educations?.[educationIndex] === "object" &&
                                                                (formik.errors.educations?.[educationIndex] as FormikErrors<IEducations>)?.startDate &&
                                                                formik.touched.educations?.[educationIndex].startDate
                                                                ? "#d32f2f !important"
                                                                : theme === "dark"
                                                                    ? "#fff !important"
                                                                    : "rgba(0,0,0,0.36) !important"
                                                    },
                                                    "& .MuiIconButton-root": {
                                                        color: theme === "dark" ? "#fff" : "rgba(0,0,0,0.54)"
                                                    },
                                                    "& .MuiPickersSectionList-root": {
                                                        color: theme === "dark" ? "#fff" : "rgba(0,0,0,1)"
                                                    }
                                                }}
                                                format='DD/MM/YYYY'
                                                value={dayjs(educationItem.startDate, "DD/MM/YYYY")}
                                                onChange={(newValue) => {
                                                    formik.setFieldValue(`educations[${educationIndex}].startDate`, newValue?.format("DD/MM/YYYY"))
                                                }}
                                            />
                                            {
                                                educationsErrors?.[educationIndex].startDate && educationsTouched?.[educationIndex]?.startDate && (
                                                    <p
                                                        className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                                                        style={{ color: "#d32f2f", marginTop: "4px", marginLeft: "14px" }}
                                                    >
                                                        {educationsErrors?.[educationIndex].startDate}
                                                    </p>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                    {/* Bitiş Tarihi */}
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" alignItems="start" sx={{ marginTop: 4 }}>
                                        <FormControl className="portfolioLabel">Bitiş Tarihi
                                            <span className="labelRequired labelRequiredEndDate" >
                                                ?*
                                                <span className='tooltipEndDate'>Şu anda burada okumuyorsanız bitiş tarihi alanı doldurulmalıdır!</span>
                                            </span></FormControl>
                                        <Grid width="90%" display="flex" flexDirection="column">
                                            <DatePicker
                                                sx={{
                                                    width: "100%",
                                                    "& .MuiPickersOutlinedInput-notchedOutline ": {
                                                        borderColor:
                                                            typeof formik.errors.educations?.[educationIndex] === "object" &&
                                                                (formik.errors.educations?.[educationIndex] as FormikErrors<IEducations>)?.endDate &&
                                                                formik.touched.educations?.[educationIndex].endDate
                                                                ? "#d32f2f !important"
                                                                : theme === "dark"
                                                                    ? "#fff !important"
                                                                    : "rgba(0,0,0,0.36) !important"
                                                    },
                                                    "& .MuiIconButton-root": {
                                                        color: theme === "dark" ? "#fff" : "rgba(0,0,0,0.54)"
                                                    },
                                                    "& .MuiPickersSectionList-root": {
                                                        color: theme === "dark" ? "#fff" : "rgba(0,0,0,1)"
                                                    }
                                                }}
                                                format='DD/MM/YYYY'
                                                value={dayjs(educationItem.endDate, "DD/MM/YYYY")}
                                                onChange={(newValue) => {
                                                    formik.setFieldValue(`educations[${educationIndex}].endDate`, newValue?.format("DD/MM/YYYY"))
                                                }}
                                                disabled={educationItem.startDate === null}
                                                minDate={
                                                    typeof educationItem.startDate === "string"
                                                        ? dayjs(educationItem.startDate, "DD/MM/YYYY")
                                                        : undefined
                                                } />
                                            {
                                                educationsErrors?.[educationIndex].endDate && educationsTouched?.[educationIndex]?.endDate && (
                                                    <p
                                                        className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                                                        style={{ color: "#d32f2f", marginTop: "4px", marginLeft: "14px" }}
                                                    >
                                                        {educationsErrors?.[educationIndex].endDate}
                                                    </p>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                    {/* Şu anda burada okuyorum */}
                                    <Grid size={{ xs: 12, sm: 12, md: 12 }} display="flex" alignItems="start" justifyContent="space-between" sx={{ marginTop: 4, width: "98% !important" }}>
                                        <FormControl className="portfolioLabel" sx={{ width: "100% !important" }}>Şu anda burada okuyorum</FormControl>
                                        <Checkbox
                                            onChange={formik.handleChange}
                                            checked={educationItem.isSchooling}
                                            name={`educations[${educationIndex}].isSchooling`}
                                            id={`isSchooling-${educationIndex}`}
                                            sx={{
                                                color: "var(--label-color)",
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                padding: "0px"
                                            }}
                                            size="large"
                                        />
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
                                degree: null,
                                startDate: null,
                                endDate: null,
                                isSchooling: false
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