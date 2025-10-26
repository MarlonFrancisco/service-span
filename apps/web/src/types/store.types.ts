export type TStoreSet<T> = (
  state: Partial<T> | ((state: T) => Partial<T>),
) => void;

export type TStoreGet<T> = () => T;

export type TStoreAction<T, R = void, TResponse = void> = (
  set: TStoreSet<T>,
  get: TStoreGet<T>,
) => (params: R) => Promise<TResponse>;
