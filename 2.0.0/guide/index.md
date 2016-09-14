## 综述

koo是表单初始化与验证控件，通过标签koo属性值初始化数据和验证

* 版本：2.0.0
* 作者：zhongzhi,zizhu
* 标签：
* demo：[http://kg.kissyui.com/koo/2.0.0/demo/index.html](http://kg.kissyui.com/koo/2.0.0/demo/index.html)

## 初始化组件
javascript

    KISSY.use('kg/koo/2.0.0/index',function(S, Koo, Cal, _){
          Koo.init("#J_bnsHandle");
          //也可以Koo.init({target:"#J_bnsHandle", callback:void 0});
    });

html

    <form action="#" id="J_bnsHandle">
      <input type="text" placeholder="必填标签" koo="need-success">
      <input type="text" placeholder="数字" koo="digit-success"/>
    </form>

## confing参数
### agument
config, callback, addValidation, Calendar, calConfig
### json对象参数
<table class="table table-bordered table-striped table-condensed">
  <tr>
    <td>字段</td>
    <td>类型</td>
    <td>含义</td>
    <td>说明</td>
  </tr>
  <tr>
    <td>target</td>
    <td>HTMLElement|string</td>
    <td>表单容器</td>
    <td>form表单，如果targetName不是form标签，则会获取target内的form标签</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>function</td>
    <td>回调</td>
    <td>提交表单前的回调;参数含boolean值,true为表单验证无误，false为表单验证有;返回值为boolean值，返回false可阻止表单提交</td>
  </tr>
  <tr>
    <td>calendar</td>
    <td>object</td>
    <td>日历组件</td>
    <td>可选,依赖calendar组件,用时需引入</td>
  </tr>
  <tr>
    <td>calConfig</td>
    <td>object</td>
    <td>日历组件参数</td>
    <td>可选,日历组件配置参数，详细可查看:[日历组件](http://kg.kissyui.com/calendar/1.2/guide/index.html)</td>
  </tr>
  <tr>
    <td>addValidation</td>
    <td>object</td>
    <td>自定义验证添加</td>
    <td>json对象，对象名为koo值，对象值为数组 [正则表达式的模式或其他正则表达式的字符串,错误提示] 值如 addValidation:{"zzd":["^[0-9]\\d*$","必须为数字"]}。注:正则字符串"\" 需要转义，在"\"前再加一个"\"。</td>
  </tr>
</table>
## koo属性值
依赖html代码input的koo属性，值为验证字符，多个用"-"隔开 如:< input type="text" koo="need-digit" />
<table>
  <tr>
    <td><b>koo值</b></td>
    <td><b>验证</b></td>
  </tr>
  <tr>
    <td>"need"</td>
    <td>不能为空</td>
  </tr>
  <tr>
    <td>"digit"</td>
    <td>数字</td>
  </tr>
  <tr>
    <td>"char"</td>
    <td>英文字符</td>
  </tr>
  <tr>
    <td>"chinese"</td>
    <td>中文</td>
  </tr>
  <tr>
    <td>"money"</td>
    <td>金额</td>
  </tr>
  <tr>
    <td>"card"</td>
    <td>身份证</td>
  </tr>
  <tr>
    <td>"zip"</td>
    <td>邮编</td>
  </tr>
  <tr>
    <td>"float"</td>
    <td>浮点数</td>
  </tr>
  <tr>
    <td>"tel"</td>
    <td>电话号码</td>
  </tr>
  <tr>
    <td>"mobile"</td>
    <td>手机号码</td>
  </tr>
  <tr>
    <td>"mail"</td>
    <td>邮箱</td>
  </tr>
  <tr>
    <td>"data"</td>
    <td>日期</td>
  </tr>
  <tr>
    <td>"l"</td>
    <td>长度等于某个值 如< input type="text" koo="l10" />长度必须等于10,</td>
  </tr>
  <tr>
    <td>"s"</td>
    <td>长度必须小于某个值 如 < input type="text" koo="s10" />长度必须小于10,</td>
  </tr>
  <tr>
    <td>"b"</td>
    <td>长度必须大于某个值 如 < input type="text" koo="b10" />长度必须大于10,</td>
  </tr>
  <tr>
    <td>"success"</td>
    <td>验证正确后的提示，如koo="need-success",验证正确后，input后面会加一个 b.koo-success标签</td>
  </tr>
  <tr>
    <td>"<" 或 ">"</td>
    <td>值小于或大于 某个值或某个input节点的value值,如 < input type="text" koo=">10" />值大于10,< input type="text" koo="digit" id="flage" value="10" /> < input type="text" koo=">flage" />个input的value须大于第一个值</td>
  </tr>
  <tr>
    <td> "="</td>
    <td>两次输入一致 < input type="text" koo="digit" id="flage" value="10"/>< input type="text" koo="=flage" />第二个与第一个输入一致</td>
  </tr>
  <tr>
    <td>"/" </td>
    <td>至少要填一个，同上</td></tr>
  <tr>
    <td>"*" </td>
    <td>必须大于前面时间，同上</td>
  </tr>
</table>
## 功能
##### 1,标签验证
单个输入框验证,如

    <input type="text" koo="need" placeholder="不能为空"/>
    <input type="text" koo="need-digit-char"  placeholder="数字和字符"/>
    <input type="text" koo=">10" placeholder="大于10的数字"/>
    <input type="text" koo=">10-<20" placeholder="大于10小于20的数字"/>

##### 2,联合验证
多个输入框有一定的关系,如必须与前面的相等(可以是字符串和数字),大于或小于前面的数字(必须是数字)等

    <input type="text" koo="digit" id="flage" placeholder="数字"/>
    <input type="text" koo="=flage" placeholder="必须与前面的相等"/>

##### 3,自定义提示
通过warn属性值,< input type="text" koo="need-digit-char-chinese" warn="格式错误"/> "格式错误"为校验错误时提示的文案
##### 4,数据初始化
可以使select,radio,checkbox的默认选中<br/><br/>
\*复选框

    <input type="checkbox" name="test" value="0" koo="2,6" />
    <input type="checkbox" name="test" value="6" koo="2,6" />
    <input type="checkbox" name="test" value="2" koo="2,6" />

默认value值为2,6的选中

\*单选框

    <input type="radio" name="test" value="0" koo="2">
    <input type="radio" name="test" value="1" koo="2">
    <input type="radio" name="test" value="2" koo="2">

默认value值为2的选中

\*下拉框

    <select koo="1,3">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
    </select>

默认value值为1和3的选中

##### 5,自定义验证
参数名为addValidation,其为json对象,里面的对象名为koo值,对象值为数组["字符串(正则表达式的模式|其他正则表达式|字符串)","错误提示"]。</br>
注:如果自定义koo值与内部koo值相等，则会验证内部koo值的验证，所以最好与内部的koo值不相等。

    Koo.init({
       target:"#J_bnsHandle", 
       callback:void 0, 
       calendar:Cal,
       addValidation:{
         "number":["^[0-9]\\d*$","错误提示,必须为数字"]
       }
     });

##### 6,控件标签(日历)
koo="date",需要引入日历组件

    KISSY.use('kg/calendar/1.2/index,calendar/assets/dpl.css',function(S, Cal, _){
        //code           
    });
            
日历控件配置可通过calConfig参数传入.
默认配置:

    calConfig = {
      popup: true,
      triggerType: ["click"],
      closable: true
    };
