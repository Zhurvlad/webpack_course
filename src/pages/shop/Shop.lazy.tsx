import {lazy} from 'react';

// @ts-ignore
export const LazyShop = lazy(() => import('./Shop').then(({default : LazyShop}) => ({default: LazyShop})))

