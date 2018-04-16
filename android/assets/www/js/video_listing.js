//document.addEventListener("deviceready", onDeviceReady, false);
var dir_path;
var online = false;
document.addEventListener("offline", onOffline, false);

function onOffline() {
    console.log("Downloaded array clear array");
    window.localStorage.removeItem("category_pref");
    window.localStorage.removeItem("header_download_pref");
    $("#animatedDownload").hide();
    online = false;
}


document.addEventListener("online", onOnline, false);

function onOnline() {

    online = true;
}




var category_array_clear;

var test21 = window.localStorage.getItem("header_download_pref");
var title_header_download_array = JSON.parse(test21); //var test is now re-loaded!


setTimeout(function() {

    if (category_array_clear == true) {
        console.log("Downloaded array clear array");
        window.localStorage.removeItem("category_pref");
        window.localStorage.removeItem("subcategory_pref");
        window.localStorage.removeItem("level3_pref");
        window.localStorage.removeItem("header_download_pref");
        $("#animatedDownload").hide();

    }


}, 5000);




var array;
var root_path;
var root_path1;
var trahsname;


//This function will initialize all the primary things.
function fnload() {

    $(".search-list").hide()
    $("#animatedDownload").hide();

    window.localStorage.setItem("page", "5");

    $("span.search .fa-search, ").click(function() {
        // $(".search-list").fadeToggle();
        $(".search-list").show();

        $(".search-list input").focus();
    })

    $(".search-close").click(function() {
        // $(".search-list").fadeToggle();                                                     $(".search-list").show();
        $(".search-list").hide();

        $('#show').hide();

    })




    $("span.search .language-icon").click(function() {
        $(".language").slideToggle();

    })
    $(".logo-text").click(function() {
        window.location.href = "../index/index.html";
    });

    $(".fa.fa-toggle-on").click(function() {

        window.location.href = "../flipbooknew/index.html";
        // window.location.href ="../book-ifair/index.html";

    });

    $("#flipbook_val").click(function() {

        window.location.href = "../flipbooknew/index.html";
        // window.location.href ="../book-ifair/index.html";

    });



    $(".language > ul > li").click(function() {
        $(".language").slideToggle();
        var lan = $(this).attr('id');
        window.localStorage.setItem("language", lan);
        var appname = document.getElementById("title");
        if (lan == "eng") {
            appname.innerHTML = "PE Pointer! ®";
            $("#flipbook_val").text("Viewing guide");
            $("#imageID").attr('src', '../images/en.gif');
            $("#mainUl li").remove();
            $("#videolistul li").remove();
            fn_videolist('../index/navigation_english.txt');
        } else {

            $("#flipbook_val").text("Kijkwijzer");
            appname.innerHTML = "GYMWIJZER! ®";
            $("#imageID").attr('src', '../images/nl_nl.gif');
            $("#mainUl li").remove();
            $("#videolistul li").remove();
            fn_videolist('../index/navigation.txt');
        }
    })
    $(".fa-download").click(function() {

        downloadvideo();
    });

    $(".fa-list-alt").click(function() {
        window.location.href = "../donwnload_video_list/videolist.html";
    })

    $(".logo-text.left-left").click(function() {
        window.location.href = "../level3/level3.html";
    });




    $("#kk-rock").click(function() {
        jQuery.fancybox.close();
    });

    $("#kk-rock1").click(function() {
        jQuery.fancybox.close();
    });


    $("#kk-rock2").click(function() {
        remove_video();
        jQuery.fancybox.close();
    });
}


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    console.log("device is ready");
    var navigation_pos = window.localStorage.getItem("titlepos");
    if (navigation_pos == "11") {
        window.localStorage.setItem("Niveau", "0");
    }
    $('li.innerli #2').click();
    window.addEventListener('orientationchange', function() {
        var logo = $(".logo").height();
        var imgLoad = $(".imgLoad").height();
        var contenttop = $(".content-top").height();
        var clr = $(".clr").height();
        var accormvideolist = $(".accor-m video-list-new-layout").height();
        var divForm = $("#divForm").height();
        var accormdownloadpage = $("#accor-m download-page").height();
        var totalheight = logo + imgLoad + contenttop + clr + accormvideolist + divForm + accormdownloadpage;
        var videoHeight = window.innerHeight - totalheight;
        var size;
        if (window.innerHeight > window.innerWidth) {
            var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

            if (deviceType == "iPad") {
                size = (window.innerHeight * 300) / 1024;
                videoHeight = videoHeight - size;
            }
        }
        var myElement = document.getElementById('myElement');
        var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

        if (deviceType != "iPhone") {
            myElement.style.height = videoHeight + "px";
        } else {
            videoHeight = videoHeight + size;
            myElement.style.height = videoHeight + "px";
        }
        myElement.style.width = window.innerWidth + "px";
    });

    var language = window.localStorage.getItem("language");
    var imageID = document.getElementById("imageID");

    var appname = document.getElementById("title");
    imageID.style.display = "block";
    if (language == "eng") {
        appname.innerHTML = "PE Pointer! ®";
        $("#flipbook_val").text("Viewing guide");
        $("#imageID").attr('src', '../images/en.gif');
        fn_videolist('../index/navigation_english.txt');
    } else {
        appname.innerHTML = "GYMWIJZER! ®";
        $("#flipbook_val").text("Kijkwijzer");

        $("#imageID").attr('src', '../images/nl_nl.gif');
        fn_videolist('../index/navigation.txt');
    }
    check_header_downloadStutus();
}

