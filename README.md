# Thesis-Website
## Download Pre-requisite
Download hyperledger fabric pre-requisite from here <br>
[Hyperledger Fabric Pre-requisite](https://hyperledger-fabric.readthedocs.io/en/release-1.1/prereqs.html) <br>
If you have already downloaded please skip this section.<br> 
## Download Fabric-Samples
Download Hyperledger fabric-samples <br>
[Fabric Samples](https://hyperledger-fabric.readthedocs.io/en/release-1.1/samples.html) <br>
If you have already downloaded please skip this section.<br>
## How to Run
cd to fabric-samples/ <br>
Clone the Rpository <br>
https://github.com/saif-lesnar/Thesis-Website.git <br>
cd to directory Thesis-Website <br>
Cut 'blockchainChatbot' folder and paste the folder to fabric-samples/chaincode/ <br>
## Deploy Network
cd to fabric-samples/Thesis-Website/ <br> 
open Terminal <br>
Run $script.sh <br>
Press Y and Wait for some minute <br>
Now you have created a distributed network.
## Deploy Web Server
cd to fabric-samples/Thesis-Website/ <br> 
Run $npm install <br>
Run $node Server.js <br>
You have started the server. hit https://localhost:3000 <br>
### How to use 
#### Step1: 
If you do not have any account then first hit Signup. <br>
Complete the form and Submit. <br>
You have now created an account. <br>
To Transcat money. You need another account. <br>
Remember you account.Now LogOut .<br>
Create another account with the same process.<br>
Now again LogOut.<br>
Now both these account have 10000000 taka. <br>
**You can create as much account as you can.**
#### Step2:
Log In to your Account. <br>
You will see a chat box will appear in the bottom section.<br>
#### Step3:
These are some basic chat:<br>
##### To generate transaction
User : Hello. <br>
Bot : (Bot will greet you. And tell you what it can do). <br>
User : i want to create a transaction / create a transaction / generate a transaction. <br>
Bot : (Bot will want to know the account number in which you want to transact money). <br>
User : Here is the account 2013331018. <br>
Bot : (Bot will want to know the money you want to transact) **Please mention 'taka' sucn as '500 taka'**. <br>
User : 1000 taka / 500 taka. <br>
Bot : (Bot will response wheather the transaction has taken place or not). <br>
##### To check balance
User: Check my balance/ Check balance. <br>
Bot : $Result. <br>
