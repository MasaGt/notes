var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: '../img/Socks-green.jpg',
    link: 'https://www.google.co.jp/',
    stock: 11,
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
    },
    removeFromCart() {
      if (this.cart >= 1) {
        this.cart -= 1;
      }
    },
    changeImg(showImg) {
      this.image = showImg;
    }
  }
});
