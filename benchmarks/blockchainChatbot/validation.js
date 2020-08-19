'use strict';


// let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let tx = 0;
let limitIndex, bc, contx;



let reciverUser = null;
let money = 0;
let  responseChat;
let transactiondata;
let startbalance;
let endbalance;
let starttransaction;
let endtransaction;

module.exports.info = 'Making Transtaction';
const helper = require('./helper');
module.exports.init = async function(blockchain, context, args) {
    bc = blockchain;
	contx = context;
	await helper.createUser(bc, contx, args, 20000,30000);

	//await helper.createUser(bc, contx, args, 30000);
    // limitIndex = args.assets;

    return Promise.resolve();
};

module.exports.run = async function(request , res){
    tx++;
    // let query= `Send 10 taka to 2013331018${tx+1}`;
	let reciverUser = 30000 + contx.clientIdx; 
	reciverUser = reciverUser.toString();
	let sender = 20000 + contx.clientIdx; 
	sender = sender.toString();
    let money = `10`;
    
    let args = {
        chaincodeFunction: 'transactmoney',
        chaincodeArguments: [sender, reciverUser, money]
    };
	console.log("Transaction in progresss");
	console.log("Transaction Info " ,args.chaincodeArguments);
    let result =  await bc.invokeSmartContract(contx, 'blockchainChatbot', 'v0', args, 60);
    return result;



    // let transactiondata={
    //     "sender":sender,
    //      "reciverUser": reciverUser,
    //      "money": money,
    //  }
    // module.exports.transact(transactiondata, res).then((response)=>{
    //     return response;
    // })
	//res.redirect("/transaction");

/*api calling from server side*/
// console.log(`>>>>>>>>>>>>>>>>>>>> comes here ${tx}`);
	// let uri = "https://api.dialogflow.com/v1/query?v=20150910";
	// let data = {
	// 				 "contexts": [],
	// 				"lang": "en",
	// 				"query":query,
	// 				"sessionId": sender,
	// 				"timezone": "Asis/Almaty"
	// 		};

	// 		let xhttp = new XMLHttpRequest();
    // 	xhttp.onreadystatechange = function() {
    //      if (this.readyState == 4 && this.status == 200) {
    //          let result= xhttp.responseText;

	// 					 let data = JSON.parse(result);
	// 					 //console.log("hitting from CallAPI");
	// 					 let obj = data["result"]["fulfillment"]["speech"];
	// 					 //console.log(obj);
	// 					 if(data["result"]["parameters"].length!= 0 ){
	// 						 if(data["result"]["parameters"]["NumberOne"]!=null){
	// 							 reciverUser = data["result"]["parameters"]["NumberOne"];
	// 							 let reciverUserInt = parseInt(reciverUser);
	// 							 reciverUser = reciverUserInt.toString();
	// 						 }

	// 						 if(data["result"]["parameters"]["Money"] !=null){
	// 							money = data["result"]["parameters"]["Money"];
	// 							 //console.log("Testing money : "+data["result"]["parameters"]["Money"])
	// 							 let moneyint = parseInt(money);
	// 							 money = moneyint.toString();
	// 						 }


	// 					 }
	// 					 if(money!=null && reciverUser!=null ){
	// 						 transactiondata={
	// 							"sender":sender,
	// 			                 "reciverUser": reciverUser,
	// 			                 "money": money,
    //                          }
    //                          console.log("Transaction History >>>>");
    //                          console.log(transactiondata);
    //                         // module.exports.transact(transactiondata, res);
    //                         let args = {
    //                                         chaincodeFunction: 'transactmoney',
    //                                         chaincodeArguments: [sender, reciverUser, money]
    //                                     };
    //                                     console.log("Transaction in progresss");
    //                                     let result =  bc.invokeSmartContract(contx, 'blockchainChatbot', 'v1', args, 60);
    //                         }
    //                     //  else  if(data["result"]["parameters"]["Balance"] !=null){
	// 					// 	 //Testing performance of quring balance
	// 					// 		//startbalnce = new Date().getTime();
	// 					//  		//console.log('Start time');
	// 					// 		//console.log(startbalance+ "ends ");
	// 					// 		module.exports.checkbalance(request, res);
	// 					// }else {
	// 					// 	responseChat={
	// 					// 		"chat":obj,
	// 					// 	 }
	// 					// 	 //console.log("Hits in the else");

	// 					// 	 res.send(responseChat);
	// 					//  }


	// 					 //console.log("Checking every time "+reciverUser + " " +money);
	// 					 //module.exports.validate(result, res);
    //      }
    // };
    // xhttp.open("POST", uri, false);
    // xhttp.setRequestHeader('Content-Type', 'application/json','charset=utf-8');
	// xhttp.setRequestHeader('Authorization', 'Bearer 06739e5ce32444e4a8f636fed317eb2b');
    // xhttp.send(JSON.stringify(data));

/*api calling end from server side*/

}
// module.exports.validate = async function(request,res){

