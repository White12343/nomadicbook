<template>
  <div>
    <v-dialog
      v-model="consignmentCheck"
      max-width="250"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          block
          color="primary"
          :disabled="isSent || isConsignmentClick"
          :loading="isConsignmentClick"
          v-bind="attrs"
          v-on="on"
          class="mt-3"
        >
          寄出
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5">
          注意
        </v-card-title>
        <v-card-text>
          請確認是否已寄出，確認後會通知對方您已寄出書籍。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey darken-1"
            text
            @click="consignmentCheck = false"
          >
            取消
          </v-btn>

          <v-btn
            color="primary"
            text
            @click="consignment"
          >
            確認
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { putConsignment } from "@/request/api";
export default {
  props: ['isSent', 'seekId'],
  inject: ['reload'],
  data() {
    return {
      consignmentCheck: false,
      isConsignmentClick: false,

    }
  },
  methods: {
    consignment() {
      this.isConsignmentClick = true;
      this.consignmentCheck = false;
      putConsignment(this.seekId, this.$cookies.get('user').id)
        .then(res => {
          this.reload();
          this.isConsignmentClick = false;
        })
        .catch(error => {
          console.log(error);
          this.isConsignmentClick = false;
          alert('失敗');
        })

    },
  }
}
</script>

<style>

</style>
