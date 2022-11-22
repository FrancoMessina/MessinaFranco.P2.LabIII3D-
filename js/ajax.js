import { mostrarSpinner, esconderSpinner } from "./spinner.js";
const URL = "http://localhost:3000/anuncios";
const $spinner = document.querySelector("#spinner");

export const getAnuncios = () => {
  const anuncios = [];
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", URL);
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          data.map((item) => anuncios.push(item));
          console.log(anuncios);
          resolve(anuncios);
        } else {
          reject(`Error: ${xhr.status} - ${xhr.statusText}`);
        }
      }
    });
    xhr.send();
  });
};

export const crearAnuncio = (anuncio) => {
  mostrarSpinner($spinner);
  axios
    .post(URL, anuncio)
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      esconderSpinner($spinner);
    });
};
export const updateAnuncio = (anuncio) => {
  mostrarSpinner($spinner);
  fetch(URL + "/" + anuncio.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anuncio),
  })
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Error: ${res.status} || ${res.statusText}`);
    })
    .then((data) => {
      console.log(data); // esto es para verificar por console log no es necesario
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      esconderSpinner($spinner);
    });
};

export const deleteAnuncio = (id) => {
  axios
    .delete(URL + "/" + id)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      esconderSpinner($spinner);
    });
};
