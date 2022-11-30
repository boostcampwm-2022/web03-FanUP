cd /web03-FanUP
git pull origin main
cd /client
yarn
yarn run build
sudo service nginx restart