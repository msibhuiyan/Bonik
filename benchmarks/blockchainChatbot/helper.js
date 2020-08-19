'use strict';


let txIndex = 0;
let number = 0;
let user_name,account_no, email ,password, money;
// user_name := args[0]
// 		account_no := args[1]
// 		email := args[2]
// 		password :=args[3]
// 		money, err := strconv.Atoi(args[4])

module.exports.createUser = async function (bc, contx, args, base1,base2) {

    // while (txIndex < args.assets) {
        number = base1+contx.clientIdx;
        user_name = "user_"+ contx.clientIdx.toString();
        account_no = number.toString();
        email = "test@yopmail.com";
        password = "1qazZAQ!";
        money = '100000';
        
    
        let myArgs1 = {
            chaincodeFunction: 'signup',
            chaincodeArguments: [user_name, account_no, email, password, money]
        };
        number = base2+contx.clientIdx;
        user_name = "user_"+ contx.clientIdx.toString();
        account_no = number.toString();
        email = "test@yopmail.com";
        password = "1qazZAQ!";
        money = '100000';
        let myArgs2 = {
            chaincodeFunction: 'signup',
            chaincodeArguments: [user_name, account_no, email, password, money]
        };
        // txIndex++;
        console.log("Creating User 1 ", myArgs1.chaincodeArguments);
        await bc.invokeSmartContract(contx, 'blockchainChatbot', 'v0', myArgs1, 30);
        console.log("Creating User2 ", myArgs2.chaincodeArguments);

        await bc.invokeSmartContract(contx, 'blockchainChatbot', 'v0', myArgs2, 30);
    // }

};

module.exports.createUserForBalance = async function (bc, contx, args, base1) {

    // while (txIndex < args.assets) {
        number = base1+contx.clientIdx;
        user_name = "user_"+ contx.clientIdx.toString();
        account_no = number.toString();
        email = "test@yopmail.com";
        password = "1qazZAQ!";
        money = '100000';
        
    
        let myArgs1 = {
            chaincodeFunction: 'signup',
            chaincodeArguments: [user_name, account_no, email, password, money]
        };
        
        console.log("Creating User 1 ", myArgs1.chaincodeArguments);
        await bc.invokeSmartContract(contx, 'blockchainChatbot', 'v0', myArgs1, 30);
    // }

};