function fail() {
    console.log("failed to get filesystem");
}

function gotFS(fileSystem) {
    console.log("got filesystem");
    // save the file system for later access
    console.log(fileSystem.root.fullPath);
    root_path = fileSystem.root.fullPath;
    root_path1 = fileSystem.root.toURL();
    console.log(window.rootFS);

}

function downloadImage(url, fileName) {

}


//Function is used to play video and initialize video property.
function playvideo() {

    var val = window.localStorage.getItem("videourl");
    var videoname = window.localStorage.getItem("videoname");
    var thumbnail = window.localStorage.setItem("videoimage");
    console.log("Play video call");
    $(".title_name").html(videoname);

    $("#download").hide();
    var logo = $(".logo").height();
    var imgLoad = $(".imgLoad").height();
    var contenttop = $(".content-top").height();
    var clr = $(".clr").height();
    var accormvideolist = $(".accor-m video-list-new-layout").height();
    var divForm = $("#divForm").height();
    var accormdownloadpage = $("#accor-m download-page").height();
    var totalheight = logo + imgLoad + contenttop + clr + accormvideolist + divForm + accormdownloadpage;

    jwplayer("myElement").setup({
        file: val,
        image: thumbnail,
        height: videoHeight + "px",
        width: window.innerWidth + "px",
        repeat: "always",
        stretching: "exactfit"
    });

}

