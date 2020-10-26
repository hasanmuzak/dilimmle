<template>
  <div>
    <div class="navbar bg-gray-800 px-2 py-1">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <nuxt-link
            to="/"
            class="p-2 transition duration-300 rounded logo-link"
          >
            <h3 class="logo text-gray-200">Dilimmle</h3>
          </nuxt-link>
          <div class="ml-2 flex items-center">
            <i
              v-if="this.$store.state.nightMode === true"
              class="icon icon-moon moon-icon toggle-icn cursor-pointer p-2 rounded-full transition duration-300"
              @click="changeStatus"
            ></i>
            <i
              v-if="this.$store.state.nightMode === false"
              class="icon icon-sun sun-icon toggle-icn cursor-pointer p-2 rounded-full transition duration-300"
              @click="changeStatus"
            ></i>
          </div>
        </div>
        <div
          @click="showSidebar"
          class="bar hidden items-center justify-center flex-col hover:bg-gray-700 cursor-pointer rounded-full transition duration-300 p-3"
        >
          <div class="bar1 bg-gray-200"></div>
          <div class="bar2 bg-gray-200"></div>
          <div class="bar3 bg-gray-200"></div>
        </div>
        <div class="flex p-2 md:mx-auto middle-menu" id="responsive-menu">
          <div
            @click="removeActive"
            class="times-btn text-gray-200 p-2 transition duration-300 hover:bg-gray-800 rounded-full hidden"
          >
            <i class="fas fa-times"></i>
          </div>
          <nuxt-link
            to="/"
            class="md:mr-4 navbar-link p-2 md:p-0 text-gray-300"
          >
            <div>
              <i class="fas fa-home"></i>
              <span>Anasayfa</span>
            </div>
          </nuxt-link>
          <nuxt-link
            to="/getting-started"
            class="md:mr-4 md:mt-0 mt-3 p-2 md:p-0 navbar-link text-gray-300"
          >
            <div>
              <i class="fas fa-question-circle"></i>
              <span>Nasıl Kullanılır ?</span>
            </div>
          </nuxt-link>
          <div
            class="md:mr-4 p-2 md:p-0 md:mt-0 mt-3 navbar-link text-gray-300"
          >
            <div>
              <i class="fas fa-address-card"></i>
              <span>Hakkımda</span>
            </div>
          </div>
          <div class="hidden md:block">
            <at-dropdown>
              <span class="navbar-link text-gray-300"
                >İletişim <i class="icon icon-chevron-down"></i
              ></span>
              <at-dropdown-menu slot="menu" class="mt-5">
                <at-dropdown-item>
                  <a href="#" target="_blank"><i class="fab fa-github mr-2"></i>Github</a>
                  </at-dropdown-item
                >
                <at-dropdown-item
                  >
                  <a href="#"><i class="fab fa-facebook-messenger mr-2"></i
                  >Messenger</a>
                  </at-dropdown-item
                >
                <at-dropdown-item
                  ><a href="#"><i class="fab fa-linkedin mr-2"></i
                  >Linkedin</a></at-dropdown-item
                >
                <at-dropdown-item
                  ><a href="mailto:hasanmuzak@yandex.com"><i class="fas fa-paper-plane mr-2"></i>Send
                  Mail</a></at-dropdown-item
                >
              </at-dropdown-menu>
            </at-dropdown>
          </div>
          <div class="md:mt-0 mt-3 md:hidden">
            <at-collapse accordion>
              <at-collapse-item title="İletişim">
                <div class="flex flex-col">
                  <a
                    class="p-2 p-2 transition duration-300 hover:bg-gray-300 rounded hover:text-gray-700 text-gray-700"
                    href="#"
                    ><i class="fab fa-github mr-2"></i>Github</a
                  >
                  <a
                    class="mt-2 p-2 transition duration-300 hover:bg-gray-300 rounded hover:text-gray-700 text-gray-700"
                    href="#"
                    ><i class="fab fa-facebook-messenger mr-2"></i>Messenger</a
                  >
                  <a
                    class="mt-2 p-2 transition duration-300 hover:bg-gray-300 rounded hover:text-gray-700 text-gray-700"
                    href="#"
                    ><i class="fab fa-linkedin mr-2"></i>Linkedin</a
                  >
                  <a
                    class="mt-2 p-2 transition duration-300 hover:bg-gray-300 rounded hover:text-gray-700 text-gray-700"
                    href="#"
                    ><i class="fas fa-paper-plane mr-2"></i>Send Mail</a
                  >
                </div>
              </at-collapse-item>
            </at-collapse>
          </div>
          <div class="md:mt-0 mt-3 hidden justify-between" id="new-menu">
            <nuxt-link
              class="mr-4 text-gray-300 register-btn px-3 py-2 font-semibold rounded-md hover:text-gray-200"
              to="/register"
            >
              <div>
                <i class="fas fa-plus mr-2"></i>
                <span>Yeni Kayıt</span>
              </div>
            </nuxt-link>
            <nuxt-link
              class="text-gray-800 bg-yellow-400 px-3 py-2 font-semibold rounded-md hover:text-gray-800"
              to="/login"
            >
              <div>
                <i class="fas fa-sign-in-alt mr-2"></i>
                <span>Giriş Yap</span>
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="md:flex hidden md:items-center p-2">
          <nuxt-link
            class="mr-4 text-gray-300 register-btn px-3 py-2 font-semibold rounded-md hover:text-gray-200"
            to="/register"
            v-if="!this.$auth.loggedIn"
          >
            <div>
              <i class="fas fa-plus mr-2"></i>
              <span>Yeni Kayıt</span>
            </div>
          </nuxt-link>
          <nuxt-link
            v-if="this.$auth.loggedIn"
            class="mr-4 text-gray-300 register-btn px-3 py-2 font-semibold rounded-md hover:text-gray-200"
            to="/create"
          >
            <div>
              <i class="fas fa-pencil-alt mr-2"></i>
              <span>Makale Yaz</span>
            </div>
          </nuxt-link>
          <nuxt-link
            v-if="!this.$auth.loggedIn"
            class="text-gray-800 bg-yellow-400 px-3 py-2 font-semibold rounded-md hover:text-gray-800"
            to="/login"
          >
            <div>
              <i class="fas fa-sign-in-alt mr-2"></i>
              <span>Giriş Yap</span>
            </div>
          </nuxt-link>
            <div @click="$auth.logout()" v-if="this.$auth.loggedIn" class="text-yellow-400 cursor-pointer transition duration-300 px-3 py-2 font-semibold rounded-md hover:bg-yellow-400 hover:text-gray-800">
              <i class="fas fa-sign-out-alt mr-2"></i>
              <span>Çıkış Yap</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nightMode: this.$store.state.nightMode,
    };
  },
  methods: {
    showSidebar() {
      var sidebar = document.getElementById("responsive-menu");
      sidebar.classList.toggle("active");
    },
    removeActive() {
      var sidebar = document.getElementById("responsive-menu");
      sidebar.classList.remove("active");
    },
    changeStatus(){
      this.$store.state.nightMode = !this.$store.state.nightMode;
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cabin:wght@400;600&display=swap");
.sidebar-navbar {
  display: none;
}
.navbar {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.75);
  font-family: "Cabin", sans-serif;
  font-size: 14px;
  .sun-icon {
    color: #f8f536;
    &:hover {
      background-color: #f8f536;
      color: black;
    }
  }
  .moon-icon {
    color: #fef689;
    &:hover {
      background-color: #fef689;
      color: black;
    }
  }
  .toggle-icn {
    font-size: 18px;
  }
  .logo-link {
    font-weight: 800;
    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }
  }
  .bar {
    margin-left: 10px;
    div {
      width: 20px;
      height: 2px;
      border-radius: 4px;
      margin-top: 3px;
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
  .register-btn {
    transition: 0.3s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }
  }
}

@media screen and (max-width: 768px) {
  #new-menu {
    display: flex;
  }
  .bar {
    display: flex;
  }
  .middle-menu {
    margin-left: -100%;
    transition: 0.25s;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: #141920;
    width: 98%;
    border-radius: 4px;
    padding: 16px;
  }
  .middle-menu.active {
    margin-left: 0;
    .times-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 10px;
      top: 10px;
      width: 50px;
      height: 50px;
      cursor: pointer;
      font-size: 20px;
    }
    .navbar-link {
      border-radius: 4px;
      transition: 0.3s;
      &:hover {
        background-color: rgba(255, 255, 255, 0.08);
        color: #e2e8f0;
      }
    }
  }
}
</style>
