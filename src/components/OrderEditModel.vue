<template>
  <div class="edit-model-bg">
    <div class="edit-model">
      <h2>編輯</h2>
      <div class="edit-form">
        <p>品項：<span>{{orderItem.name}}</span></p>
        <div class="edit-model-list">
          <p>尺寸：</p>
          <ul>
            <li v-for="size, key in this.orderItem.size" :key="key">
              <input type="radio" :id=size.cup v-model="this.orderItem.sizeCheck" :value=size>
              <label :for=size.cup>{{size.cup}}</label>
            </li>
          </ul>
        </div>
        <div style="display: flex; align-items: center;">
          <p>數量：</p>
          <div class="coffee-count">
            <button v-if="this.orderItem.count <= 1" class="noless-btn">-</button>
            <button v-else @click="editCountAddMinus(false)">-</button>
            <span>{{this.orderItem.count}}</span>
            <button @click="editCountAddMinus(true)">+</button>
          </div>
        </div>
        <div class="coffee-tip" style="
        grid-column-start: 1;
        grid-column-end: 3;">
          <label for="editTip"></label>
          <textarea name="editTextarea" id="editTip" cols="30" rows="3" placeholder="..." v-model="this.orderItem.note"></textarea>
        </div>
      </div>
      <div>
        <p style="text-align: center; margin-bottom: 2rem;">總計：{{this.orderItem.totalPrice}} 元</p>
      </div>
      <div>
        <button class="button-green" @click = cancelEditOrderList >取消</button>
        <button class="button-red" @click="editOrderList">確定</button>
      </div>
    </div>
  </div>
</template>

<style>
  .edit-model-bg {
    width: 100vw;
    height: 100%;
    z-index: 10;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
  }
  .edit-model{
    background: white;
    width: 500px;
    padding: 3rem;
    border-radius: .5rem;
  }
  .edit-model p {
    font-size: 18px;
    font-weight: 600;
    text-align: start;
  }
  .edit-model div button {
    font-size: 20px;
    font-weight: 600;
  }
  .edit-model-list {
    display: flex;
  }
  .edit-model-list ul{
    display: flex;
  }
  .edit-form{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    border-bottom: 1px solid gray;
    margin: 2rem;
    padding-bottom: 2rem;
  }
</style>

<script>
export default {
  props: ['editItem'],
  data () {
    return {
      orderItem: {}
    }
  },
  watch: {
    editItem () {
      this.orderItem = { ...this.editItem }
    }
  },
  methods: {
    cancelEditOrderList () {
      this.$emit('close-edit-model')
    },
    editOrderList () {
      this.$emit('edit-model', this.orderItem)
      this.orderItem = {}
    },
    editCountAddMinus (count) {
      if (count) {
        this.orderItem.count += 1
      } else {
        this.orderItem.count -= 1
      }
    },
    editorderPrice () {
      if (this.orderItem.totalPrice) {
        this.orderItem.totalPrice = (this.orderItem.price + this.orderItem.sizeCheck.sizeCount) * this.orderItem.count
      } else {
        return ''
      }
    }
  },
  updated () {
    this.editorderPrice()
  }
}
</script>
