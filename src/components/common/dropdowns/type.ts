import { ReactNode } from 'react';

type TItem = Record<string | number, unknown> | object;
type TKey = string | number;
type TValue = string | number;

export type DropdownListBaseItem<K extends TKey = TKey, V extends TValue = TValue> = {
  key: K;
  value: V;
};

export type DropdownListItem<T extends TItem = TItem, K extends TKey = TKey, V extends TValue = TValue> = T &
  DropdownListBaseItem<K, V>;

export type DropdownList<T extends TItem = TItem, K extends TKey = TKey, V extends TValue = TValue> = DropdownListItem<
  T,
  K,
  V
>[];

export type DropdownListMenu<T> = {
  icon?: ReactNode;
  text?: T;
};
