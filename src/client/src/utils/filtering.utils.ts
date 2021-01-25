import { IListingFilters, ListingsPriceFilter } from 'models/filter';
import { IProduct } from 'models/product';

export const filterProductListings = (
  listings: IProduct[],
  { priceFrom, sortOrder }: IListingFilters
): IProduct[] => {
  let result = listings;

  if (priceFrom) {
    result = result.filter(item => item.price >= Number(priceFrom));
  }

  if (sortOrder) {
    if (sortOrder === ListingsPriceFilter.PRICE_HIGH_TO_LOW) {
      result = result.sort((a, b) => b.price - a.price);
    }
    if (sortOrder === ListingsPriceFilter.PRICE_LOW_TO_HIGH) {
      result = result.sort((a, b) => a.price - b.price);
    }
  }
  return result;
};
