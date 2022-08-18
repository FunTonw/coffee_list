<template>
  <div class="home">
    <div :class=" this.modelToggle ? 'open' : 'close' ">
      <OrderDelModel @close-model='closeModel' @del-model='delOrder' />
    </div>
    <div :class=" this.editModelToggle ? 'open' : 'close' ">
      <OrderEditModel @close-edit-model='closeEditModel' @edit-model='editOrder' :editItem="editItem" />
    </div>
    <div style="padding-top: 2rem;">
      <NavbarPage />
    </div>
    <div>
      <div class="bg">
        <h2 class="coffee-title">咖啡菜單</h2>
        <div class="coffee-product">
          <ul class="coffee-list">
            <li v-for="item, key in coffeeItem" :key="key">
              <button @click="coffeeSelete(item)">{{item.name}}</button>
            </li>
          </ul>
        </div>
        <div class="coffee-chack">
          <div v-if="!this.coffeeCheck.name"></div>
          <div v-else>
            <div class="sizeCheck">
              <div class="coffee-count">
                <button v-if="this.coffeeCheck.count <= 1" class="noless-btn">-</button>
                <button v-else @click="countAddMinus(false)">-</button>
                <span>{{this.coffeeCheck.count}}</span>
                <button @click="countAddMinus(true)">+</button>
              </div>
                <div>
                <p>{{this.coffeeCheck.name}}</p>
                <ul class="sizeCheck-list">
                  <li v-for="size, key in this.coffeeCheck.size" :key="key">
                    <input type="radio" :id=size.cup
                    v-model="this.coffeeCheck.sizeCheck"
                    :value=size>
                    <label :for=size.cup>{{size.cup}}</label>
                  </li>
                </ul>
                </div>
                <span>{{this.totalPrice}}元</span>
            </div>
            <div class="coffee-tip">
              <label for="coffeeTip">備註</label>
              <textarea name="tip" id="coffeeTip" cols="10" rows="3" placeholder="..." v-model="this.coffeeCheck.note"></textarea>
            </div>
            <div>
              <button @click="cancelSelete()" class="button-red">取消選擇</button>
              <button @click="checkSelete(this.coffeeCheck)" class="button-green">加入訂單</button>
            </div>
          </div>
        </div>
        <div v-if="this.order.orderList.length <= 0"></div>
        <div class="coffee-order" v-else>
          <h2 class="coffee-title">訂單內容</h2>
          <ul>
            <li class="coffee-order-list" v-for="order, key in this.order.orderList" :key="key">
              <div class="coffee-order-list-content">
                <p><span>{{order.sizeCheck.cup}}</span> {{order.name}} <span>{{order.count}} 杯</span></p>
                <p>{{order.totalPrice}}元</p>
                <div class="coffee-order-btn">
                  <button class="del-button" @click="openDelModel(key)">
                    <span>X</span>
                  </button>
                  <button class="edit-button" @click="openEditModel (order, key)">
                    <span>≡</span>
                  </button>
                </div>
              </div>
              <div class="coffee-order-list-tip">
                <p>{{order.note}}</p>
              </div>
            </li>
          </ul>
          <div style="margin: 2rem 0; font-size: 18px">總計：{{orderTotalPrice}} 元</div>
          <div>
            <button @click="cancelOrder()" class="button-red">取消全部</button>
            <button class="button-green">送出訂單</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  body{
    background: rgb(180, 129, 71);
  }
  .home{
    position: relative;
  }
  .bg{
    background: white;
    max-width: 35%;
    margin: 0px auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 0 0 1rem 1rem ;
  }
  .coffee-title{
    margin-bottom: 20px;
  }
  .coffee-product{
    height: 40vh;
    overflow: auto;
  }
  .coffee-list > li {
    width: 100%;
  }
  .coffee-list > li > button{
    width: 100%;
    border: none;
    border-bottom: 1px solid rgb(186, 186, 186);
    background: white;
    color: rgb(86, 86, 86);
    font-size: 16px;
    font-weight: 600;
    padding: 20px 0;
    cursor: pointer;
  }
  .coffee-list > li > button:hover{
    background: rgb(251, 251, 251);
    color: black;
  }
  .coffee-list-size{
    display: flex;
  }
  .sizeCheck{
    padding: 20px 0;
    font-size: 24px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .sizeCheck ul{
    display: flex;
    justify-content: center;
    font-size: 16px;
  }
  .sizeCheck ul li {
    margin-right: 1.2rem;
  }
  .coffee-count{
    font-size: 18px;
    border: 1px solid rgb(184, 184, 184);
    border-radius: .1rem;
  }
  .coffee-count span{
    padding: 10px;
  }
  .coffee-count button{
    border: none;
    cursor: pointer;
    font-size: 18px;
    color:  rgb(97, 97, 97);
  }
  .noless-btn{
    color:  rgb(184, 184, 184) !important;
    cursor: auto !important;
    /* color:  rgb(97, 97, 97); */
  }
  .button-green{
    padding: .3rem 1rem;
    margin: 0 1rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    color: white;
    background: rgb(194, 194, 255);
  }
  .button-green:hover{
    background: rgb(127, 127, 255);
  }
  .button-red{
    padding: .3rem 1rem;
    margin: 0 1rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    color: white;
    background: rgb(255, 146, 146);
  }
  .button-red:hover{
    background: rgb(255, 84, 84);
  }
  .coffee-tip{
    display: flex;
    flex-direction: column;
    margin: .5rem 1rem;
  }
  .coffee-tip label{
    font-size: 12px;
    color: rgb(86, 86, 86);
    margin-bottom: .3rem;
    align-self: flex-start;
  }
  .coffee-tip textarea{
    resize: none;
    border: 1px solid rgb(186, 186, 186);
    border-radius: .3rem;
    padding: .5rem;
  }
  .coffee-order{
    margin: 2rem 1rem;
  }
  .coffee-order-list{
    border-bottom: 1px solid rgb(186, 186, 186);
    padding: 1rem;
    margin-bottom: .5rem;
  }
  .coffee-order-list .coffee-order-list-content{
    display: flex;
    justify-content: space-between;
  }
  .coffee-order-list .coffee-order-list-tip{
    text-align: start;
    font-size: 12px;
    margin-top: .6rem;
  }
  .coffee-order-btn{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }
  .del-button{
    cursor: pointer;
    height: 100%;
    width: 100%;
    position: relative;
    padding: 1rem;
    border: none;
    border-radius: 50%;
    background: rgb(255, 146, 146);
    color: white;
  }
  .del-button:hover{
   background: rgb(255, 84, 84);
  }
  .edit-button{
    cursor: pointer;
    height: 100%;
    width: 100%;
    position: relative;
    padding: 1rem;
    border: none;
    border-radius: 50%;
    background: rgb(194, 194, 255);
    color: white;
  }
  .edit-button:hover{
   background: rgb(127, 127, 255);
  }
  .coffee-order-btn button span{
    position: absolute;
    transform: translateX(50%);
    /* transform: translateY(50%); */
    bottom: 25%;
    right: 50%;
  }
  .close {
    display: none;
  }
</style>

<script>
import OrderDelModel from '../components/OrderDelModel.vue'
import OrderEditModel from '../components/OrderEditModel.vue'
import NavbarPage from '../components/NavbarPage.vue'

export default {
  components: {
    OrderDelModel,
    OrderEditModel,
    NavbarPage
  },
  data () {
    return {
      editModelToggle: false,
      modelToggle: false,
      delOrderNumber: Number,
      editOrderNumber: Number,
      editItem: {},
      order: {
        orderList: [],
        orderTotal: 0
      },
      coffeeCheck: {
        name: '',
        price: 0,
        size: {
          cup: '',
          sizeCount: 0
        },
        sizeCheck: {
          cup: 'S',
          sizeCount: 0
        },
        count: 0,
        note: ''
      },
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
  computed: {
    totalPrice: function () {
      return (this.coffeeCheck.price + this.coffeeCheck.sizeCheck.sizeCount) * this.coffeeCheck.count
    },
    orderTotalPrice: function () {
      const total = this.order.orderList.reduce((pre, cur) => pre + cur.totalPrice, 0)
      return total
    }
  },
  methods: {
    coffeeSelete: function (item) {
      this.coffeeCheck = { ...item }
      this.coffeeCheck.count += 1
      this.coffeeCheck.sizeCheck = {
        cup: 'S',
        sizeCount: 0
      }
    },
    cancelSelete: function () {
      this.coffeeCheck = {
        name: '',
        price: 0,
        size: {
          cup: '',
          sizeCount: 0
        },
        sizeCheck: {
          cup: 'S',
          sizeCount: 0
        },
        count: 0,
        note: ''
      }
    },
    checkSelete: function (item) {
      const orderItem = { ...item }
      orderItem.totalPrice = this.totalPrice
      this.order.orderList.unshift(orderItem)
      this.cancelSelete()
    },
    countAddMinus: function (x) {
      if (x) {
        this.coffeeCheck.count += 1
      } else {
        this.coffeeCheck.count -= 1
      }
    },
    openDelModel (key) {
      this.modelToggle = !this.modelToggle
      this.delOrderNumber = key
    },
    closeModel () {
      this.modelToggle = !this.modelToggle
      this.delOrderNumber = Number
    },
    delOrder () {
      this.modelToggle = !this.modelToggle
      this.order.orderList.splice(this.delOrderNumber, 1)
      this.delOrderNumber = Number
    },
    openEditModel (order, key) {
      this.editModelToggle = !this.editModelToggle
      this.editItem = { ...order }
      this.editOrderNumber = key
    },
    closeEditModel () {
      this.editModelToggle = !this.editModelToggle
      this.editItem = {}
      this.editOrderNumber = Number
    },
    editOrder (editItem) {
      this.editModelToggle = !this.editModelToggle
      console.log(editItem)
      this.order.orderList.splice(this.editOrderNumber, 1, editItem)
      this.editItem = {}
    },
    cancelOrder: function () {
      this.order = {
        orderList: [],
        orderTotal: 0
      }
    }
  }
}
</script>
