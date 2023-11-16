#!/usr/bin/env bash

# INSTALLER of deno
echo 'checking os ...'
case "$OSTYPE" in
  "linux-gnu"*)
    echo 'check distribution'
    # ONLY FOR AUR
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$NAME
        VER=$VERSION_ID
    fi
    if [[ "$OS" == "Manjaro Linux" ]]; then
      # NEED PASSWORD
      command sudo pacman -S --noconfirm --needed deno
      OS="arch"
    else
      command curl -fsSL https://deno.land/x/install/install.sh | sh
      OS="linux"
    fi
    ;;
  "msys")
    command iwr https://deno.land/x/install/install.ps1 -useb | iex
    OS="msys"
    ;;
  "darwin"*)
    command brew install deno
    OS="darwin"
    ;;
  *)
    echo "cannot found OSTYPE"
    OSTYPE=0
    ;;
esac
command deno run --allow-env --allow-run --allow-read="./**/*" main.ts install $OS