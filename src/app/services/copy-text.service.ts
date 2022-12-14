import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CopyTextService {
  constructor() {}

  fallbackCopyTextToClipboard(text: string): void {
    var textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      // console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      // console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }
  copyTextToClipboard(text: string): void {
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        // console.log('Async: Copying to clipboard was successful!');
      },
      function (err) {
        // console.error('Async: Could not copy text: ', err);
      }
    );
  }
}
