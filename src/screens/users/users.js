import React, { useState, useMemo } from 'react';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useModal } from "mui-modal-provider";
import { useGetContacts } from 'react-query/queries';
import DataTable from "components/DataTable";
import ActionCell from "./ActionCell";
import AddContactModal from './AddContactModal';

const Users = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const userData = useGetContacts({ page, pageSize });
    const { showModal } = useModal();

    const columns = useMemo(
        () => [
            {
                Header: "#",
                id: "id",
                accessor: (_row, index) => {
                    return (index + 1)
                },
            },
            {
                Header: "Actions ",
                id: "action",
                sticky: "right",
                disableSortBy: true,
                Cell: ActionCell
            },
            {
                Header: "Fullname",
                id: "fullname",
                accessor: (row) => {
                    return `${row.firstName} ${row.middleName} ${row.lastName}`.trim()
                },
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Mobile No.",
                accessor: "mobileNo",
            },
        ],
        [userData.data.page, userData.data.size]
    );

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newPageSize) => {
        setPage(1);
        setPageSize(newPageSize);
    };

    return (
        <>
            <Stack spacing={3}>
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: 'primary.main',
                            maxWidth: 'auto'
                        }}
                        onClick={() =>
                            showModal(AddContactModal)
                        }
                    >
                        Add Contact
                    </Button>
                </Stack>
                <DataTable
                    data={userData.data.results}
                    columns={columns}
                    currentPage={userData.data.page}
                    pageSize={userData.data.size}
                    totalPages={userData.data.pages}
                    totalRecords={userData.data.total}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Stack>
        </>
    )
}

export default Users;