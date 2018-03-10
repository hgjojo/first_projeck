$(()=>{
    var lid=location.search.split("=")[1];
    //console.log(lid);
   var pic_sms=document.getElementById("pic-left_s"),
   pic_md=document.getElementById("pic-left_b");
    //var buy=document.querySelector(".shops>.buy");
    //console.log(buy);
    //console.log(pic_md);
    pic_big=document.getElementById("pic_big"),
    pic_cbig=document.getElementById("pic_cbig"),
       pic_lbig=document.getElementById("pic_lbig");
    console.log(pic_big);
    //buy.onclick=e=>{
    //    e.preventDefault();
    //    var tar= e.target;
    //    ajax({
    //        type:"get",
    //        url:"data/cart/addCart.php"
    //    }).then(data=>{
    //        location="000-cart.html?back"+location.href;
    //    });
    //}
    pic_sms.onmouseover=e=>{
            var tar=e.target;
            if(tar.nodeName=="IMG"){
                document.getElementById("pic_md").
               src=tar.dataset.md;
                pic_lbig.style.backgroundImage=`url(${tar.dataset.lg})`;

            }
        }
    //放大镜
    //为中图片pic_md绑定鼠标移入事件
    pic_cbig.onmouseover=e=>{
        pic_big.style.display="block";
        pic_lbig.style.display="block";
    }
    //为中图片pic_md绑定鼠标移出事件
    pic_cbig.onmouseout=e=>{
        pic_big.style.display="none";
        pic_lbig.style.display="none";
    }
    var MSIZE=250,MAX=250;
    pic_cbig.onmousemove=e=>{
            var t=e.offsetY-MSIZE/2,
                l=e.offsetX-MSIZE/2;
        console.log(t,l);
        pic_big.style.top=t+"px";
        pic_big.style.left=l+"px";
        if(t<0){
            t=0;
        }else if(t>MAX){
            t=MAX;
        };
        if(l<0){
            l=0;
        }else if(l>MAX){
            l=MAX;
        };
        pic_big.style.top=t+"px";
        pic_big.style.left=l+"px";
        document.getElementById("pic_md")
            .style.cssText+=`top:${t}px;left:${l}px`;
        pic_lbig.style.backgroundPosition=`-${l*2.194}px -${t*2.03}px`;
    }
    $.ajax({
        type:"get",
        url:"data/product/getProductById.php",
        data:"lid="+lid
    }).then(output=>{
        //console.log(output);
        var info=output.product_info;
        console.log(info);
        var imgs=output.pic_list;
        console.log(imgs);
        pic_md.src=imgs[0].md;
        pic_lbig.style.backgroundImage=`url(${imgs[0].lg})`;
        var html=``;
        for(var pic of imgs){
            html+=`<img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"/>`;
        }
        //console.log(html);
        document.getElementById("pic-left_s").innerHTML=html;
        html=`<img id="pic_md" src="${pic.md}" alt=""/>`;
        document.getElementById("pic-left_b").innerHTML=html;
        html=`<ul>
					<li>
						<h2>${info.title}</h2>
					</li>
					<li><h1>¥ <span>${info.price}<span></h1></li>
			</ul>`;
        document.getElementById("product_introduce").innerHTML=html;
        html=`<ul class="spec-area">
								<li class="spec-item">
									<span class="item-label">选择颜色</span>
									<span class="item-content">
										<a href="javascript:;">
											<img src="${info.color}" alt=""/>
										</a>
									</span>
								</li>
							</ul>`;
        document.getElementById("product_spec").innerHTML=html;
        html=`<ul>
				<li class="opt-item">
					<span class="opt-item-label">选择容器</span>
					<span class="opt-item-content">
						<a href="javascript:;">${info.disk}</a>
					</span>
				</li>
			</ul>`;
         document.getElementById("product_opt").innerHTML=html;
         html=`<ul>${info.miaosu}</ul>`;         
         document.getElementById("product").innerHTML=html;
        //html=`<ul>
			//					<li>
			//						<a href=""><img src="image/product_details/recommend-pic/6.jpg" alt=""/></a>
			//						<p>Apple iPhone 7 移动联通电信4G手机</p>
			//					</li>
			//					<li>
			//						<a href=""><img src="image/product_details/recommend-pic/2.jpg" alt=""/></a>
			//						<p>狗尾草（Gowild ） 公子小白成长版智能萌宠机器人</p>
			//					</li>
			//					<li>
			//						<a href=""><img src="image/product_details/recommend-pic/3.jpg" alt=""/></a>
			//						<p>卡西欧（CASIO） TR-M10 自拍数码相机</p>
			//					</li>
			//					<li>
			//						<a href=""><img src="image/product_details/recommend-pic/4.jpg" alt=""/></a>
			//						<p>微软（Microsoft）Surface Pro（新）12.3英寸平板</p>
			//					</li>
        //
			//					<li>
			//						<a href=""><img src="image/product_details/recommend-pic/6.jpg" alt=""/></a>
			//						<p>三星（SAMSUNG）65英寸 平面电视（银色）</p>
			//					</li>
			//				</ul>`;
		html=`${info.details}`;
		document.getElementById("param").innerHTML=html;
    })

})


