<template>

</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Logout',
  created () {
    this.logoutRequest()
    this.$router.push('/login')
  },
  methods: {
    ...mapActions('user', [
      'logoutRequest'
    ])
  }
}
</script>
