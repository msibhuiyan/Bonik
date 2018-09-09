def readfile():
    sum = 0;
    with open('validationwriteonlywrite.txt')as f:
        line =f.readlines()
        print(len(line))
        for i in line:
            sum=sum+int(i)


    return sum/len(line)

print(readfile())
