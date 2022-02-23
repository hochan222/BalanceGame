import { extendObservable, makeObservable } from 'mobx';
// import { action, extendObservable, makeObservable, observable } from 'mobx';
import HomeStore from '../stores/HomeStore';

export interface IArticleData {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  voteCount: number;
}

class ArticleModel {
  store: HomeStore;

  id = 0;

  title = '';

  content = '';

  createdAt = '';

  voteCount = 0;

  constructor(store: HomeStore, data: IArticleData) {
    makeObservable(this, {
      // isHomeAppIconDragEnter: observable,
      // setIsHomeAppIconDragEnter: action.bound,
    });
    extendObservable(this, data);
    this.store = store;
  }
}

export default ArticleModel;
