import Link from "next/link";
import MenuCard from '../components/MenuCard';
const AdminTop = () => {
    return (
        <div>
            <h1>Admin Page</h1>
            <ul>
                <li>
                <Link href="/AdminMenuForm">Menu Form</Link>
                <br/>
                <Link href ="/AdminNewsForm">News Form</Link>
                </li>
            </ul>
            <MenuCard props={"DaVinch/唐揚げ定食"}/>
        </div>
    )
}
export default AdminTop;