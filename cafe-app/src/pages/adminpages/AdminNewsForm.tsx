import AdminNewsList from '@src/components/AdminList/AdminNewsList';
import AdminNavBar from './AdminNavBar';

const AdminMenuForm = () => {
    return (
        <>
            <AdminNavBar/>
            <AdminNewsList props={"DaVinch_News"}></AdminNewsList>
        </>
    );
}

export default AdminMenuForm;