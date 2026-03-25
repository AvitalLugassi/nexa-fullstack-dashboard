import { createContext, useContext } from 'react';
import { useItemActions } from '../hooks/useItemActions'; 

const ItemActionsContext = createContext();

export const ItemActionsProvider = ({ children, resource, onLocalUpdate, onLocalDelete, confirmOnDelete = true,onLocalDisplay=null }) => {
  const itemActions = useItemActions(resource, {  onLocalUpdate, onLocalDelete, confirmOnDelete,onLocalDisplay});
  return (
    <ItemActionsContext.Provider value={itemActions}>
      {children}
    </ItemActionsContext.Provider>
  );
};

export const useItemActionsContext = () => useContext(ItemActionsContext);