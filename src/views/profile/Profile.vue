<template>
  <article class="profile">
    <header class="profile__header">
      <h2 class="profile__tit">個人資料</h2>
    </header>
    <v-row
      align="center"
    >
      <v-col
        cols="12"
        lg="3"
      >
        <v-avatar
          color="grey lighten-2"
          size="160"
          class="d-block my-6"
        >
          <img
            class="img-resp"
            :src="this.preview || userPhoto || defaultPhoto"
            alt="大頭貼"
          >
        </v-avatar>
      </v-col>
      <v-col
        cols="12"
        lg="3"
      >
        <v-btn
          @click="clickUploadPic"
        >
          上傳圖片
        </v-btn>
      </v-col>
    </v-row>
    <input class="selectImg__btn"
      id="selectImg"
      type="file"
      value="選擇照片"
      accept="image/*"
      @change="selectPic"
    >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="trueName"
        :counter="8"
        :rules="nameRules"
        maxlength="8"
        label="姓名"
      ></v-text-field>

      <v-text-field
        v-model="phone"
        :counter="15"
        label="聯絡電話"
        :rules="phoneRules"
        hint="輸入格式為 02-12345678 或 0912345678"
        maxlength="15"
        required
      ></v-text-field>

      <v-text-field
        v-model="name"
        :rules="nameRules"
        maxlength="8"
        label="暱稱"
        required
        readonly
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        readonly
        required
      ></v-text-field>

      <!-- 簡介 -->
      <v-textarea
        name="input-7-1"
        label="自我介紹"
        maxlength="100"
        v-model="selfIntroduction"
      ></v-textarea>
      <v-row align="center">
        <v-col
          cols="12"
          lg="3"
        >
          <h3 class="profile__tit mt-6 mb-6">預設交易資料</h3>
        </v-col>
        <v-col
          cols="12"
          lg="3"
        >
          <v-dialog
            v-model="dialog"
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
              >
                更新交易資料
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">更新交易資料</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <AddressSelect
                        title="宅配 ( 郵寄、黑貓 )"
                        nameId="Delivery"
                        :openInput="true"
                        @getVal="getAddress"
                        @isOpenTrade="isDeliveryOpen"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                    <AddressSelect
                      title="面交"
                      nameId="FaceTrade"
                      :openInput="true"
                      :openRemark="true"
                      @getVal="getTradeAddress"
                      @isOpenTrade="isFaceOpen"
                    />
                  </v-col>
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                    <IMailBoxSelect
                      title="i 郵箱"
                      nameId="MailBox"
                      @getVal="getIMailAddress"
                      @isOpenTrade="isMailBoxOpen"
                    />
                  </v-col>
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                    <StoreSelect
                      title="7-11"
                      nameId="store"
                      @getVal="getStoreAddress"
                      @isOpenTrade="isStoreOpen"
                    />
                  </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="dialog = false"
                >
                  關閉
                </v-btn>
                <v-btn
                  color="primary"
                  @click="dialog = false"
                >
                  保存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <div class="defaultTradeMode" v-if="homeAddress || userData.homeAddress">
        <h4 class="defaultTradeMode__tit mb-3">宅配 ( 郵寄、黑貓 )</h4>
        <p class="defaultTradeMode__desc">{{homeAddress || userData.homeAddress}}</p>
      </div>
      <div class="defaultTradeMode" v-if="getDefaultHomeAddress || getHomeAddress">
        <h4 class="defaultTradeMode__tit">面交</h4>
        <p class="defaultTradeMode__desc">{{getDefaultHomeAddress || getHomeAddress}}</p>
      </div>
      <div class="defaultTradeMode" v-if="getDefaultIMailAddressAll || getIMailAddressAll">
        <h4 class="defaultTradeMode__tit">i 郵箱</h4>
        <p class="defaultTradeMode__desc">{{getDefaultIMailAddressAll || getIMailAddressAll}}</p>
      </div>
      <div class="defaultTradeMode" v-if="getStoreAddressAll || getStoreAddressAll">
        <h4 class="defaultTradeMode__tit">7-11 店到店</h4>
        <p class="defaultTradeMode__desc">{{getDefaultStoreAddressAll || getStoreAddressAll}}</p>
      </div>
      <div class="d-flex justify-end">
        <v-btn
          :disabled="!valid || isClick"
          :loading="isClick"
          color="primary"
          @click="updateProfile"
        >
          保存
        </v-btn>
      </div>
    </v-form>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="primary"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          關閉
        </v-btn>
      </template>
    </v-snackbar>


  </article>
