import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        minWidth: 200
    },
    formControl: {
        minWidth: 200,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textarea: {
        resize: "both"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    deleteButton:{
        backgroundColor: "red",
        color: "white"
    },
    editButton:{
        backgroundColor: "green",
        color: "white"
    },
    detailsButton:{
        backgroundColor: "blue",
        color: "white"
    },
    addButton: {
        margin: theme.spacing(2, 4, 3),
        minWidth: 200
    },
    cancelButton: {
        color: "red",
    },
    table: {
        //minWidth: 700,
    },
    visuallyHidden: {
        display: "none"
    },
    active: {
        color: "yellow"
    },
    menuPaper: {
        maxHeight: 300
    },
    Container: {
        textAlign: 'center'
    }
}));

export default useStyles;
