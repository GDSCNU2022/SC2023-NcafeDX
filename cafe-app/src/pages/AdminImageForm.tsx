import { Inter } from 'next/font/google'
import ImageGrid from '../components/ModalImageGrid';
const inter = Inter({ subsets: ['latin'] })

const AdminImageForm= () => {
    return (
        <div>
        <ImageGrid></ImageGrid>
        </div>

    );
}

export default AdminImageForm;