//@ts-ignore
import Ratings from 'react-ratings-declarative';
import { useState } from 'react';

type Props = {
    rating: number;
}

const ReactRatings = () => {
    const [state, setState] = useState<Props>({rating: 0});
    const changeRating = (newRating: number) => {
        setState({
            rating: newRating
        });
    };

    return (
        <Ratings
        rating={state.rating}
        widgetRatedColors='blue'
        changeRating={changeRating}>
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />

        </Ratings>
    );
}

export default ReactRatings;