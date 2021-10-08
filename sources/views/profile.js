import { JetView } from "webix-jet";

export default class ProfileView extends JetView{
    config(){
        return {
            rows:[
                {
                    view:"template",
                    template:"Profile",
                    height:50
                },
                {
                    view:"template",
                    template:"lah"
                }
            ]
        }
    }
}