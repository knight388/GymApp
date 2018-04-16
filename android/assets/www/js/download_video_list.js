var category_array_clear;

var test21 = window.localStorage.getItem("header_download_pref");
var title_header_download_array = JSON.parse(test21); //var test is now re-loaded!


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
        window.localStorage.removeItem("category_pref");
        window.localStorage.removeItem("header_download_pref");
        $("#animatedDownload").hide();
    }
}, 5000);

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    window.addEventListener('orientationchange', function() {
        var logo = $(".logo").height();
        var videoHeight = window.innerHeight - logo;
        if (window.innerHeight > window.innerWidth) {
            var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

            //alert(deviceType);
            if (deviceType == "iPad") {
                videoHeight = videoHeight / 2;
            }
        }
        var myElement = document.getElementById('myElement');
        myElement.style.height = videoHeight + "px";
        myElement.style.width = window.innerWidth + "px";
    });

    $("#animatedDownload").hide();

    $(".search-list").hide()

    $("span.search .fa-search, ").click(function() {
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

    $(".language > ul > li").click(function() {
        $(".language").slideToggle();
        var lan = $(this).attr('id');
        window.localStorage.setItem("language", lan);
        var appname = document.getElementById("title");
        if (lan == "eng") {
            appname.innerHTML = "PE Pointer! ®";
            $("#imageID").attr('src', '../images/en.gif');
            $("#mainUl li").remove();
            $("#videolistul li").remove();

        } else {
            appname.innerHTML = "GYMWIJZER! ®";
            $("#imageID").attr('src', '../images/nl_nl.gif');
            $("#mainUl li").remove();
            $("#videolistul li").remove();

        }
        getAllFile_List();
    })



    $(".logo-text.left-left").click(function() {

        var pg = window.localStorage.getItem("page");

        if (pg == "1")
            window.location.href = "../index/index.html";
        else if (pg == "2")
            window.location.href = "../subtitle/subtitle.html";
        else if (pg == "3")
            window.location.href = "../level3/level3.html";
        else if (pg == "4")
            window.location.href = "../media/media.html";
        else if (pg == "5")
            window.location.href = "../video/videolist.html";
        else if (pg == "6")
            window.location.href = "../flipbooknew/index.html";

    });




    var language = window.localStorage.getItem("language");
    var imageID = document.getElementById("imageID");
    //alert(imageID);
    imageID.style.display = "block";
    var appname = document.getElementById("title");
    if (language == "eng") {
        appname.innerHTML = "PE Pointer! ®";
        $("#imageID").attr('src', '../images/en.gif');
        //fn_videolist('../index/navigation_english.txt');
    } else {
        appname.innerHTML = "GYMWIJZER! ®";
        $("#imageID").attr('src', '../images/nl_nl.gif');
        //fn_videolist('../index/navigation.txt');
    }
    getAllFile_List();
    check_header_downloadStutus();

}

jQuery(document).ready(function() {
    $(".logo-text").click(function() {
        window.location.href = "../index/index.html";
    });
});

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


//This function is used to get all entries of file that was downloaded into user's device.
function getAllFile_List() {

    var mainUl = document.getElementById('videolistul');
    var maindiv = document.getElementById('videolistdiv');
    var root_path;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        fileSystem.root.getDirectory("GymWijzer/Video", {
            create: true
        }, function(directory) {
            root_path = fileSystem.root.toURL();
            var directoryReader = directory.createReader();
            directoryReader.readEntries(function(entries) {
                var i;

                for (i = 0; i < entries.length; i++) {

                    if (i == 0) {
                        window.localStorage.setItem("videoname", entries[i].name);
                        window.localStorage.setItem("videourl", entries[i].toURL());
                        var path = entries[i].name;
                        var video_title = path.replace(".mp4", "");
                        var imgurl = root_path + "/GymWijzer/Thumbnail/" + video_title + "/video_thumbnail.jpg";
                        window.localStorage.setItem("imageurl", imgurl);
                        playvideo();
                    }


                    var innerli = document.createElement('li');


                    var innerA = document.createElement('a');

                    var list_v = document.createElement('div');

                    list_v.setAttribute('class', 'list-v');
                    list_v.setAttribute('id', i);

                    var list_v_img = document.createElement('img');

                    var path = entries[i].name;
                    var video_title = path.replace(".mp4", "");

                    var imgurl1 = root_path + "/GymWijzer/Thumbnail/" + video_title + "/video_thumbnail.jpg";
                    imgurl1 = imgurl1.replace(/\s+/g, '');
                    list_v_img.setAttribute('src', imgurl1);
                    list_v_img.setAttribute('height', 100);
                    list_v_img.setAttribute('width', 100);

                    list_v.appendChild(list_v_img);
                    var paly_b = document.createElement('div');
                    paly_b.setAttribute('class', 'paly-b');

                    var fa_fa_play = document.createElement('i');
                    fa_fa_play.setAttribute('class', 'fa fa-play');
                    paly_b.appendChild(fa_fa_play);
                    list_v.appendChild(paly_b);
                    list_v.setAttribute('vid_name', video_title);
                    list_v.setAttribute('vid_url', entries[i].toURL());
                    innerA.appendChild(list_v);


                    var span = document.createElement('span');
                    span.innerHTML = video_title;
                    innerA.appendChild(span);
                    innerli.appendChild(innerA);
                    mainUl.appendChild(innerli);


                }
                maindiv.appendChild(mainUl);

                jQuery(".list-v").click(function() {

                    var videoname = $(this).attr('vid_name');
                    var videourl = $(this).attr('vid_url');
                    var id = $(this).attr('id');
                    var path = videoname;
                    var video_title = path.replace(".mp4", "");
                    var imgurl = root_path + "/GymWijzer/Thumbnail/" + video_title + "/video_thumbnail.jpg";
                    window.localStorage.setItem("videoid", id);

                    window.localStorage.setItem("videoname", videoname);
                    window.localStorage.setItem("videourl", videourl);
                    window.localStorage.setItem("imageurl", imgurl);

                    playvideo();

                });
            }, function(error) {
                alert(error.code);
            });

        });
    }, function(error) {
        alert("can't even get the file system: " + error.code);
    });

}

function testImage(tester, URL, pos) {
    tester.onload = imageFound;
    tester.onerror = imageNotFound;
    tester.src = URL;
}

function imageFound() {
    console.log('That image is found and loaded');
}

function imageNotFound() {
    console.log('That image was not found.');
}

//This function is used to play video. This function will initialize JWPlayer with its different speed.

function playvideo() {

    document.getElementById("myElement").innerHTML = "Loading video player.";

    var url = window.localStorage.getItem("videourl");
    var videoname = window.localStorage.getItem("videoname");
    var logo = $(".logo").height();
    var videoHeight = window.innerHeight - logo;
    var imgurl = window.localStorage.getItem("imageurl");
    console.log("Thumbnail :" + imgurl);
    console.log("Video: " + url);
    imgurl = imgurl.replace(/\s+/g, '');
    if (window.innerHeight > window.innerWidth) {
        var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
        if (deviceType == "iPad") {
            videoHeight = videoHeight / 2;
        }
    }

    jwplayer("myElement").setup({
        file: url,
        image: imgurl,
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

//This function used to get status of file that is exists or not.
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