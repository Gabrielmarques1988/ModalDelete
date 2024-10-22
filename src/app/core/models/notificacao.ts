import { Usuario } from "./usuario";

export interface Notificacao {
  notificacao_id?: number;
  notificacao_titulo?: string;
  notificacao_descricao: string;
  notificacao_tipo?: number;
  notificacao_data?: string;
  notificacao_status?: number;
  usuario_id: number;
  usuario?: Usuario;
}
