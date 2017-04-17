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


    /*
		{name:"text", tree:true, width:'*', resize:true },
		{name:"start_date", align: "center", resize:true },
		{name:"duration", align: "center" },
		{name:"add", width:'44' }
	],
*/
	/*scale*/
  /*
	step: 1,
	scale_unit: "day",
	scale_offset_minimal:true,
	subscales : [

	],

	inherit_scale_class:false,

    time_step: 60,
    duration_step: 1,
	date_scale: "%d %M",
    task_date: "%d %F %Y",
    time_picker: "%H:%i",
    task_attribute: "task_id",
    link_attribute: "link_id",
    layer_attribute: "data-layer",
    buttons_left: [
        "gantt_save_btn",
        "gantt_cancel_btn"
    ],
	_migrate_buttons: {
		"dhx_save_btn":"gantt_save_btn",
		"dhx_cancel_btn":"gantt_cancel_btn",
		"dhx_delete_btn":"gantt_delete_btn"
	},
    buttons_right: [
        "gantt_delete_btn"
    ],
    lightbox: {
        sections: [
            {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
            {name: "time", type: "duration", map_to: "auto"}
		],
		project_sections: [
			{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
			{name: "type", type: "typeselect", map_to: "type"},
			{name: "time", type: "duration", readonly:true, map_to: "auto"}
		],
		milestone_sections: [
			{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
			{name: "type", type: "typeselect", map_to: "type"},
			{name: "time", type: "duration", single_date:true, map_to: "auto"}
		]
    },
    drag_lightbox: true,
    sort: false,
    details_on_create: true,
	details_on_dblclick:true,
	initial_scroll : true,
	task_scroll_offset : 100,

	order_branch: false,
	order_branch_free: false,

	task_height: "full",//number px of 'full' for row height
	min_column_width:70,

	// min width for grid column (when resizing)
	min_grid_column_width:70,
	// name of the attribute with column index for resize element
	grid_resizer_column_attribute: "column_index",
	// name of the attribute with column index for resize element
	grid_resizer_attribute: "grid_resizer",

	// grid width can be increased after the column has been resized
	keep_grid_width:false,

	// grid width can be adjusted
	grid_resize:false,

	show_unscheduled: true,

	//
	readonly_property: "readonly",
	editable_property: "editable",
	type_renderers:{},

	open_tree_initially: false,
	optimize_render: true,
	prevent_default_scroll: false,
	show_errors: true,
	wai_aria_attributes: true,
  */
};
