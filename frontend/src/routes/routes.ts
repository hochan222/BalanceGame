import * as React from 'react';

import { lazy } from 'react';
import { paths } from '@/routes/paths';
import { ENTRY_PATHNAME } from '@/utils/urls';

interface IcomponentByLabel {
  [key: string]: React.LazyExoticComponent<() => React.ReactElement>;
}

const componentByLabel: IcomponentByLabel = {
  홈: lazy(() => import('@/pages/Home')),
  기사: lazy(() => import('@/pages/Article'))
};

export const routes = paths.map(({ label, path }) => ({
  label,
  path: `${ENTRY_PATHNAME}${path}`,
  component: componentByLabel[label],
}));

export default routes;