"use client";
import { selectColor } from '@/lib/redux/features/color/colorSlice';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { colorOptions } from '@/lists/color';
import { Button, FormControl, Grid, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { ICreatePortfolio, IWorkExperiences } from '@/app/createPortfolio/IProps';
import { IoMdAdd } from 'react-icons/io';
import { useEffect } from 'react';


function Step4() {
    const formik = useFormikContext<ICreatePortfolio>();
    const theme = useSelector(selectTheme);
    const color = useSelector(selectColor);

    useEffect(() => {
        console.log("workExperience : ", formik.values.workExperiences);
    }, [formik.values.workExperiences])

    return (
        <>
            <Grid size={12}>
                <Typography sx={{ color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark }}
                    variant="h4">
                    İş Deneyimi
                </Typography>
            </Grid>
            {
                formik.values.workExperiences.map((workItem: IWorkExperiences, workItemIndex) => {
                    return (
                        <Grid key={workItemIndex} size={12}>
                            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                                <FormControl className='portfolioLabel'>Pozisyon</FormControl>
                                <TextField
                                    name="position"
                                    id="position"
                                    value={formik.values.workExperiences[workItemIndex].position}
                                    onChange={formik.handleChange}
                                    className='portfolioInput' />
                            </Grid>
                        </Grid>
                    )
                })
            }
            <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outlined"
                    sx={{ fontSize: "30px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
                    onClick={() => {
                        const current = formik.values.workExperiences || [];
                        const lastId = current.length > 0 ? current[current.length - 1].id + 1 : 1;
                        const newItem = {
                            id: lastId,
                            position: "",
                            title: "",
                            country: "",
                            city: "",
                            startDate: null,
                            endDate: null,
                            description: "",
                            isWorking: false
                        };
                        formik.setFieldValue("workExperiences", [...current, newItem]);
                    }}> {formik.values.workExperiences.length === 0 ? "Yeni Ekle" : "Ekle"} <IoMdAdd fontSize={30} /></Button>
            </Grid>
        </>
    )
}

export default Step4;
