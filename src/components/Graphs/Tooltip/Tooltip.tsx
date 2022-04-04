import { ReactChild, ReactFragment, ReactPortal } from 'react';

type TooltipProps = {
  children: ReactChild | ReactFragment | ReactPortal
};

const Tooltip = ({ children }: TooltipProps) => {
  return (
    <div className={'flex flex-col px-2 py-1 bg-white rounded shadow-lg border border-gray-200 whitespace-nowrap'}>
      {children}
    </div>
  );
};

export default Tooltip;
