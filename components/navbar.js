Vue.component('navbar-home', {
  template: `
    <div>
      <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-danger">
        <a class="navbar-brand text-white" :href="urlHome">RISTORE</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <i class="fa fa-th-list"></i>
                Kategori
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <div v-for="category in categories">
                  <a class="dropdown-item" :href="category.url">
                    {{ category.name }}
                    <i class="fa fa-angle-right"></i>
                  </a>
                </div>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Lihat Selengkapnya</a>
              </div>
            </li>
            <li>
              <form class="form-inline my-2 my-lg-0 space">
                <input class="form-control mr-sm-1" type="search" name="search" v-model="searchText" placeholder="Aku mau belanja..." aria-label="Search">
                <button class="btn btn-outline-light my-2 my-sm-0" type="submit">
                  <i class="fa fa-search"></i> Search</button>
              </form>
            </li>
          </ul>
          <div class="dropdown show">
            <a class="dropdown-toggle text-white nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              Lihat Status Transaksi
            </a>
            <form class="dropdown-menu p-4">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Kode Pembeli">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Nomor Transaksi">
              </div>
              <button type="submit" class="btn btn-success">Cek Status</button>
            </form>
          </div>
          <a class="btn btn-outline-light btn-sm space" href="#" data-toggle="modal" data-target="#exampleModalLong">
            <i class="fa fa-shopping-cart" style="font-size: 20px"></i>
            <span class="badge badge-light">{{ carts.length }}</span>
          </a>
          <a class="btn btn-outline-light btn-sm space text-white" @click="logout">Logout</a>
        </div>
      </nav>

      <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-info" id="exampleModalLongTitle">Your Shopping Cart</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="card">
                      <div class="card-header">Daftar Pembelian</div>
                      <div class="card-body">
                        <table class="table table-responsive">
                          <thead>
                            <tr>
                              <th scope="col">Nomor Transaksi</th>
                              <th scope="col">Pelapak</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>231931202381</td>
                              <td>USER 0014</td>
                              <td></td>
                            </tr>
                          </tbody>
                          <thead>
                            <tr>
                              <th>Catatan Untuk Pelapak</th>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>-</td>
                            </tr>
                          </tbody>
                          <thead>
                            <tr>
                              <th>Detail Barang</th>
                              <th>Jumlah</th>
                              <th>Harga</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="cart in carts">
                              <td>
                                <img :src="cart.image" width="150" alt="">
                                <br>
                                <p>{{ cart.title }}</p>
                              </td>
                              <td>{{ totalBarang }}</td>
                              <td>{{ convertPrice(cart.price) }}</td>
                            </tr>
                          </tbody>
                          <thead>
                            <tr>
                              <th></th>
                              <th></th>
                              <th>Total Harga</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td></td>
                              <td></td>
                              <td>{{ convertPrice(cartTotal) }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" @click="checkOut">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      searchText: '',
      carts: [],
      cartTotal: 0,
      urlHome: 'http://localhost:8080/home.html',
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
    }
  },

  methods: {
    logout: function() {
      localStorage.removeItem('token')
      window.location = 'http://localhost:8080/index.html'
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
    convertPrice: function(price) {
      return `Rp. ${Number(price).toLocaleString()}`
    },
  }
})