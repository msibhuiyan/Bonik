'use strict';
//

var Fabric_Client = require('fabric-client');
var path = require('path');
var util = require('util');
var os = require('os');
var qs = require('querystring');
var bcrypt = require('bcrypt');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var session = require('express-session');
//var TransactionJS = require('./public/js/transaction.js')
const saltRounds = 10;
//
var fabric_client = new Fabric_Client();

// setup the fabric network
var channel = fabric_client.newChannel('mychannel');
var peer = fabric_client.newPeer('grpc://localhost:7051');
var order = fabric_client.newOrderer('grpc://localhost:7050');
//
var member_user = null;
var store_path = path.join(__dirname, '/../../hfc-key-store');
console.log('Store path:'+store_path);
var tx_id = null;









init();

function init() {
	channel.addPeer(peer);
  channel.addOrderer(order);
}

var  responseChat;
var transactiondata;

var starttransaction;
var endtransaction;



//for file read and output

var send =2033331001;
var i=0;
startQuery();
var fs = require('fs')
function startQuery(){
	var sender = []
	var queryd= []
	var fs = require('fs'),
	readline = require('readline'),
	instream = fs.createReadStream('./balancetest.txt'),
	outstream = new (require('stream'))(),
	rl = readline.createInterface(instream, outstream);

	 rl.on('line', function (line) {
			 console.log(line);


				// console.log(queryd[i], sender[i])
				 var data={
						//"query":line,
						"sender":send.toString(),
					}

					module.exports.checkbalance(data);

			 send=send+1;

	 });

	 rl.on('close', function (line) {
		 //  console.log(line);

			 console.log('done reading file.');
	 });


}


// file read and write



module.exports.callAPI = function(request , res){
	var query= request["query"];
	var sender =request["sender"];
//	console.log(query, sender)
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
						 console.log("hitting from CallAPI");
						 var obj = data["result"]["fulfillment"]["speech"];
						 console.log(obj);
						 if(data["result"]["parameters"].length!= 0 ){
							 if(data["result"]["parameters"]["NumberOne"]!=null){
								 var reciverUser = data["result"]["parameters"]["NumberOne"];
								 var reciverUserInt = parseInt(reciverUser);
								 reciverUser = reciverUserInt.toString();

							 }if(data["result"]["parameters"]["Money"] !=null){
								 var money = data["result"]["parameters"]["Money"];
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
							 startbalance = new Date().getTime();
							 startime.push(startbalance)
							 console.log("Start balance of transaction "+ startbalance)
							 	module.exports.validate(transactiondata, res)
						 }else  if(data["result"]["parameters"]["Balance"] !=null){
							 //Testing performance of quring balance

							 module.exports.checkbalance(request, res);
						}else {
							responseChat={
								"chat":obj,
							 }
							 console.log("Hits in the else");

							 //res.send(responseChat);
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

module.exports.checkbalance = function(request, res){
//	startbalance = new Date().getTime();
//	startime.push(startbalance)
//	console.log('Start time');
//	console.log(startbalance+ "ends ");
	var startbalance = new Date().getTime();
	console.log('Start time');
	console.log(startbalance+ "ends ");
	var sender = request["sender"];
	console.log('sender is  ',sender)

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
				console.log(request);
        return channel.queryByChaincode(request);
    }).then((query_responses) => {
        console.log("Query has completed, checking results");
        // query_responses could have more than one  results if there multiple peers were used as targets
        if (query_responses && query_responses.length == 1) {
            if (query_responses[0] instanceof Error) {
                console.error("error from query = ", query_responses[0]);
            } else {
                var data = query_responses[0];
                console.log("Response is ", data.toString());
								var obj = JSON.parse(data.toString());
								//console.log("money is  ", obj['Money']);
                var currentmoney = obj['Money']
								//console.log("Response is ", JSON.stringify(data));
								var obj = "Your account Balance is " +currentmoney;
								//Checking performance of quering execution times
								var endbalance = new Date().getTime();
								console.log("Checking balance Execution time");
								var timeval=endbalance -startbalance;
								if(currentmoney != null){
								console.log(obj);
								responseChat={
									"chat":obj,
								 }
								 console.log("Works in the check balance");
								 var final = "User is is "+sender+" Current Money "+currentmoney+" start time:"+startbalance+" End time:"+endbalance+" time:"+ timeval+'\n';
								 fs.appendFile('./balancewrite.txt',final, function (err) {
									 if (err) {
										 console.log("error in file writing")
										 } else {
										 // done
										 }
									 })
									 fs.appendFile('./balancewriteonlytime.txt',timeval+'\n', function (err) {
										 if (err) {
											 console.log("error in file writing")
											 } else {
											 // done
											 }
										 })
								 //res.send({"chat":obj});
								 //logger.write(timeval)
							 }

            }
        } else {
            console.log("No payloads were returned from query");
        }
    }).catch((err) => {
        console.error('Failed to query successfully in check balance:: ' + err);
    });
}
