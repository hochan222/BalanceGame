import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import LogoImage from '@/asset/logo/11STREET_color.png';

interface ILogo {
  className?: String;
}

const Logo = ({ className }: ILogo) => {
  return (
    <NavLink to="/" className="logo__wrapper">
      <img className={cx('logo__img', className)} src={LogoImage} alt="llst" />
    </NavLink>
  );
};

export default Logo;
