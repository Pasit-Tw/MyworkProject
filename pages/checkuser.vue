<template>
<div class="text-center">
            <v-btn :disabled="disbleGet" text large color="primary" dark v-on="on" @click="getUser()">
                ดูรายการที่เลือก
            </v-btn>
           <v-simple-table >
    <template v-slot:default >
      <thead>
        <tr>
          <th class="text-center">E-mail</th>
          <th class="text-center">Password</th>
        </tr>
      </thead>
      <tbody v-for="get in UserList" :key="get">
        <tr>
          <td>{{get.mail}}</td>
          <td>{{get.password}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
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
            UserList: [],
            disbleGet: false,
        }
    },
   
    methods: {
        getUser() {
            db.collection("adduser").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(`${doc.id} => ${doc.data()}`);
                this.UserList.push(doc.data());
                this.disbleGet = true
                
                });
            });
        },
    },

}
</script>

<style>

</style>  