import { Usuario } from "./usuario";

export class HistoricoProposta {
    IdProposta: number = 0;
    IdUsuario: number = 0;
    Usuario: Usuario = new Usuario()
    Data: string = '';
    Acao: number = 0;
    AcaoStr: string = '';
}