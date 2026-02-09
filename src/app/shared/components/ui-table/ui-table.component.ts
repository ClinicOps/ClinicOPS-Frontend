import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TrackByFunction
} from '@angular/core';
import { NgFor } from '@angular/common';
import { TableColumn } from '../../ui-contracts/table-column.model';


@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table>
      <thead>
        <tr>
          <th *ngFor="let col of columns">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data; trackBy: trackByFn">
          <td *ngFor="let col of columns">
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class UiTableComponent<T extends Record<string, any>> {

  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];

  trackByFn: TrackByFunction<T> = (_: number, item: T) =>
  (item as any)?.id ?? item;
}
