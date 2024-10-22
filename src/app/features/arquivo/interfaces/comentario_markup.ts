export interface ComentarioMarkup {
  arquivo_comentario_id?: number ;
  arquivo_comentario_descricao: string;
  arquivo_comentario_markup_selecao:number;
  arquivo_id: string;
  arquivo_comentario_id_pai?: number | null;
  arquivo_comentario_nivel: number;
  arquivo_comentario_data?: Date | null;
  arquivo_comentario_status?: number | null;
  usuario_id:number;
  arquivo_comentario_markup:[
    {
        arquivo_comentario_markup_id: number,
        arquivo_comentario_markup_link_s3: string
        arquivo_comentario_markup_descricao: string
        arquivo_comentario_markup_data: Date | null,
        arquivo_comentario_id: number
    }
  ];
  usuario: {
    usuario_nome: string
  }
}
