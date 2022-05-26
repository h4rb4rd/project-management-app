import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { EditBoardType } from './types';
import Color from './Fields/Color';
import { useAppDispatch } from '../../../../hooks/redux';
import { updateBoard } from '../../../../store/thunks/BoardsThunks';
import Title from './Fields/Title';

import cl from './EditBoard.module.scss';

interface EditBoardProps {
  id: string;
  title?: string;
  color?: string;
  handleClose: () => void;
}

const EditBoard = ({ id, title = '', color = '', handleClose }: EditBoardProps) => {
  const {
    formState,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditBoardType>({
    mode: 'onSubmit',
    defaultValues: {
      title,
      color,
    },
  });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<EditBoardType> = ({ title, color }) => {
    dispatch(updateBoard({ id, title: `${title}ʵ${color}` }));
    handleClose();
    reset();
  };

  useEffect(() => {
    if (formState.errors.title) {
      toast.error(errors.title?.message);
    }
    if (formState.errors.color) {
      toast.error(errors.color?.message);
    }
  }, [formState.isSubmitting]);

  return (
    <div className={cl.container}>
      <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
        <Title register={register} />
        <Color register={register} />
        <button className={`${cl.changeBtn} ${cl.changeBtnOk}`} type="submit">
          &#10004;
        </button>
        <button className={`${cl.changeBtn} ${cl.changeBtnNo}`} onClick={handleClose}>
          &#10008;
        </button>
      </form>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
};

export default EditBoard;
