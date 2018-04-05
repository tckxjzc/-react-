let os = require('os'), iptable = {}, ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach((item)=>{
    ifaces[item].forEach((details,alias)=>{
        if (details.family==='IPv4') {
            iptable[item]=details.address;
        }
    });
});

module.exports=(name='wlp15s0')=>{
    for(let item in iptable){
        if(item.toLowerCase().indexOf(name)!=-1){
            return iptable[item]
        }
    }
    return '127.0.0.1';
};