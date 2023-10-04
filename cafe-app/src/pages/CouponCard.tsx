
export type CouponCardProps = {
  title: string
  couponCode: string
  duration: string
}

const CouponCard = (props: CouponCardProps) => {

  return (
    <>
      <div className="content-center cursor-pointer" onClick={() => {}}>
        <div className="bg-gradient-to-br from-pink-400 to-red-300 hover:to-pink-400 text-white text-center py-8 px-10 rounded-lg shadow-md relative">
          <div className="w-32">
            <h3 className="text-lg font-semibold mb-4">
              {props.title}
            </h3>
            <p className="text-sm">{props.duration}</p>
          </div>
            
      <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
      <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>

      </div>
    </div></>
  )
}

export default CouponCard