import React from 'react';

import leftImg from '../../assets/signup/left-img.svg';
import rightImg from '../../assets/signup/right-img.svg';

import cl from './SignUpBg.module.scss';

const SignUpBg = () => {
  return (
    <div className={cl.container}>
      <img className={cl.left} src={leftImg} alt="left-img" />
      <img className={cl.right} src={rightImg} alt="right-img" />
    </div>
  );
};

export default SignUpBg;
