<template>
  <div>
    <v-card class="mx-auto" max-width="1000">
      <v-card-title>CarPT</v-card-title>
      <v-card-text>
       ผลงานชิ้นนี้ เป็น ตัวอย่างโปรเจคที่เคยทำ โดยใช้ Nuxt.js + Firebase
      </v-card-text>
    </v-card>
    <br />
    <v-card class="mx-auto" max-width="1000">
      <v-container class="pa-2" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card.title" :cols="4">
            <v-card>
              <v-img
                :src="card.src"
                class="white--text"
                height="300px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <v-card-title class="fill-height align-end" v-text="card.title"></v-card-title>
              </v-img>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-card-text v-text="card.text"></v-card-text>
                <v-btn icon :href="card.link">
                  <v-icon color="blue">mdi-facebook</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col :cols="4">
            <v-card>
              <v-img
                src="https://colorlib.com/wp/wp-content/uploads/sites/2/comment-moderation-guide-wordress.png"
                class="white--text"
                height="300px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <v-card-title class="fill-height align-end">ข้อเสนอแนะ</v-card-title>
              </v-img>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-card-text>กล่องรับความคิดเห็น</v-card-text>
                <!-- get ข้อมูล -->
                <v-dialog v-model="dialogcom" width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon color="green">mdi-chat</v-icon>
                    </v-btn>
                  </template>
                  <div>
                    <v-card v-for="get in UserList" :key="get">
                      <v-container>
                        <v-row>
                          <v-col>
                            <v-card>
                              <v-card-title class="fill-height align-end">{{get.Nicname}}</v-card-title>
                              <v-divider></v-divider>
                              <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-card-text>{{get.Text}}</v-card-text>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </div>
                </v-dialog>
                <!-- add ข้อมูล -->
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-alert-circle-outline</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Comment</span>
                    </v-card-title>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="Nicname" label="Nicname*" required></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field v-model="Text" label="Text*" required></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                      <v-card-actions>
                        <v-btn
                          color="success"
                          class="mr-4"
                          @click="addcomment(),dialog = false,reloadPage()"
                        >Save</v-btn>
                        <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
                        <v-btn color="blue" class="mr-4" @click="dialog = false">Close</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { db } from '@/plugins/firebaseConfig.js'
export default {
  data() {
    return {
      dialog: false,
      UserList: [],
      valid: false,
      Nicname: '',
      Text: '',
      cards: [
        {
          title: 'นาย พสิษฐ์ ทิวารัตนอังกูร',
          text: 'เจ้าของร้าน',
          src:
            '',
          link: 'https://www.facebook.com/peerapat.audomsit'
        },
      ]
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },
    addcomment() {
      db.collection('data')
        .doc(this.Nicname)
        .set({
          Nicname: this.Nicname,
          Text: this.Text
        })
        .then(function(docRef) {
          //  console.log("Document written with ID: ", docRef.id);
          alert('Success !! สามารถดูรายการได้ที่ เมนู: รายการซ่อม')
        })
        .catch(err => {
          alert('Opps. ' + err.message)
        })
    },
    getUser() {
      db.collection('data')
        .get()
        .then(querySnapshot => {  
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            console.log(`${doc.Nicname} => ${doc.data()}`)
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
