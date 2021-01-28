<template>
  <div>
    <div>
      <template>
          <v-toolbar dense>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Appetiser Apps</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn @click="logout()" text>
              <span>Logout</span>
            </v-btn>
          </v-toolbar>
      </template>
    </div>
    <div class="body">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6" md="3">
          <h1>Login Successful</h1>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "SuccessPage",
  data(){
    return{

    }
  },
  methods: {
    logout(){
      localStorage.clear();
      this.$router.push('login');
    }
  }
};
</script>
<style scoped>
.body {
  margin-top: 15%;
}
span {
  text-transform: lowercase;
}
span:first-letter {
  text-transform: capitalize;
}
</style>
