import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  ageRequired: string;
};

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <div className='p-4'>
      <h2 className='font-bold text-3xl text-center mb-4'>리스트 등록</h2>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input //
          className='block border-b border-black'
          {...register('name', { required: true })}
          placeholder='이름'
        />

        {/* include validation with required or other standard HTML validation rules */}
        <input //
          className='block border-b border-black'
          {...register('ageRequired', { required: true })}
          placeholder='나이'
        />
        {/* errors will return when field validation fails  */}
        {errors.ageRequired && <span>This field is required</span>}

        <input type='submit' value={'등록'} />
      </form>
    </div>
  );
};

export default App;
