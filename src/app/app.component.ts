import { Component } from '@angular/core';
import FormDataFormat from './FormDataFormat';
import FormLabels from './FormLabels';
import { EncryptionService } from './services/encryption-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Aes256';
  errorMessage: string = '';

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
    iv: '',
    secretKey: '',
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
    iv: '',
    secretKey: '',
    outputTextFormat: 'base64',
    outputText: '',
  };

  constructor(private encryptionService: EncryptionService) {}

  onEncryptionSubmit(data: FormDataFormat) {
    this.encryptionFormData.outputText = this.encryptionService.encrypt(data);
  }

  onDecryptionSubmit(data: FormDataFormat) {
    this.decryptionFormData.outputText = this.encryptionService.decrypt(data);
  }
}
