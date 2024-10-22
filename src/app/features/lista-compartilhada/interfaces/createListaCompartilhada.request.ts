export interface CreateListaCompartilhadaRequest {
  lista_compartilhada_descricao: string;
  lista_compartilhada_status: number;
  lista_compartilhada_data: Date;
  usuario_id: number;
  projeto_id: number; 
}
