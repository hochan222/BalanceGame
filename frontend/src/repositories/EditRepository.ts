import API from '@/utils/api';

class EditRepository {
  URL = process.env.ENV === 'local' ? '/articles' : '/v1/articles';

  constructor(url: string) {
    this.URL = url || this.URL;
  }

  async postArticle(data: any) {
    return API.post(this.URL, {
      leftItem : data.voteItem1,
      rightItem: data.voteItem2,
      articleCategoryName: data.category,
      title: data.title,
      content: data.content,
      password: data.password
    }, {
      headers: { 'content-type': 'application/json' },
    });
  }
}

export default new EditRepository('');
