console.log("SCRIPT CARGADO CORRECTAMENTE");


let hotelSeleccionado = "";

async function cargarHoteles() {
  const { data } = await window._supabase
    .from('hoteles')
    .select('*');

  const lista = document.getElementById("lista-hoteles");
  if (!lista) return;

  lista.innerHTML = "";

const select = document.getElementById("hotelSeleccionado");

if(select){
  select.innerHTML = "<option>Selecciona un hotel</option>";
}

  data.forEach(hotel => {
    const card = document.createElement("div");
    card.className = "card";
    if(select){
  select.innerHTML += `
    <option value="${hotel.nombre}">
      ${hotel.nombre}
    </option>
  `;
}

card.innerHTML = `
  <img src="${hotel.imagen}" alt="${hotel.nombre}">
  <h3>${hotel.nombre}</h3>

  <button class="mapa-btn btn-pro"
    onclick="abrirMapa('${hotel.ubicacion}')">
    Ver ubicación
  </button>
`;

    lista.appendChild(card);
  });
}

async function cargarLugares() {
  const { data } = await window._supabase
    .from('lugares')
    .select('*');

  const lista = document.getElementById("lista-lugares");
  if (!lista) return;

  lista.innerHTML = "";

  data.forEach(lugar => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
  <img src="${lugar.imagen}" alt="${lugar.nombre}">
  <h3>${lugar.nombre}</h3>

  <button class="mapa-btn btn-pro"
    onclick="abrirMapa('${lugar.ubicacion}')">
    Ver ubicación
  </button>
`;

    lista.appendChild(card);
  });
}


async function cargarGuias() {
  const { data } = await window._supabase
    .from('guias')
    .select('*');

  const lista = document.getElementById("lista-guias");
  if (!lista) return;

  lista.innerHTML = "";

  data.forEach(guia => {
    const card = document.createElement("div");
    card.className = "card guia-card";

    card.innerHTML = `
      <img src="https://s3.ppllstatics.com/canarias7/www/multimedia/201704/14/media/cortadas/462076-1g_CSN462076_MG3928385--1248x702.jpg" alt="${guia.nombre}">
      <h3>${guia.nombre}</h3>
    `;

    card.onclick = () => mostrarGuia(guia);

    lista.appendChild(card);
  });
}

//lol

document.addEventListener("DOMContentLoaded", () => {
  cargarHoteles();
  cargarLugares();
  cargarGuias();
});
function mostrarFormulario(){
  document.getElementById("form-guia").classList.toggle("oculto");
}

async function registrarGuia(){

  alert("Botón funcionando");

  try {

    const nombre = document.getElementById("nombreGuia").value;
    const telefono = document.getElementById("telefonoGuia").value;
    const experiencia = document.getElementById("expGuia").value;
    const foto = "https://cdn-icons-png.flaticon.com/512/6522/6522581.png";

    console.log(window._supabase);

    const { data, error } = await window._supabase
      .from("guias")
      .insert([
        {
          nombre,
          telefono,
          experiencia,
          imagen: foto
        }
      ]);

    if(error){
      alert("ERROR: " + error.message);
      console.log(error);
      return;
    }

    alert("Registro guardado");

  } catch(err){
    alert("Fallo: " + err.message);
    console.log(err);
  }

  
}

async function guardarReserva(){

  const hotel = document.getElementById("hotelSeleccionado").value;
const nombre = document.getElementById("nombreReserva").value;
  const correo = document.getElementById("correoReserva").value;
  const telefono = document.getElementById("telefonoReserva").value;
  const ingreso = document.getElementById("ingreso").value;
  const salida = document.getElementById("salida").value;

  const { error } = await window._supabase
    .from("reservas_hoteles")
    .insert([{
      hotel: hotel,
      hotel: hotelSeleccionado,
      nombre,
      correo,
      telefono,
      fecha_ingreso: ingreso,
      fecha_salida: salida
    }]);

  if(error){
    alert(error.message);
    return;
  }

  alert("Reserva realizada correctamente");

  document.getElementById("formReserva")
    .classList.add("oculto");
}

function mostrarReserva(nombreHotel){

  hotelSeleccionado = nombreHotel;

  const form = document.getElementById("formReserva");

  form.classList.remove("oculto");

  form.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function abrirMapa(link){
  window.open(link, "_blank");
}

function mostrarFormularioReserva(){
  document.getElementById("formReserva")
    .classList.toggle("oculto");

  document.getElementById("formReserva")
    .scrollIntoView({
      behavior:"smooth"
    });
}

function mostrarGuia(guia){

  document.getElementById("modalNombre").textContent = guia.nombre;
  document.getElementById("modalEspecialidad").textContent = guia.especialidad;
  document.getElementById("modalDescripcion").textContent = guia.experiencia;
  document.getElementById("modalImagen").src = "https://s3.ppllstatics.com/canarias7/www/multimedia/201704/14/media/cortadas/462076-1g_CSN462076_MG3928385--1248x702.jpg";

  document.getElementById("modalGuia")
    .classList.remove("oculto");
}

function cerrarModalGuia(){
  document.getElementById("modalGuia")
    .classList.add("oculto");
console.log("SCRIPT CARGADO CORRECTAMENTE");
}