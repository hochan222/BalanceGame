import { action, makeObservable, observable } from 'mobx';
import HomeStore from '@/stores/HomeStore';
import UIStore from '@/stores/UIStore';

class RootStore {
  homeStore: HomeStore;

  uiStore: UIStore;

  isLoading = true;

  constructor() {
    this.homeStore = new HomeStore(this);
    this.uiStore = new UIStore(this);

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
