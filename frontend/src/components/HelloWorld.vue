<template>
  <div class="hello">
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    getName () {
      this.$get('user', {id: 2}).then(res => {
        console.log('res', res)
      }).catch(err => {
        console.log('err', err)
      })
    },
    getName1 () {
      this.$post('getUserInfo', {id: 1}).then(res => {
        console.log('res', res)
      }).catch(err => {
        console.log('err', err)
      })
    }
  },
  created () {
    this.getName()
    // this.getName1()
  }
}
</script>

<style scoped>
</style>
