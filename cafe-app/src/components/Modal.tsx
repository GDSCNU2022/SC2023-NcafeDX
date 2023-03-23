import { FC, ReactNode, cloneElement } from 'react';

type Props = {
    close: (e: any) => void;
    children: ReactNode;
}

const Modal = (props: Props) => {

return (
    <>
    <div onClick={props.close} className="flex justify-center">
        <div>
            {cloneElement(props.children as any, {close: props.close})}
            </div>
    </div>
    </>

)
}
export default Modal;