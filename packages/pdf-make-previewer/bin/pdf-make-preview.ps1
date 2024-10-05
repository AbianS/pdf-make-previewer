#!/usr/bin/env powershell

$basedir = Split-Path $MyInvocation.MyCommand.Definition -Parent
node "$basedir\..\dist\index.js" $args