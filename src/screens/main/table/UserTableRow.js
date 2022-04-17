import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useDeleteContact } from 'react-query/mutations';
import { useModal } from "mui-modal-provider";
import EditContactModal from '../EditContactModal';
import ConfirmationModal from "../ConfirmationModal";
import { useSnackbar } from 'notistack';

const UserTableRow = ({ no, user, meta }) => {
    const {
        id,
        firstName,
        lastName,
        middleName,
        email,
        mobileNo
    } = user;
    const deleteContact = useDeleteContact();
    const { showModal } = useModal();
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = (id) => {
        const modal = showModal(ConfirmationModal, {
            message: `Are you sure to delete ${firstName}?`,
            onConfirm: () => {
                deleteContact.mutate(id, {
                    onSuccess: () => {
                        //onClose();
                        enqueueSnackbar('Contact deleted successfully!!', {
                            variant: 'success',
                            autoHideDuration: 3000,
                        });
                    },
                    onSettled: () => {
                        modal.hide();
                    }
                });
            }
        })
    }

    return (
        <TableRow>
            <TableCell component="td" scope="row">
                {no}
            </TableCell>
            <TableCell component="td" scope="row">
                <IconButton onClick={() => showModal(EditContactModal, { id, meta })} aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(id)} disabled={deleteContact.isLoading} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
            <TableCell component="td" scope="row">
                {`${firstName} ${middleName} ${lastName}`.trim()}
            </TableCell>
            <TableCell component="td" scope="row">
                {email}
            </TableCell>
            <TableCell component="td" scope="row">
                {mobileNo}
            </TableCell>
        </TableRow>
    )
}

export default UserTableRow;