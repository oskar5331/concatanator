<template>
    <div class="container">
      <h1>Lokatonator</h1>
      <p>Selle lihtsa programmi abil saad sa kokku lõigata .vob laiendiga video faile.<br />
      Juhiste nägemiseks vajuta <a @click="showInstructions = !showInstructions" class="instructions">siia</a></p>
      <transition name="slide">
        <ol v-show="showInstructions">
          <li v-for="(tip,key) in set" :key='key'>{{tip}}</li>
        </ol>
      </transition>
      <div class="dropbox" :class="{error: isError}">
        <input type="file" multiple
          @change="handleFile($event.target.files); fileCount = $event.target.files.length"
          class="input-file">
          <p v-if="isInitial">
            Lohista video failid sellesse kasti<br> või otsi need üles klikates siia
          </p>
          <p v-if="isReady">
            {{ fileCount }} faili sisestatud
          </p>
          <p class="error_text" v-if="isError">
            {{ errorMessage }}
          </p>
          <p v-if="isDone">
            Fail on töötlemisel/allalaadimisel. <br> Kui tahad, võid juba järgmise video välja valida.
          </p>
      </div>
      <div class="bottom">
        <label for="newfname"> Uue faili nimi:
        <input id="newfname" type="text" v-model="newName" class="input-text">
        </label>

        <a class="readyButton"
          v-if="isReady"
          @click="setDone()"
          :href="fileUrl"
          :download="fullName">Salvest asukohta</a>
        <a class="readyButton"
          v-if="isDone"
          @click="reset()">Nulli andmed</a>
      </div>
    </div>
</template>
<script lang="ts" src="../Utl/Locatanator.js"></script>

<style lang="scss">
.container{
  width: 50rem;
  height: 100%;
  margin: 0 auto;
  background-color: #fdfbfb;
  padding: 2rem 1rem;
}
.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    height: 20rem; /* minimum height */
    position: relative;
    cursor: pointer;
    margin: 2rem auto;
  }
  .readyButton:hover{
    background: #4191a1;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
  }
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 20rem;
    position: absolute;
    cursor: pointer;
  }
  .input-text {
    font-size: 1.2rem;
    margin: 1rem 0rem;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    text-align: center;
    padding: 50px 0;
  }
  .readyButton{
    display: inline-block;
    background: #4E9CAF;
    padding: 1rem;
    text-align: center;
    border-radius: 0.5rem;
    color: white;
    font-weight: bold;
    line-height: 1.5rem;
    margin: 1rem;
    cursor: pointer;
  }
  a.instructions:hover{
    text-decoration: underline;
    font-weight: bold;
  }
  a.instructions{
    cursor: pointer;
  }

  .fade-enter-active { transition-duration: 2s; }
  .fade-leave-active { transition-duration: 6s; }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
.error {
    background: #fdfbfb;
    // background: #ff7301;
    outline: 2px dashed  #f02d13
}
p.error_text {
  color: #f02d13;
}
.error:hover {
  background: #e6e7e6;
  opacity: 75%;
}
</style>
