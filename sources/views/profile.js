import { JetView } from "webix-jet";

export default class ProfileView extends JetView{
    config(){
        return {
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
                            label:"Profile",
                            inputWidth:100, 
                            align:"left"
                        }
                    ]
                },
                {
                    view:"template",
                    template:"lah"
                }
            ]
        }
    }
}