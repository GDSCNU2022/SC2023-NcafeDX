import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import UploadImage from '../components/UploadImage';
import ShowUser from '../components/users';
import JobForm from '../components/MenuForm';
import AdminMenuList from '../components/AdminMenuList';
import AdminForm from '../components/AdminForm';
import AdminNewsList from '../components/AdminNewsList';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <AdminForm></AdminForm>
    </div>

    );
}
