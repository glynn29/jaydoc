import React, {useState, useEffect} from "react";
import {connect} from "react-redux";

import Container from "@material-ui/core/Container";

import {firestore} from "firebase";
import * as actions from "../../../../../store/actions";
import Typography from "@material-ui/core/Typography";
import EnhancedTable from "../../../../../components/UI/Table/Table";
import TransitionModal from "../../../../../components/UI/Modal/Modal";
import Delete from "./Delete/Delete";
import Add from "./Add/Add";
import Edit from "./Edit/Edit";

const headCells = [
    {id: 'name', label: 'Name'},
];

const EditPositions = ({roleList, positionList}) => {
    const [roles, setRoles] = useState([...roleList]);
    const [positions, setPositions] = useState([...positionList]);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        //firestore().
        console.log(roles, positions);
    }, []);

    //add modal functions
    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    function addPosition(position) {
        handleAddClose();

        //getEvents().catch(error => {console.log(error)});
    }

    //edit modal functions
    const handleEditOpen = (props) => {
        setFormData(props);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    function editPosition() {
        handleEditClose();
        //getEvents().catch(error => {console.log(error)});
    }

    //delete modal functions
    const handleDeleteOpen = (props) => {
        setFormData(props);
        console.log(props);
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const deletePosition = (props) => {
        let tempList = roles.filter(role => role.name !== props.name);
        console.log("deleted: ", props.name);
        console.log(tempList);
        setRoles(tempList);
        handleDeleteClose();
    };

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h4">Edit Positions</Typography>
            <EnhancedTable
                data={roles}
                headCells={headCells}
                delete={handleDeleteOpen}
                add={handleAddOpen}
                edit={handleEditOpen}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<Edit formData={formData} onEdit={editPosition} handleClose={handleEditClose} roleList={positions}/>}
                title={"Edit Position"}
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<Add onAdd={addPosition} handleClose={handleAddClose} roleList={positions}/>}
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
        roleList: state.lists.roleList,
        positionList: state.lists.positionList,
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onConfirm: (data) => dispatch(actions.updateConfirmation(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPositions);
