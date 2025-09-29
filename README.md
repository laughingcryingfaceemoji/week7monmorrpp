# Usage
 
### Part 1

1. **Install Backend Dependencies**  
   
   - Navigate to the `backend-no-auth` directory and install the necessary dependencies:
   - Rename the `.env.example` file to `.env` in the backend directory.   
   ```sh
   cd backend-no-auth 
   npm install
   npm run dev
   ```

2. **Install Frontend Dependencies & Start the App**  
   Navigate to the frontend directory, install dependencies, and start the application:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the App**  
   Open your browser and visit: [http://localhost:3000](http://localhost:3000)
   

### Part 2


   - Stop the server, if it is running.
   - Navigate to the `backend-auth` directory and install the necessary dependencies:
   - Rename the `.env.example` file to `.env` in the backend directory.
   ```sh
   cd backend-auth 
   npm install
   npm run dev
   ```

### Part 3

  

   - Stop the server, if it is running.
   - Navigate to the `backend-protected` directory and install the necessary dependencies:
   - Rename the `.env.example` file to `.env` in the backend directory.
   ```sh
   cd backend-protected 
   npm install
   npm run dev
   ```


> [!IMPORTANT]
> ## Project Changes (Implemented Features)
>
>   - Routing & Guards
>   - Added route: `/jobs/:id` → `JobPage` (view single job).
>   - Added route: `/edit-job/:id` → `EditJobPage` (update job).
>   - Protected routes: `/add-job` and `/edit-job/:id` redirect unauthenticated users to `/login`.
>   - Redirect authenticated users away from `/login` and `/signup` to `/`.
>
>   - Jobs List & Cards
>   - `JobListings.jsx`: fetches jobs from `/api/jobs`, with loading/error states.
>   - `JobListing.jsx`: accepts `job` prop, links to `JobPage`, title styled in pink, “View Job” is a styled button.
>
>   - JobPage (Single Job)
>   - Fetches job by id, shows details.
>   - Delete job with confirmation; navigates back to `/` after success.
>   - Shows “Edit Job” and “Delete Job” buttons only when authenticated.
>   - Sends `Authorization: Bearer <token>` header on DELETE.
>
>   - EditJobPage (Update Job)
>   - Prefills form with existing data, submits PUT to `/api/jobs/:id`, navigates back to job page after success.
>   - Uses same form styles as AddJobPage.
>   - Sends `Authorization` header on PUT.
>
>   - AddJobPage (Create Job)
>   - Added full form state and POST to `/api/jobs`.
>   - Awaits POST before navigation to ensure list refresh on Home.
>   - Sends `Authorization` header on POST (for protected backend scenario).
>
>   - Navbar & Auth UI
>   - Replaced `<a>` with React Router `Link` for SPA navigation.
>   - Shows user name/email when logged in; hides `Login`/`Signup`.
>   - Hides `Add Job` link for unauthenticated users.
>   - Added `Logout` (clears `localStorage` and resets user state).
>
>   - App State (Auth)
>   - `App.jsx` loads `user` from `localStorage`, passes `user` to `Navbar`/`JobPage`, and `setUser` to `Login`/`Signup`.
>
>   - Styles
>   - Introduced generic button classes: `.btn`, `.btn-danger` (+ hover via existing rules).
>   - Unified button appearance (font, padding, min-width) for consistent sizing.
>   - Ensured title/link color in job cards is pink.
>
>   Notes
>   - Token lookup uses `user.token` or `user.accessToken` from `localStorage`. Adjust if backend returns a different field name.
>
