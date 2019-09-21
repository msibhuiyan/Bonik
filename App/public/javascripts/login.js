/*
 * SPDX-License-Identifier: Apache-2.0
 */

// 'use strict';

// const { FileSystemWallet, Gateway } = require('fabric-network');
// const fs = require('fs');
// const path = require('path');

// const ccpPath = path.resolve(__dirname, '..','..','..', 'connection.json');
// const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
// const ccp = JSON.parse(ccpJSON);

// async function main() {
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

    //     // Evaluate the specified transaction.
    //     // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
    //     // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
    //     const result = await contract.evaluateTransaction('login', '1234');
    //     console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    // } catch (error) {
    //     console.error(`aFailed to evaluate transaction: ${error}`);
    //     process.exit(1);
    // }
// }

// main();



'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..','..','..', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

init();

function init() {
	// channel.addPeer(peer);
}

module.exports.login = async function(request,res){
    var account_no = request.body.account_no;
    var email = request.body.email_id;
    var password =  request.body.user_password;
    console.log("Reading:email "+ email + 'account_no' +account_no);
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('blockchainChatbot');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('login', account_no);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>" + result);
        if(result){
            request.session.accno=account_no;
            res.redirect("/userindex");
        }else{
            res.redirect("/");
        }
        var data  = JSON.parse(result);
        console.log("login Transaction has been evaluated, result is:"+ result.toString()+ " " + data["Money"]);

    } catch (error) {
        console.error(`aFailed to evaluate transaction: ${error}`);
        process.exit(1);
    }


















    // Fabric_Client.newDefaultKeyValueStore({ path: store_path
    // }).then((state_store) => {
    //     // assign the store to the fabric client
    //     fabric_client.setStateStore(state_store);
    //     var crypto_suite = Fabric_Client.newCryptoSuite();
    //     var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
    //     crypto_suite.setCryptoKeyStore(crypto_store);
    //     fabric_client.setCryptoSuite(crypto_suite);

    //     // get the enrolled user from persistence, this user will sign all requests
    //     return fabric_client.getUserContext('user1', true);
    // }).then((user_from_store) => {
    //     if (user_from_store && user_from_store.isEnrolled()) {
    //         console.log('Successfully loaded user1 from persistence');
    //         member_user = user_from_store;
    //     } else {
    //         throw new Error('Failed to get user1.... run registerUser.js');
    //     }
    //     const request = {
    //         //targets : --- letting this default to the peers assigned to the channel
    //         chaincodeId: 'blockchainChatbot',
    //         //fcn: 'queryAllCars',
    //         //args: ['']
    //         fcn: 'login',
    //         //'a0123c'
    //         args: [account_no]
    //     };
    //     console.log(request);
    //     return channel.queryByChaincode(request);
    // }).then((query_responses) => {
    //     console.log("Query has completed, checking results");
	// 			console.log(query_responses);
    //     if (query_responses && query_responses.length == 1) {
	// 				if(query_responses[0] == 0){
	// 					console.log("user is not in the chain");
	// 					res.redirect("/");
	// 				}
    //       else  if (query_responses[0] instanceof Error) {
    //             console.error("error from query = ", query_responses[0]);

    //         } else {
    //             var data = query_responses[0];
    //             var obj = JSON.parse(data.toString());
    //             console.log("password is  ", obj['password']);
    //             var passwordVerification = obj['password'];
    //             if(bcrypt.compareSync(password, passwordVerification)){
	// 								request.session.accno = request.body.account_no;
	// 								res.redirect("/userindex");
    //             } else  {
    //               console.log("provide correct password");
    //               res.redirect("/");
    //             }
    //         }
    //     } else {
    //         console.log("No payloads were returned from query");
    //     }
    // }).catch((err) => {
    //     console.error('Failed to query successfully :: ' + err);
    // });
}
