var num = 12;
var secondNum = 0;
var lengthJson;
var result = {};
createJson();



function createJson() {
    $.ajax("restaurans.json", {
        success: function (data) {
            lengthJson = data.restaurant.length;
            result = data;
        }
    }).done(function () {
        addOnePost(secondNum);
    });
}

function addOnePost(secondNum) {
    $.ajax({
        url: "onePost.html",
        success: function (html) {
            for (var i = secondNum; i < num + secondNum; i++) {
                $(".box").append(html);
                $(".post").last().attr("id", createLink(result.restaurant[i].name));
            }
        }
    }).done(function () {
        createOnePost(secondNum);
    });
}

function createOnePost(secondNum) {
    for (var i = secondNum; i < num + secondNum; i++) {
        $(".imgPost")[i].src = result.restaurant[i].img[0];
        $(".namePost")[i].innerText = result.restaurant[i].name;
        $(".descPost")[i].innerText = result.restaurant[i].desc;
        //console.log(result.restaurant[i].name + " " + result.restaurant[i].desc);
    }
}

// $(window).scroll(function () {
//     if ($(window).scrollTop() + 10 >= $(document).height() - $(window).height()) {
//         if (lengthJson <= secondNum + num) {
//             $("#stp").css({ "display": "block" });
//         }
//         else {
//             secondNum += 12;
//             createPosts(secondNum);
//         }
//     }
//     else {

//     }
// });

function createLink(id) {
    id = id.replace(/\s/g, '').toLowerCase();
    return id;
}
var name;

$("#searchBtn").on("click", function () {
    var searchRest = $("#searchInput").val();
    for (var rest of result.restaurant) {
        if (searchRest == rest.name) {   //rest.name.split().filter((a)=>{return a.indexOf(searchRest)!==-1;})
            var idPost = createLink(rest.name);
            console.log(idPost);
            $(`.post:not(#${idPost})`).css({ "display": "none" });
        }
    }
});

$("#bar").on("click", function () {
    searchForCategory(this);
    $("#categBar").css({ "display": "block" });
    $("#categRest").css({ "display": "none" });
    $("#categKaraoke").css({ "display": "none" });
    $("#categCafe").css({ "display": "none" });
});

$("#rest").on("click", function () {
    searchForCategory(this);
    $("#categRest").css({ "display": "block" });
    $("#categBar").css({ "display": "none" });
    $("#categKaraoke").css({ "display": "none" });
    $("#categCafe").css({ "display": "none" });
});
$("#karaoke").on("click", function () {
    searchForCategory(this);
    $("#categKaraoke").css({ "display": "block" });
    $("#categRest").css({ "display": "none" });
    $("#categBar").css({ "display": "none" });
    $("#categCafe").css({ "display": "none" });
});
$("#cafe").on("click", function () {
    searchForCategory(this);
    $("#categCafe").css({ "display": "block" });
    $("#categKaraoke").css({ "display": "none" });
    $("#categRest").css({ "display": "none" });
    $("#categBar").css({ "display": "none" });
});

$("input:radio").on("change", function () {
    searchForCategory(this);
});

function searchForCategory(idBtn) {
    $(".post").css({ "display": "none" });
    $(".box").css({
        "display": "flex"
    });
    $(".postFull")[0].innerHTML = "";
    for (var i = 0; i < result.restaurant.length; i++) {
        if (result.restaurant[i].category.includes(idBtn.id)) {
            $(`#${createLink(result.restaurant[i].name)}`).css({ "display": "block" });
        }
    }
}
var index;
$("body").on("click", ".post", function () {
    index = searchById(this.id);
    $.ajax({
        url: "postInfo3.html",
        success: function (html) {
            $(".box").css({
                "display": "none"
            });
            $("#stp").css({ "display": "none" });
            $(".postFull").append(html);
            
        }
    }).done(function () {
        $("#oneImg")[0].src = result.restaurant[index].img[0];
        $("#twoImg")[0].src = result.restaurant[index].img[1];
        $("#threeImg")[0].src = result.restaurant[index].img[2];
        $(".nameInfo")[0].innerText = result.restaurant[index].name;
        $(".descInfo")[0].innerText = result.restaurant[index].desc;
        $(".number")[0].innerText += " " + result.restaurant[index].number;
        $(".adres")[0].innerText += " " + result.restaurant[index].adres;
        $(".cusinie")[0].innerText += " " + result.restaurant[index].cusinie;
        $(".price")[0].innerText += " " + result.restaurant[index].price;
        $(".time")[0].innerText += " " + result.restaurant[index].time;

    });

});

$("#all").on("click", function(){
    $(".box").css({
        "display": "flex"
    });
    $(".post").css({ "display": "block" });
    $("#categCafe").css({ "display": "none" });
    $("#categKaraoke").css({ "display": "none" });
    $("#categRest").css({ "display": "none" });
    $("#categBar").css({ "display": "none" });
    $(".postFull")[0].innerHTML = "";
})



function searchById(id){
    for(var i = 0; i < result.restaurant.length; i++){
        if(id == createLink(result.restaurant[i].name)){
            return i;
        }
    }
}

var countClick = 0;
$("body").on("click", "#next", function () {
    if(countClick == 0){
        $("#twoImg").css({
            "visibility": "visible"
        })
        $("#oneImg").animate({
            "margin-left": "-750px"
        }, 1000, function () {
            $("#oneImg").css({
                "visibility": "hidden"
            });
        });
        countClick++;
    }
    else if(countClick == 1){
        $("#threeImg").css({
            "visibility": "visible"
        })
        $("#twoImg").animate({
            "margin-left": "-750px"
        }, 1000, function () {
            $("#twoImg").css({
                "visibility": "hidden"
            });
        });
        countClick++;
    }
});

$("body").on("click", "#prev", function () {
    if(countClick == 1){
        $("#oneImg").css({
            "visibility": "visible"
        }).animate({
            "margin-left": "0px"
        }, 1000, function () {
            $("#twoImg").css({
                "visibility": "hidden"
            });
        });
        countClick--;
    }
    else if(countClick == 2){
        $("#twoImg").css({
            "visibility": "visible"
        }).animate({
            "margin-left": "0px"
        }, 1000, function () {
            $("#threeImg").css({
                "visibility": "hidden"
            });
        });
        countClick--;
    }
});


$("body").on("click", "#close", function(){
    $(".box").css({
        "display": "flex"
    });
    $(".post").css({ "display": "block" });
    $(".postFull")[0].innerHTML = "";
})
