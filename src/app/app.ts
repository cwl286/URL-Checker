import { Component, signal, inject } from '@angular/core';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { UrlInfo } from './app.type';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private appService = inject(AppService);

  private urlChanges = new Subject<string>();

  protected urlInput = signal('');
  protected validUrl = signal(false);
  protected checking = signal(false);
  protected urlInfo = signal<UrlInfo>({ exists: false, type: null });


  constructor() {
    this.urlChanges
      .pipe(
        debounceTime(750) // 750ms delay to avoid excessive server calls
      )
      .subscribe((url: string) => {
        this.doGetUrl(url);
      });
  }
  protected onUrlChange(value: string) {
    this.urlInput.set(value);
    this.urlInfo.set({ exists: false, type: null });

    const isValid = this.appService.validateUrl(value);
    this.validUrl.set(isValid);
    this.checking.set(isValid);

    this.urlChanges.next(value);
  }

  private doGetUrl(url: string) {
    if (url !== this.urlInput() || !this.validUrl()) {
      return;
    }

    this.getUrl(url).subscribe((urlInfo: UrlInfo) => {
      if (url === this.urlInput()) {
        this.urlInfo.set(urlInfo);
        this.checking.set(false);
      }
    });
  }

  private getUrl(url: string) {
    return this.appService.mockServer(url);
  }
}
