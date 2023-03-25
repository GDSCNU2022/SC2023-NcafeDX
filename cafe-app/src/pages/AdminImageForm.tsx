import { Inter } from 'next/font/google'
import ModalImageGrid from '../components/ModalImageGrid';
const inter = Inter({ subsets: ['latin'] })

const AdminImageForm= () => {
    return (
        <div>
        <ModalImageGrid></ModalImageGrid>
        </div>

    );
}

export default AdminImageForm;