// var opsys = process.platform;
// if (opsys == "darwin") {
//     opsys = "MacOS";
// } else if (opsys == "win32" || opsys == "win64") {
//     opsys = "Windows";
// } else if (opsys == "linux") {
//     opsys = "Linux";
// }
// console.log(opsys) // I don't know what linux is.

const { autoDetect } = require('@serialport/bindings-cpp');
const Binding = autoDetect();
Binding.list().then(ports => {
    // const port = ports.find(port => /arduino/i.test(port.manufacturer))
    console.log(ports);
});