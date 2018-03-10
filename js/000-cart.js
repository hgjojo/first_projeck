(()=> {
    // var toCart = document.querySelector(".cart-result>a");
    // console.log(toCart);
    // toCart.onclick = e => {
    //     e.preventDefault();
    //     location = "000-cart.html?back=" + location.href;
    //
    // }
    var content=
        document.getElementById("content-box-body");
    console.log(content);
    var chbAll=
        document.querySelector(".check-top>img");
    console.log(chbAll);
    chbAll.onclick=e=> {
        var checked = 0;
        if (e.target.src.endsWith("normal.png"))
            checked = 1;
        ajax({
            type: "get",
            url: "data/cart/selectAll.php",
            data: "checked=" + checked
        }).then(loadCart);
    }
    content.onclick=e=>{
        var tar=e.target;
        if(tar.className.match(/chk|add|reduce|delete/i)){
            if(tar.className=="chk"){
                var checked=0;
                if(tar.src.endsWith("normal.png"))
                    checked=1;
                ajax({
                    type:"get",
                    url:"data/cart/selectOne.php",
                    data:"iid="+tar.dataset.iid+"&checked="+checked
                }).then(loadCart);
            }
        }
    }
    function loadCart(){
        ajax({
            type:"get",
            url:"data/cart/getCart.php",
            dataType:"json"
        }).then(data=>{
            var html="",total=0,selected=0, selectAll=true;
            for(var item of data){
                html+=`<div class="imfor">
          <div class="check">
            <img class="chk" data-iid=${item.iid} src="${
                    item.is_checked=="1"?
                        "image/cart/product_true.png":
                        "image/cart/product_normal.png"
                    }" alt="">
          </div>
          <div class="product">
            <a href="000-product_details.html?lid=${item.lid}">
              <img src="${item.sm}" alt="">
            </a>
            <span class="desc">
              <a href="000-product_details.html?lid=${item.lid}">${item.title}</a>
            </span>
            <p class="col">
              <span>规格：</span>
              <span class="color-desc">${item.spec}</span>
            </p>
          </div>
          <div class="price">
            <p class="price-desc">会员价</p>
            <p>
              <b>¥</b>${item.price}
            </p>
          </div>
          <div class="num" data-iid=${item.iid}>
            <span class="reduce">-</span>
            <input type="text" value="${item.count}">
            <span class="add">+</span>
          </div>
          <div class="total-price">
            <span>¥</span>
            <span>${(item.price*item.count).toFixed(2)}</span>
          </div>
          <div class="del">
            <a class="delete" href="#">删除</a>
          </div>
        </div>`;
                item.is_checked=="1"&&(
                    selected++,
                        total+=item.price*item.count
                );
                item.is_checked=="0"&&(selectAll=false);
            }
            content.innerHTML=html;
            document.querySelector(".totalPrices")
                .innerHTML=
                document.querySelector(".foot-price")
                    .innerHTML="¥"+total.toFixed(2);
            document.querySelector(".total")
                .innerHTML=
                document.querySelector(".totalOne")
                    .innerHTML=selected;
            chbAll.src=selectAll?
                "image/cart/product_true.png":
                "image/cart/product_normal.png";
        })
    }
    ajax({
        type:"get",
        url:"data/user/isLogin.php",
        dataType:"json"
    }).then(data=>{
        if(data.ok==1) loadCart();
        else
            location="000-login.html?back="+location.href;
    })
})()

