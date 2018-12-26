var app = new Vue({
  el: '#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Socks',
    selectedVariant: 0,
    link: 'https://www.google.co.jp/',
    stock: 1,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {id: 1, color: "Green", img:"../img/Socks-green.jpg"},
      {id: 2, color: "Blue", img: "../img/Socks-blue.jpg"},
    ],
    cart: 0,
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
