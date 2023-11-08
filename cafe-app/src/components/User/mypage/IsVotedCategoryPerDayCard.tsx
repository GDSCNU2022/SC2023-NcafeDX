type CardProps = {
  title: string
  isVotedCategoryPerDay: boolean[]
}

const IsVotedCategoryPerDayCard = (props: CardProps) => {

  return (
    <>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl 
      p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {props.title ? props.title : 'No title'}
      </h3>
      <div>
        <a>定食：{props.isVotedCategoryPerDay[0] ? "済" : "未"}</a><br/>
        <a>麺類：{props.isVotedCategoryPerDay[1] ? "済" : "未"}</a><br/>
        <a>丼物：{props.isVotedCategoryPerDay[2] ? "済" : "未"}</a><br/>
        <a>カレー：{props.isVotedCategoryPerDay[3] ? "済" : "未"}</a>
      </div>
      </div>
    </>
  )
}

export default IsVotedCategoryPerDayCard 