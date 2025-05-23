<#assign inline>something</#assign>

<#assign something>
	multiline
</#assign>

<#list foo.bar as item>
	<@something abc="abc/cba" xyz=item />
</#list>

<#assign
	prop1 = svelteFormVariableName!"entity"
	someOtherProp2 = editable!"true"
	someComplexProp = "This is a complex prop value${foo.bar?some_builtin_function_call(param -> param['foo${abc.xyz?some_builtin_property}'])}"
>

[#if someVar?? && foo.bar?some_builtin_function_call(f -> (f["some prop ${abc}"]!true)]
	Do something
[#else]
	Do something else
[/#if]

<#macro something someProp someOtherProp="defaultValue">
	Contain <#nested>
</#macro>

<@something abc="abc/cba" xyz=item>This is a inline macro call</@something>
<@something abc="abc/cba" xyz=item>This is a inline macro call too</@>
<@something abc="abc/cba" xyz=item /> This is a inline macro call without closing tag 

This is a multiline macro call without nested content
[@something someProp = "${foo.bar?then('true', 'false')} some other string"
	foo = foo
	bar = "data"
	someProp2 = "${foo.bar?then('true', 'false')} some other string"
/]

[@something someProp = "${foo.bar?then('true', 'false')} some other string"
	foo = foo
	bar = "data"
	someProp2 = "${foo.bar?then('true', 'false')} some other string"
]
	This a multiline macro call with nested content
[/@something]


[@something someProp = "${foo.bar?then('true', 'false')} some other string"
	foo = foo
	bar = "data"
	someProp2 = "${foo.bar?then('true', 'false')} some other string"
]
	This a multiline macro call with nested content and have a simple closing tag
[/@something]

This is simple value: ${abc}
This is a value with : ${abc?foo?bar(param -> param['foo${abc.xyz?some_builtin_property}'])}
This is a complex nested value: ${abc["abc${abc['abc${abc["abc${abc['abc${abc}']}"]}']}"]}
This is a complex nested value with multiline: ${
	abc[
		"abc${abc['abc${abc["abc${abc['${abc}']}"]}']}"
	]
}
Multiple values in one line: ${foo} something ${bar} something ${zoo}

[@somethings foo=bar prop1="prop1" prop2="prop2" prop3="${foo}other string"; loopVar]
	[#if loopVar??]
		Do something with loopVar
	[#else]
		Do something else
	[/#if]
[/@]

[#if inlineCondition]something[#if someCondition]others[/#if][/#if]
[@if inlineMacroCall]something[@if someCondition]others[/@][/@]


<#-- This is single line comment -->

<#-- 
This is a multiline comment
This is a multiline comment
This is a multiline comment
This is a multiline comment
-->