import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MenuCard from '../components/menucard';
import UploadImage from '../components/image-upload';
import ShowUser from '../components/users';
import JobForm from '../components/MenuForm';

const inter = Inter({ subsets: ['latin'] })

const testProps = {
  id: "testID",
  label: "testLabel"
}

export default function Home() {
  return (
    <div>
      <MenuCard></MenuCard>
      <UploadImage></UploadImage>
      <div></div>
      <ShowUser></ShowUser>
      <div></div>
      <JobForm props="DaVinch"></JobForm>
    </div>
    );
}
