import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const elements = {
    linkColor: "#3a99d9",
};
export const theme = createMuiTheme({
    typography: {
        // fontFamily: 'Open Sans',
        fontSize: 16,
        color: "#2a292a",
        //useNextVariants: true,
    },

    palette: {
        primary: {
            textColor: "white",
            // let these comments stay, they deliver useful information and are not dead-code
            // light: will be calculated from palette.primary.main,
            main: "#6fb934",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: "#6fb934",
            main: "#6fb934",
            // dark: will be calculated from palette.secondary.main,
            contrastText: "#FFFFFF",
        },
        // error: will use the default color
    },

    overrides: {
        makeSyles: {
            paper: {
                width: '860px'
            }
        },
        MuiList: {
            root: {
                paddingBottom: "0 !important",
            },
            padding: {
                paddingTop: "12px",
                minWidth: "248px",
            },
        },
        MuiTableRow: {
            root: {
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "#EBEBEB !important",
                },
            },
        },
        MuiTableCell: {
            root: {
                fontSize: '0.875rem',
                borderBottom: 'none'
            },
        },
        MuiTableSortLabel: {
            root: {
                fontWeight: 'bold',
            }
        },
        MuiInputLabel: {
            root: {
                fontSize: "0.875rem",
            },
        },
        MuiPaper: {
            rounded: {
                //minWidth: '30rem',
                //borderRadius: "0.5rem",
                borderRadius: "4px",
            },
        },
        MuiCard: {
            root: {
                padding: "2rem",
            },
        },
        MuiButton: {
            sizeLarge: {
                width: "17.5rem",
                color: "#ffffff",
                fontSize: "0.875rem",
                fontWeight: "800",
                letterSpacing: "0.4px",
            },

            root: {
                color: "#ffffff",
                fontSize: "0.875rem",
                "&$disabled": {
                    opacity: "0.5",
                    backgroundColor: "#d7dee5 !important",
                    border: "none 0px !important",
                },
            },
            contained: {
                color: "#ffffff",
                fontWeight: "600",
                boxShadow: "unset !important",
            },
            containedPrimary: {
                color: "#ffffff",
                fontWeight: "600",
                "&:hover": {
                    boxShadow: "0 1px 2px 0 rgba(111, 185, 52, 0.32), 0 2px 8px 1px rgba(111, 185, 52, 0.26) !important ",
                },
            },
            outlinedPrimary: {
                color: "#6fb934",
                borderWidth: "2px",
            },

            /*disabled:{
              backgroundColor:"#d7dee5 !important",
              border:"none 0px !important",
            }*/
        },
        a: {
            color: "#3a99d9",

            text: {
                fontWeight: "600",
                fontSize: "1rem",
            },
        },
        MuiTypography: {
            root: {
                color: "#2a292a",
            },
            subtitle1: {
                fontWeight: "600",
                fontSize: "1rem",
            },

            h1: {
                fontSize: "96px",
                fontWeight: "normal",
                fontStyle: "normal",
                fontStretch: "normal",
                lineHeight: "normal",
            },
            h2: {
                fontSize: "60px",
            },
            h3: {
                fontSize: "48px",
                fontWeight: "600",
            },
            h4: {
                fontSize: "34px",
                color: "#2a292a",
                fontWeight: "normal",
            },
            h5: {
                fontSize: "24px",
                fontWeight: "normal",
            },
            h6: {
                fontSize: "22px",
                fontWeight: "600",
            },
            body1: {
                fontSize: "14px",
                lineHeight: "1.25",
                fontWeight: "normal",
                color: "#2a292a",
                height: "20px",
            },
            paragraph: {
                fontWeight: "400",
                fontSize: "1rem",
            },
            caption: {
                color: "#0000008a",
                fontSize: "12px",
                letterSpacing: "0.4px",
            },
            subtitle2: {
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "normal",
            },
            /*body1: {
              fontSize: "16px",
              lineHeight: "1.25",
              fontWeight: "normal",
              color: "#2a292a",
              height: "20px",
            },
            body1: {
              fontSize: "14px",
              //lineHeight: '1.14',
              fontWeight: "normal",
              color: "#2a292a",
            },*/
        },
        MuiDialogActions: {
            root: {
                justifyContent: "center",
            },
        },

        MuiFormLabel: {
            root: {
                "&$disabled": {
                    //   fontWeight: "600",
                    //   color: "#000 !important",
                },
                "&$error": {
                    color: "#f44336",
                    //"fontSize": "0.875rem"
                },
            },
            /* error: {
              color: "#d0021b",
              fontSize: "0.875rem",
            },*/
        },
        MuiStepConnector: {
            lineHorizontal: {
                borderTopWidth: "2px",
                display: "flex",
                height: "2px !important",
            },
        },
        MuiMenu: {
            list: {
                overflow: 'scroll'
            }
        },
        MuiMenuItem: {
            root: {
                // paddingBottom: '0',
                //height: '15px',
                overflow: 'initial'
            },
        },

        MuiDialogContent: {
            root: {
                padding: "0 2px 1rem important",
                "&:first-child": {
                    paddingTop: "0 !important",
                },
            },
        },

        MuiExpansionPanel: {
            root: {
                "&:first-child": {
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                },
                "&:last-child": {
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                },
                "&$disabled": {
                    backgroundColor: "#FFFFFF",
                },
            },
            "&$expanded": {
                borderRadius: "5px",
                margin: "0.5rem !important",
            },
        },
        MuiExpansionPanelDetails: {
            root: {
                display: "inline",
                padding: "0px !important",

                "& > :first-child": {
                    // paddingLeft: '4rem',
                    // paddingRight: '1.5rem'
                },
            },
        },
        MuiExpansionPanelActions: {
            root: {
                maxHeight: "3.5rem",
            },
        },
        MuiStepIcon: {
            active: {
                color: "red",
                "& text": {
                    fill: "#FFFFFF",
                    fontWeight: "600",
                    fontSize: "14px",
                },
            },
            text: {
                fill: "white",
            },
        },
        MuiStepLabel: {
            active: {
                fontWeight: "600 !important",
            },
        },
        MuiSlider: {
            track: {
                height: "6px",
                borderRadius: "3px",
                backgroundImage: "linear-gradient(to right, #95ee4f, #6fb934)",
            },
            thumb: {
                width: "24px",
                height: "24px",
            },
        },
        MuiFormHelperText: {
            root: {
                lineHeight: "1.5em",
                fontSize: "12px",
                color: "#9990a1",
            },
            contained: {
                margin: "0",
                paddingLeft: "12px",
            },
        },
    },

    a: {
        color: "#3a99d9",
    },
});

