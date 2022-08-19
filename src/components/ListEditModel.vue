<template>
  <div class="model-bg">
    <div class="list-edit-model">
      <ul class="list-edit-list">
        <li v-for="item, key in list.orderList" :key="key">
          <div>
          <div class="list-edit-contant">
            <div class="coffee-count" style="margin: 0 1rem; padding:0;">
              <button v-if="item.count <=1" class="noless-btn">-</button>
              <button v-else @click="ListEditCount(item, false)">-</button>
              <span style="margin: 0 .5rem; padding: 0;">{{item.count}}</span>
              <button @click="ListEditCount(item, true)">+</button>
            </div>
            <p style="margin: 0 1rem;">{{item.name}}</p>
            <select name="listEdit" id="listEditselect" class="edit-select" v-model="item.sizeCheck">
              <option v-for="size, key in item.size" :key="key" :value="size">{{size.cup}}</option>
            </select>
            <p style="margin: 0 1rem;">{{countListEditPrice (item)}}元</p>
          </div>
          <textarea name="listEditTextarea" id="listEditTextarea" cols="35" rows="3"  placeholder="..." v-model="item.note"></textarea>
          </div>
          <div class="list-edit-btn" v-if="list.orderList.length > 1">
            <button class="del-button" @click="delListItem(key)">
              <span>x</span>
            </button>
          </div>
        </li>
      </ul>
      <div>
        <button class="button-red" @click="delListEdit()">刪除</button>
        <button class="button-green" @click="cancelListEdit()">取消</button>
        <button class="button-red" @click="finListEdit(this.list)">確定</button>
      </div>
    </div>
  </div>
</template>

<style>
.list-edit-model{
    background: white;
    width: 500px;
    padding: 3rem;
    border-radius: .5rem;
}
.list-edit-list li{
  margin-bottom: .8rem;
  border-bottom: 1px solid rgb(186, 186, 186);
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-edit-list textarea {
  margin-top: 1rem;
  border-radius: .5rem;
  border: 1px solid rgb(186, 186, 186);
  resize: none;
}
.list-edit-contant{
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit-select {
  border:1px solid rgb(186, 186, 186);
  padding: .2rem;
  font-size: 16px;
}
.list-edit-btn{
  margin-left: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-edit-btn span {
      position: absolute;
    transform: translateX(50%);
    /* transform: translateY(50%); */
    bottom: 25%;
    right: 50%;
}
</style>

<script>
// 利用Number跟list列出資料, 並且可編輯的
// 若按取消則 Toggle false
// 按確定後 將內容傳送回 HomeView 也是 Toggle false
// 刪除整筆訂單 則是使用array slice選定此Number後 傳回 HomeView 並 Toggle false
export default {
  props: {
    listProp: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      ListNumber: Number,
      list: {},
      coffeeItem: [
        {
          name: '黑咖啡',
          price: 45,
          size: [{
            cup: 'S',
            sizeCount: 0
          },
          {
            cup: 'M',
            sizeCount: 10
          },
          {
            cup: 'L',
            sizeCount: 15
          }],
          count: 0,
          note: '',
          totalPrice: 0
        },
        {
          name: '拿鐵咖啡',
          price: 60,
          size: [{
            cup: 'S',
            sizeCount: 0
          },
          {
            cup: 'M',
            sizeCount: 10
          },
          {
            cup: 'L',
            sizeCount: 15
          }],
          count: 0,
          note: '',
          totalPrice: 0
        },
        {
          name: '摩卡拿鐵',
          price: 80,
          size: [{
            cup: 'S',
            sizeCount: 0
          },
          {
            cup: 'M',
            sizeCount: 10
          },
          {
            cup: 'L',
            sizeCount: 20
          }],
          count: 0,
          note: '',
          totalPrice: 0
        },
        {
          name: '焦糖拿鐵',
          price: 80,
          size: [{
            cup: 'S',
            sizeCount: 0
          },
          {
            cup: 'M',
            sizeCount: 10
          },
          {
            cup: 'L',
            sizeCount: 15
          }],
          count: 0,
          note: '',
          totalPrice: 0
        }
      ]
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
    cancelListEdit () {
      this.$emit('cansel-list-edit')
    },
    countListEditPrice (item) {
      item.totalPrice = (item.price + item.sizeCheck.sizeCount) * item.count
      this.list.orderTotal = this.list.orderList.reduce((x, y) => {
        return x + y.totalPrice
      }, 0)
      return item.totalPrice
    },
    delListItem (key) {
      this.list.orderList.splice(key, 1)
    },
    ListEditCount (item, toggle) {
      if (toggle) {
        item.count += 1
      } else {
        item.count -= 1
      }
    },
    finListEdit (list) {
      this.$emit('fin-list-edit', list)
    },
    delListEdit () {
      this.$emit('del-list-edit')
    }
  }
}
</script>
