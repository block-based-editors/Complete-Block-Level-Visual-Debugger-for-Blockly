import {Blockly_Debugger} from '../../../debugger/debugger.js';

  Blockly.BlockSvg.prototype.showContextMenu_ = function(e) {
    if (this.workspace.options.readOnly || !this.contextMenu) {
      return;
    }
    // Save the current block in a variable for use in closures.
    var block = this;
    var menuOptions = [];
  
    if (this.isDeletable() && this.isMovable() && !block.isInFlyout) {
      menuOptions.push(Blockly.ContextMenu.blockDuplicateOption(block));
      if (this.isEditable() && !this.collapsed_ &&
          this.workspace.options.comments) {
        menuOptions.push(Blockly.ContextMenu.blockCommentOption(block));
      }
  
      // Option to make block inline.
      if (!this.collapsed_) {
        for (var i = 1; i < this.inputList.length; i++) {
          if (this.inputList[i - 1].type != Blockly.NEXT_STATEMENT &&
              this.inputList[i].type != Blockly.NEXT_STATEMENT) {
            // Only display this option if there are two value or dummy inputs
            // next to each other.
            var inlineOption = {enabled: true};
            var isInline = this.getInputsInline();
            inlineOption.text = isInline ?
                Blockly.Msg['EXTERNAL_INPUTS'] : Blockly.Msg['INLINE_INPUTS'];
            inlineOption.callback = function() {
              block.setInputsInline(!isInline);
            };
            menuOptions.push(inlineOption);
            break;
          }
        }
      }
  
      if (this.workspace.options.collapse) {
        // Option to collapse/expand block.
        if (this.collapsed_) {
          var expandOption = {enabled: true};
          expandOption.text = Blockly.Msg['EXPAND_BLOCK'];
          expandOption.callback = function() {
            block.setCollapsed(false);
          };
          menuOptions.push(expandOption);
        } else {
          var collapseOption = {enabled: true};
          collapseOption.text = Blockly.Msg['COLLAPSE_BLOCK'];
          collapseOption.callback = function() {
            block.setCollapsed(true);
          };
          menuOptions.push(collapseOption);
        }
      }
  
      if (this.workspace.options.disable) {
        // Option to disable/enable block.
        var disableOption = {
          text: this.disabled ?
              Blockly.Msg['ENABLE_BLOCK'] : Blockly.Msg['DISABLE_BLOCK'],
          enabled: !this.getInheritedDisabled(),
          callback: function() {
            block.setDisabled(!block.disabled);
          }
        };
        menuOptions.push(disableOption);
      }
  
      menuOptions.push(Blockly.ContextMenu.blockDeleteOption(block));


      // Breakpoints
      var breakpointOption = {
        text: (!Blockly_Debugger.actions["Breakpoint"].breakpoints.includes(block.id)) ? "Add Breakpoint" : "Remove Breakpoint",
        enabled: true,
        callback: function() {
            if(!Blockly_Debugger.actions["Breakpoint"].breakpoints.includes(block.id)) {
              Blockly_Debugger.actions["Breakpoint"].breakpoints.push(block.id);
              block.setCollapsed(false);                                  // expand the block if it is collapted 
            } else {
              var index = Blockly_Debugger.actions["Breakpoint"].breakpoints.indexOf(block.id);
              if (index !== -1) Blockly_Debugger.actions["Breakpoint"].breakpoints.splice(index, 1);
            }
            Blockly_Debugger.actions["Breakpoint"].handler();
          }
      };
      menuOptions.push(breakpointOption);

      // Run to cursor
      var runToCursorOption = {
        text: "Run to cursor",
        enabled: true,
        callback: function() {
          Blockly_Debugger.actions["RunToCursor"].handler(block.id);
        }
      };
      menuOptions.push(runToCursorOption);

      var watchOption = {
        text:(!Blockly_Debugger.actions["Watch"].getWatches().map((obj)=>{return obj.name;}).includes(block.toString())) ? "Add Watch" : "Remove Watch",
        enabled: (block.outputConnection==null) ? false : true,
        callback: function(){
          var code = Blockly.JavaScript.myBlockToCode(block);
          var name = block.toString();

          var new_watch = {
            "name": name,
            "code": code, 
            "value": undefined
          }
          if(!Blockly_Debugger.actions["Watch"].getWatches().map((obj)=>{return obj.name;}).includes(name)){
            Blockly_Debugger.actions["Watch"].getWatches().push(new_watch);
          }else{
            var index = Blockly_Debugger.actions["Watch"].getWatches().map((obj)=>{return obj.name;}).indexOf(name);
            if (index !== -1) Blockly_Debugger.actions["Watch"].getWatches().splice(index, 1);
          }
          Blockly_Debugger.actions["Watch"].handler();  
        }
      }
      menuOptions.push(watchOption);


      // Evaluate
      var evalOption = {
        text: "Evaluate",
        enabled: (block.type === "variables_set" || block.type==="math_change") ? true : false,
        //enabled: true,
        callback: function(){
          console.log(block);
        }
      };
      menuOptions.push(evalOption);   
    }

    menuOptions.push(Blockly.ContextMenu.blockHelpOption(block));


  
    // Allow the block to add or modify menuOptions.
    if (this.customContextMenu) {
      this.customContextMenu(menuOptions);
    }
  
    Blockly.ContextMenu.show(e, menuOptions, this.RTL);
    Blockly.ContextMenu.currentBlock = this;
  };




