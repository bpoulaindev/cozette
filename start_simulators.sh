#!/bin/zsh
declare -a simulators=("3824BF24-04E4-469F-937C-8720231B0ABA" "CD0D5B10-9624-489F-A999-6771D395658E" "4DD1E2B2-FE88-4E75-8909-AAAFB0457E41")
echo "STARTED"
open -a Simulator
for i in $simulators[@]
do (
    echo "Boot $i"
    xcrun simctl boot $i
    echo "Install Expo $i"
    xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.26.4.tar.app
    echo "Lauch Expo $i"
    xcrun simctl openurl $i exp://127.0.0.1:19000 ) &
done
wait
echo "FINISHED"
