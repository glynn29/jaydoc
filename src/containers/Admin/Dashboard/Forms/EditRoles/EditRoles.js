import React, {useState, useEffect} from "react";
import {connect} from "react-redux";

import Container from "@material-ui/core/Container";

import {firestore} from "../../../../../firebase";
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

const EditRoles = ({roleList, positionList, fetchRoleList}) => {
    const [roles, setRoles] = useState([...roleList]);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setRoles(roleList);
    }, [roleList, positionList]);

    //add modal functions
    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    function addRole() {
        fetchRoleList();
        handleAddClose();
    }

    //edit modal functions
    const handleEditOpen = (editedRole, index) => {
        setFormData({...editedRole, index});
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    function editRole() {
        fetchRoleList();
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

    const deleteRole = (props) => {
        let tempList = roles.filter(role => role.name !== props.name);
        firestore.collection('roles').doc('roles').update({
            roles: tempList
        }).catch(error => console.log(error));
        fetchRoleList();
        handleDeleteClose();
    };

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h4">Edit Roles</Typography>
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
                form={<Edit formData={formData} onEdit={editRole} handleClose={handleEditClose} positionList roleList={roles}/>}
                title={"Edit Role"}
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<Add onAdd={addRole} handleClose={handleAddClose} positionList roleList={roles}/>}
                title={"Add Role"}
            />
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<Delete formData={formData} submit={deleteRole} cancel={handleDeleteClose} />}
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
        fetchRoleList: () => dispatch(actions.fetchRoleList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRoles);
