"use client";
import {
  ICreatePortfolio,
  IProjectLinks,
  IProjects,
} from "@/app/createPortfolio/IProps";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import {
  ISocialMediaProjectsItem,
  projectsSocialMediaList,
} from "@/lists/SocialMedia/ProjectsSocialMediaList";
import { colorOptions } from "@/lists/color";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { RiDeleteBin2Line } from "react-icons/ri";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { convertToBase64 } from "@/functions/convertToBase64";
import { IoMdClose } from "react-icons/io";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Step6() {
  const formik = useFormikContext<ICreatePortfolio>();
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);
  const projectsError = formik.errors.projects as
    Array<FormikErrors<IProjects> | undefined | null>;
  const projectsTouched = formik.touched.projects as Array<
    FormikTouched<IProjects> | undefined
  >;

  return (
    <>
      <Grid size={12} display="flex" flexDirection="column" gap={4}>
        <Typography
          sx={{
            color:
              theme === "dark"
                ? colorOptions[color].light
                : colorOptions[color].dark,
          }}
          variant="h4"
        >
          Projeler ve Üretimler
        </Typography>
      </Grid>
      {formik.values.projects.length > 0 &&
        formik.values.projects.map(
          (projectItem: IProjects, projectIndex: number) => (
            <Grid
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "30px",
                border: `1px solid ${theme === "dark" ? colorOptions[color].light : colorOptions[color].dark}`,
                padding: "30px 20px 20px 20px",
                position: "relative",
                width: "100%",
              }}
              key={projectIndex}
            >
              <Grid>
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
                    const filteredProjects = formik.values.projects.filter(
                      (project) => project.id !== projectItem.id
                    );
                    formik.setFieldValue("projects", filteredProjects);
                  }}
                >
                  Sil <IoMdClose />
                </Button>
              </Grid>
              {/* Proje Başlığı */}
              <Grid size={{ xs: 12, sm: 12, md: 12 }} display="flex">
                <FormControl className="portfolioLabel">
                  Proje Başlığı <span className="labelRequired">*</span>
                </FormControl>
                <TextField
                  className="portfolioInput"
                  name={`projects[${projectIndex}].title`}
                  id={`projectTitle-${projectIndex}`}
                  onChange={formik.handleChange}
                  value={formik.values.projects[projectIndex].title}
                  error={Boolean(
                    projectsError?.[projectIndex]?.title &&
                    projectsTouched?.[projectIndex]?.title
                  )}
                  helperText={
                    projectsTouched?.[projectIndex]?.title &&
                    projectsError?.[projectIndex]?.title
                  }
                />
              </Grid>
              {/* Açıklama */}
              <Grid size={{ xs: 12, sm: 12, md: 12 }} display="flex">
                <FormControl className="portfolioLabel">
                  Açıklama <span className="labelRequired">*</span>
                </FormControl>
                <TextField
                  className="portfolioInput"
                  name={`projects[${projectIndex}].description`}
                  id={`projectDescription-${projectIndex}`}
                  onChange={formik.handleChange}
                  value={formik.values.projects[projectIndex].description}
                  error={Boolean(
                    projectsError?.[projectIndex]?.description &&
                    projectsTouched?.[projectIndex]?.description
                  )}
                  helperText={
                    projectsTouched?.[projectIndex]?.description &&
                    projectsError?.[projectIndex]?.description
                  }
                  multiline
                  rows={4}
                />
              </Grid>
              {/* Link */}
              <Grid
                size={12}
                display="flex"
                flexDirection={
                  projectItem.links.length === 0 ? "row" : "column"
                }
                width={"100%"}
                gap={2}
              >
                {projectItem.links.length === 0 && (
                  <FormControl className="portfolioLabel">Linkler <span className="labelRequired">*</span></FormControl>
                )}
                {projectItem.links.length > 0 &&
                  projectItem.links.map((linkItem, linkIndex) => {
                    const socialMediaError : any = projectsError?.[projectIndex]?.links?.[linkIndex]; // eslint-disable-line @typescript-eslint/no-explicit-any                    

                    const hasSocialMediaError = Boolean(socialMediaError?.socialMedia && projectsTouched?.[projectIndex]?.links?.[linkIndex]?.socialMedia);
                    const socialMediaErrorText = socialMediaError?.socialMedia;

                    const hasLinkUrlError = Boolean(socialMediaError?.linkUrl && projectsTouched?.[projectIndex]?.links?.[linkIndex]?.linkUrl);
                    const linkUrlErrorText = socialMediaError?.linkUrl;

                    return (
                      <Grid key={linkIndex} size={12} display="flex">
                        <Grid size={12} display="flex" flexDirection="row">
                          <FormControl className="portfolioLabel">
                            {linkIndex + 1}. Link
                          </FormControl>
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              gap: "20px",
                              alignItems: "center",
                            }}
                          >
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                              <Select
                                sx={{
                                  fontSize: "40px",
                                  width: "120px !important",
                                  marginLeft: "1 .5rem",
                                  "& .MuiSelect-select": {
                                    padding: "0px 14px !important",
                                    display: "flex",
                                    alignItems: "center",
                                    minHeight: "auto !important",
                                    height: "58.2969px !important",
                                  },
                                }}
                                className="portfolioSelect"
                                value={linkItem.socialMedia?.id || 0}
                                error={Boolean(hasSocialMediaError)}
                                onChange={(e) => {
                                  const selectedSocialMedia =
                                    projectsSocialMediaList.filter(
                                      (projectSocialItem) =>
                                        projectSocialItem.id === e.target.value
                                    );
                                  //selectedSocialMedia değişkeni bize array olarka dönüyordu
                                  // objeye çevirdik
                                  const selectedSocialMediaObject = Object.assign(
                                    selectedSocialMedia[0]
                                  );

                                  formik.setFieldValue(
                                    `projects[${projectIndex}].links[${linkIndex}].socialMedia`,
                                    selectedSocialMediaObject
                                  );
                                }}
                              >
                                {projectsSocialMediaList.map(
                                  (
                                    listItem: ISocialMediaProjectsItem,
                                    listItemIndex: number
                                  ) => {
                                    const IconComponent = listItem.icon;
                                    return (
                                      <MenuItem
                                        key={listItemIndex}
                                        value={listItem.id}
                                        sx={{
                                          fontSize: 30,
                                        }}
                                        disabled={Boolean(
                                          projectItem.links.find(
                                            (selectedLink) =>
                                              selectedLink.socialMedia?.id ===
                                              listItem.id
                                          )
                                        )}
                                      >
                                        <IconComponent />
                                      </MenuItem>
                                    );
                                  }
                                )}
                              </Select>
                              {
                                Boolean(hasSocialMediaError && socialMediaErrorText) && (
                                  <p
                                    className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
                                    id="photo-helper-text"
                                    style={{ color: "#d32f2f", margin: "0", marginTop: "5px", marginLeft: "8px", fontSize: ".7rem" }}
                                  >
                                    {socialMediaErrorText}
                                  </p>
                                )
                              }
                            </Box>
                            <TextField
                              className="portfolioInput"
                              sx={{ width: "100% !important" }}
                              name={`projects[${projectIndex}].links[${linkIndex}].linkUrl`}
                              id={`linkUrl-${projectIndex}`}
                              value={
                                formik.values.projects[projectIndex].links[
                                  linkIndex
                                ].linkUrl
                              }
                              onChange={formik.handleChange}
                              error={Boolean(hasLinkUrlError && linkUrlErrorText)}
                              helperText={hasLinkUrlError && linkUrlErrorText}
                            />
                            <RiDeleteBin2Line
                              size={30}
                              style={{
                                color: colorOptions[color].dark,
                                minWidth: "7%",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                const newLinks = projectItem.links.filter(
                                  (linkItemm) => linkItemm.id !== linkItem.id
                                );
                                formik.setFieldValue(
                                  `projects[${projectIndex}].links`,
                                  newLinks
                                );
                              }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    )
                  })}
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: "20px",
                    width: "100%",
                    display: "flex",
                    gap: "10px",
                  }}
                  onClick={() => {
                    const currentProjectLinks = projectItem.links;
                    const lastId =
                      projectItem.links.length > 0
                        ? projectItem.links[projectItem.links.length - 1].id + 1
                        : 1;
                    const newItem: IProjectLinks = {
                      id: lastId,
                      socialMedia: null,
                      linkUrl: "",
                    };
                    formik.setFieldValue(`projects[${projectIndex}].links`, [
                      ...currentProjectLinks,
                      newItem,
                    ]);
                  }}
                  disabled={Boolean(projectItem.links.length === 6)}
                >
                  Link Ekle
                </Button>
              </Grid>
              {/* Görsel */}
              <Grid size={12} display="flex" flexWrap="wrap">
                <Grid size={12} display="flex">
                  <FormControl className="portfolioLabel">Görsel</FormControl>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{
                      height: "100px",
                      color: colorOptions[color].dark,
                      backgroundColor: colorOptions[color].light,
                      border: `1px solid ${colorOptions[color].dark}`,
                    }}
                  >
                    Dosya Yükle (Max 1 dosya yüklenmelidir)
                    <VisuallyHiddenInput
                      type="file"
                      onChange={async (e) => {
                        const files: FileList | null = e.target.files;

                        if (files && files.length > 0) {
                          const file = files?.[0];

                          const extentedFile = Object.assign(file, {
                            previewUrl: URL.createObjectURL(file),
                          });

                          const base64File =
                            await convertToBase64(extentedFile);

                          const newAttachment = {
                            base64: base64File,
                            name: file.name,
                            id: Math.floor(Math.random() * 5854897894),
                            type: file.type,
                            size: file.size,
                          };

                          formik.setFieldValue(
                            `projects[${projectIndex}].attachment`,
                            newAttachment
                          );
                        }
                      }}
                    />
                  </Button>
                </Grid>
                {projectItem.attachment !== null && (
                  <Grid
                    size={12}
                    marginTop={2}
                    display="flex"
                    justifyContent="end"
                  >
                    <Grid
                      size={9}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        sx={{
                          color: theme === "dark" ? "#fff" : "#403e3e",
                          fontSize: "1.2rem",
                        }}
                      >
                        {projectItem.attachment.name}
                      </Typography>
                      <Grid display="flex" gap={2}>
                        <Button
                          sx={{
                            width: "6rem",
                            background: colorOptions["blue"].dark,
                          }}
                          variant="contained"
                          onClick={() => {
                            const url = projectItem.attachment?.base64;

                            if (!url?.startsWith("data:")) {
                              console.error("Geçersiz url : ", url);
                              return;
                            }

                            const arr = url.split(",");
                            const mime = arr[0].match(/:(.*?);/)?.[1];
                            const bstr = atob(arr[1]);
                            let n = bstr.length;
                            const u8arr = new Uint8Array(n);
                            while (n--) {
                              u8arr[n] = bstr.charCodeAt(n);
                            }

                            const blob = new Blob([u8arr], {
                              type: mime || "application/octet-stream",
                            });

                            const blobUrl = URL.createObjectURL(blob);

                            window.open(blobUrl, "_blank");
                          }}
                        >
                          Göster
                        </Button>
                        <Button
                          sx={{
                            width: "6rem",
                            background: colorOptions["red"].dark,
                          }}
                          variant="contained"
                          onClick={() => {
                            formik.setFieldValue(
                              `projects[${projectIndex}].attachment`,
                              null
                            );
                          }}
                        >
                          Sil
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          )
        )}
      <Grid size={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Button
          variant="outlined"
          sx={{
            fontSize: "30px",
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
          onClick={() => {
            const currentProjects = formik.values.projects || [];
            const lastId =
              formik.values.projects?.length > 0
                ? formik.values.projects[formik.values.projects.length - 1].id +
                1
                : 1;
            const newItem = {
              id: lastId,
              title: "",
              description:"",
              attachment: null,
              links: [],
            };
            formik.setFieldValue("projects", [...currentProjects, newItem]);
          }}
        >
          {formik.values.projects?.length > 0 ? "Ekle" : "Yeni ekle"}
        </Button>
        {Boolean(formik.errors.projects && formik.touched.projects) &&
          typeof formik.errors.projects === "string" && (
            <p
              className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
              style={{
                color: "#d32f2f",
                marginTop: "10px",
                marginLeft: "14px",
              }}
            >
              {formik.errors.projects}
            </p>
          )}
      </Grid>
    </>
  );
}

export default Step6;
