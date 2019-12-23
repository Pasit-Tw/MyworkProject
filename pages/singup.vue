<template>
  <v-flex xs12 sm6 offset-sm3 mt-3>
    <form>
      <v-layout column>
        <v-flex xs12 class="mx-auto" mt-5>
          <h3>Sign Up</h3>
        </v-flex>
        <v-flex class="auto" v-model="valid" lazy-validation>
          <v-text-field
            v-model="mail"
            :rules="emailRules"
            name="email"
            label="Email"
            id="email"
            type="email"
            required
          ></v-text-field>
        </v-flex>
        <v-flex class="auto">
          <v-text-field
            v-model="password"
            :counter="10"
            name="password"
            label="Password"
            id="password"
            type="password"
            required
          ></v-text-field>
        </v-flex>
        <v-flex class="mx-auto" mt-5>
          <v-btn class="mx-auto" id="singup" name="singup" primary @click="adduser()">Sign Up</v-btn>
        </v-flex>
      </v-layout>
    </form>
  </v-flex>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { db } from '@/plugins/firebaseConfig'
export default {
  data() {
    return {
      userList: [],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมล'
      ],
      password: '',
      disbleSingin: false,
      disbleSingout: false,
      userName: '',
      tokenG: '',
      drawer: null
    }
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },
    //   singin() {
    //    firebase.auth().signInWithCustomToken(token).catch((error) => {
    // // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // // ...

    //         this.email = user.email
    //         this.userName = user.displayName
    //         this.disbleSingin = true
    //         this.disbleGet = true
    //       //   this.$router.replace('/')
    //       })
    //       .catch((error) => {
    //         alert('Opps. ' + err.message)
    //       })
    //   },
    adduser() {
      var email=document.getElementById('email').value;
      var password=document.getElementById('password').value;
      if(email.lent<4){
        alert("กรุณาป้อน email")
        return;
      }
      if(password.lent<4){
        alert("กรุณาป้อน password")
        return;
      }
    }
  }
}
</script>