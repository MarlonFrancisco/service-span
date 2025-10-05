type Action<T> = (set: (state: Partial<T>) => void) => () => void;

export const loadActions = <T>(
  actions: Action<T>[],
  set: (state: Partial<T>) => void,
) => {
  return actions.map((action) => action(set));
};
