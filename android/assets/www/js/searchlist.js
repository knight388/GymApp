var array;

function fn_serch_listing(data) {

    if (array == null) {

        $.ajax({
            url: "../index/navigation.txt",
            type: "get",
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
                array = data_to_array(data);
                showlist(array);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('error loading data :' + errorThrown);
            }
        });
    } else {
        showlist(array);
    }



}

function showlist(array1) {
    console.log("d call");
    $("#show li").remove();

    var mainul = document.getElementById('show');

    var array = array1;



    for (var i = 0; i < array['navigation'].length; i++) {

        console.log("----------name :> " + array['navigation'][i]['title']);
        var mainli = document.createElement('li');
        mainli.setAttribute('class', 'mainli');
        mainli.setAttribute('name', array['navigation'][i]['title']);
        mainli.setAttribute('type', "category");
        mainli.setAttribute('categorypos', i);

        mainli.innerHTML = array['navigation'][i]['title'];
        mainul.appendChild(mainli);
        var titlename = array['navigation'][i]['title'];

        for (var j = 0; j < array['navigation'][i]['subtitle'].length; j++) {

            var subtitle = array['navigation'][i]['subtitle'][j]['titlename'];


            var mainli = document.createElement('li');
            mainli.setAttribute('class', 'mainli');
            mainli.setAttribute('type', "subcategory");
            mainli.setAttribute('categorypos', i);
            mainli.setAttribute('subcategorypos', j);
            mainli.setAttribute('name', array['navigation'][i]['subtitle'][j]['titlename']);
            mainli.innerHTML = array['navigation'][i]['subtitle'][j]['titlename'];
            mainul.appendChild(mainli);



            for (var k = 0; k < array['navigation'][i]['subtitle'][j]['level3'].length; k++) {
                // alert(array['navigation'][i]['subtitle'][j]['level3'][k]['titlename']);
                var mainli = document.createElement('li');
                mainli.setAttribute('class', 'mainli');
                mainli.setAttribute('type', "level3");
                mainli.setAttribute('categorypos', i);
                mainli.setAttribute('subcategorypos', j);
                mainli.setAttribute('level3', k);
                mainli.setAttribute('name', array['navigation'][i]['subtitle'][j]['level3'][k]['titlename']);
                mainli.innerHTML = array['navigation'][i]['subtitle'][j]['level3'][k]['titlename'];
                mainul.appendChild(mainli);

                for (var l = 0; l < array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'].length; l++) {


                    for (var m = 0; m < array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'].length; m++) {
                        //    alert(array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'][m]['videoname']);
                        var mainli = document.createElement('li');
                        mainli.setAttribute('class', 'mainli');
                        mainli.setAttribute('type', "videoname");
                        mainli.setAttribute('categorypos', i);
                        mainli.setAttribute('subcategorypos', j);
                        mainli.setAttribute('level3', k);
                        mainli.setAttribute('videotypepos', l);
                        mainli.setAttribute('videopos', m);
                        mainli.setAttribute('videoname', array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'][m]['title']);
                        mainli.innerHTML = array['navigation'][i]['subtitle'][j]['level3'][k]['videourl'][l]['videolist'][m]['title'];
                        mainul.appendChild(mainli);




                    }


                }



            }


        }
    }




    jQuery(".mainli").click(function() {
        var name = $(this).attr('name');
        var type = $(this).attr('type');
        var subcategorypos = $(this).attr('subcategorypos');
        var categorypos = $(this).attr('categorypos');
        var level3pos = $(this).attr('level3');
        var videotypepos = $(this).attr('videotypepos');
        var videopos = $(this).attr('videopos');

        //  alert(type+" "+categorypos+"  "+subcategorypos+" "+"  "+level3pos +videotypepos+" "+videopos);
        $('#show').hide();

        window.localStorage.setItem("titlepos", categorypos);
        // alert( window.localStorage.getItem("titlepos"));
        if (type == "category") {
            window.location.href = "../subtitle/subtitle.html";

        } else if (type == "subcategory") {
            window.localStorage.setItem("subtitlepos", subcategorypos);
            window.location.href = "../level3/level3.html";
        } else if (type == "level3") {
            window.localStorage.setItem("level3pos", level3pos);
            window.location.href = "../media/media.html";
        } else if (type == "videoname") {
            window.localStorage.setItem("subtitlepos", subcategorypos);
            window.localStorage.setItem("from_search_list", true);
            window.localStorage.setItem("level3pos", level3pos);

            window.localStorage.setItem("videotypepos", videotypepos);
            window.localStorage.setItem("videopos", videopos);

            window.location.href = "../video/videolist.html";
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


function get_language() {
    var language = window.localStorage.getItem("language");


    if (language == "eng") {


        return "../index/navigation_english.txt";
    } else {
        return "../index/navigation.txt";
    }
}