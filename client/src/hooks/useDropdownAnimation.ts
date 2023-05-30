import { useEffect } from 'react';

type DropDownRef = React.RefObject<HTMLDivElement>;
type DropDownIconRef = React.RefObject<HTMLImageElement>;
const useDropDownAnimation = (
    open: boolean,
    dropDownRef: DropDownRef,
    dropDownIconRef: DropDownIconRef
) => {
    useEffect(() => {
        if (!dropDownRef.current || !dropDownIconRef.current) return;
        if (open) {
            dropDownRef.current.style.height = '104px';
            dropDownIconRef.current.style.transform = 'rotate( 180deg )';
        } else {
            dropDownRef.current.style.height = '0px';
            dropDownIconRef.current.style.transform = 'rotate( 0deg )';
        }
    }, [open]);
};

export default useDropDownAnimation;
