```ftl
[@someCustomMacroCall showOperatorColumn = "${entity.showOperatorColumn?then('true', 'false')} && !disableOperation"
  entity = entity
  dataName = "data"
  showOperatorColumn = "${entity.showOperatorColumn?then('true', 'false')} && !disableOperation"
/]
```
