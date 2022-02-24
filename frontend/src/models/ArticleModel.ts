import { extendObservable, makeObservable } from 'mobx';
import AriticleStore from '@/stores/ArticleStore';
import ICommentData from '@/models/CommentModel';
// import { action, extendObservable, makeObservable, observable } from 'mobx';

import SearchResultStore from '@/stores/SearchResultStore';
import HomeStore from '../stores/HomeStore';

export interface IArticleData {
  id: number;
  title: string;
  content: string;
  leftItem: string;
  rightItem: string;
  createdAt: string;
  leftCount: string;
  rightCount: string;
  voteCount: number;
  articleCategoryDto: {
    id: number;
    name: string;
  };
  articleCommentDtos: ICommentData[];
}

class ArticleModel {
  store: HomeStore | AriticleStore | SearchResultStore ;

  id = 0;

  title = '';

  content = '';

  leftItem= "";

  rightItem= '';

  leftCount = 0;

  rightCount = 0;

  createdAt = '';

  voteCount = 0;

  articleCategoryDto = {
    id: 0,
    name: '',
  };

  articleCommentDtos = [];

  constructor(store: HomeStore | SearchResultStore, data: any) {
    makeObservable(this, {});
    extendObservable(this, {
      id: data?.id || this.id,
      title: data?.title || this.title,
      content: data?.content || this.content,
      createdAt: data?.createdAt || this.createdAt,
      leftItem: data?.leftItem || this.leftItem,
      rightItem: data?.rightItem || this.rightItem,
      leftCount: data?.leftItemStat || this.leftCount,
      rightCount: data?.rightItemStat || this.rightCount,
      voteCount: data?.totalCount || this.voteCount,
      articleCategoryDto: data?.articleCategoryDto || this.articleCategoryDto,
      articleCommentDtos: data?.articleCommentDtos || this.articleCommentDtos,
    });
    this.store = store;
  }
}

export default ArticleModel;
