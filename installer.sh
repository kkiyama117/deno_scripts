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
#  if [[ "$OS" == ""]]
#  else
#    curl -fsSL https://deno.land/x/install/install.sh | sh
#  fi
#  echo "$OS"
  echo "$VER"
esac

#if [[ "$OSTYPE" == "linux-gnu"* ]]; then
#  # PASS
#elif [[ "$OSTYPE" == "darwin"* ]]; then
#        # Mac OSX
#elif [[ "$OSTYPE" == "cygwin" ]]; then
#        # POSIX compatibility layer and Linux environment emulation for Windows
#elif [[ "$OSTYPE" == "msys" ]]; then
#        # Lightweight shell and GNU utilities compiled for Windows (part of MinGW)
#elif [[ "$OSTYPE" == "win32" ]]; then
#        # I'm not sure this can happen.
#elif [[ "$OSTYPE" == "freebsd"* ]]; then
#        # ...
#else
#        # Unknown.
#fi;while [  ]; do
#
#done