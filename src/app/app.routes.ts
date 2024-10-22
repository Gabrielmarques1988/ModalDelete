import { TabelaListaCompartilhadaComponent } from './features/lista-compartilhada/components/tabela-lista-compartilhada/tabela-lista-compartilhada.component';
import { EtapasComponent } from './features/etapas/components/etapas/etapas.component';
import { Routes } from '@angular/router';
import { emailGuard } from './core/guards/email.guard';
import { tokenGuard } from './core/guards/token.guard';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { ProjetoComponent } from './features/projeto/components/projeto/projeto.component';
ProjetoComponent

export const routes: Routes = [
  {
    path: 'loginemail',
    loadComponent:() => import('./features/login/components/loginemail/loginemail.component').then(mod => mod.LoginemailComponent),
    canActivate: [emailGuard]
  },
  {
    path: 'logintoken',
    loadComponent:() => import('./features/login/components/logintoken/logintoken.component').then(mod => mod.LogintokenComponent),
    canActivate: [tokenGuard]
  },


  {
    path: '',
    loadComponent:() => import('./features/home/components/home/home.component').then(mod => mod.HomeComponent),
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'empresa',
        loadComponent:() => import('./features/empresa/components/empresa/empresa.component').then(mod => mod.EmpresaComponent),
        canActivate: [AuthGuardService],
        data: {breadcrumb : 'Empresa'}
      },
      {
        path: 'projeto',
        loadComponent:() => import('./features/projeto/components/projeto/projeto.component').then(mod => mod.ProjetoComponent),
        canActivate: [AuthGuardService],
        data: {breadcrumb : 'Projeto'}
      },
      {
        path: 'projeto-usuario',
        loadComponent:() => import('./features/projeto-usuario/components/projeto-usuario/projeto-usuario.component').then(mod => mod.ProjetoUsuarioComponent),
        canActivate: [AuthGuardService],
        data: {breadcrumb :{alias:'Projeto-usuario'}}
      },
      {
        path: 'disciplina',
        loadComponent:() => import('./features/disciplina/components/disciplina/disciplina.component').then(mod => mod.DisciplinaComponent),
        canActivate: [AuthGuardService],
        data: {breadcrumb :{alias:'Disciplina'}}
      },
      {
        path: 'listaCompartilhada',
        loadComponent:() => import('./features/lista-compartilhada/components/tabela-lista-compartilhada/tabela-lista-compartilhada.component').then(mod => mod.TabelaListaCompartilhadaComponent),
        canActivate: [AuthGuardService],
        data: {breadcrumb : 'Lista Compartilhada'}
      },
      {
        path: 'etapa',
        loadComponent:() => import('./features/etapas/components/etapas/etapas.component').then(mod => mod.EtapasComponent),
        canActivate: [AuthGuardService],
        data: {breadcrumb : 'Etapa'}
      },
      {
        path: 'relatorio-admin',
        loadComponent:() => import('./features/relatorio/relatorio-admin/relatorio-admin.component').then(mod => mod.RelatorioAdminComponent),
        canActivate: [AuthGuardService],
        data: {breadcrumb : 'Relatorio-Admin'}
      },

      {
        path: 'dashboard',
        loadComponent:() => import('./features/relatorio/relatorio-superadmin/relatorio-superadmin.component').then(mod => mod.RelatorioSuperadminComponent),
        canActivate: [AuthGuardService],
        data: {breadcrumb : 'Dashboard'}
      },
      {
        path: 'graficodash',
        loadComponent:() => import('./shared/components/graficodash/graficodash.component').then(mod => mod.GraficodashComponent),
        canActivate: [AuthGuardService],
        data: {breadcrumb : 'GraficoDash'}
      },
      {
        path: 'arquivo',
        loadComponent:() => import('./features/arquivo/components/arquivo/arquivo.component').then(mod => mod.ArquivoComponent),
        canActivate: [AuthGuardService],
        data: {breadcrumb : 'Arquivo'}
      },

      {
        path: 'usuarios',
        loadComponent:() => import('./features/usuarios/components/usuarios/usuario.component').then(mod => mod.GerenciamentoUsuarioComponent),
        canActivate: [AuthGuardService],
        data: {breadcrumb : 'Usuários'}
      },
      
    ]

  }
];
