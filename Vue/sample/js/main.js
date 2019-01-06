Vue.component('product', {
  template: `
   <div class="product">
      <div class="product-image">
        <a :href="link">
          <img :src="image">
        </a>
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="stock > 10">In Stock</p>
        <p v-else-if="10 >= stock && stock > 0">Almost Sold Out</p>
        <p v-else>Sold Out</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div v-for="(item, index) in variants"
          :key="item.id"
          class="color-box"
          v-bind:style="{ backgroundColor: item.color }"
          @mouseover="changeImg(index)"
          >
        </div>

        <button @click="addToCart"
          v-bind:disabled="!stock >= 1"
          v-bind:class="{disabledButton: !stock >= 1}">Add to cart</button>
        <button @click="removeFromCart">Remove from cart</button>

        <div class="cart">
          <p>Cart {{ cart }}</p>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
      link: 'https://www.google.co.jp/',
      stock: 1,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        { id: 1, color: 'Green', img: '../img/Socks-green.jpg' },
        { id: 2, color: 'Blue', img: '../img/Socks-blue.jpg' },
      ],
      cart: 0,
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
      this.stock -= 1;
    },
    removeFromCart() {
      if (this.cart >= 1) {
        this.cart -= 1;
        this.stock += 1;
      }
    },
    changeImg(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].img;
    },
  },
});

var app = new Vue({
  el: '#app',
});
