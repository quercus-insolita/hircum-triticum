import React, { useCallback, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import map from 'lodash/map';

import ViewButtonGroup from 'components/ListingsFilters/components/ViewButtonGroup';

import { pluralizeString } from 'utils/pluralizeString.util';
import { IBindingCallback1 } from 'models/callback';
import { IListingFilters, ListingsPriceFilter } from 'models/filter';
import { ViewType } from 'models/view';

import styles from 'components/ListingsFilters/styles.module.scss';

interface IListingFilter {
  totalItems: number;
  updateFilter: IBindingCallback1<IListingFilters>;
  viewType: ViewType;
  updateViewType: IBindingCallback1<ViewType>;
}

const initialState = {
  priceFrom: '',
  sortOrder: '',
  sortOrders: [ListingsPriceFilter.PRICE_LOW_TO_HIGH, ListingsPriceFilter.PRICE_HIGH_TO_LOW]
};

const ListingsFilters: React.FC<IListingFilter> = ({
  totalItems,
  updateFilter,
  viewType,
  updateViewType
}): React.ReactElement => {
  const [filters, setFilters] = useState<IListingFilters>(initialState);

  const handleChange = useCallback(
    (prop: string, value: string): void => {
      setFilters(prevState => ({
        ...prevState,
        [prop]: value
      }));
    },
    [setFilters]
  );

  const handleSubmit = event => {
    event.preventDefault();
  };

  useEffect(() => {
    updateFilter(filters);
  }, [updateFilter, filters]);

  return (
    <div className={styles.container}>
      <div>
        <Form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formGroupContainer}>
            <p className={styles.formTotalItems}>{pluralizeString(totalItems, 'предмет', 'ів')}</p>
          </div>
          <Form.Group className={styles.formGroupContainer}>
            <Form.Label className={styles.formGroupLabel}>Ціна</Form.Label>
            <Form.Control
              type="number"
              value={filters.priceFrom}
              className={styles.formGroupControl}
              onChange={event => handleChange('priceFrom', event.target.value)}
            />
          </Form.Group>

          <Form.Group className={styles.formGroupContainer}>
            <Form.Label className={styles.formGroupLabel}>Cортування</Form.Label>
            <Form.Control
              as="select"
              value={filters.sortOrder}
              className={styles.formGroupControl}
              onChange={event => handleChange('sortOrder', event.target.value)}
            >
              <option value="">Обрати...</option>
              {map(filters.sortOrders, order => (
                <option value={order} key={order}>
                  {order}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>

      <ViewButtonGroup viewType={viewType} updateViewType={updateViewType} />
    </div>
  );
};

export default ListingsFilters;