//Function is used to get category details (video details & thumbnail details)
function fn_videolist(data) {
    var mainUl = document.getElementById('mainUl');
    var maindiv = document.getElementById('maindiv');

    $.ajax({
        url: data,
        type: "get",
        dataType: "json",
        beforeSend: function() {
            var imgLoad = document.getElementById("imgLoad");
        },
        success: function(data, textStatus, jqXHR) {



            array = data_to_array(data);
            var navigation_pos = window.localStorage.getItem("titlepos");
            var subtitle_pos = window.localStorage.getItem("subtitlepos");

            var from_search_page = window.localStorage.getItem("from_search_list");

            var level3pos = window.localStorage.getItem("level3pos");


            $(".title_name").html(array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['level3'][level3pos]['titlename']);

            var niveauLength = array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['level3'][level3pos]['videourl'].length;
            if (niveauLength > 4)

            {
                $(".gym-content").addClass("sixitem");

            }


            for (var i = 0; i < array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['level3'][level3pos]['videourl'].length; i++) {
                var video = array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['level3'][level3pos]['videourl'];


                if (i == 0) {

                    var init_load_value = video[0]['videolist'];
                    var logo = $(".logo").height();
                    var imgLoad = $(".imgLoad").height();
                    var contenttop = $(".content-top").height();
                    var clr = $(".clr").height();
                    var accormvideolist = $(".accor-m video-list-new-layout").height();
                    var divForm = $("#divForm").height();
                    var accormdownloadpage = $("#accor-m download-page").height();
                    var totalheight = logo + imgLoad + contenttop + clr + accormvideolist + divForm + accormdownloadpage;
                    var videoHeight = window.innerHeight - totalheight;
                    if (window.innerHeight > window.innerWidth) {
                        var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

                        //alert(deviceType);
                        if (deviceType == "iPad") {
                            var size = (window.innerHeight * 300) / 1024;
                            videoHeight = videoHeight - size;
                        }
                    }



                    file_exist_download(init_load_value[0]['title'], init_load_value[0]['file'], init_load_value[0]['image'], videoHeight, window.innerWidth);



                    if (from_search_page == "true") {

                        var video_type_pos = window.localStorage.getItem("videotypepos");
                        console.log("video type pos :>" + video_type_pos);

                        fn_subtitle_videolist(array, video_type_pos);


                    } else {
                        fn_subtitle_videolist(data, i);


                        window.localStorage.setItem("videoname", init_load_value[0]['title']);
                        window.localStorage.setItem("videourl", init_load_value[0]['file']);
                        window.localStorage.setItem("videoimage", init_load_value[0]['image']);




                    }

                }

                var innerli = document.createElement('li');
                innerli.setAttribute('class', "innerli");
                innerli.setAttribute('id', i);
                innerli.setAttribute('ida', i);
                var innerA = document.createElement('a');

                innerA.setAttribute('class', 'ui-link');


                var span = document.createElement('span');
                span.innerHTML = video[i]['titlename'];
                innerli.setAttribute('name', video[i]['titlename']);
                innerA.appendChild(span);

                innerli.appendChild(innerA);

                mainUl.appendChild(innerli);

            }
            var LevelId = array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['level3'][level3pos]['id'];
            if (LevelId == "levelid33" || LevelId == "levelid21" || LevelId == "levelid29" || LevelId == "levelid23") {

                setTimeout(function() {
                    $("#videolistul li").remove();
                    if (LevelId == "levelid23") {
                        window.localStorage.setItem("videoid", "3");
                        fn_subtitle_videolist(array, "3");
                    } else {


                        window.localStorage.setItem("videoid", "2");
                        fn_subtitle_videolist(array, "2");
                    }

                }, 2500);
            }


            jQuery(".innerli").click(function() {

                var id = $(this).attr('ida');
                var navigation_pos = window.localStorage.getItem("titlepos");
                if (navigation_pos == "11") {
                    window.localStorage.setItem("Niveau", id);
                }
                var name = $(this).attr('name');
                window.localStorage.setItem("videoid", id);
                $("#videolistul li").remove();
                fn_subtitle_videolist(array, id);



            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error loading data :' + errorThrown);
            var imgLoad = document.getElementById("imgLoad");
            imgLoad.style.display = "none";
        }
    });
}

function data_to_array(data, pos) {
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

//Function is used to check wheather file downloaded or not. If downloaded then, it will play from local resource.
function file_exist_download(filename, url, image, height, width) {


    var fileexist = "GymWijzer/Video/" + filename + ".mp4";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        var entry = fileSystem.root;

        entry.getFile(fileexist, {
            create: false,
            exclusive: false
        }, function(dir) {
            var root_path = fileSystem.root.toURL();
            dir_path = root_path + "GymWijzer/Video/" + filename + ".mp4";
            image = root_path + "/GymWijzer/Thumbnail/" + filename + "/video_thumbnail.jpg";
            image = image.replace(/\s+/g, '');
            jwPlayer_video(dir_path, image, height, width);
        }, function(error) {
            dir_path = url;
            jwPlayer_video(dir_path, image, height, width);
        });
    }, null);
}

//Function is used to initialize JWPlayer with its different play back speed.
function jwPlayer_video(dir_path, image, height, width) {
    jwplayer("myElement").setup({
        file: dir_path,
        image: image,
        height: height + "px",
        width: width + "px",
        repeat: "always",
        aspectratio: "16:9"
    });


    var videoTag;
    var currentRate = 1;

    jwplayer().onReady(function() {
   
        if (jwplayer().getRenderingMode() == "html5") {

            videoTag = document.querySelector('video');

            if (videoTag.playbackRate) {
         
                jwplayer().addButton("../images/slow.png", "Slow Motion",
                    toggleSlomo, "slomo");
                jwplayer().addButton("../images/play.png", "Normal Motion",
                    toggleNormal, "normal");
                jwplayer().addButton("../images/fast.png", "Fast Motion",
                    toggleFast, "fast");
            }
        }
    });

    function toggleSlomo() {

        if (currentRate >= 1) {
            currentRate = 0.5
        }
        videoTag.playbackRate = currentRate;
        videoTag.defaultPlaybackRate = currentRate;
      
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            // alert("firefox");
            jwplayer().seek(jwplayer().getPosition());
        }

    };

    function toggleNormal() {
        if (currentRate != 1) {
            currentRate = 1
        }
        videoTag.playbackRate = currentRate;
        videoTag.defaultPlaybackRate = currentRate;
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            jwplayer().seek(jwplayer().getPosition());
        }

    };

    function toggleFast() {
        if (currentRate <= 1) {
            currentRate = 2
        }
        videoTag.playbackRate = currentRate;
        videoTag.defaultPlaybackRate = currentRate;
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            jwplayer().seek(jwplayer().getPosition());
        }

    };
}

