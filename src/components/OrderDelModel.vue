<template>
  <div class="model-bg">
    <div class="model">
      <p>確定要刪除這一筆嗎?</p>
      <div>
        <button class="button-green" @click = cancelOrderList >取消</button>
        <button class="button-red" @click="delOrderList">確定</button>
      </div>
    </div>
  </div>
</template>

<style>
  .model-bg {
    width: 100vw;
    height: 100%;
    z-index: 10;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
  }
  .model{
    background: white;
    width: 500px;
    padding: 3rem;
    border-radius: .5rem;
  }
  .model p {
    font-size: 18px;
    font-weight: 600;
  }
  .model div {
    margin-top: 2rem;
  }
  .model div button {
    font-size: 20px;
    font-weight: 600;
  }
</style>

<script>
export default {
  methods: {
    cancelOrderList () {
      this.$emit('close-model')
    },
    delOrderList () {
      this.$emit('del-model')
    }
  }
}
</script>
