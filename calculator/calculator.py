def calculate(a,b,operation):
    if operation =="+":
        return a+b
    if operation =="-":
        return a-b
    if operation =="*":
        return a*b
    if operation =="/":
        if b==0:
            return "NO 0 DIVIDE"
        return a/b
    else:
        return "INVALID OPERATIONS"

