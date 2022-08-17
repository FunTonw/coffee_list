<template>
  <div class="home">
    <div>
      <div class="bg">
        <h1 class="coffee-title">咖啡菜單</h1>
        <div class="coffee-product">
          <ul class="coffee-list">
            <li v-for="item, key in coffeeItem" :key="key">
              <button @click="coffeeSelete(item)">{{item.name}}</button>
            </li>
          </ul>
        </div>
        <div>
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
              <button @click="checkSelete()" class="button-green">加入訂單</button>
            </div>
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
  .bg{
    background: white;
    max-width: 35%;
    margin: 20px auto;
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
    background: rgb(85, 85, 255);
  }
  .button-red{
    padding: .3rem 1rem;
    margin: 0 1rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    color: white;
    background: red;
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
</style>

<script>
export default {
  data () {
    return {
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
      return (this.coffeeCheck.price * this.coffeeCheck.count) + this.coffeeCheck.sizeCheck.sizeCount
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
    checkSelete: function () {
      this.cancelSelete()
      console.log('push')
    },
    countAddMinus: function (x) {
      if (x) {
        this.coffeeCheck.count += 1
      } else {
        this.coffeeCheck.count -= 1
      }
    }
  }
}
</script>
