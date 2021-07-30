curl 'https://www.hermes.com/us/en/product/pop-h-pendant-H147991FO55/' \
    -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36' \
    -H 'accept-language: en-US,en;q=0.9' \
    --compressed > out.txt


if grep -q "We’re sorry. The page you were looking for no longer exists." out.txt; then
    echo found
else
    echo not found
fi