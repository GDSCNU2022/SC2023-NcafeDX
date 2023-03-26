import React from 'react';
import { useQRCode } from 'next-qrcode';

type Props = {
    text: string;
}
const CreateQR = (props:Props) => {
    /*
    Usage:
    import CreateQR from 'path/to/this/component';
    return (
        <CreateQR text='What/you/want/to/read/from/QRcode'/>
    )
    */
    const { Canvas } = useQRCode();

    return (
        <Canvas
            text={props.text}
            options={{
                level: 'H',
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                    dark: '#010599FF',
                    light: '#FFFFFFFF',
                },
            }}
            />
    );
};

export default CreateQR