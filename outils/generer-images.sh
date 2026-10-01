#!/bin/sh
# Régénère public/og-image.jpg et public/apple-touch-icon.png à partir des pages HTML de outils/,
# avec Chrome en mode sans fenêtre (macOS). Lancer après `npm install` : les polices viennent de
# node_modules.
set -eu

cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"

capturer() {
  # $1 = page source, $2 = largeur, $3 = hauteur, $4 = fichier PNG produit
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --virtual-time-budget=3000 --window-size="$2,$3" --screenshot="$4" "file://$PWD/$1" >/dev/null 2>&1
}

capturer outils/og-image.html 1200 630 "$TMP/og.png"
sips -s format jpeg -s formatOptions 88 "$TMP/og.png" --out public/og-image.jpg >/dev/null

capturer outils/apple-touch-icon.html 180 180 public/apple-touch-icon.png

rm -rf "$TMP"
echo "Images régénérées : public/og-image.jpg, public/apple-touch-icon.png"
