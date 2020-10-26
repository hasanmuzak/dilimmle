<template>
  <div class="main-section">
    <div class="container mx-auto p-2">
      <div
        v-if="!this.$auth.loggedIn"
        class="hover:shadow-lg transition duration-300 rounded p-8 mt-8 md:mt-36 lg:mt-48"
      >
        <div class="text-left pb-4 border-b-2 border-gray-600">
          <span class="title text-red-500">Dilimmle </span>
          <span
            :class="{
              'text-gray-200': this.$store.state.nightMode === true,
              'text-gray-700': this.$store.state.nightMode === false,
            }"
            class="title title-sub"
            >ile İngilizce'ni Geliştir!</span
          >
        </div>
        <div class="text-left py-4">
          <p
            class="info"
            :class="{ 'text-gray-200': this.$store.state.nightMode }"
          >
            Dilimmle, ücretsiz bir platformdur. Kelime haznenizi büyütmenizi ve
            pratik yapmanızı sağlar.
          </p>
        </div>
        <div class="py-2">
          <nuxt-link to="/register">
            <button class="mr-4 index-btn getting-started-btn">
              Hemen Başla<i class="fas fa-arrow-right ml-2"></i>
            </button>
          </nuxt-link>
          <nuxt-link to="/getting-started"><button
            class="index-btn usage-btn"
            :class="{ 'dark-usage-btn': this.$store.state.nightMode }"
          >
            Nasıl Kullanılır<i class="far fa-question-circle ml-2"></i>
          </button></nuxt-link>
        </div>
      </div>
      <div v-if="this.$auth.loggedIn" class="flex mt-24 md:flex-row flex-col">
        <div
          class="p-2 md:ml-1 md:mt-0 mt-4 border rounded articles-container"
          :class="{
            'border-gray-400 bg-white': this.$store.state.nightMode === false,
            'articles-dark-container': this.$store.state.nightMode === true,
          }"
        >
          <div v-if="loading === true" class="loading-container">
            <div class="grid md:grid-cols-2">
              <div class="p-2 mt-12">
                <div class="loading1 rounded"></div>
                <div class="loading2 rounded flex flex-col">
                  <div class="mt-2 loading-inner"></div>
                  <div class="mt-2 flex loading-upper">
                    <div class="loading-inner mr-2"></div>
                    <div class="loading-inner mr-2"></div>
                    <div class="loading-inner ml-2"></div>
                  </div>
                  <div class="mt-2 loading-inner"></div>
                  <div class="mt-2 loading-upper flex w-full">
                    <div class="loading-inner-inner mr-2 rounded"></div>
                    <div class="loading-inner-inner ml-2 rounded"></div>
                  </div>
                  <div class="mt-2 loading-upper flex w-full">
                    <div class="loading-inner-inner rounded"></div>
                  </div>
                </div>
                <div class="loading3 rounded"></div>
              </div>
              <div class="p-2 mt-12">
                <div class="loading1 rounded"></div>
                <div class="loading2 rounded flex flex-col">
                  <div class="mt-2 loading-inner"></div>
                  <div class="mt-2 flex loading-upper">
                    <div class="loading-inner mr-2"></div>
                    <div class="loading-inner mr-2"></div>
                    <div class="loading-inner ml-2"></div>
                  </div>
                  <div class="mt-2 loading-inner"></div>
                  <div class="mt-2 loading-upper flex w-full">
                    <div class="loading-inner-inner mr-2 rounded"></div>
                    <div class="loading-inner-inner ml-2 rounded"></div>
                  </div>
                  <div class="mt-2 loading-upper flex w-full">
                    <div class="loading-inner-inner rounded"></div>
                  </div>
                </div>
                <div class="loading3 rounded"></div>
              </div>
              <div class="p-2 mt-4">
                <div class="loading1 rounded"></div>
                <div class="loading2 rounded flex flex-col">
                  <div class="mt-2 loading-inner"></div>
                  <div class="mt-2 flex loading-upper">
                    <div class="loading-inner mr-2"></div>
                    <div class="loading-inner mr-2"></div>
                    <div class="loading-inner ml-2"></div>
                  </div>
                  <div class="mt-2 loading-inner"></div>
                  <div class="mt-2 loading-upper flex w-full">
                    <div class="loading-inner-inner mr-2 rounded"></div>
                    <div class="loading-inner-inner ml-2 rounded"></div>
                  </div>
                  <div class="mt-2 loading-upper flex w-full">
                    <div class="loading-inner-inner rounded"></div>
                  </div>
                </div>
                <div class="loading3 rounded"></div>
              </div>
              <div class="p-2 mt-4">
                <div class="loading1 rounded"></div>
                <div class="loading2 rounded flex flex-col">
                  <div class="mt-2 loading-inner"></div>
                  <div class="mt-2 flex loading-upper">
                    <div class="loading-inner mr-2"></div>
                    <div class="loading-inner mr-2"></div>
                    <div class="loading-inner ml-2"></div>
                  </div>
                  <div class="mt-2 loading-inner"></div>
                  <div class="mt-2 loading-upper flex w-full">
                    <div class="loading-inner-inner mr-2 rounded"></div>
                    <div class="loading-inner-inner ml-2 rounded"></div>
                  </div>
                  <div class="mt-2 loading-upper flex w-full">
                    <div class="loading-inner-inner rounded"></div>
                  </div>
                </div>
                <div class="loading3 rounded"></div>
              </div>

            </div>
          </div>
          <p class="p-2 rounded font-semibold main-title">
            <i class="icon icon-corner-down-right mr-2"></i>Makaleler
          </p>
          <div class="grid mt-2 md:grid-cols-3">
            <div v-for="(article,index) in articles" :key="index" class="p-2">
              <div class="article-body">
                <div
                  class="p-2 flex justify-between transition duration-300 items-center rounded article-top-container"
                >
                  <nuxt-link :to="'/articles/read/'+article._id">
                    <h3 class="article-title text-gray-200">
                      {{article.title}}
                    </h3>
                  </nuxt-link>
                  <span
                    v-if="checkIfRead(article._id) === false"
                    class="text-xs not-read rounded text-red-400 flex items-center p-2"
                    ><i class="icon icon-x mr-1"></i>Okunmadı</span
                  >
                  <span
                    v-if="checkIfRead(article._id) === true"
                    class="text-xs read rounded text-green-600 flex items-center p-2"
                    ><i class="fas fa-check mr-1"></i>Okundu</span
                  >
                </div>
                <p class="p-2 article-info transition duration-300">
                  {{article.description}}
                </p>
                <div
                  class="p-2 article-bottom flex justify-between transition duration-300"
                >
                  <div>
                    <span class="author-icon"
                      ><i class="icon icon-edit mr-1"></i>Yazar :</span
                    >
                    <span class="ml-2 author">
                      <span class="capitalize">{{article.author_firstname}} </span>
                      <span class="capitalize">{{article.author_lastname}}</span>
                      </span>
                  </div>
                </div>
              </div>
            </div>
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
      loading : false,
      articles : {},
      whatUserRead : []
    };
  },
  methods: {
    async fetchDoneArticles(){
      this.$axios.get('/utils/what-i-read/').then(response => {
        response.data.forEach(element => {
          this.whatUserRead.push(element.article);
        });
      }).catch(err => {
      })
    },
    checkIfRead(article_id){
      if(this.whatUserRead.includes(article_id)){
        return true;
      }
      else{
        return false;
      }
    },
    async fetchArticles(){
      await this.$axios.get('/articles/all').then(response => {
        this.articles = response.data;
      }).catch(err => {
        this.loading = false;
      })
    }
  },

  mounted() {
    this.fetchArticles();
    this.fetchDoneArticles();
  },

};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap");

