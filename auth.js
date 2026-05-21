async function register() {
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const botones  = document.querySelectorAll("button");

  if (!email || !password) { Toast.aviso("Completa todos los campos"); return; }

  botones.forEach(btn => btn.disabled = true);
  Toast.info("Registrando...");

  const { error } = await window._supabase.auth.signUp({ email, password });

  botones.forEach(btn => btn.disabled = false);

  if (error) { Toast.error("Error: " + error.message); return; }

  Toast.exito("¡Usuario registrado correctamente!");
}

async function login() {
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const botones  = document.querySelectorAll("button");

  if (!email || !password) { Toast.aviso("Completa todos los campos"); return; }

  botones.forEach(btn => btn.disabled = true);
  Toast.info("Ingresando...");

  const { error } = await window._supabase.auth.signInWithPassword({ email, password });

  botones.forEach(btn => btn.disabled = false);

  if (error) { Toast.error("Error: " + error.message); return; }

  Toast.exito("¡Bienvenido!");
  setTimeout(() => { window.location.href = "index.html"; }, 1000);
}

async function resetPassword() {
  const email = document.getElementById("email").value.trim();

  if (!email) { Toast.aviso("Ingresa tu correo primero"); return; }

  const { error } = await window._supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://turismo-monteria.vercel.app/reset-password.html"
  });

  if (error) { Toast.error("Error: " + error.message); return; }

  Toast.exito("Correo enviado. Revisa tu bandeja o carpeta de spam.");
}

async function updatePassword() {
  const newPassword = document.getElementById("newPassword").value.trim();

  if (!newPassword) { Toast.aviso("Ingresa una nueva contraseña"); return; }

  const { error } = await window._supabase.auth.updateUser({ password: newPassword });

  if (error) { Toast.error("Error: " + error.message); return; }

  Toast.exito("¡Contraseña actualizada correctamente!");
  setTimeout(() => { window.location.href = "login.html"; }, 1500);
}