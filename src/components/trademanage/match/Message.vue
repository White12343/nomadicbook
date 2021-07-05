<template>
  <div>

    <v-btn
      dark
      outlined
      color="primary"
      @click="openMessage"
    >
      留言版
    </v-btn>
    <!-- 留言板 -->
    <v-overlay :value="drawer" z-index="7"></v-overlay>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      temporary
      hide-overlay
      width="500"
      :height="'100vh'"
    >
      <article class="message">
        <header class="message__header">
          <v-card
            elevation="0"
          >
            <v-card-title>
              留言板
            </v-card-title>

            <v-card-text>
              <v-textarea
                outlined
                name="input-7-4"
                label="留言"
                v-model="value"
                hide-details
                maxlength="2000"
              ></v-textarea>
            </v-card-text>
            <v-card-actions class="message__btn mb-3 mr-2">
              <v-btn
                text
                @click="resetMsg"
              >
                取消
              </v-btn>

              <v-btn
                color="primary"
                @click.stop="sentMsg"
                :disabled="isSentMsg"
                :loading="isSentMsg"
              >
                送出
              </v-btn>
            </v-card-actions>

          </v-card>
        </header>
        <v-divider></v-divider>
        <div class="message__body" v-if="message.length">
          <div
            v-for="item, index in message"
            :key="index"
          >
            <MessageCard :msgData="item" @update="editMsg" @deleteMsg="getMsgList"/>
            <v-divider v-if="index < message.length - 1" class="mt-3"></v-divider>
          </div>
        </div>
        <div class="message__body" v-else>
          <v-card
            elevation="0"
          >
            <v-card-subtitle class="text-center">
              目前還沒有留言喔
            </v-card-subtitle>
          </v-card>
        </div>


      </article>

    </v-navigation-drawer>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { getMsg, postMsg, delMsg, editMsg } from "@/request/api";
import MessageCard from './MessageCard';
export default {
  props: ['seekId', 'userId'],
  data() {
    return {
      drawer: false,
      group: null,
      isEdit: false,
      message: [],
      editValue: '',
      value: '',
      isSentMsg: false,
      items: [
        { title: '編輯' },
        { title: '刪除' },
      ],
    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
  computed: {
    ...mapState([
      'isLogin',
      'user',
    ]),
  },
  created() {
    this.timeOutRefresh = window.setInterval(() => {
      this.getMsgList();
    }, 2000);
  },
  methods: {
    openMessage() {
      this.drawer = !this.drawer;
      this.getMsgList();
    },
    getMsgList() {
      getMsg(this.seekId, this.user.id)
        .then(res => {
          this.message = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    resetMsg() {
      this.value = '';
    },
    sentMsg() {
      if(!this.value){
        return;
      }
      this.isSentMsg = true;
      const data = {
        seekId: this.seekId,
        userId: this.userId,
        message: this.value,
      }
      postMsg(data)
        .then(res => {
          this.isSentMsg = false;
          this.resetMsg();
          this.getMsgList();
        })
        .catch(error => {
          this.isSentMsg = false;
          console.log(error);
        })
    },
    editMsg(data) {
      editMsg(data.id, JSON.stringify(data.data))
        .then(res => {
          this.getMsgList();
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  components: {
    MessageCard
  }
}
</script>

<style lang="stylus">
.message
  z-index 10 !important
  &__btn
    justify-content flex-end

</style>
