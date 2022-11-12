import { useAppDispatch } from '../context/hooks';
import { removeUser, User } from '../context/listSlice';
import { GrClose } from 'react-icons/gr';

const Item = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();

  const handleRemove = (id: number) => dispatch(removeUser(id));

  return (
    <li className='px-4 py-2 mb-4 gap-4 border rounded-xl flex justify-between items-center'>
      <div>
        <h4 className='font-bold text-xl'>{user.name}</h4>
        <p className='text-gray-500'>{user.age}살</p>
      </div>
      <GrClose className='cursor-pointer' onClick={() => handleRemove(user.id)} />
    </li>
  );
};
export default Item;
