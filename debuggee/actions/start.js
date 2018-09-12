import '../init.js';
import './watches.js'
import {dispatcher} from '../init.js';
var Blockly_Debuggee = require("../init.js").Blockly_Debuggee;
var window = require("../init.js").window;
//var evalLocal;

function update_values(){
    var update_var = Blockly_Debuggee.actions["variables"].update_values();
    var update_watch = Blockly_Debuggee.actions["watch"].update_values();
    return update_var + update_watch;
}

Blockly_Debuggee.actions.start_debugging = (function (){
    async function handler(content){
        if(content!=undefined){        
            Blockly_Debuggee.actions["breakpoint"].update(content.breakpoints);
            Blockly_Debuggee.actions["runToCursor"].cursorBreakpoint = content.cursorBreakpoint;
            Blockly_Debuggee.actions["watch"].update(content.watches);
            Blockly_Debuggee.actions["variables"].update(content.variables);
            var variables = Blockly_Debuggee.actions["variables"].getVariables();
            var watches = Blockly_Debuggee.actions["watch"].getWatches();
            var def_variables_code = Blockly_Debuggee.actions["variables"].define_variables();
            var variablesWatches_code = "eval(update_values()); Blockly_Debuggee.actions[\"variables\"].updateDebugger(); Blockly_Debuggee.actions[\"watch\"].updateDebugger();";        
            await eval(def_variables_code + " function evalLocal(expr){eval(expr);} Blockly_Debuggee.actions[\"eval\"].evalLocal = evalLocal;" + "async function code(){ " + content.code + variablesWatches_code + "}; code(); ");

            postMessage({"type": "execution_finished"});
        } else {
            window.alert("The content is undefined.");
        }
    };

    async function $id(update_values, wait_call, code){
        return code;
    };

    async function wait(nest, block_id, CurrentSystemEditorId){
        //evalLocal("window.alert(n + \"!!!!!\");");
        await Blockly_Debuggee.wait(nest, block_id, CurrentSystemEditorId);
    };

    function isStepOver(){
        return Blockly_Debuggee.state.isState("stepOver");
    };


    function isStepParent(){
        return Blockly_Debuggee.state.isState("stepParent");
    };

    return {
        handler : handler
    };
})();


dispatcher.start_debugging = Blockly_Debuggee.actions["start_debugging"].handler;


