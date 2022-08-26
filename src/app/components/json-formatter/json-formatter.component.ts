import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DownloadService } from 'src/app/services/download.service';
import { Router } from '@angular/router';
import { CopyTextService } from 'src/app/services/copy-text.service';

@Component({
  selector: 'app-json-formatter',
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.css'],
})
export class JsonFormatterComponent implements OnInit {
  tooltipVisible: boolean = false;
  errorText: string = '';
  data = {
    inputText: sessionStorage.getItem('jsonFormatInput') || '',
    outputText: sessionStorage.getItem('jsonFormatOutput') || '',
  };
  route: string = this.router.url;
  @Output() currentRoute: EventEmitter<string> = new EventEmitter();

  constructor(
    private downloadService: DownloadService,
    private router: Router,
    private copyTextService: CopyTextService
  ) {}

  ngOnInit(): void {}

  copyText(): void {
    this.copyTextService.copyTextToClipboard(this.data.outputText);
    this.tooltipVisible = true;
    setTimeout(() => {
      this.tooltipVisible = false;
    }, 2000);
  }

  onDownloadClick(): void {
    this.downloadService.downloadFile('output.txt', this.data.outputText);
  }

  formatJson(): void {
    this.errorText = '';
    try {
      this.data.outputText = JSON.stringify(
        JSON.parse(this.data.inputText),
        null,
        '    '
      );
      sessionStorage.setItem('jsonFormatInput', this.data.inputText);
      sessionStorage.setItem('jsonFormatOutput', this.data.outputText);
    } catch (e: any) {
      this.errorText = e.toString();
    }
  }
}
