import { DROPDOWN_DATA } from '@app/constants';
import type { DropdownName, DropdownOption } from '@app/types';
import { useQuery } from '@tanstack/react-query';

const convertToLabelValue = (
  sourceData: string[] | Record<string, string> | null | undefined
): DropdownOption[] => {
  if (!sourceData) {
    return [];
  }

  let values: string[];

  if (Array.isArray(sourceData)) {
    values = [...sourceData];
  } else if (typeof sourceData === 'object' && sourceData !== null) {
    values = Object.values(sourceData) as string[];
  } else {
    return [];
  }

  return values
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ label: value, value }));
};

export const useDropdownValues = (dropdownName?: DropdownName) => {
  let res: DropdownOption[] = [];
  if (!dropdownName || !(dropdownName in DROPDOWN_DATA)) {
    res = [];
  } else {
    res = convertToLabelValue(DROPDOWN_DATA[dropdownName]);
  }

  return useQuery({
    queryKey: ['dropdown', dropdownName],
    queryFn: () => res
  });
};
