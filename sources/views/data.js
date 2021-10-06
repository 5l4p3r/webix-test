import {JetView} from "webix-jet";
import {fdata} from "models/articles"
import Swal from "sweetalert2";

export default class DataView extends JetView{
	config(){
		return (
			{
				view:"datatable",
				id: "dtable",
				css:"datatable",
				columns:[
					{id:"title", header:[{text:"Title"},{content:"textFilter"}], sort:"string", width:300, editor:"text"},
					{id:"content",header:[{text:"Content"},{content:"textFilter"}],fillspace:true},
					{
						// header:[{text: "Action"}],
						// template:"{common.editIcon}",
						// width:60,
						// onclick: function(){
						// 	Swal.fire('Test')
						// }
						header:[
							{
								text:"Action <button class='addbtn' type='button' style='height:30px;'><span class='webix_icon wxi-plus'></span> Create</button>",
							}
						],
						id:"id",
						template:"<button class='editbtn' type='button'><span class='webix_icon wxi-pencil'></span> Edit</button> <button class='delbtn' type='button'><span class='webix_icon wxi-trash'></span> Delete</button>", width:150,
					}
				],
				onClick:{
					"delbtn": function(event, cell, target){
						Swal.fire({
							title: `Are you sure?`,
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
										"Deleted!",
										'Your file has been deleted.',
										'success'
									).then(()=>window.location.reload())
								})
							}
						})
					},
					"editbtn": function(event, cell, target){
						webix.ui({
							view:"window",
							position:"center",
							id:`modaledit${cell.row}`,
							close:false,
							modal:true,
							body:{
								view:"form",
								id:"id_create",
								height:200,
								elements:[
									{
										view:"text",
										label:"Title",
										name:"title",
										id:`id_title${cell.row}`,
										value: $$("dtable").getItem(cell.row).title
									},
									{
										view:"textarea",
										label:"Content",
										name:"content",
										id:`id_content${cell.row}`,
										value: $$("dtable").getItem(cell.row).content
									},
									{
										margin:5,
										cols:[
											{
												view:"button",
												value:"Save" ,
												css:"webix_primary",
												width:500,
												click:function(){
													try {
														const fdata = {
															id: cell.row,
															title: $$(`id_title${cell.row}`).getValue(),
															content: $$(`id_content${cell.row}`).getValue()
														}
														webix.ajax().post('https://sanctumtyo.herokuapp.com/api/article/edit',fdata).then(()=>{
															Swal.fire('Data Updated !').then(()=>window.location.reload())
														})
													} catch (error) {
														console.log(error);
													}
												}
											}
										]
									}
								]
							}
						}).show();
					},
					"addbtn":function(){
						webix.ui({
							view:"window",
							position:"center",
							id:"modaladd",
							close:false,
							modal:true,
							body:{
								view:"form",
								id:"create",
								height:200,
								elements:[
									{
										view:"text",
										label:"Title",
										name:"title",
										id:"titleid"
									},
									{
										view:"textarea",
										label:"Content",
										name:"content",
										id:"contentid"
									},
									{
										margin:5,
										cols:[
											{
												view:"button",
												value:"Save" ,
												css:"webix_primary",
												width:250,
												click:function(){
													try {
														if($$("titleid").getValue() === '' || $$("contentid").getValue() === ''){
															Swal.fire('Form is empty!!')
														}else{
															const fdata = {
																userid: 1,
																title: $$("titleid").getValue(),
																content: $$("contentid").getValue()
															}
															webix.ajax().post('https://sanctumtyo.herokuapp.com/api/article',fdata).then(()=>{
																Swal.fire('Data Created !').then(()=>window.location.reload())
															})
														}
													} catch (error) {
														console.log(error);
													}
												}
											},
											{
												view:"button",
												value:"Cancel",
												css:"webix_danger",
												width:250,
												click:function(){
													window.location.reload()
												}
											}
										]
									}
								]
							}
						}).show();
					}
				},
				scroll:false,
				type:{
					trashIcon:"<span class='webix_icon wxi-trash'></span>",
					editIcon:"<span class='webix_icon wxi-pencil'></span>"
				},
				css:"webix_shadow_medium"

			}
		);
	}
	
	init(view){
		view.parse(fdata);
	}

}