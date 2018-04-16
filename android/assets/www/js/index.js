var online = false;
document.addEventListener("offline", onOffline, false);

function onOffline() {
    online = false;
    window.localStorage.removeItem("category_pref");
    window.localStorage.removeItem("header_download_pref");
    $("#animatedDownload").hide();
}

document.addEventListener("online", onOnline, false);

function onOnline() {
    online = true;
}

setTimeout(function() {

    if (category_array_clear == true) {
        console.log("Downloaded array clear array");
        window.localStorage.removeItem("category_pref");
        window.localStorage.removeItem("subcategory_pref");
        window.localStorage.removeItem("level3_pref");
        window.localStorage.removeItem("header_download_pref");
        $("#animatedDownload").hide();
    }
           
}, 8000);

var array;
var delete_vido_pos;
var category_array = [];
var category_array_clear;
var download_stutus = true;
var title_header_download_array = [];
var test21 = window.localStorage.getItem("header_download_pref");
var test11 = JSON.parse(test21);

console.log("aa length" + test11.length);

if (test11.length > 0) {
    title_header_download_array = test11;
}

var test2 = window.localStorage.getItem("category_pref");
var test1 = JSON.parse(test2); //var test is now re-loaded!

console.log("category " + test1.length);

if (test1.length > 0) {
    category_array = test1;
} else {
    category_array = [];
}

function fnload() {

    $(".search-list").hide()

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

    $(".language > ul > li").click(function() {
        $(".language").slideToggle();
        var lan = $(this).attr('id');

        window.localStorage.setItem("language", lan);

        var appname = document.getElementById("title");
        if (lan == "eng") {
            appname.innerHTML = "PE Pointer! ®";
            $('.online.offline .video-status:before').css("content", "Download");
            $('.online .video-status:before').css("content", "Downloaded");
            $("#imageID").attr('src', '../images/en.gif');
            $("#mainul li").remove();
            call_navigatortext('navigation_english.txt');
            fn_videolist('navigation.txt');

        } else {
            appname.innerHTML = "GYMWIJZER! ®";
            $('.online.offline .video-status:before').css("content", "Download11");
            $('.online .video-status:before').css("content", "Downloaded11");
            $("#imageID").attr('src', '../images/nl_nl.gif');
            $("#mainul li").remove();
            call_navigatortext('navigation.txt');
            fn_videolist('navigation.txt');
        }
    })


    $("#dwn-video-list").click(function() {
        window.location.href = "../donwnload_video_list/videolist.html";
    })


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

    var language = window.localStorage.getItem("language");
    var imageID = document.getElementById("imageID");
    var appname = document.getElementById("title");
    imageID.style.display = "block";
    if (language == "eng") {
        appname.innerHTML = "PE Pointer! ®";

        $("#imageID").attr('src', '../images/en.gif');
        call_navigatortext('navigation_english.txt');
    } else {
        appname.innerHTML = "GYMWIJZER! ®";

        $("#imageID").attr('src', '../images/nl_nl.gif');
        call_navigatortext('navigation.txt');
    }
}

function get_language() {
    var language = window.localStorage.getItem("language");

    if (language == "eng") {
        return "navigation_english.txt";
    } else {
        return "navigation.txt";
    }
}

