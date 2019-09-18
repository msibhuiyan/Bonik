package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	//"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	//"strconv"
    //"encoding/gob"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
// Structure of Sign Up

type SmartContract struct{

}

type SignUp struct{
  User_name string `json:"user_name"`
  Account_no string `json:"account_no"`
  Email string `json:"email"`
  Password string `json:"password"`
	Money int `json:money`

}
type LogIn struct{
  account_no string `json:"account_no"`
  email string `json:"email"`
  password string `json:"password"`

}



/*
 * The Init method is called when the Smart Contract "fabcar" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */





func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "fabcar"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
   if function == "initLedger" {
		return s.initLedger(APIstub)
	}else if function =="signup"{
    return s.signup(APIstub, args)
  }else if function =="login"{
		    return s.login(APIstub, args)
  }else if function =="transactmoney"{
		    return s.transactmoney(APIstub, args)
  }else if function =="checkmoney"{
		    return s.checkmoney(APIstub, args)
  }
	//else console.log("here function is"+function)
	return shim.Error("Invalid Smart Contract function name."+ function)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {

    fmt.Println("Ledger Initialised!")

	return shim.Success(nil)
}

func (s *SmartContract) signup(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
  fmt.Println("worjs in chain")
	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

    //evidenceID := args[1]
		user_name := args[0]
		account_no := args[1]
		email := args[2]
		password :=args[3]
		money, err := strconv.Atoi(args[4])

		if(err ==nil){
    //fmt.Println("Args 2 passing.",args[2])
		//fmt.Println("Printing actors ",actors)
		//fmt.Println("Args 3 passing.",args[3])

    userid := SignUp{User_name: user_name, Account_no: account_no, Email: email, Password: password, Money:money}
		//fmt.Println("Wordks here in the chain code " + userid)
		useridAsBytes, _ := json.Marshal(userid)
		APIstub.PutState(args[1], useridAsBytes)
	}


    fmt.Println("User successfully stored in the ledger1...")

	return shim.Success(nil)
}


func (s *SmartContract) login(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

    fmt.Println("Reading user data.....")


		fmt.Println(args[0])

    useridAsBytes, _ := APIstub.GetState(args[0])

    fmt.Println("Retrieved data:", useridAsBytes)

    return shim.Success(useridAsBytes)
}


func (s *SmartContract) transactmoney(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expecting 3")
	}


		user1id :=SignUp{}
		user2id :=SignUp{}
		mon, err := strconv.Atoi(args[2])

		if(err ==nil){

	    user1idAsBytes, _ := APIstub.GetState(args[0])
	    user2idAsBytes, _ := APIstub.GetState(args[1])
			json.Unmarshal(user1idAsBytes, &user1id)
			user1id.Money = user1id.Money- mon
			user1idAsBytes, _ = json.Marshal(user1id)
			APIstub.PutState(args[0], user1idAsBytes)
			json.Unmarshal(user2idAsBytes, &user2id)
			user2id.Money = user2id.Money+ mon
			user2idAsBytes, _ = json.Marshal(user2id)
			APIstub.PutState(args[1], user2idAsBytes)
		}else {
			fmt.Println("Error money data")
		}



    return shim.Success(nil)
}

func (s *SmartContract) checkmoney(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

		//account_no := args[0]

    useridAsBytes, _ := APIstub.GetState(args[0])

    //fmt.Println("Retrieved data:", useridAsBytes)

    return shim.Success(useridAsBytes)
}
func (s *SmartContract) transactioncheck(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}


    useridAsBytes, _ := APIstub.GetState(args[0])

    //fmt.Println("Retrieved data:", useridAsBytes)

    return shim.Success(useridAsBytes)
}

// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {

	// Create a new Smart Contract
	fmt.Println("hellow chain")
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
