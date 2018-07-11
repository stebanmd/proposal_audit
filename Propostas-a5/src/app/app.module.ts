import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID  } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from './auth/auth.service';
import { routes } from './app.routes';
import { TextMaskModule } from 'angular2-text-mask';
import { MaterializeModule } from 'angular2-materialize';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInjector } from './auth/auth.interceptor';
import { DataTablesModule } from 'angular-datatables';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

import { UsuarioService } from './services/usuario.service';
import { CategoriaService } from './services/categoria.service';
import { FornecedorService } from './services/fornecedor.service';
import { PropostaService } from './services/proposta.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriaComponent } from './components/categoria/categoria/categoria.component';
import { CategoriaFormComponent } from './components/categoria/categoria-form/categoria-form.component';
import { FornecedorComponent } from './components/fornecedor/fornecedor/fornecedor.component';
import { FornecedorFormComponent } from './components/fornecedor/fornecedor-form/fornecedor-form.component';
import { UsuarioComponent } from './components/usuario/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { PropostaComponent } from './components/proposta/proposta/proposta.component';
import { PropostaHistComponent } from './components/proposta/proposta-hist/proposta-hist.component';
import { PropostaFormComponent } from './components/proposta/proposta-form/proposta-form.component';
import { FilterPipe } from './helpers/filter';
import { ErrorSummaryComponent } from './components/error-summary/error-summary.component';
import { PropostaFiltroComponent } from './components/proposta/proposta-filtro/proposta-filtro.component';
import { PropostaResumoComponent } from './components/proposta/proposta-resumo/proposta-resumo.component';
import { MudarSenhaComponent } from './components/usuario/mudar-senha/mudar-senha.component';
import { ModalComponent } from './components/modal/modal.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    CategoriaComponent,
    CategoriaFormComponent,
    FornecedorComponent,
    FornecedorFormComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    PropostaComponent,
    PropostaHistComponent,
    PropostaFormComponent,
    FilterPipe,
    ErrorSummaryComponent,
    PropostaFiltroComponent,
    PropostaResumoComponent,
    MudarSenhaComponent,
    ModalComponent
  ],
  entryComponents: [ModalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    TextMaskModule,
    MaterializeModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,
    UsuarioService,
    CategoriaService,
    FornecedorService,
    PropostaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInjector,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: { 
        hasBackdrop: true,
        disableClose: true,
        width: '650px'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