theme.overrides.MuiToolbar = {
    regular: {
        minHeight: "48px !important",
        fontSize: '22px',
        fontWeight: '600'
    },
    gutters: {
        [theme.breakpoints.down("sm")]: {
            paddingRight: "8px",
            paddingLeft: "8px",
        },
    },
};
theme.overrides.MuiStepLabel = {
    label: {
        "&$alternativeLabel": {
            [theme.breakpoints.down("sm")]: {
                marginTop: "6px",
                fontSize: "12px",
            },
        },
    },
};
theme.overrides.MuiStepButton = {
    root: {
        [theme.breakpoints.down("sm")]: {
            marginRight: "0",
            paddingRight: "0",
        },
    },
};
theme.overrides.MuiExpansionPanel = {
    root: {
        "&:first-child": {
            borderTop: "1px solid rgba(0,0,0,0.12)",
            borderRadius: "5px 5px 0px 0px",
        },
        "&:last-child": {
            borderTop: "1px solid rgba(0,0,0,0.12)",
            borderRadius: "0px 0px 5px 5px",
        },
        "&:before": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
        "&$disabled": {
            backgroundColor: "#ffffff",
            // "& p": {
            //   opacity: "0.3",
            // },
        },
        [theme.breakpoints.down("sm")]: {
            //paddingRight:"8px",
        },
    },
    expanded: {
        marginTop: "0.5rem !important",
        marginBottom: "0.5rem !important",
        borderRadius: "5px !important",
        "&:first-child": {
            marginTop: "0px !important",
        },
    },
};
theme.overrides.MuiExpansionPanelSummary = {
    root: {
        minHeight: "56px",
        "&$expanded": {
            borderBottom: "1px solid rgba(0,0,0,.125)",
            /* min-height: 64px; */
            minHeight: "56px",
        },
    },
    expandIcon: {
        padding: "0 !important",
        [theme.breakpoints.up("sm")]: {
            right: "13px !important",
        },
        [theme.breakpoints.down("sm")]: {
            right: "8px !important",
        },
    },
    content: {
        margin: "6px 0",
        "&$expanded": {
            margin: "0 0 !important",
        },
        marginRight: "2px",
        [theme.breakpoints.down("sm")]: {
            marginRight: "0px",
        },
    },
    disabled: {
        opacity: "1 !important",
    },
};
theme.overrides.MuiSlider = {
    thumb: {
        width: "24px",
        height: "24px",
    },
    track: {
        height: "6px",
        borderRadius: "3px",
    },
    trackBefore: {
        backgroundImage: "linear-gradient(to right, #95ee4f, #6fb934)",
    },
    trackAfter: {
        backgroundColor: "rgba(0, 0, 0, 0.38)",
    },
    activated: {
        [theme.breakpoints.down("sm")]: {
            boxShadow: "unset !important",
        },
    },
};

