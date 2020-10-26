<template>
  <div>
    <img class="code-img" alt="图片验证码" :src="codeSrc" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      codeSrc: '',
    }
  },
  methods: {
    //  getImg() {
    //     const res =  this.$http.get('captcha/getcaptcha', {
    //       responseType: 'arraybuffer',
    //       codeSrc: true,
    //     })
    //     console.log(res)
    //     this.codeSrc ='data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte),''))
    //     console.log(this.codeSrc)
    //   },
    getImg() {
      this.$http
        .get('captcha/getcaptcha', { responseType: 'arraybuffer' })
        .then((res) => {
          let path =
            'data:image/png;base64,' +
            btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            )
          this.codeSrc = path
        })
    },
  },
  created() {
    this.getImg()
  },
}
</script>

<style>
.code-img {
  width: 110px;
  height: 40px;
}
</style>