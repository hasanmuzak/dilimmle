<template>
  <div class="container mx-auto">
    <div
      class="bg-white p-3 rounded form mx-auto mt-48 transition duration-300 hover:shadow-md"
    >
      <h3 class="text-center text-indigo-600 border-b-2 pb-2">
        <i class="fas fa-user-plus mr-2"></i>Üye Ol
      </h3>
      <div>
        <transition name="show">
          <p v-if="error.length > 0"  class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>{{error}}
          </p>
        </transition>
        <span class="my-2 block input-label text-gray-600">Kullanıcı Adı</span>
        <at-input
          :status="!$v.username.$invalid ? 'success' : ''"
          @blur="$v.username.$touch()"
          v-model="username"
          placeholder="Kullanıcı Adınız..."
          icon="user"
        ></at-input>
        <transition name="show">
          <p v-if="$v.username.$error" class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Geçersiz Kullanıcı
            Adı.
          </p>
        </transition>
        <transition name="show">
          <p v-if="!$v.username.minLength" class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Kullanıcı adınız çok
            kısa.
          </p>
        </transition>
        <transition name="show">
          <p v-if="!$v.username.maxLength" class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Kullanıcı adınız çok
            uzun.
          </p>
        </transition>
        <transition name="show">
          <p v-if="!$v.username.$invalid" class="text-green-500 error-msg mt-2">
            <i class="fas fa-check mr-2"></i>İyi görünüyor :)
          </p>
        </transition>
      </div>
      <div>
        <span class="my-2 block input-label text-gray-600">İsim - Soyisim</span>
        <div class="flex justify-between">
          <at-input
            :status="!$v.firstname.$invalid ? 'success' : ''"
            @blur="$v.firstname.$touch()"
            v-model="firstname"
            placeholder="Adın"
            class="w-full mr-2"
          ></at-input>
          <at-input
            :status="!$v.surname.$invalid ? 'success' : ''"
            @blur="$v.surname.$touch()"
            v-model="surname"
            placeholder="Soyadın"
            class="w-full"
          ></at-input>
        </div>
        <transition name="show">
          <p v-if="$v.firstname.$error || $v.surname.$error" class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Geçersiz isim & soyisim.
          </p>
        </transition>
        <transition name="show">
          <p v-if="!$v.firstname.minLength || !$v.surname.minLength" class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Adınız ya da soyadınız çok
            kısa.
          </p>
        </transition>
        <transition name="show">
          <p v-if="!$v.firstname.maxLength || !$v.surname.maxLength" class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Kullanıcı adınız çok
            uzun.
          </p>
        </transition>
      </div>
      <div>
        <span class="my-2 block input-label text-gray-600">Şifre</span>
        <at-input
          :status="!$v.password.$invalid ? 'success' : ''"
          @blur="$v.password.$touch()"
          v-model="password"
          type="password"
          placeholder="Şifreniz..."
          icon="lock"
        ></at-input>
        <transition name="show">
          <p
            v-if="
              $v.password.$error ||
              !$v.password.minLength ||
              !$v.password.maxLength
            "
            class="text-red-500 error-msg mt-2"
          >
            <i class="fas fa-exclamation-circle mr-2"></i>Geçersiz Şifre.
          </p>
        </transition>
      </div>
      <div>
        <span class="my-2 block input-label text-gray-600">Şifre</span>
        <at-input
          :status="!$v.password2.$invalid ? 'success' : ''"
          @blur="$v.password2.$touch()"
          v-model="password2"
          type="password"
          placeholder="Şifreniz Tekrar"
          icon="lock"
        ></at-input>
        <transition name="show">
          <p v-if="!$v.password2.sameAs" class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Şifreler uyuşmuyor.
          </p>
        </transition>
      </div>
      <at-button @click="registerUser" :disabled="$v.$invalid" class="mt-4 mb-2" type="primary"
        >Kayıt Ol<i class="ml-2 fas fa-angle-right"></i
      ></at-button>
    </div>
  </div>

</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      firstname: "",
      surname: "",
      error : ""
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16),
    },
    firstname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(16),
    },
    surname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(16),
    },
    password: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(16),
    },
    password2: {
      required,
      sameAs: sameAs("password"),
    },
  },
  methods: {
    registerUser(){
      this.$axios.post('/user/register', {

          username : this.username,
          firstname : this.firstname,
          surname : this.surname,
          password : this.password

      }).then(response => {
        this.$router.push('/login');
      }).catch(err => {
        this.error = "Kullanıcı adı daha önce alınmış.";
        console.log(err);
      })
    }
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap");

.form {
  max-width: 400px;
  font-family: "Rubik", sans-serif;
  .error-msg {
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
