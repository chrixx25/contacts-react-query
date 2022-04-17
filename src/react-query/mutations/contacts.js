import { useMutation, useQueryClient } from 'react-query';
import {
    addContact,
    updateContact,
    deleteContact
} from "apis";

export const useAddContact = () => {
    const queryClient = useQueryClient();

    return useMutation(addContact, {
        onSuccess: data => {
            /** Query Invalidation Start */
            queryClient.invalidateQueries('contacts');

            /** Handling Mutation Response Start */
            // queryClient.setQueryData('super-heroes', oldQueryData => {
            //   return {
            //     ...oldQueryData,
            //     data: [...oldQueryData.data, data.data]
            //   }
            // })
        },
    })
}

export const useDeleteContact = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteContact, {
        onSuccess: data => {
            /** Query Invalidation Start */
            queryClient.invalidateQueries('contacts');

            /** Handling Mutation Response Start */
            // queryClient.setQueryData('super-heroes', oldQueryData => {
            //   return {
            //     ...oldQueryData,
            //     data: [...oldQueryData.data, data.data]
            //   }
            // })
        },
    })
}

export const useUpdateContact = (id, meta) => {
    const queryClient = useQueryClient()
    //useMutation((passwords) => updateUserPassword({ ...passwords, id })
    return useMutation((data) => updateContact(id, data), {
        onSuccess: data => {
            /** Query Invalidation Start */
            //queryClient.invalidateQueries('contacts');
            /** Handling Mutation Response Start */

            queryClient.setQueryData(['contacts', meta], oldContacts => {
                const updatedContacts = oldContacts.results.map(oldContacts => oldContacts.id === id ? data : oldContacts);
                oldContacts.results = updatedContacts
                return oldContacts;
            });
        },
    })
}