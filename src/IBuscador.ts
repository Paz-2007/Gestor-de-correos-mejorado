import { ICorreo } from './ICorreo';
import { BandejaEntrada } from './BandejaEntrada';

export interface IBuscador {

    buscarCorreos(
        correos: ICorreo[],
        texto: string
    ): ICorreo[];

    buscarEnEntrada(
        entrada: BandejaEntrada,
        texto: string
    ): ICorreo[];
}