import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = false;
  constructor() {
  }
  isLoading(): boolean {
    return this.loading;
  }
}
