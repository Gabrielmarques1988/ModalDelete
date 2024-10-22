import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Usuario } from "../../../../core/models/usuario";
import { UsuarioService } from "../../../../shared/services/usuario.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit, OnDestroy {

  usuario: Usuario | null = null;
  private destroy$: Subject<void> = new Subject();  // Para controle do ciclo de vida da subscrição

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Subscrição ao Observable de Autor, usando takeUntil para limpar subscrição quando o componente for destruído
    this.usuarioService.autor$
      .pipe(takeUntil(this.destroy$))
      .subscribe(usuarioRecebido => {
        this.usuario = usuarioRecebido;
      });
  }

  // Método para deletar o usuário
  deletarUsuario(): void {
    if (this.usuario?.usuario_id) {
      this.usuarioService.deletarUsuario(this.usuario.usuario_id)
        .pipe(takeUntil(this.destroy$))  // Certificando-se de que o Observable será limpo
        .subscribe(response => {
          console.log("Usuário deletado:", response);
        }, error => {
          console.error("Erro ao deletar o usuário:", error);
        });
    }
  }

  // Método para editar o usuário (pode ajustar conforme necessário)
  editarUsuario(): void {
    if (this.usuario?.usuario_id) {
      // Implementar a lógica de edição aqui
      console.log("Editar usuário:", this.usuario);
      // Exemplo: pode chamar o serviço de edição e usar pipe/takeUntil similar ao deletarUsuario
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

/*import { Subscription } from "rxjs";


  editarUsuario() {
    if (this.usuario?.usuario_id){
      this.usuarioService.deletarUsuario(this.usuario?.usuario_id).subscribe(
        response => (console.log(response))
      )
    }
  }

  }


function Component(arg0: { selector: string; standalone: boolean; imports: never[]; templateUrl: string; styleUrl: string; }): (target: typeof PerfilUsuarioComponent) => void | typeof PerfilUsuarioComponent {
    throw new Error("Function not implemented.");
}*/