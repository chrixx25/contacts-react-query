import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Form from "components/Form";
import Modal from "components/Modal";
import AddContact from "components/data-entries/forms/AddContact";
import ConfirmationModal from "../ConfirmationModal";
import { useAddContact } from 'react-query/mutations';
import { defaultFormValues, schema } from './utils';
import { useModal } from "mui-modal-provider";
import { useSnackbar } from 'notistack';

const AddContactModal = (props) => {
    const { open, onClose } = props;
    const { showModal } = useModal();
    const { enqueueSnackbar } = useSnackbar();
    const contactForm = useForm({
        shouldUnregister: true,
        defaultValues: defaultFormValues,
        resolver: yupResolver(schema),
        mode: "onChange"
    });
    const addContact = useAddContact();

    const handleSubmit = (values) => {
        const modal = showModal(ConfirmationModal, {
            message: `Are you sure to add ${values.firstName}?`,
            onConfirm: () => {
                addContact.mutate(values, {
                    onSuccess: () => onClose(),
                    onSettled: () => modal.hide()
                });
            }
        });
    };

    return (
        <Modal
            title="New Contact"
            maxWidth="sm"
            actions={
                <Modal.Actions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        disabled={addContact.isLoading}
                        onClick={contactForm.handleSubmit(handleSubmit)}
                    >
                        Save
                    </Button>
                </Modal.Actions>
            }
            open={open}
            onClose={onClose}
        >
            <Stack spacing={3}>
                <Form {...contactForm} >
                    <AddContact />
                </Form>
            </Stack>
        </Modal>
    );
}

export default AddContactModal;