

// ---------nhận diện thiết bị
var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.search("iphone") > -1) {
    document.querySelector(".apk-mb").style.display = 'none';
    document.querySelector(".gg-play-mb").style.display = 'none';

} else if (userAgent.search("android") > -1) {
    document.querySelector(".appstore-mb").style.display = 'none';
} else if (userAgent.search("ipad") > -1) {
    document.querySelector(".apk").style.display = 'none';
    document.querySelector(".gg-play").style.display = 'none';
    document.querySelector(".appstore img").style.width = "36%";
}



//------- responsive mobile
var jsVer = 15;
var phoneWidth = parseInt(window.screen.width);
console.log(phoneWidth);
var phoneScale = phoneWidth / 640;

if (phoneWidth < 768) {
    var ua = navigator.userAgent;
    if (/Android (\d+\.\d+)/.test(ua)) {
        var version = parseFloat(RegExp.$1);
        // andriod 2.3
        if (version > 2.3) {
            document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
        } else {
            document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
        }

    } else {
        console.log(phoneWidth);
        document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
    }

} else {
    document.write('<meta name="viewport" content="width=768, minimum-scale =1, maximum-scale = 1, target-densitydpi=device-dpi">');
}


// ----show trailer

function showPopup() {
    $("#myModal").toggle();
}


//----- show nhận quà

function showPopupGift() {
    $(".modal-content-gift").toggle();
}


// show Alert

function showAlert() {
    var value = 9999;
    swal("Bạn Đã Đăng Ký Thành Công", "", "success")
        .then((value) => {
            swal("Số Người Đăng Ký: 1", "", "");
        });

}





// 
//function Hien thi thong bao
function show_result(response, callback) {
    var title_choose, title_arr;
    title_arr = ['Lỗi !', 'Chúc mừng !', 'Thông báo', 'Thông báo !'];

    title_choose = (typeof response.title == "undefined" ? title_arr[response.status] : response.title);
    let className = '', text = 'Ok', btn_ok_visible = true;

    console.log(response.title)

    if (response.status == 1) {
        // className='vq_notice';
        // title_choose='';
    } else {
        text = 'Ok';
        btn_ok_visible = true;
    }

    setTimeout(function () {
        var div = document.createElement("div");
        div.innerHTML = response.msg + "<a href='javascript:;' onclick='close_swal()' class=' close_popup'></a>";
        swal({
            title: title_choose,
            content: div,
            className: className,
            buttons: {
                confirm: {
                    text: text,//Đăng nhập
                    value: "confirm",
                    visible: btn_ok_visible,
                    className: "btn_ok",
                    closeModal: true
                }
            }
        }).then((willDelete) => {
            if (typeof response.reload != 'undefined') {
                //Lam moi lại trang
                console.log("ok reload");
                location.reload();
            }

            if (typeof response.redirect !== 'undefined') {
                //Chuyen huong trang
                console.log("ok redirect");
                window.location.href = response.redirect;
            }
            if (typeof callback !== 'undefined') {
                //Callback function other
                console.log("ok callback");

                callback();
                return;
            }
        });
    }, 200);

}



// load 
function Load() {
    $(".xacnhan").click(function () {
        var url;
        url = "Load.html";
        $(".H1-Loading").load(url);
    })

}

//  data table
function GET_DATA() {
    // var div =$(".name");
    var str = "";
    $.get("https://63a90855100b7737b988ad56.mockapi.io/bxh/top10", function (data, status) {
        $.each(data, function (key, value) {
            // div.append($("<li>" +value.username + "</li>")); 
            str += "<tr>";
            str += "<td>" + value.id + "</td>"
            str += "<td>" + value.username + "</td>"
            str += "<td>" + value.server + "</td>"
            str += "<td>" + value.KNB + "</td>"
            str += "</tr>";
           
        });
        $("#load_data").html(str);
    });
}


// popup table
function showPopupTableTop() {
    GET_DATA();
    $(".popup-table").toggle('slow');
}




// popup email
function showPopupEmail() {
    $(".popup").toggle('slow');
}



//function Hien thi thong bao
function show_result(response, callback){
    var title_choose, title_arr;
    title_arr = ['Lỗi !', 'Chúc mừng !','Thông báo', 'Thông báo !'];

    title_choose = ( typeof response.title == "undefined" ? title_arr[response.status] : response.title );
    let className='',text='Ok',btn_ok_visible=true;

    if(response.status==1){
        // className='vq_notice';
        // title_choose='';
    }else{
         text='Ok';
         btn_ok_visible=true; 
    }

    setTimeout(function(){
        var div = document.createElement("div");
        div.innerHTML = response.msg + "<a href='javascript:;' onclick='close_swal()' class=' close_popup'></a>";
        swal({
            title: title_choose,
            content:div,
            className: className,
            buttons:{
                confirm:{
                    text: text,//Đăng nhập
                    value: "confirm",
                    visible: btn_ok_visible,
                    className: "btn_ok",
                    closeModal: true
                }
            }
        }).then((willDelete) => {
            if( typeof response.reload != 'undefined' ){
                //Lam moi lại trang
                console.log("ok reload");
                location.reload();
            }
            
            if( typeof response.redirect !== 'undefined' ){
                //Chuyen huong trang
                console.log("ok redirect");
                window.location.href = response.redirect;
            }
            if (typeof callback !== 'undefined') {
                //Callback function other
                console.log("ok callback");

                callback();
                return;
            }
        });
    },200);

}







// submit form
var form = document.getElementById("promise_form");
function handleForm (event) {event.preventDefault();}
form.addEventListener('submit', handleForm);


function POST_DATA(){
    var email = $('input[name=email]').val();
    if(email==''){
        show_result({ title: "Thông báo !", msg: 'Vui lòng nhập email !' });
    }

    $.ajax({
        url: 'https://thienha3q.vn/db/function.php',
        type: "POST",
        data:{
            email: $("input[name=email]").val(),
            action: "insert"
        },
        success: function(res){

            console.log(res);
        }

    })





}

