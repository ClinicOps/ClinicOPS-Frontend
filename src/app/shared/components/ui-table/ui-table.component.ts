import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-table',
  standalone: true,
  template: `
    <table>
      <thead>
        <tr>
          <th *ngFor="let col of columns">{{ col.label }}</th>
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
  `,
  styles: [`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 8px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 13px;
    }
    th {
      text-align: left;
      font-weight: 600;
    }
  `]
})
export class UiTableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: { key: string; label: string }[] = [];

  trackByFn = (_: number, item: any) => item.id ?? item;
}
