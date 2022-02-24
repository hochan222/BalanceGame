import { action, flow, makeObservable, observable } from 'mobx';
import { EditFormInput } from '@/components/EditModal/EditModal';
import RootStore from './RootStore';
import EditRepository from '@/repositories/EditRepository';

class EditStore {
  rootStore: RootStore;


  categories = ['전체 검색', '백엔드', '프론트엔드', '데이터분석', 'AI', 'Job담'];

  editForm: EditFormInput = {
    title: "",
    voteItem1: "",
    voteItem2: "",
    content: "",
    password: "",
    category: ""
  }

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      editForm: observable,
      setEditForm: action.bound,
      postArticle: flow.bound,
    });
    this.rootStore = rootStore;
  }

  setEditForm(data: EditFormInput) {
    this.editForm = data;
  }

  // eslint-disable-next-line class-methods-use-this
  *postArticle(formData: any) {
    try {
      const { data } = yield EditRepository.postArticle(formData);
      console.log(data);
    } catch(e){
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }


}

export default EditStore;
