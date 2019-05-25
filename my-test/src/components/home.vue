<template>
  <div>
    <input type="text" v-model="msg">
    <br>
    <span>{{msg}}</span>
    <div>
      <img :src="url" alt>
    </div>
    <br>
    <button @click="Mpost">提交</button>
  </div>
</template>

<script>
import api from "@/axios.js";
import { constants } from "crypto";
const qs = require("qs");

export default {
  name: "Home",
  data() {
    return {
      msg: "",
      url: ""
    };
  },
  created() {
    //将url参数转化为对象
    console.log("created:", qs);
    let num = "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9"
     let decodedData = window.atob(num)
    // let encodedData = window.btoa("Hello, world"); // 编码
    // console.log(encodedData);
    // let decodedData = window.atob(encodedData); //解码
    console.log(decodedData);
    let data = JSON.parse( decodedData )
    console.log( data)

    // let url =
    //   "method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0";
    // qs.parse(url);
    // console.log(qs.parse(url));
  },
  updated() {
    console.log("updated", this.url);
  },
  methods: {
    Mpost() {
      //https://img3.doubanio.com
      //https://img3.doubanio.com/view/subject/l/public/s29906226.jpg
      // http://api.douban.com/v2/book/1003078
      // api.getmsg('http://api.douban.com/v2/book/1003078')
      // api.getmsg('/view/subject/l/public/s29906226.jpg')
      api.getmsg("/catimg");
    }
  }
};
</script>

<style>
</style>
