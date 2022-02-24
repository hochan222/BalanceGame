import { action, makeObservable, observable } from 'mobx';

import HomeStore from '@/stores/HomeStore';
import UIStore from '@/stores/UIStore';
import SearchResultStore from './SearchResultStore';
import AriticleStore from './ArticleStore';
import EditStore from './EditStore';

class RootStore {
  homeStore: HomeStore;

  searchResultStore: SearchResultStore;

  articleStore: AriticleStore;

  uiStore: UIStore;

  editStore: EditStore;

  isLoading = true;

  constructor() {
    this.homeStore = new HomeStore(this);
    this.uiStore = new UIStore(this);
    this.searchResultStore = new SearchResultStore(this);
    // 등록
    this.articleStore = new AriticleStore(this);

    this.editStore = new EditStore(this);
    
    makeObservable(this, {
      isLoading: observable,
      setIsLoading: action,
    });
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}

export default RootStore;
