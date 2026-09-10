import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { UrlInfo } from './app.type';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  static http = "http:";
  static https = "https:";

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
    let result = { exists: false, type: null } as UrlInfo;
    const responseDelayMs = this.randomIntFromInterval(300, 1500);
    url = url.toLowerCase();

    if (url.indexOf('file') !== -1) {
      result = { exists: true, type: 'File' } as UrlInfo;
    } else if (url.indexOf('folder') !== -1) {
      result = { exists: true, type: 'Folder' } as UrlInfo;
    }
    return of(result).pipe(delay(responseDelayMs));
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
