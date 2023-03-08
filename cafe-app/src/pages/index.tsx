import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MenuCard from '../components/menucard';
import UploadImage from '../components/image-upload';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <MenuCard></MenuCard>
      <UploadImage></UploadImage>
    </div>
    );
}
