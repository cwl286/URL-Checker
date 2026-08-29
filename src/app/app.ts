import { Component, signal, inject } from '@angular/core';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { UrlInfo } from './app.type';
import { Subject, debounceTime } from 'rxjs';

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
  protected urlInfo = signal<UrlInfo>({ exists: false, type: null });


  constructor() {
    this.urlChanges
      .pipe(
        debounceTime(2000)
      )
      .subscribe((url: string) => {
        this.doGetUrl(url);
      });
  }
  protected onUrlChange(value: string) {
    this.urlInput.set(value);

    var isValid = this.appService.validateUrl(value);
    this.validUrl.set(isValid);

    if (!isValid) {
      this.urlInfo.set({
        exists: false,
        type: null
      });
      return;
    }

    this.urlChanges.next(value);
  }

  private doGetUrl(url: string) {
    if (this.validUrl()) {
      this.getUrl(url).subscribe((urlInfo: UrlInfo) => {
        this.urlInfo.set(urlInfo);
      });

    } else {
      this.urlInfo.set({ exists: false, type: null });
    }
  }

  private getUrl(url: string) {
    return this.appService.mockServer(url);
  }
}
