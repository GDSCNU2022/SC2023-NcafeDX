import React from 'react';
import { useQRCode } from 'next-qrcode';

type Props = {
    text: string;
}
const CreateQR = (props:Props) => {
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
                    light: '#FFBF60FF',
                },
            }}
            />
    );
};

export default CreateQR