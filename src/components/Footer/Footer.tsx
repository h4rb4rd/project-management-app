import React from 'react';

import cl from './Footer.module.scss';

import githubLogo from '../../assets/github.svg';
import rssLogo from '../../assets/rss.svg';

function Footer() {
  return (
    <div className={cl.footer}>
      <div className={cl.content}>
        <div className={cl.githubs}>
          <a href="https://github.com/" className={cl.github}>
            <img src={githubLogo} alt="github" />
            <span>developer</span>
          </a>
          <a href="https://github.com/" className={cl.github}>
            <img src={githubLogo} alt="github" />
            <span>developer</span>
          </a>
          <a href="https://github.com/" className={cl.github}>
            <img src={githubLogo} alt="github" />
            <span>developer</span>
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
