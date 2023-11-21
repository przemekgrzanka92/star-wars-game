import { HttpErrorResponse } from '@angular/common/http';

export type LoadingState = 'INIT' | 'LOADING' | 'LOADED';

export type CallState = LoadingState | HttpErrorResponse;
