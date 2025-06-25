import React, { useEffect, useState } from "react";
import useAutocomplete, {
  AutocompleteGetTagProps,
} from "@mui/material/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { colorOptions } from "@/lists/color";
import { useSelector } from "react-redux";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { ICity, ICityWorkExperience, ICountry, ICountryWorkExperience, IDistrict } from "@/app/createPortfolio/IProps";
import "@/components/Autocompleted/style.css";

export interface IList {
  id: number;
  name: string;
  country_id?: number;
}

interface CustomizedHookProps {
  type: string;
  list: IList[] | any;
  selectedCountry?: ICountry | null;
  setSelectedCountry?: React.Dispatch<React.SetStateAction<ICountry | null>>;
  selectedCity?: ICity | null;
  setSelectedCity?: React.Dispatch<React.SetStateAction<ICity | null>>;
  selectedDistrict?: IDistrict | null;
  setSelectedDistrict?: React.Dispatch<React.SetStateAction<IDistrict | null>>;
  errorText: any;
  selectedCountryWorkExperience?: ICountryWorkExperience | null,
  setSelectedCountryWorkExperience?: React.Dispatch<React.SetStateAction<any>>;
  selectedCityWorkExperience?: ICityWorkExperience | null,
  setSelectedCityWorkExperience?: React.Dispatch<React.SetStateAction<any>>;
  workItemIndex?: number;
}

const Root = styled("div")(({ theme }) => ({
  width: "90%",
  color: "rgba(0,0,0,0.85)",
  fontSize: "14px",
  ...theme.applyStyles?.("dark", {
    color: "rgba(255,255,255,0.65)",
  }),
}));

interface InputWrapperProps {
  mode: string;
  className?: string;
  color: string;
  isError: boolean;
}

const InputWrapper = styled("div")<InputWrapperProps>(({ mode, color, isError }) => {
  const isDark = mode === "dark";

  return {
    width: "100%",
    border: `1px solid ${isError ? "#d32f2f" : "var(--border-color)"}`,
    backgroundColor: isDark ? "#000" : "#fff",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center !important",
    flexWrap: "wrap",
    minHeight: "58px",
    "&:hover": {
      borderColor: colorOptions[color].dark,
    },
    "&.focused": {
      borderColor: colorOptions[color].dark,
      boxShadow: "0 0 0 2px rgb(24 144 255 / 0.2)",
    },
    "& input": {
      color: isDark ? "#fff" : "#000",
      boxSizing: "border-box",
      padding: "10px 4px",
      width: "90%",
      flexGrow: 1,
      border: 0,
      margin: 0,
      outline: 0,
      height: "58.3px",
      borderRadius: "4px",
    },
  };
});

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={() => onDelete()} />
    </div>
  );
}

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  key: number;
  onDelete: () => void;
  label: string;
}

interface StyledTagProps extends TagProps {
  colorMode: "light" | "dark";
  color: keyof typeof colorOptions;
}

const StyledTag = styled(Tag, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "colorMode",
})<StyledTagProps>(({ colorMode, color }) => {
  const isDark = colorMode === "dark";

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "30px",
    margin: "2px",
    lineHeight: "22px",
    backgroundColor: "#fff",
    border: `1px solid ${isDark ? colorOptions[color].light : colorOptions[color].dark}`,
    borderRadius: "2px",
    boxSizing: "content-box",
    padding: "5px 20px",
    outline: 0,
    overflow: "hidden",
    color: isDark ? "#000" : colorOptions[color].dark,
    "&:hover": {
      borderColor: colorOptions[color].dark,
    },
    "&:focus": {
      borderColor: colorOptions[color].dark,
    },
    "& span": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "100%",
    },
    "& svg": {
      fontSize: "30px",
      cursor: "pointer",
      padding: "4px",
    },
  };
});

