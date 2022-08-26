import { Component, OnInit } from '@angular/core';
import FormDataFormat from './FormDataFormat';
import FormLabels from './FormLabels';
import { EncryptionService } from './services/encryption-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Aes256';
  currentRoute: string = 'aes';

  constructor(private router: Router) {}

  onRouteChange(currentRoute: string): void {
    this.currentRoute = currentRoute;
  }
}
