import AdminNewsList from '@src/components/AdminList/AdminNewsList';


const AdminMenuForm = () => {
    console.log("called in admin menu form")
    return (
        <>
            <AdminNewsList props={"DaVinch_News"}></AdminNewsList>
        </>
    );
}

export default AdminMenuForm;