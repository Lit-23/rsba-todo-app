## Initial Set up and Installations (Laravel + React + Inertia)
Inside the desired directory, open a terminal(e.g. git bash, cmd, etc.) to run the installation commands.

- laravel new project-name  <!-- this will install laravel with options for frontend frameworks, choose react, there will be more options after this you can just choose the default. -->
- cd project-name <!-- access the newly created project directory and install necessary dependencies -->
- npm install axios <!-- axios is one of the topic during my interview. So I decided to use it instead of the inertia's useForms and router method. -->
- npm install react-icons --save
- npm install
- composer install

Laravel already configured Tailwind on their setup, so theres no need to install it manually.

## Database Configuration (PostgreSQL)
I prefer to use postgre over mysql on my local development, since with mysql I still need to put the project directory to xampp's htdocs.

I am using PgAdmin4 for Postgre. 
DownloadLink: https://www.pgadmin.org/download/
After downloading and installing the app, create a database.

Configure the Database Details in your .env to Connect the Database and your application. Sample Config:
- DB_CONNECTION=pgsql
- DB_HOST=127.0.0.1                      <!-- default -->
- DB_PORT=5432                           <!-- default -->
- DB_DATABASE=rs_bernaldo_associates     <!-- database name -->
- DB_USERNAME=postgres                   <!-- this is the default -->
- DB_PASSWORD=1234                       <!-- the password on your db if theres any -->

Once done, you now run:
- php artisan migrate   <!-- to migrate all your database tables -->
- npm run dev           <!-- on terminal 1 run this command -->
- php artisan serve     <!-- open another terminal and run this command. the project is now running on your local browser. -->

That is all for the Installation and Configuration of Laravel + React Project.