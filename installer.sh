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
    else
      command curl -fsSL https://deno.land/x/install/install.sh | sh
    fi
    ;;
  "msys")
    command iwr https://deno.land/x/install/install.ps1 -useb | iex
    ;;
  "darwin"*)
    command brew install deno
    ;;
  *)
    echo "cannot found OSTYPE"
    ;;
esac
command deno run installer.ts