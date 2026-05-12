async function verPerfil() {
  const { data } = await window._supabase.auth.getSession();

  if (data.session) {
    window.location.href = "perfil.html";
  } else {
    window.location.href = "login.html";
  }
}

async function cargarPerfil() {
  const { data } = await window._supabase.auth.getSession();

  if (!data.session) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("correoUsuario").textContent =
    data.session.user.email;
}

async function cerrarSesion() {
  const { error } = await window._supabase.auth.signOut();

  if (error) {
    alert(error.message);
    return;
  }

  localStorage.clear();
  sessionStorage.clear();

  window.location.replace("login.html");
}

window.addEventListener("load", async () => {
  const ruta = window.location.pathname;
  const { data } = await window._supabase.auth.getSession();

  if (ruta.includes("perfil.html")) {
    await cargarPerfil();
  }

  if (ruta.includes("login.html") && data.session) {
    window.location.href = "perfil.html";
  }
});

