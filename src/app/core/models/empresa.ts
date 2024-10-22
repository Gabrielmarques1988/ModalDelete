import { Projeto } from "./projeto"

export interface Empresa {
  empresa_id:      number | any;
  empresa_nome:    string 
  empresa_cnpj:    string 
  empresa_status:  number | undefined
  empresa_data_cadastro: Date
  projeto : Projeto[]
}

