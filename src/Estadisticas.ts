import { ICorreo } from './ICorreo';

// obtiene informacion resumida de una coleccion de correos usando programacion funcional (RF-10)
export class Estadisticas {

    public obtenerAsuntos(correos: ICorreo[]): string[] { //transforma cada correo en su asunto
        return correos.map(correo => correo.getAsunto()); //map:misma cantidad de elementos, pero de otro tipo
    }
    
    public filtrarCorreos(correos: ICorreo[], condicion: (correo: ICorreo) => boolean): ICorreo[] { //recibe la condicion como funcion
        return correos.filter(condicion); //filter: se queda solo con los correos para los que la condicion da true
    }

    public contarNoLeidos(correos: ICorreo[], emailUsuario: string): number { //cuantos correos no leyo ese usuario
        return correos.reduce(
            (total, correo) => correo.getLeido(emailUsuario) ? total : total + 1, //si no esta leido, suma 1
            0 //valor inicial del total
        );
    }

    public contarPorRemitente(correos: ICorreo[]): Map<string, number> { // email remitente devuelve cantidad de correos de ese remitente
        return correos.reduce((conteo, correo) => {
            const email = correo.getRemitente().getEmail(); //de quien es este correo
            conteo.set(email, (conteo.get(email) ?? 0) + 1); //suma 1 a ese remitente (si no estaba, arranca en 0)
            return conteo; //devuelve el diccionario actualizado para el siguiente correo
        }, new Map<string, number>()); //valor inicial: un diccionario vacio
    }


    // Ordena los correos alfabéticamente según su asunto.
    public ordenarPorAsunto(correos: ICorreo[]): ICorreo[] {
    return [...correos].sort((correoA, correoB) => {
        const asuntoA = correoA.getAsunto().toLowerCase();
        const asuntoB = correoB.getAsunto().toLowerCase();

        if (asuntoA < asuntoB) return -1;
        if (asuntoA > asuntoB) return 1;
        return 0;
    });
}

    // Comprueba si existe al menos un correo de un remitente determinado.
    public tieneCorreoDeRemitente(
        correos: ICorreo[],
        emailRemitente: string
    ): boolean {
        const email = emailRemitente.trim().toLowerCase();

        return correos.some(
            correo =>
                correo.getRemitente().getEmail().toLowerCase() === email
        ); // si hay devuelve true
    }

   

}