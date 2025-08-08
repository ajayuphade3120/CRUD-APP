<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <div>
    <input type="text" placeholder="enter name" v-model="name">
    <br><br>
    <input type="text" placeholder="enter email" v-model="email">
    <br><br>
    <button v-on:click="getdata()">store values</button>
    <br><br>
    <label for="php">php</label>
    <input type="checkbox" value="php" v-model="technology" id="php">
    <br><br>
    <label for="node">node</label>
    <input type="checkbox" value="node" v-model="technology" id="node">
    <br><br>
    <label for="java">java</label>
    <input type="checkbox" value="java" v-model="technology" id="java">
    <br><br>
    <h2 >Selected technology : {{ technology }}</h2>
    <h3 v-if="show">if condition</h3>
        <h3 v-else>else condition</h3>
        <button v-on:click="show = !show">Toggle</button>

  </div>
    <div>
      <ul v-for="item in user" :key="item.email">
        <li>
          name is : <strong>{{ item.name }}</strong> and email is <strong>{{ item.email }}</strong>
        </li>
      </ul>
    </div>
    <child :user="user" :setdata="getdata"/>
</template>

<script>
import child from './child.vue';
export default {
  name: 'HelloWorld',
  components:{child},
  props: {
    msg: String
  },
  data() {
    return {
      name: 'ajay',
      email: 'ajay@gmail.com',
      technology :[],
      show:false,
      user : [{
        name:'ajay',
        email:'ajay@gmail.com'
      },
      {
        name:'aniket',
        email:'aniket@gmail.com'
      },
      {
        name:'prachi',
        email:'prachi@gmail.com'
      }
    ]

    }
  },
  methods: {
    getdata(name) {
      console.log("values stored", this.name, this.email);
      alert(name);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
