import { makeObservable, observable, action, flow } from 'mobx';
import CommentModel, { ICommentData } from '@/models/CommentModel';

import RootStore from './RootStore';
import ArticleRepository from '@/repositories/ArticleRepository';
import ArticleModel from '@/models/ArticleModel';

class AriticleStore {
  rootStore: RootStore;

  isLoading = true;

  public comments: CommentModel[] = [];

  public article: ArticleModel = {
    "store": this,
    "id": 1,
    "title": "",
    "leftItem": "",
    "rightItem": "",
    "leftCount": 0,
    "rightCount": 0,
    "content": "",
    "createdAt": "",
    "voteCount": 0,
    "articleCommentDtos": [],
    "articleCategoryDto": {
      "id": 1,
      "name": "BackEnd"
    }
  };
  
  constructor(rootStore: RootStore) {
    makeObservable(this, {
      comments: observable,
      article: observable,
      isLoading: observable,
      setArticle: action.bound,
      setComments: action.bound,
      setIsLoading: action,
      fetchArticle: flow.bound,
      patchVote: flow.bound,
      postComment: flow.bound,
    });
    this.rootStore = rootStore;
  }

  setComments(articleData: ArticleModel) {
    const { articleCommentDtos } = articleData;
    this.comments = articleCommentDtos.map((comment: ICommentData)=> new CommentModel(this, comment));
  }

  setArticle(article: ArticleModel) {
    this.article = article;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  *fetchArticle() {
    this.setIsLoading(true);

    try {
      const { data : articleData } = yield ArticleRepository.getArticle(this.rootStore.uiStore.selectedArticleId);
      // 배열형태
      this.setArticle(articleData.data);
      this.setComments(articleData.data);
    } catch (e) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.error(e);
    }

    this.setIsLoading(false);
  }

  // 댓글을 post하는 로직
  *patchVote(selectedVote: string) {
    this.setIsLoading(true);

    try {
      yield ArticleRepository.fetchVote(this.rootStore.uiStore.selectedArticleId, selectedVote);
      // 배열형태
    } catch (e) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.error(e);
    }

    this.setIsLoading(false);
  }

  *postComment(content: string) {
    this.setIsLoading(true);

    try {
      yield ArticleRepository.postComment(this.rootStore.uiStore.selectedArticleId, content);
      this.fetchArticle();
      // 배열형태
    } catch (e) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.error(e);
    }

    this.setIsLoading(false);
  }

}

export default AriticleStore;
