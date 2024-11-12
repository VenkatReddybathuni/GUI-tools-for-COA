// pipeline.js

// Define R-type, I-type, and J-type instruction sets
const R_TYPE_INSTRUCTIONS = ['ADD', 'SUB', 'AND', 'OR', 'SLT'];
const I_TYPE_INSTRUCTIONS = ['ADDI', 'LW', 'SW', 'BEQ', 'BNE'];
const J_TYPE_INSTRUCTIONS = ['J', 'JAL'];

function detectInstructionType(instruction) {
    if (R_TYPE_INSTRUCTIONS.includes(instruction)) {
        return 'R';
    } else if (I_TYPE_INSTRUCTIONS.includes(instruction)) {
        return 'I';
    } else if (J_TYPE_INSTRUCTIONS.includes(instruction)) {
        return 'J';
    } else {
        throw new Error(`Unknown instruction type for instruction: ${instruction}`);
    }
}

function updatePipelineVisualization(stage, details) {
    console.log(`Updating pipeline stage "${stage}" with details: ${details}`);
    const stageElements = {
        'stage-machine-code': document.getElementById("stage-machine-code"),
        'stage-fetch': document.getElementById("stage-fetch"),
        'stage-decode': document.getElementById("stage-decode"),
        'stage-execute': document.getElementById("stage-execute"),
        'stage-memory': document.getElementById("stage-memory"),
        'stage-writeback': document.getElementById("stage-writeback"),
    };

    if (stageElements[`stage-${stage}`]) {
        stageElements[`stage-${stage}`].innerHTML = details;
        stageElements[`stage-${stage}`].classList.add('highlight');
        setTimeout(() => {
            stageElements[`stage-${stage}`].classList.remove('highlight');
        }, 1000); // highlight for 1 second
    } else {
        console.error(`Pipeline stage "${stage}" not found.`);
    }
}


function processInstruction(instruction, namedArgs) {
    // Detect the type of the instruction
    console.log(`Processing instruction: ${instruction}`, namedArgs); 
    const type = detectInstructionType(instruction);

    let machineCode, fetch, decode, execute, memory, writeback;

    switch (type) {
        case 'R':
            machineCode = generateRTypeMachineCode(namedArgs);
            fetch = `Instruction = ${machineCode}`;
            decode = `opcode=000000, rs=${namedArgs.$rs}, rt=${namedArgs.$rt}, rd=${namedArgs.$rd}, shamt=00000, funct=${namedArgs.funct}`;
            execute = `R-type operation result = ${computeRType(namedArgs)}`;
            memory = "No memory access required for R-type instruction";
            writeback = `Writing result to register ${namedArgs.$rd}`;
            break;
        
        case 'I':
            machineCode = generateITypeMachineCode(namedArgs);
            fetch = `Instruction = ${machineCode}`;
            decode = `opcode=${namedArgs.opcode}, rs=${namedArgs.$rs}, rt=${namedArgs.$rt}, immediate=${namedArgs.immediate}`;
            execute = `I-type operation with immediate value = ${namedArgs.immediate}`;
            memory = `Memory accessed at address calculated by rs + immediate`;
            writeback = `Writing result to register ${namedArgs.$rt}`;
            break;
        
        case 'J':
            machineCode = generateJTypeMachineCode(namedArgs);
            fetch = `Instruction = ${machineCode}`;
            decode = `opcode=${namedArgs.opcode}, address=${namedArgs.address}`;
            execute = `Jump to address ${namedArgs.address}`;
            memory = "No memory access required for J-type instruction";
            writeback = "No write-back required for J-type instruction";
            break;
        
        default:
            return;
    }

    // Update each pipeline stage with the information
    updatePipelineVisualization('machine-code', `Machine code for '${instruction}': ${machineCode}`);
    updatePipelineVisualization('fetch', fetch);
    updatePipelineVisualization('decode', decode);
    updatePipelineVisualization('execute', execute);
    updatePipelineVisualization('memory', memory);
    updatePipelineVisualization('writeback', writeback);
}


function generateRTypeMachineCode(namedArgs) {
    // R-type format: opcode (6) + rs (5) + rt (5) + rd (5) + shamt (5) + funct (6)
    return `000000${padBinary(namedArgs.$rs, 5)}${padBinary(namedArgs.$rt, 5)}${padBinary(namedArgs.$rd, 5)}00000${namedArgs.funct}`;
}

function generateITypeMachineCode(namedArgs) {
    // I-type format: opcode (6) + rs (5) + rt (5) + immediate (16)
    return `${namedArgs.opcode}${padBinary(namedArgs.$rs, 5)}${padBinary(namedArgs.$rt, 5)}${padBinary(namedArgs.immediate, 16)}`;
}

function generateJTypeMachineCode(namedArgs) {
    // J-type format: opcode (6) + address (26)
    return `${namedArgs.opcode}${padBinary(namedArgs.address, 26)}`;
}

function padBinary(value, length) {
    return value.toString(2).padStart(length, '0');
}

function computeRType(namedArgs) {
    // Example computation for an ADD instruction
    // Replace this logic with your actual R-type operation computation.
    if (namedArgs.funct === "100000") { // Assume 100000 is ADD funct code
        return namedArgs.$rs + namedArgs.$rt;
    }
    // Handle other R-type operations as needed
    return 0;
}
