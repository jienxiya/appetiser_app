<template>
  <v-container>
    <v-row>
      <v-col>
        <div>
          <v-card id="loginCard" class="mx-auto" max-width="430">
            <div v-if="isError !== true" id="form">
              <label for="verification_code">Verification Code</label>
              <v-text-field
                name="verification_code"
                label="Verification Code"
                v-model="verification_code"
                outlined
                dense
              ></v-text-field>
            </div>
            <div v-else id="form">
              <label style="color:red" for="verification_code">{{error_message}}</label>
              <v-text-field
                name="verification_code"
                label="Verification Code"
                v-model="verification_code"
                error
                outlined
                dense
              ></v-text-field>
            </div>
            <v-card-actions>
              <v-btn id="submit" color="primary" @click="verify()" block>Submit</v-btn>
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
  name: "VerificationPage",
  data() {
    return {
      verification_code: "",
      error_message: "",
      isError: false,
    };
  },
  beforeCreate() {
    let config = {};
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
      Accept: "application/json"
    };
    this.config = config;
  },
  methods: {
    verify() {
      let data = {
        token: this.verification_code,
        via: "email"
      };
      axios
        .post(
          "https://api.baseplate.appetiserdev.tech/api/v1/auth/verification/verify",
          data,
          this.config
        )
        .then(response => {
          if (response.data.success === true) {
            this.$router.push("login");
            localStorage.clear();
          }
        })
        .catch(error=>{
          let errorObject = JSON.parse(JSON.stringify(error.response));
          this.isError = true;
          this.error_message = errorObject.data.message;
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

