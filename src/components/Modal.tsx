import { motion } from 'framer-motion';
import { useAppSelector } from '../context/hooks';
import Item from './Item';
import { GrClose } from 'react-icons/gr';

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setModalOpen }: ModalProps) => {
  const list = useAppSelector(store => store.list);

  return (
    <motion.div
      className='fixed w-full h-full bg-black/50 flex items-center justify-center' //
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.1,
      }}
    >
      <div className='bg-white rounded-2xl max-w-[600px] w-full h-[50vh] p-4'>
        <div className='px-2 mb-2 flex items-center justify-between'>
          <h2 className='font-bold text-2xl'>User</h2>
          <GrClose className='cursor-pointer' onClick={() => setModalOpen(false)} />
        </div>
        <ul className='h-[calc(100%-40px)] overflow-y-scroll'>
          {list.map(user => (
            <Item user={user} key={user.id} />
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
export default Modal;
