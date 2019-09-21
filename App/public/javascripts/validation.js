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
//     try {

//         // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = new FileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);

//         // Check to see if we've already enrolled the user.
//         const userExists = await wallet.exists('user1');
//         if (!userExists) {
//             console.log('An identity for the user "user1" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }

//         // Create a new gateway for connecting to our peer node.
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

//         // Get the network (channel) our contract is deployed to.
//         const network = await gateway.getNetwork('mychannel');

//         // Get the contract from the network.
//         const contract = network.getContract('blockchainChatbot');

//         // Evaluate the specified transaction.
//         // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
//         // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
//         const result = await contract.evaluateTransaction('login','1234');
//         console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

//     } catch (error) {
//         console.error(`Failed to evaluate transaction: ${error}`);
//         process.exit(1);
//     }
// }

// main();







'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..','..','..', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// 'use strict';
// //

// var Fabric_Client = require('fabric-client');
// var path = require('path');
// var util = require('util');
// var os = require('os');
// var qs = require('querystring');
// var bcrypt = require('bcryptjs');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// var session = require('express-session');
// //var TransactionJS = require('./public/js/transaction.js')
// const saltRounds = 10;
// //
// var fabric_client = new Fabric_Client();

// // setup the fabric network
// var channel = fabric_client.newChannel('mychannel');
// var peer = fabric_client.newPeer('grpc://localhost:7051');
// var order = fabric_client.newOrderer('grpc://localhost:7050');
// //
// var member_user = null;
// var store_path = path.join(__dirname, '/../../hfc-key-store');
// console.log('Store path:'+store_path);
// var tx_id = null;

init();

function init() {
// 	channel.addPeer(peer);
//   channel.addOrderer(order);
}
var reciverUser = null;
var money = null;
var  responseChat;
var transactiondata;
var startbalance;
var endbalance;
var starttransaction;
var endtransaction;
module.exports.callAPI = function(request , res){
	var query= request["query"];
	var sender =request["sender"];
	//res.redirect("/transaction");

/*api calling from server side*/

	var uri = "https://api.dialogflow.com/v1/query?v=20150910";
	var data = {
					 "contexts": [],
					"lang": "en",
					"query":query,
					"sessionId": sender,
					"timezone": "Asis/Almaty"
			};

			var xhttp = new XMLHttpRequest();
    	xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             var result= xhttp.responseText;

						 var data = JSON.parse(result);
						 //console.log("hitting from CallAPI");
						 var obj = data["result"]["fulfillment"]["speech"];
						 //console.log(obj);
						 if(data["result"]["parameters"].length!= 0 ){
							 if(data["result"]["parameters"]["NumberOne"]!=null){
								 reciverUser = data["result"]["parameters"]["NumberOne"];
								 var reciverUserInt = parseInt(reciverUser);
								 reciverUser = reciverUserInt.toString();
							 }

							 if(data["result"]["parameters"]["Money"] !=null){
								money = data["result"]["parameters"]["Money"];
								 //console.log("Testing money : "+data["result"]["parameters"]["Money"])
								 var moneyint = parseInt(money);
								 money = moneyint.toString();
							 }


						 }
						 if(money!=null && reciverUser!=null ){
							 transactiondata={
								"sender":sender,
				                 "reciverUser": reciverUser,
				                 "money": money,
							 }
							module.exports.validate(transactiondata, res)
						 }else  if(data["result"]["parameters"]["Balance"] !=null){
							 //Testing performance of quring balance
								//startbalnce = new Date().getTime();
						 		//console.log('Start time');
								//console.log(startbalance+ "ends ");
								//  module.exports.checkbalance(request, res);
						}else {
							responseChat={
								"chat":obj,
							 }
							 //console.log("Hits in the else");

							 res.send(responseChat);
						 }


						 //console.log("Checking every time "+reciverUser + " " +money);
						 //module.exports.validate(result, res);
         }
    };
    xhttp.open("POST", uri, false);
    xhttp.setRequestHeader('Content-Type', 'application/json','charset=utf-8');
		xhttp.setRequestHeader('Authorization', 'Bearer 06739e5ce32444e4a8f636fed317eb2b');
    xhttp.send(JSON.stringify(data));

