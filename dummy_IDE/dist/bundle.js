!function(t){var e={};function a(o){if(e[o])return e[o].exports;var l=e[o]={i:o,l:!1,exports:{}};return t[o].call(l.exports,l,l.exports,a),l.l=!0,l.exports}a.m=t,a.c=e,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},a.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=3)}([,,,function(t,e,a){"use strict";a.r(e);var o=function(){var t,e={};function a(){return void 0!==t}return{Instance:function(){return void 0===t&&(t=new Worker("./dist/debuggee.js"),e.alert=(t=>{window.alert(t)}),e.prompt=(t=>{o.Instance().postMessage({type:"prompt",data:window.prompt(t)})}),e.highlightBlock=(t=>{window.workspace[t.CurrentSystemEditorId].traceOn_=!0,window.workspace[t.CurrentSystemEditorId].highlightBlock(t.id)}),e.execution_finished=(()=>{t=void 0}),t.onmessage=function(t){let a=t.data,o=a.data;e[a.type](o)}),t},Stop:function(){a()&&(t.terminate(),t=void 0)},AddOnDispacher:function(t,a){e[t]=a},hasInstance:a}}(),l={actions:{}};l.actions.Continue={},l.actions.Continue.handler=(()=>{o.Instance().postMessage({type:"continue"})}),l.actions.StepIn={},l.actions.StepOver={},l.actions.StepParent={},l.actions.StepOut={},l.actions.StepIn.handler=(()=>{o.hasInstance()&&o.Instance().postMessage({type:"stepIn"})}),l.actions.StepOver.handler=(()=>{o.hasInstance()&&o.Instance().postMessage({type:"stepOver"})}),l.actions.StepParent.handler=(()=>{o.hasInstance()&&o.Instance().postMessage({type:"stepParent"})}),l.actions.StepOut.handler=(()=>{o.hasInstance()&&o.Instance().postMessage({type:"stepOut"})}),l.actions.Stop={},l.actions.Stop.handler=(()=>{o.Stop()}),l.actions.Watch={},l.actions.Variables={},l.actions.Watch=function(){var t=[];return{handler:function(){dispatchEvent(new Event("updateWatchesTable")),o.hasInstance()&&o.Instance().postMessage({type:"watch",data:t})},update:function(e){t=e,console.log("Upadated watch Debugger:"),console.log(t),dispatchEvent(new Event("updateWatchesTable"))},getWatches:function(){return t},init:function(){for(var e=0;e<t.length;++e)t[e].value=void 0}}}(),l.actions.Variables=function(){var t=[];return{update:function(e){t=e,dispatchEvent(new Event("updateTable"))},getVariables:function(){return t},init:function(){var e=[];e[0]=window.workspace.blockly1.getAllVariables().map(t=>t.name),e[1]=window.workspace.blockly2.getAllVariables().map(t=>t.name);for(var a=0;a<e.length;a++)for(var o=t.map(t=>t.name),l=0;l<e[a].length;++l)if(!o.includes(e[a][l])){var n={name:e[a][l],value:void 0};t.push(n)}dispatchEvent(new Event("updateTable"))}}}(),o.AddOnDispacher("watches",l.actions.Watch.update),o.AddOnDispacher("variables",l.actions.Variables.update),l.actions.Start={},l.actions.Start.handler=(t=>{if(!o.hasInstance()){Blockly.JavaScript.STATEMENT_PREFIX="await $id(%1, 0);\n";var e=Blockly.JavaScript.workspaceToCode(window.workspace.blockly1),a=Blockly.JavaScript.workspaceToCode(window.workspace.blockly2),n=e+a;l.actions.Variables.init(),l.actions.Watch.init(),t instanceof MouseEvent&&(t=""),o.Instance().postMessage({type:"start_debugging",data:{code:n,breakpoints:l.actions.Breakpoint.breakpoints,cursorBreakpoint:t,watches:l.actions.Watch.getWatches(),variables:l.actions.Variables.getVariables()}}),console.log(e+a)}}),l.actions.Breakpoint={},l.actions.RunToCursor={},l.actions.Breakpoint.breakpoints=[],l.actions.Breakpoint.handler=(()=>{o.hasInstance()&&o.Instance().postMessage({type:"breakpoint",data:l.actions.Breakpoint.breakpoints})}),l.actions.RunToCursor.handler=(t=>{o.hasInstance()?o.Instance().postMessage({type:"runToCursor",data:t}):l.actions.Start.handler(t)});var n={nest:-1,currentSystemEditorId:null};Blockly.JavaScript.lists_length=function(t){return["("+(Blockly.JavaScript.valueToCode(t,"VALUE",Blockly.JavaScript.ORDER_MEMBER)||"[]")+").length",Blockly.JavaScript.ORDER_MEMBER]},Blockly.JavaScript.lists_isEmpty=function(t){return["!("+(Blockly.JavaScript.valueToCode(t,"VALUE",Blockly.JavaScript.ORDER_MEMBER)||"[]")+").length",Blockly.JavaScript.ORDER_LOGICAL_NOT]},Blockly.JavaScript.lists_indexOf=function(t){var e="FIRST"==t.getFieldValue("END")?"indexOf":"lastIndexOf",a=Blockly.JavaScript.valueToCode(t,"FIND",Blockly.JavaScript.ORDER_NONE)||"''",o="("+(Blockly.JavaScript.valueToCode(t,"VALUE",Blockly.JavaScript.ORDER_MEMBER)||"[]")+")."+e+"("+a+")";return t.workspace.options.oneBasedIndex?[o+" + 1",Blockly.JavaScript.ORDER_ADDITION]:[o,Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.lists_getIndex=function(t){var e=t.getFieldValue("MODE")||"GET",a=t.getFieldValue("WHERE")||"FROM_START",o="RANDOM"==a?Blockly.JavaScript.ORDER_COMMA:Blockly.JavaScript.ORDER_MEMBER,l=Blockly.JavaScript.valueToCode(t,"VALUE",o)||"[]";switch(l="("+l+")",a){case"FIRST":if("GET"==e)return[r=l+"[0]",Blockly.JavaScript.ORDER_MEMBER];if("GET_REMOVE"==e)return[r=l+".shift()",Blockly.JavaScript.ORDER_MEMBER];if("REMOVE"==e)return l+".shift();\n";break;case"LAST":if("GET"==e)return[r=l+".slice(-1)[0]",Blockly.JavaScript.ORDER_MEMBER];if("GET_REMOVE"==e)return[r=l+".pop()",Blockly.JavaScript.ORDER_MEMBER];if("REMOVE"==e)return l+".pop();\n";break;case"FROM_START":var n=Blockly.JavaScript.getAdjusted(t,"AT");if("GET"==e)return[r=l+"["+n+"]",Blockly.JavaScript.ORDER_MEMBER];if("GET_REMOVE"==e)return[r=l+".splice("+n+", 1)[0]",Blockly.JavaScript.ORDER_FUNCTION_CALL];if("REMOVE"==e)return l+".splice("+n+", 1);\n";break;case"FROM_END":var r;n=Blockly.JavaScript.getAdjusted(t,"AT",1,!0);if("GET"==e)return[r=l+".slice("+n+")[0]",Blockly.JavaScript.ORDER_FUNCTION_CALL];if("GET_REMOVE"==e)return[r=l+".splice("+n+", 1)[0]",Blockly.JavaScript.ORDER_FUNCTION_CALL];if("REMOVE"==e)return l+".splice("+n+", 1);";break;case"RANDOM":if(r=Blockly.JavaScript.provideFunction_("listsGetRandomItem",["function "+Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(list, remove) {","  var x = Math.floor(Math.random() * list.length);","  if (remove) {","    return list.splice(x, 1)[0];","  } else {","    return list[x];","  }","}"])+"("+l+", "+("GET"!=e)+")","GET"==e||"GET_REMOVE"==e)return[r,Blockly.JavaScript.ORDER_FUNCTION_CALL];if("REMOVE"==e)return r+";\n"}throw"Unhandled combination (lists_getIndex)."},Blockly.JavaScript.lists_setIndex=function(t){var e=Blockly.JavaScript.valueToCode(t,"LIST",Blockly.JavaScript.ORDER_MEMBER)||"[]",a=t.getFieldValue("MODE")||"GET",o=t.getFieldValue("WHERE")||"FROM_START",l=Blockly.JavaScript.valueToCode(t,"TO",Blockly.JavaScript.ORDER_ASSIGNMENT)||"null";function n(){if(e.match(/^\w+$/))return"";var t=Blockly.JavaScript.variableDB_.getDistinctName("tmpList",Blockly.Variables.NAME_TYPE),a="var "+t+" = "+e+";\n";return e=t,a}switch(e="("+e+")",o){case"FIRST":if("SET"==a)return e+"[0] = "+l+";\n";if("INSERT"==a)return e+".unshift("+l+");\n";break;case"LAST":if("SET"==a){var r=n();return r+=e+"["+e+".length - 1] = "+l+";\n"}if("INSERT"==a)return e+".push("+l+");\n";break;case"FROM_START":var c=Blockly.JavaScript.getAdjusted(t,"AT");if("SET"==a)return e+"["+c+"] = "+l+";\n";if("INSERT"==a)return e+".splice("+c+", 0, "+l+");\n";break;case"FROM_END":c=Blockly.JavaScript.getAdjusted(t,"AT",1,!1,Blockly.JavaScript.ORDER_SUBTRACTION),r=n();if("SET"==a)return r+=e+"["+e+".length - "+c+"] = "+l+";\n";if("INSERT"==a)return r+=e+".splice("+e+".length - "+c+", 0, "+l+");\n";break;case"RANDOM":r=n();var i=Blockly.JavaScript.variableDB_.getDistinctName("tmpX",Blockly.Variables.NAME_TYPE);if(r+="var "+i+" = Math.floor(Math.random() * "+e+".length);\n","SET"==a)return r+=e+"["+i+"] = "+l+";\n";if("INSERT"==a)return r+=e+".splice("+i+", 0, "+l+");\n"}throw"Unhandled combination (lists_setIndex)."},Blockly.JavaScript.lists_split=function(t){var e=Blockly.JavaScript.valueToCode(t,"INPUT",Blockly.JavaScript.ORDER_MEMBER),a=Blockly.JavaScript.valueToCode(t,"DELIM",Blockly.JavaScript.ORDER_NONE)||"''",o=t.getFieldValue("MODE");if("SPLIT"==o){e||(e="''");var l="split"}else{if("JOIN"!=o)throw"Unknown mode: "+o;e||(e="[]");l="join"}return["("+e+")."+l+"("+a+")",Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.lists_reverse=function(t){return["("+(Blockly.JavaScript.valueToCode(t,"LIST",Blockly.JavaScript.ORDER_FUNCTION_CALL)||"[]")+").slice().reverse()",Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.procedures_defreturn=function(t){var e=Blockly.JavaScript.variableDB_.getName(t.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),a=Blockly.JavaScript.statementToCode(t,"STACK");if(Blockly.JavaScript.STATEMENT_PREFIX){var o=t.id.replace(/\$/g,"$$$$");a=Blockly.JavaScript.prefixLines(Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,"eval(update_values()), await wait(0, '"+o+"', '"+n.currentSystemEditorId+"')"),Blockly.JavaScript.INDENT)+a}Blockly.JavaScript.INFINITE_LOOP_TRAP&&(a=Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,"'"+t.id+"'")+a);var l=Blockly.JavaScript.valueToCode(t,"RETURN",Blockly.JavaScript.ORDER_NONE)||"";l=l?"  let $returnValue = "+l+";\n  if(Blockly_Debuggee.state.currNest != -1) Blockly_Debuggee.state.currState.parent = false;\n  Blockly_Debuggee.state.currNest = global_nest;\n  return $returnValue;\n":"  if(Blockly_Debuggee.state.currNest != -1) Blockly_Debuggee.state.currState.parent = false;\n  Blockly_Debuggee.state.currNest = global_nest;\n  return;\n";for(var r=[],c=0;c<t.arguments_.length;c++)r[c]=Blockly.JavaScript.variableDB_.getName(t.arguments_[c],Blockly.Variables.NAME_TYPE);var i="async function "+e+"("+r.join(", ")+") {\n  let global_nest = Blockly_Debuggee.state.currNest;\n  if(isStepOver() || isStepParent()) Blockly_Debuggee.state.currNest = -1;\n"+a+l+"}";return i=Blockly.JavaScript.scrub_(t,i),Blockly.JavaScript.definitions_["%"+e]=i,null},Blockly.JavaScript.procedures_defnoreturn=Blockly.JavaScript.procedures_defreturn,Blockly.JavaScript.procedures_callreturn=function(t){for(var e=Blockly.JavaScript.variableDB_.getName(t.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),a=[],o=0;o<t.arguments_.length;o++)a[o]=Blockly.JavaScript.valueToCode(t,"ARG"+o,Blockly.JavaScript.ORDER_COMMA)||"null";return["await "+e+"("+a.join(", ")+")",Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.procedures_callnoreturn=function(t){for(var e=Blockly.JavaScript.variableDB_.getName(t.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),a=[],o=0;o<t.arguments_.length;o++)a[o]=Blockly.JavaScript.valueToCode(t,"ARG"+o,Blockly.JavaScript.ORDER_COMMA)||"null";return"await "+e+"("+a.join(", ")+");\n"},Blockly.JavaScript.procedures_ifreturn=function(t){var e="if ("+(Blockly.JavaScript.valueToCode(t,"CONDITION",Blockly.JavaScript.ORDER_NONE)||"false")+") {\n  Blockly_Debuggee.state.currNest = global_nest;\n  Blockly_Debuggee.state.currState.parent = false;\n";t.hasReturnValue_?e+="  return "+(Blockly.JavaScript.valueToCode(t,"VALUE",Blockly.JavaScript.ORDER_NONE)||"null")+";\n":e+="  return;\n";return e+="}\n"};a(5);Blockly.Generator.prototype.blockToCode=function(t){if(!t)return"";if(t.disabled)return this.blockToCode(t.getNextBlock());var e=this[t.type];goog.asserts.assertFunction(e,'Language "%s" does not know how to generate code for block type "%s".',this.name_,t.type);var a=++n.nest,o=e.call(t,t);if(n.nest--,goog.isArray(o))return goog.asserts.assert(t.outputConnection,//!! New blockly 
'Expecting string from statement block "%s".',t.type),this.STATEMENT_PREFIX&&(o[0]="await $id(eval(update_values()), await wait("+a+", '"+t.id+"', '"+n.currentSystemEditorId+"'), "+o[0]+")"),[this.scrub_(t,o[0]),o[1]];if(goog.isString(o)){t.id.replace(/\$/g,"$$$$");return this.STATEMENT_PREFIX&&(o=this.STATEMENT_PREFIX.replace(/%1/g,"eval(update_values()), await wait("+a+", '"+t.id+"', '"+n.currentSystemEditorId+"') ")+o),this.scrub_(t,o)}if(null===o)return"";goog.asserts.fail("Invalid code generated: %s",o)},Blockly.Generator.prototype.addLoopTrap=function(t,e){return e=e.replace(/\$/g,"$$$$"),this.INFINITE_LOOP_TRAP&&(t=this.INFINITE_LOOP_TRAP.replace(/%1/g,"'"+e+"'")+t),this.STATEMENT_PREFIX&&(t+=this.prefixLines(this.STATEMENT_PREFIX.replace(/%1/g,"eval(update_values()), await wait("+n.nest+", '"+e+"', '"+n.currentSystemEditorId+"')"),this.INDENT)),t},Blockly.Generator.prototype.workspaceToCode=function(t){t||(console.warn("No workspace specified in workspaceToCode call.  Guessing."),t=Blockly.getMainWorkspace());var e=[];this.init(t);var a=t.getTopBlocks(!0);n.currentSystemEditorId=t.systemEditorId;var o="\n// start source code of another editor\n";e.push(o);for(var l,r=0;l=a[r];r++)o=this.blockToCode(l),goog.isArray(o)&&(o=o[0]),o&&(l.outputConnection&&this.scrubNakedValue&&(o=this.scrubNakedValue(o)),e.push(o));return e=e.join("\n"),e=(e=(e=(e=this.finish(e)).replace(/^\s+\n/,"")).replace(/\n\s+$/,"\n")).replace(/[ \t]+\n/g,"\n")},Blockly.Generator.prototype.myBlockToCode=function(t){if(!t||t.disabled)return"";this.init(t.workspace);var e=this[t.type],a=this.STATEMENT_PREFIX;this.STATEMENT_PREFIX=null,goog.asserts.assertFunction(e,'Language "%s" does not know how to generate code for block type "%s".',this.name_,t.type);var o=e.call(t,t);return goog.isArray(o)?(goog.asserts.assert(t.outputConnection,'Expecting string from statement block "%s".',t.type),this.STATEMENT_PREFIX=a,this.scrub_(t,o[0])):goog.isString(o)?(this.STATEMENT_PREFIX=a,this.scrub_(t,o)):null===o?(this.STATEMENT_PREFIX=a,""):void goog.asserts.fail("Invalid code generated: %s",o)},Blockly.BlockSvg.prototype.showContextMenu_=function(t){if(!this.workspace.options.readOnly&&this.contextMenu){var e=this,a=[];if(this.isDeletable()&&this.isMovable()&&!e.isInFlyout){if(a.push(Blockly.ContextMenu.blockDuplicateOption(e)),this.isEditable()&&!this.collapsed_&&this.workspace.options.comments&&a.push(Blockly.ContextMenu.blockCommentOption(e)),!this.collapsed_)for(var o=1;o<this.inputList.length;o++)if(this.inputList[o-1].type!=Blockly.NEXT_STATEMENT&&this.inputList[o].type!=Blockly.NEXT_STATEMENT){var n={enabled:!0},r=this.getInputsInline();n.text=r?Blockly.Msg.EXTERNAL_INPUTS:Blockly.Msg.INLINE_INPUTS,n.callback=function(){e.setInputsInline(!r)},a.push(n);break}if(this.workspace.options.collapse)if(this.collapsed_){var c={enabled:!0};c.text=Blockly.Msg.EXPAND_BLOCK,c.callback=function(){e.setCollapsed(!1)},a.push(c)}else{var i={enabled:!0};i.text=Blockly.Msg.COLLAPSE_BLOCK,i.callback=function(){e.setCollapsed(!0)},a.push(i)}if(this.workspace.options.disable){var s={text:this.disabled?Blockly.Msg.ENABLE_BLOCK:Blockly.Msg.DISABLE_BLOCK,enabled:!this.getInheritedDisabled(),callback:function(){e.setDisabled(!e.disabled)}};a.push(s)}a.push(Blockly.ContextMenu.blockDeleteOption(e));var p={text:l.actions.Breakpoint.breakpoints.includes(e.id)?"Remove Breakpoint":"Add Breakpoint",enabled:!0,callback:function(){if(l.actions.Breakpoint.breakpoints.includes(e.id)){var t=l.actions.Breakpoint.breakpoints.indexOf(e.id);-1!==t&&l.actions.Breakpoint.breakpoints.splice(t,1)}else l.actions.Breakpoint.breakpoints.push(e.id),e.setCollapsed(!1);l.actions.Breakpoint.handler()}};a.push(p);var u={text:"Run to cursor",enabled:!0,callback:function(){l.actions.RunToCursor.handler(e.id)}};a.push(u);var d={text:l.actions.Watch.getWatches().map(t=>t.name).includes(e.toString())?"Remove Watch":"Add Watch",enabled:null!=e.outputConnection,callback:function(){var t=Blockly.JavaScript.myBlockToCode(e),a=e.toString(),o={name:a,code:t,value:void 0};if(l.actions.Watch.getWatches().map(t=>t.name).includes(a)){var n=l.actions.Watch.getWatches().map(t=>t.name).indexOf(a);-1!==n&&l.actions.Watch.getWatches().splice(n,1)}else l.actions.Watch.getWatches().push(o);l.actions.Watch.handler()}};a.push(d);var E={text:"Evaluate",enabled:"variables_set"===e.type||"math_change"===e.type,callback:function(){console.log(e)}};a.push(E)}a.push(Blockly.ContextMenu.blockHelpOption(e)),this.customContextMenu&&this.customContextMenu(a),Blockly.ContextMenu.show(t,a,this.RTL),Blockly.ContextMenu.currentBlock=this}};a(6);addEventListener("updateTable",function(){let t=l.actions.Variables.getVariables();document.getElementById("variables").innerHTML="";for(var e=0;e<t.length;++e)document.getElementById("variables").innerHTML+="<tr>\n                                                            <td>"+t[e].name+"</td>\n                                                            <td>"+t[e].value+"</td>\n                                                            <td>"+typeof t[e].value+"</td>\n                                                          </tr>"}),addEventListener("updateWatchesTable",function(){let t=l.actions.Watch.getWatches();document.getElementById("watches").innerHTML="";for(var e=0;e<t.length;++e)document.getElementById("watches").innerHTML+="<tr>\n                                                            <td>"+t[e].name+"</td>\n                                                            <td>"+t[e].code+"</td>\n                                                            <td>"+t[e].value+"</td>\n                                                            <td>"+typeof t[e].value+"</td>\n                                                        </tr>"}),window.workspace={},window.workspace.blockly1=Blockly.inject("blocklyDiv",{media:"../../media/",toolbox:document.getElementById("toolbox")}),window.workspace.blockly1.systemEditorId="blockly1",Blockly.Xml.domToWorkspace(document.getElementById("startBlocks"),window.workspace.blockly1),window.workspace.blockly2=Blockly.inject("blocklyDiv2",{media:"../../media/",toolbox:document.getElementById("toolbox")}),window.workspace.blockly2.systemEditorId="blockly2",Blockly.Xml.domToWorkspace(document.getElementById("startBlocks"),window.workspace.blockly2),document.getElementById("ContinueButton").onclick=l.actions.Continue.handler,document.getElementById("StepInButton").onclick=l.actions.StepIn.handler,document.getElementById("StepOverButton").onclick=l.actions.StepOver.handler,document.getElementById("StepParentButton").onclick=l.actions.StepParent.handler,document.getElementById("StepOutButton").onclick=l.actions.StepOut.handler,document.getElementById("StopButton").onclick=l.actions.Stop.handler,document.getElementById("StartButton").onclick=l.actions.Start.handler},,function(t,e){Blockly.JavaScript.text_length=function(t){return["("+(Blockly.JavaScript.valueToCode(t,"VALUE",Blockly.JavaScript.ORDER_FUNCTION_CALL)||"''")+").length",Blockly.JavaScript.ORDER_MEMBER]},Blockly.JavaScript.text_isEmpty=function(t){return["!("+(Blockly.JavaScript.valueToCode(t,"VALUE",Blockly.JavaScript.ORDER_MEMBER)||"''")+").length",Blockly.JavaScript.ORDER_LOGICAL_NOT]},Blockly.JavaScript.text_indexOf=function(t){var e="FIRST"==t.getFieldValue("END")?"indexOf":"lastIndexOf",a=Blockly.JavaScript.valueToCode(t,"FIND",Blockly.JavaScript.ORDER_NONE)||"''",o="("+(Blockly.JavaScript.valueToCode(t,"VALUE",Blockly.JavaScript.ORDER_MEMBER)||"''")+")."+e+"("+a+")";return t.workspace.options.oneBasedIndex?[o+" + 1",Blockly.JavaScript.ORDER_ADDITION]:[o,Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_charAt=function(t){var e=t.getFieldValue("WHERE")||"FROM_START",a="RANDOM"==e?Blockly.JavaScript.ORDER_NONE:Blockly.JavaScript.ORDER_MEMBER,o=Blockly.JavaScript.valueToCode(t,"VALUE",a)||"''";switch(o="("+o+")",e){case"FIRST":return[o+".charAt(0)",Blockly.JavaScript.ORDER_FUNCTION_CALL];case"LAST":return[o+".slice(-1)",Blockly.JavaScript.ORDER_FUNCTION_CALL];case"FROM_START":return[o+".charAt("+Blockly.JavaScript.getAdjusted(t,"AT")+")",Blockly.JavaScript.ORDER_FUNCTION_CALL];case"FROM_END":return[o+".slice("+Blockly.JavaScript.getAdjusted(t,"AT",1,!0)+").charAt(0)",Blockly.JavaScript.ORDER_FUNCTION_CALL];case"RANDOM":return[Blockly.JavaScript.provideFunction_("textRandomLetter",["function "+Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(text) {","  var x = Math.floor(Math.random() * text.length);","  return text[x];","}"])+"("+o+")",Blockly.JavaScript.ORDER_FUNCTION_CALL]}throw"Unhandled option (text_charAt)."},Blockly.JavaScript.text_getSubstring=function(t){var e=Blockly.JavaScript.valueToCode(t,"STRING",Blockly.JavaScript.ORDER_FUNCTION_CALL)||"''",a=t.getFieldValue("WHERE1"),o=t.getFieldValue("WHERE2");if("FIRST"==a&&"LAST"==o)var l=e;else if(e.match(/^'?\w+'?$/)||"FROM_END"!=a&&"LAST"!=a&&"FROM_END"!=o&&"LAST"!=o){switch(e="("+e+")",a){case"FROM_START":var n=Blockly.JavaScript.getAdjusted(t,"AT1");break;case"FROM_END":n=e+".length - "+(n=Blockly.JavaScript.getAdjusted(t,"AT1",1,!1,Blockly.JavaScript.ORDER_SUBTRACTION));break;case"FIRST":n="0";break;default:throw"Unhandled option (text_getSubstring)."}switch(o){case"FROM_START":var r=Blockly.JavaScript.getAdjusted(t,"AT2",1);break;case"FROM_END":r=e+".length - "+(r=Blockly.JavaScript.getAdjusted(t,"AT2",0,!1,Blockly.JavaScript.ORDER_SUBTRACTION));break;case"LAST":r=e+".length";break;default:throw"Unhandled option (text_getSubstring)."}l=e+".slice("+n+", "+r+")"}else{e="("+e+")";n=Blockly.JavaScript.getAdjusted(t,"AT1"),r=Blockly.JavaScript.getAdjusted(t,"AT2");var c=Blockly.JavaScript.text.getIndex_,i={FIRST:"First",LAST:"Last",FROM_START:"FromStart",FROM_END:"FromEnd"};l=Blockly.JavaScript.provideFunction_("subsequence"+i[a]+i[o],["function "+Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(sequence"+("FROM_END"==a||"FROM_START"==a?", at1":"")+("FROM_END"==o||"FROM_START"==o?", at2":"")+") {","  var start = "+c("sequence",a,"at1")+";","  var end = "+c("sequence",o,"at2")+" + 1;","  return sequence.slice(start, end);","}"])+"("+e+("FROM_END"==a||"FROM_START"==a?", "+n:"")+("FROM_END"==o||"FROM_START"==o?", "+r:"")+")"}return[l,Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_changeCase=function(t){var e={UPPERCASE:".toUpperCase()",LOWERCASE:".toLowerCase()",TITLECASE:null}[t.getFieldValue("CASE")],a=e?Blockly.JavaScript.ORDER_MEMBER:Blockly.JavaScript.ORDER_NONE,o=Blockly.JavaScript.valueToCode(t,"TEXT",a)||"''";if(e)var l="("+o+")"+e;else l=Blockly.JavaScript.provideFunction_("textToTitleCase",["function "+Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(str) {","  return str.replace(/\\S+/g,","      function(txt) {return txt[0].toUpperCase() + txt.substring(1).toLowerCase();});","}"])+"(("+o+"))";return[l,Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_trim=function(t){var e={LEFT:".replace(/^[\\s\\xa0]+/, '')",RIGHT:".replace(/[\\s\\xa0]+$/, '')",BOTH:".trim()"}[t.getFieldValue("MODE")];return["("+(Blockly.JavaScript.valueToCode(t,"TEXT",Blockly.JavaScript.ORDER_MEMBER)||"''")+")"+e,Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_prompt_ext=function(t){if(t.getField("TEXT"))var e=Blockly.JavaScript.quote_(t.getFieldValue("TEXT"));else e=Blockly.JavaScript.valueToCode(t,"TEXT",Blockly.JavaScript.ORDER_NONE)||"''";var a="(await window.prompt("+e+"))";return"NUMBER"==t.getFieldValue("TYPE")&&(a="parseFloat("+a+")"),[a,Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_prompt=Blockly.JavaScript.text_prompt_ext},function(t,e){Blockly.Block.prototype.toString=function(t,e){var a=[],o=e||"?";if(this.collapsed_)a.push(this.getInput("_TEMP_COLLAPSED_INPUT").fieldRow[0].text_);else for(var l,n=0;l=this.inputList[n];n++){for(var r,c=0;r=l.fieldRow[c];c++)r instanceof Blockly.FieldDropdown&&!r.getValue()?a.push(o):a.push(r.getText());if(l.connection){var i=l.connection.targetBlock();if(i){var s=i.toString(void 0,e);s="("+s+")",a.push(s)}else a.push(o)}}return a=goog.string.trim(a.join(" "))||"???",t&&(a=goog.string.truncate(a,t)),a}}]);
//# sourceMappingURL=bundle.js.map