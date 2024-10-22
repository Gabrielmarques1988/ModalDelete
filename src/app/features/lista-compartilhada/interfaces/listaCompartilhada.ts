export interface listaCompartilhada{
    lista_compartilhada_id: number;
    lista_compartilhada_descricao: String;
    lista_compartilhada_data?: Date;
    lista_compartilhada_status?: number;
    projeto_id?: number;
    usuario_id?: number;
    quantidade_usuarios: number;
    quantidade_arquivos: number;
}
