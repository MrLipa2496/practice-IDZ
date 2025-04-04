<template class="form">
  <div class="form-wrapper">
    <h2 class="form-title">
      {{ isSignIn ? 'Sign In' : 'Create Your Account' }}
    </h2>
    <form class="form" @submit.prevent="handleSubmit">
      <div v-if="!isSignIn">
        <label class="form-label">
          <span class="form-span">Name:</span>
          <input
            v-model="formData.name"
            type="text"
            name="name"
            placeholder="Anonymous"
            required
            class="form-input"
            autofocus
          />
        </label>
        <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
      </div>

      <label class="form-label">
        <span class="form-span">Email:</span>
        <input
          v-model="formData.email"
          type="email"
          name="email"
          placeholder="yourmail@mail"
          required
          class="form-input"
        />
      </label>
      <div v-if="errors.email" class="error-message">{{ errors.email }}</div>

      <label class="form-label">
        <span class="form-span">Password:</span>
        <div class="input-wrapper">
          <input
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            required
            class="form-input"
          />
          <button
            type="button"
            class="eye-btn"
            @click="togglePasswordVisibility"
          >
            <Eye v-if="showPassword" />
            <EyeOff v-else />
          </button>
        </div>
      </label>
      <div v-if="errors.password" class="error-message">
        {{ errors.password }}
      </div>

      <div v-if="!isSignIn">
        <label class="form-label">
          <span class="form-span">Password Confirm:</span>
          <div class="input-wrapper">
            <input
              v-model="formData.passwordConfirm"
              :type="showPassword ? 'text' : 'password'"
              name="passwordConfirm"
              required
              class="form-input"
            />
            <button
              type="button"
              class="eye-btn"
              @click="togglePasswordVisibility"
            >
              <Eye v-if="showPassword" />
              <EyeOff v-else />
            </button>
          </div>
        </label>
        <div v-if="errors.passwordConfirm" class="error-message">
          {{ errors.passwordConfirm }}
        </div>
      </div>

      <div v-if="!isSignIn">
        <label class="form-check-box">
          <input
            v-model="formData.agreed"
            type="checkbox"
            name="agreed"
            required
            class="input-check-box"
          />
          <span class="form-span">I agree to the terms and conditions</span>
        </label>
        <div v-if="errors.agreed" class="error-message">
          {{ errors.agreed }}
        </div>
      </div>

      <button type="submit" class="form-button">
        {{ isSignIn ? 'Sign In' : 'Sign Up' }}
      </button>

      <div class="toggle-link">
        <span @click="toggleForm">
          {{
            isSignIn
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Sign In'
          }}
        </span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const formData = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  agreed: false
})

const showPassword = ref(false)
const errors = ref({})
const isSignIn = ref(false)
const router = useRouter()

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const validate = () => {
  const newErrors = {}
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{8,32}$/

  if (!passwordRegex.test(formData.value.password)) {
    newErrors.password =
      'Password must be 8-32 characters and include uppercase, lowercase, number, and special character.'
  }

  if (formData.value.password !== formData.value.passwordConfirm) {
    newErrors.passwordConfirm = 'Passwords do not match.'
  }

  return newErrors
}

const handleSubmit = () => {
  errors.value = validate()
  if (Object.keys(errors.value).length > 0) return

  if (isSignIn.value) {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (
      storedUser &&
      storedUser.email === formData.value.email &&
      storedUser.password === formData.value.password
    ) {
      console.log('Sign in successful')
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/dashboard')
    } else {
      errors.value.email = 'Invalid credentials'
    }
  } else {
    const newUser = {
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    }
    localStorage.setItem('user', JSON.stringify(newUser))
    console.log('Sign up successful')
    router.push('/dashboard')
  }

  formData.value = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    agreed: false
  }
}

const toggleForm = () => {
  isSignIn.value = !isSignIn.value
}

onMounted(() => {
  if (localStorage.getItem('isAuthenticated')) {
    router.push('/dashboard')
  }
})
</script>

<style scoped>
.form-wrapper {
  max-width: 400px;
  min-width: 200px;
  margin: 40px auto;
  box-shadow: 0 2px 10px rgb(43, 233, 43);
  border-radius: 20px;
  padding: 40px;
  background: white;
}

.form-title {
  margin: 30px 0;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-label {
  display: flex;
  flex-direction: column;
}

.form-span {
  margin-bottom: 5px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  border-radius: 40px;
  border: 1px solid gray;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
}

.eye-btn {
  position: absolute;
  right: 15px;
  border: none;
  background-color: inherit;
  cursor: pointer;
}

.form-button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: rgb(54, 236, 54);
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.toggle-link {
  text-align: center;
  cursor: pointer;
  color: #007bff;
  margin-top: 20px;
}

.toggle-link:hover {
  text-decoration: underline;
}
</style>
