import React from 'react';
import { observer } from 'mobx-react-lite';
import cx from 'classnames';

import UIStore from '@/stores/UIStore';

const Search = ({ uiStore }: { uiStore: UIStore }) => {
  const {
    isHomeSearchDropDownActive,
    setIsHomeSearchDropDownActive,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = uiStore;

  const onClickDropDown = (e: React.MouseEvent<HTMLElement>) => {
    const currentTargetElement = e.currentTarget;
    const targetElement = e.target as HTMLElement;

    if (!currentTargetElement.classList.contains('dropdown')) {
      return;
    }

    setIsHomeSearchDropDownActive(true);

    if (targetElement.classList.contains('dropdown_option')) {
      setSelectedCategory(targetElement.textContent as string);
      setIsHomeSearchDropDownActive(false);
    }
  };

  const onBlurDropDown = () => {
    setIsHomeSearchDropDownActive(false);
  };

  return (
    <div className="wrapper">
      <div className="search_box">
        <div
          className="dropdown"
          role="button"
          tabIndex={0}
          onClick={onClickDropDown}
          onBlur={onBlurDropDown}
          onKeyDown={onClickDropDown}
        >
          <div className="default_option">{selectedCategory}</div>
          <ul className={cx('dropdown_ul', { active: isHomeSearchDropDownActive })}>
            {categories.map((category) => (
              <li className="dropdown_option" key={category}>
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="search_field">
          <input type="text" className="input" placeholder="Search" />
          <i className="fas fa-search" />
        </div>
      </div>
    </div>
  );
};

export default observer(Search);
