def createsignupdata():

    dp = []

    for i in range(300):
        dp.append(2033331001+i)


    return dp

def createtransactdata():
    ar = ['send', 'transact']
    dp = []
    money = 100
    str1= ''
    k=0
    for i in range(150):
        str1= str(2033331002+k)
        k=k+2
        #print(str1)
        dp.append(str1)
    return dp



def createcheckbalancedata():
    dp = []
    str1= ''
    for i in range(500):
        str1= "check balance"
        #print(str1)
        dp.append(str1)
    return dp


file1 = open("signuptest.txt", "w")
file2= open("validationtest.txt", "w")
file3= open("balancetest.txt", "w")

data1 = createsignupdata()
data2= createtransactdata()
data3 =createcheckbalancedata()
#print(data)
for i in data1:
    file1.write(str(i))
    file1.write('\n')


#print(len(data2))
for i in data2:
    file2.write(i)
    file2.write('\n')
#print(createdata())
for i in data3:
    file3.write(i)
    file3.write('\n')
