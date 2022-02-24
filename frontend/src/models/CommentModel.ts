import { extendObservable, makeObservable } from 'mobx';
import AriticleStore from '@/stores/ArticleStore';
// import { action, extendObservable, makeObservable, observable } from 'mobx';
export interface ICommentData {
  id: number;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

class CommentModel {
  store: AriticleStore;

  id = 0;

  content = '';

  createdAt = '';

  modifiedAt = '';

  constructor(store: AriticleStore, data: ICommentData) {
    makeObservable(this, {
      // isHomeAppIconDragEnter: observable,
      // setIsHomeAppIconDragEnter: action.bound,
    });
    extendObservable(this, data);
    this.store = store;
  }
}

export default CommentModel;
