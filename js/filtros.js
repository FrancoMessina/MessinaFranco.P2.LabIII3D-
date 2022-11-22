export const getPromedio = (anuncios, filtro)=>{
    if(filtro === "todos"){
        return (anuncios.reduce((t,v)=> {return t + parseFloat(v.precio)},0) / anuncios.length).toFixed(4);
    }
    let listaFiltrada = anuncios.filter((anuncio) => anuncio.transaccion === filtro);
    return (listaFiltrada.reduce((t,v)=> t + parseFloat(v.precio),0) / listaFiltrada.length).toFixed(4);
}
//Creo un nuevo objeto con todos los anuncios y con las keys que se envian
//Por cada item en anuncios creo un nuevo objeto con sus respectivas keys.
export const filtrarLista = (anuncios, keys) => {
    return  anuncios.map((item) => {
    let nuevoAnuncio = {};
    keys.map((key) => nuevoAnuncio[key] = item[key]);
    return nuevoAnuncio;
    });
}

export const cargarCheckboxes = (checkboxes) =>{
    const keysListaFiltrada = ["id"];
    for (var item of checkboxes) {
        if (item.checked)keysListaFiltrada.push(item.value);
    }
    return keysListaFiltrada;
}
