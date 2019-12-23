<template>
<div class="d-flex justify-end">

    <v-btn @click="signin()" v-show="show1" text large color="black" class="ml-5">SignIn</v-btn>
    
    <div text large color="primary">
      <v-btn v-show="show3" text large color="white" class="ml-5">{{userName}}</v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn  text large color="white" dark v-on="on" v-show="show4">
          <v-icon>mdi-settings-outline</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item  >
          <v-btn v-show="show3" text large color="primary" class="ml-5">{{email}}</v-btn>
    
    <v-btn @click="signout(),reloadPage()" v-show="show2" text large color="error" class="ml-5">SignOut</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import {
    db
} from '@/plugins/firebaseConfig.js'

export default {
    data() {
        return {
            userList: [],
            userName: '',
            email: null,
            disableSignin: false,

            show1:true,
            show2:false,
            show3:false,
            show4:false,
            tokenG: '',
        }
    },
    methods: {
    reloadPage() {
      window.location.reload()
    },
        signout() {
            firebase.auth().signOut().then( ()=> {
                // Sign-out successful.
                console.log('Sign-out')
                this.loginUser = null
                this.userName = 'Bye'
                this.email = null
                this.show1 = true
                this.show2 = false
                this.show3 = false
                this.show4 = false
            }).catch( (error)=> {
                // An error happened.
                alert('Opps. ' + error.message)
            });
        },
        signin() {
            const provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken
                    console.log('Token: ' + token)
                    // this.tokenG = token

                    // The signed-in user info.
                    var user = result.user
                    console.log(user)

                    this.email = user.email
                    this.userName = user.displayName

                    this.show1 = false
                    this.show2 = true
                    this.show3 = true
                    this.show4 = true
                    alert('*** Log in Success ***');
                    this.$router.push('/product')
                    // this.$router.replace('/')
                })
                .catch((error) => {
                    alert('Opps. What the _uck Error  ' + error.message)
                })
        },
    }

    // watch: {
    //     loginUser: function () {
    //         if (this.loginUser != null) {
    //             this.disableSignin = true
    //             console.log(this.disableSignin)
    //         } else {
    //             this.disableSignin = false
    //         }
    //     }
    // },
    // created() {
    //     firebase.auth().onAuthStateChanged(user => {
    //         this.loginUser = user;
    //         console.log('created: ' + user)
    //     });
    // },
}
</script>

<style>

</style>
