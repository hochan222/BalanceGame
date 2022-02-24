import API from '@/utils/api';

class HomeRepository {
  URL = process.env.ENV === 'local' ? '/articles' : '/v1/articles';

  constructor(url: string) {
    this.URL = url || this.URL;
  }

  getArticle(param: string) {
    return API.get(`${this.URL}?${param}`);
  }
}

export default new HomeRepository('');
