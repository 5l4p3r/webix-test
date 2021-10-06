import {JetView} from "webix-jet";
import {fdata} from "models/articles"
import Swal from "sweetalert2";

export default class DataView extends JetView{
	config(){
		return { view:"datatable",
		css:"datatable",
		columns:[
			{id:"title", header:[{text:"Title"},{content:"textFilter"}], sort:"string", width:200, editor:"text"},
			{id:"content",header:[{text:"Content"},{content:"textFilter"}],fillspace:true},
			{
				// header:[{text: "Action"}],
				// template:"{common.editIcon}",
				// width:60,
				// onclick: function(){
				// 	Swal.fire('Test')
				// }
				id:"id",
				value:"id",
				template:"<button class='editbtn' type='button'><span class='webix_icon wxi-pencil'></span></button> <button class='delbtn' type='button'><span class='webix_icon wxi-trash'></span></button>", width:100,
			}
		],
		onClick:{
			"delbtn": function(event, cell, target){
				Swal.fire({
					title: `Are you sure? ${cell.row}`,
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!'
				  }).then((result) => {
					if (result.isConfirmed) {
						webix.ajax().del(`https://sanctumtyo.herokuapp.com/api/article/${cell.row}`).then(()=>{
							Swal.fire(
								`${cell.row} Deleted!`,
								'Your file has been deleted.',
								'success'
							).then(()=>window.location.reload())
						})
					}
				  })
			},
			"editbtn": function(event, cell, target){
				Swal.fire("TES "+cell.row)
			}
		},
		scroll:false,
		type:{
			trashIcon:"<span class='webix_icon wxi-trash'></span>",
			editIcon:"<span class='webix_icon wxi-pencil'></span>"
		},
		css:"webix_shadow_medium"

		};
	}
	
	init(view){
		view.parse(fdata);
	}

}