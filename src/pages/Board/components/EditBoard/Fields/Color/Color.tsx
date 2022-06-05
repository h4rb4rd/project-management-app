import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { EditBoardType } from '../../types';

import cl from './Color.module.scss';

interface ColorProps {
  register: UseFormRegister<EditBoardType>;
}

const Color = ({ register }: ColorProps) => {
  return (
    <>
      <datalist id="colors">
        <option>#0079bf</option>
        <option>#d29034</option>
        <option>#519839</option>
        <option>#b04632</option>
        <option>#89609e</option>
      </datalist>
      <input {...register('color')} className={cl.input} type="color" list="colors" />
    </>
  );
};

export default Color;