.at-btn {
  outline: none;
}
.icon {
  font-size: 16px;
}
.articles-container {
  font-family: "Lato", sans-serif;
  position: relative;
  .loading-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 4px;
    background-color: rgb(255, 255, 255);
    .loading1 {
      height: 50px;
      background-color: rgba(0, 0, 0, 0.055);
      position: relative;
      overflow: hidden;
      &::after {
        position: absolute;
        left: 0;
        width: 200px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.03);
        content: "";
        border-radius: 4px;
        animation: animateIt 0.75s alternate-reverse linear infinite;
      }
    }
    .loading2 {
      height: 112px;
      .loading-inner {
        background-color: rgba(0, 0, 0, 0.055);
        height: 6px;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
        &::after {
          position: absolute;
          left: 0;
          width: 200px;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.03);
          content: "";
          border-radius: 4px;
          animation: animateIt 0.75s alternate-reverse linear infinite;
        }
      }
      .loading-upper {
        .loading-inner {
          width: 100%;
        }
        .loading-inner-inner {
          background-color: rgba(0, 0, 0, 0.055);
          height: 28px;
          width: 100%;
          position: relative;
          overflow: hidden;
          &::after {
            position: absolute;
            left: 0;
            width: 200px;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.03);
            content: "";
            border-radius: 4px;
            animation: animateIt 0.75s alternate-reverse linear infinite;
          }
        }
      }
    }
    .loading3 {
      height: 35px;
    }
  }
  .main-title {
    font-size: 13px;
    font-weight: 600;
    color: #272727;
    background-color: #00000021;
  }
  .article-title {
    font-size: 14px;
  }
  .article-body {
    border-color: #474747;
    .article-top-container {
      background-color: rgba(18, 11, 48, 0.85);
      font-weight: 700;
      &:hover {
        background-color: rgba(18, 11, 48, 1);
        .not-read {
          background-color: rgb(185, 69, 69);
          color: white;
        }
        .read {
          background-color: rgb(50, 160, 40);
          color: white;
        }
      }
      .not-read {
        background-color: rgba(255, 0, 0, 0.137);
      }
      .read {
        background-color: rgba(21, 255, 0, 0.11);
      }
    }
    .article-info {
      background-color: rgba(0, 0, 0, 0.04);
      color: #141414;
      font-size: 13px;
      line-height: 24px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.15);
      }
    }
    .article-bottom {
      background-color: rgb(211, 211, 211);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      .author-icon {
        color: #3a44cf;
      }
      .author {
        color: #151a64;
      }
      .score-icon {
        color: #151a64;
      }
      .score {
        color: #151a64;
      }
      &:hover {
        background-color: #10152ba1;
        .author-icon {
          color: #70cbf5;
        }
        .author {
          color: #dfdfdf;
        }
        .score-icon {
          color: #fffb00;
        }
        .score {
          color: #dfdfdf;
        }
      }
    }
  }
}
.articles-dark-container {
  border-color: #535353;
  position: relative;
  .loading-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 4px;
    background-color: #1a202c;
    .loading1 {
      height: 50px;
      background-color: rgba(255, 255, 255, 0.055);
      position: relative;
      overflow: hidden;
      &::after {
        position: absolute;
        left: 0;
        width: 200px;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.03);
        content: "";
        border-radius: 4px;
        animation: animateIt 0.5s alternate-reverse linear infinite;
      }
    }
    .loading2 {
      height: 112px;
      .loading-inner {
        background-color: rgba(255, 255, 255, 0.055);
        height: 6px;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
        &::after {
          position: absolute;
          left: 0;
          width: 200px;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.03);
          content: "";
          border-radius: 4px;
          animation: animateIt 0.5s alternate-reverse linear infinite;
        }
      }
      .loading-upper {
        .loading-inner {
          width: 100%;
        }
        .loading-inner-inner {
          background-color: rgba(255, 255, 255, 0.055);
          height: 28px;
          width: 100%;
          position: relative;
          overflow: hidden;
          &::after {
            position: absolute;
            left: 0;
            width: 200px;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.03);
            content: "";
            border-radius: 4px;
            animation: animateIt 0.5s alternate-reverse linear infinite;
          }
        }
      }
    }
    .loading3 {
      height: 35px;
    }
  }
  .main-title {
    font-size: 13px;
    font-weight: 900;
    color: #e7e7e7;
    background-color: #63636325;
  }
  .article-body {
    border-color: #474747;
    .article-top-container {
      background-color: rgba(255, 255, 255, 0.05);
      font-weight: 700;
      &:hover {
        background-color: rgba(255, 255, 255, 0.267);
        .not-read {
          background-color: transparent;
        }
        .read {
          background-color: transparent;
        }
      }
      .not-read {
        background-color: rgba(255, 0, 0, 0.137);
      }
      .read {
        background-color: rgba(21, 255, 0, 0.11);
      }
    }
    .article-info {
      background-color: rgba(255, 255, 255, 0.08);
      color: #c5c5c5;
      font-size: 13px;
      line-height: 24px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }
    }
    .article-bottom {
      background-color: rgba(255, 255, 255, 0.05);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      .author-icon {
        color: #66bffa;
      }
      .author {
        color: #fa6697;
      }
      .score-icon {
        color: #f5f129;
      }
      .score {
        color: #e4e4e4;
      }
      &:hover {
        background-color: #10152ba1;
      }
    }
  }
}
.filter-dark-container {
  border-color: #535353;
  label {
    color: #a0a0a0;
  }
  h3 {
    color: #e0e0e0;
    border-color: #858585;
  }
}
.filter-title {
  font-family: "Raleway", sans-serif;
  font-size: 13px;
}
.at-checkbox + .at-checkbox {
  margin-left: 0;
}
.title {
  font-family: "Raleway", sans-serif;
  font-size: 88px;
  font-weight: 900;
}
.title-sub {
  font-size: 48px;
}
.info {
  font-family: "Raleway", sans-serif;
  font-size: 24px;
  font-weight: 600;
}
.getting-started {
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-weight: 600;
}
.index-btn {
  border-radius: 6px;
  padding: 10px 16px;
  font-family: "Raleway", sans-serif;
  font-size: 12px;
  transition: 0.3s;
  outline: none;
}
.getting-started-btn {
  background-color: #2a3e64;
  color: white;
  &:hover {
    background-color: #405c8f;
  }
}
.usage-btn {
  background-color: #d3424911;
  color: #2a3e64;
  &:hover {
    background-color: #d34249ce;
    color: #ffffff;
  }
}
.dark-usage-btn {
  color: #e7e7e7;
}

@keyframes animateIt {
  0% {
    left: 0;
  }
  100% {
    left: 100%;
  }
}
@media screen and (max-width: 470px) {
  .title {
    font-size: 48px;
  }
}
</style>
