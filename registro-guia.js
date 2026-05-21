document.getElementById("formGuia").addEventListener("submit", async function(e) {
  e.preventDefault();

  const nombre      = document.getElementById("nombre").value;
  const correo      = document.getElementById("correo").value;
  const telefono    = document.getElementById("telefono").value;
  const especialidad = document.getElementById("especialidad").value;
  const descripcion = document.getElementById("descripcion").value;

  const { error } = await window._supabase.from("guias").insert([{
    nombre, correo, telefono, especialidad, experiencia: descripcion
  }]);

  if (error) {
    Toast.error("Error: " + error.message);
    return;
  }

  Toast.exito("¡Solicitud enviada correctamente! Pronto te contactaremos.");
  document.getElementById("formGuia").reset();
});