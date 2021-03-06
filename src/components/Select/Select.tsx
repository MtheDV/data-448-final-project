import {Listbox, Transition} from '@headlessui/react';
import {toTitleCase} from '../../utils';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';
import {Dispatch, Fragment, ReactElement, SetStateAction, useCallback} from 'react';

type SelectProps<T> = {
  value: T,
  noneValue: T,
  values: Array<T>
  onChange: Dispatch<SetStateAction<T>>
}

const Select = <T extends string>({value, noneValue, values, onChange}: SelectProps<T>) => {
  const ListboxOption = useCallback((optionValue: typeof value): ReactElement => {
    return (
      <Listbox.Option
        value={optionValue}
        className={({active}) => `flex items-center px-2 py-1 ${active ? 'bg-gray-200' : ''}`}
      >
        {({selected}) =>
          <>
            {selected &&
              <CheckIcon className={'w-4 h-4 text-gray-400 mr-2'}/>
            }
            <span>{toTitleCase(optionValue)}</span>
          </>
        }
      </Listbox.Option>
    );
  }, []);
  
  return (
    <Listbox value={value} onChange={onChange}>
      <div className={'relative'}>
        <Listbox.Button
          className={'flex justify-between items-center w-full py-2 px-3 border border-gray-400 rounded-lg text-left'}
        >
          <span className={'block truncate'}>{toTitleCase(value)}</span>
          <SelectorIcon className={'w-5 h-5 text-gray-400'} aria-hidden={true}/>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave={'transition ease-in duration-100'}
          leaveFrom={'opacity-100'}
          leaveTo={'opacity-0'}
        >
          <Listbox.Options
            className={'absolute z-40 w-full py-2 mt-1 overflow-auto text-base bg-white rounded-md border border-gray-400 shadow'}
          >
            {ListboxOption(noneValue)}
            {values.map(value =>
              <Fragment key={`${value}`}>
                {ListboxOption(value)}
              </Fragment>
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
