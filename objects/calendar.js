function Calendar() {
  this.userID;
  this.categories = [];
  this.tasks      = [];

  this.ifSidebarOpen = false;
  this.project;
//TODO: Look over namings for these html.elements
// 1. div naming to represent the div elements
// 2. camelCase naming or underline convention: divTaskViewLinks or div_task_view_links


//All the assigned base div containers for calendar based on dhtmlxGantt structure
//Naming represents a tree structure
  this.divBase;
  this.divContainer;
  this.divResourceView;
  this.divTaskView;
  this.divTaskStorage
  this.divScrollVer;
  this.divScrollHor;

  this.divResourceViewHeader;
  this.divResourceViewData;

  this.divTaskViewHeader;
  this.divTaskViewData;

  this.divTaskViewRows;
  this.divTaskViewLinks;
  this.divTaskViewBars;


  this.config = {
    header_height : 100
  };
  this.attacking = function(){return true;};
};


// TODO: Check naming for structure and understanding
// 1. is the structure good for the function
// 2. attribute namings are good and specific
// 3. function names are understandable and direct

// TODO: Restructure the function
// * What can be out modeled
// * Order of things - All html code in separate functions or loaded from template

// TODO: Function explenation will help with understanding the structure
// _init_html_area initiate the html code for the calendar,
// it is specific for this actual structure

Calendar.prototype._init_html_area = function(node){
	if (typeof node == "string")
		this.divBase = document.getElementById(node);
	else
		this.divBase = node;

  this.divBase.innerHTML = "<div class='calendar_container' style='height:400px'>"+
                              "<div class='resource_view'></div>"+
                              "<div class='task_view' style='width:100%'></div>"+
                              "<div id='task_storage' class='grid slide-down'></div>"+
                              "<div class='gantt_ver_scroll'>"+
                                "<div></div>"+
                              "</div>"+
                              "<div class='gantt_hor_scroll'>"+
                                "<div></div>"+
                              "</div>"+
                            "</div>";



	//store links for further reference
  this.divContainer = this.divBase.firstChild;
  var childs = this.divContainer.childNodes;

	this.divResourceView = childs[0];
	this.divTaskView     = childs[1];
  this.divTaskStorage  = childs[2];
  this.divScrollVer    = childs[3];
  this.divScrollHor    = childs[4];

  this.divResourceView.innerHTML = "<div class='resource_view_header col_container'></div>"+
                                  "<div id='sortable' class='resource_view_data row_container'></div>";

  var html = "<div id='g4' class='grid-item grid-item--width2'></div>"+
  "<div id='g1' class='grid-item grid-item--height2'></div>"+
  "<div id='g2' class='grid-item'></div>"+
  "<div id='g3' class='grid-item'></div>"+
  "<div id='task_4' class='task_bar' style='width: 76px; height: 26px'></div>";;
$("#task_storage").html(html);

  this.divResourceViewHeader = this.divResourceView.childNodes[0];
  this.divResourceViewData   = this.divResourceView.childNodes[1];

	this.divTaskView.innerHTML = "<div class='task_view_header col_container'></div>"+
                                "<div class='task_view_data'>"+
                                  "<div class='task_view_rows row_container'></div>"+
                                  "<div class='task_view_links'></div>"+
                                  "<div class='task_view_bars'></div>"+
                                "</div>";





  this.divTaskViewHeader = this.divTaskView.childNodes[0];
	this.divTaskViewData   = this.divTaskView.childNodes[1];

	this.divTaskViewRows   = this.divTaskViewData.childNodes[0];
	this.divTaskViewLinks  = this.divTaskViewData.childNodes[1];
	this.divTaskViewBars   = this.divTaskViewData.childNodes[2];
  //console.debug("Taskview", this.divResourceView);

};

// _baseBox creates a box with size as the divBase
Calendar.prototype.baseBox = function(){
  var box = {
    innerHeight : this.divBase.clientHeight,
    innerWidth : this.divBase.clientWidth
  };
  return box;
};

// _set_size calculates and defines the scrollable regions of the Calendar
Calendar.prototype._set_size = function(){

  // Autosize resizes the divBase -- dhtmlxGantt
  // this._do_autosize();

  // These are style strings = "100px" || "50%"
  var baseHeight = this.divBase.style.height;
  var baseWidth = this.divBase.style.width;

  var baseBox = this.baseBox();

  this.divContainer.style.height    = baseHeight;

  this.divResourceView.style.height = baseBox.innerHeight - 18 + "px";
  this.divTaskView.style.height     = baseBox.innerHeight  + "px";


  //baseBox.innerHeight - this.divScrollHor.offsetHeight + "px";


  //this.divResourceView.style.height -= 20+"px";

  //$("#task_storage").
  this.divResourceViewData.style.height =
  this.divTaskViewData.style.height     =
  baseBox.innerHeight - (config.headerHeight) - 18 + "px";
  //console.log(this.divResourceViewData.style.height)
  //console.debug("Resview", this.divResourceViewData.style.height);
  //för att fixa en fully flex div
  this.divResourceViewData.style.height = null;

    var rvWidth = this._get_column_width();
  this.divResourceView.style.width       = rvWidth + "px"; //(width*ratio).toString() + "px";
  //this.divTaskView.style.left            = rvWidth +8+ "px";
  this.divTaskView.style.width           = (baseBox.innerWidth - rvWidth) + "px"; //(width * (1-ratio)).toString() + "px";

  this.divTaskView.style.top             = 0+"px";
  this.divTaskView.style.left            = rvWidth + "px";
  this.divTaskStorage.style.top          = 18+"px";
  this.divTaskStorage.style.left         = rvWidth + "px";

  //console.debug("width: ", baseBox.innerWidth)

  this.divResourceViewHeader.style.height= config.headerHeight + "px";
  this.divTaskViewHeader.style.height    = config.headerHeight + "px";

  this.divTaskViewHeader.style.width     = config.taskWidth + "px";
  this.divTaskViewRows.style.width       = config.taskWidth + "px";

  //this.divTaskStorage.style.top          = baseBox.innerHeight  - 18 + "px";
  //this.divTaskStorage.style.left         = rvWidth + "px";
  $("#task_storage").width(baseBox.innerWidth - rvWidth);
  //$("#task_storage").height(200);
};
