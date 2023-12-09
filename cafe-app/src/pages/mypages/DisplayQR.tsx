import React from "react";
import { useQRCode } from "next-qrcode";
import { FunctionBody } from "typescript";

type Props = {
  title: string
  duration: string
  couponCode: string
  close: any
}

const DisplayQR = (props: Props) => {
  const { Canvas } = useQRCode()

  const handlerClose = () => {
    if(props.close) props.close()
  }

  return (
    <>
    <div className="bg-white p-4 md:w-1/2, rounded-xl">
      <div className="m-5 border-4">
        <Canvas
          text={props.couponCode}
          options={{
            errorCorrectionLevel: "H",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#010599FF",
              light: "#FFFFFFFF",
              }
            }}
        />
      </div>
      <a className="flex justify-center text-red-400 py-2">有効期限: {props.duration}</a>
      <a className="flex justify-center text-2xl font-bold">{props.title}</a>
    </div>
    <div className="flex justify-end">
      <div className="bg-gray-600 opacity-90 rounded m-2 px-2">
        <button onClick={handlerClose} className="text-white">Close</button>
      </div>
    </div>
    </>
  )
}

export default DisplayQR