<template>
  <div class="music-player">
    <template v-if="musics.length > 0">
      <img class="music-player__bg" :src="musics[mIdx].image" />
      <div class="music-player__info">
        <div class="image" :class="{ playing: isPlaying }">
          <img :src="musics[mIdx].image" />
        </div>
        <h2 class="title">
          <div
            class="title__texts"
            :class="{ playing: isPlaying && isTextLong }"
          >
            <!-- 글자 무한 반복을 위해 두 개로 만듦 -->
            <span>{{ musics[mIdx].title }}</span>
            <span v-show="isTextLong">{{ musics[mIdx].title }}</span>
          </div>
        </h2>
        <p class="artist">{{ musics[mIdx].artist }}</p>
      </div>

      <Slider
        class="music-player__track"
        @input="trackChange"
        v-model="track"
        :max="99"
      />

      <div class="music-player__time">
        <p class="curr-time">{{ currTime }}</p>
        <p class="total-time">{{ totalTime }}</p>
      </div>

      <div class="music-player__controller">
        <button class="btn prev" @click="prev">
          <img src="~/assets/images/audio/prev.svg" />
        </button>
        <button class="btn play" @click="play">
          <img src="~/assets/images/audio/play.png" v-show="!isPlaying" />
          <img
            class="pause-img"
            src="~/assets/images/audio/pause.png"
            v-show="isPlaying"
          />
        </button>
        <button class="btn next" @click="next">
          <img src="~/assets/images/audio/next.svg" />
        </button>
      </div>

      <Slider class="music-player__volume" v-model="volume" :size="3">
        <img src="~/assets/images/audio/mute.svg" alt="mute" slot="preImg" />
        <img
          src="~/assets/images/audio/fullsound.svg"
          alt="full sound"
          slot="suImg"
        />
      </Slider>
    </template>
    <div v-else class="loader-wrapper">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      track: 0,
      volume: 10,
      mIdx: 0,
      audio: null,
      currTime: "00:00",
      totalTime: "00:00",
      isPlaying: false,
    };
  },
  computed: {
    ...mapState("notion", ["musics"]),
    isTextLong() {
      return this.musics[this.mIdx].src.length > 16;
    },
  },
  watch: {
    src(v) {
      this.audio.load();
      this.audio.play();
    },
    volume(v) {
      this.audio.volume = v / 100;
    },
    mIdx(v) {
      this.audio.src = this.musics[v].src;
      this.audio.load();
      this.audio.play();
      this.isPlaying = true;
    },
  },
  methods: {
    toStringFrom(time) {
      let min = Math.floor(time / 60);
      let sec = Math.floor(time - min * 60);

      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }

      return `${min}:${sec}`;
    },
    prev() {
      this.mIdx = this.mIdx - 1 < 0 ? this.musics.length - 1 : this.mIdx - 1;
    },
    next() {
      this.mIdx = (this.mIdx + 1) % this.musics.length;
    },
    play() {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    updateTime() {
      this.currTime = this.toStringFrom(this.audio.currentTime);
      this.totalTime = this.toStringFrom(this.audio.duration);
      this.track = (100 / this.audio.duration) * this.audio.currentTime;
    },
    trackChange() {
      this.audio.currentTime = (this.audio.duration * this.track) / 100;
    },
  },
  async mounted() {
    await this.$store.dispatch("notion/getMusics");
    this.audio = new Audio(this.musics[this.mIdx].src);
    this.audio.ontimeupdate = this.updateTime;
    this.audio.onloadedmetadata = this.updateTime;
    this.audio.onended = this.next;
    this.audio.volume = this.volume / 100;
    this.isFirstTime = false;
  },
};
</script>
