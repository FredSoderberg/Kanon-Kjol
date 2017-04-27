  $(function() {

    $("#tabs").click(function(event) {
      tabbarna();
    });

    $("#menuIcon").on("click", function() {
      $("#menuIcon").toggleClass("change");
      $("#mySidebar").toggleClass("hidden", 750);
      $("#tabs").toggleClass("widthSmall", 750);
    });

    $("#resources").on("click", function() {
      $("#resourceSidebar").toggleClass("hidden", 750);
      $("#menuIcon").on("click", function() {
        $("#menuIcon").toggleClass("change");
        $("#menuIcon").toggleClass("change");
        $("#resourceSidebar").toggleClass("hidden", 750);
      });
      $("#back").on("click", function() {
        $("#resourceSidebar").toggleClass("hidden", 750);
        $("#menuIcon").on("click", function() {
          $("#menuIcon").toggleClass("change");
          $("#menuIcon").toggleClass("change");
          $("#resourceSidebar").toggleClass("hidden", 0);
        });
      });
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

  });


  $(function tabbarna() {
    $("#tabs").tabs();
  });
