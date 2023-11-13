import 'react';

type Props = {
  src: string;
  link: string;
  text: string;
}

const CategoryCard = (props: Props) => {

  return (
    <a href={props.link}>
    <div className='flex bg-gray-400 justify-center grid grid-rows-1'>
      <div className="bg-red-400">
        <img className="h-64" src={props.src}/>
      </div>
      <div className='justify-center text-center h-10 bg-slate-600'>
        <a className="text-3xl">{props.text}</a>
      </div>
    </div>
    </a>
  )

};

export default CategoryCard;