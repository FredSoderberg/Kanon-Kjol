function Calendar() {

  this.categories = [];
  this.resources  = [];
  this.tasks      = [];


//TODO: Look over namings for these html.elements
// 1. div naming to represent the div elements
// 2. camelCase naming or underline convention: divTaskViewLinks or div_task_view_links


//All the assigned base div containers for calendar based on dhtmlxGantt structure
//Naming represents a tree structure
  this.divBase;
  this.divContainer;
  this.divResourceView;
  this.divTaskView;
  this.divScrollVer;
  this.divScrollHor;

  this.divResourceViewHeader;
  this.divResourceViewData;

  this.divTaskViewHeader;
  this.divTaskViewData;

  this.divTaskViewRows;
  this.divTaskViewLinks;
  //This is the tasks in view that are workable
  this.divTaskViewBars;



  this.config = {
    header_height : 100
  };
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


// TODO:_waiAria seems to be a attribute functionality for table creation
// might be what dhtmlxGantt uses to align things
	//var gridAriaAttr = this._waiAria.gridAttrString();
	//var gridDataAriaAttr = this._waiAria.gridDataAttrString();

  this.divBase.innerHTML = "<div class='calendar_container'>"+
                              "<div class='resources_view'></div>"+
                              "<div class='tasks_view'></div>"+
                              "<div class='gantt_ver_scroll'>"+
                                "<div></div>"+
                              "</div>"+
                              "<div class='gantt_hor_scroll'>"+
                                "<div></div>"+
                              "</div>"+
                            "</div>";



	//store links for further reference
  this.divContainer = this.divBase.firstChild;


  //console.debug("Container childs", this.$container)
  var childs = this.divContainer.childNodes;

  // Text inside a div creates a text child, we don't want that
	this.divResourceView = childs[0];
	this.divTaskView     = childs[1];
  this.divScrollVer    = childs[2];
  this.divScrollHor    = childs[3];

  this.divResourceView.innerHTML = "<div class='resouce_view_header'></div>"+
                                  "<div class='resouce_view_data'></div>";


  this.divResourceViewHeader = this.divResourceView.childNodes[0];
  this.divResourceViewData   = this.divResourceView.childNodes[1];

	this.divTaskView.innerHTML = "<div class='task_view_header'></div>"+
                                "<div class='task_view_data'>"+
                                  "<div class='task_view_rows'></div>"+
                                  "<div class='task_view_links'></div>"+
                                  "<div class='task_view_bars'></div>"+
                                "</div>";

  this.divTaskViewHeader = this.divTaskView.childNodes[0];
	this.divTaskViewData   = this.divTaskView.childNodes[1];

	this.divTaskViewRows   = this.divTaskViewData.childNodes[0];
	this.divTaskViewLinks  = this.divTaskViewData.childNodes[1];
	this.divTaskViewBars   = this.divTaskViewData.childNodes[2];
  //console.debug("divBase", this.divBase);
  //console.debug("taskview childs", this.divTaskView.childNodes);
  //console.debug("taskviewdata childs", this.divTaskViewData.childNodes);
};




