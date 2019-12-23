<template >
  <div class="container" :cols="10">
    <h1>Status</h1>
    <v-form class="row" ref="form" v-model="valid" lazy-validation>
      <v-dialog v-model="dialogcom" width="600px">
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
        <template class="text-center" v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            :disabled="!valid"
            text
            large
            color="primary"
            class="text-center"
          >Update Status</v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="headline">Update Status</span>
          </v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-col cols="12" sm="6" md="4">
            <v-text-field 
              v-model="memberid"
              :counter="10"
              :rules="nameRules"
              label="รหัสลูกค้า"
              required
            ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="status"
              :items="status"
              :rules="[v => !!v || 'Status is required']"
              label="Status"
              required
            ></v-select>
            </v-col>
            <v-card-actions>
                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="addstatus(),dialog = false">
                          Update</v-btn>
                        <v-btn color="blue" class="mr-4" @click="dialog = false">Close</v-btn>
                      </v-card-actions>
            
          </v-form>
        </v-card>
      </v-dialog>
    </v-form>

    <div class="text-center">
      <v-btn
        :disabled="disbleGet"
        text
        large
        color="primary"
        dark
        v-on="on"
        @click="getUser()"
      >ดูรายการที่เลือก</v-btn>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">Member id</th>
              <th class="text-center">รายการที่เลือก</th>
              <th class="text-center">วันที่</th>
              <th class="text-center">สถานะ</th>
            </tr>
          </thead>
          <tbody v-for="get in UserList" :key="get">
            <tr>
              <td>{{get.memberid}}</td>
              <td>{{get.select}}</td>
              <td>{{get.date}}</td>
              <td>{{get.status}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import { db } from '@/plugins/firebaseConfig'
export default {
  data() {
    return {
      dialog: false,
      UserList: [],
      valid: false,
      memberid: '',
      status: '',
      valid: true,
      status: ['ซ่อม', 'เสร็จสิ้น', 'รออะไหล่'],
      UserList: []
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },
    getUser() {
      db.collection('Addservice')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            console.log(`${doc.id} => ${doc.data()}`)
            this.UserList.push(doc.data())
            this.disbleGet = true
          })
        })
    },
    addstatus() {
      db.collection('Addservice')
        .doc(this.memberid)
        .update({
          memberid: this.memberid,
          status: this.status,
        })
        .then(docRef => {
          alert('Status Update');
          window.location.reload()
        })
        .catch(error => {
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>


<style>
.containered {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  text-align: center;
}
</style>