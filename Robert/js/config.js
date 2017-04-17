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
    {name:"text", label:"Type", width:50},
    {name:"worker", label:"Name", width:100},
    {name:"id", label:"id", width:30},
  ],
  resources: [
    {name:"Fredrik", type:"Tjuren", id:1},
    {type:"Bäst", name:"Robert", id:2},
    {type:"Häst", name:"Erika", id:3},
    {type:"Test", name:"Fluffy", id:4}
  ],
  headerHeight: 40,
  taskHeaderWidth: 20
};
