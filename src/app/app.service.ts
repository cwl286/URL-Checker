import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { UrlInfo } from './app.type';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  static http = "http:";
  static https = "https:";

  private httpClient = inject(HttpClient);

  validateUrl(value: string): boolean {
    try {
      const url = new URL(value);

      return url.protocol === AppService.http ||
             url.protocol === AppService.https;

    } catch {
      return false;
    }
  }

  /**
   * Mocks a server response for the given URL.
   * @param url The URL to mock.
   * @returns An observable emitting the mocked URL info.
   */
  mockServer(url: string): Observable<UrlInfo> {

    url = url.toLowerCase();
    if (url.indexOf('file') !== -1) {
      return of({ exists: true, type: 'file' } as UrlInfo);
    } else if (url.indexOf('folder') !== -1) {
      return of({ exists: true, type: 'folder' } as UrlInfo);
    } else {
      return of({ exists: false, type: null } as UrlInfo);
    }
  }

  getUrl(url: string): Observable<UrlInfo> {
    return this.httpClient.get<UrlInfo>(url).pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Status:', error.status);
          return of({
            exists: false,
            type: null
          } as UrlInfo);
        })
      );
  }
}
