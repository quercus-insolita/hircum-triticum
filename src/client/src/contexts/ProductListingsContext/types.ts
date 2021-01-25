import { IProduct } from 'models/product';
import { IBindingCallback1 } from 'models/callback';
import { IListingFilters } from 'models/filter';

export interface ProductListingsContextData {
  data: IProduct[];
  filteredData: IProduct[];
  updateFilter: IBindingCallback1<IListingFilters>;
}
