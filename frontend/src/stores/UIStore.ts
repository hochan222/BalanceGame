import { makeObservable, observable, action } from 'mobx';

import RootStore from './RootStore';

class UIStore {
  rootStore: RootStore;

  isHomeSearchDropDownActive = false;

  categories = ['전체 보기', '백엔드', '프런트엔드'];

  selectedCategory = '전체 보기';

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      isHomeSearchDropDownActive: observable,
      categories: observable,
      selectedCategory: observable,
      setIsHomeSearchDropDownActive: action.bound,
      setCategories: action.bound,
      setSelectedCategory: action.bound,
    });
    this.rootStore = rootStore;
  }

  setIsHomeSearchDropDownActive(isHomeSearchDropDownActive: boolean) {
    this.isHomeSearchDropDownActive = isHomeSearchDropDownActive;
  }

  setSelectedCategory(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
  }

  setCategories(categories: string[]) {
    this.categories = categories;
  }
}

export default UIStore;
