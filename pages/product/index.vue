<template >
  <div class="container" :cols="10">
    <h1>Services</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="memberid"  label="ทะเบียนรถลูกค้า" required></v-text-field>
      <v-text-field v-model="date"    label="วันที่ลง 00/00/2500" required></v-text-field>
      <v-text-field v-model="tell"    label="เบอร์โทร" required></v-text-field>
      <v-text-field v-model="address"    label="ที่อยู่" required></v-text-field>
      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="เลือกบริการ"
        required
      ></v-select>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="addservice()">เพิ่มบริการ</v-btn>
    </v-form>
    <br />
    <div class="containered">
      <v-card class="mx-auto" v-for="prd in allproduct" :key="prd.id">
        <img class="card-img-top" :src="prd.image" alt height="200px" width="400px" />
        <div class="card-body">
          <h4 class="card-title">{{prd.id}} {{prd.name}}</h4>
          <p class="card-text">ราคา:{{prd.price}}</p>
        </div>
        <div class="card-footer text-muted">
          <!-- <a href="/product/1">รายละเอียด</a> -->

          <v-btn
            :to="{ name: 'product-id', params: { id:prd.id} }"
            :loading="loading3"
            :disabled="loading3"
            color="warning"
            class="ma-2 white--text"
            @click="loader = 'loading3'"
          >
            รายละเอียด
            <v-icon right dark>mdi-tag</v-icon>
          </v-btn>
        </div>
      </v-card>
    </div>
    <br />
  </div>
</template>


<script>
import { db } from '@/plugins/firebaseConfig'
export default {
  data() {
    //   เรียกใช้ store ตาม foder
    return {
      allproduct: this.$store.state.product.allproduct,
      memberid: '',
      date: '',
      tell: '',
      status:'received',
      select:'',
      address: '',
      valid: true,
      items: ['01 : ทำความสะอาดไส้กรองอากาศ',
              '02 : ตรวจสอบสายพาน',
              '03 : ตรวจสอบระดับน้ำมันเครื่อง',
              '04 : ตรวจสอบสภาพสีและลักษณะทั่วไปของน้ำมันเครื่อง',
              '05 : การตรวจเช็คน้ำมันพวงมาลัยพาวเวอร์',
              '06 : ตรวจสอบสภาพของหัวเทียน',
              '07 : ตรวจสอบพัดลมระบายอากาศ',
              '08 : ตรวจสอบหม้อน้ำ',
              '09 : ตรวจสอบระบบหล่อเย็น',
              '10 : ตรวจสอบการสึกหรอของหน้ายาง',
              '11 : ตรวจสอบสภาพทั่วไปของยาง',
              '12 : ตรวจสอบความลึกของร่องดอกยาง',
              '13 : ตรวจสอบระดับน้ำมันเกียร์',
              '14 : ตรวจสอบสภาพสีและลักษณะของน้ำมันเกียร์',
              '15 : ตรวจสอบระดับน้ำมันเฟืองท้าย',
              '16 : ตรวจสอบสภาพสีและลักษณะของน้ำมันเฟืองท้าย',
              '17 : ตรวจสอบสภาพยางหุ้มเพลาขับ หน้า – หลัง',
              '18 : ตรวจสอบสภาพลูกหมากต่างๆ',
              '19 : ตรวจสอบการรั่วซึมและการคืนตัวของโช้คอัพ',
              '20 : ตรวจสอบลูกปืนล้อ',
              '21 : ตรวจสอบบูชและลูกยางช่วงล่างทั้งหมด',
              '22 : ตรวจสอบสภาพและการรั่วซึมของสายอ่อนเบรก',
              '23 : ตรวจสอบการสึกหรอของจานเบรก',
              '24 : ตรวจสอบสภาพผ้าเบรก',
              '25 : ตรวจสอบระดับน้ำมันเบรก',
              '26 : ตรวจสอบความชื้นและสีของน้ำมันเบรก',
              '27 : ตรวจสอบสภาพไส้กรองแอร์',
              '28 : ตรวจเช็คสภาพแบตเตอรี่และระดับน้ำกลั่น',
              '29 : ระบบไฟส่องสว่างและสัญญาณไฟต่างๆ',
              '30 : ตรวจสอบยางใบปัดน้ำฝน',]
    }
  },
 methods: {
   reloadPage() {
      window.location.reload()
    },
    
   addservice() {
    
      db.collection("Addservice").doc(this.memberid).set({
        memberid: this.memberid,
        select: this.select,
        date: this.date,
        tell: this.tell,
        address: this.address,
        status: this.status,

 })
        .then((docRef) => {
           
            
        })
        .catch((error) => {
              console.error("Error adding document: ", error);
        });
        
    
         alert("บันทุกข้อมูลสำเร็จ !!! สามารถดูข้อมูลได้ที่ > รายการซ่อม")
        this.reloadPage()
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