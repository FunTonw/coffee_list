<template>
  <div class="List">
    <div class="bg">
      <h2>訂單列表</h2>
      <ul class="list-style">
        <template v-for="order, key in this.list.ListData" :key="key">
        <li :class="{payToggleBg: order.payToggle}">
          <div class="list-style-order" v-for="item, itemKey in order.orderList" :key="itemKey">
            <div>
              <p style="margin-right: 5px">{{item.count}} 杯</p>
              <div style="dispaly: flex; flex-direction: column; align-items: start">
                <p><span>{{item.sizeCheck.cup}}</span>{{item.name}}</p>
                <p style="font-size: 12px; margin-top: .3rem">{{item.note}}</p>
              </div>
            </div>
            <p>{{item.totalPrice}}元</p>
          </div>
          <div class="list-style-edit">
            <p>總計：{{order.orderTotal}}元</p>
            <div>
              <button class="edit-button" style="margin-right: .5rem"  @click='EditListBtn(order, key)'>
                <span>≡</span>
              </button>
              <button class="del-button" @click='payToggleBtn(key)'>
                <span>></span>
              </button>
            </div>
          </div>
        </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style>
  .list-style{
    padding: 1rem;
  }
  .list-style li {
    padding: 1rem;
    border-radius: .5rem;
    border: 1px solid rgb(186, 186, 186);
    margin: 1rem;
  }
  .payToggleBg {
    background: rgba(255, 215, 160, 0.6);
  }
  .list-style-order{
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
  }
  .list-style-order div {
    display: flex;
  }
  .list-style-edit{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid rgb(186, 186, 186);
  }
  .list-style-edit div {
    display: flex;
  }
  .list-style-edit span{
    position: absolute;
    transform: translateX(50%);
    bottom: 25%;
    right: 50%;
  }
</style>

<script>

export default {
  props: {
    listProp: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      list: {}
    }
  },
  watch: {
    listProp: {
      handler () {
        this.list = { ...this.listProp }
      },
      deep: true
    }
  },
  methods: {
    payToggleBtn (key) {
      this.$emit('pay-toggle', key)
    },
    EditListBtn (order, key) {
      this.$emit('edit-list-toggle', order, key)
    }
  }
}
</script>
