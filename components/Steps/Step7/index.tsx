"use client";
import { ICreatePortfolio } from "@/app/createPortfolio/IProps";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { ModalContents } from "@/lists/ModalContents";
import { Box, Button, Checkbox, FormControl, Grid, Modal, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface IModal {
  type: string;
  isOpen: boolean;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function Step7() {
  const formik = useFormikContext<ICreatePortfolio>();
  const [modal, setModal] = useState<IModal>({ type: "", isOpen: false });
  const handleModal = (type: string) => setModal((prev: IModal) => ({ type, isOpen: !prev.isOpen }));
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);
  return (
    <>
      <Grid size={12} display="flex" flexDirection="column" gap={4}>
        <Typography
          sx={{
            color: theme === "dark" ? colorOptions[color].light : colorOptions[color].dark,
          }}
          variant="h4"
        >
          İzinler ve Tercihler
        </Typography>
      </Grid>
      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid size={12}>
          <Grid display="flex" gap={2} alignItems="center">
            <Checkbox
              sx={{
                color: "var(--label-color)",
                display: "flex",
                justifyContent: "flex-start",
                padding: "0px",
              }}
              size="large"
              onClick={(e) => {
                if (formik.values.privacyPolicy) {
                  formik.setFieldValue("privacyPolicy", false);
                } else {
                  e.preventDefault();
                  handleModal("privacyPolicy");
                }
              }}
              id="privacyPolicy"
              name="privacyPolicy"
              checked={formik.values.privacyPolicy || false}
              onChange={(e) => formik.setFieldValue("privacyPolicy", e.target.checked)}
            />
            <FormControl className="portfolioLabel" sx={{ width: "100% !important" }}>
              Gizlilik Politikası
              <span className="labelRequired" style={{ marginLeft: 4 }}>
                *
              </span>
            </FormControl>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Grid display="flex" gap={2} alignItems="center">
            <Checkbox
              sx={{
                color: "var(--label-color)",
                display: "flex",
                justifyContent: "flex-start",
                padding: "0px",
              }}
              size="large"
              id="termOfUse"
              name="termOfUse"
              onClick={(e) => {
                if (formik.values.termOfUse) {
                  formik.setFieldValue("termOfUse", false);
                } else {
                  e.preventDefault();
                  handleModal("termOfUse");
                }
              }}
              checked={formik.values.termOfUse || false}
              onChange={(e) => formik.setFieldValue("termOfUse", e.target.checked)}
            />
            <FormControl className="portfolioLabel" sx={{ width: "100% !important" }}>
              Kullanım Koşulları
              <span className="labelRequired" style={{ marginLeft: 4 }}>
                *
              </span>
            </FormControl>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Grid display="flex" gap={2} alignItems="center">
            <Checkbox
              sx={{
                color: "var(--label-color)",
                display: "flex",
                justifyContent: "flex-start",
                padding: "0px",
              }}
              size="large"
              name="explorePermission"
              id="explorePermission"
              onClick={(e) => {
                if (formik.values.explorePermission) {
                  formik.setFieldValue("explorePermission", false);
                } else {
                  e.preventDefault();
                  handleModal("explorePermission");
                }
              }}
              checked={formik.values.explorePermission || false}
              onChange={(e) => formik.setFieldValue("explorePermission", e.target.checked)}
            />
            <FormControl className="portfolioLabel" sx={{ width: "100% !important" }}>
              Keşfette Görünürlük Onayı
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={modal.isOpen} onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}>
        <Box sx={style}>
          <Typography variant="h4" component="h2">
            {ModalContents[modal.type]?.title}
          </Typography>
          <Typography sx={{ mt: 2, whiteSpace: "pre-line" }}>{ModalContents[modal.type]?.content}</Typography>
          <Grid size={12} display="flex" gap={4} justifyContent="space-around" marginTop={3}>
            <Button
              variant="contained"
              color="success"
              type="button"
              onClick={() => {
                formik.setFieldValue(modal.type, true);
                setModal((prev) => ({ ...prev, isOpen: false }));
              }}
            >
              {ModalContents[modal.type]?.complatedButtonText}
            </Button>
            <Button
              variant="contained"
              color="error"
              type="button"
              onClick={() => {
                setModal((prev) => ({ ...prev, isOpen: false }));
              }}
            >
              {ModalContents[modal.type]?.cancelButtonText}
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default Step7;
