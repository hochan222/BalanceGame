import { extendObservable, makeObservable } from 'mobx';

import SearchResultStore from '@/stores/SearchResultStore';
import HomeStore from '../stores/HomeStore';

export interface IArticleData {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  voteCount: number;
}

class ArticleModel {
  store: HomeStore | SearchResultStore;

  id = 0;

  title = '';

  content = '';

  createdAt = '';

  voteCount = 0;

  constructor(store: HomeStore, data: IArticleData) {
    makeObservable(this, {});
    extendObservable(this, data);
    this.store = store;
  }
}

export default ArticleModel;