// 	//console.log("responding from validate");
// 	reciverUser = request["reciverUser"];
// 	let sender = request["sender"];
// 	money =request["money"];
// 	//console.log(reciverUser+" & "+money);

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
//         const result = await contract.evaluateTransaction('login', reciverUser);
//         console.log(`validate Transaction has been evaluated, result is: ${result.toString()}`);

//         if(!result){
//             console.log("user is not in the chain");
//             responseChat={
//                 "chat":"Sorry You provided wrong a account number.Please provide the correct account number.",
//             }
//             reciverUser = null;
//             res.send(responseChat);
//         }else{
//             transactiondata = {
//                 "sender" : sender,
//                 "reciverUser": reciverUser,
//                 "money": money,
//             }
//             module.exports.check(transactiondata, res);
//         }

//     } catch (error) {
//         console.error(`validate Failed to evaluate transaction: ${error}`);
//         process.exit(1);
//     }

    
// }




// module.exports.transact = async function(request,res){
// 	let sender = request["sender"];
// 	reciverUser = request["reciverUser"];
// 	money = request["money"];
//     if(sender == reciverUser){
//         responseChat={
//             "chat":"You cannot send money to your own account.",
//          }
//          money = null;
//          reciverUser= null;
//          res.send(responseChat);
//     }
//     else{

//         let args = {
//             chaincodeFunction: 'transactmoney',
//             chaincodeArguments: [sender, reciverUser, money]
//         };
//         console.log("Transaction in progresss");
//         let result =  bc.invokeSmartContract(contx, 'blockchainChatbot', 'v1', args, 60);
//         console.log(`RESULT OF TRANSACTION-> Sending ${money} from ${sender} ${reciverUser}, Result`);
//         // return result;
//     }
	
// }


// module.exports.check = async function(request,res){
// 	//console.log("hitting from check ");
// 	reciverUser = request["reciverUser"];
// 	let sender = request["sender"];
// 	money =request["money"];


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
//         const result = await contract.evaluateTransaction('checkmoney', sender);
//         console.log(`check validate Transaction has been evaluated, result is: ${result.toString()}`);

//         if(result){
//             debugger;
//             // let data = query_responses[0];
//             //console.log("Response is ", data.toString());
//                             let obj = JSON.parse(result.toString());
//                             //console.log("money is  ", obj['Money']);
//             let sendermoney = obj['Money']
//                             //console.log("Response is ", JSON.stringify(data));
//                             console.log('>>>>>>>> sender money'+sendermoney+' >>>>>>>>> Money ' + money);
//             if(sendermoney >= money ){
//                                 transactiondata = {
//                                     "sender":sender,
//                                     "reciverUser" : reciverUser,
//                                     "money" : money,
//                                 }
//               module.exports.transact(transactiondata, res);
//             }
//             else{
//                                 //here bot response will be provided
//                                 responseChat={
//                                     "chat":"You do not have sufficient ammount of money",
//                                  }
//                                  money = null;
//                                  res.send(responseChat);
//               console.log("user doesnt have sufficient money");
//             }
//         }else{
//             console.log("Failed to query in chain in function check");
//         }
//         await gateway.disconnect();

//     } catch (error) {
//         console.error(`check Failed to evaluate transaction: ${error}`);
//         process.exit(1);
//     }

// }
// module.exports.checkbalance =  async function(request, res){


// 	let sender = request["sender"];


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
//         const result = await contract.evaluateTransaction('checkmoney', sender);
//         console.log(`check balance validate Transaction has been evaluated, result is: ${result.toString()}`);

//         if(!result){
//             console.log("user is not in the chain");
//             responseChat={
//                 "chat":"Sorry You provided wrong a account number.Please provide the correct account number.",
//             }
//             reciverUser = null;
//             res.send(responseChat);
//         }else{
//             let obj = JSON.parse(result.toString());

//             let currentmoney = obj['Money']
//             //console.log("Response is ", JSON.stringify(data));
//             let obj = "Your account Balance is " +currentmoney;
//             //Checking performance of quering execution times
//             endbalance = new Date().getTime();
//             //console.log("Checking balance Execution time");
//             //console.log(endbalance - startbalance);

//             if(currentmoney != null){
//             //console.log(obj);
//             responseChat={
//                 "chat":obj,
//              }
//              //console.log("Works in the check balanvce");
//              res.send({"chat":obj});
//          }
//         }

//     } catch (error) {
//         console.error(`check balance Failed to evaluate transaction: ${error}`);
//         process.exit(1);
//     }
// }


module.exports.end = function() {
    return Promise.resolve();
};