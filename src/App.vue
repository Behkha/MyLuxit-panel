<template>
  <v-app dark>
        <router-view></router-view>
  </v-app>
</template>
<style lang="scss">
  @font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 900;
    src: url('../src/assets/Fonts/IranSans/eot/IRANSansWeb_Black.eot');
    src: url('../src/assets/Fonts/IranSans/eot/IRANSansWeb_Black.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
    url('../src/assets/Fonts/IranSans/woff2/IRANSansWeb_Black.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
    url('../src/assets/Fonts/IranSans/woff/IRANSansWeb_Black.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
    url('../src/assets/Fonts/IranSans/ttf/IRANSansWeb_Black.ttf') format('truetype');
  }
  @font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: bold;
    src: url('./assets/Fonts/IranSans/eot/IRANSansWeb_Bold.eot');
    src: url('./assets/Fonts/IranSans/eot/IRANSansWeb_Bold.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
    url('./assets/Fonts/IranSans/woff2/IRANSansWeb_Bold.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
    url('./assets/Fonts/IranSans/woff/IRANSansWeb_Bold.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
    url('./assets/Fonts/IranSans/ttf/IRANSansWeb_Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 500;
    src: url('./assets/Fonts/IranSans/eot/IRANSansWeb_Medium.eot');
    src: url('./assets/Fonts/IranSans/eot/IRANSansWeb_Medium.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
    url('./assets/Fonts/IranSans/woff2/IRANSansWeb_Medium.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
    url('./assets/Fonts/IranSans/woff/IRANSansWeb_Medium.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
    url('./assets/Fonts/IranSans/ttf/IRANSansWeb_Medium.ttf') format('truetype');
  }
  @font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 300;
    src: url('./assets/Fonts/IranSans/eot/IRANSansWeb_Light.eot');
    src: url('./assets/Fonts/IranSans/eot/IRANSansWeb_Light.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
    url('./assets/Fonts/IranSans/woff2/IRANSansWeb_Light.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
    url('./assets/Fonts/IranSans/woff/IRANSansWeb_Light.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
    url('./assets/Fonts/IranSans/ttf/IRANSansWeb_Light.ttf') format('truetype');
  }
  @font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 200;
    src: url('./assets/Fonts/IranSans/eot/IRANSansWeb_UltraLight.eot');
    src: url('./assets/Fonts/IranSans/eot/IRANSansWeb_UltraLight.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
    url('./assets/Fonts/IranSans/woff2/IRANSansWeb_UltraLight.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
    url('./assets/Fonts/IranSans/woff/IRANSansWeb_UltraLight.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
    url('./assets/Fonts/IranSans/ttf/IRANSansWeb_UltraLight.ttf') format('truetype');
  }
  @font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: normal;
    src: url('./assets/Fonts/IranSans/eot/IRANSansWeb.eot');
    src: url('./assets/Fonts/IranSans/eot/IRANSansWeb.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
    url('./assets/Fonts/IranSans/woff2/IRANSansWeb.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
    url('./assets/Fonts/IranSans/woff/IRANSansWeb.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
    url('./assets/Fonts/IranSans/ttf/IRANSansWeb.ttf') format('truetype');
  }

  .application {
    font-family: IRANSans !important;
    font-weight: 300!important;
  }


  //over ride text inputs
  textarea:focus, input:focus, button:focus { outline: none !important; }
  .list__tile__title {
    text-align: right!important;
  }
  .toolbar__title {
    margin-right: 16px!important;
  }
  .input-group--text-field label {
    position: absolute!important;
    top: 18px!important;
    right: 0!important;
    left: auto!important;
  }
  .input-group label {
    text-align: right!important;
    -webkit-transform-origin: top right!important;
    transform-origin: top right!important;
  }
  .input-group.input-group--selection-controls label{
    right: 32px!important;
    left: auto!important;
  }
  .input-group.input-group--selection-controls .icon--selection-control {
    left: auto!important;
    right: 0!important;
  }
  .input-group--selection-controls__ripple {
    -webkit-transform: translate3d(12px,-52%,0)!important;
    transform: translate3d(12px,-52%,0)!important;
    left: auto!important;
    right: 0!important;
  }
  .input-group--text-field-box:not(.input-group--textarea):not(.input-group--multi-line) label {
    right: 10px!important;
  }
  .input-group--text-field-box:not(.input-group--textarea).input-group--multi-line label{
    right: 10px!important;
  }

  .input-group__prepend-icon {
    margin-right: -30px!important;
    justify-content: flex-end!important;
  }
  .input-group--text-field.input-group--textarea:not(.input-group--full-width) .input-group__input{
    padding: 10px !important;
  }
  //end over ride

  //include IranSans fonts
  .toolbar__content{
    justify-content: flex-end!important;
  }
  .list__group__header__append-icon{
    padding-left: 0!important;
    padding-right: 10px!important;
  }
  .list__group__header {
    padding-left: 10px!important;
    .list__tile{
      padding-right: 0px!important;
    }
  }
  .application.theme--light {
    background: #f2f2f2!important;
  }

  .p-datetime-picker-input-group{
    background: white!important;
    border: none!important;
    height: 56px!important;
    border-radius: 4px 4px 0 0!important;
    box-shadow: gray 0 2px !important;
    label{
      background-color: gray!important;
      border-radius:4px 0 0  0!important;
    }
    input{
      margin-top: 20px!important;
      margin-right: 10px!important;
    }
  }

  .input-group.input-group--selection-controls{
    &.switch{
      .input-group--selection-controls__toggle{
        left: auto!important;
        right: 0!important;
      }
      .input-group--selection-controls__ripple{
        transform: translate3d(15px, -24px, 0)!important;
        &:after {
          left: 0%!important;
          right: 50%!important;
          transform: translate3d(50%, -50%, 0)!important;
        }
        &--active{
          transform: translate3d(-2px, -24px, 0)!important;
        }
      }
      label {
        padding-left: 0px!important;
        padding-right: 14px!important;
      }
    }
  }


  .snack__content {
    position: relative!important;

    .btn:first-of-type{
      position: absolute!important;
      left: 5px!important;
      margin-left: 0!important;
      bottom: 7px!important;
      padding: 5px 0!important;
      width: 65px!important;
    }
  }

  .vue-dropzone{
    font-family: IRANSans!important;
  }

  .input-group--slider {
    direction: rtl!important;
    position: relative!important;
    top: 20px!important;
    label {
      margin-left: 20px!important;
    }
  }
</style>


