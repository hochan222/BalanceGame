import React from 'react';

interface IText {
  text?: String;
  className: String;
  children?: React.ReactNode;
  Tag?: React.ElementType;
}

const Text = ({ text, className, children, Tag = 'p' }: IText) => {
  return (
    <Tag className={className}>
      {text}
      {children}
    </Tag>
  );
};

export default Text;