</template>

<script>
import { mapState } from "vuex";
import { getUserDetail, putUserDetail } from "@/request/api";
import AddressSelect from '@/components/member/uploadpd/form/AddressSelect';
import IMailBoxSelect from '@/components/member/uploadpd/form/IMailBoxSelect';
import StoreSelect from '@/components/member/uploadpd/form/StoreSelect';
export default {
  inject: ['reload'],
  data: () => ({
    isClick: false,
    snackbar: false,
    text: '',
    timeout: 2000,
    dialog: false,
    preview: null,
    image: null,
    valid: true,
    userData: {},
    name: '',
    trueName: '',
    phone: '',
    nameRules: [
      v => !!v || '此為必填欄位',
      v => (v && v.length <= 8) || '名稱不得超出 8 個字符',
    ],
    phoneRules: [
      v => !!v || '此為必填欄位',
      v => /(^(\d{2,4}-)?\d{7,8})$|(^09[0-9]{8}$)/.test(v) || '請填入正確聯絡電話號碼',
    ],

    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || '請輸入正確格式',
    ],
    tradeModeOpen: {
      delivery: false,
      face: false,
      stroe: false,
      mailBox: false,
    },
    faceTrade: {
      City: '',
      Area: '',
      Road: '',
      Path: '',
      Detail: '',
    },
    store: {
      Address: '',
      Name: '',
    },
    homeAddress: '',
    mailBox: {
      Address: '',
      Name: '',
    },
    hasDefaultAddress: false,
    selfIntroduction: '',
    defaultPhoto: '/static/img/default-image.png',
  }),

  methods: {
    updateProfile () {
      // if(this.isOpenTradeMode){
      //   return;
      // }
      if(!this.$refs.form.validate()){
        return;
      }
      this.isClick = true;
      putUserDetail(this.user.id, this.getFormData)
        .then(res => {
          this.snackbar = true;
          this.text = res.data;
          this.isClick = false;
          // this.reload();
          // this.$router.push({name: 'Member'});
        })
        .catch(error => {
          this.snackbar = true;
          this.isClick = false;
          this.text = '無資料更新';
          console.log(error);
        })
    },
    isDeliveryOpen(val) {
      this.tradeModeOpen.delivery = val;
    },
    isFaceOpen(val) {
      this.tradeModeOpen.face = val;
    },
    isMailBoxOpen(val) {
      this.tradeModeOpen.mailBox = val;
    },
    isStoreOpen(val) {
      this.tradeModeOpen.store = val;
    },
    getTradeAddress(val) {
      this.faceTrade.City = val.city;
      this.faceTrade.Area = val.area;
      this.faceTrade.Road = val.road;
      this.faceTrade.Path = val.path;
      this.faceTrade.Detail = val.detail;
    },
    getAddress(val) {
      this.homeAddress = val.city + val.area + val.road + val.path;
    },
    getIMailAddress(val) {
      this.mailBox.Address = val.Address;
      this.mailBox.Name = val.Name;
    },
    getStoreAddress(val) {
      this.store.Address = val.Address;
      this.store.Name = val.Name;
    },
    // 點擊觸發 form 選取
    clickUploadPic() {
      document.getElementById('selectImg').click();
    },
    // form 選取
    selectPic(e){
      this.handleFiles(e.target.files)
    },
    // 處理檔案
    handleFiles(files) {
      let f = files;
      // 如果他有值
      if (f) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image=f[0];
        reader.readAsDataURL(f[0]);
      }
    },
  },

  components: {
    AddressSelect,
    IMailBoxSelect,
    StoreSelect,
  },

  computed: {
    ...mapState([
      'isLogin',
      'user',
    ]),
    isOpenTradeMode() {
      return !this.tradeModeOpen.stroe &&
        !this.tradeModeOpen.face &&
        !this.tradeModeOpen.mailBox &&
        !this.tradeModeOpen.delivery;
    },
    getHomeAddress() {
      return this.userData.faceTradeArea +
        this.userData.faceTradeCity +
        this.userData.faceTradeRoad +
        this.userData.faceTradePath +
        this.userData.faceTradeDetail;
    },
    getDefaultHomeAddress() {
      return this.faceTrade.Area +
        this.faceTrade.City +
        this.faceTrade.Road +
        this.faceTrade.Path +
        this.faceTrade.Detail;
    },
    getIMailAddressAll() {
      return this.userData.mailBoxName + this.userData.mailBoxAddress;
    },
    getStoreAddressAll() {
      return this.userData.storeName + this.userData.storeAddress;
    },
    getDefaultIMailAddressAll() {
      if(!this.mailBox.Name && !this.mailBox.Address){
        return '';
      }
      return this.mailBox.Name + '(' + this.mailBox.Address + ')';
    },
    getDefaultStoreAddressAll() {
      if(!this.store.Name && !this.store.Address){
        return '';
      }
      return this.store.Name + '(' + this.store.Address + ')';
    },
    getFormData() {
      let formData = new FormData()
      if(this.image) {
        formData.append('UserPhoto', this.image)
      }
      // 個資
      formData.append('TrueName', this.trueName)
      formData.append('CellphoneNumber', this.phone)
      formData.append('NickName', this.name)
      // formData.append('Email', this.email)
      // 交易方式
      formData.append('HomeAddress', this.homeAddress)
      formData.append('MailBoxName', this.mailBox.Name)
      formData.append('MailBoxAddress', this.mailBox.Address)
      formData.append('StoreName', this.store.Name)
      formData.append('StoreAddress', this.store.Address)
      formData.append('FaceTradeCity', this.faceTrade.City)
      formData.append('FaceTradeArea', this.faceTrade.Area)
      formData.append('FaceTradeRoad', this.faceTrade.Road)
      formData.append('FaceTradePath', this.faceTrade.Path)
      formData.append('FaceTradeDetail', this.faceTrade.Detail)
      formData.append('SelfIntroduction', this.selfIntroduction)
      return formData;
    },
    userPhoto() {
      if(!this.userData.userPhoto){
        return '';
      }
      return `http://35.236.167.85/photo/${this.userData.userPhoto}.jpg`;
    }
  },
  created() {
    this.name = this.user.nickName;
    getUserDetail(this.user.id)
      .then(res => {
        this.userData = res.data;
        this.name = this.userData.nickName;
        this.email = this.userData.email;
        this.trueName = this.userData.trueName;
        this.phone = this.userData.cellphoneNumber;
        this.selfIntroduction = this.userData.selfIntroduction;

        if(this.userData.homeAddress){
          this.hasDefaultAddress = true;
          this.homeAddress = this.userData.homeAddress;
        }
        if(this.userData.mailBoxAddress){
          this.hasDefaultAddress = true;
          this.mailBox.Name = this.userData.mailBoxName;
          this.mailBox.Address = this.userData.mailBoxAddress;
        }
        if(this.userData.storeAddress){
          this.hasDefaultAddress = true;
          this.store.Name = this.userData.storeName;
          this.store.Address = this.userData.storeAddress;
        }
        if(this.userData.faceTradeRoad){
          this.hasDefaultAddress = true;
          this.faceTrade.City = this.userData.faceTradeCity;
          this.faceTrade.Area = this.userData.faceTradeArea;
          this.faceTrade.Road = this.userData.faceTradeRoad;
          this.faceTrade.Path = this.userData.faceTradePath;
          this.faceTrade.Detail = this.userData.faceTradeDetail;
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}
</script>

<style lang="stylus">
.defaultTradeMode
  &__tit
    font-weight bold
.selectImg
  &__btn
    position absolute
    top -100%
    opacity 1
</style>
