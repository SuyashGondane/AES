import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DownloadService } from 'src/app/services/download.service';
import { Router } from '@angular/router';
import { CopyTextService } from 'src/app/services/copy-text.service';

@Component({
  selector: 'app-text-converter',
  templateUrl: './text-converter.component.html',
  styleUrls: ['./text-converter.component.css'],
})
export class TextConverterComponent implements OnInit {
  data = {
    inputText: sessionStorage.getItem('textConvInput') || '',
    outputText: sessionStorage.getItem('textConvOutput') || '',
    textToFind: '',
    textToReplace: '',
  };

  tooltipVisible: boolean = false;
  wordCount: number = 0;
  charsCount: number = 0;
  route: string = this.router.url;
  @Output() currentRoute: EventEmitter<string> = new EventEmitter();

  constructor(
    private downloadService: DownloadService,
    private router: Router,
    private copyTextService: CopyTextService
  ) {}

  ngOnInit(): void {}

  onInputChange(): void {
    sessionStorage.setItem('textConvInput', this.data.inputText);
    this.charsCount = this.data.inputText.length;
    this.wordCount =
      this.data.inputText == '' ? 0 : this.data.inputText.split(' ').length;
  }

  clearInput(): void {
    sessionStorage.setItem('textConvInput', '');
    this.data.inputText = '';
  }

  copyText(): void {
    this.copyTextService.copyTextToClipboard(this.data.outputText);
    this.tooltipVisible = true;
    setTimeout(() => {
      this.tooltipVisible = false;
    }, 2000);
  }

  onBtnClick(): void {
    this.data.outputText = this.data.inputText
      .split(this.data.textToFind)
      .join(this.data.textToReplace);

    sessionStorage.setItem('textConvOutput', this.data.outputText);
  }

  onDownloadClick(): void {
    this.downloadService.downloadFile('output.txt', this.data.outputText);
  }
}
