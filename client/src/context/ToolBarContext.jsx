import { createContext, useContext } from 'react';
import { useToolBar } from '../hooks/useToolBar'; 

const ToolBarContext = createContext();

export const ToolBarProvider = ({ children, initialData, addFields = [] }) => {
  const toolBar = useToolBar(initialData, addFields);
  return (
    <ToolBarContext.Provider value={toolBar}>
      {children}
    </ToolBarContext.Provider>
  );
};

export const useToolBarContext = () => useContext(ToolBarContext);