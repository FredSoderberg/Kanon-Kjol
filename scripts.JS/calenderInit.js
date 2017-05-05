$(document).ready(function(){

    $("#availableResources").sortable({
         connectWith: "#sortable",
         dropOnEmpty: true,
         stop: function(event,ui) {
           var dropped = ui.item;
           $(dropped).css("width","auto");

           if ($(ui.item).hasClass("draggableClone")) {
             console.log("i aval!");
             initiateNewResource(dropped,"availableResources","U");
           } else {
            updateResourceRows("availableResources","U");
           }


         }
    });



    $( "#sortable" ).sortable({
        connectWith: "#availableResources",
        dropOnEmpty: true,
        stop: function(event, ui) {
          var dropped = ui.item;
          $(dropped).css("width","auto");

          if ($(ui.item).hasClass("draggableClone")) {
            initiateNewResource(dropped,"sortable","A");
          }
          else if ($("#row_"+droppedID).length === 0) {
            updateResourceRows("sortable","A");
          }


        }
    });

            $("#addResource").draggable({
           connectToSortable: "#sortable, #availableResources",
           helper: "clone",
           start: function (event) {
              var dragClone = $("#newResourceList").find("div:last")
              $(dragClone).removeClass();
              $(dragClone).empty();
              $(dragClone).addClass("draggableClone resource_row col_container ui-sortable-handle");
              $(dragClone).append(cal._create_resource());
              dragClone.attr("id",cal.project.nextResourceID);
              $(dragClone).css("width","auto");
            },
             revert: "invalid"
           });
    // $( "#sortable" ).sortable({
    //       connectWith: "#availableResources"
    //     });




        //  $("#availableResources").sortable({
        //     connectWith: ".connectedSortable",
        //     forcePlaceholderSize: false
        //   });






    $("#tabs").tabs({
          activate: function(event, ui){

          }
      });

   $("#menuIcon").on("click", function() {
      $("#menuIcon").toggleClass("change");

      if ($("#mySidebar").hasClass("hidden")) {
        $("#calendar").toggleClass("widthSmall", 750);
        showSideBar()
      } else {
        if (!$("#resourceSidebar").hasClass("hidden")) {
            hideResourceBar();
        }
        $("#calendar").toggleClass("widthSmall", 750);
        hideSideBar();
      }
      cal.change_width();
    });

    $("#resourcesButton").on("click", function() {
      showResourceBar();
    });

    $("#back").on("click", function() {
      hideResourceBar();
    });


  /*   $( "#sortable" ).sortable({
      revert: true
    });*/
  //  $("#availableResources").sortable({
  //     connectWith: ".connectedSortable",
  //     forcePlaceholderSize: false
  //   });

  //

  //
    // $(".draggableClone").on("dragstart", function(event, ui){
    //   $(".draggableClone").draggable({
    //     //connectToSortable: "#tabs",
    //     helper: function (event) {
    //
    //     },
    //     revert: "invalid"
    //   })
    // })
  //
  //     $(".draggableClone").on("click", function(){
  //     });
  //   });
  //
  //
  // /*  $(".connectedSortable").sortable({
  //     receive: function(e, ui) {
  //       copyHelper = null;
  //     }
  //   }); */
  //
  //   $("#draggable").draggable({
  //     connectToSortable: "#sortable",
  //     helper: "clone",
  //     revert: "unvalid"
  //   });

    $("ul, li").disableSelection();

//-------- TABS!!!!!!!! ------------------------//

    var tabTitle = $("#tab_title")
    var tabContent = $("#tab_content")
    var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>"
    var tabCounter = 2;
    var tabs = $("#tabs");

    // Modal dialog init: custom buttons and a "close" callback resetting the form inside
    var dialog = $("#dialog").dialog({
      autoOpen: false,
      modal: true,
      buttons: {
        Add: function() {
          addTab(false);
          $(this).dialog("close");
        },
        Cancel: function() {
          $(this).dialog("close");
        }
      },
      close: function() {
        form[0].reset();
      }
    });

    // AddTab form: calls addTab function on submit and closes the dialog
    var form = dialog.find("form").on("submit", function(event) {
      addTab();
      dialog.dialog("close");
      event.preventDefault();
    });

      // Actual addTab function: adds new tab using the input from the form above
      function addTab(fromDB,projectToAdd) {
        if (!fromDB) {


        var label = tabTitle.val() || "Tab " + tabCounter,
          id = "tabs-" + tabCounter,
          li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label)),
          tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";

        tabs.find(".ui-tabs-nav").append(li);
        tabs.append("<div id='" + id + "'><p>" + tabContentHtml + "</p></div>");
        tabs.tabs("refresh");
        tabCounter++;
        }
        else {

        }
      }

      // AddTab button: just opens the dialog
      $("#add_tab")
        .button()
        .on("click", function() {

          dialog.dialog("open");
        });

      // Close icon: removing the tab on click
      tabs.on("click", "span.ui-icon-close", function() {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
      });

      tabs.on("keyup", function(event) {
        if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
          var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
          $("#" + panelId).remove();
          tabs.tabs("refresh");
        }
      });

    });
