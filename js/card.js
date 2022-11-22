export function crearTarjeta(anuncio) {
    const nuevaCarta = document.createElement("div");
    nuevaCarta.classList.add("col","text-center");
    const cartaBody = document.createElement("div");
    cartaBody.classList.add("card-body");
    const titulo = document.createElement("h3");
    titulo.textContent = `Titulo: ${anuncio.titulo}`;
    const transaccion = document.createElement("p");
    transaccion.textContent = `Transaccion: ${anuncio.transaccion}`;
    transaccion.classList.add("text-dark");
    
    const descripcion = document.createElement("p");
    descripcion.textContent = `Descripcion: ${anuncio.descripcion}`;
    descripcion.classList.add("text-dark");
    const precio = document.createElement("p");
    precio.textContent = `Precio: $${anuncio.precio}`;
    precio.classList.add("text-success");
    const kms = document.createElement("p");
    kms.textContent = `Kms: ${anuncio.kms}`;
    kms.classList.add("text-dark");
    const puertas = document.createElement("p");
    puertas.textContent = `Puertas : ${anuncio.puertas}`;
    puertas.classList.add("text-dark");
    const potencia = document.createElement("p");
    potencia.classList.add("text-dark");

    potencia.textContent = `Potencia: ${anuncio.potencia}`;
    
    nuevaCarta.appendChild(cartaBody);
    cartaBody.appendChild(titulo);
    cartaBody.appendChild(transaccion);
    cartaBody.appendChild(descripcion);
    cartaBody.appendChild(precio);
    cartaBody.appendChild(kms);
    cartaBody.appendChild(puertas);
    cartaBody.appendChild(potencia);
    cartaBody.classList.add("card");    

    return nuevaCarta;
}
