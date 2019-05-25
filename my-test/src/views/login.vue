<template>
  <div class="login">
    用户名
    <input type="text" v-model="user.username">
    密码
    <input type="text" v-model="user.password">
    <button @click="login">提交</button>
    <span>{{user.username}}</span>
  </div>
</template>

<script>
import axios from "@/axios.js";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      // 发送请求访问服务器的登录接口
      axios
        .post("http://127.0.0.1:12306/test", this.user)
        .then(res => {
          console.log("login 请求");
          console.log(res.data);
          //将返回的 token 存入 localStorage，并跳转页面,这个token是未解码的
          //获取未解码的token ,和解码的token
          var token = res.data.token;
          let usermsg = res.data.token;
          let str = JSON.stringify(token);
          console.log(str);
          localStorage.setItem("token", str);

          //将获取到的用户信息,存到state 里面,方便别的组件获取
          if (res.data.status == 10000) {
            this.$store.commit("saveUser", {
              name: usermsg.name,
              psd: usermsg.psd
            });
            this.$router.push("/about");
          } else if (res.data.status == 10010) {
              console.log('跳转到login')
            this.$router.push("/login");
          }
        })
        .catch(err => {
          // 弹出错误
          alert(err.data);
        });
    }
  }
};
</script>

<style>
</style>
