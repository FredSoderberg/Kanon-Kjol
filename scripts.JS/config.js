var config = {
  links : {
		"finish_to_start":"0",
		"start_to_start":"1",
		"finish_to_finish":"2",
		"start_to_finish":"3"
	},
	types : {
		'task':'task',
		'project':'project',
		'milestone':'milestone'
	},

  autofit: false, // grid column automatic fit grid_width config
	columns: [
    {name:"text", label:"groupType", width:100},
    {name:"worker", label:"name", width:100},
    {name:"id", label:"id", width:30}
  ],
  resources: [],
  headerHeight: 60,
  taskWidth: 500,
  rowHeight: 30,

  dateHeight: 20,
  dateHeaderWidth: 40
};
