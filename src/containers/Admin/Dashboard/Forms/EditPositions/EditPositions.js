import React, {useState, useEffect} from "react";
import {connect} from "react-redux";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {firestore} from "../../../../../firebase";
import * as actions from "../../../../../store/actions";
import EnhancedTable from "../../../../../components/UI/Table/Table";
import TransitionModal from "../../../../../components/UI/Modal/Modal";
import Delete from "./Delete/Delete";
import Add from "./Add/Add";
import Edit from "./Edit/Edit";
import Header from "../../../../../components/UI/Header/Header";

const headCells = [
    {label: 'Name'}
];

const EditPositions = ({positionList, fetchPositionList}) => {
    const [positions, setPositions] = useState([...positionList]);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setPositions(positionList);
    }, [positionList]);

    //add modal functions
    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    function addPosition() {
        fetchPositionList();
        handleAddClose();
    }

    //edit modal functions
    const handleEditOpen = (position, index) => {
        setFormData({position, index});
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    function editPosition() {
        fetchPositionList();
        handleEditClose();
    }

    //delete modal functions
    const handleDeleteOpen = (props) => {
        setFormData(props);
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const deletePosition = (props) => {
        let tempList = positions.filter(position => position !== props);
        firestore.collection('positions').doc('positions').update({
            positions: tempList
        }).catch(error => console.log(error));
        fetchPositionList();
        handleDeleteClose();
    };
    // <Header title="Edit Positions"
    //         info="Be careful bruh"
    //         title2="Use this page manage Positions"/>
    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h4">Edit Positions</Typography>
            <EnhancedTable
                data={positions}
                headCells={headCells}
                delete={handleDeleteOpen}
                add={handleAddOpen}
                edit={handleEditOpen}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<Edit formData={formData} onEdit={editPosition} handleClose={handleEditClose} positionList={positions} />}
                title={"Edit Position"}
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<Add onAdd={addPosition} handleClose={handleAddClose} positionList={positions} />}
                title={"Add Position"}
            />
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<Delete formData={formData} submit={deletePosition} cancel={handleDeleteClose} />}
                title={"Are You Sure?"}
            />
        </Container>
    )
};

const mapStateToProps = state => {
    return{
        positionList: state.lists.positionList,
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        fetchPositionList: () => dispatch(actions.fetchPositionList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPositions);
