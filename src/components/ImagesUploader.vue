<template>
<v-flex style="margin-right: 10px ">
  <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-file-added="vdropzoneFileAdded" @vdropzone-success="vdropzoneSuccess" @vdropzone-removed-file="vdropzoneFileRemoved">
  </vue-dropzone>
</v-flex>
</template>

<script>
import vueDropzone from 'vue2-dropzone'
export default {
  data() {
    return {
      name: 'lag',
      dropzoneOptions: {
        url: this.$store.getters.getBaseUrl + 'files/' + this.source + '/images',
        thumbnailWidth: 250,
        maxFilesize: 5,
        addRemoveLinks: true,
        dictDefaultMessage: '.عکس ها را با موس گرفته و در اینجا رها کنید، یا بر روی این محوطه کلیک کنید.',
        dictRemoveFile: 'حذف'
      },
      images: [],
      initialed: false
    }
  },
  props: {
    value: Array,
    source: String,
    initialItems: {
      type: Array,
      default: null
    }
  },
  methods: {
    vdropzoneFileAdded() {},
    vdropzoneSuccess(file, response) {
      this.images.push({
        type: 'image',
        name: file.name,
        path: response.path,
        preview_path: response.preview_path
      })
    },
    vdropzoneFileRemoved(file, error, xhr) {
      this.images = this.images.filter(image => image.name !== file.name)
    }
  },
  components: {
    vueDropzone
  },
  watch: {
    images: function() {
      this.$emit('input', this.images)

    },
    value(val) {
      this.images = val
      if (val.length === 0) {
        this.$refs.myVueDropzone.removeAllFiles()
      }
    },
    initialItems(val) {
      if (!this.initialed) {
        this.initialed = true
        this.images = val
        for (let image of val) {
          if (!image.path.startsWith('http')) {
            image.path = "https://" + image.path
          }
          console.log(image.path)
          const fileData = {
            size: 123,
            name: image.name,
          };
          const url = image.path;
          this.$refs.myVueDropzone.manuallyAddFile(fileData, url);
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.vue-dropzone {
    color: white;
    background-color: #424242;
    box-shadow: 1px 2px 5px #222;
    border: none;
}
</style>
