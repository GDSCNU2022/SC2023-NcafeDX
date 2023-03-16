import { Inter } from 'next/font/google'
import AdminMenuList from '../components/AdminMenuList';
const inter = Inter({ subsets: ['latin'] })

const AdminMenuForm = () => {
    return (
        <AdminMenuList restaurant={"DaVinch"}></AdminMenuList>
    );
}

export default AdminMenuForm;