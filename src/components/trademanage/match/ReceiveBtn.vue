<template>
  <div>
    <v-dialog
      v-model="receiveCheck"
      max-width="250"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          block
          color="primary"
          class="mt-3"
          :disabled="isSent || isReceiveClick"
          :loading="isReceiveClick"
          v-bind="attrs"
          v-on="on"

        >
          收到
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5">
          收到書籍
        </v-card-title>
        <v-card-text>
          這次交易您還滿意嗎？
          <v-rating
            class="mt-3"
            v-model="evaluation"
            color="warning"
            background-color="warning"
            empty-icon="mdi-star-outline"
            half-icon="mdi-star-half"
            half-increments
            size="16"
            @input="receipt"
          ></v-rating>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey darken-1"
            text
            @click="receiveCheck = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { putReceipt, rating} from "@/request/api";
export default {
  inject: ['reload'],
  props: ['isSent', 'seekId'],
  data() {
    return {
      receiveCheck: false,
      evaluation: 0,
      isReceiveClick: false,
    }
  },
  methods: {
    receipt() {
      this.receiveCheck = false;
      this.isReceiveClick = true;
      const data = {
        userId: this.$cookies.get('user').id,
        evaluation: this.evaluation,
      }
      rating(this.seekId, data)
        .then(res => {
          putReceipt(this.seekId, this.$cookies.get('user').id)
            .then(res => {
              this.isReceiveClick = false;
              this.reload();
            })
            .catch(error => {
              console.log(error);
              this.isReceiveClick = false;
              alert('失敗');
            })
        })
        .catch(error => {
          console.log(error);
        })

    },
  },
}
</script>

<style>

</style>
