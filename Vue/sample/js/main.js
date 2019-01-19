Vue.component('product', {
  props: ['cart'],
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

      </div>
    </div>
  `,
  data: function () {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
      link: 'https://www.google.co.jp/',
      stock: 10,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        { id: 1, color: 'Green', img: '../img/Socks-green.jpg' },
        { id: 2, color: 'Blue', img: '../img/Socks-blue.jpg' },
      ],
      isBought: true,
    };
  },
  methods: {
    addToCart() {
      this.stock -= 1;
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id, this.isBought);
    },
    removeFromCart() {
      var target = this.variants[this.selectedVariant].id;
      isRemovable = this.cart.some(function (item) {
        return target === item;
      });

      if(isRemovable) {
        this.stock += 1;
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id, !this.isBought);
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
  data: {
    cart: [],
  },
  methods: {
    /**
      run when addToCart, removeFromCart buttons are blicked.
      [args]
        id: productID
        purchaseFlg: judge to add or remove
    */
    updateCart(id, purchaseFlg) {
      if (purchaseFlg) {
        this.cart.push(id);
      } else {
        let removeTargetIndex = this.cart.lastIndexOf(id);
        if (removeTargetIndex !== -1) {
          this.cart.splice(removeTargetIndex, 1);
        }
      }
    },
  },
});
