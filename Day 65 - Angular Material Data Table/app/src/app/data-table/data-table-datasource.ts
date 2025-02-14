import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  name: string;
  id: number;
  amount: number;
}

function randomNumber(max: number, min: number): number {
  let randomField: number = min + max;
  return Math.ceil(Math.random() * randomField) + min;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  { id: 1, name: 'Hydrogen', amount: randomNumber(30, 0) },
  { id: 2, name: 'Helium', amount: randomNumber(30, 0) },
  { id: 3, name: 'Lithium', amount: randomNumber(30, 0) },
  { id: 4, name: 'Beryllium', amount: randomNumber(30, 0) },
  { id: 5, name: 'Boron', amount: randomNumber(30, 0) },
  { id: 6, name: 'Carbon', amount: randomNumber(30, 0) },
  { id: 7, name: 'Nitrogen', amount: randomNumber(30, 0) },
  { id: 8, name: 'Oxygen', amount: randomNumber(30, 0) },
  { id: 9, name: 'Fluorine', amount: randomNumber(30, 0) },
  { id: 10, name: 'Neon', amount: randomNumber(30, 0) },
  { id: 11, name: 'Sodium', amount: randomNumber(30, 0) },
  { id: 12, name: 'Magnesium', amount: randomNumber(30, 0) },
  { id: 13, name: 'Aluminum', amount: randomNumber(30, 0) },
  { id: 14, name: 'Silicon', amount: randomNumber(30, 0) },
  { id: 15, name: 'Phosphorus', amount: randomNumber(30, 0) },
  { id: 16, name: 'Sulfur', amount: randomNumber(30, 0) },
  { id: 17, name: 'Chlorine', amount: randomNumber(30, 0) },
  { id: 18, name: 'Argon', amount: randomNumber(30, 0) },
  { id: 19, name: 'Potassium', amount: randomNumber(30, 0) },
  { id: 20, name: 'Calcium', amount: randomNumber(30, 0) },
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'amount':
          return compare(+a.amount, +b.amount, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
