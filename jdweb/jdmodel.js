/**
 * Created by dio on 2015/10/14.
 */
$(document).ready(function() {
    //��XML�ļ��м�����ർ����������
    $.ajax({
        url: 'menu.xml',
        dataType: 'xml',
        type: 'GET',
        async: false,
        error: function (err) {
            alert('Error Happend' + err.message);
        },
        success: function (xml) {
            $(xml).find("Menu").each(function(){
                var menutext = $(this).attr("Text");
                $(".ul").append("<li class='menu_li'>"+menutext+"</li>");
            });
        }

    });
    $("li.menu_li").on("mouseover",function(){
        $(this).addClass("mouseover");
        $(".rborder").removeClass("display");
        var menutext = $(this).text();                                      //��¼��ѡtext
        $.ajax({
            url: 'menu.xml',
            dataType: 'xml',
            type: 'GET',
            async: false,
            error: function (err) {
                alert('Error Happend' + err.message);
            },
            success: function (xml) {
                $(xml).find("Menu").each(function(){
                    var seletetext = $(this).attr("Text");                  //��¼xml��text
                    if(menutext==seletetext){                               //�Ƚ��Ƿ�ƥ��
                        $(this).children("subMenu").each(function(){
                           var text = $(this).attr("Text");                 //ȡsubmenu��text
                            var dlitem = "<dl><dt class='clear'>"+text+"</dt>";
                            $(this).children("Child").each(function(){

                                dlitem+="<dd>"+$(this).attr("Text")+"</dd>";

                            });
                            dlitem+="</dl>"
                            $(".rul").append(dlitem);
                        });

                    }
                });
            }

        });

    })
    $("li.menu_li").on("mouseout",function(){
        $(this).removeClass("mouseover");
        $(".rul").empty();
        $(".rborder").addClass("display");
    })
});