async function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");
  const botones = document.querySelectorAll("button");

  if (!email || !password) {
    mensaje.textContent = "Completa todos los campos";
    return;
  }

  botones.forEach(btn => btn.disabled = true);
  mensaje.textContent = "Registrando...";

  const { error } = await window._supabase.auth.signUp({
    email,
    password
  });

  botones.forEach(btn => btn.disabled = false);

  if (error) {
    mensaje.textContent = "Error: " + error.message;
    return;
  }

  mensaje.textContent = "Usuario registrado correctamente";
}

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");
  const botones = document.querySelectorAll("button");

  if (!email || !password) {
    mensaje.textContent = "Completa todos los campos";
    return;
  }

  botones.forEach(btn => btn.disabled = true);
  mensaje.textContent = "Ingresando...";

  const { error } = await window._supabase.auth.signInWithPassword({
    email,
    password
  });

  botones.forEach(btn => btn.disabled = false);

  if (error) {
    mensaje.textContent = "Error: " + error.message;
    return;
  }

  mensaje.textContent = "Login exitoso";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

async function resetPassword() {
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!email) {
    mensaje.textContent = "Ingresa tu correo primero";
    return;
  }

  const { error } = await window._supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://turismo-monteria.vercel.app/reset-password.html"
  });

  if (error) {
    mensaje.textContent = "Error: " + error.message;
    return;
  }

  mensaje.textContent = "Correo enviado. Revisa tu bandeja principal o carpeta de spam para cambiar tu contraseña.";
}

async function updatePassword() {
  const newPassword = document.getElementById("newPassword").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!newPassword) {
    mensaje.textContent = "Ingresa una nueva contraseña";
    return;
  }

  const { error } = await window._supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    mensaje.textContent = "Error: " + error.message;
    return;
  }

  mensaje.textContent = "Contraseña actualizada correctamente";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}