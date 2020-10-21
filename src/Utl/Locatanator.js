import { ref, computed, onMounted } from 'vue'
export default {
  setup () {
    const STATUS_INITIAL = 0
    const STATUS_READY = 1
    const STATUS_ERROR = 2
    const STATUS_DONE = 3
    const fileList = ref([])
    const currentStatus = ref(0)
    const errorMessage = ref('')
    const fileUrl = ref('')
    const newName = ref('Uus video')
    const fileExtension = ref('')
    const allowedExtensions = ref(['vob'])
    const showInstructions = ref(false)
    const set = ref([
      'Otsi välja videofailid ja lisa kõik korraga siia kasti',
      'Kui veateateid ei tulnud, siis lisa uue faili nimi',
      'Vajuta nuppu "Salvesta asukohta" all paremal',
      'Otsi välja uue faili asukoht - pea meeles, et see pole veel lõplik fail',
      'Vajuta nuppu salvesta, edasi on vaja veel Handbreake programmiga vaja mp4 formaati teisendada',
      'Kui tahad uut videofaili kokku kleepida, siis alusta uuesti algusest.'
    ])


    const isInitial = computed(function () {
      return currentStatus.value == STATUS_INITIAL
    })
    const isReady = computed(function () {
      return currentStatus.value == STATUS_READY
    })
    const isError = computed(function () {
      return currentStatus.value == STATUS_ERROR
    })
    const isDone = computed(function () {
      return currentStatus.value == STATUS_DONE
    })
    const fullName = computed(function () {
      return newName.value + '.' + fileExtension.value;
    })

    function handleFile (fileList) {
        softReset();

        if (!fileList.length) return
        if (fileList.length <= 1) 
          return setError("Sisesta vähemalt kaks faili")
        // check if all files are with same extension and
        // has allowed
        let firstFileSize = fileList[0].size
        let count = 0;
        fileList.forEach(file => {
            count += 1
            // setError('Fu')
            let fn = file.name.split('.')
            let ext = fn[fn.length - 1].toLowerCase();

            if (fileExtension.value == '') {
              if (allowedExtensions.value.includes(ext)) {
                fileExtension.value = ext
              } else {
                // let message = 
                setError('Faililaiendiks võib olla ainult ' + extToString())
              }
            }
            if (!isError.value && fileExtension.value != ext) {
              setError("Veendu, et kõik failid oleksid ." + fileExtension.value + " faililaiendiga")
            }
            if (!isError.value && file.size > firstFileSize && count < 3) {
              setError("Vali uuesti. Seekord ära esimest VOB faili (VIDEO_TS.VOB) lisa")
            }
        });
      
      if (isError.value) return
      
      let blob = new Blob(fileList, {type: "octet/stream"})
      
      // let dv = new DataView(blob, 0, 10)
      // console.log(dv)
      fileUrl.value = URL.createObjectURL(blob)
      
      currentStatus.value = STATUS_READY
      
      // fileUrl.value = URL.createObjectURL(FileList[0]);
    }
    function reset () {
      currentStatus.value = STATUS_INITIAL
      fileList.value = []
      fileExtension.value = ''
      errorMessage.value = ''
      newName.value = 'Uus video'
    }
    function setError(message) {
      currentStatus.value = STATUS_ERROR
      errorMessage.value = message
    }
    function softReset() {
      currentStatus.value = STATUS_INITIAL
      fileExtension.value = ''
      errorMessage.value = ''
    }
    function setDone() {
      currentStatus.value = STATUS_DONE
    }
    function extToString() {
      let str = ''
      for (let i = 0; i < allowedExtensions.value.length; i++) {
        const ext = allowedExtensions.value[i];
        str += '.' + ext
        if (i != allowedExtensions.value.length - 1) {
          str += ', '
        }
      }
      return str
    }

    onMounted(() => {
      reset()
    })

    return {
      fileList,
      handleFile,
      isInitial,
      isReady,
      isError,
      isDone,
      errorMessage,
      fileUrl,
      showInstructions,
      set,
      setError,
      setDone,
      newName,
      fullName
    }
  }
}