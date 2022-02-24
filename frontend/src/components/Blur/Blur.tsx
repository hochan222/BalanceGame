import React from 'react';

interface IBlur {
  children: React.ReactNode;
}

const Blur = ({ children }: IBlur) => {
  return <section className="blur">{children}</section>;
};

export default Blur;
