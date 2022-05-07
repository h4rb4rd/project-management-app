import React, { useState } from 'react';

import AccountForm from '../../components/AccountForm';
import img from '../../assets/account.svg';
import Success from '../../components/Success';

import cl from './Account.module.scss';

const Account = () => {
  const [isChanged, setIsChanged] = useState(false);

  const closeSuccessWindow = () => {
    setIsChanged(false);
  };

  const openSuccessWindow = () => {
    setIsChanged(true);
  };

  return (
    <div className={cl.account}>
      <div className={cl.container}>
        <img src={img} alt="form-img" />
        <h2>Управление персональными данными</h2>
        <hr className={cl.selector} />
        {!isChanged ? (
          <AccountForm openSuccessWindow={openSuccessWindow} />
        ) : (
          <Success text="Данные были успешно изменены!" close={closeSuccessWindow} />
        )}
      </div>
    </div>
  );
};

export default Account;
