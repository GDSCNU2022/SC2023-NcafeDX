import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import UploadImage from '../components/UploadImage';
import ShowUser from '../components/users';
import JobForm from '../components/MenuForm';
import AdminMenuList from '../components/AdminMenuList';
import AdminForm from '../components/AdminForm';
const inter = Inter({ subsets: ['latin'] })

const testProps = {
  id: "testID",
  label: "testLabel"
}

export default function Home() {
  return (
    <BrowserRouter>
      <MenuCard></MenuCard>
      <UploadImage></UploadImage>
      <div></div>
      <ShowUser></ShowUser>
      <br></br>
      <div></div>
      保存データのリスト
      <AdminMenuList restaurant="DaVinch"></AdminMenuList>
      <br></br>
      <div></div>
      <JobForm props="DaVinch"></JobForm>
      <Routes>
        <Route path='/Admin' element={<AdminForm/>} />

      </Routes>
      <Link to = '/Admin'>Go to Admin</Link>
    </BrowserRouter>
    );
}
