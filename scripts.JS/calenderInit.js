  $(function() {

    $("#tabs").tabs({
          activate: function(event, ui){
        //    console.log("fuck!");
        //    moveSidebar();
          }
      });

    $("#menuIcon").on("click", function() {
      $("#menuIcon").toggleClass("change");
      if ($("#mySidebar").hasClass("hidden")) {
        $("#calendarArea").toggleClass("widthSmall", 750);
        showSideBar()
          }
      else {
        if (!$("#resourceSidebar").hasClass("hidden")) {
            hideResourceBar();
        }
        $("#calendarArea").toggleClass("widthSmall", 750);
        hideSideBar();
      }
    });



    //   moveSidebar();
    //   $("#menuIcon").toggleClass("change");
    //   $("#mySidebar").toggleClass("hidden", 750);
      //$("#calendar").toggleClass("widthSmall", 750);
      // $("#task_view").toggleClass("widthSmall", 750);
      // $("#resource_view").toggleClass("widthSmall", 750);

    $("#resourcesButton").on("click", function() {
      showResourceBar();
    });

    $("#back").on("click", function() {
      hideResourceBar();
    });
  /*   $( "#sortable" ).sortable({
      revert: true
    });*/
   $("#sortable").sortable({
      connectWith: ".connectedSortable",
      forcePlaceholderSize: false
    });

    $(".draggableClone").draggable({
      //connectToSortable: "#sortable",
      helper: "clone",
      revert: "invalid"
    });

    $(document).on("dragstart", "#draggable", function(event, ui){
      $(".draggableClone").draggable({
        //connectToSortable: "#tabs",
        helper: "clone",
        revert: "invalid"
      });

      $(".draggableClone").on("click", function(){
      alert("hej");
      });
    });

  /*  $(".connectedSortable").sortable({
      receive: function(e, ui) {
        copyHelper = null;
      }
    }); */

    $("#draggable").draggable({
      connectToSortable: "#sortable",
      helper: "clone",
      revert: "unvalid"
    });

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
