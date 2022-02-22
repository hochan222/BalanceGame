import React from 'react';
import RootStore from '@/stores/RootStore';

const StoreContext = React.createContext<RootStore | undefined>(undefined);

export default StoreContext;
