import React from 'react';

interface IHeader {
  children: React.ReactNode;
}

const Header = ({ children }: IHeader) => {
  return <header className="header">{children}</header>;
};

export default Header;
