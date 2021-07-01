<template>
  <div>

    <v-btn
      fab
      dark
      small
      color="primary"
      @click.stop="openMessage"
    >
      <v-icon dark>
        mdi-message-outline
      </v-icon>
    </v-btn>
    <!-- 留言板 -->
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
        <header class="message__header px-3">
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
                @click="sentMsg"
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
          <v-card
            v-for="item, index in message"
            :key="index"
            elevation="0"
          >
            <v-card-title class="mb-3">
              <v-avatar
                color="primary"
                size="32"
                class="mr-3"
              >
                <v-img
                  class="elevation-6"
                  alt=""
                  :src="`http://35.236.167.85/photo/${item.userPhoto}.jpg`"
                ></v-img>
              </v-avatar>
              {{item.userName}}
            </v-card-title>
            <v-card-subtitle>
              {{item.messageTime}}
            </v-card-subtitle>

            <v-card-text class="text-body-1 text--primary">
              {{item.message}}
              <v-divider v-if="index < message.length - 1" class="mt-3"></v-divider>
            </v-card-text>
          </v-card>
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
import { getMsg, postMsg } from "@/request/api";
export default {
  props: ['seekId', 'userId'],
  data() {
    return {
      drawer: false,
      group: null,
      message: [],
      value: '',
      isSentMsg: false,
    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
  methods: {
    openMessage() {
      this.drawer = !this.drawer;
      getMsg(this.seekId)
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
          console.log(res);
          this.isSentMsg = false;
          this.resetMsg();
          getMsg(this.seekId)
          .then(res => {
            this.message = res.data;
          })
          .catch(error => {
            console.log(error);
          })
        })
        .catch(error => {
          this.isSentMsg = false;
          console.log(error);
        })
    }
  }
}
</script>

<style>

</style>
