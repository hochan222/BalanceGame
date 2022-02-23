import { action, flow, makeObservable, observable } from 'mobx';

import dayjs from 'dayjs';
import RootStore from '@/stores/RootStore';
import ArticleModel, { IArticleData } from '@/models/ArticleModel';
import HomeRepository from '@/repositories/HomeRepository';

class HomeStore {
  rootStore: RootStore;

  isLoading = true;

  public articles: ArticleModel[] = [];

  public timeLine: { days: string[]; timeLine: {} } = { days: [], timeLine: {} };

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      isLoading: observable,
      articles: observable,
      timeLine: observable,
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
      this.timeLine = this.groupByDay(this.articles);
    } catch (e) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.error(e);
    }

    this.setIsLoading(false);
  }

  groupByDay(data: ArticleModel[]) {
    const timeLine = data.reduce((acc, cur) => {
      const history = acc;
      const day = cur.createdAt.split(' ')[0];

      if (!history[day]) {
        history[day] = [];
      }

      history[day] = history[day].concat(cur);

      return history;
    }, this.timeLine.timeLine);

    return {
      days: Object.keys(timeLine).sort((a, b) => (dayjs(b).isBefore(a, 'date') ? -1 : 1)),
      timeLine,
    };
  }
}

export default HomeStore;
