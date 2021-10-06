// export default {
// 	template:"Website untuk assessment di PTCT",
// };
import {JetView} from "webix-jet";

export default class Welcome extends JetView{
	config(){
		return{
			view:"text", 
			value:"Website untuk assessment di PTCT",
			fontSize: "40pt"
		}
	}
}