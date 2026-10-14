<# :
@echo off
setlocal
title SilkGrow Contributor Setup
powershell -NoProfile -ExecutionPolicy Bypass -Command "Invoke-Expression ([System.IO.File]::ReadAllText('%~f0'))"
pause
goto :eof
#>

$ErrorActionPreference = "Continue"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "         SilkGrow Contributor All-in-One Setup          " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Install prerequisites via winget
$tools = @(
    @{ Name = "Git"; Id = "Git.Git" },
    @{ Name = "VS Code"; Id = "Microsoft.VisualStudioCode" },
    @{ Name = "Node.js (LTS)"; Id = "OpenJS.NodeJS.LTS" },
    @{ Name = "GitHub CLI"; Id = "GitHub.cli" }
)

Write-Host "[1/5] Checking and installing required software..." -ForegroundColor Yellow
foreach ($tool in $tools) {
    Write-Host "--> Checking $($tool.Name)..."
    winget install --id $($tool.Id) --exact --silent --accept-source-agreements --accept-package-agreements 2>$null
}

# Refresh PATH in the running session so newly installed tools work immediately
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# 2. Authenticate GitHub CLI
Write-Host "`n[2/5] GitHub Authentication..." -ForegroundColor Yellow
$authCheck = & gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please login to your GitHub account (a browser window will open):" -ForegroundColor Cyan
    & gh auth login --web -p https
} else {
    Write-Host "GitHub CLI is already authenticated!" -ForegroundColor Green
}

# 3. Fork and clone to their profile
Write-Host "`n[3/5] Forking repo to your GitHub profile and cloning..." -ForegroundColor Yellow
$upstreamRepo = "Prajesh-V/silkgrow"
$targetDir = "$HOME\silkgrow"

if (-not (Test-Path $targetDir)) {
    & gh repo fork $upstreamRepo --clone --remote=true "$targetDir"
    Write-Host "Repository forked and cloned into $targetDir" -ForegroundColor Green
} else {
    Write-Host "Directory $targetDir already exists. Using existing directory." -ForegroundColor Yellow
}

# 4. Install npm dependencies
Write-Host "`n[4/5] Installing project dependencies with npm..." -ForegroundColor Yellow
Set-Location $targetDir
npm install

# 5. Open project in VS Code
Write-Host "`n[5/5] Opening project in VS Code..." -ForegroundColor Green
code .

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host " Setup complete! Your fork is ready in VS Code.         " -ForegroundColor Green
Write-Host ""
Write-Host " When you are ready to make a Pull Request:             " -ForegroundColor White
Write-Host " 1. Create a branch:                                    " -ForegroundColor White
Write-Host "    git checkout -b feature/my-feature                  " -ForegroundColor Gray
Write-Host " 2. Commit your work:                                   " -ForegroundColor White
Write-Host "    git add .                                           " -ForegroundColor Gray
Write-Host "    git commit -m 'Add my feature'                      " -ForegroundColor Gray
Write-Host " 3. Push and submit PR to Prajesh-V/silkgrow:           " -ForegroundColor White
Write-Host "    gh pr create --web                                  " -ForegroundColor Gray
Write-Host "========================================================" -ForegroundColor Cyan
