import { cleanup, render, screen, waitFor } from "@testing-library/react";
import React from "react";

import { IFilterData, IPatient } from "../../common/interfaces";

import patientList from "../../mocks/mock_data.json";
import { PatientTable } from "./PatientTable";
import { SearchFilterContext } from "../../context/searchFilterContext";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

const Component = () => {
  const [searchFilter] = React.useState<IFilterData>({
    gender: "",
    ageRange: "",
    searchText: "",
  });

  return (
    <SearchFilterContext.Provider
      value={{
        searchFilter,
        columnSort: { sortAs: undefined, sortBy: "first_name" },
        updateColumnSort: () => {},
        updateSearchFilter: () => {},
      }}
    >
      <BrowserRouter>
        <PatientTable
          patientList={patientList as IPatient[]}
          searchTextHighLight="Glo"
        />
      </BrowserRouter>
    </SearchFilterContext.Provider>
  );
};

describe("Patient component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render correctly", () => {
    render(<Component />);

    expect(screen.getByTestId("patient-table-wrapper")).toBeInTheDocument();
  });
});
