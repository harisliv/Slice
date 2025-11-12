import { useMemo } from "react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type {
  OrganizationalStructureFormData,
  RelatedInitiative,
} from "@app/types";
import { useFormContext } from "react-hook-form";
import { Select } from "@app/lib/ui";
import { useDropdownValues } from "@app/hooks";
import type { Option } from "@app/lib/types/Select";

export function usePendingInitiativesEditModecolumns() {
  const columnHelper = createColumnHelper<RelatedInitiative>();
  const { setValue, watch } = useFormContext<OrganizationalStructureFormData>();
  const tempValidations = watch("tempValidations") || {};
  const { data: dropdownOptions } = useDropdownValues("CciRelationStatus");

  // Convert DropdownOption[] to Option[] for Select component (they have the same structure)
  const options = (dropdownOptions ?? []) as Option[];

  return useMemo<ColumnDef<RelatedInitiative, any>[]>(
    () => [
      columnHelper.accessor("relatedInitiativeName", {
        header: "Cooperative climate initiative name",
        cell: (info) => info.getValue() ?? "-",
        sortingFn: "alphanumeric",
        meta: { width: "23.5%" },
      }),
      columnHelper.accessor("relationshipType", {
        header: "Potential relationship of the initiative to your initiative",
        cell: (info) => info.getValue() ?? "-",
        sortingFn: "alphanumeric",
        meta: { width: "35.5%" },
      }),
      columnHelper.accessor("contactName", {
        header: "Focal point requesting Name",
        cell: (info) => info.getValue() ?? "-",
        sortingFn: "alphanumeric",
        meta: { width: "20.5%" },
      }),
      columnHelper.accessor("contactEmail", {
        header: "Focal point requesting Email",
        cell: (info) => {
          const email = info.getValue() as string | null | undefined;
          return email ? <span>{email}</span> : "—";
        },
        sortingFn: "alphanumeric",
        meta: { width: "20.5%" },
      }),
      columnHelper.accessor("validationStatus", {
        header: "Validate",
        cell: (info) => {
          const value =
            tempValidations[info.row.original.relatedInitiativeId] || "";
          return (
            <Select
              options={options}
              borderless
              name={`tempValidations.${info.row.original.relatedInitiativeId}`}
              value={value}
              label="Select"
              onChange={(e) => {
                setValue(`tempValidations`, {
                  ...tempValidations,
                  [info.row.original.relatedInitiativeId || ""]: String(
                    e.target.value,
                  ),
                });
              }}
            />
          );
        },
        sortingFn: "alphanumeric",
        meta: { width: "20.5%" },
      }),
    ],
    [setValue, tempValidations, options],
  );
}
