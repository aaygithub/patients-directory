import * as React from "react";
import {
  IColumnSort,
  IFilterData,
  ISearchFilterContextType,
} from "../common/interfaces";

export const SearchFilterContext =
  React.createContext<ISearchFilterContextType | null>(null);

interface ISearchFilterProviderProps {
  children: React.ReactNode;
}
const SearchFilterProvider = ({ children }: ISearchFilterProviderProps) => {
  const [searchFilter, setSearchFilter] = React.useState<IFilterData>({});
  const [columnSort, setColumnSort] = React.useState<IColumnSort>({});

  const updateSearchFilter = (updatedFilter: IFilterData) => {
    setSearchFilter({ ...searchFilter, ...updatedFilter });
  };

  const updateColumnSort = (updatedColumnSort: IColumnSort) => {
    setColumnSort({ ...columnSort, ...updatedColumnSort });
  };

  console.log("searchFilter :: ", searchFilter);
  return (
    <SearchFilterContext.Provider
      value={{
        searchFilter,
        updateSearchFilter,
        columnSort,
        updateColumnSort,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};

export default SearchFilterProvider;