/*
Calendar.prototype._do_autosize = function(){

  //Option is needed in a config file
	//var resize = this._get_resize_options();

	var boxSizes = this._get_box_styles();
	if(resize.y){
		var reqHeight = this._calculate_content_height();
		if(boxSizes.borderBox){
			reqHeight += boxSizes.vertPaddings;
		}

		this.divBase.style.height = reqHeight + 'px';
	}
	if(resize.x){
		var reqWidth = this._calculate_content_width();
		if(boxSizes.borderBox){
			reqWidth += boxSizes.horPaddings;
		}
		this.divBase.style.width = reqWidth + 'px';
	}
};

*/
/*
gantt._on_resize = gantt.setSizes = function(){
	// TODO: remove redundancy from layout sizes calculation
	// Set_sizes and scroll_resize affects each other result depending each one called first.
	// Need to call set_sizes twice to ensure sizes are calculated correctly after resize
	//gantt._set_sizes();
	//gantt._scroll_resize();
	//gantt._set_sizes();
//};
*/
/*
Calendar.prototype._baseBox = function(){
  var computed = null;
	if(window.getComputedStyle){
		computed = window.getComputedStyle(this._obj, null);
	}else{
		//IE with elem.currentStyle does not calculate sizes from %, so will use the default approach
		computed = {
			"width":this._obj.clientWidth,
			"height":this._obj.clientHeight
		};
	}
	var properties = [
		"width",
		"height",

		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",

		"borderLeftWidth",
		"borderRightWidth",
		"borderTopWidth",
		"borderBottomWidth"
	];
	var styles = {
		boxSizing:(computed.boxSizing == "border-box")
	};

	if(computed.MozBoxSizing){
		styles.boxSizing = (computed.MozBoxSizing == "border-box");
	}
	for(var i =0; i < properties.length; i++){
		styles[properties[i]] = computed[properties[i]] ? this._clean_el_size(computed[properties[i]]) : 0;
	}


	var box = {
		horPaddings : (styles.paddingLeft + styles.paddingRight + styles.borderLeftWidth + styles.borderRightWidth),
		vertPaddings : (styles.paddingTop + styles.paddingBottom + styles.borderTopWidth + styles.borderBottomWidth),
		borderBox: styles.boxSizing,
		innerWidth : styles.width,
		innerHeight : styles.height,
		outerWidth : styles.width,
		outerHeight : styles.height
	};


	if(box.borderBox){
		box.innerWidth -= box.horPaddings;
		box.innerHeight -= box.vertPaddings;
	}else{
		box.outerWidth += box.horPaddings;
		box.outerHeight += box.vertPaddings;
	}

	return box;
};
*/


// TODO: _baseBox is meant to represent the basis for buildning the containers
Calendar.prototype._baseBox = function(){
  var box = {
    innerHeight : Number(this.divBase.style.height.replace("px", "")),
    innerWidth : Number(this.divBase.style.width.replace("px", ""))
  };
  return box;
};



// TODO: Function explenation
// _set_size calculates and defines the scrollable regions of the Calendar
Calendar.prototype._set_size = function(){

  // Autosize resizes the divBase -- dhtmlxGantt
  // this._do_autosize();

  // These are style strings = "100px" || "50%"
  var baseHeight = this.divBase.style.height;
  var baseWidth = this.divBase.style.width;

  var baseBox = this._baseBox();


// TODO: dhtmlxGantt uses a box that is the same size as divBase
//      Dont know the pros or cons for this
// 	var boxSizes = this._get_box_styles();
//  this._y = boxSizes.innerHeight;


// TODO: Set the sizes so that resource_view and task_view unifies

// TODO: This height should be adjusted for the scroll height afterwards
  this.divResourceView.style.height =
  this.divTaskView.style.height     =
  baseBox.innerHeight - this.divScrollHor.offsetHeight + "px";

  this.divResourceViewData.style.height =
  this.divTaskViewData.style.height     =
  Math.max(baseBox.innerHeight - (this.config.header_height||0) - this.divScrollHor.offsetHeight - 2) + "px";

  console.debug("Height: ", this.divResourceViewData.style.height);

// TODO: divResourceView Fixed size due to headings
//       divTaskView     Adjustable to fit the rest of the width
// Ratios doesnt work so well here is what I think ..... humm
// style.float makes it align to that part of the parent container

// TODO: Calculate divResourceView width depending on the headers
// TODO: Config file that tells the size of the divResourceView.width

/*
------PSEUDO CODE
                                  why -1 at different places, borders?
 reswidth = Math.max(get_res_width()-1, 0);
 divResourceView.style.width = reswidth + "px"
 divResourceViewData         = reswidth + "px"
 divTaskView                 = (baseBox.innerWidth - reswidth - 2) + "px"
*/
  this.divResourceView.style.width = "20%"; //(width*ratio).toString() + "px";
  this.divResourceView.style.left = "0px";
  this.divResourceView.style.float = "left";
  this.divResourceView.style.border.right = "1px silver solid";
  //this.divResourceView.style.position = "absolute";

  this.divTaskView.style.width = "80%"; //(width * (1-ratio)).toString() + "px";
  this.divTaskView.style.right = "0px";
  this.divTaskView.style.float = "right";
  //this.divTaskView.style.border = "1px silver solid";
  //this.divTaskView.style.position = "absolute";


};
