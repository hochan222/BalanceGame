import React from 'react';

interface ISection {
  className: string;
  children: React.ReactNode;
}

const Section = ({ className, children }: ISection) => {
  return <section className={className}>{children}</section>;
};

export default Section;
