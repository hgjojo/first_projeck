//加载轮播图片
$(()=>{
	const LIWIDTH=950;
	$.get("data/index/getCarousel.php").then(data=>{
		// console.log(data);
	var html="";
	for(var img of data){
	html+=`<li>
              <a href="${img.href}" title="${img.title}">
                <img src="${img.img}">
              </a>
            </li>`;
	}
	html+=`<li>
    <a href="${data[0].href}" title="${data[0].title}">
      <img src="${data[0].img}">
    </a>
  </li>`;
	var $ul=$(".banner-img");
	$ul.html(html).css("width",LIWIDTH*(data.length+1));
	//console.log($ul);
	var $ids=$(".indicators");
	$ids.html("<li></li>".repeat(data.length))
		.children().first().addClass("hover");
	// console.log($ids);
	const WAIT=3000,DURA=500;
	  var moved=0,timer=null;
	  function move(dir=1){
		moved+=dir;
		$ul.animate({
		  left:-LIWIDTH*moved
		},DURA,()=>{
      if(moved==data.length){
        $ul.css("left",0);
        moved=0;
      }

      $ids.children(":eq("+moved+")")
        .addClass("hover")
        .siblings().removeClass("hover")
    })
  }
	  var timer=setInterval(move,WAIT);
		$(".banner-pic").hover(
			()=>{clearInterval(timer);timer=null;},
				()=>{timer=setInterval(move,WAIT);}
		);
		//console.log(111);
		$("[data-move=right]").click(()=>{
			if(!$ul.is(":animated")){
				move();
			}
		});
		$("[data-move=left]").click(()=>{
			if(!$ul.is(":animated")){
				if(moved==0){
					$ul.css("left",-LIWIDTH*data.length);
					moved=data.length;
				}else{
					move(-1);
				}
			};
		});
		$ids.on("mouseover","li",function(){
			var $li=$(this);
			var i=$li.index();
			moved=i;
			$ul.stop(true).animate({
				left:-LIWIDTH*moved
			},DURA,()=>{
				$ids.children(":eq("+i+")").addClass("hover")
				.siblings().removeClass("hover");
			})
		});

	})
})

//鼠标进入轮播img区域，左右按钮显示半透明状态  .ck-slide
	$(".banner-pic").mouseenter(()=>{
		$(".ck-slide").css("opacity",0.3);
	})
