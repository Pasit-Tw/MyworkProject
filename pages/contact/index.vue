<template>
  <div>
    <v-card class="mx-auto" max-width="1000">
      <v-card-title>พวกเรา AM3T'</v-card-title>
      <v-card-text>
        ร้าน AM3T’Auto ตั้งอยู่ที่ ซอย บางเขน ตำบล หนองหาร อำเภอสันทราย เชียงใหม่ 50290 บริหารจัดการโดย
        นายพีรพัฒน์ เจ้าของร้าน มีพนักงาน 4 คน คนการบริหาร จัดการของร้านเกี่ยวกับบริการตรวจเช็คสภาพรถยนต์
        และซ่อม
        รถยนต์ การให้บริการของ ประกอบด้วย การตรวจเช็คสภาพรถและซ่อมรถเบื้อต้น 9 รายการ คือ เปลี่ยนถ่ายน้ำมันหล่อลื่น
        ตรวจเช็คสภาพรถยนต์ 30 รายการ ระบบเบรก ระบบโช้คอัพ เปลี่ยนยาง เปลี่ยนน้ำมันเกียร์ ตั้งศูนย์ถ่วงล้อ
        เปลี่ยน
        และตรวจแบตเตอรี่ ล้างแอร์ด้วยกล้อง Micro Cam
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
          title: 'นาย พีรพัฒน์ อุดมสิทธิ์',
          text: 'เจ้าของร้าน',
          src:
            'https://scontent.fcnx3-1.fna.fbcdn.net/v/t1.0-9/66627386_744620832619214_2456084396906643456_n.jpg?_nc_cat=106&_nc_eui2=AeFwug3l1Knmfjdqs5boEt3QsIx0dcyjW5eExxIfdVs4zn77Rr2UQTLqJgJ8H0zIuI-DLAP_OVLupI_W0WUbHxYmFcl9Seg2riKmAvoW2YRwxw&_nc_oc=AQnw2ca-qTJ-vvlSU11U59W72gwivaf7bBoRvTDlAbkB-ysh7bWgGCGGUnIghJFzqfwCBss8moFlQRaZFmCdDqoO&_nc_ht=scontent.fcnx3-1.fna&oh=a831d46f56cd584c6d4ad153810fc881&oe=5E03E10C',
          link: 'https://www.facebook.com/peerapat.audomsit'
        },
        {
          title: 'นาย สุทัศน์ สุริยะแก้ว',
          text: 'พนักงานซ่อมรถ',
          src:
            'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/47682192_1037522036420858_6504441259250155520_n.jpg?_nc_cat=106&_nc_eui2=AeHYTOcI2yrhgto-ruCwFJwwfLJSurTVbS_pYz1VwA6gzM8K7wJnuD02-UKISFQdiXkYzcLMM578RD-zNBSZJGIIsJ0rAzAvEg-IQzkpsFwZCw&_nc_oc=AQn3NJNLvnjNbLlMoMheQSiwu8m89hcFvJ5XwekIUX7Sw2fwUrs8vmWVD_xv-ENAbug&_nc_ht=scontent.fbkk2-7.fna&oh=23c7cbe6e5225fa9633dd92a1d5163be&oe=5DF3ACEA',
          link: 'https://www.facebook.com/suthat19?ref=br_rs'
        },
        {
          title: 'นาย สุรกิจ กราบทูล',
          text: 'พนักงานตรวจสอบรถ',
          src:
            'https://scontent.fbkk2-6.fna.fbcdn.net/v/t31.0-8/27747475_1165188993584789_6978690732519602521_o.jpg?_nc_cat=111&_nc_eui2=AeH2KChyJklP9f7drlmWUlnJMt0P8hclUbrhM7XH-g4CYq-7FqoMdBJ8D9d79ADSFFZnT790fRkSeUNT8RSu5XGb44lR6utrUm-G2rBOPXFBAQ&_nc_oc=AQmR7W8FC_8rpiLgVFtduE7VpmEx1g6f1yZ0qS0njeh7iza_OF74CYUOXYcHFJA_htI&_nc_ht=scontent.fbkk2-6.fna&oh=fd795b9e34a1342584996a1803980e99&oe=5DF19C41',
          link: 'https://www.facebook.com/surakit.krabthun?ref=br_rs'
        },
        {
          title: 'นาย ทัพพ์  พุทธิเมธากุล',
          text: 'พนักงานต้อนรับ',
          src:
            'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-9/27655109_1730816393675223_7244384283838195049_n.jpg?_nc_cat=111&_nc_eui2=AeEPeHTu3L-X5h3x5N9Vs__reNH7f3G7qOUPqu3f3htQUrBtMWyzcfnKzFpLxFlGgdb7Gas1QktE6K5MeX47xmXQ9zqYq2daDoOKhOH6eI6atA&_nc_oc=AQlA6wzBK_WjoMUhW1I_P1UaM4p_OMY_L57UF59kZOBGJ2WEnDAQb-YWSBNBkmDhaaI&_nc_ht=scontent.fbkk2-6.fna&oh=30cb143d2b2596897008988d1515c9d6&oe=5E2FF175',
          link: 'https://www.facebook.com/arnontts?ref=br_rs'
        },
        {
          title: 'นาย ศราวุฒิ กาติ๊บ',
          text: 'พนักงานต้อนรับ',
          src:
            'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-1/66761314_2512706258958119_7481096648899166208_o.jpg?_nc_cat=100&_nc_eui2=AeFutxct2aNFmxtwdk5dywqXnILNIK5tWdkIlSzETsxC5DcZCvn_5pKkeF2bFHk-FMtzab-8BbRSn9Vt46Ql3nrW8sgzy5Oc9TKjZXQ99pF45Q&_nc_oc=AQn_X9DnbusLSjA94mIlQ_PKMNv6C0X7ntYCct4RwSBq8MOw3k9qI1AmQszajqPAFsE&_nc_ht=scontent.fbkk2-8.fna&oh=a2fed4817be9c26dfaba3e6ab02ec0bc&oe=5DF884E7',
          link: 'https://www.facebook.com/tup.phutthimathakul?ref=br_rs'
        }
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