//Function is used to get video detials of selected category.
function fn_subtitle_videolist(data, pos) {
    setTimeout(function() {
        var mainUl = document.getElementById('videolistul');
        var maindiv = document.getElementById('videolistdiv');
        var array = data;
        var navigation_pos = window.localStorage.getItem("titlepos");
        var subtitle_pos = window.localStorage.getItem("subtitlepos");
        var level3pos = window.localStorage.getItem("level3pos");
        var from_search_page = window.localStorage.getItem("from_search_list");

        var title_array = [];


        for (var i = 0; i < array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['level3'][level3pos]['videourl'][pos]['videolist'].length; i++) {

            var video = array['navigation'][navigation_pos]['subtitle'][subtitle_pos]['level3'][level3pos]['videourl'][pos]['videolist'];

            $(".title_name").html(video[0]['displayName']);
            console.log("for loop  " + video[i]['file']);

            var innerli = document.createElement('li');


            var innerA = document.createElement('a');

            var list_v = document.createElement('div');

            list_v.setAttribute('class', 'list-v');
            list_v.setAttribute('id', i);
            list_v.setAttribute('video_title', i);
            var list_v_img = document.createElement('img');

            var logo = $(".logo").height();
            var imgLoad = $(".imgLoad").height();
            var contenttop = $(".content-top").height();
            var clr = $(".clr").height();
            var accormvideolist = $(".accor-m video-list-new-layout").height();
            var divForm = $("#divForm").height();
            var accormdownloadpage = $("#accor-m download-page").height();
            var totalheight = logo + imgLoad + contenttop + clr + accormvideolist + divForm + accormdownloadpage;
            var videoHeight = window.innerHeight - totalheight;
            if (window.innerHeight > window.innerWidth) {
                var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

                if (deviceType == "iPad") {
                    var size = (window.innerHeight * 300) / 1024;
                    videoHeight = videoHeight - size;
                }
            }
            if (i == 0) {
                file_exist_download(video[0]['title'], video[0]['file'], video[0]['image'], videoHeight, window.innerWidth);
            }




            console.log("-----------------------------" + video[i]['image']);
            var videotitle = video[i]['title'].replace(/\s+/g, '');

            list_v_img.setAttribute('src', root_path1 + "/GymWijzer/Thumbnail/" + videotitle + "/video_thumbnail.jpg");
            list_v_img.setAttribute('onError', "this.onerror=null;this.src='" + video[i]['image'] + "';");


            if (i == 0) {
                poster_file_exist(video[i]['title'], video[i]['image']);
            }

            list_v_img.setAttribute('height', 100);
            list_v_img.setAttribute('width', 100);
            list_v.appendChild(list_v_img);



            var paly_b = document.createElement('div');
            paly_b.setAttribute('class', 'paly-b');

            var fa_fa_play = document.createElement('i');
            fa_fa_play.setAttribute('class', 'fa fa-play');
            paly_b.appendChild(fa_fa_play);
            list_v.appendChild(paly_b);
            list_v.setAttribute('vid_name', video[i]['title']);
            list_v.setAttribute('vid_displayName', video[i]['displayName']);
            list_v.setAttribute('vid_url', video[i]['file']);

            var fileexist = "GymWijzer/Video/" + video[i]['title'] + ".mp4";

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                var entry = fileSystem.root;

                entry.getFile(fileexist, {
                    create: false,
                    exclusive: false
                }, function(dir) {
                    var root_path = fileSystem.root.toURL();
                    image = root_path + "/GymWijzer/Thumbnail/" + filename + "/video_thumbnail.jpg";
                    image = image.replace(/\s+/g, '');
                    list_v.setAttribute('vid_image', image);
                }, function(error) {
                    list_v.setAttribute('vid_image', video[i]['image']);
                });
            }, null);




            innerA.appendChild(list_v);


            var span = document.createElement('span');
            span.innerHTML = video[i]['displayName'];
            title_array[i] = video[i]['title'];
            innerA.appendChild(span);
            innerli.appendChild(innerA);
            mainUl.appendChild(innerli);




            var span1 = document.createElement('span');
            span1.innerHTML = video[i]['description'];
            span1.setAttribute('class', 'des_2');

            innerA.appendChild(span1);


            var trash_i = document.createElement('i');
            var center_i = document.createElement('center');
            trash_i.setAttribute('class', 'fa fa-trash');
            trash_i.setAttribute('trash_videname', video[i]['title']);
            innerA.appendChild(trash_i);

            innerli.appendChild(innerA);
            mainUl.appendChild(innerli);

            console.log(from_search_page);
            if (from_search_page == "true") {

                var video_pos = window.localStorage.getItem("videopos");


                if (i == video_pos) {
                    window.localStorage.setItem("videoname", video[video_pos]['title']);
                    window.localStorage.setItem("videourl", video[video_pos]['file']);
                    window.localStorage.setItem("videoimage", video[video_pos]['image']);


                    window.localStorage.setItem("from_search_list", false);
                    console.log("from_search_page " + window.localStorage.getItem("from_search_list"));


                }
            } else {

                console.log("else call");
                if (i == 0) {
                    window.localStorage.setItem("videoname", video[i]['title']);
                    window.localStorage.setItem("videourl", video[i]['file']);
                    window.localStorage.setItem("videoimage", video[i]['image']);

                }

            }

        }

        maindiv.appendChild(mainUl);
        jQuery(".list-v").click(function() {

            var videoname = $(this).attr('vid_name');
            var videourl = $(this).attr('vid_url');
            var videoimage = $(this).attr('vid_image');
            var id = $(this).attr('id');
            console.log("mage url is :>" + videoimage);
            poster_file_exist(videoname, videoimage);

            window.localStorage.setItem("videoid", id);
            window.localStorage.setItem("videoname", videoname);
            //alert(videourl);
            window.localStorage.setItem("videourl", videourl);
            window.localStorage.setItem("videoimage", videoimage);


            $(".title_name").html($(this).attr('vid_displayName'));
            var logo = $(".logo").height();
            var imgLoad = $(".imgLoad").height();
            var contenttop = $(".content-top").height();
            var clr = $(".clr").height();
            var accormvideolist = $(".accor-m video-list-new-layout").height();
            var divForm = $("#divForm").height();
            var accormdownloadpage = $("#accor-m download-page").height();
            var totalheight = logo + imgLoad + contenttop + clr + accormvideolist + divForm + accormdownloadpage;

            file_exist_download(videoname, videourl, videoimage, videoHeight, window.innerWidth);

        });
        jQuery(".fa.fa-trash").click(function() {

            trahsname = $(this).attr('trash_videname');
            jQuery.fancybox.open("#conform_donwload");


        });




        setTimeout(function() {
            for (var l = 0; l < title_array.length; l++) {
                console.log("titkw name :> " + title_array[l]);
                file_exist(title_array[l], l);
            }

        }, 2500); //Timeout changed




    }, 2500); //Timeout changed

}

