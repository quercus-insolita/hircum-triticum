import React from 'react';
import { IconBaseProps } from 'react-icons';
import { FiGrid, FiList, FiShoppingCart } from 'react-icons/fi';

export const GridIcon = (props: IconBaseProps): React.ReactElement => <FiGrid {...props} />;

export const ListIcon = (props: IconBaseProps): React.ReactElement => <FiList {...props} />;

export const ShoppingCartIcon = (props: IconBaseProps): React.ReactElement => <FiShoppingCart {...props} />;
