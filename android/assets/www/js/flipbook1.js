document.addEventListener("deviceready", onDeviceReady, false);
//function fnload() {
 function onDeviceReady() {
   
                                     
                                     
                                     $(".fa.fa-angle-left").click(function(){
                                                                  $('#show').hide();
                                                                  })
                                     
                                     $("span.search .fa-search, .search-close").click(function(){
                                                                                      $(".search-list").fadeToggle();
                                                                                      $(".search-list input").focus();
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


function removeVariableFromURL(url_string, variable_name) {
                                         var URL = String(url_string);
                                         var regex = new RegExp( "\\?" + variable_name + "=[^&]*&?", "gi");
                                         URL = URL.replace(regex,'?');
                                         regex = new RegExp( "\\&" + variable_name + "=[^&]*&?", "gi");
                                         URL = URL.replace(regex,'&');
                                         URL = URL.replace(/(\?|&)$/,'');
                                         regex = null;
                                         return URL;
                                     }
                                     
function flip_Goto_slider()

{
    //alert("flip_Goto_slider fun");
var mainDIV=document.getElementById('flipdiv');
var mainul=document.getElementById('flipul');
var mainli;
var length_flip=window.localStorage.getItem("fliplength");
//alert("images :> "+length_flip);
var length_f=Math.floor((length_flip/2)+1);

//alert(length_f);

for(var i=0;i<length_f;i++){
    
   mainli=document.createElement('li');
    mainli.setAttribute('class','flipli');
    mainli.setAttribute('page',i);
    
    
    var mainli_span=document.createElement('span');
   mainli_span.innerHTML="Page "+i;
    mainli.appendChild(mainli_span);
    
    mainul.appendChild(mainli);
   
}
 mainDIV.appendChild(mainul);
jQuery(".flipli").click(function()
                        {
                        //alert("clickkckc");
                        var goto_page= $(this).attr('page');
                        
                                      var url=   removeVariableFromURL(location.href,"page")
                        location.href =url+ "?page="+goto_page;

                        
                        
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

