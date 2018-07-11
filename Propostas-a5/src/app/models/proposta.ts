import { Fornecedor } from "./fornecedor";
import { Categoria } from "./categoria";
import { HistoricoProposta } from "./historicoProposta";
import { Utils } from "../helpers/utils";

export class Proposta {
    ID: number = 0;
    Nome: string = '';
    IdFornecedor: number = 0;
    Fornecedor: Fornecedor;
    IdCategoria: number = 0;
    Categoria: Categoria;
    Data: string;
    DataMask: string;
    Valor: 0.00;
    Descricao: string = '';
    Status: number = 0;
    StatusStr: string = '';
    Arquivo: string = '';
    CaminhoArquivo: string = '';
    IdUsuario: number = 0;
    Ativo: boolean = true;
    HistoricoAlteracao = new Array<HistoricoProposta>();
}