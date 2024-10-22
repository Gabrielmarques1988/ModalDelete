import { Arquivo } from "./arquivo";

export interface Etapa {
    etapa_id: number;
    etapa_descricao?: string;
    etapa_data_inicio?: Date;
    etapa_data_fim?: Date;
    etapa_ordem?: number;
    etapa_status?: number;
    disciplina_id: number;
    etapa_id_pai?: number;
    dropdownOpen: boolean;
    arquivo: Arquivo[];
    permissionamento_tipo: string;
}
