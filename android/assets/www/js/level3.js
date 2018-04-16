document.addEventListener("deviceready", onDeviceReady, false);
var online = false;
document.addEventListener("offline", onOffline, false);

function onOffline() {

    console.log("Downloaded array clear array");
    window.localStorage.removeItem("category_pref");
    window.localStorage.removeItem("subcategory_pref");
    window.localStorage.removeItem("level3_pref");
    window.localStorage.removeItem("header_download_pref");
    $("#animatedDownload").hide();

    online = false;
}


document.addEventListener("online", onOnline, false);

function onOnline() {

    online = true;
}



setTimeout(function() {
    if (category_array_clear == true) {
        console.log("Downloaded array clear array");
        window.localStorage.removeItem("level3_pref");
        window.localStorage.removeItem("header_download_pref");
        $("#animatedDownload").hide();
    }


}, 8000);



var array;
var delete_vido_pos;

var delete_vido_pos;
var category_array = [];
var category_array_clear;
var download_stutus = true;
var level3_header_download_array = [];
var test2 = window.localStorage.getItem("level3_pref");
var test1 = JSON.parse(test2); //var test is now re-loaded!

console.log("aa length" + test1.length);
if (test1.length > 0) {

    category_array = test1;
} else {
    category_array = [];
}




var test21 = window.localStorage.getItem("header_download_pref");
var test11 = JSON.parse(test21); //var test is now re-loaded!

console.log("aa length" + test11.length);


if (test11.length > 0) {
    // alert("array replace "+test11.length);
    level3_header_download_array = test11;
} else {
    level3_header_download_array = [];
}



