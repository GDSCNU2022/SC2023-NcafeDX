import { Inter } from 'next/font/google'
import ModalImageGrid from '../components/Modal/ModalImageGrid';
const inter = Inter({ subsets: ['latin'] })
import TestModal from '../components/Modal/TestModal';

const AdminImageForm= () => {
    return (
        <div>
        <ModalImageGrid></ModalImageGrid>
        <TestModal></TestModal>
        </div>

    );
}

export default AdminImageForm;