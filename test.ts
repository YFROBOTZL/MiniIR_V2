// Add your code here
BitIR.IR_callbackUserV2(function(message: number) {
    serial.writeString(""+ message)
})
