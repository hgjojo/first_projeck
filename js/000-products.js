(()=>{
    var kw = location.search.split("=")[1];
    var showList=document.getElementById("show-list");

    showList.onclick=e=>{
       var tar=e.target;
        if(tar.className.match(/add|reduce|addCart/i)){
            if(tar.className != "addCart") {
                var n = parseInt(tar.parentNode.children[1].value);
                if (tar.innerHTML == "+") {
                    n++;
                } else if (n > 1) {
                    n--;
                }
                tar.parentNode.children[1].value = n;
            }else{
                ajax({
                    type:"get",
                    url:"data/user/isLogin.php",
                    dataType:"json"
                }).then(data=>{
                    console.log(data);
                    if(data.ok==0){
                        location="000-login.html?back="+location.href;
                    }else{
                        var lid= tar.parentNode.dataset.lid;
                        console.log(lid);
                        var count = tar.parentNode.children[1].value;
                        console.log(count);
                        ajax({
                            type:"get",
                            url:"data/cart/addCart.php",
                            data:`lid=${lid}&count=${count}`
                        }).then(()=>{
                            tar.parentNode.children[1].value=1;
                            loadCart();
                        })
                    }
                })
            }
        }
    }
    var cartContent = document.querySelector(".cart_content");
    //console.log(cartContent);
    cartContent.onclick=e=>{
        var tar = e.target;
        console.log(tar);
        if(tar.className.match(/add|reduce/i)){
            var n = parseInt(tar.parentNode.children[1].value);
            //console.log(n);
            var iid=tar.parentNode.dataset.iid;
            //console.log(iid);
            ajax({
                type:"get",
                url:"data/cart/updateCart.php",
                data:`iid=${iid}&count=${tar.className=="add"?n+1:n-1}`
            }).then(loadCart);
        }
    }
    function loadCart(){
        ajax({
            type:"get",
            url:"data/cart/getCart.php",
            dataType:"json"
        }).then(data=>{
            console.log(data);
            var html="",
            total=0;
            for(var item of data) {
                html += `<div class="item">
                      <span><a href="000-product_details.html?lid=${item.lid}" title="${item.title}">${item.title}</a></span>
                      <div data-iid="${item.iid}">
                        <span class="reduce">-</span>
                        <input type="text" value="${item.count}">
                        <span class="add">+</span>
                      </div>
                      <p>
                        <span>¥${(item.price * item.count).toFixed(2)}</span>
                      </p>
                    </div>`;
                total+=item.count*item.price;
            }
            cartContent.innerHTML=html;
            document.getElementById("total").innerHTML = total.toFixed(2);
        })
    }
    ajax({
        type:"get",
        url:"data/user/isLogin.php",
        dataType:"json"
    }).then(data=>data.ok && loadCart());

    ajax({
        type:"get",
        url:"data/product/getProductByKw.php",
        data:kw?"kw="+kw:"",
        dataType:"json"
    }).then(output=>{
        var data=output.data;
        console.log(data);
        var html="";
        for(var p of data){
            html+=`<li>
          <a href="000-product_details.html?lid=${p.lid}">
            <img src="${p.md}" alt="">
          </a>
          <p>
            <span class="price">¥${p.price}</span>
            <a href="000-product_details.html?lid=${p.lid}">${p.title}</a>
          </p>
          <div data-lid="${p.lid}">
            <span class="reduce">-</span>
            <input type="text" value="1">
            <span class="add">+</span>
            <a href="javascript:;" class="addCart">加入购物车</a>
          </div>
        </li>`
        }
        showList.innerHTML=html;
    });
    var toCart = document.querySelector(".cart-result>a");
    console.log(toCart);
    toCart.onclick = e => {
        e.preventDefault();
        location = "000-cart.html?back=" + location.href;

    }
})()