/*api calling end from server side*/

}
module.exports.validate = async function(request,res){

	//console.log("responding from validate");
	reciverUser = request["reciverUser"];
	var sender = request["sender"];
	money =request["money"];
	//console.log(reciverUser+" & "+money);

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
        const result = await contract.evaluateTransaction('login', reciverUser);
        console.log(`validate Transaction has been evaluated, result is: ${result.toString()}`);

        if(!result){
            console.log("user is not in the chain");
            responseChat={
                "chat":"Sorry You provided wrong a account number.Please provide the correct account number.",
            }
            reciverUser = null;
            res.send(responseChat);
        }else{
            transactiondata = {
                "sender" : sender,
                "reciverUser": reciverUser,
                "money": money,
            }
            module.exports.check(transactiondata, res);
        }

    } catch (error) {
        console.error(`aFailed to evaluate transaction: ${error}`);
        process.exit(1);
    }

    // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
    // Fabric_Client.newDefaultKeyValueStore({ path: store_path
    // }).then((state_store) => {
    //     // assign the store to the fabric client
    //     fabric_client.setStateStore(state_store);
    //     var crypto_suite = Fabric_Client.newCryptoSuite();
    //     // use the same location for the state store (where the users' certificate are kept)
    //     // and the crypto store (where the users' keys are kept)
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

    //     // queryCar chaincode function - requires 1 argument, ex: args: ['CAR4'],
    //     // queryAllCars chaincode function - requires no arguments , ex: args: [''],

    //     const request = {
    //         //targets : --- letting this default to the peers assigned to the channel
    //         chaincodeId: 'blockchainChatbot',
    //         //fcn: 'queryAllCars',
    //         //args: ['']
    //         fcn: 'login',
    //         //'a0123c'
    //         args: [reciverUser]
    //     };
    //     //console.log(request);
    //     // send the query proposal to the peer
    //     return channel.queryByChaincode(request);
    // }).then((query_responses) => {
    //     console.log("Query has completed, checking results");
    //     // query_responses could have more than one  results if there multiple peers were used as targets
    //     if (query_responses && query_responses.length == 1) {
    //       if(query_responses[0] == 0){
	// 					console.log("user is not in the chain");
	// 					responseChat={
	// 						"chat":"Sorry You provided wrong a account number.Please provide the correct account number.",
	// 					}
	// 					reciverUser = null;
	// 					res.send(responseChat);
	// 				}
    //       else  if (query_responses[0] instanceof Error) {
    //             console.error("error from query = ", query_responses[0]);

    //         }
    //      else {
	// 				 			transactiondata = {
	// 								"sender" : sender,
	// 								"reciverUser": reciverUser,
	// 								"money": money,
	// 							}
    //             module.exports.check(transactiondata, res);

    //         }
    //     } else {
    //         console.log("No payloads were returned from query");
    //     }
    // }).catch((err) => {
    //     console.error('Failed to query successfully :: ' + err);
    // });
}




// module.exports.transact = function(request,res){
// 	//console.log("hitting from transact");
// 	var sender = request["sender"];
// 	reciverUser = request["reciverUser"];
// 	money = request["money"];



// 	//console.log(reciverUser+" & "+money);


//     // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
//     Fabric_Client.newDefaultKeyValueStore({ path: store_path
//     }).then((state_store) => {
//         // assign the store to the fabric client
//         fabric_client.setStateStore(state_store);
//         var crypto_suite = Fabric_Client.newCryptoSuite();
//         // use the same location for the state store (where the users' certificate are kept)
//         // and the crypto store (where the users' keys are kept)
//         var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
//         crypto_suite.setCryptoKeyStore(crypto_store);
//         fabric_client.setCryptoSuite(crypto_suite);

