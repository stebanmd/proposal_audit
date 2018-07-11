import { Utils } from "../helpers/utils";

export class FiltroProposta {
    NomeProposta: string = '';
    NomeFornecedor: string = '';
    DataInicial: string;
    DataFinal: string;
    Status: number = 0;
    IdCategoria: number = 0;

    constructor() {
        var dataAux = new Date();
        this.DataFinal = Utils.toLocalDate(dataAux);
        dataAux.setDate(dataAux.getDate()-1);
        this.DataInicial = Utils.toLocalDate(dataAux);
    }
}