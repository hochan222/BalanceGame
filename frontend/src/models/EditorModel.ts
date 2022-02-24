import { extendObservable, makeObservable } from 'mobx';
// import { action, extendObservable, makeObservable, observable } from 'mobx';
import HomeStore from '../stores/HomeStore';

export interface IEditorData {
  title: String;
  voteItem1: String;
  voteItem2: String;
  content: String;
  password: String;
  category: String[];
}

class EditorModel {
  store: HomeStore;

  title = '';

  voteItem1 = '';

  voteItem2 = '';

  content = '';

  password = '';

  category = [];


  constructor(store: HomeStore, data: IEditorData) {
    makeObservable(this, {
      // isHomeAppIconDragEnter: observable,
      // setIsHomeAppIconDragEnter: action.bound,
    });
    extendObservable(this, data);
    this.store = store;
  }
}

export default EditorModel;