//Function is used to get absolute path of the downloaded video file. And initialize JWPlyaer with its different playback speed.
function getAbsolutePath(file_name, call_back) {
    var full_path = "";
    var url = window.localStorage.getItem("videourl");
    var imagePath = window.localStorage.getItem("videoimage");

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        function(file_system) {
            file_system.root.getFile(
                "GymWijzer/Video/" + file_name + ".mp4", {
                    create: false
                },
                call_back,
                function() {
                    console.log("failed to fetch file, please check the name");

                    $("#download").show();
                    var logo = $(".logo").height();
                    var imgLoad = $(".imgLoad").height();
                    var contenttop = $(".content-top").height();
                    var clr = $(".clr").height();
                    var accormvideolist = $(".accor-m video-list-new-layout").height();
                    var divForm = $("#divForm").height();
                    var accormdownloadpage = $("#accor-m download-page").height();
                    var totalheight = logo + imgLoad + contenttop + clr + accormvideolist + divForm + accormdownloadpage;

                    var videoHeight = window.innerHeight - totalheight;

                    jwplayer("myElement").setup({
                        file: url,
                        autostart: true,
                        image: imagePath,
                        height: videoHeight + "px",
                        width: window.innerWidth + "px",
                        repeat: "always",
                        stretching: "exactfit"
                    });

                    var videoTag;
                    var currentRate = 1;

                    jwplayer().onReady(function() {
                        if (jwplayer().getRenderingMode() == "html5") {
                            videoTag = document.querySelector('video');
                            if (videoTag.playbackRate) {
                                jwplayer().addButton("../images/slow.png", "Slow Motion",
                                    toggleSlomo, "slomo");
                                jwplayer().addButton("../images/play.png", "Normal Motion",
                                    toggleNormal, "normal");
                                jwplayer().addButton("../images/fast.png", "Fast Motion",
                                    toggleFast, "fast");
                            }
                        }
                    });

                    function toggleSlomo() {
                        if (currentRate >= 1) {
                            currentRate = 0.5
                        }
                        videoTag.playbackRate = currentRate;
                        videoTag.defaultPlaybackRate = currentRate;
                        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                            jwplayer().seek(jwplayer().getPosition());
                        }

                    };

                    function toggleNormal() {
                        if (currentRate != 1) {
                            currentRate = 1
                        }
                        videoTag.playbackRate = currentRate;
                        videoTag.defaultPlaybackRate = currentRate;
                        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                            jwplayer().seek(jwplayer().getPosition());
                        }

                    };

                    function toggleFast() {
                        if (currentRate <= 1) {
                            currentRate = 2
                        }
                        videoTag.playbackRate = currentRate;
                        videoTag.defaultPlaybackRate = currentRate;
                        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                            jwplayer().seek(jwplayer().getPosition());
                        }

                    };
                }
            );
        },
        function() {
            console.log("failed file sytem");
        }
    );
}


