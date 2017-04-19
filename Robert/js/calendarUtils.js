
var TaskViewRow = function(){

};


Calendar.prototype.init = function(){

  this.project = new Project(1, 600);
  config.taskWidth = this.project.lengthDays*config.dateHeaderWidth;

  //this.project.init_test();
  this._init_html_area("calendar");
  this._set_size();

  this._create_resource_headers();
  //this._load_resources();
  this._create_date_headers();
  //this._create_empty_task_rows();
  /*
  var childs = this.divTaskViewRows.childNodes;
  for (var i = 0; i < childs.length; i++){
    childs[i].innerHTML = this._create_empty_task_rows_cells(50);
  }
  */
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
    if (config.columns[col].label == "add"){
      html += "<div class='add_cell' style='width: "+config.columns[col].width+"px'>"+config.columns[col].label+"</div>";
    }
    else{
      html += "<div class='head_cell' style='width: "+config.columns[col].width+"px'>"+config.columns[col].label+"</div>";
    }
  };
  this.divResourceViewHeader.innerHTML = html;
}

Calendar.prototype._load_resources = function(){
  var html = "";
  var odd = true;
  for (res in this.project.resources){
    if (!odd){
      html += "<div class='resource_row_odd col_container' style= 'height: 30px'>"+this._create_resources_cells(this.project.resources[res])+"</div>";

    }
    else {
      html += "<div class='resource_row col_container' style= 'height: 30px'>"+this._create_resources_cells(this.project.resources[res])+"</div>";

    };
  };
  this.divResourceViewData.innerHTML = html;
}

Calendar.prototype._create_resource = function(){
  var resourceID = this.project.nextResourceID;
  var html = "";
  var resource = new Resource(resourceID, "", "")
  html += "<div id="+resourceID+" class='resource_row col_container' style= 'height: 30px'>"+this._create_resources_cells(resource)+"</div>";
  this.divResourceViewData.innerHTML += html;
  event_remove_resource();

  this._create_empty_task_row(resourceID);
  //$(".task_view_rows").children().last().html(this._create_empty_task_rows_cells(50));

  this.project.nextResourceID += 1;
}

function event_remove_resource(){
  $(".remove_cell").dblclick(function(){
    console.log("#row_"+$(this).parent().attr("id"));
      console.log($("#row_"+$(this).parent().attr("id")).remove());
      $(this).parent().remove();
  });
}

Calendar.prototype._create_resources_cells = function(res){
  var html = "";

  for (var i = 0; i < config.columns.length; i++){
    if (config.columns[i].label.toString().toLowerCase() == "add"){
      html += "<div class='remove_cell' style='width: "+config.columns[i].width+"px'>"+res[config.columns[i].label.toString().toLowerCase()]+"</div>";

    } else {
      html += "<div class='resource_cell' style='width: "+config.columns[i].width+"px'>"+res[config.columns[i].label.toString().toLowerCase()]+"</div>";
    }
  };
  return html;
};


Calendar.prototype._create_date_headers = function(){

  var date = this.project.startDate;
  var amount = this.project.lengthDays;
  var html = "";
  console.debug("Date:", date, "Length:", amount)
  console.debug("Length:", config.taskWidth)

  for (var i = 0; i < amount; i++){
    html += "<div class='task_head_cell' style='width: 20px'>"+date.getDate()+"</div>";
    date.setDate(date.getDate()+1);
  };
  this.divTaskViewHeader.innerHTML = html;

  //this._create_empty_task_rows(amount);
};

Calendar.prototype._create_empty_task_rows = function(amount){
  var html = "";
  //console.debug("Rows", this._create_empty_task_rows_cells(amount));
  for (var i = 0; i < 4; i++){
    html += "<div class='task_row col_container' style='width: 1000px; height: 30px'></div>";
  };
  this.divTaskViewRows.innerHTML = html;
};
Calendar.prototype._create_row_cells = function(){
  var html = "";
  for (var i = 0; i < this.project.lengthDays; i++){
    html += "<div class='task_row_cell' style='width: 20px; height: 30px'></div>";
  };
  return html;
};


Calendar.prototype._create_empty_task_row = function(resID){
  var html = "";
  //console.debug("Rows", this._create_empty_task_rows_cells(amount));
  //var width = this.project.lengthDays * config.taskWidth;
  html += "<div id='row_"+resID+"' class='task_row col_container' style='width: "+config.taskWidth+"px; height: 30px'></div>";

  this.divTaskViewRows.innerHTML += html;

  $("#row_"+resID).html(this._create_row_cells());

};
