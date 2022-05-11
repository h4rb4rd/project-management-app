import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../hooks/redux';

import cl from './LocationModal.module.scss';

const LocationModal = () => {
  const { isModalOpen } = useAppSelector((state) => state.locationReducer);
  const { t, i18n } = useTranslation();

  const setEnLang = () => {
    i18n.changeLanguage('en');
  };
  const setRuLang = () => {
    i18n.changeLanguage('ru');
  };

  if (!isModalOpen) return null;
  return (
    <div className={cl.modal}>
      <button onClick={setRuLang}>{t('locationBar.ru')}</button>
      <button onClick={setEnLang}>{t('locationBar.eng')}</button>
    </div>
  );
};

export default LocationModal;
