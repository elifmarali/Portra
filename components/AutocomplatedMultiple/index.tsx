import React, { useEffect, useState } from 'react';
import useAutocomplete, { AutocompleteGetTagProps } from '@mui/material/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { colorOptions } from '@/lists/color';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/lib/redux/features/theme/themeSlice';
import { selectColor } from '@/lib/redux/features/color/colorSlice';

export interface IListMultiple {
    id: number;
    name: string;
}

interface CustomizedHookProps {
    type: string;
    list: IListMultiple[];
    selectedJobList?: IListMultiple[] | [];
    setSelectedJobList?: React.Dispatch<React.SetStateAction<IListMultiple[]>>;
    errorText: string;
}

const Root = styled('div')(({ theme }) => ({
    width: "90%",
    color: 'rgba(0,0,0,0.85)',
    fontSize: '14px',
    ...theme.applyStyles?.('dark', {
        color: 'rgba(255,255,255,0.65)',
    }),
}));

interface InputWrapperProps {
    mode: string;
    className?: string;
    color: string;
    isError: boolean;
}

const InputWrapper = styled('div')<InputWrapperProps>(({ mode, color, isError }) => {
    const isDark = mode === 'dark';

    return {
        width: '100%',
        border: `1px solid ${isError ? "#d32f2f" : "var(--border-color)"}`,
        backgroundColor: isDark ? '#000' : '#fff',
        borderRadius: '4px',
        display: 'flex',
        alignItems: "center !important",
        flexWrap: 'wrap',
        minHeight: "58px",
        '&:hover': {
            borderColor: colorOptions[color].dark,
        },
        '&.focused': {
            borderColor: colorOptions[color].dark,
            boxShadow: '0 0 0 2px rgb(24 144 255 / 0.2)',
        },
        '& input': {
            color: isDark ? "#fff" : "#000",
            boxSizing: 'border-box',
            padding: '10px 4px',
            width: '90%',
            flexGrow: 1,
            margin: 0,
            outline: 0,
            height: "58.3px",
            backgroundColor: isDark ? "#222" : "lightGray"
            // borderTop: `.1px  solid ${colorOptions[color].dark}`
        },
    };
});

function Tag(props: TagProps) {
    const { label, onDelete, ...other } = props;
    return (
        <div {...other}>
            <span>{label}</span>
            <CloseIcon onClick={onDelete} />
        </div>
    );
}

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}

interface StyledTagProps extends TagProps {
    colorMode: 'light' | 'dark';
    color: keyof typeof colorOptions;
}

const StyledTag = styled(Tag, {
    shouldForwardProp: (prop) => prop !== 'color' && prop !== 'colorMode'
})<StyledTagProps>(({ colorMode, color }) => {
    const isDark = colorMode === 'dark';

    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        height: '30px',
        margin: '2px',
        lineHeight: '22px',
        backgroundColor: "#fff",
        border: `1px solid ${isDark ? colorOptions[color].light : colorOptions[color].dark}`,
        borderRadius: '2px',
        boxSizing: 'content-box',
        padding: '5px 20px',
        outline: 0,
        overflow: 'hidden',
        color: isDark ? '#000' : colorOptions[color].dark,
        '&:hover': {
            borderColor: colorOptions[color].dark,
        },
        '&:focus': {
            borderColor: colorOptions[color].dark,
        },
        '& span': {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        '& svg': {
            fontSize: '30px',
            cursor: 'pointer',
            padding: '4px',
        },
    };
});

const Listbox = styled('ul')(({ theme }) => ({
    width: '31%',
    margin: '2px 0 0',
    padding: 0,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: '#fff',
    overflow: 'auto',
    maxHeight: '250px',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgb(0 0 0 / 0.15)',
    zIndex: 1,
    ...theme.applyStyles?.('dark', {
        backgroundColor: '#141414',
    }),
    '& li': {
        padding: '5px 12px',
        display: 'flex',
        fontSize: "16px",
        '& span': {
            flexGrow: 1,
        },
        '& svg': {
            color: 'transparent',
        },
    },
    "& li[aria-selected='true']": {
        backgroundColor: '#fafafa',
        fontWeight: 600,
        ...theme.applyStyles?.('dark', {
            backgroundColor: '#2b2b2b',
        }),
        '& svg': {
            color: '#1890ff',
        },
    },
    [`& li.${autocompleteClasses.focused}`]: {
        backgroundColor: '#e6f7ff',
        cursor: 'pointer',
        ...theme.applyStyles?.('dark', {
            backgroundColor: '#003b57',
        }),
        '& svg': {
            color: 'currentColor',
        },
    },
}));

export default function CustomizedHookMultiple({
    type,
    list,
    selectedJobList,
    setSelectedJobList,
    errorText
}: CustomizedHookProps) {
    const theme = useSelector(selectTheme); // 'light' | 'dark'
    const color = useSelector(selectColor); // örn: 'blue'
    const [currentSelectedList, setCurrentSelectedList] = useState<IListMultiple[] | []>([]);

    useEffect(() => {
        if (type === "job" && selectedJobList) {
            setCurrentSelectedList(selectedJobList);
        }
    }, [type, selectedJobList]);

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
    } = useAutocomplete<IListMultiple, true, false, false>({
        id: 'customized-hook-demo',
        multiple: true, // Always enabled
        options: list,
        value: currentSelectedList,
        getOptionLabel: (option) => option.name,
        onChange: (event, value) => {
            if (type === "job" && setSelectedJobList) {
                setSelectedJobList(value);
            }
        }
    });

    return (
        <Root>
            <div {...getRootProps()}>
                <InputWrapper
                    mode={theme}
                    color={color}
                    ref={setAnchorEl}
                    className={focused ? 'focused' : ''}
                    isError={!!errorText}
                >
                    {value.map((option: IListMultiple, index: number) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                            <StyledTag
                                key={key}
                                label={option.name}
                                color={color}
                                colorMode={theme === 'dark' ? 'dark' : 'light'}
                                {...tagProps}
                            />
                        );
                    })}
                    <input
                        {...getInputProps()}
                        aria-hidden="true"
                        placeholder='Yeni ekle...'
                        className='!color-[#fff]'
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
                    {(groupedOptions as IListMultiple[]).map((option, index) => {
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
