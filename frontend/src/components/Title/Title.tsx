import React from 'react';

interface ITitle {
  text: String;
  Tag?: React.ElementType;
}

const Title = ({ text, Tag = 'h1' }: ITitle) => {
  return <Tag className="title">{text}</Tag>;
};

export default Title;
