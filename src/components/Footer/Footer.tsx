import React from 'react';

import githubLogo from '../../assets/github.svg';
import rssLogo from '../../assets/rss.svg';

import cl from './Footer.module.scss';

function Footer() {
  return (
    <div className={cl.footer}>
      <div className={cl.content}>
        <div className={cl.githubs}>
          <a href="https://github.com/h4rb4rd" className={cl.github}>
            <img src={githubLogo} alt="h4rb4rd" />
            <span>h4rb4rd</span>
          </a>
          <a href="https://github.com/yuliya-karimova" className={cl.github}>
            <img src={githubLogo} alt="yuliya-karimova" />
            <span>yuliya-karimova</span>
          </a>
          <a href="https://github.com/Mrak9087" className={cl.github}>
            <img src={githubLogo} alt="Mrak9087" />
            <span>Mrak9087</span>
          </a>
        </div>

        <div className={cl.copy}>&copy; 2022</div>
        <a href="https://rs.school/react/" className={cl.rss}>
          <img src={rssLogo} alt="Rolling Scopes School" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
