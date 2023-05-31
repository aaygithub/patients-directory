import * as React from "react";
import { IFilterData, ISearchFilterContextType } from "../common/interfaces";

export const SearchFilterContext =
  React.createContext<ISearchFilterContextType | null>(null);

interface ISearchFilterProviderProps {
  children: React.ReactNode;
}
const SearchFilterProvider = ({ children }: ISearchFilterProviderProps) => {
  const [searchFilter, setSearchFilter] = React.useState<IFilterData>({});

  const updateSearchFilter = (updatedFilter: IFilterData) => {
    setSearchFilter({ ...searchFilter, ...updatedFilter });
  };

  return (
    <SearchFilterContext.Provider
      value={{
        searchFilter,
        updateSearchFilter,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};

export default SearchFilterProvider;
