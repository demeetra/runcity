# Usage

## wsl
`wsl --cd /root/runcity -d UbuntuRuncity`

## Web
`npm run web`

## Andorid:
1. win `.\AppData\Local\Android\Sdk\platform-tools\adb.exe -a nodaemon server start`
2. win `.\AppData\Local\Android\Sdk\emulator\emulator.exe -avd Pixel_3a_API_33_x86_64 -no-snapshot-load`  (last option only for cold boot)
3. wsl `npx react-native start --host 127.0.0.1`
4. wsl `npx react-native run-android --variant=debug --deviceId emulator-5554 --active-arch-only`

---

# Environment

## Android cmdline-tools
```
mkdir -p ~/Android/sdk/cmdline-tools/tools
# extract cmdline-tools into
chmod +x ~/Android/sdk/cmdline-tools/tools/bin/*
# add to ~/.bashrc:
export ANDROID_HOME="$HOME/Android/sdk"
if [ -d "$ANDROID_HOME/cmdline-tools/tools/bin" ] ; then
    PATH="$PATH:$ANDROID_HOME/cmdline-tools/tools/bin"
fi
if [ -d "$ANDROID_HOME/platform-tools" ] ; then
    PATH="$PATH:$ANDROID_HOME/platform-tools"
fi

# relogin or source ~/.bashrc
sdkmanager platform-tools
```

## wsl env (add to ~/.bashrc)
```
export WSL_HOST=$(tail -1 /etc/resolv.conf | cut -d' ' -f2)
export ADB_SERVER_SOCKET=tcp:$WSL_HOST:5037
```
## repo init 
```
apt install openjdk-17-jdk
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
nvm install -b --lts v18.12.1
# unpack cmdline-tools (see above) and run sdkmanager platform-tools
# last version: https://www.npmjs.com/package/react-native-template-typescript?activeTab=versions
npx react-native init runcity --template react-native-template-typescript@6.12.10
npm install react-dom@18.1.0
npm install react-native-web@0.18.10 --legacy-peer-deps
npm install --save-dev babel-loader url-loader webpack webpack-cli  webpack-dev-server html-webpack-plugin babel-plugin-react-native-web
```
