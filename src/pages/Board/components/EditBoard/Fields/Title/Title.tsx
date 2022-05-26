import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EditBoardType } from '../../types';

import cl from './Title.module.scss';

interface TitleProps {
  register: UseFormRegister<EditBoardType>;
}

const Title = ({ register }: TitleProps) => {
  const { t } = useTranslation();

  return (
    <input
      {...register('title', {
        required: t('titleField.required'),
        minLength: {
          value: 3,
          message: t('titleField.minLength'),
        },
        maxLength: {
          value: 20,
          message: t('titleField.maxLength'),
        },
      })}
      className={cl.input}
      placeholder={t('titleField.placeholder')}
      type="text"
      autoFocus
    />
  );
};

export default Title;
