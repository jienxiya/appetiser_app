<template>
  <v-container>
    <v-row>
      <v-col>
        <div>
          <div align="center" justify="center">
            <h2>
              <b>Sign in to your account</b>
            </h2>
            <span>
              Or
              <router-link to="register">create a new account</router-link>
              <!-- <a href="register">create a new account</a> -->
            </span>
            <br>
            <br>
            <br>
          </div>
          <v-card id="loginCard" class="mx-auto" max-width="430">
            <div id="form">
              <div v-show="isError === true" style="background-color: #ff9999; padding:5px; margin-bottom:4px;">
                <span style="color: red">{{error_message}}</span>
              </div>
              <label for="email">Email address</label>
              <v-text-field name="email" label="Email address" v-model="username" outlined dense></v-text-field>
              <label for="password">Password</label>
              <v-text-field
                name="password"
                label="Password"
                v-model="password"
                :append-icon="valuePass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="() => (valuePass = !valuePass)"
                :type="valuePass ? 'password' : 'text'"
                outlined
                dense
              ></v-text-field>
            </div>
            <v-card-actions>
              <v-btn id="signIn" color="primary" @click="login()" block>Sign in</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      valuePass: true,
      isError: false,
      error_message: ""
    };
  },
  methods: {
    login() {
      let data = {
        username: this.username,
        password: this.password
      };
      axios
        .post("https://api.baseplate.appetiserdev.tech/api/v1/auth/login", data)
        .then(response => {
          if (response.data.success === true) {
            localStorage.setItem(
              "isAuthenticated",
              true
            );
            this.$router.push("success-page");
          }
        })
        .catch(error => {
          let errorObject = JSON.parse(JSON.stringify(error.response));
          console.log(errorObject.data.message)
          this.isError = true;
          this.error_message = "Username/Email or Password in incorrect";
          // this.error_message = errorObject.data.message;
        });
    }
  }
};
</script>
<style scoped>
#loginCard {
  font-family: "Nunito", sans-serif !important;
  padding: 30px;
}
a {
  color: blue !important;
}
.v-input--selection-controls {
  margin-top: 0px !important;
  padding-top: 0px !important;
}
.v-card__actions {
  padding: 0px !important;
}
.v-input__slot {
  align-items: none !important;
}
#icon {
  padding: 10px;
}
</style>