function downloadvideo() {


    var progress = document.getElementById('progresstext');
    var videoname = window.localStorage.getItem("videoname");

    var url = window.localStorage.getItem("videourl");
    progress.innerHTML = "Download start";


    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

    function onRequestFileSystemSuccess(fileSystem) {
        var entry = fileSystem.root;
        console.log("Root path " + entry.fullPath);

        entry.getDirectory("GymWijzer/Video", {
            create: true,
            exclusive: false
        }, onGetDirectorySuccess, onGetDirectoryFail);
        download_thumbnail();
    }

    function onGetDirectorySuccess(dir) {
        console.log("Created dir " + dir.name);

    }

    function onGetDirectoryFail(error) {
        console.log("Error creating directory " + error.code);
    }

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

        var imagePath = fs.root.fullPath + "/GymWijzer/Video/" + videoname + ".mp4"; //
        var fileTransfer = new FileTransfer();


        fileTransfer.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {

                var perc = Math.floor((progressEvent.loaded / progressEvent.total * 100));
                progress.innerHTML = "" + (perc) + "% Downloaded...";
                console.log("Download progress :> " + "" + (perc) + "%")

            } else {

            }
        };

        fileTransfer.download(url, imagePath, function(entry) {
            console.log("video saves at :> " + entry.fullPath); // entry is fileEntry
            progress.innerHTML = "Download";
            jQuery.fancybox.open("#divForm");

        }, function(error) {
            console.log("Some error");
        });
    })
}


