
var TaskViewRow = function(){

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
      html += "<div class='resource_row_odd col_container'>"+this._create_resources_cells(config.resources[res])+"</div>";
      odd = false;
    }
    else {
      html += "<div class='resource_row col_container'>"+this._create_resources_cells(config.resources[res])+"</div>";
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

Calendar.prototype._get_scroll_sizes = function(){
};
