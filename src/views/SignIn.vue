<template>
  <div class="signin">
    <form ref="form" @submit="validateForm" id="signin" class="sign-in-window">
      <h1>Create a new account!</h1>
      {{ user }}
      <div class="input-group">
        <label for="mail">Email adress</label>
        <input
          @keyup="checkInputStatus($event.target.value)"
          v-model="form.email"
          type="email"
          id="mail"
          required
        >
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input v-model="form.password" type="password" id="password" required>
      </div>
      <button type="submit">Sign up</button>
    </form>
  </div>
</template>

<script>
import { close, closeSync } from "fs";

// @ is an alias to /src

export default {
  created() {
    this.$emit("created");
  },
  name: "signin",
  components: {},
  data() {
    return {
      user: "null",
      form: {
        email: null,
        password: null
      },
      file: null
    };
  },
  watch: {},
  methods: {
    checkInputStatus: function(el) {
      console.log(el);
    },
    validateForm: function(e) {
      localStorage.email = this.email;
      localStorage.password = password;
    },
    getUser: function() {
      let user;
      fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(res => res.json())
        .then(data => {
          user = data;
          console.log(user);
          return user;
        })
        .finally(() => user);
    }
  },
  mounted: function() {
    console.log(this.getUser());
    console.log(auth);
  }
};
</script>


<style lang="scss" scoped>
.signin {
  height: 100vh;
  width: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.sign-in-window,
.dragdrop {
  width: 480px;
  max-width: 100%;
  padding: 3rem;
  border: 1px solid rgb(240, 240, 240);
  background: #fff;
  &.active {
    background-color: rgb(240, 240, 240);
    box-shadow: 0px 0px 5px 0px rgba(38, 154, 255, 0.41);
  }
  img {
    max-width: 100%;
    display: block;
  }
}

.dragdrop {
  margin-top: 2rem;
  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(38, 154, 255, 0.41);
    cursor: pointer;
  }
}

.input-group {
  margin-bottom: 2rem;
}

input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  &[type="file"] {
    display: none;
  }
}

label {
  display: block;
  color: rgb(36, 123, 160);
}
</style>

