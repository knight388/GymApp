
function BackgroundJS() {
}

BackgroundJS.prototype.PluginName = "BackgroundJS";

BackgroundJS.prototype.pInvoke = function(method, data, callbackOK, callbackError){
  if(data == null || data === undefined){ // `false` and `0` are valid values!
    data = [];
  }
  else if(!Array.isArray(data)){
    data = [data];
  }
    
    //alert("data =="+data);
    
    
  cordova.exec(callbackOK, callbackError, this.PluginName, method, data);
    
    /*function callbackOK(result){
        //alert(result);
        jQuery.fancybox.open("#alert");
        $("#kk-rock3").click(function(){
                             jQuery.fancybox.close();
                             window.localStorage.setItem("p_counting", "");
                             window.localStorage.setItem("p_counter", "");
                             window.localStorage.setItem("p_id", "");
                             location.reload();
                             });
    }*/

};

function totalHeaderCounter(counting, counter)
{
    console.log("Total Header Counter");
    console.log("Counting: " + counting);
    console.log("Counter: " + counter);
    window.localStorage.setItem("t_counting", counting);
    window.localStorage.setItem("t_counter", counter);
    var totalpercentage=document.getElementById('totalpercentage');
    var percentage=(counting/counter)*100;
    percentage=Math.round(percentage);
    totalpercentage.innerHTML=percentage + "%";
    if(counting == counter)
    {
        window.localStorage.removeItem("t_counting");
        window.localStorage.removeItem("t_counter");
    }
}

function NoNetworkFunction()
{
    jQuery.fancybox.open("#internet");
    $("#kk-rock5").click(function(){
        jQuery.fancybox.close();

        window.localStorage.removeItem("category_pref");
        window.localStorage.removeItem("subcategory_pref");
        window.localStorage.removeItem("level3_pref");
        window.localStorage.removeItem("header_download_pref");
                         
        location.reload();
    });
}
function NoDiskSpaceFunction()
{
    jQuery.fancybox.open("#diskspace");
    $("#kk-rock6").click(function(){
        jQuery.fancybox.close();

        window.localStorage.removeItem("category_pref");
        window.localStorage.removeItem("subcategory_pref");
        window.localStorage.removeItem("level3_pref");
        window.localStorage.removeItem("header_download_pref");
                         
        location.reload();
    });
}

var valmm = 1;
function callSomeFunction(counting, counter, pid){
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
        var progressbar=document.getElementById(pid);
        var percentage=(counting/counter)*100;
        percentage=Math.round(percentage);
        progressbar.innerHTML=percentage + "%";
    }
    if(counting == counter)
    {
        console.log("counting == counter");
        window.localStorage.removeItem("p_counting");
        window.localStorage.removeItem("p_counter");
        window.localStorage.removeItem("p_id");
        if($('#alert').length){
        jQuery.fancybox.open("#alert");
        $("#kk-rock3").click(function(){
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


BackgroundJS.prototype.setBackgroundSeconds = function(seconds, callbackOK, callbackError){
  this.pInvoke("setBackgroundSeconds", seconds, callbackOK, callbackError);
};

BackgroundJS.prototype.lockBackgroundTime = function(data,callbackOK, callbackError){
    
   // var values='{"videolist":[{"category":"a","type":"type_a"},{"category":"b","type":"type_b"}]}';
    this.pInvoke("lockBackgroundTime", data, callbackOK, callbackError);
    
    function callbackOK(result){
        //alert("result 2"+result);
    }

};


BackgroundJS.prototype.lockFlipbookimaege = function(data,callbackOK, callbackError){
    
    
 //   var values='{"videolist":[{"category":"a","type":"type_a"},{"category":"b","type":"type_b"}]}';
    this.pInvoke("lockFlipbookimaege", data, callbackOK, callbackError);
    
};  

BackgroundJS.prototype.lockThumbnaileBackgroundTime = function(data,callbackOK, callbackError){
    
    
    // var values='{"videolist":[{"category":"a","type":"type_a"},{"category":"b","type":"type_b"}]}';
    this.pInvoke("lockThumbnailBackgroundTime", data, callbackOK, callbackError);
    
};


BackgroundJS.prototype.unlockBackgroundTime = function(callbackOK, callbackError){
  this.pInvoke("unlockBackgroundTime", null, callbackOK, callbackError);
};

BackgroundJS.install = function () {
    if (!window.plugins) {
        window.plugins = {};
    }
    
    window.plugins.backgroundjs = new BackgroundJS();
    return window.plugins.backgroundjs;
    
};

cordova.addConstructor(BackgroundJS.install);

