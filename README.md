<div align="center">
    <img src="https://raw.githubusercontent.com/frappe/erpnext/develop/erpnext/public/images/erpnext-logo.png" height="128">
    <h2>ERPNext</h2>
    <p align="center">
        <p>ERP made simple</p>
    </p>

-------------------以上为官方文档-------------------

### 1. App的环境部署
Install git, python, and redis

```
apt install git python-dev redis-server
```
Install MariaDB
```
apt-get install software-properties-common
```
If you are on Ubuntu version older than 20.04, run this before installing MariaDB:
```
apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8
add-apt-repository 'deb [arch=amd64,i386,ppc64el] http://ftp.ubuntu-tw.org/mirror/mariadb/repo/10.3/ubuntu xenial main'
```
If you are on version Ubuntu 20.04, then MariaDB is available in default repo and you can directly run the below commands to install it:
```
apt-get update
apt-get install mariadb-server-10.3
```
During this installation you'll be prompted to set the MySQL root password. If you are not prompted, you'll have to initialize the MySQL server setup yourself. You can do that by running the command:
```
mysql_secure_installation
```
It is really important that you remember this password, since it'll be useful later on. You'll also need the MySQL database development files.
```
apt-get install libmysqlclient-dev
```
Now, edit the MariaDB configuration file.
```
nano /etc/mysql/my.cnf
```
And add this configuration
```
[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[mysql]
default-character-set = utf8mb4
```
Now, just restart the mysql service and you are good to go.
```
service mysql restart
```
###  Install Node
We recommend installing node using nvm
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
After nvm is installed, you may have to close your terminal and open another one. Now run the following command to install node.
```
nvm install 12
```
Verify the installation, by running:
```
node -v
# output
v12.16.2
```
Finally, install yarn using npm
```
npm install -g yarn
```
###  Install wkhtmltopdf
```
apt-get install xvfb libfontconfig wkhtmltopdf
```



### 2. 安装bench
You need to install the following packages for the script to run:
```
$ apt install python3-minimal build-essential python3-setuptools

```

```
$ pip install frappe-bench
```

### 3. 安装App
Create a new bench:

```
$ bench init [bench-name]
```
Add a site under current bench:
```
$ bench new-site [site-name]
```
Download and add applications to bench:
```
$ bench get-app [app-name] [app-link]
```
Install apps on a particular site
```
$ bench --site [site-name] install-app [app-name]
```
Start bench (only for development)
```
$ bench start
```
Show bench help:
```
$ bench --help
```

### Module的添加
1. Serach module in the search bar
2. Choose the module list
3. Write down the module name


### Doctype的添加
1. Serach Doctype in the search bar
2. Choose the Doctype list
3. Write down the Doctype name
4. Define the doctype field  (Doctype is like your data's format) , open "Edit" button and you can select the "show in the grid list" and "mandatory" if you want
5. Choose the view block, define you doctype list(field: <your fieldname>)

### Workspace的添加
1. Serach workspace in the search bar
2. Choose the workspace list
3. Choose the module name
4. Select "Is starded" checkbox if you want to show it in the desk

### Workspace的编写
1. Open your workspace in the desk
2. Click the "Customize" button and then you can add block
3. When you add a block, the framework will generate the file in apps/erpenxt/<your module name>/page(or else...) automaticly, you can code them directly


