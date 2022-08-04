import { Injectable } from '@angular/core';
import FormDataFormat from '../FormDataFormat';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  constructor() {}

  encrypt(data: FormDataFormat): string {
    const key = CryptoJS.enc.Utf8.parse(data.secretKey);

    const encrypted = CryptoJS.AES.encrypt(data.inputText, key, {
      iv: this.getIV(data.iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: this.getCipherMode(data.cipherMode),
    });

    if (data.outputTextFormat === 'hex')
      return CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  }

  decrypt(data: FormDataFormat): string {
    const key = CryptoJS.enc.Utf8.parse(data.secretKey);

    if (data.outputTextFormat === 'hex') {
      data.inputText = this.hexToBase64(data.inputText);
    }

    const decrypted = CryptoJS.AES.decrypt(data.inputText, key, {
      iv: this.getIV(data.iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: this.getCipherMode(data.cipherMode),
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  getCipherMode(cipherMode: string): any {
    if (cipherMode === 'ECB') return CryptoJS.mode.ECB;

    return CryptoJS.mode.CBC;
  }

  getIV(iv: string): any {
    if (iv === '') iv = '1234567898765432';

    return CryptoJS.enc.Utf8.parse(iv);
  }

  hexToBase64(hexString: string): string {
    return btoa(
      hexString
        .match(/\w{2}/g)
        ?.map((ch) => {
          return String.fromCharCode(parseInt(ch, 16));
        })
        .join('') || ''
    );
  }
}
