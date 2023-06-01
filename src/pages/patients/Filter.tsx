// Component to render filter in input and update searchFilter context on change
import styled from "@emotion/styled";
import {
  debounce,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { ISearchFilterContextType } from "../../common/interfaces";
import { SearchFilterContext } from "../../context/searchFilterContext";
import React, { ChangeEventHandler, useEffect, useState } from "react";

export const Filter: React.FC = () => {
  const { searchFilter, updateSearchFilter } = React.useContext(
    SearchFilterContext
  ) as ISearchFilterContextType;

  const [searchText, setSearchText] = useState<string | undefined>(
    searchFilter.searchText
  );

  const onChangeSearchText: ChangeEventHandler<HTMLInputElement> = (e) => {
    filterChangeHandler("searchText", e.target.value);
    setSearchText(undefined);
    /*
    // local state value of searchText is only needed once to display the past search when back from patient details.
    // set to undefined to not conflict the working of debounce, because debouce managing the onChangeSearchText call after mentioned miliseconds. 
    */
  };
  const debouncedOnChange = debounce(onChangeSearchText, 500);

  const filterChangeHandler = (field: string, value: string) => {
    const updatedFilter = { ...searchFilter, [field]: value };
    updateSearchFilter(updatedFilter);
  };

  useEffect(() => {}, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="text-search-input">Search</InputLabel>
        <OutlinedInput
          id="text-search-input"
          type={"text"}
          placeholder="Start typing..."
          onChange={debouncedOnChange}
          {...(searchText ? { value: searchText } : {})}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          label="Search"
          data-testid="search-text-input"
        />
        <InputInfoStyled>*Search is text not is case sensitive</InputInfoStyled>
        <InputInfoStyled>*Case sensitive match is highlighted</InputInfoStyled>
      </FormControl>

      <FormControl sx={{ m: 1, width: "25ch" }}>
        <InputLabel htmlFor="demo-simple-select" id="demo-simple-select-label">
          Age
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchFilter.ageRange}
          label="Age"
          onChange={(event) => {
            filterChangeHandler("ageRange", event.target.value);
          }}
          data-testid="search-age-select"
        >
          <MenuItem value={""}>Select</MenuItem>
          <MenuItem value={"18 - 30"}>18 - 30</MenuItem>
          <MenuItem value={"31 - 45"}>31 - 45</MenuItem>
          <MenuItem value={"> 45"}> &gt; 45</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }}>
        <InputLabel htmlFor="gender-select" id="gender-select-label">
          Gender
        </InputLabel>
        <Select
          labelId="gender-select-label"
          id="gender-select"
          value={searchFilter.gender}
          label="Age"
          onChange={(event) => {
            filterChangeHandler("gender", event.target.value);
          }}
          data-testid="search-gender-select"
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

const InputInfoStyled = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  margin: 5px 0 0;
`;
