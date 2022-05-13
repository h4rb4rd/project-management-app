import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CreateFormDataType } from '../../../../../../types';

import cl from './Title.module.scss';

export type TitleProps = {
  register: UseFormRegister<CreateFormDataType>;
};

const Title = ({ register }: TitleProps) => {
  const { t } = useTranslation();

  return (
    <div className={cl.container}>
      <label htmlFor="titleFieldId">Заголовок доски</label>
      <input
        {...register('title', {
          required: 'Поле заголовок обязательно для заполнения',
          minLength: {
            value: 3,
            message: 'Минимальная длина заголовка 3 символа',
          },
          maxLength: {
            value: 20,
            message: 'Максимальная длина заголовка 20 символов',
          },
        })}
        placeholder="Укажите название доски"
        type="text"
        id="titleFieldId"
      />
    </div>
  );
};

export default Title;
