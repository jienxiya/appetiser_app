<template>
  <v-container>
    <v-row>
      <v-col>
        <div>
          <div align="center" justify="center">
            <h2>
              <b>Create a new account</b>
            </h2>
            <span>
              Or
              <router-link to="login">sign in to your account</router-link>
            </span>
            <br>
            <br>
            <br>
          </div>
          <v-card id="regCard" class="mx-auto" max-width="430">
            <div id="form">
              <label for="email">
                Email address
                <span style="color:red">*</span>
              </label>
              <v-text-field
                type="email"
                name="email"
                label="Email address"
                v-model="email"
                outlined
                dense
              ></v-text-field>
              <label for="name">
                Full Name
                <span style="color:red">*</span>
              </label>
              <v-text-field name="name" label="Full Name" v-model="full_name" outlined dense></v-text-field>
              <label for="password">
                Password
                <span style="color:red">*</span>
              </label>
              <v-text-field
                type="password"
                name="password"
                label="Password"
                v-model="password"
                outlined
                dense
              ></v-text-field>
              <label for="confirmPassword">
                Confirm Password
                <span style="color:red">*</span>
              </label>
              <v-text-field
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                v-model="password_confirmation"
                outlined
                dense
              ></v-text-field>
            </div>
            <v-card-actions>
              <v-btn id="signIn" color="primary" @click="register()" block>Register</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
// import swal from "sweetalert2";
export default {
  name: "RegistrationPage",
  data() {
    return {
      email: "",
      full_name: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    register() {
      let data = {
        email: this.email,
        full_name: this.full_name,
        password: this.password,
        password_confirmation: this.password_confirmation
      };
      axios
        .post(
          "https://api.baseplate.appetiserdev.tech/api/v1/auth/register",
          data
        )
        .then(response => {
          console.log("response.data.success: ", response.data.success);
          if (response.data.success == true) {
            console.log(
              "response.data.data.access_token: ",
              response.data.data.access_token
            );
            localStorage.setItem(
              "access_token",
              response.data.data.access_token
            );
            this.$router.push("verify");
          } else {
            console.log('ressss: ', response.message)
          }
        });
    }
  }
};
</script>
<style scoped>
#regCard {
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
