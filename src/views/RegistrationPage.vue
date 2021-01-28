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
              <div v-show="isError === true" style="background-color: #ff9999; padding:5px; margin-bottom:4px;">
                <span style="color: red">{{error_message}}</span>
              </div>
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
                name="password"
                label="Password"
                v-model="password"
                :append-icon="valuePass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="() => (valuePass = !valuePass)"
                :type="valuePass ? 'password' : 'text'"
                outlined
                dense
              ></v-text-field>
              <label for="confirmPassword">
                Confirm Password
                <span style="color:red">*</span>
              </label>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                v-model="password_confirmation"
                :append-icon="valuePass_confirm ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="() => (valuePass_confirm = !valuePass_confirm)"
                :type="valuePass_confirm ? 'password' : 'text'"
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
export default {
  name: "RegistrationPage",
  data() {
    return {
      email: "",
      full_name: "",
      password: "",
      password_confirmation: "",
      valuePass: true,
      valuePass_confirm: true,
      error_message: "",
      isError: false,
    };
  },
  methods: {
    register() {
      let data = {
        email: this.email,
        full_name: this.full_name,
        password: this.password,
        password_confirmation: this.password_confirmation,
        error_message: "",
        isError: false
      };
      axios
        .post(
          "https://api.baseplate.appetiserdev.tech/api/v1/auth/register",
          data
        )
        .then(response => {
          if (response.data.success == true) {
            localStorage.setItem(
              "access_token",
              response.data.data.access_token
            );
            this.isError = true;
            this.$router.push("verify");
          }
        })
        .catch(error => {
          let errorObject = JSON.parse(JSON.stringify(error.response));
          this.isError = true;
          this.error_message = errorObject.data.message;
        });
    }
  }
};
</script>
<style scoped>
#regCard {
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
