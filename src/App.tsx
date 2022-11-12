import { Fragment, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineForm } from 'react-icons/ai';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from './context/hooks';
import { addUser } from './context/listSlice';
import Modal from './components/Modal';
import Item from './components/Item';

type Inputs = {
  name: string;
  age: string;
};

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();
  const list = useAppSelector(state => state.list);

  const onSubmit: SubmitHandler<Inputs> = ({ age, name }) => {
    if (list.slice(-1)[0]) {
      const id = list.slice(-1)[0].id + 1;
      dispatch(
        addUser({
          id,
          name,
          age: Number(age),
        })
      );
    } else {
      dispatch(
        addUser({
          id: 1,
          name,
          age: Number(age),
        })
      );
    }
    reset();
  };

  return (
    <Fragment>
      <AnimatePresence>{modalOpen && <Modal setModalOpen={setModalOpen} />}</AnimatePresence>
      <div className='h-[100vh] max-w-[1060px] mx-auto py-12 flex'>
        <div className='w-1/2 pr-12 flex flex-col justify-center border-r-[0.5px] border-black'>
          <h2 className='flex items-center gap-2 font-bold text-3xl mb-4'>
            <AiOutlineForm />
            리스트 등록
          </h2>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <input //
              className='block border-b border-black text-xl p-2 focus:outline-none'
              {...register('name', {
                //
                minLength: { message: '최소 2글자 입력해주세요', value: 2 },
                required: { message: '이름을 입력해주세요', value: true },
              })}
              placeholder='이름'
            />
            {errors.name ? <p>{errors.name.message}</p> : <p>완료!</p>}
            <input //
              className='block border-b border-black text-xl p-2 focus:outline-none'
              {...register('age', {
                //
                required: {
                  message: '나이를 입력해주세요',
                  value: true, // 각 조건에 value와 메세지 입력가능
                },
                validate: {
                  isNumber: value => !isNaN(Number(value)) || '숫자만 입력해주세요', // callback 형태로 유효성 검사 가능, || 연산자로 에러 메세지 입력가능
                  isOver: value => Number(value) > 10 || '10살 보다 많아야 합니다.',
                  // async로도 유효성 검사 가능
                },
              })}
              placeholder='나이'
            />
            {errors.age ? <p>{errors.age.message}</p> : <p>완료!</p>}
            <input className='block cursor-pointer bg-gray-500 text-white font-bold text-xl py-2' type='submit' value={'등록'} />
          </form>
          <button className='block bg-gray-500 text-white font-bold text-xl mt-2 py-2' onClick={() => setModalOpen(true)}>
            모달 켜기
          </button>
        </div>
        <div className='w-1/2 pl-12 flex flex-col justify-center border-black'>
          <ul className='h-full overflow-y-scroll'>
            {list.map(user => (
              <Item user={user} key={user.id} />
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
