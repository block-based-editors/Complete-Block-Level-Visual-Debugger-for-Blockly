!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},a.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=2)}([function(e,t,a){"use strict";a.r(t),a.d(t,"Blockly_Debuggee",function(){return n}),a.d(t,"window",function(){return r}),a.d(t,"dispatcher",function(){return s});var n={actions:{},state:{currNest:0,currId:"",promptMsg:void 0,stepWait:!1,currState:{stepIn:!1,stepOver:!1,stepParent:!1,stepOut:!1,continue:!0},isState:function(e){return this.currState[e]},setState:function(e){this.currState.stepIn=!1,this.currState.stepOver=!1,this.currState.stepParent=!1,this.currState.stepOut=!1,this.currState.continue=!1,this.currState[e]=!0}}};n.wait=function(){function e(){return e=0,new Promise(t=>setTimeout(t,e));var e}return async function(t,a,r){!function(e,t){postMessage({type:"highlightBlock",data:{id:e,CurrentSystemEditorId:t}})}(a,r);var s=n.actions.breakpoint.includes(a)||n.actions.runToCursor.cursorBreakpoint===a;if(!n.state.isState("continue")||s){if((-1!=n.state.currNest||s)&&(n.state.isState("stepIn")||s||t<=n.state.currNest)){if(n.state.currId===a&&!s)return;if(n.state.isState("stepParent")&&t==n.state.currNest&&!s)return;for(n.actions.variables.updateDebugger();!n.state.stepWait;)await e();n.state.stepWait=!1,n.state.currId=a,n.state.isState("stepOut")?(n.state.currNest=-1,n.state.currState.stepOut=!1):n.state.currNest=t}}else n.state.currNest=t}}();var r={alert:function(e){postMessage({type:"alert",data:e})},prompt:async function(e){for(postMessage({type:"prompt",data:e});void 0==n.state.promptMsg;)await new Promise(e=>setTimeout(e,0));var t=n.state.promptMsg;return n.state.promptMsg=void 0,t}},s={prompt:e=>{n.state.promptMsg=e}}},function(e,t,a){"use strict";var n=a(0);n.Blockly_Debuggee.actions.watch={},n.Blockly_Debuggee.actions.variables={},n.Blockly_Debuggee.actions.watch=function(){var e=[];return{handler:function(t){e=t,console.log("Handler:"),console.log(e)},includes:function(t){return e.includes(t)},update:function(t){e=t,console.log("Update:"),console.log(e)},update_values:function(){for(var t="",a=0;a<e.length;++a)t+="watches["+a+"].value = "+e[a].code+";\n";return"var temp_nest = Blockly_Debuggee.state.currNest;  \n                          \nBlockly_Debuggee.state.currNest = -1;\n"+t+"Blockly_Debuggee.state.currNest = temp_nest;"},getWatches:function(){return e},updateDebugger:function(){postMessage({type:"watches",data:e})}}}(),n.Blockly_Debuggee.actions.variables=function(){var e=[];return{update:function(t){e=t},update_values:function(){for(var t="",a=0;a<e.length;++a)t+="variables["+a+"].value = "+e[a].name+";\n";return t},getVariables:function(){return e},updateDebugger:function(){postMessage({type:"variables",data:e})},define_variables:function(){for(var t="",a=0;a<e.length;++a)t+="var "+e[a].name+";\n";return t}}}(),n.dispatcher.watch=n.Blockly_Debuggee.actions.watch.handler},function(e,t,a){"use strict";a.r(t);var n=a(0);n.Blockly_Debuggee.actions.continue={},n.Blockly_Debuggee.actions.continue.handler=(()=>{n.Blockly_Debuggee.state.stepWait=!0,n.Blockly_Debuggee.state.setState("continue")}),n.dispatcher.continue=n.Blockly_Debuggee.actions.continue.handler,n.Blockly_Debuggee.actions.breakpoint={},n.Blockly_Debuggee.actions.breakpoint=function(){var e=[];return{handler:function(t){e=t},includes:function(t){return e.includes(t)},update:function(t){e=t}}}(),n.Blockly_Debuggee.actions.runToCursor=function(){return{cursorBreakpoint:"",handler:function(e){n.Blockly_Debuggee.actions.runToCursor.cursorBreakpoint=e,n.Blockly_Debuggee.state.stepWait=!0}}}(),n.dispatcher.breakpoint=n.Blockly_Debuggee.actions.breakpoint.handler,n.dispatcher.runToCursor=n.Blockly_Debuggee.actions.runToCursor.handler,n.Blockly_Debuggee.actions.stepIn={},n.Blockly_Debuggee.actions.stepOver={},n.Blockly_Debuggee.actions.stepOut={},n.Blockly_Debuggee.actions.stepParent={},n.Blockly_Debuggee.actions.stepIn.handler=(()=>{n.Blockly_Debuggee.state.stepWait=!0,n.Blockly_Debuggee.state.setState("stepIn")}),n.Blockly_Debuggee.actions.stepOver.handler=(()=>{n.Blockly_Debuggee.state.stepWait=!0,n.Blockly_Debuggee.state.setState("stepOver")}),n.Blockly_Debuggee.actions.stepOut.handler=(()=>{n.Blockly_Debuggee.state.stepWait=!0,n.Blockly_Debuggee.state.setState("stepOut")}),n.Blockly_Debuggee.actions.stepParent.handler=(()=>{n.Blockly_Debuggee.state.stepWait=!0,n.Blockly_Debuggee.state.setState("stepParent")}),n.dispatcher.stepIn=n.Blockly_Debuggee.actions.stepIn.handler,n.dispatcher.stepOver=n.Blockly_Debuggee.actions.stepOver.handler,n.dispatcher.stepOut=n.Blockly_Debuggee.actions.stepOut.handler,n.dispatcher.stepParent=n.Blockly_Debuggee.actions.stepParent.handler;a(4),a(1);onmessage=function(e){let t=e.data;n.dispatcher[t.type](t.data)}},,function(module,__webpack_exports__,__webpack_require__){"use strict";var _init_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),_watches_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(1),Blockly_Debuggee=__webpack_require__(0).Blockly_Debuggee,window=__webpack_require__(0).window;function update_values(){return Blockly_Debuggee.actions.variables.update_values()}Blockly_Debuggee.actions.start_debugging=function(){async function handler(content){if(void 0!=content){Blockly_Debuggee.actions.breakpoint.update(content.breakpoints),Blockly_Debuggee.actions.runToCursor.cursorBreakpoint=content.cursorBreakpoint,Blockly_Debuggee.actions.watch.update(content.watches),Blockly_Debuggee.actions.variables.update(content.variables);var variables=Blockly_Debuggee.actions.variables.getVariables(),watches=Blockly_Debuggee.actions.watch.getWatches(),def_variables_code=Blockly_Debuggee.actions.variables.define_variables(),variables_code='await eval(update_values()); Blockly_Debuggee.actions["variables"].updateDebugger();';await eval("async function code(){ "+def_variables_code+content.code+variables_code+"}; code();"),postMessage({type:"execution_finished"})}else window.alert("The content is undefined.")}async function $id(e,t,a){return a}async function wait(e,t,a){await Blockly_Debuggee.wait(e,t,a)}function isStepOver(){return Blockly_Debuggee.state.isState("stepOver")}function isStepParent(){return Blockly_Debuggee.state.isState("stepParent")}return{handler:handler}}(),_init_js__WEBPACK_IMPORTED_MODULE_0__.dispatcher.start_debugging=Blockly_Debuggee.actions.start_debugging.handler}]);
//# sourceMappingURL=debuggee.js.map