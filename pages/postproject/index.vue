<template>
<div>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="memberid" :counter="10" :rules="nameRules" label="รหัสลูกค้า" required></v-text-field>

        <v-text-field v-model="membername" :rules="nameRules" label="ชื่อลูกค้า" required></v-text-field>

        <v-text-field v-model="tell" :rules="tellRules" label="เบอร์โทร" required></v-text-field>

        <v-text-field v-model="mail" :rules="emailRules" label="อีเมล" required></v-text-field>

        <v-text-field v-model="address" :rules="addRules" label="บ้านเลขที่" required></v-text-field>

        <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="จังหวัด" required></v-select>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="addMember(),reloadPage()">Add Member</v-btn>

        <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

        <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
    </v-form>
</div>
</template>

<script>
import {db} from '@/plugins/firebaseConfig'


export default {
    data: () => ({
        memberid: '',
        membername: '',
        tell: '',
        address: '',
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'ใส่ชื่อได้ไม่เกิน 10 ตัวอักษร',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมล',
        ],
        name: '',
        nameRules: [
            v => !!v || 'เบอร์โทร',
            v => (v && v.length <= 10) || 'กรุณาใส่หมสยเลขโทรศัพท์',
        ],
        select: null,
        items: [
            'เชียงใหม่',
            'เชียงราย',
            'แม่ฮ่องสอน',
            'พะเยา',
            'เพชรบูร',
        ],
    }),

    methods: {
         reloadPage() {
      window.location.reload()
    },
        addMember() {
            // console.log(this.memberid)
            // console.log(this.membername)
            // console.log(this.tell)
            // console.log(this.mail)
            // console.log(this.address)
            // console.log(this.select)
            // db.collection("newmem").add({
                db.collection("Addmember").doc(this.memberid).set({
             memberid: this.memberid,
             membername: this.membername,
             tell: this.tell,
             mail: this.mail,
             address: this.address,
             select: this.select,
        })
        .then(function(docRef) {
            //  console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
              console.error("Error adding document: ", error);
        });

        },

        validate() {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        },
        reset() {
            this.$refs.form.reset()
        }, 
    },
}

</script>

