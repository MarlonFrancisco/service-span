export type TStoreSet<T> = (
  state: Partial<T> | ((state: T) => Partial<T>),
) => void;
