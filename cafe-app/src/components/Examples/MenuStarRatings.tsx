import ReactStars from 'react-stars';

type Props ={
    ratings: number
}
const MenuStarRatings = (props: Props) => {

    return (
        <>
        <ReactStars
            count={5}
            size={15}
            color2={'#ffd700'}
            value={props.ratings}
            edit={false}
            half={false}
            />
        </>
    );
};
export default MenuStarRatings;