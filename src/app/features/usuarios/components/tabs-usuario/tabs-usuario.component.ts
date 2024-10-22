import { Component } from '@angular/core';
import { PerfilUsuarioComponent } from '../perfil-usuario/perfil-usuario.component';
import { TabelaUsuariosComponent } from '../tabela-usuarios/tabela-usuarios.component';





@Component({
  selector: 'app-tabs-usuario',
  standalone: true,

  imports: [PerfilUsuarioComponent, TabelaUsuariosComponent],
  templateUrl: './tabs-usuario.component.html',
  styleUrl: './tabs-usuario.component.css'
})
export class TabsUsuarioComponent {




}
