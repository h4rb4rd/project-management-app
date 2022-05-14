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
      <label htmlFor="titleFieldId">{t('titleField.label')}</label>
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
        placeholder={t('titleField.placeholder')}
        type="text"
        id="titleFieldId"
      />
    </div>
  );
};

export default Title;
