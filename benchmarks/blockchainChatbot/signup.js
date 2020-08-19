'use strict';

// const { FileSystemWallet, Gateway } = require('fabric-network');
// const fs = require('fs');
// const path = require('path');

// const ccpPath = path.resolve(__dirname, '..','..','..', 'connection.json');
// const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
// const ccp = JSON.parse(ccpJSON);
module.exports.info = 'Creating new User.';

let tx = 0;
let bc, contx, userId;
module.exports.init = function(blockchain, context, args) {
    bc = blockchain;
    contx = context; 
    // let generatedUserid = `user${}ID`   
    // userId = args[`user${contx.clientIdx}ID`];
    // console.log("FROM INIT >>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log(userId);
    // console.log(blockchain);
    // console.log(context);
    return Promise.resolve();
};

module.exports.run = async function(){
    var user_name = 'razzak'+ contx.clientIdx?contx.clientIdx.toString():'';
    // var account_no = userId? userId.toString() + contx.clientIdx?contx.clientIdx.toString():'' : '3646534'+contx.clientIdx.toString();
    var account_no = contx.clientIdx.toString();
    var email = 'test@test.com';
    var password = '11111';
    var money = '10000000';
    console.log("Running account_no ", account_no);
    // console.log(contx.clientIdx);

    let args = {
        chaincodeFunction: 'signup',
        chaincodeArguments: [user_name, account_no, email, password, money]
    };

    return bc.invokeSmartContract(contx, 'blockchainChatbot', 'v0', args, 30);

    //console.log("Reading: user_name : " +user_name+ " account_no "+account_no+" email "+email+" password "+password);
    // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
    // try {

    //     // Create a new file system based wallet for managing identities.
    //     const walletPath = path.join(process.cwd(), 'wallet');
    //     const wallet = new FileSystemWallet(walletPath);
    //     console.log(`Wallet path: ${walletPath}`);

    //     // Check to see if we've already enrolled the user.
    //     const userExists = await wallet.exists('user1');
    //     if (!userExists) {
    //         console.log('An identity for the user "user1" does not exist in the wallet');
    //         console.log('Run the registerUser.js application before retrying');
    //         return;
    //     }

    //     // Create a new gateway for connecting to our peer node.
    //     const gateway = new Gateway();
    //     await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

    //     // Get the network (channel) our contract is deployed to.
    //     const network = await gateway.getNetwork('mychannel');

    //     // Get the contract from the network.
    //     const contract = network.getContract('blockchainChatbot');

    //     // Submit the specified transaction.
    //     // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
    //     // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
    //     await contract.submitTransaction('signup', user_name, account_no, email, password, money);
    //     console.log('bTransaction has been submitted');
    //     request.session.accno=account_no;
    //     // res.redirect("/userindex");
        
    //     // Disconnect from the gateway.
    //     await gateway.disconnect();

    // } catch (error) {
    //     console.error(`Failed to submit transaction: ${error}`);
    //     process.exit(1);
    // }
}
module.exports.end = function() {
    return Promise.resolve();
};