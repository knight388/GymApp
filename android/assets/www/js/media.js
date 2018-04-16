//document.addEventListener("deviceready", onDeviceReady, false);
function fnload() {

    fn_clickmedia(0);


    $(".search-list").hide()
    window.localStorage.setItem("page", "4");



    $(".fa.fa-angle-left").click(function() {
        $('#show').hide();
    })

    $("span.search .fa-search, .search-close").click(function() {
        $(".search-list").fadeToggle();
        $(".search-list input").focus();
    })

    $("span.search .language-icon").click(function() {
        $(".language").slideToggle();
        /* var text1 = $(this).text();
         alert(text1);*/
    })

    $(".language > ul > li").click(function() {
        $(".language").slideToggle();
        var lan = $(this).attr('id');
        window.localStorage.setItem("language", lan);

        if (lan == "eng") {
            $("#flipbook_val").text("Viewing guide");
            $("#imageID").attr('src', '../images/en.gif');
        } else {
            $("#flipbook_val").text("Kijkwizjer");



            $("#imageID").attr('src', '../images/nl_nl.gif');
        }
    })


    $("#play").click(function() {
        window.location.href = "../video/videolist.html";
    })

    $("#dwn-video-list").click(function() {
        window.location.href = "../donwnload_video_list/videolist.html";
    })


    $(".logo-text").click(function() {
        window.location.href = "../index/index.html";
    });
    $(".logo-text.left-left").click(function() {

        var level3_val = window.localStorage.getItem("level3");
        if (level3_val != "null")
            window.location.href = "../level3/level3.html";
        else
            window.location.href = "../subtitle/subtitle.html";

    });



    var language = window.localStorage.getItem("language");
    var imageID = document.getElementById("imageID");
    imageID.style.display = "block";

    if (language == "eng") {
        $("#imageID").attr('src', '../images/en.gif');
        $("#flipbook_val").text("Viewing guide");

    } else {
        $("#flipbook_val").text("Kijkwizjer");


        $("#imageID").attr('src', '../images/nl_nl.gif');
    }



    // ------------------------------- Search List Keyboard Event -------------------------
    var iscall = true;

    $(document).on('keyup', '#myFilter', function() {


        if ($('#myFilter').val() == "") {

            $('#show').hide();
        } else
            $('#show').show();


        if (iscall == true) {

            fn_serch_listing(get_language());
            iscall = false;
        }



    });




    //-------------------------------Navigation Menu------------------------

    new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('trigger'));
    navigation_menu();


}


function fn_clickmedia(pos) {
    if (pos == 0)
        window.location.href = "../video/videolist.html";
    else
        window.location.href = "../flipbooknew/index.html";



}


function data_to_array(data) {
    var array = [];
    for (var key in data) {
        var value = data[key];
        if (typeof value === 'string') {
            array[key] = value;
        } else {
            array[key] = data_to_array(value);
        }
    }
    return array;
}


function navigation_menu()


{
    var level_val = window.localStorage.getItem("level3", null);
    var retrievedData;
    var select_name;
    if (level_val == "null")

    {
        retrievedData = window.localStorage.getItem("level2");
        select_name = window.localStorage.getItem("subtitlepos");
    } else {
        retrievedData = window.localStorage.getItem("level3_array");
        select_name = window.localStorage.getItem("level3pos");
    }

    var level3_size = JSON.parse(retrievedData);
    //alert("length "+level3_size);
    var html = '';
    for (var i = 0; i < level3_size.length; i++) {

        console.log("navigation menu :> " + level3_size[i]);
        html += '<li id="' + i + '"';
        if (i == select_name) {
            html += 'class="active"';
        }
        html += '>' + level3_size[i];
        html += '</li>';
    }
    $("#flipul").html(html);
    jQuery("#flipul li").click(function() {
        var pos = $(this).attr("id");




        if (level_val == "null")

        {
            window.localStorage.setItem("subtitlepos", pos);
            window.location.href = "../level3/level3.html";
        } else {
            window.localStorage.setItem("level3pos", pos);
            window.location.href = "../media/media.html";
        }

    });

}

function navigation_menu1()


{
    var level_val = window.localStorage.getItem("level3", null);
    var retrievedData;
    if (level_val == "null")

    {
        retrievedData = window.localStorage.getItem("level2");
    } else {
        retrievedData = window.localStorage.getItem("level3_array");
    }

    var level3_size = JSON.parse(retrievedData);

    //making sure it still is an array

    //alert("flip_Goto_slider fun");
    var html = '';
    for (var i = 0; i < level3_size.length; i++) {

        console.log("navigation menu :> " + level3_size[i]);
        html += ' <li id="' + i + '">' + level3_size[i] + '</li>';
    }
    $("#flipul").html(html);
    jQuery("#flipul li").click(function() {
        var pos = $(this).attr("id");




        if (level_val == "null")

        {
            window.localStorage.setItem("subtitlepos", pos);
            window.location.href = "../level3/level3.html";
        } else {
            window.localStorage.setItem("level3pos", pos);
            window.location.href = "../media/media.html";
        }

    });

}