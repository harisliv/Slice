import React, { type FC } from "react";
import {
  StyledPagination,
  StyledPaginationContainer,
  StyledPaginationContentContainer,
  StyledPaginationText,
  StyledPaginationWrapper,
  StyledSelect,
  StyledSelectContainer,
} from "./Pagination.styles";
import { itemsPerPageOptions, type IPaginationProps } from "@app/types";

const Pagination: FC<IPaginationProps> = ({ paginationText, table }) => {
  const itemsPerPage = table.getState().pagination.pageSize;

  const totalItems = table?.getRowCount();
  const totalPages = Math.ceil(totalItems / Number(itemsPerPage)) || 1;
  const startItem =
    table.getState().pagination.pageIndex * Number(itemsPerPage);
  const endItem = Math.min(
    (table.getState().pagination.pageIndex + 1) * Number(itemsPerPage),
    totalItems,
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    table.setPageIndex(value - 1);
  };

  const handleItemsPerPageChange = (option: {
    label: string;
    value: string;
  }) => {
    table.setPageSize(Number(option.value));
    table.setPageIndex(0);
  };

  return (
    <StyledPaginationWrapper>
      <StyledPaginationContainer>
        <StyledPaginationContentContainer>
          <StyledPaginationText>
            {paginationText ?? "Rows per page"}:
          </StyledPaginationText>
          <StyledSelectContainer>
            <StyledSelect
              defaultValue={
                itemsPerPageOptions.find(
                  (opt) => Number(opt.value) === itemsPerPage,
                )?.value
              }
              onSelectChange={handleItemsPerPageChange}
              data-testid={"items-per-page"}
              fullWidth={false}
              name={"items-per-page"}
              error={false}
              shrink={true}
              options={itemsPerPageOptions}
            />
          </StyledSelectContainer>
          <StyledPaginationText>
            {startItem + 1}-{endItem} {"Pagination of"} {totalItems}
          </StyledPaginationText>
        </StyledPaginationContentContainer>

        <StyledPaginationContentContainer>
          <StyledPagination
            count={totalPages}
            page={table.getState().pagination.pageIndex + 1}
            onChange={handlePageChange}
            siblingCount={1}
            boundaryCount={1}
            color="secondary"
            showFirstButton
            showLastButton
          />
        </StyledPaginationContentContainer>
      </StyledPaginationContainer>
    </StyledPaginationWrapper>
  );
};

export default Pagination;
