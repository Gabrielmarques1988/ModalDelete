export class CreateUsuarioRequest {
  usuario_nome?: string;
  usuario_email?: string;
  usuario_cpf?: string;
  usuario_cnpj?: string;
  usuario_endereco?: string;
  usuario_status?: number;
  usuario_cargo?: string;
  empresa_id?: number;
  usuario_tipo?: number;
}
