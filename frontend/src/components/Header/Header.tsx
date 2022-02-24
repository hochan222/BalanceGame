import React from 'react';
import cx from 'classnames';

interface IHeader {
  className?: String;
  children: React.ReactNode;
}

const Header = ({ className, children }: IHeader) => {
  return <header className={cx('header', className)}>{children}</header>;
};

export default Header;
