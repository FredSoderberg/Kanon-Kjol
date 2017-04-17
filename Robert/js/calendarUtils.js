
var TaskViewRow = function(){

};


Calendar.prototype.init = function(){
  this._init_html_area("calendar");
  this._set_size();
  this._create_resource_headers();
  this._create_resources();
  this._create_date_headers();
  this._create_empty_task_rows();

  console.debug("taskview", this.divTaskViewData);
  var childs = this.divTaskViewData.childNodes;
  console.debug("vhild", childs[0]);
  console.debug("vhild", childs.length);
  for (var i = 0; i < childs.length; i++){
    childs[i].innerHTML = this._create_empty_task_rows_cells(50);
  }
};




// TODO: Setting the scroll_sizes of the hor and ver scroll
Calendar.prototype._set_scroll_size = function(){
  /*
  */
};

// TODO: Calculate the scroll_sizes for the task and resources
Calendar.prototype._get_scroll_sizes = function(){
};


Calendar.prototype._get_column_width = function(){
  var rvWidth = 0;
  for (col in config.columns){
    rvWidth += config.columns[col].width;
  };
  return rvWidth;
};

Calendar.prototype._create_resource_headers = function(){
  var html = "";
  for (col in config.columns){
    html += "<div class='head_cell' style='width: "+config.columns[col].width+"px'>"+config.columns[col].label+"</div>";
  };
  this.divResourceViewHeader.innerHTML = html;
}

Calendar.prototype._create_resources = function(){
  var html = "";
  var odd = true;
  for (res in config.resources){
    if (odd){
      html += "<div class='resource_row_odd col_container' style= 'height: 30px'>"+this._create_resources_cells(config.resources[res])+"</div>";
      odd = false;
    }
    else {
      html += "<div class='resource_row col_container' style= 'height: 30px'>"+this._create_resources_cells(config.resources[res])+"</div>";
      odd = true;
    };
  };
  this.divResourceViewData.innerHTML = html;
}

Calendar.prototype._create_resources_cells = function(res){
  var html = "";


  for (var i = 0; i < config.columns.length; i++){
    html += "<div class='resource_cell' style='width: "+config.columns[i].width+"px'>"+res[config.columns[i].label.toString().toLowerCase()]+"</div>";
  };
  return html;
};


Calendar.prototype._create_date_headers = function(){
  var d = new Date();
  var amount = 50;
  var html = "";


  for (var i = 0; i < amount; i++){
    html += "<div class='task_head_cell' style='width: 20px'>"+d.getDate()+"</div>";
    d.setDate(d.getDate()+1);
  };
  this.divTaskViewHeader.innerHTML = html;
  config.taskHeaderWidth = 20*amount;
  this._create_empty_task_rows(amount);
};

Calendar.prototype._create_empty_task_rows = function(amount){
  var html = "";
  //console.debug("Rows", this._create_empty_task_rows_cells(amount));
  for (var i = 0; i < 4; i++){
    html += "<div class='task_row col_container' style='width: 1000px; height: 30px'></div>";
  };
  this.divTaskViewData.innerHTML = html;
};
Calendar.prototype._create_empty_task_rows_cells = function(amount){
  var html = "";
  for (var i = 0; i < amount; i++){
    html += "<div class='task_row_cell' style='width: 20px; height: 30px'></div>";
  };
  return html;
};

Calendar.prototype._get_scroll_sizes = function(){
};
