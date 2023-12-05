import router from 'next/router';
const AdminNavBar = () => {

  return (
    <>
      <div className="flex shadow-lg w-screen">
        <button className="font-xl rounded border border-gray-600 bg-gray-200 w-20 m-5"
          onClick={() => {router.push('/adminpages/AdminTop')}}>
          戻る
          </button>
      </div>
    </>
  );
};

export default AdminNavBar;