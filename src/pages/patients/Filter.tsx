import styled from "@emotion/styled";
import {
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
import React from "react";

export interface IFilterProps {}

export const Filter: React.FC<IFilterProps> = () => {
  const { searchFilter, updateSearchFilter } = React.useContext(
    SearchFilterContext
  ) as ISearchFilterContextType;

  const filterChangeHandler = (field: string, value: string) => {
    const updatedFilter = { ...searchFilter, [field]: value };
    updateSearchFilter(updatedFilter);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="text-search-input">Search</InputLabel>
        <OutlinedInput
          id="text-search-input"
          type={"text"}
          value={searchFilter?.searchText ?? ""}
          placeholder="Start typing..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            filterChangeHandler("searchText", event.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          label="Search"
        />
        <InputInfoStyled>*Search text is case sensitive.</InputInfoStyled>
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
