import { Box, Divider, Grid2 } from "@mui/material";
import { ClearIcon, FilterIcon, SearchIcon } from "@app/lib/icons";
import React from "react";
import { ButtonComponent, Chip, Paragraph } from "@app/lib/ui";
import InputBase from "@app/lib/ui/Input/Input";
import { Theme } from "@app/lib/general";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { useFormContext } from "react-hook-form";
import { labelMap } from "./MyParticipants.types";
import { useDropdownValues } from "@app/hooks";

interface SearchProps {
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  resetFiltersToEmpty: () => void;
  setIsModalOpen: (value: boolean) => void;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  globalFilter: string;
}

export default function SearchAndAppliedFilters({
  columnFilters,
  setColumnFilters,
  resetFiltersToEmpty,
  setIsModalOpen,
  setGlobalFilter,
  globalFilter,
}: SearchProps) {
  const { setValue, resetField } = useFormContext();
  const { data: countriesData } = useDropdownValues("Countries");
  const { data: businessActivitiesData } =
    useDropdownValues("BusinessActivities");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  //TODO MAYBE PUT IT IN THE FORM
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <InputBase
        id="search-filters-my-participants"
        value={globalFilter}
        onChange={handleChange}
        placeholder="Search by participant name, identity number or legal name"
        icon={<SearchIcon />}
        enableLabel={false}
        rightAdornment={
          <>
            {!!globalFilter && (
              <>
                <ButtonComponent
                  customVariant="terciary-m"
                  startIcon={<ClearIcon />}
                  onClick={() => {
                    setGlobalFilter("");
                  }}
                >
                  Clear
                </ButtonComponent>
                |{" "}
              </>
            )}

            <ButtonComponent
              customVariant="terciary-m"
              startIcon={<FilterIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Filters
            </ButtonComponent>
          </>
        }
      />
      {!!columnFilters.length && (
        <Grid2 container rowGap={1} alignItems={"center"}>
          <Paragraph variant="extrasmall-medium">Filtering by:</Paragraph>
          {columnFilters.map((item) => {
            if (
              item.id !== "entityOperatingName" &&
              item.id !== "legalName" &&
              item.id !== "identityNumber"
            ) {
              const labelPrefix = labelMap[item.id] ?? item.id;
              return (
                <Chip
                  key={item.id}
                  label={
                    item.id === "dateJoined"
                      ? `${labelPrefix}: ${
                          Array.isArray(item.value)
                            ? `${item.value[0]} to ${item.value[1]}`
                            : item.value
                        }`
                      : item.id === "country"
                        ? `${labelPrefix}: ${
                            countriesData?.find(
                              (country) => country.value === item.value,
                            )?.label ?? ""
                          }`
                        : item.id === "businessActivity"
                          ? `${labelPrefix}: ${
                              businessActivitiesData?.find(
                                (businessActivity) =>
                                  businessActivity.value === item.value,
                              )?.label ?? ""
                            }`
                          : `${labelPrefix}: ${String(item.value)}`
                  }
                  onDelete={() => {
                    if (item.id === "dateJoined") {
                      setValue("dateJoinedFrom", "");
                      setValue("dateJoinedTo", "");
                    }
                    setValue(item.id, "");
                    setColumnFilters((prev) =>
                      prev.filter((filter) => filter.id !== item.id),
                    );
                    resetField(item.id);
                  }}
                />
              );
            }
          })}
          <Box ml={1} display="flex" alignItems="center" gap={1}>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: 16,
                alignSelf: "center",
                borderColor: Theme.palette.primary.darkerGrey,
              }}
            />
            <ButtonComponent
              customVariant="terciary-m"
              startIcon={<ClearIcon />}
              onClick={() => {
                resetFiltersToEmpty();
                setGlobalFilter("");
              }}
            >
              Clear Filters
            </ButtonComponent>
          </Box>
        </Grid2>
      )}
    </Box>
  );
}
