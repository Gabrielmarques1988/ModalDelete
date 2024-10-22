import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { Usuario } from '../../../../core/models/usuario';
import { TabsUsuarioComponent } from '../tabs-usuario/tabs-usuario.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tabela-usuarios',
  templateUrl: './tabela-usuarios.component.html',
  styleUrls: ['./tabela-usuarios.component.css'],
  standalone: true,
  imports: [TabsUsuarioComponent, CommonModule]
})
export class TabelaUsuariosComponent implements OnInit {

  listaUsuarios: Usuario[] = [];
  private destroy$: Subject<void> = new Subject(); // Para controle do ciclo de vida de subscrições

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuariosAdminEmpresa(4);
  }

  getUsuariosAdminEmpresa(idEmpresa: number): void {
    this.usuarioService.getUsuariosPorEmpresaId(idEmpresa)
      .pipe(takeUntil(this.destroy$)) // Cancela a subscrição quando o componente é destruído
      .subscribe({
        next: (response) => {
          if (response) {
            this.listaUsuarios = response;
          }
        },
        error: (error) => console.log(error),
      });
  }

  detalharUsuario(usuario: Usuario) {
    console.log("setando o usuário ", usuario);
    this.usuarioService.setAutor(usuario);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
