import React from 'react';

import cl from './Developer.module.scss';

interface DeveloperProps {
  name: string;
  imageUrl: string;
  position: string;
  githubUrl: string;
}

const Developer = ({ name, imageUrl, position, githubUrl }: DeveloperProps) => {
  return (
    <div className={cl.developer}>
      <img className={cl.image} src={imageUrl} alt="developer" />
      <p className={cl.name}>{name}</p>
      <p className={cl.position}>{position}</p>
      <a className={cl.github} href={githubUrl}>
        Github
      </a>
    </div>
  );
};
export default Developer;
