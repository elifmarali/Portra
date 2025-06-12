"use client";
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { colorOptions } from '@/lists/color';
import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { IoMdAdd } from "react-icons/io";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormikErrors, FormikTouched, useFormikContext } from 'formik';
import { ICertificates, ICertificatesFiles, ICreatePortfolio } from '@/app/createPortfolio/IProps';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { convertToBase64 } from '@/functions/convertToBase64';
import { IoMdClose } from "react-icons/io";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface IExtendFile extends File {
    previewUrl: string;
}

interface IError {
    id: number,
    isError: boolean
}

function Step3() {
    const formik = useFormikContext<ICreatePortfolio>();
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);
    const [fileError, setFileError] = useState<[] | IError[]>([]);
    const certificatesErrors = formik.errors.certificates as FormikErrors<ICertificates>[] | undefined;
    const certificatesTouched = formik.touched.certificates as Array<FormikTouched<ICertificates>> | undefined;

    useEffect(() => {
        if (certificatesTouched?.some((certificatesTouchedItem: any) => certificatesTouchedItem === true)) {
            setFileError((prev) => {
                const updatedErrors = [...prev];
                formik.values.certificates.map((certificateItem: ICertificates) => {
                    const alreadyExists = updatedErrors.find((errorItem: IError) => errorItem.id === certificateItem.id);

                    // Eğer error içersinde daha önce o id ile ilgili bir data tutulmamışsa
                    if (certificateItem?.files?.length >= 3 && !alreadyExists) {
                        updatedErrors.push({ id: certificateItem.id, isError: true })
                    }

                    // Eğer error içersinde daha önce o id ile ilgili bir data tutulmuşsa
                    if (certificateItem?.files?.length >= 3 && alreadyExists) {
                        const index = updatedErrors.findIndex((errorItem: IError) => errorItem.id === certificateItem.id);
                        if (index !== -1) {
                            updatedErrors[index] = { id: index, isError: true }
                        }
                    }
                });
                return updatedErrors;
            })
        }
    }, [formik.values.certificates, certificatesTouched]);

    return (
        <>
            <Grid size={12}>
                <Typography sx={{ color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }}
                    variant="h4">
                    Sertifikalar / Kurslar
                </Typography>
            </Grid>
            {
                formik.values.certificates.map((certificateItem: ICertificates, i) => {
                    return (
                        <Grid key={i} size={12}
                            sx={{
                                border: `1px solid ${theme === "dark" ? colorOptions[color].light : colorOptions[color].dark}`,
                                padding: "60px 20px 20px 20px",
                                display: "flex",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: "16px",
                                position: "relative",
                            }}
                        >
                            {/* Sertifika Başlığı */}
                            <Grid size={{ xs: 12, sm: 12, md: 6 }}
                                display="flex"
                                alignItems="start"
                                justifyContent="space-between">
                                <FormControl className="portfolioLabel">Başlık <span className="labelRequired">*</span></FormControl>
                                <TextField className="portfolioInput"
                                    sx={{ width: "60%" }}
                                    name="title"
                                    id="title"
                                    value={formik.values.certificates[i]?.title}
                                    onChange={(e) => formik.setFieldValue(`certificates[${i}].title`, e.target.value)}
                                    error={Boolean(certificatesTouched?.[i]?.title && certificatesErrors?.[i]?.title)}
                                    helperText={certificatesTouched?.[i]?.title && certificatesErrors?.[i]?.title}
                                />
                            </Grid>
                            {/* Belgenin Alındığı Kurum Adı */}
                            <Grid size={{ xs: 12, sm: 12, md: 6 }}
                                display="flex"
                                alignItems="start"
                                justifyContent="space-between">
                                <FormControl className="portfolioLabel">Belgenin Alındığı Kurum Adı <span className="labelRequired">*</span></FormControl>
                                <TextField className="portfolioInput"
                                    sx={{ width: "60%" }}
                                    name="companyName"
                                    id='companyName'
                                    value={formik.values.certificates[i]?.companyName}
                                    onChange={(e) => formik.setFieldValue(`certificates[${i}].companyName`, e.target.value)}
                                    error={Boolean(certificatesTouched?.[i]?.companyName && certificatesErrors?.[i]?.companyName)}
                                    helperText={certificatesTouched?.[i]?.companyName && certificatesErrors?.[i]?.companyName}
                                />
                            </Grid>
                            {/* Belgenin Alındığı Tarih */}
                            <Grid size={{ xs: 12, sm: 12, md: 6 }}
                                display="flex"
                                alignItems="start"
                                justifyContent="space-between">
                                <FormControl className="portfolioLabel">Belgenin Alındığı Tarih <span className="labelRequired">*</span></FormControl>
                                <Grid width="60%" display="flex" flexDirection="column">
                                    <DatePicker
                                        sx={{
                                            width: "100%",
                                            "& .MuiPickersOutlinedInput-notchedOutline ": {
                                                borderColor: (Boolean(certificatesErrors?.[i]?.date && certificatesTouched?.[i]?.date)) ? "#d32f2f !important" : theme === "dark" ? "#fff !important" : "rgba(0,0,0,0.36) !important"
                                            },
                                            "& .MuiIconButton-root": {
                                                color: theme === "dark" ? "#fff" : "rgba(0,0,0,0.54)"
                                            },
                                            "& .MuiPickersSectionList-root": {
                                                color: theme === "dark" ? "#fff" : "rgba(0,0,0,1)"
                                            }
                                        }}
                                        format='DD/MM/YYYY'
                                        value={dayjs(formik.values.certificates[i].date, "DD/MM/YYYY")}
                                        onChange={(newValue) => {
                                            formik.setFieldValue(`certificates[${i}].date`, newValue?.format("DD/MM/YYYY"))
                                        }}
                                    />
                                    {
                                        Boolean(certificatesTouched?.[i]?.date && certificatesErrors?.[i]?.date) && (
                                            <p
                                                className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                                                style={{ color: "#d32f2f", marginTop: "10px", marginLeft: "14px" }}
                                            >
                                                {certificatesTouched?.[i]?.date && certificatesErrors?.[i]?.date}
                                            </p>
                                        )
                                    }
                                </Grid>
                            </Grid>
                            {/* Dosya Ekleri */}
                            <Grid size={12}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    fullWidth
                                    sx={{ height: "100px", color: colorOptions[color].dark, backgroundColor: colorOptions[color].light, border: `1px solid ${colorOptions[color].dark}` }}
                                >
                                    Dosya Yükle (Max 3 dosya yüklenmelidir)
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={async (e: any) => {
                                            const filesFormik = formik.values.certificates[i].files ?? [];
                                            const files: FileList = e.target.files;
                                            const filesArray = Array.from(files);
                                            const limitedFiles = filesArray.slice(-3);

                                            if (filesFormik.length >= 3) {
                                                setFileError(prev => {
                                                    const exists = prev.find(file => file.id === certificateItem.id);
                                                    if (exists) {
                                                        return prev.map(file =>
                                                            file.id === certificateItem.id ? { ...file, isError: true } : file
                                                        );
                                                    } else {
                                                        return [...prev, { id: certificateItem.id, isError: true }];
                                                    }
                                                });
                                            }
                                            if (files) {
                                                // En fazla 3 dosya olacak şekilde sınırlıyoruz
                                                const newFiles = await Promise.all(
                                                    limitedFiles.map(async (fileItem: File) => {
                                                        const extentedFile: IExtendFile = Object.assign(fileItem, {
                                                            previewUrl: URL.createObjectURL(fileItem)
                                                        });

                                                        const base64File = await convertToBase64(extentedFile);

                                                        return {
                                                            base64: base64File,
                                                            name: fileItem.name,
                                                            id: Math.floor(Math.random() * 5854897894),
                                                            type: fileItem.type,
                                                            size: fileItem.size
                                                        }
                                                    })
                                                );

                                                const filesFormikLength = filesFormik.length;
                                                const calculate = 3 - filesFormikLength;
                                                const filesFiltered = calculate > 0 ? newFiles.slice(-calculate) : [];
                                                if (newFiles.length + filesFormikLength > 3) {
                                                    setFileError(prev => {
                                                        const exists = prev.find(file => file.id === certificateItem.id);
                                                        if (exists) {
                                                            return prev.map(file =>
                                                                file.id === certificateItem.id ? { ...file, isError: true } : file
                                                            );
                                                        } else {
                                                            return [...prev, { id: certificateItem.id, isError: true }];
                                                        }
                                                    });
                                                }
                                                formik.setFieldValue(`certificates[${i}].files`, [...filesFormik, ...filesFiltered])
                                            }
                                        }}
                                        multiple />
                                </Button>
                                {fileError.find((fileItem) => fileItem.id === certificateItem.id && fileItem.isError) && (
                                    <p
                                        className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                                        style={{ color: "#d32f2f", marginTop: "10px", marginLeft: "14px" }}
                                    >
                                        En fazla 3 dosya yüklenebilir
                                    </p>
                                )}
                                {
                                    (Array.isArray(certificateItem?.files) && certificateItem.files.length > 0) && (
                                        certificateItem.files.map((fileItem: ICertificatesFiles, fileItemIndex) => (
                                            <Grid size={12} key={fileItemIndex} sx={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: "20px",
                                                        color: theme === "dark" ? colorOptions[color].light : "rgba(0,0,0,1)",
                                                        width: "100%"
                                                    }}>{fileItem?.name}</Typography>
                                                <Grid sx={{ display: "flex", gap: "10px" }}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{ backgroundColor: colorOptions["blue"].dark }}
                                                        onClick={() => {
                                                            const dataURL = fileItem.base64;

                                                            if (!dataURL.startsWith("data:")) {
                                                                console.error("Geçersiz dataURL", dataURL);
                                                                return;
                                                            }

                                                            // base64 veri ayrıştır
                                                            const arr = dataURL.split(",");
                                                            const mime = arr[0].match(/:(.*?);/)?.[1];
                                                            const bstr = atob(arr[1]);
                                                            let n = bstr.length;
                                                            const u8arr = new Uint8Array(n);
                                                            while (n--) {
                                                                u8arr[n] = bstr.charCodeAt(n);
                                                            }

                                                            const blob = new Blob([u8arr], { type: mime || "application/octet-stream" });
                                                            const blobUrl = URL.createObjectURL(blob);

                                                            window.open(blobUrl, "_blank");
                                                        }}
                                                    >
                                                        Göster
                                                    </Button>

                                                    <Button variant="contained" sx={{ backgroundColor: colorOptions["red"].dark }} onClick={() => {
                                                        const currentFiles = formik.values.certificates[i].files;
                                                        const filteredFiles = currentFiles.filter((item: ICertificatesFiles) => item.id !== fileItem.id);
                                                        formik.setFieldValue(`certificates[${i}].files`, filteredFiles);
                                                    }}>Kaldır</Button>
                                                </Grid>
                                            </Grid>
                                        ))
                                    )
                                }
                            </Grid>
                            <Button
                                style={{
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

                                }}
                            >
                                Sil
                                <IoMdClose
                                    onClick={() => {
                                        const filteredCertificates = formik.values.certificates.filter((item) => item.id !== certificateItem.id);
                                        formik.setFieldValue("certificates", filteredCertificates);
                                    }} />
                            </Button>
                        </Grid>

                    )
                })
            }
            <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outlined"
                    sx={{ fontSize: "30px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
                    onClick={() => {
                        const current = formik.values.certificates || [];
                        const lastId = current.length > 0 ? current[current.length - 1].id + 1 : 1;
                        const newItem = {
                            id: lastId,
                            title: "",
                            companyName: "",
                            date: null,
                            file: null
                        };
                        formik.setFieldValue("certificates", [...current, newItem]);
                    }}> {formik.values.certificates.length === 0 ? "Yeni Ekle" : "Ekle"} <IoMdAdd fontSize={30} /></Button>
            </Grid>           
        </>
    )
}

export default Step3
