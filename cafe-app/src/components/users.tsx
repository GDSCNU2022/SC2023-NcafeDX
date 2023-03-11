import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/client';
import { getMenu, MenuProps } from './get-menu';
import { UserProps, getUser } from './get-user';
const userTestProps: UserProps ={
    name: "test taro",
    mail: "test@gmail.com",
    points: 5,
    couponID: "testCouponID",
    boolDay: {morning: true, day: false, night: false},
    votedCategory: {teishoku: true, noodle: true, don: false, curry: false},
}

const ShowUser = () => {
    const [user, setUser] = useState<UserProps>(userTestProps);
    const userMail = "demo@gmail.com";
    useEffect(() => {
        getUser(db, userMail).then((value: any) => {
            setUser(value);
        })
    }, []);
    return (
    <div>
        <span>登録済みのUser情報は以下です</span>
        <ul>
            <li>name: {user.name}</li>
            <li>mail: {user.mail}</li>
            <li>points: {user.points}</li>
            <li>couponID: {user.couponID}</li>
            <li>boolDay: {user.boolDay.morning ? "朝は投票済みです" : "朝の投票をお待ちしております"}</li>
            <li>votedCategory: {user.votedCategory.noodle ? "麺類には既に投票しています" : "麺類への投票をお待ちしております"}</li>
        </ul>
    </div>
    )
}

export default ShowUser;