import { Anuncio_Auto } from "./anuncio.js";
import { actualizarTabla } from "./tablaDinamica.js";
import {
  CargarReferenciasControles,
  validarFormularioVacio,
  validarEnviar,
} from "./validaciones.js";
import { cargarFormulario, modificarAnuncio } from "./datosFormulario.js";
import { mostrarSpinner, esconderSpinner } from "./spinner.js";
import { mostrarBtnEliminar, esconderBtnEliminar } from "./botones.js";

import { getPromedio, filtrarLista, cargarCheckboxes } from "./filtros.js";
import {
  getAnuncios,
  crearAnuncio,
  updateAnuncio,
  deleteAnuncio,
} from "./ajax.js";
let anuncios = [];

const $divTabla = document.querySelector(".divTabla");
const $btnReset = document.querySelector("#btnReset");
const $btnEliminar = document.querySelector("#btnEliminar");
const $formulario = document.forms[0];
const $mensajeEnviar = document.getElementById("mensajeEnviar");
const $btnEnviar = document.querySelector("#btnEnviar");
const $spinner = document.querySelector("#spinner");
let idSeleccionado;
const controles = $formulario.elements;
const $promedio = document.querySelector("#txtPromedio");
const $selectPromedio = document.querySelector("#selectPromedio");

const $checkboxes = document.querySelectorAll(".checkboxes");
let keysListaFiltrada = ["id"];

window.addEventListener("load", () => {
  esconderBtnEliminar($btnEliminar);
  esconderSpinner($spinner);
  $promedio.textContent = "N/A";
  getAnuncios()
    .then((data) => {
      anuncios = data;
      anuncios.map((item) => console.log("Elemento" + item));
      actualizarTabla($divTabla, anuncios);
    })
    .catch((err) => {
      console.error(err);
    });


  $formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validarFormularioVacio($formulario) && validarEnviar($formulario)) {
      $mensajeEnviar.textContent = "";
      $mensajeEnviar.classList.remove("danger");
      if ($btnEnviar.value == "Guardar") {
        const {
          titulo,
          transaccion,
          descripcion,
          precio,
          puertas,
          kms,
          potencia,
        } = e.target;
        const nuevoAnuncio = new Anuncio_Auto(
          null,
          titulo.value,
          transaccion.value,
          descripcion.value,
          precio.value,
          kms.value,
          puertas.value,
          potencia.value
        );
        mostrarSpinner($spinner);
        crearAnuncio(nuevoAnuncio)
          .then(() => {
            esconderSpinner($spinner);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if ($btnEnviar.value == "Modificar") {
        const anuncio = anuncios.find(
          (element) => element.id == idSeleccionado
        );
        modificarAnuncio(controles, anuncio);
        updateAnuncio(anuncio);
      }
    } else {
      $mensajeEnviar.classList.add("danger");
      $mensajeEnviar.textContent = "Completar campos de manera correcta";
    }
  });
});

$divTabla.addEventListener("click", (e) => {
  $mensajeEnviar.textContent = "";
  $mensajeEnviar.classList.remove("danger");
  const emisor = e.target;
  if (emisor.matches("tbody tr td")) {
    let id = emisor.parentElement.dataset.id;
    const anuncio = anuncios.find((element) => element.id == id);
    idSeleccionado = id;
    cargarFormulario($formulario, anuncio);
    mostrarBtnEliminar($btnEliminar);
    $btnEnviar.value = "Modificar";
  }
});

$btnReset.addEventListener("click", () => {
  $btnEnviar.value = "Guardar";
  esconderBtnEliminar($btnEliminar);
});

$btnEliminar.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarSpinner($spinner);
  if (confirm("Quiere eliminar el anuncio seleccionado?")) {
    deleteAnuncio(idSeleccionado);
  }
});

$selectPromedio.addEventListener("change", (e) => {
  let promedio = getPromedio(anuncios, e.target.value);
  $promedio.value = !isNaN(promedio)
    ? `$${promedio}`
    : `No hay transaccion ${e.target.value}`;
});

CargarReferenciasControles(controles);
keysListaFiltrada = cargarCheckboxes($checkboxes);

$checkboxes.forEach((element) =>
  element.addEventListener("click", (e) => {
    let seleccionado = e.target;
    if (seleccionado.checked) {
      keysListaFiltrada.push(seleccionado.value);
    } else {
      keysListaFiltrada.splice(
        keysListaFiltrada.indexOf(seleccionado.value),
        1
      );
    }
    actualizarTabla($divTabla, filtrarLista(anuncios, keysListaFiltrada));
  })
);
