var online=false;
document.addEventListener("offline", onOffline, false);

function onOffline() {
    console.log("Downloaded array clear array");
    window.localStorage.removeItem("category_pref");
    window.localStorage.removeItem("header_download_pref");
    $("#animatedDownload").hide();
    online=false;
}


document.addEventListener("online", onOnline, false);

function onOnline() {
    
    online=true;
}




var category_array_clear;

var test21 = window.localStorage.getItem("header_download_pref");
var title_header_download_array = JSON.parse(test21); //var test is now re-loaded!


setTimeout(function() {
           
           if(category_array_clear == true)
           {
           console.log("Downloaded array clear array");
           window.localStorage.removeItem("category_pref");
           window.localStorage.removeItem("subcategory_pref");
           window.localStorage.removeItem("level3_pref");
           window.localStorage.removeItem("header_download_pref");
           $("#animatedDownload").hide();
           
           }
           
           
           },5000);

document.addEventListener("deviceready", onDeviceReady, false);
//function fnload() {
function onDeviceReady() {
    
    $("#animatedDownload").hide();
    
    
    $(".fa.fa-angle-left").click(function(){
                                 $('#show').hide();
                                 })
    
       
    $("span.search .language-icon").click(function(){
                                          $(".language").slideToggle();
                                          /* var text1 = $(this).text();
                                           alert(text1);*/
                                          })
    
    $(".language > ul > li").click(function(){
                                   $(".language").slideToggle();
                                   var lan = $(this).attr('id');
                                   window.localStorage.setItem("language", lan );
                                   
                                   if(lan=="eng")
                                   {
                                   $("#imageID").attr('src', '../images/en.gif');
                                   }
                                   else
                                   {
                                   $("#imageID").attr('src', '../images/nl_nl.gif');
                                   }
                                   })
    
    $("#dwn-video-list").click(function(){
                               window.location.href ="../donwnload_video_list/videolist.html";
                               })
    $("#back").click(function(){
                     window.location.href ="../video/videolist.html";
                     
                     });
    
    
    $(".fa.fa-th-list").click(function(){
                              
                              window.location.href ="../video/videolist.html";
                              });
    $(".fa-list-alt").click(function(){
                            window.location.href ="../donwnload_video_list/videolist.html";
                            })
    
    $("#home").click(function(){
                     window.location.href ="../index/index.html";
                     
                     });
    
    
    window.localStorage.setItem("page", "6" );
    var language=window.localStorage.getItem("language");
    
    var imageID=document.getElementById("imageID");
    imageID.style.display="block";
    if(language=="eng")
    {
        
        $("#imageID").attr('src', '../images/en.gif');
        
    }else
    {
        $("#imageID").attr('src', '../images/nl_nl.gif');
        
    }
    
    
    
    
    var s = $('#myFilter').val();
    var iscall=true;
    $(document).on('keyup', '#myFilter', function() {
                   
                   
                   if($('#myFilter').val()=="")
                   {
                   
                   $('#show').hide();
                   }else
                   $('#show').show();
                   if(iscall==true)
                   {
                   
                   fn_serch_listing(get_language());
                   iscall=false;
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
function check_header_downloadStutus()
{
    // alert("check_header_downloadStutus");
    
    var test21 = window.localStorage.getItem("header_download_pref");
    var test11 = JSON.parse(test21); //var test is now re-loaded!
    
    console.log("check_header_downloadStutus length"+test11.length);
    
    if(test11.length>0)
    {
        // alert("tes11 array "+test11.length);
        $("#animatedDownload").show();
        category_array_clear=true;
    }
    
    
    //  alert("check_header_downloadStutus "+test11.length);
    for(var i=0; i< test11.length;i++)
    {
        var name=test11[i]["filename"];
        console.log("check_header_downloadStutus is di "+name);
        header_file_exist(name);
        
    }
    
}


function header_file_exist(filename){
    
    
    var fileexist="GymWijzer/Video/"+filename+".mp4";
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
    function onRequestFileSystemSuccess(fileSystem) {
        var entry=fileSystem.root;
        entry.getFile(fileexist, {create: false, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail);
        
    }
    
    function onGetDirectorySuccess(dir) {
        console.log("check_header_downloadStutus running downlaoded video  Get file");
        
        
    }
    
    function onGetDirectoryFail(error) {
        
        console.log(" check_header_downloadStutus ERROR  Fail to get file");
        category_array_clear=false;
        $("#animatedDownload").show();
        
    }
    
}

