import Swal from "sweetalert2";
import {JetView, plugins} from "webix-jet";

export default class CreateView extends JetView{
    config(){
        return{
            view:"form",
            id:"id_create",
            height:300,
            elements:[
                {
                    view:"text",
                    label:"Title",
                    name:"title",
                    id:"id_title"
                },
                {
                    view:"textarea",
                    label:"Content",
                    name:"content",
                    id:"id_content"
                },
                { margin:5,
                    cols:[
                    {},
                    { 
                        view:"button",
                        value:"Save" ,
                        css:"webix_primary",
                        width:200,
                        click:function(){
                            const fdata = {
                                userid:1,
                                title: $$("id_title").getValue(),
                                content: $$("id_content").getValue()
                            }
                            if($$("id_title").getValue() === '' || $$("id_content").getValue() === ''){
                                Swal.fire('Form is Empty')
                            }else{
                                webix.ajax().post('https://sanctumtyo.herokuapp.com/api/article',fdata).then(()=>{
                                    Swal.fire('Saved').then(()=>{
                                        window.location.href="/#!/top/data"
                                        window.location.reload()
                                    })
                                })
                            }
                        }
                    },
                    {
                        view:"button",
                        value:"Cancel",
                        css:"webix_danger",
                        width:200
                    }
                ]},
            ]
        }
    }
}