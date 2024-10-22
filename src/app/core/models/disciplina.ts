import { Etapa } from "./etapa";

export interface Disciplina {
    disciplina_id: number;
    disciplina_descricao?: string;
    disciplina_status?: number;
    projeto_id: number;
    dropdownOpen: boolean;
    etapa : Etapa[]
    projeto_nome: string;
    permissionamento_tipo: string;
}