theme.overrides.MuiSelect = {
    select: {
        "&:focus": {
            backgroundColor: "unset !important",

        },
        fontWeight: 'normal',
        fontSize: '1rem'
    },
    icon: {
        marginRight: "8px",
    },
};

theme.overrides.MuiDialog = {
    paper: {
        [theme.breakpoints.down("sm")]: {
            //height: '100%',
            maxHeight: "100% !important",
            margin: "0",
            borderRadius: "0",
            //padding: "1rem",
        },
        [theme.breakpoints.up("sm")]: {
            height: "auto",
        },
    },
    paperWidthSm: {
        maxWidth: "450px",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
};


theme.overrides.MuiOutlinedInput = {
    root: {
        minHeight: "40px",
    },
    input: {
        padding: "10.5px 14px",

        fontSize: "14px",
        fontWeight: 600,
        color: "#2a292a",
        // font-style: normal;
        // font-stretch: normal;
        // line-height: normal;
        // letter-spacing: normal;
    },
    multiline: {
        padding: "10.5px 14px",

        fontSize: "14px",
        fontWeight: 600,
    },
    notchedOutline: {
        borderRadius: "4px",
        border: "solid 1px ",
        color: "#cec3d8",
        borderColor: "#cec3d8",
    },
};

theme.overrides.MuiInputLabel = {
    outlined: {
        zIindex: 1,
        transform: "translate(14px, 20px) scale(1)",
        pointerEvents: "none",
        top: "-7px",
        fontSize: "14px",
        color: "#9990a1",
    },
    shrink: {
        transform: "translate(14px, 2px) scale(0.75) !important",
    },
};
theme.overrides.MuiRadio = {
    root: {
        margin: "0 0 0 8px !important",
        padding: "0 !important",
    },
};
theme.overrides.MuiIconButton = {
    label: {
        "&:hover": {
            borderRadius: "4px",
            //boxShadow: '0 1px 2px 0 rgba(186, 171, 199, 0.36), 0 2px 8px 1px rgba(186, 171, 199, 0.24)',
            //backgroundColor: '#fcfdfe',
            opacity: "0.8",
        },
    },
};
theme.overrides.MuiSwitch = {
    switchBase: {
        color: "#fafafa !important",
        padding: "9px !important",
    },
    checked: {
        color: "#7ec93c !important",
    },
};
theme.overrides.MuiTouchRipple = {
    child: {
        //backgroundColor: 'rgba(66, 64, 67, 0.08)',
        opacity: "0.08",
    },
};
export const styles = (theme) => ({
    headerCloseIcon: {
        position: "relative",
        top: "6px",
        marginRight: "5px",
        cursor: "pointer",
    },
    headerCloseIconTitle: {
        display: "inline",
    },
    headerWrap: {
        boxShadow: "none",
        // zIndex:'11111'
    },
    headerTitleWrap: {
        boxShadow: "none",
        //boxShadow:'0 8px 6px -6px black;'
        //boxShadow:'0 -3px 2px -6px rgba(0,0,0,0.2), 0 1px 6px -6px rgba(0,0,0,0.14), 0 8px 6px -6px rgba(0,0,0,0.12)'
        borderBottom: "solid 1px #d7dee5",
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    mobileLogo: {
        cursor: "pointer",
        width: "2rem",
        height: "2rem",
        marginRight: "1rem",
        [theme.breakpoints.down("sm")]: {
            display: "inline",
            width: "auto",
        },
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    webLogo: {
        cursor: "pointer",
        display: "inline",
        //marginTop:'1rem',
        height: "24px",
        width: "63px",
    },
    title: {
        fontWeight: 600,
        display: "inline",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
        textAlign: "left",
        padding: "1rem",
        [theme.breakpoints.down("sm")]: {
            display: "inline",
            width: "100%",
            padding: "0",
        },
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    pageTitleWrap: {
        top: "48px",
    },
    pageTitle: {
        fontSize: "16px",
        fontWeight: 600,
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
        color: "#2a292a",
    },
    txtAlignLeft: {
        textAlign: "left !important",
    },

    txtAlignRight: {
        textAlign: "right !important",
    },
    sectionHeaderText: {
        color: "#9e9e9e",
    },
    mainWrap: {
        display: "flex",
        minHeight: "90vh",
        flexDirection: "column",

        [theme.breakpoints.up("sm")]: {
            //paddingBottom:'1.5rem',
        },
    },
    mainContainer: {
        paddingBottom: "3rem",
        [theme.breakpoints.down("sm")]: {
            paddingBottom: "11rem",
        },
    },
    bold: {
        fontWeight: "600",
    },
    fontWeight400: {
        fontWeight: "400 !important",
    },
    bold2: {
        fontWeight: "800",
    },
    widthMargin: {
        margin: "unset !important",
    },
    widthFit: {
        width: "100%",
    },
    blackColor: {
        color: "#2a292a",
    },
    whiteColor: {
        color: "#FFFFFF",
    },
    footer: {
        height: "50px",
    },
    padding8: {
        padding: "8px !important"
    },
    paddingBottom0: {
        paddingBottom: "0 !important",
    },
    paddingBottom16: {
        paddingBottom: "1rem !important",
    },
    paddingBottom8: {
        paddingBottom: "8px !important",
    },
    paddingTop0: {
        paddingTop: "0 !important",
    },
    paddingTop32: {
        paddingTop: "32px !important",
    },
    paddingTop24: {
        paddingTop: "24px !important",
    },
    paddingLeft8: {
        paddingLeft: "8px",
    },
    paddingRight8: {
        paddingRight: "8px",
    },
    paddingRight16: {
        paddingRight: "1rem !important",
    },
    marginTop8: {
        marginTop: "0.5rem !important",
    },
    marginTop4: {
        marginTop: "4px !important",
    },
    marginTop16: {
        marginTop: "1rem !important",
    },
    marginTop24: {
        marginTop: "1.5rem !important",
    },
    padding16: {
        padding: "16px",
    },
    marginTop32: {
        marginTop: "2rem !important",
    },
    marginBottom24: {
        marginBottom: "1.5rem !important",
    },
    margin0: {
        margin: "0 !important",
    },
    padding0: {
        padding: '0 !important'
    },
    paddingTop8: {
        paddingTop: '8px !important'
    },
    paddingTop16: {
        paddingTop: "16px !important",
    },
    paddingLeft0: {
        paddingLeft: "0px !important",
    },
    card: {
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            //padding: "0 !important",
            //borderRadius: "0",
            //boxShadow: "none",
            //border: "none",
        },
    },
    expansionContainer: {
        paddingBottom: "1rem",
        width: "100%",
        margin: "0",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.5rem",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "1rem !important",
        },
    },
    mainLayout: {
        backgroundColor: "#f5f7fb",
        minHeight: "90vh",
    },
    mainLayoutReview: {
        [theme.breakpoints.up("sm")]: {
            paddingBottom: "1.5rem",
        },
    },
    reviewConsent: {
        [theme.breakpoints.down("md")]: {
            paddingLeft: "10rem !important",
            paddingRight: "10rem !important",
        },
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "10px !important",
            paddingRight: "10px !important",
        },
    },
    ePerfiosDialog: {
        margin: "1rem 1rem 0",
        width: "70%",
        maxWidth: "none",
        borderRadius: "2px",
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            margin: "0",
            padding: "0",
            width: "100%",
        },
    },
    textFieldFullWidth: {
        width: "100%",
    },
    txtAlignCenter: {
        textAlign: "center",
    },
    fontSize12: {
        fontSize: '12px'
    },
    fontSize16: {
        fontSize: '16px'
    },
    containerRoot: {
        margin: "0",
        width: "100%",
    },
    containerRootWrap: {
        margin: "0",
        width: "100%",
        paddingBottom: "24px",
        [theme.breakpoints.up("sm")]: {
            paddingLeft: "40px",
        },
        [theme.breakpoints.down("sm")]: {
            paddingBottom: "16px",
        },
    },
    purpleCaption: {
        color: "#baabc7",
    },
    pageContainer: {
        maxWidth: "775px",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "0px",
        },
    },
    buttonPrimary: {
        display: "inline",
        padding: "0",
        textTransform: "none",
        color: "#4a90e2",
        "&:hover": {
            background: "none",
        },
    },
    cursorPointer: {
        cursor: "pointer",
    },
    caption: {
        color: "#9990a1",
        letterSpacing: "0.4px",
    },
    absolutePosition: {
        position: "absolute",
    },
    withFullHeight: {
        [theme.breakpoints.down('sm')]: {
            height: '100%',
        },

    },
    error: {
        color: "#ec7474 !important",
    }
});
export default theme;