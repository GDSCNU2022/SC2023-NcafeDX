import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MenuCard from './MenuCard';
import UploadImage from './UploadImage';
import ShowUser from './users';
import MenuForm from './MenuForm';
import AdminMenuList from './AdminMenuList';
import AdminNewsList from './AdminNewsList';
import NewsForm from './NewsForm';
const inter = Inter({ subsets: ['latin'] })

const testProps = {
    id: "testID",
    label: "testLabel"
}

const AdminForm = () => {
    return (
    <div>
        <div>
            <AdminMenuList restaurant="DaVinch"></AdminMenuList>
        </div>
        <AdminNewsList props="DaVinch_News"></AdminNewsList>
        <br></br>
    </div>
    );
}

export default AdminForm;