/**
 * Created by dio on 2015/10/14.
 */
$(document).ready(function() {
    //从XML文件中加载左侧导航栏的内容
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
        var menutext = $(this).text();                                      //记录所选text
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
                    var seletetext = $(this).attr("Text");                  //记录xml中text
                    if(menutext==seletetext){                               //比较是否匹配
                        $(this).children("subMenu").each(function(){
                           var text = $(this).attr("Text");                 //取submenu的text
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