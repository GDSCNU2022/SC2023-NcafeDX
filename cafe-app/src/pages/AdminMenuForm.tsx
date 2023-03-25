import { Inter } from 'next/font/google'
import AdminMenuList from '../components/AdminList/AdminMenuList';
const inter = Inter({ subsets: ['latin'] })

const AdminMenuForm = () => {
    return (
        <div>
        <AdminMenuList restaurant={"DaVinch"}></AdminMenuList>
        </div>

    );
}

export default AdminMenuForm;