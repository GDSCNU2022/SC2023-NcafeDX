import ReactStars from 'react-stars';

type Props ={
    ratings: number
}

//　連投できるのでできなくしたい
const MenuStarRatings = (props: Props) => {

    return (
        <>
        <ReactStars
            count={5}
            size={15}
            color2={'#ffd700'}
            value={props.ratings}
            edit={false}
            half={true}
            />
        </>
    );
};
export default MenuStarRatings;