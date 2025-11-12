import { useMemo, useState, useCallback } from "react";
import {
  type AutocompleteInputChangeReason,
  type AutocompleteRenderOptionState,
  createFilterOptions,
  TextField,
} from "@mui/material";
import { ClearIcon, SearchIcon } from "@app/lib/icons";
import {
  AdornmentStart,
  AdornmentEnd,
  StyledAutocomplete,
  ClearText,
} from "./Autocomplete.styles";
import type {
  AccountEntityOption,
  ACProps,
  TAutocompleteProps,
} from "./Autocomplete.types";
import { highlightParts, normalize } from "./Autocomplete.utils";

export default function Autocomplete({
  required,
  disabled,
  error,
  placeholder,
  options,
  value,
  onChange,
  minChars = 1,
  onClear,
}: TAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const belowThreshold = inputValue.trim().length < minChars;
  const effectivePlaceholder =
    placeholder ?? "Search entity by keyword, filter (list from CRM)";

  const canClear = !disabled && (inputValue.trim().length > 0 || !!value);

  const optionsDeduped = useMemo(() => {
    const seen = new Set<string>();
    const base = (options ?? []).filter((o) => {
      if (!o?.id || !o?.name) return false;
      const k = o.id;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    if (
      value &&
      value.id &&
      value.name &&
      !base.some((o) => o.id === value.id)
    ) {
      return [value, ...base];
    }
    return base;
  }, [options, value]);

  const baseFilter = createFilterOptions<AccountEntityOption>({
    ignoreAccents: true,
    ignoreCase: true,
    matchFrom: "any",
    limit: 200,
    stringify: (opt) => opt.name, // only search in name
  });

  const handleClear = () => {
    onChange(null);
    setInputValue("");
    setOpen(false);
    onClear?.();
  };

  // ---- Autocomplete props (extracted) ----
  const getOptionLabel = (o: AccountEntityOption) => o.name || "";
  const isOptionEqualToValue = (
    a: AccountEntityOption,
    b: AccountEntityOption,
  ) => a?.id === b?.id;

  const handleOpen = useCallback(() => {
    if (!belowThreshold) setOpen(true);
  }, [belowThreshold]);

  const handleClose = useCallback(() => setOpen(false), []);

  const handleInputChange = useCallback(
    (_: unknown, v: string, reason: AutocompleteInputChangeReason) => {
      if (reason === "reset") {
        const next = value?.name ?? "";
        setInputValue(next);
        setOpen(next.trim().length >= minChars); // keep open if enough chars
        return;
      }

      if (reason === "clear") {
        setInputValue("");
        setOpen(false);
        return;
      }
      setInputValue(v);
      setOpen(v.trim().length >= minChars);
    },
    [minChars, value?.name],
  );

  const handleSelectChange = useCallback(
    (_: unknown, opt: AccountEntityOption | null) => {
      onChange(opt);
      setInputValue(opt?.name ?? "");
      setOpen(false);
    },
    [onChange],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      (e as any).defaultMuiPrevented = true;
    }
  }, []);

  const listboxSlot = useMemo(
    () => ({
      onMouseDown: (e: React.MouseEvent<HTMLUListElement>) =>
        e.preventDefault(),
    }),
    [],
  );

  const renderOption = useCallback(
    (
      props: React.HTMLAttributes<HTMLLIElement>,
      option: AccountEntityOption,
      state: AutocompleteRenderOptionState,
    ) => {
      // ensure unique key (id first; fallback to label+index)
      const key = option.id ?? `${option.name}-${state.index}`;
      return (
        <li {...props} key={key}>
          {highlightParts(option.name, state.inputValue || "")}
        </li>
      );
    },
    [],
  );

  const filterOptions: NonNullable<ACProps["filterOptions"]> = useCallback(
    (opts, state) => {
      const q = normalize(state.inputValue);

      // If nothing typed yet: show the currently selected option (not "no options text")
      if (!q) {
        if (value) {
          const onlySelected = opts.filter((o) => o.id === value.id);
          return onlySelected.length ? onlySelected : value ? [value] : [];
        }
        return []; // no selection and no query -> empty list
      }

      // If under threshold after typing, still empty
      if (belowThreshold) return [];

      const prelim = baseFilter(opts, state);
      return prelim.filter((o) => o.name && normalize(o.name).includes(q));
    },
    [baseFilter, belowThreshold, value],
  );

  const renderInput = useCallback(
    (params: any) => {
      const { InputProps: inputBaseProps, InputLabelProps, ...rest } = params;
      return (
        <TextField
          {...rest}
          required={required}
          error={error}
          placeholder={effectivePlaceholder}
          slotProps={{
            inputLabel: InputLabelProps,
            input: {
              ...inputBaseProps,
              startAdornment: (
                <AdornmentStart position="start">
                  <SearchIcon />
                </AdornmentStart>
              ),
              endAdornment: (
                <AdornmentEnd
                  position="end"
                  role="button"
                  aria-label="Clear"
                  aria-disabled={!canClear}
                  $disabled={!canClear}
                  onClick={canClear ? handleClear : undefined}
                  onMouseDown={(e) => {
                    if (!canClear) e.preventDefault(); // only block when disabled
                  }}
                >
                  <ClearIcon />
                  <ClearText>Clear</ClearText>
                </AdornmentEnd>
              ),
            },
          }}
        />
      );
    },
    [required, error, effectivePlaceholder, handleClear, canClear],
  );

  return (
    <StyledAutocomplete
      options={optionsDeduped}
      value={value ?? null}
      disabled={disabled}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      openOnFocus={false}
      forcePopupIcon={false}
      onChange={handleSelectChange}
      onKeyDown={handleKeyDown}
      slotProps={{ listbox: listboxSlot }}
      renderOption={renderOption}
      filterOptions={filterOptions}
      renderInput={renderInput}
      noOptionsText="Your entity is not listed"
      clearIcon={null}
    />
  );
}
