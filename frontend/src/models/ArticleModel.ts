import { extendObservable, makeObservable } from 'mobx';

import SearchResultStore from '@/stores/SearchResultStore';
import HomeStore from '../stores/HomeStore';

export interface IArticleData {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  voteCount: number;
  articleCategoryDto: {
    id: number;
    name: string;
  };
}

class ArticleModel {
  store: HomeStore | SearchResultStore;

  id = 0;

  title = '';

  content = '';

  createdAt = '';

  voteCount = 0;

  articleCategoryDto = {
    id: 0,
    name: '',
  };

  constructor(store: HomeStore | SearchResultStore, data: any) {
    makeObservable(this, {});
    extendObservable(this, {
      id: data?.id || this.id,
      title: data?.title || this.title,
      content: data?.content || this.content,
      createdAt: data?.createdAt || this.createdAt,
      voteCount: data?.totalCount || this.voteCount,
      articleCategoryDto: data?.articleCategoryDto || this.articleCategoryDto,
    });
    this.store = store;
  }
}

export default ArticleModel;