//         // get the enrolled user from persistence, this user will sign all requests
//         return fabric_client.getUserContext('user1', true);
//     }).then((user_from_store) => {
//         if (user_from_store && user_from_store.isEnrolled()) {
//             console.log('Successfully loaded user1 from persistence');
//             member_user = user_from_store;
//         } else {
//             throw new Error('Failed to get user1.... run registerUser.js');
//         }

//         // get a transaction id object based on the current user assigned to fabric client
//         tx_id = fabric_client.newTransactionID();
//         console.log("Assigning transaction_id: ", tx_id._transaction_id);

//         // createCar chaincode function - requires 5 args, ex: args: ['CAR12', 'Honda', 'Accord', 'Black', 'Tom'],
//         // changeCarOwner chaincode function - requires 2 args , ex: args: ['CAR10', 'Barry'],
//         // must send the proposal to endorsing peers
// 				if(sender == reciverUser){
// 					responseChat={
// 						"chat":"You cannot send money to your own account.",
// 					 }
// 					 //console.log("hitting wheather sander == reciverUser");
// 					 money = null;
// 					 reciverUser= null;
// 					 res.send(responseChat);
// 				}
// 				else{
//         	var request = {
//             //targets: let default to the peer assigned to the client
//             	chaincodeId: 'blockchainChatbot',
//             	fcn: 'transactmoney',
// 							args: [sender, reciverUser, money],
//             	chainId: 'mychannel',
//             	txId: tx_id
//         	};
// 				}
//         // send the transaction proposal to the peers
//         return channel.sendTransactionProposal(request);
//     }).then((results) => {
//         var proposalResponses = results[0];
//         var proposal = results[1];
//         let isProposalGood = false;
//         if (proposalResponses && proposalResponses[0].response &&
//             proposalResponses[0].response.status === 200) {
//                 isProposalGood = true;
//                 console.log('Transaction proposal was good');
//             } else {
//                 console.error('Transaction proposal was bad');
//             }
//         if (isProposalGood) {
//             console.log(util.format(
//                 'Successfully sent Proposal and received ProposalResponse: Status - %s, message - "%s"',
//                 proposalResponses[0].response.status, proposalResponses[0].response.message));

//             // build up the request for the orderer to have the transaction committed
//             var request = {
//                 proposalResponses: proposalResponses,
//                 proposal: proposal
//             };

//             // set the transaction listener and set a timeout of 30 sec
//             // if the transaction did not get committed within the timeout period,
//             // report a TIMEOUT status
//             var transaction_id_string = tx_id.getTransactionID(); //Get the transaction ID string to be used by the event processing
//             var promises = [];

//             var sendPromise = channel.sendTransaction(request);
//             promises.push(sendPromise); //we want the send transaction first, so that we know where to check status

//             // get an eventhub once the fabric client has a user assigned. The user
//             // is required bacause the event registration must be signed
//             let event_hub = fabric_client.newChannelEventHub();
//             event_hub.setPeerAddr('grpc://localhost:7053');

//             // using resolve the promise so that result status may be processed
//             // under the then clause rather than having the catch clause process
//             // the status
//             let txPromise = new Promise((resolve, reject) => {
//                 let handle = setTimeout(() => {
//                     event_hub.disconnect();
//                     resolve({event_status : 'TIMEOUT'}); //we could use reject(new Error('Trnasaction did not complete within 30 seconds'));
//                 }, 3000);
//                 event_hub.connect();
//                 event_hub.registerTxEvent(transaction_id_string, (tx, code) => {
//                     // this is the callback for transaction event status
//                     // first some clean up of event listener
//                     clearTimeout(handle);
//                     event_hub.unregisterTxEvent(transaction_id_string);
//                     event_hub.disconnect();

//                     // now let the application know what happened
//                     var return_status = {event_status : code, tx_id : transaction_id_string};
//                     if (code !== 'VALID') {
//                         console.error('The transaction was invalid, code = ' + code);
// 												/*responseChat={
// 													"chat":,
// 												 }
// 												 console.log("Hits in the else");

// 												 res.send(responseChat);*/