function call_navigatortext(data) {
    var level1_menu = [];

    $.ajax({
        url: data,
        type: "get",
        dataType: "json",

        beforeSend: function() {
            var imgLoad = document.getElementById("imgLoad");
            imgLoad.style.display = "block";
        },

        success: function(data, textStatus, jqXHR) {

            var mainul = document.getElementById('mainul');

            array = data_to_array(data);

            for (var i = 0; i < array['navigation'].length; i++) {
                var mainli = document.createElement('li');
                mainli.setAttribute('class', 'mainli');
                mainli.setAttribute('titlepos', i);
                mainli.setAttribute('checkstatus', "online");

                var mainli_a = document.createElement('a');
                var mainli_a_i = document.createElement('i');
                mainli_a_i.setAttribute('class', 'fa fa-user');
                mainli_a_i.setAttribute('titlepos', i);

                mainli_a.appendChild(mainli_a_i);

                var mainli_span = document.createElement('span');
                mainli_span.innerHTML = array['navigation'][i]['title'];
                level1_menu[i] = array['navigation'][i]['title'];
                mainli_a.appendChild(mainli_span);

                var mainli_span1 = document.createElement('span');
                mainli_span1.setAttribute('class', 'progressbar');
                mainli_span1.setAttribute('id', array['navigation'][i]['id']);

                mainli_a.appendChild(mainli_span1);

                var mainli_em = document.createElement('em');
                mainli_em.setAttribute('class', 'video-status');
                mainli_em.setAttribute('titlepos', i);

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
                fn_videolist("navigation.txt");
            }, 500);

            window.localStorage.setItem("level1", JSON.stringify(level1_menu));

            jQuery(".fa.fa-user").click(function() {
                var unique_id = $(this).attr("titlepos");

                window.localStorage.setItem("titlepos", unique_id);
                window.location.href = "../subtitle/subtitle.html";

            });
            jQuery(".video-status").click(function() {
                var unique_id = $(this).attr("titlepos");

                var parentElId = $(this).parent().parent().attr('checkstatus');
                if (parentElId == "offline") {

                    if (online) {
                        $("em[titlepos=" + unique_id + "]").removeClass("fa fa-repeat");
                        $(this).parent().parent().addClass("animationicon");
                        $("li[titlepos=" + unique_id + "]").addClass("offlinedutch");
                        $("em[titlepos=" + unique_id + "]").addClass("offlinedutch");
                        $("em[titlepos=" + unique_id + "]").addClass("animationicon");

                        var obj1 = {};
                        obj1["category"] = array['navigation'][unique_id]['title']
                        obj1["categoryId"] = unique_id;
                        category_array.push(obj1);

                        window.localStorage.setItem("category_pref", JSON.stringify(category_array));

                        var test2 = window.localStorage.getItem("category_pref");
                        var test = JSON.parse(test2);

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

var arr = new Array();

var ary = [];
for (i = 0; i < 6; i++) {
    var obj = {};
    obj["name"] = "name" + i;
    obj["address"] = "address" + i;
    obj["phone"] = "phone" + i;
    ary.push(obj);
}

function pushToAry(name, val) {
    var obj = {};
    obj[name] = val;
    ary.push(obj);
}
//----------------------------------------------------Start BAckground Thread--------------------------------------------------------------

function start_background_process(i, array) {
    var main_obj = {};
    var ary = [];

    for (var j = 0; j < array['navigation'][i]['subtitle'].length; j++) {

        var subtitle = array['navigation'][i]['subtitle'][j]['titlename'];

        //---------DHRUV--------//
        var test2 = window.localStorage.getItem("subcategory_pref");
        var test1 = JSON.parse(test2);
        var obj22 = {};
        var category_array = [];
        if (test1 != null && test1.length > 0) {
            category_array = test1;
        } else {
            category_array = [];
        }
        obj22["titleKey"] = i;
        obj22["category"] = array['navigation'][j]['title'];
        obj22["categoryId"] = j;
        category_array.push(obj22);
        window.localStorage.setItem("subcategory_pref", JSON.stringify(category_array));

        //-------DHRUV-------//


        var progressid = array['navigation'][i]['id'];

        for (var k = 0; k < array['navigation'][i]['subtitle'][j]['level3'].length; k++) {
            //            ----------DHRUV---------//
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
            //-------DHRUV--------//

            for (var l = 0; l < array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'].length; l++) {


                for (var m = 0; m < array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'].length; m++) {
                    var data = array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'];
                    var obj = {};
                    obj["progressid"] = progressid;
                    obj["title"] = data[m]["title"];
                    obj["file"] = data[m]["file"];
                    //obj["file"] = "http://192.254.147.100/~dev7ifla/globis/big_buck_bunny_720p_1mb.mp4";
                    obj["image"] = data[m]["image"];
                    ary.push(obj);

                    var obj1 = {};

                    obj1["filename"] = data[m]["title"];
                    console.log("ADD file name :> " + data[m]["title"]);
                    title_header_download_array.push(obj1);
                }
            }
        }
    }
    window.localStorage.setItem("header_download_pref", JSON.stringify(title_header_download_array));

    main_obj["videolist"] = ary;
    window.plugins.backgroundjs.lockBackgroundTime(JSON.stringify(main_obj));
}

function background_image_process(array) {

    var main_obj = {};


    var ary = [];



    // console.log("Array is :. "+JSON.stringify(main_obj));

    for (var i = 0; i < array['navigation'].length; i++) {

        for (var j = 0; j < array['navigation'][i]['subtitle'].length; j++) {

            var subtitle = array['navigation'][i]['subtitle'][j]['titlename'];



            for (var k = 0; k < array['navigation'][i]['subtitle'][j]['level3'].length; k++) {
                // alert(array['navigation'][i]['subtitle'][j]['level3'][k]['titlename']);


                for (var l = 0; l < array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'].length; l++) {


                    for (var m = 0; m < array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'].length; m++) {
                        //    alert(array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'][m]['videoname']);
                        var data = array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'];
                        //    console.log("  title   :>"+data[m]["title"]);
                        //   console.log("  file   :> "+data[m]["file"]);
                        //   console.log("  image   :> "+data[m]["image"]);

                        var obj = {};
                        obj["title"] = data[m]["title"];
                        obj["file"] = data[m]["file"];
                        obj["image"] = data[m]["image"];
                        ary.push(obj);


                    }


                }



            }
        }
    }
    main_obj["videolist"] = ary;
    console.log("Thumbnaile Array is :. " + JSON.stringify(main_obj));

    window.plugins.backgroundjs.lockThumbnaileBackgroundTime(JSON.stringify(main_obj));

}

//-----------------------------------------------------Check downloaded video is exist or not -------------------------------------------------

function onDeviceReady() {
    //alert("onDeviceReady");
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

    window.localStorage.setItem("page", "1");

    check_header_downloadStutus();
}

function fn_videolist(data) {
    //alert("fn_header_downloadstatus");

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


            // alert("Online success");
            array = data_to_array(data);

            var title = array['navigation'];
            //      alert("on device "+title.length);
            for (var m = 0; m < title.length; m++) {
                var offline_val = false;
                //alert("Level 3 l3ngth "+m);
                var subtitile = array['navigation'][m]['subtitle'];
                for (var l = 0; l < subtitile.length; l++) {
                    var level3 = subtitile[l]['level3'];

                    for (var k = 0; k < level3.length; k++) {

                        var video = level3[k]['videourl'];
                        for (var i = 0; i < video.length; i++) {
                            for (var j = 0; j < video[i]['videolist'].length; j++) {

                                var title_name = video[i]['videolist'][j]['title'];
                                var file_result = file_exist(title_name, m, offline_val);

                            }
                        }
                    }
                }
                console.log("***********************************************   " + m + "  ");
            }

            var imgLoad = document.getElementById("imgLoad");
            imgLoad.style.display = "none";


            //------------------Backgorungd Download process for flipbook image



            // setTimeout(function() {
            //     alert("Comple status start to work");
            console.log("Call callac all acall c al clac la calac al");
            if (download_stutus) {
                download_stutus = false;
                download_complete_status();
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("**************************ON DEVICE READY ERROR *****   ");

            console.log('error loading data :' + errorThrown);
            var imgLoad = document.getElementById("imgLoad");
            imgLoad.style.display = "none";

        }
    });




}




function file_exist(filename, levelpos, offline_val) {


    var fileexist = "GymWijzer/Video/" + filename + ".mp4";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

    function onRequestFileSystemSuccess(fileSystem) {
        var entry = fileSystem.root;
        //alert(entry);
        entry.getFile(fileexist, {
            create: false,
            exclusive: false
        }, onGetDirectorySuccess, onGetDirectoryFail);

    }

    function onGetDirectorySuccess(dir) {
        //alert("S");

        //  console.log("File is exist  "+dir.name);
        //   console.log("File is exist  "+levelpos);
        //
        //        if(offline_val)
        //        {
        //      //      $("[titlepos="+levelpos+"]").addClass("offline");
        //     //       $("[titlepos="+levelpos+"]").removeClass("online");
        //        }
        //        else
        //        {
        //           // $("[titlepos="+levelpos+"]").addClass("online");
        //           // $("[titlepos="+levelpos+"]").removeClass("offline");
        //        }


        //     $("[level3pos="+levelpos+"]").css("background-color", "green");

    }

    function onGetDirectoryFail(error) {

        //alert("F");
        var language = window.localStorage.getItem("language");
        if (language == "eng") {
            $("[titlepos=" + levelpos + "]").removeClass("online");
            $("[titlepos=" + levelpos + "]").addClass("offline");
        } else {
            $("[titlepos=" + levelpos + "]").removeClass("onlinedutch");
            $("[titlepos=" + levelpos + "]").addClass("offlinedutch");
        }
        $("[titlepos=" + levelpos + "]").attr("checkstatus", "offline")

        //     $("[level3pos="+levelpos+"]").css("background-color", "red");

    }

}

function remove_video_list() {

    var videoLength = 0;
    var videoCounter = 0;
    var r_videoList = [];


    var subtitile = array['navigation'][delete_vido_pos]['subtitle'];
    for (var l = 0; l < subtitile.length; l++) {
        var level3 = subtitile[l]['level3'];

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
                    //var file_result= remove_video(title_name);

                }
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
            fn_videolist('navigation.txt');
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

function download_complete_status() {
    //alert("Donwload Complete Status");
    console.log("***********download_complete_status*****   " + category_array.length);
    //alert(category_array);
    if (category_array.length > 0) {

        $("#animatedDownload").show();
        category_array_clear = true;
    }

    // alert("is "+category_array.length);
    for (var i = 0; i < category_array.length; i++) {
        //alert(category_array[i]["catgoryid"]);
        var categoryid = category_array[i]["categoryId"];
        console.log("is di " + categoryid);
        download_complete_status_exist(categoryid);

    }

}

function download_complete_status_exist(id1) {

    // alert("kjbgnvi");


    var subtitile = array['navigation'][id1]['subtitle'];

    for (var l = 0; l < subtitile.length; l++) {
        var level3 = subtitile[l]['level3'];

        for (var k = 0; k < level3.length; k++) {

            var video = level3[k]['videourl'];
            for (var i = 0; i < video.length; i++) {
                for (var j = 0; j < video[i]['videolist'].length; j++) {
                    var title_name = video[i]['videolist'][j]['title'];
                    //console.log("Helllo");
                    var file_result = category_file_exist(title_name, id1);
                }
            }
        }
    }
    //


}

function category_file_exist(filename, levelpos) {

    var cnt = 0;
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
        cnt = cnt + 1;

    }

    function onGetDirectoryFail(error) {

        console.log("running downlaoded video  Fail to get file   " + levelpos);
        category_array_clear = false;




        var launch = window.localStorage.getItem("launch");
        //alert(launch);
        if (launch != "") {
            //alert("Error");
            window.localStorage.removeItem("launch");
            $("[titlepos=" + levelpos + "]").removeClass("offlinedutch");
            $("[titlepos=" + levelpos + "]").removeClass("offline");
            $("em[titlepos=" + levelpos + "]").addClass("fa fa-repeat");

        } else {
            //alert("Removed");
            $("[titlepos=" + levelpos + "]").addClass("animationicon");
        }
        //  $("[titlepos="+levelpos+"]").addClass("offline");
        //  $("[titlepos="+levelpos+"]").attr("checkstatus","offline")

        //     $("[level3pos="+levelpos+"]").css("background-color", "red");

    }
}




function check_header_downloadStutus() {
    //alert("check_header_downloadStutus");

    var test21 = window.localStorage.getItem("header_download_pref");
    var test11 = JSON.parse(test21); //var test is now re-loaded!

    console.log("check_header_downloadStutus length" + test11.length);

    if (test11.length > 0) {
        // alert("tes11 array "+test11.length);
        $("#animatedDownload").show();
        category_array_clear = true;
    }


    //  alert("check_header_downloadStutus "+test11.length);
    for (var i = 0; i < test11.length; i++) {
        var name = test11[i]["filename"];
        console.log("check_header_downloadStutus is di " + name);
        header_file_exist(name);

    }

}

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

        console.log("check_header_downloadStutus ERROR  Fail to get file");
        category_array_clear = false;
        $("#animatedDownload").show();

    }

}

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
        if($.isNumeric( percentage )!=false){
            totalpercentage.innerHTML = percentage + "%";
        }
    }
    if (counting == counter) {
        window.localStorage.removeItem("t_counting");
        window.localStorage.removeItem("t_counter");
    }
}

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

function callSomeFunction(counting, counter, pid) {
    //alert("check");
    // //$('#progressbar').innerHTML= valmm + 1;
    window.localStorage.setItem("p_counting", counting);
    window.localStorage.setItem("p_counter", counter);
    window.localStorage.setItem("p_id", pid);

    //console.log("pid length:  "+$('.'+pid).length);
    if (document.getElementById(pid)) {
        // do what you need here

        //if (myElem == null)
        //{
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

    /*$("#progress1").html("<b>Gym  --:"+counting + counter + pid"</b>");//.innerHTML= "1";
     jQuery.fancybox.open("#progressbar");
     $("#kk-rock4").click(function(){
     jQuery.fancybox.close();
     });*/
}

function retryFunction() {
    console.log("REtry ");
    window.localStorage.setItem("launch", "launch");
    //alert("Retry");
}