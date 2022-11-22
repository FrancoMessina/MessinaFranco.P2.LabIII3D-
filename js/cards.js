import { crearTarjeta } from "./card.js";
import { getAnuncios } from "./ajax.js";
import { mostrarSpinner, esconderSpinner } from "./spinner.js";

const $cards = document.querySelector("#cards");
const $spinner = document.querySelector("#spinner");

let anuncios = [];
mostrarSpinner($spinner);
getAnuncios()
  .then((data) => {
    anuncios = data;
    anuncios.map((item) => {
      const $nuevaTarjeta = crearTarjeta(item);
      $cards.append($nuevaTarjeta);
    });
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    esconderSpinner($spinner);
  });
