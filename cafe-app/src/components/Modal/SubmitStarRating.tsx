import React from 'react';
import ReactStars from 'react-stars';
import { getMenu, updateMenu } from '../../pages/api/get-menu';
import { db } from '../../../firebase/client';

// ref https://www.geeksforgeeks.org/how-to-add-star-rating-in-nextjs/
type Props = {
    parentCloseHandler: Function;
    restaurant: string;
    menuName: string;
    id: string;
}
const SubmitStarRating = (props: Props) => {
    const ratingSubmit = (newRating: number) => {
        console.log(newRating);
        const path = `${props.restaurant}/${props.menuName}`;
        console.log(`StarRating got ${props.restaurant}/${props.menuName}`);
        getMenu(db, path).then((menu: any) => {
            const newObj = {...menu};
            // calc avg of star ratings.
            if(newObj.starStorage.length !== 0) {newObj.starStorage.push(newRating);};
            var avgRating: number = 0;
            newObj.starStorage.map((rating: number) => avgRating += rating);
            console.log(`${avgRating}/ ${newObj.starStorage.length}`);
            newObj.stars = avgRating === 0 ? newRating : avgRating / newObj.starStorage.length;
            newObj.starStorage.push(newRating);
            console.log(newObj);
            console.log(path);
      
            updateMenu(db, `${props.restaurant}/${props.id}`, newObj);
            if(props.parentCloseHandler) props.parentCloseHandler();
        }
        )
    };
    return (
        <div>
            <h2>Star Ratings</h2>
            <ReactStars
                onChange={ratingSubmit}
                count={5}
                size={30}
                color2={'#ffd700'}/>
        </div>
    );
};
export default SubmitStarRating;