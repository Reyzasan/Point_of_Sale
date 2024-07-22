document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>')

function print() {
    var statuspemesanan = document.getElementById('Pilih');
    var kasirDropdown = document.getElementById('Kasir');
    var status = statuspemesanan.options[kasirDropdown.selectedIndex].text;
    var Nama = kasirDropdown.options[kasirDropdown.selectedIndex].text;
    var newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>STARBHAK MART</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
            </style>
        </head>
        <body>
            <h2 style="text-align: center">STARBHAK MART</h2>
            <h6 style="text-align: center">Best Caffe in the Town<h6>
            <table border="1" style="width:100%">
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                </tr>
    `);

    cart.forEach(function (item) {
        newWindow.document.write(`
            <tr>
                <td>${item.name}</td>
                <td>${item.count}</td>
                <td>Rp. ${item.price.toLocaleString('id-ID')}</td>
            </tr>
        `);
    });

    var pajak = getPajak();
    var totalAmount = getTotalAmount();

    newWindow.document.write(`
            <p>${status}<p>
            <p>Kasir: ${Nama}</p>
            </table>
                <p>Total: Rp. ${getTotal().toLocaleString('id-ID')}</p>
                <p>Pajak: Rp. ${pajak.toLocaleString('id-ID')}</p>
                <p>Total Amount: Rp. ${totalAmount.toLocaleString('id-ID')}</p>
            </body>
            </html>
        `);
    
    newWindow.document.close();
    newWindow.print();
    return false;
}

function getTotal() {
    var tot = 0;
    for(var i = 0; i < cart.length; i++) {
        tot = tot + (cart[i].count * cart[i].price)
    }
    return tot;
}

function getTotalAmount() {
    return getTotal() + getPajak();
}

function getPajak() {
    var Pajak = 0;
    for (var i = 0; i < cart.length; i++) {
        Pajak += cart[i].count * cart[i].price * 0.1;
    }
    return Pajak;
}


  var cart = [];
  function tambahpesanan(name, count, price) {
      var existingItem = cart.find(element => element.name === name);
      if (!existingItem) {
          cart.push({ name: name, count: count, price: price });
      } else {
          existingItem.count++;
      }
      showCartList();
  }



  function showCartList() {
      $(".listorder").empty();
      totalHarga = 0 ;
      cart.forEach(function (item, index) {
          $(".listorder").append(`  <div class="card" style="display: flex;">

        <div class="col-11">
        <div class="row" style="margin-left: 5px;">
            <div class="bungkus" style="margin-top: 8px; display: flex;">
                <p style="font-size: 16px; margin: 0; font-weight: 900 ; width: 120px">`+ item.name + `</p>
                <div class="col-2">
                    <i class='bx bx-trash' style="cursor: pointer; font-size: 50px; margin-left: 90px;" onclick="Hapus(`+ index + `)"></i>
                </div>
            </div>
        </div>
        <div class="row" style="margin-top: 25px;">
            <div class="bungkus1" style="display: flex; margin-top: -7%; margin-left: 8px;">
                <p style="font-size: 14px;">Unit Price :</p>
                <h6 style="margin-left: 15px; font-size: 16px;">Rp. `+ item.price.toLocaleString('id-ID') + `</h6>

                <p style="margin-left: 15px; font-size: 14px; d-flex"></p>
                <div class="col-md-3 d-flex justify-content-between" style="margin-left: 10px">
                    <button class="btn btn-primary" onclick="TambahQty(`+ index + `)">+</button>
                    <h5 id="qty`+ index + `" style:"margin: 20%">`+ item.count + `</h5>
                    <button class="btn btn-primary" onclick="KurangiQty(`+ index + `)">-</button>
                </div>
            </div>
        </div>
        </div>
        </div>`);
      })
      console.log(cart)
      var tot = 0;
      var pjkpersentase = 0.1;
      var totalpajak = 0;
  
      for (var i = 0; i < cart.length; i++) {
          tot = tot + (cart[i].count * cart[i].price);
  
          var Pajak = cart[i].count * cart[i].price * pjkpersentase;
          totalpajak += Pajak;
      }
  
      var total = totalpajak + tot;
  
      $("#tot").text("Rp. " + tot.toLocaleString('id-ID'))
      $("#pajak").text("Rp. " + totalpajak.toLocaleString('id-ID'))
      $("#total").text("Rp. " + total.toLocaleString('id-ID'))
  }
  function Hapus(index) {
      let text;
      if (confirm (cart.splice(index, 1) && "Apakah Anda Yakin Untuk menghapus pesanan?")) {
          showCartList();
      } 

  }

  function TambahQty(index) {
    cart[index].count++;
    showCartList();
}

function KurangiQty(index) {
    if (cart[index].count > 1) {
        cart[index].count--;
        showCartList();
    }
}


  