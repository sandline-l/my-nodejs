<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span> 用户名 {{this.$store.state.user.name}} </span>
    <br>
    <span> 用户密码 {{this.$store.state.user.password}} </span>
    <br>
    <input type="color" name="" id="">
    <br>
    <input type="date" name="" id="">
    <br>
    <input type="file" name="" id="" accept=".jpg" multiple>
  </div>
</template>

<script>
export default {
    created(){
      console.log(this.$store.state.user)
    }
}
</script>















