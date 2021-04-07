//% weight=10 color=#7BD239 icon="\uf12e" block="IR_V2"
namespace BitIR {
    
    let irstate:number;
    let state:number;
    
    export enum enIRButton {
      //% blockId="MINIIR_A" block="A"
      CH_MINUS = 0x00,
      //% blockId="MINIIR_B" block="B"
	  CH = 0x01,
      //% blockId="MINIIR_C" block="C"
	  CH_Add = 0x02,
      //% blockId="MINIIR_D" block="D"
	  PREV = 0x03,
      //% blockId="MINIIR_up" block="︿"
	  PLAY = 0x04,
      //% blockId="MINIIR_E" block="E"
	  NUM_200 = 0x05,
      //% blockId="MINIIR_left" block="＜"
	  NEXT = 0x06,
      //% blockId="MINIIR_set" block="۞"
	  NUM_100 = 0x07,
      //% blockId="MINIIR_right" block="＞"
	  Minus = 0x08,
      //% blockId="MINIIR_NUM0" block="0"
	  Add = 0x09,
      //% blockId="MINIIR_down" block="﹀"
	  EQ = 0x0a,
      //% blockId="MINIIR_F" block="F"
	  NUM0 = 0x0b,
      //% blockId="MINIIR_NUM1" block="1"
	  NUM1 = 0x0c,
      //% blockId="MINIIR_NUM2" block="2"
	  NUM2 = 0x0d,
      //% blockId="MINIIR_NUM3" block="3"
	  NUM3 = 0x0e,
      //% blockId="MINIIR_NUM4" block="4"
	  NUM4 = 0x0f,
      //% blockId="MINIIR_NUM5" block="5"
	  NUM5 = 0x10,
      //% blockId="MINIIR_NUM6" block="6"
	  NUM6 = 0x11,
      //% blockId="MINIIR_NUM7" block="7"
	  NUM7 = 0x12,
      //% blockId="MINIIR_NUM8" block="8"
	  NUM8 = 0x13,
      //% blockId="MINIIR_NUM9" block="9"
	  NUM9 = 0x14,
    }

     /**
     * Read IR sensor value V2.
     */
    //% advanced=true shim=BitIR::irCode
    function irCode(): number {
        return 0;
    }

    //% weight=5
    //% blockId=IR_KeyValue block="IR_KeyValue|value %value"
    //% value.fieldEditor="gridpicker"
    //% value.fieldOptions.columns=3
    export function IR_KeyValue(value: enIRButton): number {
        led.enable(false);
        return value;
    }

    //% weight=5
    //% blockId=IR_readV2 block="read IR key value"
    export function IR_readV2(): number {
        led.enable(false);
        return valuotokeyConversion();
    }

    //% weight=2
    //% blockId=IR_callbackUserV2 block="on IR received"
    //% draggableParameters
    export function IR_callbackUserV2(cb: (message: number) => void) {
        led.enable(false);
        state = 1;
        control.onEvent(11, 22, function() {
            cb(irstate);
        }) 
    }

    function valuotokeyConversion():number{
        let irdata:number;
        switch(irCode()){
            case 0xba45:irdata = 0;break;
            case 0xb946:irdata = 1;break;
            case 0xb847:irdata = 2;break;
            case 0xbb44:irdata = 3;break;
            case 0xbc43:irdata = 5;break;
            case 0xf20d:irdata = 11;break;
            case 0xbf40:irdata = 4;break;
            case 0xe619:irdata = 10;break;
            case 0xf807:irdata = 6;break;
            case 0xea15:irdata = 7;break;
            case 0xf609:irdata = 8;break;
            case 0xe916:irdata = 9;break;
            case 0xf30c:irdata = 12;break;
            case 0xe718:irdata = 13;break;
            case 0xa15e:irdata = 14;break;
            case 0xf708:irdata = 15;break;
            case 0xe31c:irdata = 16;break;
            case 0xa55a:irdata = 17;break;
            case 0xbd42:irdata = 18;break;
            case 0xad52:irdata = 19;break;
            case 0xb54a:irdata = 20;break;
            default:
             irdata = -1;
        }
        return irdata;
    }

    basic.forever(() => {
        if(state == 1){
            irstate = valuotokeyConversion();
            if(irstate != -1){
                control.raiseEvent(11, 22);
            }
        }
        
        basic.pause(20);
    })

}
