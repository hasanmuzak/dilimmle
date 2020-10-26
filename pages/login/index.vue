<template>
  <div class="container mx-auto">
    <div
      :class="{'dark' : this.$store.state.nightMode}"
      class="bg-white p-3 rounded form mx-auto mt-48 transition duration-300 hover:shadow-md"
    >
      <h3 class="text-center text-indigo-600 border-b-2 pb-2">
        <i class="fas fa-sign-in-alt mr-2"></i>Giriş Yap
      </h3>
      <at-alert class="mt-2" v-if="error.length > 0" message="Hatalı kullanıcı adı veya şifre." type="error" closable show-icon></at-alert>
      <div>
        <span class="my-2 block input-label text-gray-600">Kullanıcı Adı</span>
        <at-input
          @blur="$v.username.$touch()"
          v-model="username"
          placeholder="Kullanıcı Adınız..."
          icon="user"
        ></at-input>
        <transition name="show">
          <p v-if="$v.username.$error || !$v.username.minLength || !$v.username.maxLength"  class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Geçersiz Kullanıcı
            Adı.
          </p>
        </transition>
        <transition name="show">
          <p v-if="!$v.username.$invalid"  class="text-green-500 error-msg mt-2">
          <i class="fas fa-check mr-2"></i>İyi görünüyor :)
          </p>
        </transition>
      </div>
      <div>
        <span class="my-2 block input-label text-gray-600">Şifre</span>
        <at-input
          @blur="$v.password.$touch()"
          v-model="password"
          type="password"
          placeholder="Şifreniz..."
          icon="lock"
        ></at-input>
        <transition name="show">
          <p v-if="$v.password.$error || !$v.password.minLength || !$v.password.maxLength"  class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Geçersiz Şifre.
          </p>
        </transition>
      </div>
      <at-button :loading="loading === true" @click="login" :disabled="$v.$invalid || loading === true" class="mt-4 mb-2" type="primary"
        >Giriş<i class="ml-2 fas fa-angle-right"></i
      ></at-button>
    </div>
  </div>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      username: "",
      password: "",
      loading : false,
      error : ''
    };
  },
  validations : {
    username : {
      required,
      minLength : minLength(4),
      maxLength : maxLength(16)
    },
    password : {
      required,
      minLength : minLength(5),
      maxLength : maxLength(16)
    },
  },
  methods: {
    login(){
      this.loading = true;
      this.$auth.loginWith('local', {
        data : {
          username : this.username,
          password : this.password
        }
      })
    }
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap");
.dark{
}
.form {
  max-width: 400px;
  font-family: "Rubik", sans-serif;
  .error-msg{
    font-size: 11px;
  }
  .input-label {
    font-size: 12px;
  }
  .at-btn {
    outline: none;
  }
}
.show-enter-active {
  animation: bounce-in 0.2s;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
