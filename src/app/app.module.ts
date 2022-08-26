import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { AesComponent } from './components/aes/aes.component';
import { TextConverterComponent } from './components/text-converter/text-converter.component';
import { JsonFormatterComponent } from './components/json-formatter/json-formatter.component';

@NgModule({
  declarations: [AppComponent, FormComponent, AesComponent, TextConverterComponent, JsonFormatterComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
