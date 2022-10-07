  import { increamentCustomProperty,setCustomProperty,getCustomProperty } from "./updateprop.js";
  const ground=document.querySelectorAll('.ground')
  const speed =0.05

  export function setupGround() {
    setCustomProperty(ground[0],"--left",0)
    setCustomProperty(ground[1],"--left",300)
  }

  export function updateGround(delta,speedScale) {
    ground.forEach(ground => {
      increamentCustomProperty(ground,"--left",speedScale*delta*speed*-1)

      if(getCustomProperty(ground,'--left')<=-300){
        increamentCustomProperty(ground,'--left',600)
      }
    });
  }

