#!/bin/bash

# Fungsi untuk mengganti nama file/folder
rename_all() {
  find . -depth -name "* *" | while read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file")
    newbase=$(echo "$base" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
    newfile="${dir}/${newbase}"
    if [ "$file" != "$newfile" ]; then
      echo "Renaming: $file -> $newfile"
      mv "$file" "$newfile"
    fi
  done

  # Ubah huruf kapital menjadi kecil untuk semua nama file & folder
  find . -depth | while read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file")
    newbase=$(echo "$base" | tr '[:upper:]' '[:lower:]')
    newfile="${dir}/${newbase}"
    if [ "$file" != "$newfile" ] && [ ! -e "$newfile" ]; then
      echo "Lowercasing: $file -> $newfile"
      mv "$file" "$newfile"
    fi
  done
}

# Jalankan hanya pada direktori tertentu
echo "Running rename script..."
rename_all
echo "Done!"
