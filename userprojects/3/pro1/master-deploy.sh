green=`tput setaf 2`
reset=`tput sgr0`

# echo "${green}killing all node processes${reset}"
# killall -9 node

yes = | head -30 | paste -s -d '' -

echo "${green}killing all pm2 signal processes${reset}"
# pm2 kill
pm2 delete signal


yes = | head -30 | paste -s -d '' -

echo "${green}remove build folder${reset}"
rm -rf build

yes = | head -30 | paste -s -d '' -

echo "${green}generating new build${reset}"
npm run build


yes = | head -30 | paste -s -d '' -

echo "${green}starting server${reset}"
pm2 start build/index.js --node-args="--max-old-space-size=8096" --name="signal" --log-date-format="DD-MM-YYYY HH:mm Z" -f -- 446

yes = | head -30 | paste -s -d '' -
