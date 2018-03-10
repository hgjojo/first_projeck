//1 搜索滚动
(()=>{
    ajax({
        type:"get",
        url:"000-header.html"
    }).then(html=>{
        document.getElementById("header").innerHTML=html;
        window.addEventListener("scroll",function(){
    var scrollTop=document.documentElement.scrollTop||
        document.body.scrollTop;
        // console.log(scrollTop);
    var topSearch=document.getElementById("top-search");
        // console.log(topSearch);
    if(scrollTop>=622){
        topSearch.className="clear fixed";
    }else{
        topSearch.className="clear";
    }
    });
//2 登陆注册
var loginList=
        document.getElementById("loginList"),
    welcomeList=
        document.getElementById("welcomeList"),
    welUname=document.getElementById("welUname");
    //console.log(loginList);
    //console.log(welcomeList);
    //console.log(welUname);
    ajax({
        type:"get",
        url:"data/user/isLogin.php",
        dataType:"json"
    }).then(data=>{
    if(data.ok==0){
        loginList.style.display="block";
        welcomeList.style.display="none";
        //alert("注册失败");
        //welUname.innerHTML=data.uname;
    }else{
        loginList.style.display="none";
        welcomeList.style.display="block";
        welUname.innerHTML=data.uname;
        }
    })
    var exet=document.getElementById("exet");
        //console.log(exet);
        exet.onclick=function(e){
            e.preventDefault();
           ajax({
               type:"get",
               url:"data/user/logout.php"
           }).then(location.reload(true));
        }
    var aSearch=document.getElementById("aSearch"),
        textSearch=document.getElementById("textSearch");
        console.log(aSearch);
        console.log(textSearch);
        aSearch.onclick=(e)=>{
            e.preventDefault();
            if(textSearch.value.trim() !==""){
                location=
                    "000-product.html?kw="+textSearch.value.trim();
            }
            if(location.search.indexOf("kw=")!=-1){
            textSearch.value=decodeURI(
                location.search.split("=")[1]
            );
            }
        }

})
})()
