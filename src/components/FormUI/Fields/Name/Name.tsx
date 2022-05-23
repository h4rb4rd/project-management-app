import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormDataType } from '../../types';

import cl from './Name.module.scss';

export type NameProps = {
  isLabel?: boolean;
  register: UseFormRegister<FormDataType>;
};

const Name = ({ isLabel = false, register }: NameProps) => {
  const { t } = useTranslation();

  return (
    <div className={cl.container}>
      {isLabel && <label htmlFor="nameFieldId">{t('nameField.label')}</label>}
      <input
        {...register('name', {
          required: t('nameField.required'),
        })}
        placeholder={t('nameField.placeholder')}
        type="text"
        id="nameFieldId"
      />
    </div>
  );
};

export default Name;
