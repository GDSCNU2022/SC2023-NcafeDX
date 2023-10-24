type CardProps = {
  title: string
  boolDay: boolean[]
}

const IsVotedTimeCard = (props: CardProps) => {

  return (
    <>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {props.title ? props.title : 'No title'}
      </h3>
      <div>
        <a>朝時間：{props.boolDay[0] ? "済" : "未"}</a><br/>
        <a>昼時間：{props.boolDay[1] ? "済" : "未"}</a><br/>
        <a>夜時間：{props.boolDay[2] ? "済" : "未"}</a>
      </div>
      </div>
    </>
  )
}

export default IsVotedTimeCard 