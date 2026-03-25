import { useState, useMemo } from 'react';

export const useToolBar = (initialData) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("none");
  const [sortCriteria, setSortCriteria] = useState("none");
  const [finishTask, setFinishTask] = useState(true);
  const finishTaskToggle = () => setFinishTask(prev => !prev);

  const displayData = useMemo(() => {
    let result = Array.isArray(initialData) ? [...initialData] : [];

    if (searchTerm !== "" && searchCriteria !== "none") {
      const term = searchTerm.trim().toLowerCase();

      result = result.filter(item => {
        if (!item) return false;
        switch (searchCriteria) {
          case "id": {
            return (item.id ?? '').toString().toLowerCase().includes(term);
          }

          case "title":
            return (item.title ?? '').toString().toLowerCase().includes(term);

          case "url":
            return (item.url ?? '').toString().toLowerCase().includes(term);

          case "body":
            return (item.body ?? '').toString().toLowerCase().includes(term);

            case"comment":
            return (item.body ?? '').toString().toLowerCase().includes(term);
          case "completed": {
            return (item.completed ?? '').toString().toLowerCase().includes(term);
          }
          default:
            return true;
        }
      });

    }

    if (sortCriteria !== "none") {
      result.sort((a, b) => {
        const aval = a ?? {};
        const bval = b ?? {};
        switch (sortCriteria) {
          case "title":
            return (aval.title ?? '').toString().localeCompare((bval.title ?? '').toString(), undefined, { numeric: true });

          case "url":
            return (aval.url ?? '').toString().localeCompare((bval.url ?? '').toString(), undefined, { numeric: true });

          case "completed":
            return (Number(bval.completed) || 0) - (Number(aval.completed) || 0);

          case "comment":
            return (aval.body ?? '').toString().localeCompare((bval.body ?? '').toString(), undefined, { numeric: true });

          case "id":
          default:
            return (aval.id ?? '').toString().localeCompare((bval.id ?? '').toString(), undefined, { numeric: true });
        }
      });
    }

    return result;
  }, [initialData, searchTerm, searchCriteria, sortCriteria]);

  return {
    searchTerm,
    setSearchTerm,
    searchCriteria,
    setSearchCriteria,
    sortCriteria,
    setSortCriteria,
    finishTaskToggle,
    finishTask,
    displayData
  };
};