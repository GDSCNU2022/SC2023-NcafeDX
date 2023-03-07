import { MenuProps } from './menucard';
// 更新されない
function _MenuCard(props: any) {
    let menus = props.menus;
    console.log(menus);
    return (
        <div>
            {menus ? (<div>No Props</div>): (<div></div>)}
            <ul>
                {menus?.map((item: any) => {(<li key={item.name}>
                            {item.name}:{item.price}:{item.nutrition}:{item.stars}
                        </li>)}
                )}
            </ul>
        </div>
    );
}

export default _MenuCard;