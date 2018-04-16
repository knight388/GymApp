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

$(document).ready(function() {
    setTimeout(function() {
        if (category_array_clear == true) {
            console.log("Downloaded array clear array");
            window.localStorage.removeItem("subcategory_pref");
            window.localStorage.removeItem("header_download_pref");
            $("#animatedDownload").hide();
        }

    }, 8000);

});

var array;
var delete_vido_pos;

var delete_vido_pos;
var category_array = [];
var subtitle_header_download_array = [];
var category_array_clear;
var download_stutus = true;

var test21 = window.localStorage.getItem("header_download_pref");
var test11 = JSON.parse(test21); //var test is now re-loaded!

console.log("aa length" + test11.length);


if (test11.length > 0) {
    subtitle_header_download_array = test11;
}

var test2 = window.localStorage.getItem("subcategory_pref");
var test1 = JSON.parse(test2); //var test is now re-loaded!

console.log("aa length" + test1.length);
if (test1.length > 0) {
    category_array = test1;
} else {
    category_array = [];
}

//This function is used to initailize primary details like language, header title, etc.

function fnload() {

    $(".search-list").hide();
    $("#animatedDownload").hide();

    $(".fa.fa-angle-left").click(function() {
        $('#show').hide();
    })


    $("span.search .fa-search, .search-close").click(function() {
        $(".search-list").fadeToggle();
        $(".search-list input").focus();
    })

    $("span.search .language-icon").click(function() {
        $(".language").slideToggle();
    })
    $(".logo-text").click(function() {
        window.location.href = "../index/index.html";
    });
    $("#dwn-video-list").click(function() {
        window.location.href = "../donwnload_video_list/videolist.html";
    });

    $("#kk-rock1").click(function() {
        jQuery.fancybox.close();
    });


    $("#kk-rock2").click(function() {
        remove_video_list();
        jQuery.fancybox.close();
    });


    $("#kk-rock_cancel").click(function() {
        jQuery.fancybox.close();
    });




    $(".language > ul > li").click(function() {
        $(".language").slideToggle();
        var lan = $(this).attr('id');


        window.localStorage.setItem("language", lan);
        var appname = document.getElementById("title");
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

    // ------------  Search List Keyboard Event ------------
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


//This function is used to show all sub categories of primary categories from JSON file.

function fn_subtitle(data) {

    var pos;
    var mainDIV = document.getElementById('mainDIV');
    var level2_menu = [];
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
            pos = window.localStorage.getItem("titlepos");


            var mainul = document.getElementById('mainul');
            //alert(array['navigation'][pos]['subtitle'].length);
            for (var i = 0; i < array['navigation'][pos]['subtitle'].length; i++) {

                console.log("name :> " + array['navigation'][i]['title']);
                var mainli = document.createElement('li');
                mainli.setAttribute('class', 'mainli');
                mainli.setAttribute('checkstatus', "online");
                mainli.setAttribute('subtitlepos', i);

                var mainli_a = document.createElement('a');
                var mainli_a_i = document.createElement('i');
                mainli_a_i.setAttribute('class', 'fa fa-user');

                mainli_a_i.setAttribute('subtitlepos', i);

                mainli_a.appendChild(mainli_a_i);




                var mainli_span = document.createElement('span');
                mainli_span.innerHTML = array['navigation'][pos]['subtitle'][i]['titlename'];
                level2_menu[i] = array['navigation'][pos]['subtitle'][i]['titlename'];
                mainli_a.appendChild(mainli_span);


                var mainli_span1 = document.createElement('span');
                mainli_span1.setAttribute('class', 'progressbar');
                mainli_span1.setAttribute('id', array['navigation'][pos]['subtitle'][i]['id']);
                mainli_a.appendChild(mainli_span1);

                var mainli_em = document.createElement('em');

                mainli_em.setAttribute('class', 'video-status');
                mainli_em.setAttribute('subtitlepos', i)

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
            }, 200);


            window.localStorage.setItem("level2", JSON.stringify(level2_menu));
            jQuery(".fa.fa-user").click(function() {
                var sub_pos = $(this).attr('subtitlepos');
                window.localStorage.setItem("subtitlepos", sub_pos);
                var name = array['navigation'][pos]['subtitle'][sub_pos]['level3'][0]['titlename'];


                if (name == "") {
                    window.localStorage.setItem("level3", null);
                    window.localStorage.setItem("level3pos", "0");

                    window.location.href = "../video/videolist.html";

                } else {

                    window.location.href = "../level3/level3.html";
                }

            });



            jQuery(".video-status").click(function() {
                var unique_id = $(this).attr("subtitlepos");
                var pos = window.localStorage.getItem("titlepos");

                var parentElId = $(this).parent().parent().attr('checkstatus');
                if (parentElId == "offline") {
                    if (online) {

                        $(this).parent().parent().addClass("animationicon");
                        var obj1 = {};
                        obj1["titleKey"] = pos;
                        obj1["category"] = array['navigation'][unique_id]['title'];
                        obj1["categoryId"] = unique_id;
                        category_array.push(obj1);

                        window.localStorage.setItem("subcategory_pref", JSON.stringify(category_array));
                        var test2 = window.localStorage.getItem("subcategory_pref");
                        var test = JSON.parse(test2); //var test is now re-loaded!


                        start_background_process(unique_id, array);

                    } else {
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


//Used to show navigation menu
function navigation_menu()


{
    var select_name = window.localStorage.getItem("titlepos");
    var retrievedData = window.localStorage.getItem("level1");
    var level1_size = JSON.parse(retrievedData);

    var html = '';
    for (var i = 0; i < level1_size.length; i++) {

        console.log("navigation menu :> " + level1_size[i]);
        html += '<li id="' + i + '"';
        if (i == select_name) {
            html += 'class="active"';
        }
        html += '>' + level1_size[i];
        html += '</li>';

    }
    $("#flipul").html(html);
    jQuery("#flipul li").click(function() {
        var unique_id = $(this).attr("id");
        window.localStorage.setItem("titlepos", unique_id);
        window.location.href = "../subtitle/subtitle.html";
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

//-----------------------------------------------------Check downloaded video is exist or not -------------------------------------------------

function onDeviceReady() {
    var counting = window.localStorage.getItem("p_counting");
    var counter = window.localStorage.getItem("p_counter");
    var pid = window.localStorage.getItem("p_id");

    var t_counting = window.localStorage.getItem("t_counting");
    var t_counter = window.localStorage.getItem("t_counter");

    //Used to show overall percentage, and paricular percentage.
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


    // check_header_downloadStutus();


}

//This function is used to show all sub categories of primary categories from JSON file.

function fn_videolist(data) {
    var array;

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
            var navigation_pos = window.localStorage.getItem("titlepos");

            var subtitile = array['navigation'][navigation_pos]['subtitle'];
            for (var l = 0; l < subtitile.length; l++) {
                var level3 = array['navigation'][navigation_pos]['subtitle'][l]['level3'];
                // alert("Level 3 l3ngth "+level3.length);
                for (var k = 0; k < level3.length; k++) {

                    var video = level3[k]['videourl'];

                    console.log("Neighview l3ngth " + video.length);
                    for (var i = 0; i < video.length; i++) {

                        console.log("Neighview video lngth " + video[i]['videolist'].length);
                        for (var j = 0; j < video[i]['videolist'].length; j++) {

                            var title = video[i]['videolist'][j]['title'];

                            var file_result = file_exist(title, l);
                            //  console.log("file_result is "+file_result);


                        }
                    }
                }

                console.log("***********************************************   " + k + "  ");


            }
            var imgLoad = document.getElementById("imgLoad");
            imgLoad.style.display = "none";


            console.log("Call callac all acall c al clac la calac al");
            if (download_stutus) {
                download_stutus = false;
                // alert("download_complete_status");
                download_complete_status();

            }


        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error loading data :' + errorThrown);
            var imgLoad = document.getElementById("imgLoad");
            imgLoad.style.display = "none";
        }
    });
}


//Function used to check file download status.
function file_exist(filename, levelpos) {


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

        console.log("Error directory " + error.code + "  " + filename + "         " + levelpos);
        var language = window.localStorage.getItem("language");
        if (language == "eng") {
            $("[subtitlepos=" + levelpos + "]").removeClass("online");
            $("[subtitlepos=" + levelpos + "]").addClass("offline");
        } else {
            $("[subtitlepos=" + levelpos + "]").removeClass("onlinedutch");
            $("[subtitlepos=" + levelpos + "]").addClass("offlinedutch");

        }

        $("[subtitlepos=" + levelpos + "]").attr("checkstatus", "offline")


    }

}


//----------------------------------------------------Start BAckground Thread--------------------------------------------------------------

function start_background_process(j, array) {

    var main_obj = {};


    var ary = [];


    var i = window.localStorage.getItem("titlepos");

    for (var k = 0; k < array['navigation'][i]['subtitle'][j]['level3'].length; k++) {
        var progressid = array['navigation'][i]['subtitle'][j]['id'];


        var test23 = window.localStorage.getItem("level3_pref");
        var test13 = JSON.parse(test23);

        var category_array1 = [];
        if (test13 != null && test13.length > 0) {
            category_array1 = test13;
        } else {
            category_array1 = [];
        }


        var obj12 = {};

        obj12["categoryId"] = k;
        obj12["titleKey"] = i;
        obj12["subtitleKey"] = j;
        category_array1.push(obj12);

        window.localStorage.setItem("level3_pref", JSON.stringify(category_array1));


        for (var l = 0; l < array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'].length; l++) {


            for (var m = 0; m < array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'].length; m++) {
                var data = array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'];
                console.log("  title   :>" + data[m]["title"]);

                var obj = {};
                obj["progressid"] = progressid;
                obj["title"] = data[m]["title"];
                obj["file"] = data[m]["file"];
                obj["image"] = data[m]["image"];
                ary.push(obj);

                var obj1 = {};

                obj1["filename"] = data[m]["title"];
                console.log("ADD file name :> " + data[m]["title"]);
                subtitle_header_download_array.push(obj1);




            }


        }



    }
    window.localStorage.setItem("header_download_pref", JSON.stringify(subtitle_header_download_array));
    main_obj["videolist"] = ary;
    console.log(" Subtitle page Array is :. " + JSON.stringify(main_obj));

    window.plugins.backgroundjs.lockBackgroundTime(JSON.stringify(main_obj));

}

//Function is used to remove downloaded videos

function remove_video_list() {




    var videoLength = 0;
    var videoCounter = 0;
    var r_videoList = [];


    var navigation_pos = window.localStorage.getItem("titlepos");
    var subtitile = array['navigation'][navigation_pos]['subtitle'];


    var level3 = subtitile[delete_vido_pos]['level3'];

    for (var k = 0; k < level3.length; k++) {

        var video = level3[k]['videourl'];
        for (var i = 0; i < video.length; i++) {


            videoLength = videoLength + video[i]['videolist'].length;
            console.log("------------------------" + videoLength);

            for (var j = 0; j < video[i]['videolist'].length; j++) {


                var title_name = video[i]['videolist'][j]['title'];
                r_videoList[videoCounter] = title_name;

                videoCounter++;
                console.log(title_name);
                console.log(videoCounter);

            }
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


//Function is used to remove downloaded videos.
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

            console.log(" equql trye  ");
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


//Function used to check file download status.
function download_complete_status() {
    pos = window.localStorage.getItem("titlepos");


    if (category_array.length > 0) {
        $("#animatedDownload").show();
        category_array_clear = true;

    }

    for (var i = 0; i < category_array.length; i++) {
        var categoryid = category_array[i]["categoryId"];
        var title = category_array[i]["titleKey"];
        console.log("title " + title + "  pos " + pos);
        if (title == pos) {
            console.log("is di " + categoryid);
            download_complete_status_exist(categoryid);
        }




    }

}
//Function used to check file download status.
function download_complete_status_exist(id1) {

    // alert("kjbgnvi");

    var pos = window.localStorage.getItem("titlepos");
    var subtitile = array['navigation'][pos]['subtitle'][id1];

    var level3 = array['navigation'][pos]['subtitle'][id1]['level3'];

    for (var k = 0; k < level3.length; k++) {

        var video = level3[k]['videourl'];
        for (var i = 0; i < video.length; i++) {
            for (var j = 0; j < video[i]['videolist'].length; j++) {
                var title_name = video[i]['videolist'][j]['title'];
                console.log("Helllo");
                var file_result = category_file_exist(title_name, id1);
            }
        }

    }
    //


}

//Function used to check file download status.

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


        $("[subtitlepos=" + levelpos + "]").addClass("animationicon");



    }

}

//Function used to check file download status.
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

//Function used to check file download status.
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

//Function is used to display total percentage in the header.
function totalHeaderCounter(counting, counter) {
    console.log("Total Header Counter");
    console.log("Counting: " + counting);
    console.log("Counter: " + counter);
    window.localStorage.setItem("t_counting", counting);
    window.localStorage.setItem("t_counter", counter);
    var totalpercentage = document.getElementById('totalpercentage');
    var percentage = (counting / counter) * 100;
    percentage = Math.round(percentage);
    if (isNaN(percentage) = false) {
        if ($.isNumeric(percentage) != false) {
            totalpercentage.innerHTML = percentage + "%";
        }
    }
    if (counting == counter) {
        window.localStorage.removeItem("t_counting");
        window.localStorage.removeItem("t_counter");
    }
}

//Function is used to show error message in case of no internet connectivity.
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

//Function is used to display error message in case of no disk space.
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

//Function is used to display percentage on categories.

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
                //window.location.href ="index.html";
                location.reload();
            });
        }

    }
}