function Calendar() {

  this.categories = [];
  this.resources  = [];
  this.tasks      = [];

/*
  this._obj;
  this.$container;
  this.$resource_view;


	this.$task_view;
  */
}




// TODO: Check all the namings and see if they make sense
Calendar.prototype._init_html_area = function(node){
	if (typeof node == "string")
		this._obj = document.getElementById(node);
	else
		this._obj = node;
	//this.assert(this._obj, "Invalid html container: "+node);

	//var gridAriaAttr = this._waiAria.gridAttrString();
	//var gridDataAriaAttr = this._waiAria.gridDataAttrString();

	var html = "<div class='calendar_container'>     \
                <div class='resources_view'></div> \
                <div class='tasks_view'></div>     \
              </div>";

  this._obj.innerHTML = html;

  //html += "<div class='gantt_ver_scroll'><div></div></div><div class='gantt_hor_scroll'><div></div></div></div>";

	//store links for further reference
  this.$container = this._obj.firstChild;
  console.debug("Container childs", this.$container)
  var childs = this.$container.childNodes;

  // Each other one of the childs is a text chile, i.e 0,2,4 ...
	this.$resource_view = childs[1];
	this.$task_view    = childs[3];
  //this.$scroll_ver = childs[2];
  //this.$scroll_hor = childs[3];

  this.$resource_view.innerHTML = "<div class='resouce_view_header'></div> \
                                  <div class='resouce_view_data'></div>";

  // Adding two childs to the resouce_view
  //this.$resouce_view_header = this.$resouce_view.childNodes[0];
  //view_rows || view_data which is better?
  //this.$resouce_view_rows   = this.$resouce_view.childNodes[1];

	this.$task_view.innerHTML = "<div class='task_view_header'></div>    \
                              <div class='task_view_data'>             \
                                  <div class='task_view_rows'></div>   \
                                  <div class='task_view_links'></div>  \
                                  <div class='task_view_bars'></div>   \
                              </div>";
/*
  this.$task_view_header = this.$task_view.childNodes[0];
	this.$task_view_data = this.$task_view.childNodes[1];

	this.$task_bg = this.$task_view_data.childNodes[0];
	this.$task_links = this.$task_view_data.childNodes[1];
	this.$task_bars = this.$task_view_data.childNodes[2];
  */
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

		this._obj.style.height = reqHeight + 'px';
	}
	if(resize.x){
		var reqWidth = this._calculate_content_width();
		if(boxSizes.borderBox){
			reqWidth += boxSizes.horPaddings;
		}
		this._obj.style.width = reqWidth + 'px';
	}
};

*/



Calendar.prototype.setsize = function(){
  var height = this._obj.style.height;
  var width = this._obj.style.width;
  width = width.replace("px", "");
  var ratio = 0.2;
  width = Number(width);
  console.debug("height: Width : ", height, width);


// Set the sizes so that the resource_view and task_view comes next to eachother
  this.$resource_view.style.height = this.$task_view.stylae.height = height;
  this.$resource_view.style.width = (width*ratio).toString() + "px";
  this.$resource_view.style.left = "0px";
  this.$resource_view.style.float = "left";
  this.$resource_view.style.border.right = "1px silver solid";
  //this.$resource_view.style.position = "absolute";

  this.$task_view.style.width = (width * (1-ratio)).toString() + "px";
  this.$task_view.style.right = "0px";
  this.$task_view.style.float = "right";
  //this.$task_view.style.border = "1px silver solid";
  //this.$task_view.style.position = "absolute";

  console.debug("Style : ", this.$resource_view.style);
};
