import API from '@/utils/api';
import { SPINNER_API_WAITING_TIME } from '@/utils/constants';
import { wait } from '@/utils/utils';

class HomeRepository {
  URL = process.env.ENV === 'local' ? '/articles' : '/v1/articles';

  constructor(url: string) {
    this.URL = url || this.URL;
  }

  async getArticle(query: string) {
    return Promise.all([API.get(`${this.URL}?${query}`), wait(SPINNER_API_WAITING_TIME)]);
  }

  getArticleTest(query: string) {
    return API.get(`${this.URL}?${query}`);
  }
}

export default new HomeRepository('');
