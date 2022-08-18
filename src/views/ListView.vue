<template>
  <div class="List">
    <h1>This is an about page</h1>
    <div class="bg">
      <ul class="list-style">
        <li>
          <div class="list-style-order">
            <div>
              <p style="margin-right: 5px">1 杯</p>
              <p>黑咖啡</p>
            </div>
            <p>30元</p>
          </div>
          <div class="list-style-edit">
            <p>總計：50元</p>
            <div>
              <button class="edit-button" style="margin-right: .5rem">
                <span>≡</span>
              </button>
              <button class="del-button">
                <span>></span>
              </button>
            </div>
          </div>
        </li>
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