//This function will load all the primary details like, language, click event of search, etc.
function fnload() {


    $(".search-list").hide();
    $("#animatedDownload").hide();
    window.localStorage.setItem("page", "3");
    window.localStorage.setItem("level3", "complete");

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
    $(".logo-text").click(function() {
        window.location.href = "../index/index.html";
    });

    $(".language > ul > li").click(function() {
        $(".language").slideToggle();
        var lan = $(this).attr('id');

        var appname = document.getElementById("title");
        window.localStorage.setItem("language", lan);

        if (lan == "eng") {
            appname.innerHTML = "PE Pointer! ®";
            $("#imageID").attr('src', '../images/en.gif');
            $("#mainul li").remove();
            fn_subtitle('../index/navigation_english.txt');
            fn_videolist("../index/navigation_english.txt");
        } else {
            appname.innerHTML = "GYMWIJZER! ®";
            $("#imageID").attr('src', '../images/nl_nl.gif');
            $("#mainul li").remove();
            fn_subtitle('../index/navigation.txt');
            fn_videolist("../index/navigation.txt");
        }
    })
    $("#dwn-video-list").click(function() {
        window.location.href = "../donwnload_video_list/videolist.html";
    });


    $("#kk-rock1").click(function() {
        jQuery.fancybox.close();
    });


    $("#kk-rock2").click(function() {
        // remove_video();
        remove_video_list();
        jQuery.fancybox.close();
    });



    $("#kk-rock_cancel").click(function() {
        // remove_video();
        jQuery.fancybox.close();
    });



    jQuery(document).ready(function() {
        $(".logo-text.left-left").click(function() {
            window.location.href = "../subtitle/subtitle.html";
        });
    });


    var language = window.localStorage.getItem("language");
    var imageID = document.getElementById("imageID");
    var appname = document.getElementById("title");
    imageID.style.display = "block";
    if (language == "eng") {
        appname.innerHTML = "PE Pointer! ®";
        $("#imageID").attr('src', '../images/en.gif');
        fn_subtitle('../index/navigation_english.txt');
    } else {
        appname.innerHTML = "GYMWIJZER! ®";
        $("#imageID").attr('src', '../images/nl_nl.gif');
        fn_subtitle('../index/navigation.txt');

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


function fn_subtitle(data) {

    var level3_menu = [];
    var mainDIV = document.getElementById('mainDIV');
    $.ajax({
        url: data,
        type: "get",
        dataType: "json",
        beforeSend: function() {
            var imgLoad = document.getElementById("imgLoad");
            imgLoad.style.display = "block";
        },
        success: function(data, textStatus, jqXHR) {

            array = data_to_array(data);



            var mainul = document.getElementById('mainul');
            // alert(array['navigation'][pos]['subtitle'].length);
            var navigation_pos = window.localStorage.getItem("titlepos");
            var subtitle_pos = window.localStorage.getItem("subtitlepos");


            //     var video=array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['videolist'];




            $("#titlename").html(array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['titlename']);

            for (var i = 0; i < array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['level3'].length; i++) {


                var name = array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['level3'];
                console.log("name :> " + name[i]['titlename']);


                if (name[i]['titlename'] == "") {
                    window.localStorage.setItem("level3", null);
                    window.localStorage.setItem("level3pos", "0");
                    window.location.href = "../subtitle/subtitle.html";

                }


                var mainli = document.createElement('li');
                mainli.setAttribute('class', 'mainli');
                mainli.setAttribute('checkstatus', "online");
                mainli.setAttribute('level3pos', i);
                mainli.setAttribute('level3name', name[i]['titlename']);

                var mainli_a = document.createElement('a');
                var mainli_a_i = document.createElement('i');
                mainli_a_i.setAttribute('class', 'fa fa-user');
                mainli_a_i.setAttribute('level3pos', i);
                mainli_a.appendChild(mainli_a_i);




                var mainli_span = document.createElement('span');
                mainli_span.innerHTML = name[i]['titlename'];
                level3_menu[i] = name[i]['titlename'];

                mainli_a.appendChild(mainli_span);

                var mainli_span1 = document.createElement('span');
                mainli_span1.setAttribute('class', 'progressbar');
                mainli_span1.setAttribute('id', name[i]['id']);
                mainli_a.appendChild(mainli_span1);


                var mainli_em = document.createElement('em');
                mainli_em.setAttribute('class', 'video-status');
                mainli_em.setAttribute('level3pos', i);
                mainli_a.appendChild(mainli_em);

                mainli.appendChild(mainli_a);
                mainul.appendChild(mainli);


            }

            setTimeout(function() {
                var imgLoad = document.getElementById("imgLoad");
                imgLoad.style.display = "none";
                var language = window.localStorage.getItem("language");
                if (language == "eng") {
                    $(".mainli").addClass("online");
                } else {
                    $(".mainli").addClass("onlinedutch");
                }
                fn_videolist("../index/navigation.txt");
            }, 100);

            window.localStorage.setItem("level3_array", JSON.stringify(level3_menu));

            jQuery(".fa.fa-user").click(function() {
                var pos = $(this).attr('level3pos');
                var level3name = $(this).attr('level3name');
                window.localStorage.setItem("level3name", level3name);

                window.localStorage.setItem("level3pos", pos);

                window.location.href = "../video/videolist.html";

            });

            jQuery(".video-status").click(function() {
                var unique_id = $(this).attr("level3pos");
                var navigation_pos = window.localStorage.getItem("titlepos");
                var subtitle_pos = window.localStorage.getItem("subtitlepos");

                var parentElId = $(this).parent().parent().attr('checkstatus');
                if (parentElId == "offline") {
                    if (online) {
                        $(this).parent().parent().addClass("animationicon");


                        var obj1 = {};

                        obj1["categoryId"] = unique_id;
                        obj1["titleKey"] = navigation_pos;
                        obj1["subtitleKey"] = subtitle_pos;
                        category_array.push(obj1);

                        window.localStorage.setItem("level3_pref", JSON.stringify(category_array));
                        var test2 = window.localStorage.getItem("level3_pref");
                        var test = JSON.parse(test2); //var test is now re-loaded!
                        start_background_process(unique_id, array);
                    } else {
                        //alert("Please check internet connection.");
                        jQuery.fancybox.open("#noInternet");
                        $("#kk-rock7").click(function() {
                            jQuery.fancybox.close();
                        });
                    }
                } else {
                    delete_vido_pos = unique_id;
                    jQuery.fancybox.open("#conform_donwload");
                }



            });

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error loading data :' + errorThrown);

            var imgLoad = document.getElementById("imgLoad");
            imgLoad.style.display = "none";
        }
    });
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
    var select_name = window.localStorage.getItem("subtitlepos");
    var retrievedData = window.localStorage.getItem("level2");
    var level2_size = JSON.parse(retrievedData);
    var html = '';
    for (var i = 0; i < level2_size.length; i++) {

        console.log("navigation menu :> " + level2_size[i]);
        html += '<li id="' + i + '"';
        if (i == select_name) {
            html += 'class="active"';
        }
        html += '>' + level2_size[i];
        html += '</li>';
    }
    $("#flipul").html(html);
    jQuery("#flipul li").click(function() {
        var pos = $(this).attr("id");
        window.localStorage.setItem("subtitlepos", pos);
        window.location.href = "../level3/level3.html";
    });

}

//This function is used to display overall percentage and single percentage.
function onDeviceReady() {
    var counting = window.localStorage.getItem("p_counting");
    var counter = window.localStorage.getItem("p_counter");
    var pid = window.localStorage.getItem("p_id");
    var t_counting = window.localStorage.getItem("t_counting");
    var t_counter = window.localStorage.getItem("t_counter");

    if (t_counter != null) {
        var totalpercentage = document.getElementById('totalpercentage');
        var percentage = (t_counting / t_counter) * 100;
        percentage = Math.round(percentage);
        if (percentage != 100) {
            totalpercentage.innerHTML = percentage + "%";
        }
    }

    if (counter != null) {
        var progressbar = document.getElementById(pid);
        var percentage = (counting / counter) * 100;
        percentage = Math.round(percentage);
        if (percentage != 100) {
            progressbar.innerHTML = percentage + "%";
        }
        var myInnerHtml = document.getElementById(pid).innerHTML;
        if (myInnerHtml == "") {
            progressbar.innerHTML = "0%";
        }
    }

}

function fn_videolist(data) {
    var array;

    $.ajax({
        url: data,
        type: "get",
        dataType: "json",
        success: function(data, textStatus, jqXHR) {



            array = data_to_array(data);
            var navigation_pos = window.localStorage.getItem("titlepos");
            var subtitle_pos = window.localStorage.getItem("subtitlepos");

            var level3 = array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['level3'];
            for (var k = 0; k < level3.length; k++) {

                var video = level3[k]['videourl'];

                console.log("Neighview l3ngth " + video.length);
                for (var i = 0; i < video.length; i++) {

                    console.log("Neighview video lngth " + video[i]['videolist'].length);
                    for (var j = 0; j < video[i]['videolist'].length; j++) {

                        var title = video[i]['videolist'][j]['title'];

                        var file_result = file_exist(title, k);


                    }
                }
                console.log("Call callac all acall c al clac la calac al");
                if (download_stutus) {
                    download_stutus = false;
                    download_complete_status();

                }

                console.log("***********************************************   " + k + "  ");
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error loading data :' + errorThrown);
        }
    });
}



function file_exist(filename, levelpos) {

    var offline = false;
    var fileexist = "GymWijzer/Video/" + filename + ".mp4";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

    function onRequestFileSystemSuccess(fileSystem) {
        var entry = fileSystem.root;
        entry.getFile(fileexist, {
            create: false,
            exclusive: false
        }, onGetDirectorySuccess, onGetDirectoryFail);

    }

    function onGetDirectorySuccess(dir) {

    }

    function onGetDirectoryFail(error) {
        offline = true;
        console.log("Error directory " + error.code + "  " + filename + "         " + levelpos);
        var language = window.localStorage.getItem("language");
        if (language == "eng") {
            $("[level3pos=" + levelpos + "]").removeClass("online");
            $("[level3pos=" + levelpos + "]").addClass("offline");
        } else {
            $("[level3pos=" + levelpos + "]").removeClass("onlinedutch");
            $("[level3pos=" + levelpos + "]").addClass("offlinedutch");
        }
        $("[level3pos=" + levelpos + "]").attr("checkstatus", "offline")


    }

}


//----------------------------------------------------Start BAckground Thread--------------------------------------------------------------

function start_background_process(k, array) {

    var main_obj = {};

    var i = window.localStorage.getItem("titlepos");
    var j = window.localStorage.getItem("subtitlepos");


    var ary = [];


    var i = window.localStorage.getItem("titlepos");



    for (var l = 0; l < array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'].length; l++) {


        var progressid = array['navigation'][i]['subtitle'][j]['level3'][k]['id'];
        for (var m = 0; m < array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'].length; m++) {
            var data = array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'];

            var obj = {};
            obj["progressid"] = progressid;
            obj["title"] = data[m]["title"];
            obj["file"] = data[m]["file"];
            obj["image"] = data[m]["image"];
            ary.push(obj);

            var obj1 = {};

            obj1["filename"] = data[m]["title"];
            console.log("ADD file name :> " + data[m]["title"]);
            level3_header_download_array.push(obj1);



        }




    }
    window.localStorage.setItem("header_download_pref", JSON.stringify(level3_header_download_array));
    main_obj["videolist"] = ary;
    console.log(" Level3  page Array is :. " + JSON.stringify(main_obj));

    window.plugins.backgroundjs.lockBackgroundTime(JSON.stringify(main_obj));

}



function remove_video_list() {




    var videoLength = 0;
    var videoCounter = 0;
    var r_videoList = [];
    //   alert("1");

    var i_title = window.localStorage.getItem("titlepos");
    var j_subtitle = window.localStorage.getItem("subtitlepos");




    var video = array['navigation'][i_title]['subtitle'][j_subtitle]['level3'][delete_vido_pos]['videourl'];
    for (var i = 0; i < video.length; i++) {


        videoLength = videoLength + video[i]['videolist'].length;
        console.log("------------------------" + videoLength);

        for (var j = 0; j < video[i]['videolist'].length; j++) {


            var title_name = video[i]['videolist'][j]['title'];
            r_videoList[videoCounter] = title_name;

            videoCounter++;
            console.log(title_name);
            console.log(videoCounter);
            // var file_result= remove_video(title_name);

        }

    }



    console.log("Arrau length is :. " + r_videoList.length);

    var arrayCount = parseInt(r_videoList.length) - parseInt(1);
    console.log("Arrau length is :. " + arrayCount);
    for (var i = 0; i < r_videoList.length; i++) {
        var title = r_videoList[i];

        var file_result = remove_video(title, i, arrayCount);
    }

}


//Function is used to remove videos
function remove_video(trahsname, i, length) {



    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

    function onRequestFileSystemSuccess(fileSystem) {

        fileSystem.root.getFile("GymWijzer/Video/" + trahsname + ".mp4", {
            create: false,
            exclusive: false
        }, gotRemoveFileEntry, fail);

    }



    function gotRemoveFileEntry(fileEntry) {
        console.log("entey is :> " + fileEntry);


        fileEntry.remove(success, fail);
        if (i == length) {
            console.log(" Eeeequalllllllll ");
            fn_videolist('../index/navigation.txt');
            jQuery.fancybox.open("#remove");
        }
    }

    function success(entry) {
        console.log("Removal succeeded");

    }

    function fail(error) {
        console.log("Error removing file: " + error.code);
    }

}

//Function is used to check download status
function download_complete_status() {
    console.log("***********download_complete_status*****   " + category_array.length);

    var navigation_pos = window.localStorage.getItem("titlepos");
    var subtitle_pos = window.localStorage.getItem("subtitlepos");




    if (category_array.length > 0) {
        $("#animatedDownload").show();
        category_array_clear = true;
    }

    for (var i = 0; i < category_array.length; i++) {
        var categoryid = category_array[i]["categoryId"];
        var title = category_array[i]["titleKey"];

        var subtitle = category_array[i]["subtitleKey"];

        if (navigation_pos == title && subtitle_pos == subtitle) {
            console.log("is di " + categoryid);
            download_complete_status_exist(categoryid);

        }


    }

}

//Function is used to checking video download status

function download_complete_status_exist(id1) {

    // alert("kjbgnvi");

    var pos = window.localStorage.getItem("titlepos");

    var subtitle_pos = window.localStorage.getItem("subtitlepos");




    var video = array['navigation'][pos]['subtitle'][subtitle_pos]['level3'][id1]['videourl'];
    for (var i = 0; i < video.length; i++) {
        for (var j = 0; j < video[i]['videolist'].length; j++) {
            var title_name = video[i]['videolist'][j]['title'];
            console.log("Helllo");
            var file_result = category_file_exist(title_name, id1);
        }


    }
    //


}

//Function is used to checking video download status

function category_file_exist(filename, levelpos) {


    var fileexist = "GymWijzer/Video/" + filename + ".mp4";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

    function onRequestFileSystemSuccess(fileSystem) {
        var entry = fileSystem.root;
        entry.getFile(fileexist, {
            create: false,
            exclusive: false
        }, onGetDirectorySuccess, onGetDirectoryFail);

    }

    function onGetDirectorySuccess(dir) {
        console.log("running downlaoded video  Get file");


    }

    function onGetDirectoryFail(error) {

        console.log("running downlaoded video  Fail to get file   " + levelpos);
        category_array_clear = false;


        $("[level3pos=" + levelpos + "]").addClass("animationicon");


    }

}

//Function is used to checking video download status.

function check_header_downloadStutus() {

    var test21 = window.localStorage.getItem("header_download_pref");
    var test11 = JSON.parse(test21); //var test is now re-loaded!

    console.log("check_header_downloadStutus length" + test11.length);

    if (test11.length > 0) {
        $("#animatedDownload").show();
        category_array_clear = true;
    }


    for (var i = 0; i < test11.length; i++) {
        var name = test11[i]["filename"];
        console.log("check_header_downloadStutus is di " + name);
        header_file_exist(name);

    }

}

//Function is used to checking video download status
function header_file_exist(filename) {


    var fileexist = "GymWijzer/Video/" + filename + ".mp4";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

    function onRequestFileSystemSuccess(fileSystem) {
        var entry = fileSystem.root;
        entry.getFile(fileexist, {
            create: false,
            exclusive: false
        }, onGetDirectorySuccess, onGetDirectoryFail);

    }

    function onGetDirectorySuccess(dir) {
        console.log("check_header_downloadStutus running downlaoded video  Get file");


    }

    function onGetDirectoryFail(error) {

        console.log(" check_header_downloadStutus ERROR  Fail to get file");
        category_array_clear = false;
        $("#animatedDownload").show();

    }

}

//Used to display overall percentage in the header.

function totalHeaderCounter(counting, counter) {
    console.log("Total Header Counter");
    console.log("Counting: " + counting);
    console.log("Counter: " + counter);
    window.localStorage.setItem("t_counting", counting);
    window.localStorage.setItem("t_counter", counter);
    var totalpercentage = document.getElementById('totalpercentage');
    var percentage = (counting / counter) * 100;
    percentage = Math.round(percentage);
    if (isNaN(percentage) == false) {
        if ($.isNumeric(percentage) != false) {
            totalpercentage.innerHTML = percentage + "%";
        }
    }
    if (counting == counter) {
        window.localStorage.removeItem("t_counting");
        window.localStorage.removeItem("t_counter");
    }
}

//Used to display error message in case of no internet connectivity.

function NoNetworkFunction() {
    jQuery.fancybox.open("#internet");
    $("#kk-rock5").click(function() {
        jQuery.fancybox.close();

        window.localStorage.removeItem("category_pref");
        window.localStorage.removeItem("subcategory_pref");
        window.localStorage.removeItem("level3_pref");
        window.localStorage.removeItem("header_download_pref");

        location.reload();
    });
}

//Used to display error message in case of no disk space.

function NoDiskSpaceFunction() {
    jQuery.fancybox.open("#diskspace");
    $("#kk-rock6").click(function() {
        jQuery.fancybox.close();

        window.localStorage.removeItem("category_pref");
        window.localStorage.removeItem("subcategory_pref");
        window.localStorage.removeItem("level3_pref");
        window.localStorage.removeItem("header_download_pref");

        location.reload();
    });
}

var valmm = 1;

//Used to display percentage on every category.

function callSomeFunction(counting, counter, pid) {
    window.localStorage.setItem("p_counting", counting);
    window.localStorage.setItem("p_counter", counter);
    window.localStorage.setItem("p_id", pid);

    if (document.getElementById(pid)) {

        console.log("Not null");
        var progressbar = document.getElementById(pid);
        var percentage = (counting / counter) * 100;
        percentage = Math.round(percentage);
        progressbar.innerHTML = percentage + "%";
    }
    if (counting == counter) {
        console.log("counting == counter");
        window.localStorage.removeItem("p_counting");
        window.localStorage.removeItem("p_counter");
        window.localStorage.removeItem("p_id");
        if ($('#alert').length) {
            jQuery.fancybox.open("#alert");
            $("#kk-rock3").click(function() {
                jQuery.fancybox.close();
                location.reload();
            });
        }
    }
}