import { Injectable, signal, computed } from '@angular/core';
import { ApiClient } from '../api/api-client';
import { ClinicContextService } from '../clinic/clinic-context.service';

export interface MeResponse {
  userId: string | null;
  clinicId: string | null;
}

@Injectable({ providedIn: 'root' })
export class MeService {

  private readonly _userId = signal<string | null>(null);
  private readonly _clinicId = signal<string | null>(null);
  private readonly _loaded = signal(false);

  readonly userId = computed(() => this._userId());
  readonly clinicId = computed(() => this._clinicId());
  readonly loaded = computed(() => this._loaded());

  constructor(
    private api: ApiClient,
    private clinicContext: ClinicContextService
  ) {}

  bootstrap(): void {
    this.api.get<MeResponse>('/me')
      .subscribe(res => {
        this._userId.set(res.userId);
        this._clinicId.set(res.clinicId);

        if (res.clinicId) {
          this.clinicContext.setClinicId(res.clinicId);
        }

        this._loaded.set(true);
      });
  }
}
