import { ICorreo } from './ICorreo';

// obtiene informacion resumida de una coleccion de correos usando programacion funcional (RF-10)
export class Estadisticas {

    public obtenerAsuntos(correos: ICorreo[]): string[] { //transforma cada correo en su asunto
        return correos.map(correo => correo.getAsunto()); //map:misma cantidad de elementos, pero de otro tipo
    }
    
    public filtrarCorreos(correos: ICorreo[], condicion: (correo: ICorreo) => boolean): ICorreo[] { //recibe la condicion como funcion
        return correos.filter(condicion); //filter: se queda solo con los correos para los que la condicion da true
    }

     // REDUCE: cuenta cuantos correos no leyo un usuario.
    // El acumulador comienza en 0 y aumenta cuando encuentra un correo no leido.
    public contarNoLeidos(correos: ICorreo[], emailUsuario: string): number { //cuantos correos no leyo ese usuario
        return correos.reduce(
            (total, correo) => correo.getLeido(emailUsuario) ? total : total + 1, //si no esta leido, suma 1
            0 //valor inicial del total
        );
    }
    // REDUCE: cuenta cuantos correos envio cada remitente.
    // Utiliza un Map donde la clave es el email y el valor es la cantidad.
    public contarPorRemitente(correos: ICorreo[]): Map<string, number> { // email remitente devuelve cantidad de correos de ese remitente
        return correos.reduce((conteo, correo) => {
            // Obtiene el email del remitente del correo actuaL
            const email = correo.getRemitente().getEmail(); //de quien es este correo

            // Busca la cantidad existente y suma 1.
            // Si el remitente todavia no existe, comienza desde 0.
            conteo.set(email, (conteo.get(email) ?? 0) + 1); 

            return conteo; //devuelve el diccionario actualizado para el siguiente correo
        }, new Map<string, number>()); //valor inicial: un diccionario vacio
    }


 // SORT: ordena los correos alfabeticamente segun su asunto.
    public ordenarPorAsunto(correos: ICorreo[]): ICorreo[] {
        // Crea una copia para no modificar el arreglo original.
    return [...correos].sort((correoA, correoB) => {

        // Obtiene los asuntos y los convierte a minusculas
        const asuntoA = correoA.getAsunto().toLowerCase();
        const asuntoB = correoB.getAsunto().toLowerCase();

        // Si A va antes que B, devuelve -1
        if (asuntoA < asuntoB) return -1;

        // Si A va despues que B, devuelve 1
        if (asuntoA > asuntoB) return 1;

        // Si son iguales, devuelve 0
        return 0;
    });
}

    // SOME: comprueba si existe al menos un correo de un remitente determinado.
    // Devuelve true si encuentra una coincidencia y false si no encuentra ninguna.
    public tieneCorreoDeRemitente(
        correos: ICorreo[],
        emailRemitente: string
    ): boolean {

        // Elimina espacios externos y convierte el email a minusculas
        const email = emailRemitente.trim().toLowerCase();

        // Comprueba si algun correo tiene ese remitente
        return correos.some(
            correo =>
                correo.getRemitente().getEmail().toLowerCase() === email
        ); // si hay devuelve true
    }

   

}