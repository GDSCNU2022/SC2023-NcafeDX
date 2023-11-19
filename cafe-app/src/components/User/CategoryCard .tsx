import 'react';

type Props = {
  src: string;
  link: string;
  text: string;
}

const CategoryCard = (props: Props) => {

  return (
    <a href={props.link}>
    <div className='flex justify-center grid grid-rows-1'>
      <div className="">
        <img className="h-64" src={props.src}/>
      </div>
      <div className='justify-center text-center'>
        <a className="text-2xl md:text-md">{props.text}</a>
      </div>
    </div>
    </a>
  )

};

export default CategoryCard;