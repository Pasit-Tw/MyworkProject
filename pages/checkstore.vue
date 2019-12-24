<template >

  <div class="container" :cols="10">
      
    <h1>Store</h1>
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
                  <template v-slot:activator="{ on }">
                      <v-btn v-on="on"
        :disabled="!valid" color="success" class="mr-4" >Update Item</v-btn>
                  </template>
                  
                  <v-card>
                    <v-card-title>
                      <span class="headline">Update Item</span>
                    </v-card-title>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="itemid" label="ItemId" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="price" label="Price" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="amount" label="Amount" required></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                      <v-card-actions>
                        <v-btn
                          color="success"
                          class="mr-4"
                          @click="updateitem(),dialog = false"
                        >Save</v-btn>
                        <v-btn color="blue" class="mr-4" @click="dialog = false">Close</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <!-- add ข้อมูล -->
                <v-dialog v-model="dialog1" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                      <v-btn v-on="on"
        :disabled="!valid" color="success" class="mr-4" >New Item</v-btn>
                  </template>
                  
                  <v-card>
                    <v-card-title>
                      <span class="headline">New Item</span>
                    </v-card-title>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="nameitem" label="NameItem" required></v-text-field>
                          </v-col>
                            <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="itemid" label="ItemId" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="price" label="Price" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="amount" label="Amount" required></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                      <v-card-actions>
                        <v-btn
                          color="success"
                          class="mr-4"
                          @click="additem(),dialog1 = false"
                        >Save</v-btn>
                        <v-btn color="blue" class="mr-4" @click="dialog1 = false">Close</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
    </v-form>
    
    <div class="text-center">
            
           <v-simple-table >
    <template v-slot:default >
      <thead>
        <tr>
          <th class="text-center">Name Item</th>
          <th class="text-center">Item Id</th>
          <th class="text-center">Price</th>
          <th class="text-center">Amount</th>
        </tr>
      </thead>
      <tbody v-for="get in UserList" :key="get">
        <tr>
          <td>{{get.nameitem}}</td>
          <td>{{get.itemid}}</td>
          <td>{{get.price}}</td>
          <td>{{get.amount}}</td>
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
        dialog1: false,
      UserList: [],
      valid: false,
    
      pricre: '',
      amount: '',
      itemid: '',
      nameitem: '',
      valid: true,
      status: ['ซ่อม',
              'เสร็จสิ้น',
              'รออะไหล่',],
              UserList: [],
    }
  },
    mounted(){
     this.getUser()
  },
 methods: {
    reloadPage() {
      window.location.reload()
    },
   getUser() {
            db.collection("store").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(`${doc.id} => ${doc.data()}`);
                this.UserList.push(doc.data());
                this.disbleGet = true
                
                });
            });
        },
   additem() {
      db.collection("store").doc(this.nameitem).set({
        itemid: this.itemid,
        nameitem: this.nameitem,
        price: this.price,
        amount: this.amount,
        })
        .then((docRef) => {
            console.log("Error adding document: ");
        })
        .catch((error) => {
              console.error("Error adding document: ", error);
        });

        },
        updateitem() {
      db.collection("store").doc(this.itemid).update({
        itemid: this.itemid,
        nameitem: this.nameitem,
        price: this.price,
        amount: this.amount,
        })
        .then((docRef) => {
            alert("บันทึกสำเร็จ")
        })
        .catch((error) => {
              console.error("Error adding document: ", error);
        });
        
 },
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