//                         resolve(return_status); // we could use reject(new Error('Problem with the tranaction, event status ::'+code));
//                     } else {
//                         console.log('The transaction has been committed on peer ' + event_hub._ep._endpoint.addr);
// 												resolve(return_status);
//                     }
//                 }, (err) => {
//                     //this is the callback if something goes wrong with the event registration or processing
//                     reject(new Error('There was a problem with the eventhub ::'+err));

//                 });
//             });
//             promises.push(txPromise);

//             return Promise.all(promises);
//         } else {
//             console.error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
//             throw new Error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
//         }
//     }).then((results) => {
//         console.log('Send transaction promise and event listener promise have completed');
//         // check the results in the order the promises were added to the promise all list
//         if (results && results[0] && results[0].status === 'SUCCESS') {
//             console.log('Successfully sent transaction to the orderer.');
//         } else {
//             console.error('Failed to order the transaction. Error code: ' + response.status);
//         }

//         if(results && results[1] && results[1].event_status === 'VALID') {
//             console.log('Successfully committed the change to the ledger by the peer');
// 						responseChat={
// 							"chat":"Your transaction is done",
// 						 }
// 						 //console.log("Hits in the else");
// 						 money = null;
// 						 reciverUser= null;
// 						 res.send(responseChat);
//             //res.setHeader('Content-Type', 'application/json');
//             //res.send(JSON.stringify({ "Message ": 'Successfully updated' }));

//         } else {
//             console.log('Transaction failed to be committed to the ledger due to ::'+results[1].event_status);
//         }
//     }).catch((err) => {
//         console.error('Failed to invoke successfully :: ' + err);
//     });
// }


module.exports.check = async function(request,res){
	//console.log("hitting from check ");
	reciverUser = request["reciverUser"];
	var sender = request["sender"];
	money =request["money"];


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
        const result = await contract.evaluateTransaction('checkmoney', sender);
        console.log(`validate Transaction has been evaluated, result is: ${result.toString()}`);

        if(result){
            debugger;
            var data = query_responses[0];
            //console.log("Response is ", data.toString());
                            var obj = JSON.parse(data.toString());
                            //console.log("money is  ", obj['Money']);
            var sendermoney = obj['Money']
                            //console.log("Response is ", JSON.stringify(data));
            if(sendermoney >= money ){
                                transactiondata = {
                                    "sender":sender,
                                    "reciverUser" : reciverUser,
                                    "money" : money,
                                }
              module.exports.transact(transactiondata, res);
            }
            else{
                                //here bot response will be provided
                                responseChat={
                                    "chat":"You do not have sufficient ammount of money",
                                 }
                                 money = null;
                                 res.send(responseChat);
              console.log("user doesnt have sufficient money");
            }
        }else{
            
        }

    } catch (error) {
        console.error(`aFailed to evaluate transaction: ${error}`);
        process.exit(1);
    }

	//console.log(reciverUser+" & "+money);

    // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
    Fabric_Client.newDefaultKeyValueStore({ path: store_path
    }).then((state_store) => {
        // assign the store to the fabric client
        fabric_client.setStateStore(state_store);
        var crypto_suite = Fabric_Client.newCryptoSuite();
        // use the same location for the state store (where the users' certificate are kept)
        // and the crypto store (where the users' keys are kept)
        var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
        crypto_suite.setCryptoKeyStore(crypto_store);
        fabric_client.setCryptoSuite(crypto_suite);

        // get the enrolled user from persistence, this user will sign all requests
        return fabric_client.getUserContext('user1', true);
    }).then((user_from_store) => {
        if (user_from_store && user_from_store.isEnrolled()) {
            console.log('Successfully loaded user1 from persistence');
            member_user = user_from_store;
        } else {
            throw new Error('Failed to get user1.... run registerUser.js');
        }

        // queryCar chaincode function - requires 1 argument, ex: args: ['CAR4'],
        // queryAllCars chaincode function - requires no arguments , ex: args: [''],
        const request = {
            //targets : --- letting this default to the peers assigned to the channel
            chaincodeId: 'blockchainChatbot',

            fcn: 'checkmoney',
            args: [sender]
        };

        // send the query proposal to the peer
				//console.log(request);
        return channel.queryByChaincode(request);
    }).then((query_responses) => {
        console.log("Query has completed, checking results");
        // query_responses could have more than one  results if there multiple peers were used as targets
        if (query_responses && query_responses.length == 1) {
            if (query_responses[0] instanceof Error) {
                console.error("error from query = ", query_responses[0]);
            } else {
                var data = query_responses[0];
                //console.log("Response is ", data.toString());
								var obj = JSON.parse(data.toString());
								//console.log("money is  ", obj['Money']);
                var sendermoney = obj['Money']
								//console.log("Response is ", JSON.stringify(data));
                if(sendermoney >= money ){
									transactiondata = {
										"sender":sender,
										"reciverUser" : reciverUser,
										"money" : money,
									}
                  module.exports.transact(transactiondata, res);
                }
                else{
									//here bot response will be provided
									responseChat={
										"chat":"You do not have sufficient ammount of money",
									 }
									 money = null;
									 res.send(responseChat);
                  console.log("user doesnt have sufficient money");
                }
            }
        } else {
            console.log("No payloads were returned from query");
        }
    }).catch((err) => {
        console.error('Failed to query successfully :: ' + err);
    });
}
// module.exports.checkbalance = function(request, res){