function downloadvideo12() {




    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

    function onRequestFileSystemSuccess(fileSystem) {
        var entry = fileSystem.root;
        console.log("Root path " + entry.fullPath);
        

        entry.getDirectory("GymWijzer/Video", {
            create: true,
            exclusive: false
        }, onGetDirectorySuccess, onGetDirectoryFail);
        download_thumbnail();
    }

    function onGetDirectorySuccess(dir) {
        console.log("Created dir " + dir.name);

    }

    function onGetDirectoryFail(error) {
        console.log("Error creating directory " + error.code);
    }

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
        var url = "http://download.wavetlan.com/SVV/Media/HTTP/BlackBerry.mp4";

        var imagePath = fs.root.fullPath + "/GymWijzer/Video/abcd.mp4"; //
        var fileTransfer = new FileTransfer();


        fileTransfer.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {

                var perc = Math.floor((progressEvent.loaded / progressEvent.total * 100));

                console.log("Download progress :> " + "" + (perc) + "%")

            } else {

            }
        };


        fileTransfer.download(url, imagePath, function(entry) {
            console.log("video saves at :> " + entry.fullPath); // entry is fileEntry


        }, function(error) {
            console.log("Some error");
        });
    })
}


function download_thumbnail() {



    var videoname = window.localStorage.getItem("videoname");

    var url = window.localStorage.getItem("videoimage");


    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

    function onRequestFileSystemSuccess(fileSystem) {
        var entry = fileSystem.root;
        videoname = videoname.replace(/\s+/g, '');
        entry.getDirectory("GymWijzer/Thumbnail/" + videoname, {
            create: true,
            exclusive: false
        }, onGetDirectorySuccess, onGetDirectoryFail);
    }

    function onGetDirectorySuccess(dir) {
        console.log("Created video image dir " + dir.name);
    }

    function onGetDirectoryFail(error) {
        console.log("Error  video thumbnail creating directory " + error.code);
    }

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {



        var imagePath = fs.root.fullPath + "/GymWijzer/Thumbnail/" + videoname + "/video_thumbnail.jpg"; //
        var fileTransfer = new FileTransfer();


        fileTransfer.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {

            } else {

            }
        };


        fileTransfer.download(url, imagePath, function(entry) {
            console.log("Thumbnail saves at :> " + entry.fullPath); // entry is fileEntry
            // alert(entry.fullPath);
        }, function(error) {
            console.log("Some error");
        });
    })
}


//Function is used to remove downloaded videos from the local resources.

function remove_video() {



    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

    function onRequestFileSystemSuccess(fileSystem) {

        fileSystem.root.getFile("GymWijzer/Video/" + trahsname + ".mp4", {
            create: false,
            exclusive: false
        }, gotRemoveFileEntry, fail);

    }



    function gotRemoveFileEntry(fileEntry) {
        console.log(fileEntry);
        fileEntry.remove(success, fail);
    }

    function success(entry) {
        console.log("Removal succeeded");
        $("#videolistul li").remove();
        fn_subtitle_videolist(array, window.localStorage.getItem("videoid"));
        jQuery.fancybox.open("#remove");



    }

    function fail(error) {
        console.log("Error removing file: " + error.code);
    }

}
//Function is used to display thumbnail from local resource if already video & thumbnail is downloaded.
function poster_file_exist(title, imageurl) {

    title = title.replace(/\s+/g, '');
    var fileexist = root_path + "/GymWijzer/Thumbnail/" + title + "/video_thumbnail.jpg"

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

    function onRequestFileSystemSuccess(fileSystem) {
        var entry = fileSystem.root;
        entry.getFile(fileexist, {
            create: false,
            exclusive: false
        }, onGetDirectorySuccess, onGetDirectoryFail);

    }

    function onGetDirectorySuccess(dir) {

        console.log("File is exist  " + dir.name);
        $('#myVideo').attr('poster', fileexist);


    }

    function onGetDirectoryFail(error) {
        $('#myVideo').attr('poster', imageurl);



    }

}


//Function is used to display dustbin icon, if video is already downloaded.
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

        console.log("File is exist  " + dir.name);

        $("[video_title=" + levelpos + "]").parent().addClass("deletevideo");

    }

    function onGetDirectoryFail(error) {

        console.log("Error directory " + error.code + "  " + filename + "         " + levelpos);

    }

}

//Function is used to display dustbin icon, if video is already downloaded.

function check_header_downloadStutus() {

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

//Function is used to display dustbin icon, if video is already downloaded.
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