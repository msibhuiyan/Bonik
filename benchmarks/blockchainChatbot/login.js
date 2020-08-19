'use strict';

module.exports.info = 'Login a User.';

let tx = 0;
let limitIndex, bc, contx;


module.exports.init = async function(blockchain, context, args) {
    bc = blockchain;
    contx = context;
    // limitIndex = args.assets;

    return Promise.resolve();
};


// do something with the data

module.exports.run = async function(request,res){
    tx++;
    let account_no = "2013331018"+tx.toString();
    // var email = request.body.email_id;
    // var password =  request.body.user_password;

    let args = {
        chaincodeFunction: 'login',
        chaincodeArguments: [account_no]
    };
    //console.log(bc.bcObj.querySmartContract(contx, 'blockchainChatbot', 'v1', args, 30).GetResult())
    
    
    let results = await bc.querySmartContract(contx, 'blockchainChatbot', 'v1', args, 30);

    for (let result of results) {
        // let shortID = result.GetResult().substring(8);
        let executionTime = result.GetTimeFinal() - result.GetTimeCreate();
        console.log(`TX [] took ${executionTime}ms to execute. Result: ${result.GetStatus()} Result is ${result.GetResult()}`);
    }
    
    return results;
}


module.exports.end = function() {
    return Promise.resolve();
};