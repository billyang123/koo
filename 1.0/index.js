/**
 * @fileoverview 
 * @author zhongzhi,zizhu<wb-yangbinbin@taobao.com>
 * @module koo
 **/
KISSY.add("gallery/koo/1.0/index", function(S, Node, MenuButton) {
  var $, KooForm, calendar, editor, getParam, holderSupport, instance, kooId, one, result, saving, showdate, validateField, _addValidation, _calConfig;
  $ = Node.all;
  one = Node.one;
  holderSupport = true;
  if (!!S.UA.ie && S.UA.ie < 9) {
    holderSupport = false;
  }
  kooId = parseInt(Math.random() * 100000);
  saving = false;
  _addValidation = null;
  calendar = null;
  editor = null;
  instance = function(config, callback, addValidation, _calendar, calConfig, _editor, editorConfig) {
    var target;
    if (typeof config === "object" && !!config.target) {
      if (!!config.calendar) {
        calendar = config.calendar;
      }
      if (!!config.editor) {
        editor = config.editor;
      }
      if (!!config.callback && typeof callback === "function") {
        this.callback = config.callback;
      }
      if (!!config.calConfig) {
        this.calConfig = config.calConfig;
      }
      if (!!config.editorConfig) {
        this.editorConfig = config.editorConfig;
      }
      if (!!config.addValidation) {
        _addValidation = config.addValidation;
      }
      target = config.target;
    } else {
      target = config;
      calendar = _calendar;
      editor = _editor;
      if (!!callback && typeof callback === "function") {
        this.callback = callback;
      }
      if (!!calConfig) {
        this.calConfig = calConfig;
      }
      if (!!editorConfig) {
        this.editorConfig = editorConfig;
      }
      if (!!addValidation) {
        _addValidation = addValidation;
      }
    }
    if (!target) {
      return;
    }
    if (typeof target === "string") {
      this.form = $(target);
    } else {
      this.form = target;
    }
    if (this.form.length < 1) {
      return;
    }
    if (this.form[0].tagName !== "FORM") {
      this.form = $("form", this.form);
    }
    this.form.on("submit", this.check);
    this.editors = [];
    this.bind();
    this.bindSelect();
    return this.bindArea();
  };
  instance.prototype.check = function(e) {
    var elem, elems, haveError, i, result, temp, _i, _ref;
    if (saving) {
      e.halt();
      return false;
    }
    saving = true;
    haveError = false;
    elems = $("input,select,textarea", this.form);
    for (i = _i = 0, _ref = elems.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      elem = $(elems[i]);
      temp = getParam(elem);
      if (temp === void 0) {
        continue;
      }
      if (temp.length > 0 && !validateField(elem, temp)) {
        haveError = true;
      }
    }
    saving = false;
    if (!!this.callback) {
      result = this.callback(!haveError);
      if (typeof result === "boolean") {
        haveError = !result;
      }
    }
    if (haveError) {
      e.halt();
    }
    return !haveError;
  };
  instance.prototype.bind = function() {
    var data, elems, holder, i, objType, p, temp, val, _current, _el, _i, _ref, _results;
    elems = $("input", this.form);
    _results = [];
    for (i = _i = 0, _ref = elems.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      _el = $(elems[i]);
      temp = getParam(_el);
      if (!temp) {
        continue;
      }
      _el.on("focusout", function(e) {
        var check, holder, target;
        target = $(e.currentTarget);
        check = getParam(target);
        if (!!check && check[0].length > 0) {
          validateField(target, check);
        }
        if (!holderSupport && target.val() === "") {
          holder = " " + target.attr("placeholder") + "  ";
          target.addClass("koo-holder");
          return target.val(holder);
        }
      });
      holder = _el.attr("placeholder");
      if (holder && !holderSupport) {
        holder = " " + holder + "  ";
        _el.addClass("koo-holder");
        _el.val(holder);
        _el.on("focusin", function(e) {
          var target;
          target = $(e.currentTarget);
          holder = " " + target.attr("placeholder") + "  ";
          if (target.val() === holder) {
            target.val("");
            return target.removeClass("koo-holder");
          }
        });
      }
      if (!temp || temp.length < 1) {
        continue;
      }
      objType = _el.attr("type");
      if (objType === "radio" && temp[0] === _el.val()) {
        _el.attr("checked", "true");
      }
      if (objType === "checkbox") {
        data = "," + temp[0] + ",";
        val = "," + _el.val() + ",";
        if (data.indexOf(val) > -1) {
          _el.attr("checked", "true");
        }
      }
      if (!calendar) {
        continue;
      }
      _results.push((function() {
        var _j, _len, _results1;
        _results1 = [];
        for (_j = 0, _len = temp.length; _j < _len; _j++) {
          p = temp[_j];
          if (p === "date") {
            _current = _el;
            if (!this.calConfig) {
              this.calConfig = {
                popup: true,
                triggerType: ["click"],
                closable: true
              };
            }
            _results1.push(new calendar(_current, this.calConfig).on("select", function(e) {
              var target;
              target = $("#" + e.currentTarget.id);
              return target.val(S.Date.format(e.date, 'yyyy-mm-dd'));
            }));
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };
  instance.prototype.bindSelect = function() {
    var elem, elems, options, p, select, temp, val, width, _i, _j, _len, _ref;
    elems = $("select", this.form);
    for (_i = 0, _len = elems.length; _i < _len; _i++) {
      elem = elems[_i];
      temp = getParam(elem);
      if (!!temp) {
        val = "," + temp[0] + ",";
        options = $("option", elem);
        for (p = _j = 0, _ref = options.length; 0 <= _ref ? _j < _ref : _j > _ref; p = 0 <= _ref ? ++_j : --_j) {
          if (val.indexOf(options[p].value) > -1) {
            $(options[p]).attr("selected", "selected");
          }
        }
      }
      if ($(elem).hasClass("decorate")) {
        width = $(elem).width();
        select = MenuButton.Select.decorate(elem, {
          prefixCls: "bns-",
          width: width + "px",
          menuCfg: {
            align: {
              points: ['tl', 'tl'],
              offset: [0, -1]
            },
            elStyle: {
              "max-height": "200px",
              overflow: "auto",
              overflowX: "hidden"
            }
          }
        });
      }
    }
    return elems.on("change", function(e) {
      var obj;
      obj = $(e.target);
      temp = getParam(obj);
      if (!!temp) {
        return validateField(obj, temp);
      }
    });
  };
  instance.prototype.bindArea = function() {
    var elems, i, rich, temp, _el, _i, _ref, _results;
    elems = $("textarea", this.form);
    _results = [];
    for (i = _i = 0, _ref = elems.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      _el = $(elems[i]);
      temp = getParam(_el);
      if (!temp) {
        continue;
      }
      if (temp[0] === "editor" && !!editor) {
        if (!this.editorConfig) {
          this.editorConfig = "htmldataprocessor,enterkey,clipboard,sourcearea,preview,separator,undo,separator,removeformat,font,color,separator,list,indent,justify,separator,link,image,smiley,separator,table,resize,maximize";
        }
        rich = editor(_el, {
          attachForm: true,
          baseZIndex: 99
        }).use(this.editorConfig);
        _results.push(this.editors.push(rich));
      } else {
        _results.push(_el.on("focusout", function(e) {
          var check, obj;
          obj = one(e.currentTarget);
          check = getParam(_el);
          if (!check || check.length < 1) {
            return;
          }
          if (check !== null && check[0].length > 0) {
            return validateField(obj, check);
          }
        }));
      }
    }
    return _results;
  };
  getParam = function(target) {
    var template_id;
    template_id = $(target).attr("koo");
    if (!!template_id) {
      return template_id.split("-");
    }
    return void 0;
  };
  validateField = function(field, temp) {
    var before323, c, curent238, error, i, ime, msg, sinbo_id09323, st0911, st0921, st0922, tp_flag, val, _i, _j, _ref, _ref1, _v;
    error = false;
    msg = "";
    val = field.val();
    for (i = _i = 0, _ref = temp.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      tp_flag = temp[i];
      if (temp[i].charAt(0) === "!") {
        if (val === "") {
          error = false;
          continue;
        }
        tp_flag = temp[i].substr(1, temp[i].length - 1);
      }
      ime = false;
      switch (tp_flag) {
        case "need":
          if (S.trim(val) !== val) {
            val = $.trim(val);
            field.val(val);
          }
          if (val === "") {
            error = true;
            msg = "不能为空";
          }
          break;
        case "digit":
          if (!/^[0-9]\d*$/.test(val)) {
            error = true;
            msg = "请输入数字";
          }
          ime = true;
          break;
        case "chinese":
          if (val === "" || !/^[\u4e00-\u9fff]*$/.test(val)) {
            error = true;
            msg = "请输入汉字";
          }
          break;
        case "money":
          if (!/^\d+(\.\d{1,2})?$/.test(val)) {
            error = true;
            msg = "请输入正确的金额";
          }
          ime = true;
          break;
        case "card":
          if (!/^\d{15}|\d{18}$/.test(val)) {
            error = true;
            msg = "请输入身份证号";
          }
          ime = true;
          break;
        case "zip":
          if (!/^[0-9]\d{5}(?!\d)$/.test(val)) {
            error = true;
            msg = "请输入正确的邮编";
          }
          ime = true;
          break;
        case "float":
          if (!/^(-|\+)?\d+(\.\d+)?$/.test(val)) {
            error = true;
            msg = "请输入浮点数字";
          }
          ime = true;
          break;
        case "tel":
          if (!/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|^\d{11}$|^\d{10}$/.test(val)) {
            error = true;
            msg = "请输入电话号码";
          }
          ime = true;
          break;
        case "mobile":
          if (!/^(\+?86)?(13[0-9]|15[0-9]|18[0-9])\d{8}$/.test(val)) {
            error = true;
            msg = "请输入手机号码";
          }
          ime = true;
          break;
        case "char":
          if (val === "" || !/^[a-z\_\-A-Z]*$/.test(val)) {
            error = true;
            msg = "请输入英文字符串";
          }
          ime = true;
          break;
        case "date":
          if (val !== "" && !/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(val)) {
            error = true;
            msg = "请输入正确的日期";
          }
          ime = true;
          break;
        case "mail":
          if (!/^[a-zA-Z0-9_\-]+(\.[_\-|a-z|A-Z|0-9]+)*@[a-z0-9]+(\.[a-z0-9-_]+){1,3}$/.test(val)) {
            error = true;
            msg = "请输入正确的邮箱";
          }
          ime = true;
          break;
        default:
          sinbo_id09323 = tp_flag.substr(1, tp_flag.length - 1).replace("$", "-");
          switch (tp_flag.charAt(0)) {
            case "l":
              st0911 = parseInt(tp_flag.substr(1), 10);
              if (val === "" || val.length !== st0911) {
                error = true;
                msg = "长度必须等于" + st0911 + "位";
              }
              break;
            case "s":
              st0911 = parseInt(tp_flag.substr(1), 10);
              if (val === "" || val.length > st0911) {
                error = true;
                msg = "长度必须小于" + st0911 + "位";
              }
              break;
            case "b":
              st0911 = parseInt(tp_flag.substr(1), 10);
              if (val === "" || val.length < st0911) {
                error = true;
                msg = "长度必须大于" + st0911 + "位";
              }
              break;
            case "<":
              tp_flag = tp_flag.substr(1);
              st0921 = parseInt(tp_flag, 10);
              if (isNaN(st0921)) {
                st0921 = parseInt($('#' + tp_flag).val(), 10);
                msg = "不能小于它";
              }
              if (val === "" || !/^-?([1-9]\d*\.?\d*|0\.?\d*[1-9]\d*|0?\.?0+|0)$/.test(val) || parseFloat(val) >= st0921) {
                error = true;
                msg = "必须小于" + st0921;
              }
              break;
            case ">":
              tp_flag = tp_flag.substr(1);
              st0922 = parseInt(tp_flag, 10);
              if (isNaN(st0922)) {
                st0922 = parseInt($('#' + tp_flag).val(), 10);
                msg = "不能小于它";
              }
              if (val === "" || !/^-?([1-9]\d*\.?\d*|0\.?\d*[1-9]\d*|0?\.?0+|0)$/.test(val) || parseFloat(val) <= st0922) {
                error = true;
                msg = "必须大于" + st0922;
              }
              break;
            case "=":
              if (document.getElementById(sinbo_id09323).value !== val) {
                error = true;
                msg = "两次输入不一致";
              }
              break;
            case "/":
              if (val === "" && document.getElementById(sinbo_id09323).value === "") {
                error = true;
                msg = "至少要填写一项";
              }
              break;
            case "*":
              msg = "必须大于前面时间";
              if (val === "" || document.getElementById(sinbo_id09323).value === "") {
                error = true;
              }
              before323 = document.getElementById(sinbo_id09323).value.split("-");
              curent238 = val.split("-");
              if (before323.length !== curent238.length) {
                error = true;
              } else {
                for (c = _j = 0, _ref1 = before323.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; c = 0 <= _ref1 ? ++_j : --_j) {
                  if (parseInt(before323[c], 10) < parseInt(curent238[c], 10)) {
                    break;
                  } else if (parseInt(before323[c], 10) > parseInt(curent238[c], 10)) {
                    error = true;
                    break;
                  }
                }
              }
              break;
            default:
              if (!!_addValidation && !!_addValidation[tp_flag]) {
                _v = _addValidation[tp_flag];
                if (!new RegExp(_v[0]).test(val)) {
                  error = true;
                  msg = _v[1];
                }
              }
          }
      }
      if (ime) {
        field.css("ime-mode", "disabled");
      }
      if (error) {
        return result(field, true, msg);
      }
    }
    return result(field, false);
  };
  result = function(field, result, msg) {
    var kooRule, next, rndID, tipObject;
    kooRule = field.attr("koo");
    rndID = field.data("rndID");
    if (!rndID) {
      kooId++;
      rndID = "k" + kooId;
      field.data("rndID", rndID);
    }
    tipObject = $("#" + rndID);
    if (tipObject.length === 0) {
      next = $(field.next());
      if (!next && next[0].tagName === "B") {
        next.attr("id", rndID);
        tipObject = $(next);
      }
    }
    if (!result && (tipObject.length === 0 || tipObject[0].nodeName === "B")) {
      if (kooRule.indexOf("success") === -1) {
        return tipObject.remove();
      }
      if (tipObject.length > 0) {
        tipObject.attr("class", "koo-success");
        tipObject.html("&nbsp;");
      } else {
        field.after('<b id="' + rndID + '" class="koo-success">&nbsp;</b>');
      }
      return true;
    }
    if (!!field.attr("warn")) {
      msg = field.attr("warn");
    }
    if (tipObject.length > 0 && tipObject[0].nodeName === "B") {
      tipObject.attr("class", "koo-error");
      tipObject.html(msg);
    } else {
      field.after('<b id="' + rndID + '" class="koo-error">' + msg + '</b>');
    }
    return false;
  };
  KooForm = {};
  KooForm.init = function(config, callback, addValidation, Calendar, calConfig, Editor, editorConfig) {
    return new instance(config, callback, addValidation, Calendar, calConfig, Editor, editorConfig);
  };
  return KooForm;
}, {
  requires: ["node", "menubutton"]
});



