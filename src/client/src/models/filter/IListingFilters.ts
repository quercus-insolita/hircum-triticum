import { ListingsPriceFilter } from 'models/filter/enums/ListingsPriceFilterEnum';

export interface IListingFilters {
  priceFrom: string;
  sortOrder: string;
  sortOrders: ListingsPriceFilter[];
}
