import MenuStarRatings from "@src/components/Examples/MenuStarRatings";
import ModalMenuInfo from "@src/components/Modal/ModalMenuInfo";
import React from 'react';

const MenuCard = React.memo((props: {domID, menu, index, restaurant, formUrl}) => {

return (
        <div id={props.domID} className="">
          <div
            className="mx-auto"
            key={props.index}
          >
            <div id="menu-card" className="border m-1 rounded-lg shadow-lg">
              <div className="">
                <div className="object-cover">
                  <img id="menu-card-img"
                    className="object-cover rounded-t-lg bg-clip-padding"
                    src={props.menu.imageURL}
                  />{" "}
                </div>
              </div>
              <div className="p-2">
                <div className="mb-1">
                  <MenuStarRatings
                    ratings={props.menu.stars ? props.menu.stars : 0}
                  />
                  <h2 className="text-gray-900 text-md md:text-md sm:text-md font-medium">
                    {props.menu.name}
                  </h2>
                  <h2 className="text-gray-900 text-2xl md:text-xl sm:text-xl font-medium">
                    ¥{props.menu.price}
                  </h2>
                  <h2 className="text-gray-900 h-24 text-md font-medium border rounded-lg p-2 mt-2 w-full break-all overflow-auto">
                    {props.menu.text}
                  </h2>
                </div>
                <a href={props.menu.url}>
                  <div className="">
                    <ModalMenuInfo 
                      restaurant={props.restaurant}
                      name={props.menu.name}
                      id={props.menu.id}
                      formURL={props.formUrl}
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        );
}
);

export default MenuCard;