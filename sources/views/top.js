import {JetView, plugins} from "webix-jet";



export default class TopView extends JetView{
	config(){
		var header = {
			type:"header", template:this.app.config.name, css:"webix_header app_header"
		};

		var sidemenu = {
			view:"sidemenu",
			id: "sidemenu",
			width: 200,
			position: "left",
			body:{
				view:"list",
				borderless:true,
				scroll: false,
				template: "<span class='webix_icon fa-#icon#'></span> #value#",
				data:[
					{id: 1, value: "Customers", icon: "user"},
					{id: 2, value: "Products", icon: "cube"},
					{id: 3, value: "Reports", icon: "line-chart"},
					{id: 4, value: "Archives", icon: "database"},
					{id: 5, value: "Settings", icon: "cog"}
				]
			}
		}

		var menu = {
			view:"menu",
			id:"top:menu", 
			css:"app_menu",
			layout:"y",
			width: 150,
			select:true,
			template:"<span class='webix_icon #icon#'></span> #value# ",
			data:[
				{ value:"Dashboard", id:"data", icon:"wxi-columns" },
				{ value:"Profile", id:"profile",  icon:"wxi-user" }
			]
		};

		var ui = {
			type:"clean", paddingX:5, css:"app_layout", cols:[
				{  paddingX:5, paddingY:10, rows: [ {css:"webix_shadow_medium", rows:[header, menu]} ]},
				{ type:"wide", paddingY:10, paddingX:5, rows:[
					{ $subview:true } 
				]}
			]
		};

		return ui;
	}
	init(){
		this.use(plugins.Menu, "top:menu");
		// this.use(plugins.sidemenu,"top:menu")
	}
}