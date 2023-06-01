import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import React from "react";
import { Filter } from "./Filter";
import { SearchFilterContext } from "../../context/searchFilterContext";
import { IFilterData } from "../../common/interfaces";

const Component = ({ mockFn }: { mockFn: any }) => {
  const [searchFilter, setSearchFilter] = React.useState<IFilterData>({
    gender: "",
    ageRange: "",
    searchText: "",
  });

  return (
    <SearchFilterContext.Provider
      value={{
        searchFilter,
        columnSort: {},
        updateColumnSort: () => {},
        updateSearchFilter: (filters) => {
          mockFn(filters);
          setSearchFilter(filters);
        },
      }}
    >
      <Filter />
    </SearchFilterContext.Provider>
  );
};

describe("Filter component", () => {
  const ageSelectSetup = () => {
    const selectAgeEl = screen.getByTestId("search-age-select");
    const button = within(selectAgeEl).getByRole("button");

    fireEvent.mouseDown(button);

    const listbox = within(screen.getByRole("presentation")).getByRole(
      "listbox"
    );

    const options = within(listbox).getAllByRole("option");
    const optionValues = options.map((li) => li.getAttribute("data-value"));

    expect(optionValues).toEqual(["", "18 - 30", "31 - 45", "> 45"]);

    return options;
  };

  afterEach(() => {
    cleanup();
  }); // Default on import: runs it after each test.

  const genderSelectSetup = () => {
    const selectGenderEl = screen.getByTestId("search-gender-select");
    const button = within(selectGenderEl).getByRole("button");

    fireEvent.mouseDown(button);

    const listbox = within(screen.getByRole("presentation")).getByRole(
      "listbox"
    );

    const options = within(listbox).getAllByRole("option");
    const optionValues = options.map((li) => li.getAttribute("data-value"));

    expect(optionValues).toEqual(["", "Male", "Female"]);

    return options;
  };

  it("should test if all search elements are in document", () => {
    const mockOnFilterChange = jest.fn();
    const returnValue = {
      searchFilter: {},
      columnSort: {},
      updateSearchFilter: mockOnFilterChange,
      updateColumnSort: () => {},
    };

    render(
      <SearchFilterContext.Provider value={returnValue}>
        <Filter />
      </SearchFilterContext.Provider>
    );

    expect(screen.getByTestId("search-text-input")).toBeInTheDocument();
    expect(screen.getByTestId("search-age-select")).toBeInTheDocument();
    expect(screen.getByTestId("search-gender-select")).toBeInTheDocument();
  });

  it("should have correct options for Age Select and handle change", () => {
    const mockOnFilterChange = jest.fn();

    render(<Component mockFn={mockOnFilterChange} />);

    const ageOptions = ageSelectSetup();

    fireEvent.click(ageOptions[1]);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ageRange: "18 - 30",
      gender: "",
      searchText: "",
    });
  });

  it("should call onFilterChange when filled search input , age select and gender select", async () => {
    const mockOnFilterChange = jest.fn();

    render(<Component mockFn={mockOnFilterChange} />);
    const textInput = screen.getByTestId("search-text-input");

    //Age Select
    const ageOptions = ageSelectSetup();
    fireEvent.click(ageOptions[2]);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ageRange: "31 - 45",
      gender: "",
      searchText: "",
    });

    //Gender Select
    const genderOptions = genderSelectSetup();
    fireEvent.click(genderOptions[2]);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ageRange: "31 - 45",
      gender: "Female",
      searchText: "",
    });

    //Text Input
    fireEvent.change(
      within(textInput).getByPlaceholderText("Start typing..."),
      { target: { value: "John" } }
    );

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ageRange: "31 - 45",
        gender: "Female",
        searchText: "John",
      });
    });
  });
});
