var app = new Vue({
  el: '#app',
  data: {
    categories: [
      {
        name: 'Laptop',
        url: 'http://localhost:8080/category/laptop.html'
      },
      {
        name: 'Sticker',
        url: 'http://localhost:8080/category/sticker.html'
      }
    ],
    tagPopuler: [
      'Kolam Renang Anak',
      'Ransel Rolltop',
      'Topi Fedora',
      'Whey Protein',
      'Gaming Mouse',
      'Perfect V Lifting Premium Mask'
    ],
    promoTheDay: [
      {
        imgUrl: 'https://s1.bukalapak.com/uploads/flash_banner/16013/s-392-392/392x392.jpg.webp',
        title: 'Ayo Serbu Pembelian Pertamamu',
      },
      {
        imgUrl: 'https://s1.bukalapak.com/uploads/flash_banner/61013/s-392-392/392x392_hp.jpg.webp',
        title: 'Orang Pintar Pakai Hp Pintar'
      },
      {
        imgUrl: 'https://s2.bukalapak.com/uploads/flash_banner/22013/s-392-392/392x392_fashion_brand.jpg.webp',
        title: 'Bebaskan Gayamu dengan OOTD Terbaru'
      },
      {
        imgUrl: 'https://s3.bukalapak.com/uploads/flash_banner/82013/s-392-392/392x392_kamera.jpg.webp',
        title: 'Promo Bundling Kamera Cek Aja!'
      },
      {
        imgUrl: 'https://s1.bukalapak.com/uploads/flash_banner/13013/s-392-392/392x392_laptop.jpg.webp',
        title: 'Kerja Semangat dengan Laptop Mutu Dahsyat'
      },
      {
        imgUrl: 'https://s2.bukalapak.com/uploads/flash_banner/73013/s-392-392/392x392_brand.jpg.webp',
        title: 'Merdeka Belanja Produk Brand Ternama'
      }
    ],
    listElektronik: [],
    listStickers: [],
    listAllItem: [],
    carts: [],
    cartTotal: 0,
    totalBarang: 0,
    searchText: '',
    email: '',
    password: '',
    fullname: '',
    urlHome: 'http://localhost:8080/home.html'
  },
  methods: {
    convertPrice: function(price) {
      return `Rp. ${Number(price).toLocaleString()}`
    },

    orderItem: function(id, image, title, price) {
      this.carts.push({
        id: id,
        image: image,
        title: title,
        price: price,
      })
      this.cartTotal += Number(price)
    },

    listAllDataItems() {
      axios.get('http://localhost:3030/api/items')
      .then(respon => {
        respon.data.dataAllItem.forEach(item => {
          this.listAllItem.push({
            id: item._id,
            imgUrl: item.imgUrl,
            title: item.title,
            price: item.price,
            category: item.category,
            stars: '5'
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
    },

    checkOut: function() {
      console.log(this.carts)
      const token = localStorage.getItem('token')
      axios({
        method: 'PATCH',
        url: 'http://localhost:3030/api/customers/itemCollection',
        data: {
          item: this.carts
        },
        headers: {
          token: token
        }
      })
        .then(() => {
          swal("Checkout Success. Thanks!", "Happy Shopping", "success");
          setTimeout(() => {
            window.location = 'http://localhost:8080/home.html'
          }, 2000)
          console.log('success checkout')
        })
        .catch(err => {
          console.log(err)
        })
    },

    descriptionItem: function(image, title, price) {
      swal({
        title: title,
        text: this.convertPrice(price),
        icon: image,
        imageAlt: 'Custom image',
      })
    },

    formSignin: function() {
      window.location = 'http://localhost:8080/signin.html'
    },

    formSignup: function() {
      window.location = 'http://localhost:8080/signup.html'
    },

    logout: function() {
      localStorage.removeItem('token')
      window.location = 'http://localhost:8080/index.html'
    },

    signin: function() {
      axios({
        method: 'POST',
        url: 'http://localhost:3030/api/customers/signin',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(result => {
          localStorage.setItem('token', result.data.token)
          swal({
            type: 'success',
            title: 'Signin success',
            text: 'Congrats',
          })
          setTimeout(() => {
            window.location = 'http://localhost:8080/home.html'
          }, 2000)
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Email or password wrong',
            text: 'Try again!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },

    signup: function() {
      axios({
        method: 'POST',
        url: 'http://localhost:3030/api/customers',
        data: {
          fullname: this.fullname,
          email: this.email,
          password: this.password
        }
      })
        .then(result => {
          localStorage.setItem('token', result.data.token)
          swal({
            type: 'success',
            title: 'Signup success',
            text: 'Congratulations 🎉',
          })
          setTimeout(() => {
            window.location = 'http://localhost:8080/home.html'
          }, 2000)
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Email already exists, or Password must have one uppercase, lowercase, number, and a minimum length of 6 characters',
            text: 'Try again!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    }
  },
  mounted() {
    this.listAllDataItems()
  },
  computed: {
    filteredListAllItem() {
      let self = this
      return self.listAllItem.filter(post => {
        let title = post.title.toLowerCase()
                    .includes(self.searchText.toLowerCase())
        return title
      })
    }
  }
})