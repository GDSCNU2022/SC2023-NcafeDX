
import { Inter } from 'next/font/google'
import AdminTop from './AdminTop';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <AdminTop></AdminTop>
    </div>

    );
}
