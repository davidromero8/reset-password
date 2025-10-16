<template>
    <div class="signup-container">
    <h2>Crear cuenta</h2>

    <form @submit.prevent="handleSignup">
        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />

        <button type="submit" :disabled="loading">
        {{ loading ? "Creando..." : "Registrarse" }}
        </button>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="message" class="message">{{ message }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "@/composables/useAuth"

const { signUp } = useAuth()
const router = useRouter()

const email = ref("")
const password = ref("")
const loading = ref(false)
const error = ref("")
const message = ref("")

const handleSignup = async () => {
    error.value = ""
    message.value = ""
    loading.value = true

    const { data, error: signUpError } = await signUp(email.value, password.value)
    loading.value = false

    if (signUpError) {
    error.value = signUpError.message
    return
}

    if (data?.user?.identities?.length === 0) {
        error.value = "Correo ya existe"
    return
}

    message.value = "Cuenta creada. Revisa tu correo para confirmar tu registro."

}
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
button {
  padding: 10px;
  background: #4caf50;
  color: white;
  border: none;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 10px;
}
.message {
  color: green;
  margin-top: 10px;
}
</style>
