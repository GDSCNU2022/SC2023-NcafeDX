import Link from "next/link";

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
        </div>
    )
}
export default AdminTop;