import {JetView} from "webix-jet";
import {fdata} from "models/articles"
import Swal from "sweetalert2";

export default class DataView extends JetView{
	config(){
		return (
			{
				rows:[
					{
						view:"toolbar",
						cols:[
							{
								view:"icon",
								icon:"wxi-user"
							},
							{
								view:"label",
								label:"Data Table",
								width:120
							},
							{
								view:"button",
								value:"Create",
								align:"left",
								width:100,
								click:function(){
									if(!$$("popadd")){
										webix.ui({
											view:"window",
											id:"popadd",
											position:"center",
											close:true,
											modal:true,
											body:{
												view:"form",
												height:200,
												elements:[
													{
														view:"text",
														label:"Title",
														id:"id_title",
														name:"title",
													},
													{
														view:"textarea",
														label:"Content",
														name:"content",
														id:"id_content"
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
																	const fdata = {
																		userid: 1,
																		title: $$("id_title").getValue(),
																		content: $$("id_content").getValue()
																	}
																	try {
																		if($$("id_title").getValue() === "" || $$("id_content").getValue() === ""){
																			Swal.fire("Fire is empty !")
																		}else{
																			webix.ajax().post('https://sanctumtyo.herokuapp.com/api/article',fdata).then(()=>{
																				Swal.fire('Data Created !').then(()=>window.location.reload())
																			})
																		}
																	} catch (error) {
																		console.log(error);
																	}
																}
															}
														]
													}
												]
											}
										})
									}
									$$("popadd").show()
								}
							},
							{}
						]
					},
					{
						view:"datatable",
						id: "dtable",
						css:"datatable",
						columns:[
							{id:"title", header:[{text:"Title"},{content:"textFilter"}], sort:"string", width:300, editor:"text"},
							{id:"content",header:[{text:"Content"},{content:"textFilter"}],fillspace:true},
							{
								header:[
									{
										text:"Action",
									}
								],
								template:"<button class='editbtn' type='button'><span class='webix_icon wxi-pencil'></span> Edit</button> <button class='delbtn' type='button'><span class='webix_icon wxi-trash'></span> Delete</button>", 
								width:170,
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
								if(!$$(`edt${cell}`))
								{
									webix.ui({
										view:"window",
										id:`edt${cell}`,
										position:"center",
										close:true,
										modal:true,
										body:{
											view:"form",
											height:200,
											elements:[
												{
													view:"text",
													label:"Title",
													name:"title",
													id:`title${cell.row}`,
													value: $$("dtable").getItem(cell.row).title
												},
												{
													view:"textarea",
													label:"Content",
													name:"content",
													id:`content${cell.row}`,
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
																		title: $$(`title${cell.row}`).getValue(),
																		content: $$(`content${cell.row}`).getValue()
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
									})
								}
								$$(`edt${cell}`).show()
							}
						},
						scroll:false,
						type:{
							trashIcon:"<span class='webix_icon wxi-trash'></span>",
							editIcon:"<span class='webix_icon wxi-pencil'></span>"
						},
						css:"webix_shadow_medium"
					}
				]
			}
		);
	}
	
	init(){
		// view.parse(fdata);
		$$("dtable").parse(fdata)
	}

}