// 	var sender = request["sender"];

//     // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
//     Fabric_Client.newDefaultKeyValueStore({ path: store_path
//     }).then((state_store) => {
//         // assign the store to the fabric client
//         fabric_client.setStateStore(state_store);
//         var crypto_suite = Fabric_Client.newCryptoSuite();
//         // use the same location for the state store (where the users' certificate are kept)
//         // and the crypto store (where the users' keys are kept)
//         var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
//         crypto_suite.setCryptoKeyStore(crypto_store);
//         fabric_client.setCryptoSuite(crypto_suite);

//         // get the enrolled user from persistence, this user will sign all requests
//         return fabric_client.getUserContext('user1', true);
//     }).then((user_from_store) => {
//         if (user_from_store && user_from_store.isEnrolled()) {
//             console.log('Successfully loaded user1 from persistence');
//             member_user = user_from_store;
//         } else {
//             throw new Error('Failed to get user1.... run registerUser.js');
//         }

//         // queryCar chaincode function - requires 1 argument, ex: args: ['CAR4'],
//         // queryAllCars chaincode function - requires no arguments , ex: args: [''],
//         const request = {
//             //targets : --- letting this default to the peers assigned to the channel
//             chaincodeId: 'blockchainChatbot',

//             fcn: 'checkmoney',
//             args: [sender]
//         };

//         // send the query proposal to the peer
// 				//console.log(request);
//         return channel.queryByChaincode(request);
//     }).then((query_responses) => {
//         console.log("Query has completed, checking results");
//         // query_responses could have more than one  results if there multiple peers were used as targets
//         if (query_responses && query_responses.length == 1) {
//             if (query_responses[0] instanceof Error) {
//                 console.error("error from query = ", query_responses[0]);
//             } else {
//                 var data = query_responses[0];
//                 //console.log("Response is ", data.toString());
// 								var obj = JSON.parse(data.toString());
// 								//console.log("money is  ", obj['Money']);
//                 var currentmoney = obj['Money']
// 								//console.log("Response is ", JSON.stringify(data));
// 								var obj = "Your account Balance is " +currentmoney;
// 								//Checking performance of quering execution times
// 								endbalance = new Date().getTime();
// 								//console.log("Checking balance Execution time");
// 								//console.log(endbalance - startbalance);

// 								if(currentmoney != null){
// 								//console.log(obj);
// 								responseChat={
// 									"chat":obj,
// 								 }
// 								 //console.log("Works in the check balanvce");
// 								 res.send({"chat":obj});
// 							 }
//             }
//         } else {
//             console.log("No payloads were returned from query");
//         }
//     }).catch((err) => {
//         console.error('Failed to query successfully :: ' + err);
//     });
// }
