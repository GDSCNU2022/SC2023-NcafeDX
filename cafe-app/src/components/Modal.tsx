import { FC, ReactNode, cloneElement } from 'react';

type Props = {
    close: Function;
    children: ReactNode;
}

const Modal = (props: Props) => {

return (
    <>
    <div onClick={() => props.close} className="flex justify-center w-128">
        <div>
            {cloneElement(props.children as any, {close: props.close})}
            </div>
    </div>
    </>

)
}
export default Modal;