import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useModal } from "mui-modal-provider";
import AddContactModal from './AddContactModal';
import UserTable from './table/UserTable';
import { useGetContacts } from 'react-query/queries';

const Main = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const userData = useGetContacts({ page, pageSize });
    const { showModal } = useModal();

    return (
        <>
            <Stack spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Stack
                            direction="row"
                            spacing={2}
                            mb={2}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    maxWidth: 'auto'
                                }}
                                onClick={() => showModal(AddContactModal)
                                }
                            >
                                Add Contact
                            </Button>
                        </Stack>
                        <UserTable
                            userData={userData}
                            meta={{ page, pageSize }}
                        />
                    </Paper>
                </Grid>
            </Stack>
        </>
    )
}

export default Main;