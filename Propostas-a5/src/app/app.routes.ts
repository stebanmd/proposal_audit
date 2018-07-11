import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriaComponent } from './components/categoria/categoria/categoria.component';
import { CategoriaFormComponent } from './components/categoria/categoria-form/categoria-form.component';
import { FornecedorComponent } from './components/fornecedor/fornecedor/fornecedor.component';
import { FornecedorFormComponent } from './components/fornecedor/fornecedor-form/fornecedor-form.component';
import { UsuarioComponent } from './components/usuario/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { PropostaComponent } from './components/proposta/proposta/proposta.component';
import { PropostaHistComponent } from './components/proposta/proposta-hist/proposta-hist.component';
import { PropostaFormComponent } from './components/proposta/proposta-form/proposta-form.component';
import { MudarSenhaComponent } from './components/usuario/mudar-senha/mudar-senha.component';


export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuard] },
    { path: 'categoria/edit/:id', component: CategoriaFormComponent, canActivate: [AuthGuard] },
    { path: 'fornecedor', component: FornecedorComponent, canActivate: [AuthGuard] },
    { path: 'fornecedor/edit/:id', component: FornecedorFormComponent, canActivate: [AuthGuard] },
    { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
    { path: 'usuario/edit/:id', component: UsuarioFormComponent, canActivate: [AuthGuard] },
    { path: 'usuario/mudar-senha/:id', component: MudarSenhaComponent, canActivate: [AuthGuard] },
    { path: 'proposta', component: PropostaComponent, canActivate: [AuthGuard] },
    { path: 'proposta/hist/:id', component: PropostaHistComponent, canActivate: [AuthGuard] },
    { path: 'proposta/edit/:id', component: PropostaFormComponent, canActivate: [AuthGuard] }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);