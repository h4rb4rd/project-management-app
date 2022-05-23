import React from 'react';

import cl from './Developer.module.scss';

interface DeveloperProps {
  name: string;
  imageUrl: string;
  position: string;
  githubUrl: string;
  description: DescriptionType[];
}

type DescriptionType = {
  id: number;
  text: string;
};

const Developer = ({ name, imageUrl, position, githubUrl, description }: DeveloperProps) => {
  return (
    <div className={cl.developer}>
      <img className={cl.image} src={imageUrl} alt="developer" />
      <p className={cl.name}>{name}</p>
      <p className={cl.position}>{position}</p>
      <a className={cl.github} href={githubUrl}>
        Github
      </a>
      <ul className={cl.description}>
        {description.map(({ id, text }) => {
          return <li key={id}>{text}</li>;
        })}
      </ul>
    </div>
  );
};
export default Developer;
