<template>
  <div>
    <v-card
      elevation="0"
      class="text-left"
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
            :src="`http://35.236.167.85/photo/${msgData.userPhoto}.jpg`"
          ></v-img>
        </v-avatar>
        <span>{{msgData.userName}}</span>
        <v-spacer></v-spacer>

        <v-menu
          v-if="msgData.isOwner"
          bottom
          left
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              @click="isEdit = true"
            >
              <v-list-item-title>
                  編輯
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="deleteMsg(msgData.messageId)"
            >
              <v-list-item-title>
                  刪除
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-subtitle>
        {{msgData.messageTime}}
      </v-card-subtitle>

      <v-card-text class="text-body-1 text--primary">
        <span v-if="!isEdit">{{msgData.message}}</span>
        <div v-else>
          <v-textarea
            outlined
            name="input-7-4"
            label="留言"
            v-model="msg"
            hide-details
            maxlength="2000"
          ></v-textarea>
          <div class="d-flex justify-end mt-6">
            <v-btn
              text
              @click="cancelEdit"
              class="mr-2"
            >
              取消
            </v-btn>

            <v-btn
              color="primary"
              @click="updateMsg"
            >
              更新
            </v-btn>

          </div>

        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { delMsg } from "@/request/api";
export default {
  props: ['msgData'],
  data() {
    return {
      isEdit: false,
      editValue: '',
      msg: '',
      items: [
        { title: '編輯' },
        { title: '刪除' },
      ],
    }
  },
  created() {
    this.msg = this.msgData.message;
  },
  watch: {
    "msgData": {
      handler(val) {
        if(this.isEdit) {
          return;
        }
        this.msg = val.message;
      },
      deep: true,
    }
  },
  methods: {
    deleteMsg(id) {
      delMsg(id)
        .then(res => {
          this.$emit('deleteMsg')
          this.cancelEdit();
        })
        .catch(error => {
          console.log(error);
        })
    },
    cancelEdit() {
      this.isEdit = false;
      this.msg = this.msgData.message;
    },
    updateMsg() {
      if(this.msg === '') {
        alert('資料不得為空');
        return;
      }
      this.$emit('update', {
        data: this.msg,
        id: this.msgData.messageId,
      });
      this.isEdit = false;
    }
  }
}
</script>

<style lang="stylus">
.message
  z-index 10 !important
  &__btn
    justify-content flex-end

</style>
