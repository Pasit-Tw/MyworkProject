<template>
<div class="text-center">
            <v-btn :disabled="disbleGet" color="red lighten-2" dark v-on="on" @click="getUser()">
                Show
            </v-btn>
            <v-card-text v-for="get in UserList" :key="get">
                {{get.memberid}}       :____:       {{get.membername}}       :____:       {{get.tell}}       :____:       {{get.mail}}       :____:       {{get.address}}       :____:       {{get.select}}
            </v-card-text>
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
            db.collection("Addmember").get().then((querySnapshot) => {
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