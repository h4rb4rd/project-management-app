import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CreateFormDataType } from '../../../../../../types';

import cl from './Color.module.scss';

export type ColorProps = {
  register: UseFormRegister<CreateFormDataType>;
};

const Color = ({ register }: ColorProps) => {
  const { t } = useTranslation();

  return (
    <div className={cl.container}>
      <label htmlFor="colorFieldId">{t('colorField.label')}</label>
      <datalist id="reds">
        <option>#0079bf</option>
        <option>#d29034</option>
        <option>#519839</option>
        <option>#b04632</option>
        <option>#89609e</option>
      </datalist>
      <input {...register('color')} type="color" id="colorFieldId" list="reds" />
    </div>
  );
};

export default Color;
