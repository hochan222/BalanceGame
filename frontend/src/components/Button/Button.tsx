import React from 'react';

interface IButton {
  text: string;
  id: string;
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, id, className, onClick }: IButton) => {
  return (
    <button type="button" id={id} className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
