import Link from "next/link";
import MenuCard from '../components/MenuCard';
const AdminTop = () => {
    return (
        <div className='flex justify-center'>
            <div className="grid grid-cols-1">
                <p className="text-2xl">管理者用ページ</p>
                <Link href="/AdminMenuForm" className="m-2 text-neutral-800 hover:text-blue-500 flex justify-center text-xl">Menu Form</Link>
                <Link href="/AdminNewsForm" className="m-2 text-neutral-800 hover:text-blue-500 flex justify-center text-xl">News Form</Link>
            </div>
        </div>

    )
}
export default AdminTop;