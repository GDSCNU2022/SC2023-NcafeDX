import AdminNewsList from '@src/components/AdminList/AdminNewsList';
import AdminNavBar from './AdminNavBar';

const AdminMenuForm = () => {
    console.log("called in admin menu form")
    return (
        <>
            <AdminNavBar/>
            <AdminNewsList props={"DaVinch_News"}></AdminNewsList>
        </>
    );
}

export default AdminMenuForm;