<template>
  <div>
    <div
      class="flex article-container"
      :class="{ dark: this.$store.state.nightMode }"
    >
      <div class="p-8 english-article">
        <h3
          class="capitalize px-2 py-4 mb-2 font-semibold border-b-2"
          :class="{
            'text-red-600 border-red-300':
              this.$store.state.nightMode === false,
            'text-orange-300 border-orange-400':
              this.$store.state.nightMode === true,
          }"
        >
          <i class="icon icon-corner-up-right mr-2"></i>{{ title }}
        </h3>
        <div class="english-container">
          <at-popover
            placement="bottom-left"
            trigger="click"
            title="Çeviri"
            v-for="(item, index) in newData"
            :key="index"
          >
            <span class="english-sentence" @click="fetch(item)">{{
              item
            }}</span>
            <div slot="content">
              <p
                class="meaning rounded transition duration-300"
                v-for="(word, index) in meaningList"
                :key="index"
              >
                {{ index + 1 }} - {{ word }}
              </p>
              <p
                v-if="error.length !== 0"
                class="text-purple-500 meaning rounded transition duration-300"
              >
                {{ error }}
              </p>
            </div>
          </at-popover>
        </div>
      </div>
    </div>
    <div
      class="bottom-container p-2 flex flex-col items-center"
    >
      <at-button
        :disabled="didIRead === true"
        @click="sendData($auth.user.id)"
        type="primary"
        >Makaleyi Okudum<i class="icon icon-check-square ml-2"></i
      ></at-button>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      english: "",
      title: "",
      newData: [],
      meaningList: [],
      turkish: "",
      error: "",
      url: this.$route.params.id,
      didIRead: false,
    };
  },
  methods: {
    async fetch(word) {
      const newWord = word.replace(/[^a-zA-Z0-9]/g, "");
      await this.$axios
        .get("/translate/" + word)
        .then((response) => {
          if (response.status === 200) {
            this.meaningList = response.data.data;
            this.error = "";
          } else {
            this.meaningList = [];
            this.error = "Sonuç bulunamadı.";
          }
        })
        .catch(() => {
          this.meaningList = [];
          this.error = "Sonuç bulunamadı.";
        });
    },
    async fetchArticle(id) {
      await this.$axios
        .get("/articles/read/" + id)
        .then(async (response) => {
          this.english = await response.data.english.replace(
            /[.,!?](?=\S)/g,
            (match) => (match = `${match} `)
          );
          this.turkish = response.data.turkish;
          this.title = response.data.title;
          this.newData = this.english.split(" ");
        })
        .catch((err) => {
        });
    },
    sendData(id){
      this.$axios.post('/articles/user/'+id+'/'+this.$route.params.id).then(response => {
        console.log(response);
        this.didIRead = true;
      }).catch(err =>{
        this.didIRead = false;
      })
    },
    fetchReadedMount(article_id){
      this.$axios.get('/utils/did-i-read/' + article_id).then(response => {
        if(response.data.didRead === true){
          this.didIRead = true;
        }
      }).catch( err => {
        this.didIRead = false;
      })
    }
  },
  mounted() {
    this.fetchArticle(this.$route.params.id);
    this.fetchReadedMount(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Exo:wght@400;600&display=swap");

.meaning {
  font-weight: 600;
  font-size: 12px;
  padding: 4px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.at-btn {
  outline: none;
}
div {
  font-family: "Merriweather", serif;
}
.my-custom-modal {
  font-family: "Exo", sans-serif;
  font-size: 13px;
  font-weight: 600;
  .language-icn {
    font-size: 28px;
  }
}
.turkish-article {
  p {
    line-height: 36px;
  }
}
.article-container {
  .english-sentence {
    line-height: 36px;
    border-radius: 4px;
    margin: 0 3px;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      padding: 6px 10px;
      background-color: rgba(122, 255, 61, 0.35);
    }
  }
}
.article-container.dark {
  .english-article {
    &::after {
      background-color: rgba(255, 255, 255, 0.12);
    }
  }
  .english-sentence {
    color: #cfcfcf;
    white-space: nowrap;
    &:hover {
      padding: 6px 10px;
      background-color: #fbd38d;
      color: #1d1d1d;
    }
  }
}
.bottom-container {
  position: absolute;
  right: 15px;
  bottom: 10px;
  width: 400px;
}
.showIt-enter-active {
  animation: 1s animateIt;
}
@keyframes animateIt {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