const Listbox = styled("ul")(({ theme }) => ({
  width: "31%",
  margin: "2px 0 0",
  padding: 0,
  position: "absolute",
  listStyle: "none",
  backgroundColor: "#fff",
  overflow: "auto",
  maxHeight: "250px",
  borderRadius: "4px",
  boxShadow: "0 2px 8px rgb(0 0 0 / 0.15)",
  zIndex: 1,
  ...theme.applyStyles?.("dark", {
    backgroundColor: "#141414",
  }),
  "& li": {
    padding: "5px 12px",
    display: "flex",
    fontSize: "16px",
    "& span": {
      flexGrow: 1,
    },
    "& svg": {
      color: "transparent",
    },
  },
  "& li[aria-selected='true']": {
    backgroundColor: "#fafafa",
    fontWeight: 600,
    ...theme.applyStyles?.("dark", {
      backgroundColor: "#2b2b2b",
    }),
    "& svg": {
      color: "#1890ff",
    },
  },
  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: "#e6f7ff",
    cursor: "pointer",
    ...theme.applyStyles?.("dark", {
      backgroundColor: "#003b57",
    }),
    "& svg": {
      color: "currentColor",
    },
  },
}));

export default function CustomizedHook({
  type,
  list,
  selectedCountry,
  setSelectedCountry,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  errorText,
  selectedCountryWorkExperience,
  setSelectedCountryWorkExperience,
  selectedCityWorkExperience,
  setSelectedCityWorkExperience,
  workItemIndex
}: CustomizedHookProps) {
  const theme = useSelector(selectTheme); // 'light' | 'dark'
  const color = useSelector(selectColor); // örn: 'blue'
  const [inputValue, setInputValue] = useState("");
  const [currentSelected, setCurrentSelected] = useState<IList | null>(null);

  useEffect(() => {
    console.log("selectedCityWorkExperience12345 : ", selectedCityWorkExperience);
  }, [selectedCityWorkExperience])

  useEffect(() => {
    if (type === "district") {
      if (selectedDistrict === null) {
        setCurrentSelected(null); // İlçe dışarıdan null geldiyse içerideki state'i de sıfırla
      } else if (selectedDistrict) {
        setCurrentSelected(selectedDistrict);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict]);

  useEffect(() => {
    if (type === "city") {
      if (selectedCity === null) {
        setCurrentSelected(null); // Şehir dışarıdan null geldiyse içerideki state'i de sıfırla
        setSelectedCity?.(null);
        setSelectedDistrict?.(null);
      } else if (selectedCity) {
        setCurrentSelected(selectedCity);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  useEffect(() => {
    if (type === "country") {
      if (selectedCountry === null) {
        setCurrentSelected(null);
        setSelectedCity?.(null);
        setSelectedCountry?.(null); // Şehir dışarıdan null geldiyse içerideki state'i de sıfırla
        setSelectedDistrict?.(null);
      } else if (selectedCountry) {
        setCurrentSelected(selectedCountry);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  useEffect(() => {
    if (type === "countryWorkExperience") {
      if (selectedCountryWorkExperience === null) {
        setCurrentSelected(null);
        setSelectedCountryWorkExperience?.(null);
        setSelectedCityWorkExperience?.(null);
      } else if (selectedCountryWorkExperience) {
        setCurrentSelected(selectedCountryWorkExperience);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountryWorkExperience]);

  useEffect(() => {
    if (type === "cityWorkExperience") {
      if (selectedCity === null) {
        setCurrentSelected(null);
        setSelectedCityWorkExperience?.([]);
      } else if (selectedCityWorkExperience) {
        setCurrentSelected(selectedCityWorkExperience);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCityWorkExperience]);


  useEffect(() => {
    if (type === "country" && selectedCountry) {
      setCurrentSelected(selectedCountry);
    } else if (type === "city" && selectedCity) {
      setCurrentSelected(selectedCity);
    } else if (type === "district" && selectedDistrict) {
      setCurrentSelected(selectedDistrict);
    } else if (type === "countryWorkExperience" && selectedCountryWorkExperience) {
      setCurrentSelected(selectedCountryWorkExperience);
    } else if (type === "cityWorkExperience" && selectedCityWorkExperience) {
      setCurrentSelected(selectedCityWorkExperience);
    }
  }, [type, selectedCountry, selectedCity, selectedDistrict, selectedCountryWorkExperience, selectedCityWorkExperience]);

  useEffect(() => {
    setInputValue("");
  }, [currentSelected]);

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete<IList, false, false, false>({
    id: "customized-hook-demo",
    options: list,
    value: currentSelected,
    getOptionLabel: (option) => option?.name,
    inputValue: inputValue,
    onInputChange: (event, newInputValue) => {
      setInputValue(newInputValue);
    },
    onChange: (event, value: IList | null) => {
      if (type === "country") {
        setSelectedCountry?.(value ?? null);
        setSelectedCity?.(null);
        setSelectedDistrict?.(null);
      } else if (type === "city") {
        setSelectedCity?.((value as ICity) ?? null);
        setSelectedDistrict?.(null);
      } else if (type === "district") {
        setSelectedDistrict?.((value as IDistrict) ?? null);
      } else if (type === "countryWorkExperience") {
        setSelectedCountryWorkExperience?.((value));
      } else if (type === "cityWorkExperience") {
        setSelectedCityWorkExperience?.((value as ICityWorkExperience))
      }
      setCurrentSelected(value ?? null);
      setInputValue("");
    },
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <InputWrapper
          mode={theme}
          color={color}
          ref={setAnchorEl}
          className={focused ? "focused" : ""}
          isError={typeof errorText === "string" ? errorText.trim() !== "" : !!errorText}
        >
          {value &&
            (() => {
              const { key, ...tagProps } = getTagProps({ index: 0 });
              if (value.id !== null) {
                return (
                  <StyledTag
                    {...tagProps}
                    key={key} // kendi ID değerini kullan
                    label={value.name}
                    color={color}
                    colorMode={theme === "dark" ? "dark" : "light"}
                    onDelete={() => {
                      setCurrentSelected(null);
                      setInputValue("");
                      if (type === "country") {
                        setSelectedCountry?.(null);
                        setSelectedCity?.(null);
                        setSelectedDistrict?.(null);
                        setCurrentSelected(null);
                      } else if (type === "city") {
                        setSelectedCity?.(null);
                        setSelectedDistrict?.(null);
                        setCurrentSelected(null);
                      } if (type === "countryWorkExperience" && typeof workItemIndex === "number") {
                        console.log("ÇALIŞTIMMMMMMMMMMMMMMM");

                        // Ülkeyi seçilenlerden kaldır
                        setSelectedCountryWorkExperience?.((prev: any) => {
                          const safePrev = Array.isArray(prev) ? prev : [];
                          const newArr = [...safePrev];
                          const idx = newArr.findIndex(item => item.workExperienceId === workItemIndex);
                          if (idx !== -1) newArr.splice(idx, 1);

                          return newArr.length === 0 ? null : newArr;
                        });

                        setSelectedCityWorkExperience?.((prev: any) => {
                          const safePrev = Array.isArray(prev) ? prev : [];
                          const newArr = [...safePrev];
                          if (workItemIndex >= 0 && workItemIndex < newArr.length) {
                            newArr.splice(workItemIndex, 1);
                          }

                          return newArr.length === 0 ? null : newArr;
                        });

                        setCurrentSelected(null);
                        setInputValue("");
                      }

                    }}
                  />
                );
              }
            })()}
          <input
            {...getInputProps()}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Yeni ekle..."
            className={`!color-[#fff] ${currentSelected instanceof Object && "!hidden"} ${errorText !== "" && "error"}`}
          />
        </InputWrapper>
      </div>
      <p
        className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-er619e-MuiFormHelperText-root"
        id="photo-helper-text"
        style={{ color: "#d32f2f" }}
      >
        {errorText}
      </p>
      {groupedOptions.length > 0 && (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as IList[]).map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li key={key} {...optionProps}>
                <span>{option.name}</span>
                <CheckIcon fontSize="small" />
              </li>
            );
          })}
        </Listbox>
      )}
    </Root>
  );
}
