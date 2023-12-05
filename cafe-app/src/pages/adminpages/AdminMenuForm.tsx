import AdminMenuList from '@src/components/AdminList/AdminMenuList';
import AdminNavBar from './AdminNavBar';

const AdminMenuForm = () => {
    return (
        <div>
            <AdminNavBar/>
            <AdminMenuList restaurant={"DaVinch"}></AdminMenuList>
        </div>

    );
}

export default AdminMenuForm;