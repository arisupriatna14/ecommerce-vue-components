Vue.component('card-list-item', {
  template: `
    <div class="row">
      <div class="col-lg-3" v-for="item in listAllItem">
        <br>
        <div class="card">
          <img :src="item.imgUrl" class="card-img-top" style="height: 15rem; object-fit: cover" alt="">
          <div class="card-body">
            <small>
              <a href="#" class="text-dark">{{ item.title }}</a>
              <br>
              <br> {{ convertPrice(item.price) }}
            </small>
            <br>
            <i class="fa fa-star checked" v-for="stars in Number(item.stars)"></i>
            <i class="fa fa-diamond"></i>
            <br>
            <br>
            <button class="btn btn-danger btn-sm" @click="descriptionItem(item.imgUrl, item.title, item.price)">Descriptions</button>
            <button @click="orderItem(item.id, item.imgUrl, item.title, item.price)" class="btn btn-danger btn-sm">Beli Sekarang</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      listAllItem: []
    } 
  },

  methods: {
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

    descriptionItem: function(image, title, price) {
      swal({
        title: title,
        text: this.convertPrice(price),
        icon: image,
        imageAlt: 'Custom image',
      })
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

    convertPrice: function(price) {
      return `Rp. ${Number(price).toLocaleString()}`
    },
  },

  mounted() {
    this.listAllDataItems()
  },
})