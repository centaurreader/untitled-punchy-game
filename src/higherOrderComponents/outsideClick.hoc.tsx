import React, {
  useRef,
  useEffect,
} from 'react';

interface OutsideClickProps {
  onOutsideClick: () => void;
};

const outsideClick = <P extends object>(
  InnerComponent: React.ComponentType<P>
): React.FC<P & OutsideClickProps> => ({
  onOutsideClick,
  ...props
}: OutsideClickProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mouseup', (event) => {
      if (!container?.current?.contains(event.target as Element)) { 
        onOutsideClick();
      }
    });
  }, [onOutsideClick]);

  return (
    <div ref={container}>
      <InnerComponent {...props as P} />
    </div>
  );
};

export default outsideClick;
