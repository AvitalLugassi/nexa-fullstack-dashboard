import { useState } from 'react';
import { api } from '../API/APIService.js';
import { useUser } from '../context/UserContext';

export const useItemActions = (resource, options = {}) => {
    const {
        onLocalUpdate,
        onLocalDelete,
        confirmOnDelete = false,
        onLocalDisplay = null
    } = options;
    const { currentUser } = useUser();
    const idCurrentUser = currentUser?.id;
    const [error, setError] = useState(null);

    const updateItem = async (id, data) => {
        setError(null);
        try {
            const response = await api.put(resource, id, data);
            const item = response.data;
            onLocalUpdate?.(item);
            return item;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const deleteItem = async (id) => {
        if (confirmOnDelete) {
            if (!window.confirm('Delete this item?')) return false;
        }
        setError(null);
        try {
            await api.delete(resource, id);
            onLocalDelete?.(id);
            return true;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const showItem = async (id) => {
        setError(null);
        try {
            const response = await api.get(resource, { userId: idCurrentUser, id });
            const data = response.data;
            const item = data[0];
            onLocalDisplay?.(item);
            return item;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return {
        showItem,
        updateItem,
        deleteItem,
        error
    };
};

