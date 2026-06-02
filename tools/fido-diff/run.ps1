param(
  [string]$Project = "$PSScriptRoot\alfa-fido-diff.json",
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$ExtraArgs
)

$FidoCli = "D:\MS\fido\src\cli.mjs"
& node $FidoCli fido-diff --project $Project @ExtraArgs
