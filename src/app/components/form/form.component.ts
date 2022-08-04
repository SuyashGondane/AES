import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import FormDataFormat from 'src/app/FormDataFormat';
import FormLabels from 'src/app/FormLabels';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() formData!: FormDataFormat;
  @Input() formLabels!: FormLabels;
  @Output() btnClickEmitter: EventEmitter<FormDataFormat> = new EventEmitter();
  fileContent: string = '';

  errorMessages = {
    inputTextError: '',
    secretKeyError: '',
  };

  constructor() {}

  ngOnInit(): void {}

  onBtnClick(): void {
    if (!this.isFormValid()) return;
    this.btnClickEmitter.emit(this.formData);
  }

  isFormValid(): boolean {
    if (this.formData.inputText === '') {
      this.errorMessages.inputTextError = "Plain text can't be empty.";
      return false;
    }
    this.errorMessages.inputTextError = '';

    if (
      this.formData.keySize === '128' &&
      this.formData.secretKey.length != 16
    ) {
      this.errorMessages.secretKeyError =
        'Length of secret key should be 16 for 128 bit key size.';
      return false;
    }

    if (
      this.formData.keySize === '192' &&
      this.formData.secretKey.length != 24
    ) {
      this.errorMessages.secretKeyError =
        'Length of secret key should be 24 for 192 bit key size.';
      return false;
    }

    if (
      this.formData.keySize === '256' &&
      this.formData.secretKey.length != 32
    ) {
      this.errorMessages.secretKeyError =
        'Length of secret key should be 32 for 256 bit key size.';
      return false;
    }

    this.errorMessages.secretKeyError = '';
    return true;
  }

  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    let fileReader = new FileReader();

    // This function is called after file is read.
    fileReader.onload = () => {
      if (fileReader.result === null) {
        alert('Something went wrong');
        return;
      }

      this.formData.inputText = fileReader.result?.toString() || '';
    };

    fileReader.readAsText(file);
  }
}
