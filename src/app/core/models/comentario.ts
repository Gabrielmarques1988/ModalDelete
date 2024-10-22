export interface Comentario {
  arquivo_comentario_id?: number ;
  arquivo_comentario_descricao: string;
  arquivo_comentario_markup?: string | null;
  arquivo_id: string;
  arquivo_comentario_id_pai?: number | null;
  arquivo_comentario_nivel: number;
  arquivo_comentario_data?: Date | null;
  arquivo_comentario_status?: number | null;
}
