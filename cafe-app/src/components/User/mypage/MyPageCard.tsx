type CardProps = {
  title: string
  text?: string
  children?: React.Component
}
const MyPageCard = (props: CardProps) => {

  return (
    <>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {props.title ? props.title : 'No title'}
      </h3>
      { props.text 
        ?
        <p className="mt-2 text-gray-800 dark:text-gray-400">
          {props.text}
        </p> 
        :
        <>
          {props.children}
        </>
      }
      </div>
    </>
  )
}

export default MyPageCard