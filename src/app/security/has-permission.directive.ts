import { Directive, Input, TemplateRef, ViewContainerRef, OnInit} from '@angular/core';
import { PermissionService } from './permission.service';
import { Permission } from './permission.enum';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit {

  @Input('hasPermission') permission!: Permission | Permission[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    const permissions = Array.isArray(this.permission)
      ? this.permission
      : [this.permission];

    const allowed = permissions.every(p =>
      this.permissionService.has(p)
    );

    this.viewContainer.clear();

    if (allowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
