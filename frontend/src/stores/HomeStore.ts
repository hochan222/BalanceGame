import { action, flow, makeObservable, observable } from 'mobx';

import RootStore from '@/stores/RootStore';
import ArticleModel, { IArticleData } from '@/models/ArticleModel';
import HomeRepository from '@/repositories/HomeRepository';

class HomeStore {
  rootStore: RootStore;

  isLoading = true;

  public articles: ArticleModel[] = [];

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      isLoading: observable,
      articles: observable,
      fetchArticles: flow,
      setIsLoading: action,
    });
    this.rootStore = rootStore;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setArticles(articles: ArticleModel[]) {
    this.articles = articles.map((article: IArticleData) => new ArticleModel(this, article));
  }

  *fetchArticles() {
    this.setIsLoading(true);
    try {
      const { data } = yield HomeRepository.getArticle();
      this.setArticles(data);
    } catch (e) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.error(e);
    }

    this.setIsLoading(false);
  }
}

export default HomeStore;
