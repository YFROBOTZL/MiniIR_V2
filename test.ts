BitIR.IR_callbackUserV2(function(message: number) {
    
    serial.writeLine(""+BitIR.IR_readV2())
    serial.writeLine(""+message)
})