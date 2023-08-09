// const [person, updatePerson] = useImmer({
//     name: "Michel",
//     age: 33
//   });

//   function updateName(name) {
//     updatePerson(draft => {
//       draft.name = name;
//     });

//     updatePerson({
//       name:12;
//     });
//   }

import { produce, Draft, freeze } from 'immer';
import { useCallback, useState } from 'react';
export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];
export function useImmer<S = unknown>(initialValue: S | (() => S)): ImmerHook<S>;
export function useImmer<T>(initialValue: T) {
  const [val, updateValue] = useState(() =>
    freeze(typeof initialValue === 'function' ? initialValue() : initialValue, true)
  );
  return [
    val,
    useCallback((updater: Updater<T>) => {
      if (typeof updater === 'function') {
        updateValue(produce(updater));
      } else {
        updateValue(freeze(updater));
      }
    }, []),
  ];
}
