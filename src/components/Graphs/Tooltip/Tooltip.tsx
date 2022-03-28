import { ReactChild, ReactFragment, ReactPortal } from 'react';

type TooltipProps = {
  children: ReactChild | ReactFragment | ReactPortal
};

const Tooltip = ({ children }: TooltipProps) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default Tooltip;
