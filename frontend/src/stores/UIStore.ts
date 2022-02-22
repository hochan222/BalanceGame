import { makeObservable } from 'mobx';
// import { makeObservable, observable, action } from 'mobx';

import RootStore from './RootStore';

class UIStore {
  rootStore: RootStore;

  //   isAlarmInputShow = false;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      //   isAlarmInputShow: observable,
      //   setIsAlarmInputShow: action,
    });
    this.rootStore = rootStore;
  }

  //   setIsAlarmInputShow(isAlarmInputShow: boolean) {
  //     this.isAlarmInputShow = isAlarmInputShow;
  //   }
}

export default UIStore;
