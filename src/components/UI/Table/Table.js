import React, {useEffect, useState} from "react";

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import useStyles from "../../../components/UI/Styles/formStyle";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "blue",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "lightblue",
        },
        '&:nth-of-type(even)': {
            backgroundColor: "lightyellow",
        },
        "&:hover": {
            color: 'black',
        },
    },
}))(TableRow);

const StyledSortLabel = withStyles((theme) => ({
    root: {
        color: 'white',
        '&:hover': {
            color: 'white',
        },
        '&$active': {
            color: 'white',
        },
    },
    active: {
        color: 'white',
    },
    icon: {
        color: 'inherit !important'
    },
}))(TableSortLabel);

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {props.checkbox && <StyledTableCell align="left">Select Event</StyledTableCell>}
                {props.headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align="left"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <StyledSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id
                                ?
                                (<span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>)
                                :
                                null}
                        </StyledSortLabel>
                    </StyledTableCell>
                ))}
                {props.details && <StyledTableCell align="left">Details</StyledTableCell>}
                {props.edit &&<StyledTableCell align="left">Edit</StyledTableCell>}
                {props.accept && <StyledTableCell align="left">Accept</StyledTableCell>}
                {props.delete && <StyledTableCell align="left">Delete</StyledTableCell>}
                {props.signUp && <StyledTableCell align="left">Sign Up</StyledTableCell>}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

function EnhancedTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('first');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState(props.data);

    const {data} = props;
    useEffect(() => {
        setRows(data);
    },[data]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
            <Container>
                {props.add && <Button className={classes.addButton} variant="contained" color="primary" onClick={() => props.add()}>Add</Button>}
                <TableContainer component={Paper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            {...props}
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>

                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <StyledTableRow
                                            hover
                                            key={index}
                                        >
                                            {props.checkbox && <StyledTableCell align="left">
                                                <Checkbox
                                                    onChange={e => props.checkbox(row)}
                                                    checked={props.isSelected(row.id)}
                                                    inputProps={{ 'aria-labelledby': index }}/>
                                            </StyledTableCell>}


                                            {props.headCells.map((cell, index)=>{
                                                let data = row[cell.id];
                                                // if(cell.time){
                                                //     data = new Date("2020-01-11T" + data).toLocaleTimeString('en-US', {
                                                //          hour: 'numeric',
                                                //          minute: 'numeric',
                                                //          hour12: true
                                                //      });
                                                // }
                                                return(
                                                    <StyledTableCell component="th" key={index} scope="row" align="left">{data}</StyledTableCell>
                                                );
                                            })}
                                            {props.details && <StyledTableCell align="left">
                                                <Button onClick={() => {props.details(row)}} variant="contained" className={classes.detailsButton}>Details</Button>
                                            </StyledTableCell>}
                                            {props.edit && <StyledTableCell align="left">
                                                <Button onClick={() => {props.edit(row)}} variant="contained" className={classes.editButton}>Edit</Button>
                                            </StyledTableCell>}
                                            {props.accept && <StyledTableCell align="left">
                                                <Button onClick={() => {props.accept(row)}} variant="contained" className={classes.detailsButton}>Accept</Button>
                                            </StyledTableCell>}
                                            {props.delete && <StyledTableCell align="left">
                                                <Button onClick={() => {props.delete(row)}} variant="contained" className={classes.deleteButton}>Delete</Button>
                                            </StyledTableCell>}
                                            {props.signUp && <StyledTableCell align="left">
                                                {row.volunteer === 'none' && <Button onClick={()=> {props.signUp(row)}}  variant="contained" className={classes.detailsButton}>Sign Up</Button>}
                                            </StyledTableCell> }
                                        </StyledTableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 40]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Container>
    );
}
export default EnhancedTable;
