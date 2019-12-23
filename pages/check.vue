<template>
  <v-col class="mx-auto" :cols="8">
    <a>Username: <input v-model="formUsername" type="text" name="username"></a><v-btn type="submit">
        Login
      </v-btn>
    <v-card class>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-card-text>Status Update</v-card-text>   
        <v-btn class="ml-5" to="/status" text large color="primary"><v-icon >mdi-alert-circle-outline</v-icon></v-btn>
      </v-card-actions>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-card-text>Store</v-card-text>   
        <v-btn class="ml-5" to="/checkstore" text large color="primary"><v-icon >mdi-alert-circle-outline</v-icon></v-btn>
      </v-card-actions>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-card-text>Check User</v-card-text>   
        <v-btn class="ml-5" to="/checkuser" text large color="primary"><v-icon >mdi-alert-circle-outline</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { db } from '@/plugins/firebaseConfig.js'
export default {
  data() {
    return {
      formError: null,
      formUsername: '',
      dialog: false,
      UserList: [],
      valid: false,
      Nicname: '',
      Text: '',
      cards: []
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },
    addMember() {
      db.collection('store')
        .doc(this.Nicname)
        .set({
          Nicname: this.Nicname,
          Text: this.Text
        })
        .then(function(docRef) {
          //  console.log("Document written with ID: ", docRef.id);
        })
        .catch(err => {
          alert('Opps. ' + err.message)
        })
    },
    getUser() {
      db.collection('store')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            console.log(`${doc.Nickname} => ${doc.data()}`)
            this.UserList.push(doc.data())
          })
        })
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
</style>