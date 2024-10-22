import { Usuario } from "./usuario"

export interface Logs {
  UsuarioId: Usuario;
  ObjetoId?: string;
  ObjetoTipo?: string;
  TipoAcaoUsuario?: string;
  Descricao?: string;
  Data?: string;
}
