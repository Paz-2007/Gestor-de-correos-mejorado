import { ICorreo } from './ICorreo';
import { BandejaEntrada } from './BandejaEntrada';
import { IBuscador } from './IBuscador';

export class Buscador implements IBuscador {

    public buscarCorreos(correos: ICorreo[], texto: string): ICorreo[] {

        if (!texto || texto.trim().length === 0 || correos.length === 0) {
            return [];
        }

        const busqueda = texto.trim().toLowerCase();

        return correos.filter(correo => {

            const remitente = correo.getRemitente();
            const destinatarios = correo.getDestinatarios();

            return (
                correo.getAsunto().toLowerCase().includes(busqueda) ||
                correo.getContenido().toLowerCase().includes(busqueda) ||
                remitente.getNombre().toLowerCase().includes(busqueda) ||
                remitente.getEmail().toLowerCase().includes(busqueda) ||
                destinatarios.some(destinatario =>
                    destinatario.getNombre().toLowerCase().includes(busqueda) ||
                    destinatario.getEmail().toLowerCase().includes(busqueda)
                )
            );
        });

        
    }

    public buscarEnEntrada(entrada: BandejaEntrada, texto: string): ICorreo[] {
        return this.buscarCorreos(entrada.getCorreos(), texto);
    }

    
}