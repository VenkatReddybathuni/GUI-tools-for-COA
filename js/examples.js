var examples = {
    simpleAdditionExample: function() {
        return [
            "ADDI $t0, $zero, 5         # load immediate value 5 into $t0",
            "ADDI $t1, $zero, 3         # load immediate value 3 into $t1",
            "ADD $t2, $t0, $t1      # add $t0 and $t1, store result in $t2",

            "ADDI $v0, $zero, 1         # syscall for print_int",
            "MOVE $a0, $t2           # move result to $a0 for printing",
        ];
    },

    loopExample: function() {
        return [
            "ADDI $t0, $zero, 0         # sum = 0",
            "ADDI $t1, $zero, 1         # counter = 1",

            "FOR_LOOP:",
            "ADD $t0, $t0, $t1          # sum += counter",
            "ADDI $t1, $t1, 1           # increment counter by 1",
            "BEQ $t1, $t1, FOR_LOOP      # if counter != 11, repeat loop",
        ];
    },

    checkOddOrEven: function() {
        return [
            "ADDI $t0, $zero, 13        # load immediate value 13 into $t0",
            "ANDI $t1, $t0, 1           # perform bitwise AND with 1 to check if odd",
    
            "BEQ $t1, $zero, EVEN       # if result is zero, number is even",
            
            "ADDI $v0, $zero, 0         # set $v0 to 0 for odd",
            "J END                      # jump to end",
    
            "EVEN:",
            "ADDI $v0, $zero, 1         # set $v0 to 1 for even",
    
            "END:"
        ];
    },
    

    maxOfTwoNumbers: function() {
        return [
            "ADDI $t0, $zero, 8         # load immediate value 8 into $t0",
            "ADDI $t1, $zero, 12        # load immediate value 12 into $t1",
            
            "SLT $t2, $t1, $t0          # set $t2 to 1 if $t1 < $t0",
            "BNE $t2, $zero, MAX_IS_T0  # if $t1 is less than $t0, jump to max_is_t0",
            
            "MOVE $v0, $t1              # move $t1 (max) to $v0",
            "J END_MAX                  # jump to end_max",
        
            "MAX_IS_T0:",
            "MOVE $v0, $t0              # move $t0 (max) to $v0",
        
            "END_MAX:"
        ];
    },
    

    ifElseExample: function() {
        return [
            "ADDI $t0, $zero, 15        # load immediate value 15 into $t0",
            "ADDI $t1, $zero, 10        # load immediate value 10 into $t1",
            "BNE $t0, $t1, NOT_EQUAL    # if $t0 != $t1, branch to not_equal",
    
            "ADDI $v0, $zero, 1         # set $v0 to 1 if equal",
            "J END_IF                   # jump to end_if",
    
            "NOT_EQUAL:",
            "ADDI $v0, $zero, 0         # set $v0 to 0 if not equal",
    
            "END_IF:"
        ];
    }
}
