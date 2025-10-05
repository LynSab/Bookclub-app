# chapters.

A book club management app.

Most book clubs I have been in use messaging apps to organise meetings. This can be inconvenient as you may need to scroll back to find the details. This app aims to solve that problem by having the details in an easily accessible and central location.

This app will allow users to create book clubs manage members and meeting details. 

It also provides book club members with a quick easy way to see the details for the next meeting.

## Features still to be added

* Bookclub ownership (admin)
* Membership deletion by club owner
* Membership deletion by member
* Email notification system
* Discussion boards


## Development setup

1. Clone the repository.

2. Install dependancies by running the command `npm install` for both the bookclub-backend and bookclub-frontend folders.

3. Create the MySQL database by running the following SQL file `bookclub_app_db_creation.sql`

4. Make a copy of the `.env.template` file, add your DB credentials and JWT secret. Then rename the file to `.env`

## Running in development mode

#### To run the frontend:

```bash
# ./bookclub-frontend
npm run dev
```

The frontend will be served at `http://localhost:5173/`

#### To run the backend express server:

```bash
# ./bookclub-backend
npm run dev
```

The backend express server will be run on `http://localhost:8080/`