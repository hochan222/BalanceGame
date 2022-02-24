import { makeObservable, observable, action } from 'mobx';

import RootStore from './RootStore';

class UIStore {
  rootStore: RootStore;

  isHomeSearchDropDownActive = false;

  categories = ['전체 검색', '백엔드', '프론트엔드', '데이터분석', 'AI', 'Job담'];

  selectedCategory = '전체 보기';

  selectedArticleId: number = 0;

  isArticleReadMoreEnd = false;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      isHomeSearchDropDownActive: observable,
      categories: observable,
      selectedCategory: observable,
      selectedArticleId: observable,
      setIsHomeSearchDropDownActive: action.bound,
      setCategories: action.bound,
      setSelectedCategory: action.bound,
      selectArticle: action.bound,
      isArticleReadMoreEnd: observable,
      setIsArticleReadMoreEnd: action.bound,
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

  selectArticle(articleId: number) {
    this.selectedArticleId = articleId;
  }

  setIsArticleReadMoreEnd(isArticleReadMoreEnd: boolean) {
    this.isArticleReadMoreEnd = isArticleReadMoreEnd;
  }
}

export default UIStore;
