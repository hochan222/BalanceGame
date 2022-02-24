import API from '@/utils/api';

class AriticleRepository {
  COMMENT_URL = process.env.ENV === 'local' ? '/comments' : '/v1/comments';

  // TODO : 추후 URL 변경 필요
  ARTICLE_URL = process.env.ENV === 'local' ? '/articles' : '/v1/articles'; 

  constructor(url: string) {
    this.COMMENT_URL = url || this.COMMENT_URL;
    this.ARTICLE_URL = url || this.ARTICLE_URL;
  }

  getComments() {
    return API.get(`${this.COMMENT_URL}`);
  }
  
  getArticle(articleId : number) {
    return API.get(`${this.ARTICLE_URL}/${articleId}`);
  }

  fetchVote(articleId : number, selectedVote : string) {
    return API.patch(`${this.ARTICLE_URL}/${articleId}/vote`,{
      selectedVote
    }, {
      headers: { 'content-type': 'application/json' },
    }, )
  }

  postComment(articleId : number, content: string) {
    return API.post(`${this.ARTICLE_URL}/${articleId}/comments`, {
      content,
      password: "1234",
    }, {
      headers: { 'content-type': 'application/json' },
    },)
  }
}

export default new AriticleRepository('');
