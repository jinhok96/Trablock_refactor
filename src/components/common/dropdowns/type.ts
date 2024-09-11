export type DropdownListItem<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  key: string | number;
  value: string | number;
};
export type DropdownList<T extends Record<string, unknown> = Record<string, unknown>> = DropdownListItem<T>[];
