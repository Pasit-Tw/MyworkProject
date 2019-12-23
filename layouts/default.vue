<template>
  <v-app>
    <v-app-bar fixed app color="orange">
      <div class="my-2">
        <span class="" >AM3T'auto
          <v-icon color="black">mdi-tools</v-icon>
        </span>
      </div>
      <div class="my-2">
        <v-btn class="ml-5" to="/product" text large color="black">บริการ</v-btn>
      </div>
      <div class="my-2">
        <v-btn to="/list" text large color="black">รายการซ่อม</v-btn>
      </div>
        
      <v-spacer />
     
    <div class="my-2"   temporary fixed>
        <v-btn to="/check" text large color="black" >สำหรับพนักงาน</v-btn>
      </div>
      <div class="my-2"   temporary fixed>
        <v-btn to="/contact/" text large color="black" >ติดต่อ</v-btn>
      </div>
      <!-- <div class="my-2"  :right="right" temporary fixed>
        <v-btn to="/" text large color="primary" >login</v-btn>
      </div> -->
      <Login />
      <!-- <login /> -->

    <!-- <v-btn @click="singout()" color="warning" class="ml-5">SingOut</v-btn> -->
      
     
    </v-app-bar>
    
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Login from '~/components/Login'
export default {
  
  components: {
    Login,
  },
  data () {
    return {
      
    }
  }
}
</script>
