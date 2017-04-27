clear : function(container){
			this.rendered = gantt._task_area_pulls[id] = {};
			this.clear_container(container);
		}
clear_container: function(container){
	container = container || node;
	if(container)
		container.innerHTML = "";
}
