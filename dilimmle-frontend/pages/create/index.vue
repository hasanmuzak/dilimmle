<template>
  <div class="p-3 md:p-0">
    <div
      class="container mx-auto p-2 bg-white md:my-16 my-4 rounded border create-article-section"
      :class="{ dark: this.$store.state.nightMode === true }"
    >
      <div class="rules rounded p-2 border-b-2">
        <at-alert
          class="font-semibold"
          message="Lütfen yazım kurallarını okumadan makale yazmayın. Hatalı olan makaleler silinecektir."
          type="info"
          show-icon
          closable
        ></at-alert>
        <div class="p-2 rules-sub rounded">
          <p class="my-2">
            <i class="icon icon-corner-down-right mr-2"></i>Yanlış kelime
            yazmadığından emin ol.
          </p>
          <p class="my-2">
            <i class="icon icon-corner-down-right mr-2"></i>Cümlelerin çeviri
            sıralamasına dikkat et.
          </p>
          <p class="my-2">
            <i class="icon icon-corner-down-right mr-2"></i>Noktalama
            işaretlerine dikkat etmelisin.
          </p>
          <p class="my-2">
            <i class="icon icon-corner-down-right mr-2"></i>Makalenin uygunsuz
            kelime içermediğinden emin ol.
          </p>
          <p class="my-2">
            <i class="icon icon-corner-down-right mr-2"></i>Seviye seçimi
            yaparken içeriğe uygun seviye belirlemeye dikkat et.
          </p>
          <p class="my-2">
            <i class="icon icon-corner-down-right mr-2"></i>Eğer başka bir
            siteden, kitaptan ya da dergiden alıntı yapıyorsan, lütfen kaynak
            belirt.
          </p>
          <p class="my-2">
            <i class="icon icon-corner-down-right mr-2"></i>Makaleni onaylamadan
            önce Scribens üzerinde test etmeyi unutma!
            <a
              class="text-blue-400"
              href="https://www.scribens.com/index.html"
              target="_blank"
              >Scribens</a
            >
          </p>
        </div>
      </div>
      <div
        class="article-information-container p-2 flex flex-col"
        :class="{
          'dark-article-container': this.$store.state.nightMode === true,
        }"
      >
        <p class="my-2 text-gray-700">
          <i class="icon icon-layout mr-1"></i> Makale Başlığı
        </p>
        <at-input
          @blur="$v.article.title.$touch()"
          class="text-lg mb-2"
          v-model="article.title"
          placeholder="Başlık..."
          icon="layout"
        ></at-input>
        <transition name="show">
          <p v-if="!$v.article.title.maxLength" class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Makale başlığı çok uzun.
          </p>
        </transition>
        <transition name="show">
          <p v-if="!$v.article.title.minLength" class="text-red-500 error-msg my-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Makale başlığı çok kısa.
          </p>
        </transition>
        <p class="my-2 text-gray-700">
          <i class="icon icon-file-text mr-1"></i>Makale - Kısa Tanım
        </p>
        <at-textarea
          @blur="$v.article.description.$touch()"
          class="mb-2"
          min-rows="2"
          v-model="article.description"
          autosize
          placeholder="İngilizce makalenizin kısa özetini buraya yazın. (İngilizce olarak)"
        ></at-textarea>
        <transition name="show">
          <p v-if="!$v.article.description.maxLength" class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Makale tanımı çok uzun.
          </p>
        </transition>
        <transition name="show">
          <p v-if="!$v.article.description.minLength" class="text-red-500 error-msg my-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Makale tanımı çok kısa.
          </p>
        </transition>
        <p class="my-2 text-gray-700">
          <i class="icon icon-file-text mr-1"></i>Makale - İngilizce
        </p>
        <at-textarea
          @blur="$v.article.english.$touch()"
          class="mb-2"
          min-rows="4"
          v-model="article.english"
          autosize
          placeholder="İngilizce makalenizi buraya yazın..."
        ></at-textarea>
        <transition name="show">
          <p v-if="!$v.article.english.maxLength" class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Makale çok uzun.
          </p>
        </transition>
        <transition name="show">
          <p v-if="!$v.article.english.minLength" class="text-red-500 error-msg my-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Makale çok kısa.
          </p>
        </transition>
        <p class="my-2 text-gray-700">
          <i class="icon icon-file-text mr-1"></i>Makale - Türkçe
        </p>
        <at-textarea
          @blur="$v.article.turkish.$touch()"
          class="mb-2"
          min-rows="4"
          v-model="article.turkish"
          autosize
          placeholder="Makalenizin Türkçe çevirisini buraya yazın..."
        ></at-textarea>
        <transition name="show">
          <p v-if="!$v.article.turkish.maxLength" class="text-red-500 error-msg mt-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Makale çevirisi çok uzun.
          </p>
        </transition>
        <transition name="show">
          <p v-if="!$v.article.turkish.minLength" class="text-red-500 error-msg my-2">
            <i class="fas fa-exclamation-circle mr-2"></i>Makale çevirisi çok kısa.
          </p>
        </transition>
        <p class="my-2 text-gray-700">
          <i class="icon icon-star mr-1"></i>Seviye
        </p>
        <at-radio-group v-model="article.level">
          <at-radio label="easy">Kolay</at-radio>
          <at-radio label="medium">Orta</at-radio>
          <at-radio label="hard">Zor</at-radio>
        </at-radio-group>
        <transition name="show">
          <p v-if="!$v.article.level.required" class="text-red-500 error-msg mt-4">
            <i class="fas fa-exclamation-circle mr-2"></i>Makale Seviyesi seçilmedi.
          </p>
        </transition>
      </div>
      <at-button @click="submitArticle(article)" :disabled="$v.$invalid" class="mx-2 my-2" type="primary"
        >Onayla <i class="icon icon-chevrons-right ml-2"></i
      ></at-button>

    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      article: {
        title: "",
        english: "",
        turkish: "",
        description: "",
        level: null,
      },
    };
  },
  methods: {
    submitArticle(data) {
      this.$axios.post('/articles/create', {
        title : data.title,
        english : data.english,
        turkish : data.turkish,
        description : data.description,
        level : data.level
      }).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })
    },
  },

  validations: {
    article: {
      title: {
        required,
        minLength: minLength(15),
        maxLength: maxLength(40),
      },
      description: {
        required,
        minLength: minLength(80),
        maxLength: maxLength(160),
      },
      english : {
        required,
        minLength: minLength(450),
        maxLength: maxLength(6000),
      },
      turkish : {
        required,
        minLength: minLength(350),
        maxLength: maxLength(6000),
      },
      level : {
        required
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Piazzolla:wght@400;500;600;700;800&display=swap");
@import "~/assets/index.scss";
.at-btn {
  outline: none;
}
.container {
  font-family: "Piazzolla", serif;
  font-weight: 600;
  .rules {
    .rules-sub {
      background-color: rgba(255, 21, 21, 0.09);
      margin-top: 12px;
      transition: 0.3s;
      &:hover {
        background-color: rgba(255, 21, 21, 0.15);
      }
    }
    p {
      font-weight: 700;
      font-size: 13px;
      color: #a71d1d;
    }
  }
  .article-information-container {
    p {
      font-size: 16px;
    }
    .error-msg {
      font-size: 13px;
    }
  }
}

.container.dark {
  border: none;
  background-color: #292738;
  .rules {
    border-color: rgba(255, 255, 255, 0.09);
    .rules-sub {
      background-color: rgba(255, 107, 39, 0.09);
      margin-top: 12px;
      transition: 0.3s;
      &:hover {
        background-color: rgba(240, 72, 72, 0.15);
      }
    }
    p {
      font-weight: 700;
      font-size: 13px;
      color: #e78472;
    }
  }
  .article-information-container {
    p {
      color: #fff098;
    }
    .error-msg {
      color: #ff7777;

    }
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
