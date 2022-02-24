import { action, flow, makeObservable, observable } from 'mobx';
import dayjs from 'dayjs';

import ArticleModel from '@/models/ArticleModel';
import SearchResultRepository from '@/repositories/SearchResultRepository';

import RootStore from './RootStore';

class SearchResultStore {
  rootStore: RootStore;

  isLoading = true;

  public searchKeyword = '';

  public articles: ArticleModel[] = [];

  public timeLine: { days: string[]; timeLine: {} } = { days: [], timeLine: {} };

  private categoryMatch = {
    '백엔드': 'BackEnd',
    '프론트엔드': 'FrontEnd',
    '데이터분석': 'DataAnaylsis',
    'AI': 'AI',
    'Job담':'Job담',
    '전체 검색' : ''
  }

  public lastOffset: number = 6;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      isLoading: observable,
      articles: observable,
      timeLine: observable,
      searchKeyword: observable,
      lastOffset: observable,
      fetchArticles: flow,
      setIsLoading: action,
      setArticles: action,
      setSearchKeyword: action.bound,
      setLastOffset: action.bound,
      setTimeLines: action.bound,
    });
    this.rootStore = rootStore;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setArticles(articles: any[]) {
    this.articles = articles.map((article: any) => new ArticleModel(this, article));
  }

  setSearchKeyword(searchKeyword: string) {
    this.searchKeyword = searchKeyword;
  }


  setTimeLines(articles: any[]) {
    this.timeLine = this.groupByDay(articles.map((article: any) => new ArticleModel(this, article)));
  }

  setLastOffset(lastOffset: number) {
    this.lastOffset = lastOffset;
  }
  
  async fetchArticles({ keyword, category }: { keyword: string; category: string }) {
    this.setIsLoading(true);
    this.reset({ keyword, category });

    const categoryResult = this.categoryMatch[category];

    try {
      const response = await SearchResultRepository.getArticle(
        `search=${this.searchKeyword}&category=${categoryResult}`,
      );
      console.log('aa', response)
      this.setArticles(response[0].data.data);
      this.timeLine = this.groupByDay(this.articles);
    } catch (e) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.error(e);
    }

    this.setIsLoading(false);
  }

  reset({ keyword, category }: { keyword: string; category: string }) {
    this.timeLine = { days: [], timeLine: {} };
    this.searchKeyword = keyword;
    this.rootStore.uiStore.setSelectedCategory(category);
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

export default SearchResultStore;
