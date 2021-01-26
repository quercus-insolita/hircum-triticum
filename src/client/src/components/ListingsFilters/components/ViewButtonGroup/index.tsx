import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import { GridIcon, ListIcon } from 'components/icons';

import { IBindingCallback1 } from 'models/callback';
import { ViewType } from 'models/view';

import styles from 'components/ListingsFilters/components/ViewButtonGroup/styles.module.scss';

interface IViewButtonGroupProps {
  viewType: ViewType;
  updateViewType: IBindingCallback1<ViewType>;
}

const ViewButtonGroup: React.FC<IViewButtonGroupProps> = ({
  viewType,
  updateViewType
}): React.ReactElement => {
  return (
    <ButtonGroup aria-label="View Types">
      <Button
        variant="transparent"
        aria-label="Grid View Type"
        value={ViewType.GridView}
        onClick={() => updateViewType(ViewType.GridView)}
        className={styles.button}
      >
        <GridIcon
          size={20}
          className={`${styles.buttonIcon} ${viewType === ViewType.GridView && styles.active}`}
        />
      </Button>
      <Button
        variant="transparent"
        aria-label="List View Type"
        value={ViewType.ListView}
        onClick={() => updateViewType(ViewType.ListView)}
        className={styles.button}
      >
        <ListIcon
          size={21}
          className={`${styles.buttonIcon} ${viewType === ViewType.ListView && styles.active}`}
        />
      </Button>
    </ButtonGroup>
  );
};

export default ViewButtonGroup;
