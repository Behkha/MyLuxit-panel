<template>
  <v-flex>
    <vddl-list class="panel__body--list" :list="images" :horizontal="false">
      <div class="hint" v-if="images.length === 0">
        <p>تعیین اولیت تصاویر</p>
        <small>تصویر اول به عنوان تصویر خبر انتخاب می شود .</small>
      </div>
      <vddl-draggable class="panel__body--item" v-for="(item, index) in images" :key="item.name" :draggable="item" :index="index" :wrapper="images" effect-allowed="move">
        {{item.name}}
        <img :src="item.path">
      </vddl-draggable>
      <vddl-placeholder class="panel__body--placeholder">محل جدید</vddl-placeholder>
    </vddl-list>
  </v-flex>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {

    },
    props: { images: Array },
    watch: {
      images: function () {
        this.$emit('input', this.images)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .panel__body--list {
    color: white;
    background-color: #424242;
    box-shadow: 1px 2px 5px #222;
    min-height: 150px;
    .hint {
      padding-top: 40px;
      direction: rtl;
      text-align: center;
      p {
        font-size: 12px;
      }
    }
    .panel__body--item {
      width: 100%;
      min-height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #111;
      padding: 7px 15px;
      background: #525252;
      box-sizing: border-box;

      img {
        width: 54px;
        height: 54px;
        float: right;
        margin-top: -7px;
        margin-right: -15px;
      }
    }
    .panel__body--item:first-child {
      background-color: #8bc34a;
    }
    .panel__body--placeholder {
      min-height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #111;
      padding: 0 15px;
      background: #222;
      box-sizing: border-box;
      text-align: center;
    }
  }
</style>
