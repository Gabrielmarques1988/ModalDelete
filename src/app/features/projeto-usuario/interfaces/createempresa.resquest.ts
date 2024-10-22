export interface CreateProjetoRequest {
    empresa_id: number;
    projeto_descricao: string;
    projeto_data_fim: Date;
    projeto_orcamento: number;
    projeto_status: number
  }
