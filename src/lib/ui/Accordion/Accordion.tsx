import type { FC } from "react";
import { useCallback, useState } from "react";
import { ChevronRightIcon } from "@app/lib/icons";
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledContainer,
} from "./Accordion.styles";
import type { IAccordion } from "@app/lib/types";

const Accordion: FC<IAccordion> = ({
  items,
  allowMultipleOpen = false,
  openIndexes = [],
}) => {
  const [currentOpenIndexes, setCurrentOpenIndexes] =
    useState<number[]>(openIndexes);

  const handleToggle = useCallback(
    (index: number) => {
      setCurrentOpenIndexes((prev) => {
        const isOpen = prev.includes(index);

        if (allowMultipleOpen) {
          return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
        } else {
          return isOpen ? [] : [index];
        }
      });
    },
    [allowMultipleOpen],
  );

  return (
    <StyledContainer>
      {items.map((item, index) => (
        <StyledAccordion
          key={`${item.title}-${index}`}
          expanded={currentOpenIndexes.includes(index)}
          sx={{
            backgroundColor: "transparent",
          }}
        >
          <StyledAccordionSummary
            expandIcon={<ChevronRightIcon />}
            onClick={() => handleToggle(index)}
            $removeborder
          >
            {item.title}
          </StyledAccordionSummary>
          {item.children && (
            <StyledAccordionDetails>{item.children}</StyledAccordionDetails>
          )}
        </StyledAccordion>
      ))}
    </StyledContainer>
  );
};

export default Accordion;
