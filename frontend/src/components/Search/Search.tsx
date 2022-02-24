import React from 'react';
import { observer } from 'mobx-react-lite';
import cx from 'classnames';

import UIStore from '@/stores/UIStore';
import SearchResultStore from '@/stores/SearchResultStore';

const Search = ({ uiStore, store, className }: { uiStore: UIStore; store: SearchResultStore; className?: string }) => {
  const {
    isHomeSearchDropDownActive,
    setIsHomeSearchDropDownActive,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = uiStore;
  const { searchKeyword, setSearchKeyword } = store;

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

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const enterSearchResultPage = () => {
    document.location.href = `/searchResult?keyword=${searchKeyword}&category=${selectedCategory}`;
  };

  const onClickSearch = () => {
    enterSearchResultPage();
  };

  const onKeyDownSearch = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      enterSearchResultPage();
    }
  };

  return (
    <div className={cx('wrapper', className)}>
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
          <input type="text" className="input" placeholder="Search" value={searchKeyword} onChange={onChangeSearch} />
          <i
            className="fas fa-search"
            onClick={onClickSearch}
            onKeyDown={onKeyDownSearch}
            role="button"
            tabIndex={0}
            aria-label="search button"
          />
        </div>
      </div>
    </div>
  );
};

export default observer(Search);