//鼠标离开轮播img区域，隐藏
$(".banner-pic").mouseleave(()=>{
	$(".ck-slide").css("opacity",0);
})
//加载楼层
$(()=>{
	//ajax({
	//	type:"get",
	//	url:"data/index/getFloors.php",
	//	data:"{recommend=$recommend,phone=$phone,book=$book,tv=$tv,earphone=$earphone,sales=$sales}"
	//}).then(output=>{
	//	console.log(output.recommend);
	//	var {recommend=recommend,phone=phone,book=book,tv=tv,earphone=earphone,sales=sales}=output;
	$.get("data/index/getFloors.php").then(output=>{
		console.log(output);
		var {recommend,phone,book,tv,earphone,sales}=output;
		//console.log(output.recommend);
		//加载1楼
		var html="";
		for(var i=0;i<recommend.length;i++){
			var e=recommend[i];
			//console.log(e);
		html+=`<ul>
				<li>
					<div class="products-1">
						<a href="000-${e.href}"><img src="${e.pic}"></a>
						<h4>${e.title}</h4>
						<p>${e.details}</p>
						<div class="price">¥${e.price}</div>
					</div>
			</li>
		</ul>`;
		}
		document.querySelector(".floor-1>.products").innerHTML=html;
		//加载2楼 手机
		//console.log(phone);
		var html=`<div class="discovery-left">
					<div class="discovery-left-top">
						<a href="000-${e.href}"><img src="${phone[0].pic}"></a>
					</div>
					<div class="discovery-left-bottom"><ul>`;
		for(var i=1;i<3;i++){
			//console.log(phone[1]);
			//console.log(phone[2]);
			var e=phone[i];
			html += `<li><a href="000-${e.href}"><img src="${e.pic}"></a></li>`;
		}
		html+=`</ul></div></div>`;
		html+=`<div class="discovery-right">
		<div class="discovery-right-top">
		<ul>`;
		for(var i=3;i<5;i++){
			var e=phone[i];
			html+=`<li><a href="000-${e.href}"><img src="${e.pic}" alt=""></a></li>`;
		}
		html+=`</ul></div>`;
		html+=`<div class="discovery-right-middle"><!-- 590*190 -->
					<a href="000-${e.href}"><img src="${phone[8].pic}" alt=""></a>
					</div>`;
		html+=`<div class="discovery-right-bottom"><!-- 290*190 -->
						<ul>`;
		for(var i=6;i<8;i++){
			var e=phone[i];
			html+=`<li><a href="000-${e.href}"><img src="${e.pic}" alt=""></a></li>`;
		}
			html+=`</ul></div>`;
		html+=`</div></div>`;
		document.querySelector(".discovery>.floor-2-pic").innerHTML=html;
		//加载楼层3 笔记本
		console.log(book);
		var html=`<div class="Man-left">
					<div class="Man-left-top">
						<a href="000-${e.href}"><img src="${book[0].pic}"></a>
					</div>
					<div class="Man-left-bottom"><ul>`;
		for(var i=1;i<3;i++){
			//console.log(book[1]);
			//console.log(book[2]);
			var e=book[i];
			html += `<li><a href="000-${e.href}"><img src="${e.pic}"></a></li>`;
		}
		html+=`</ul></div></div>`;
		html+=`<div class="Man-right">
		<div class="Man-right-top">
		<ul>`;
		for(var i=3;i<5;i++){
			var e=book[i];
			html+=`<li><a href="000-${e.href}"><img src="${e.pic}" alt=""></a></li>`;
		}
		html+=`</ul></div>`;
		html+=`<div class="Man-right-middle"><!-- 590*190 -->
					<a href="000-${e.href}"><img src="${book[5].pic}" alt=""></a>
					</div>`;
		html+=`<div class="Man-right-bottom"><!-- 290*190 -->
						<ul>`;
		for(var i=6;i<8;i++){
			var e=book[i];
			html+=`<li><a href="000-${e.href}"><img src="${e.pic}" alt=""></a></li>`;
		}
		html+=`</ul></div>`;
		html+=`</div></div>`;
		document.querySelector(".Man>.floor-3-pic").innerHTML=html;
		//加载楼层4 电视
		console.log(tv);
		var html=`<div class="Home-left">
					<div class="Home-left-top">
						<a href=""><img src="${tv[0].pic}"></a>
					</div>
					<div class="Home-left-bottom"><ul>`;
		for(var i=1;i<3;i++){
			//console.log(tv[1]);
			//console.log(tv[2]);
			var e=tv[i];
			html += `<li><a href="000-${e.href}"><img src="${e.pic}"></a></li>`;
		}
		html+=`</ul></div></div>`;
		html+=`<div class="Home-right">
		<div class="Home-right-top">
		<ul>`;
		for(var i=3;i<5;i++){
			var e=tv[i];
			html+=`<li><a href="000-${e.href}"><img src="${e.pic}" alt=""></a></li>`;
		}
		html+=`</ul></div>`;
		html+=`<div class="Home-right-middle"><!-- 590*190 -->
					<a href="000-${e.href}"><img src="${tv[5].pic}" alt=""></a>
					</div>`;
		html+=`<div class="Home-right-bottom"><!-- 290*190 -->
						<ul>`;
		for(var i=6;i<8;i++){
			var e=tv[i];
			html+=`<li><a href="000-${e.href}"><img src="${e.pic}" alt=""></a></li>`;
		}
		html+=`</ul></div>`;
		html+=`</div></div>`;
		document.querySelector(".Home>.floor-4-pic").innerHTML=html;
		//加载楼层4 耳机
		console.log(earphone);
		var html=`<ul>`;
		for(var i=0;i<4;i++){
			var e=earphone[i];
				html+=`<li><a href="000-${e.href}"><img src="${e.pic}" alt=""></a></li>`;
		}
				html+=`</ul></div>`;
			document.querySelector(".Wei>.Wei-pic").innerHTML=html;
	})
	})
