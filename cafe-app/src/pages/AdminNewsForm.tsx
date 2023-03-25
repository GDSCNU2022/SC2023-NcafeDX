import { Inter } from 'next/font/google'
import AdminNewsList from '../components/AdminList/AdminNewsList';
const inter = Inter({ subsets: ['latin'] })

const AdminMenuForm = () => {
    return (
        <AdminNewsList props={"DaVinch_News"}></AdminNewsList>
    );
}

export default AdminMenuForm;