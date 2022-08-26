import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import FormDataFormat from 'src/app/FormDataFormat';
import FormLabels from 'src/app/FormLabels';
import { EncryptionService } from 'src/app/services/encryption-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aes',
  templateUrl: './aes.component.html',
  styleUrls: ['./aes.component.css'],
})
export class AesComponent implements OnInit {
  errorMessage: string = '';
  route: string = this.router.url;
  @Output() currentRoute: EventEmitter<string> = new EventEmitter();

  encryptionFormLabels: FormLabels = {
    header: 'Encryption',
    inputText: 'Enter text to be encrypted',
    inputTextPlaceholder: 'Enter plain text to be encrypted',
    outputTypeName: 'outputTextFormatE',
    radioLabelText: 'Output cipher text format: ',
    buttonText: 'Encrypt',
    outputText: 'AES encrypted output',
  };

  encryptionFormData: FormDataFormat = {
    inputText: '',
    cipherMode: 'CBC',
    keySize: '256',
    iv: sessionStorage.getItem('iv_E') || '',
    secretKey: sessionStorage.getItem('secretKey_E') || '',
    outputTextFormat: 'base64',
    outputText: '',
  };

  decryptionFormLabels: FormLabels = {
    header: 'Decryption',
    inputText: 'Enter text to be decrypted',
    inputTextPlaceholder: 'Enter cipher text to be decrypted',
    outputTypeName: 'outputTextFormatD',
    radioLabelText: 'Input cipher text format: ',
    buttonText: 'Decrypt',
    outputText: 'AES decrypted output',
  };

  decryptionFormData: FormDataFormat = {
    inputText: '',
    cipherMode: 'CBC',
    keySize: '256',
    iv: sessionStorage.getItem('iv_D') || '',
    secretKey: sessionStorage.getItem('secretKey_D') || '',
    outputTextFormat: 'base64',
    outputText: '',
  };

  constructor(
    private encryptionService: EncryptionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onEncryptionSubmit(data: FormDataFormat) {
    sessionStorage.setItem('iv_E', data.iv);
    sessionStorage.setItem('secretKey_E', data.secretKey);
    this.encryptionFormData.outputText = this.encryptionService.encrypt(data);
  }

  onDecryptionSubmit(data: FormDataFormat) {
    sessionStorage.setItem('iv_D', data.iv);
    sessionStorage.setItem('secretKey_D', data.secretKey);
    this.decryptionFormData.outputText = this.encryptionService.decrypt(data);
  }
}
