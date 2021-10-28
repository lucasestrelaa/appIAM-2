import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'enquete-semanal', loadChildren: './pages/enquete-semanal/enquete-semanal.module#EnqueteSemanalPageModule', canActivate: [AuthGuard] },
  { path: 'res-enquete', loadChildren: './pages/res-enquete/res-enquete.module#ResEnquetePageModule', canActivate: [AuthGuard] },
  { path: 'res-enquete/:id', loadChildren: './pages/res-enquete/res-enquete.module#ResEnquetePageModule', canActivate: [AuthGuard] },
  { path: 'res-finalizados', loadChildren: './pages/res-finalizados/res-finalizados.module#ResFinalizadosPageModule', canActivate: [AuthGuard] },
  { path: 'enquete-finalizada', loadChildren: './pages/enquete-finalizada/enquete-finalizada.module#EnqueteFinalizadaPageModule', canActivate: [AuthGuard] },
  { path: 'sorteio', loadChildren: './pages/sorteio/sorteio.module#SorteioPageModule', canActivate: [AuthGuard] },
  { path: 'res-sorteios', loadChildren: './pages/res-sorteios/res-sorteios.module#ResSorteiosPageModule', canActivate: [AuthGuard] },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule', canActivate: [AuthGuard] },
  { path: 'alertas', loadChildren: './pages/alertas/alertas.module#AlertasPageModule', canActivate: [AuthGuard] },
  { path: 'cenquete', loadChildren: './pages/cenquete/cenquete.module#CenquetePageModule', canActivate: [AuthGuard] },
  { path: 'denquetes', loadChildren: './pages/denquetes/denquetes.module#DenquetesPageModule', canActivate: [AuthGuard] },
  { path: 'denquetes/:id', loadChildren: './pages/denquetes/denquetes.module#DenquetesPageModule', canActivate: [AuthGuard] },
  { path: 'adm', loadChildren: './pages/adm/adm.module#AdmPageModule', canActivate: [AuthGuard] },
  { path: 'adm-ra/:id', loadChildren: './pages/adm-ra/adm-ra.module#AdmRAPageModule', canActivate: [AuthGuard] },
  { path: 'adm-ra', loadChildren: './pages/adm-ra/adm-ra.module#AdmRAPageModule', canActivate: [AuthGuard] },
  { path: 'adm-profissao', loadChildren: './pages/adm-profissao/adm-profissao.module#AdmProfissaoPageModule', canActivate: [AuthGuard] },
  { path: 'adm-profissao/:id', loadChildren: './pages/adm-profissao/adm-profissao.module#AdmProfissaoPageModule', canActivate: [AuthGuard] },
  { path: 'relatorios', loadChildren: './pages/relatorios/relatorios.module#RelatoriosPageModule', canActivate: [AuthGuard] },
  //{ path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule', canActivate: [AuthGuard] },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
