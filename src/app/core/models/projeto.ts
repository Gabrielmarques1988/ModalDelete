import { Disciplina } from "./disciplina";

export interface Projeto {
    projeto_id?: number;
    projeto_descricao?: string;
    projeto_data_inicio?: Date;
    projeto_data_fim?: Date;
    projeto_orcamento?: number;
    empresa_id: number;
    empresa_nome: string;
    disciplina : Disciplina[];
    permissionamento_tipo : string;
    dropdownOpen: boolean;
    projeto_status: number;
    disciplinas_ativas: number;
  disciplinas_inativas: number;
}
