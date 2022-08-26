import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AesComponent } from './components/aes/aes.component';
import { JsonFormatterComponent } from './components/json-formatter/json-formatter.component';
import { TextConverterComponent } from './components/text-converter/text-converter.component';

const routes: Routes = [
  { path: '', component: AesComponent },
  { path: 'aes', component: AesComponent },
  { path: 'text-converter', component: TextConverterComponent },
  { path: 'json-formatter', component: JsonFormatterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
