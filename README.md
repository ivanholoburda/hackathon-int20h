# 🚀 Production Deployment

This project is already live! You can test it out yourself:

🔗 **Live Demo:** [http://34.59.234.46/](http://34.59.234.46/)

🔑 **Admin Panel Access:**  
- **URL:** [http://34.59.234.46/admin](http://34.59.234.46/admin)  
- **Username:** `admin@admin.com`  
- **Password:** `Secret123!`

---

## 📦 Installation with Docker

### Prerequisites

Ensure you have the following installed:

- [Docker](http://www.docker.com) (v1.17.0+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v1.14.0+)

---

## 🛠 Installation Steps

### 1️⃣ Clone the Repository & Setup Environment

```sh
git clone <repository-name>
cd <project-folder>
cp .env.example .env
npm install
npm run build  # Or use: npm run dev
```
📝 Note: Be sure to configure the .env file properly. Pay special attention to Pusher and GitHub OAuth settings.
### 2️⃣ Build the Project Using Docker
```sh
# Remove development tools
docker exec -it laravel_app composer remove backpack/devtools

# Install dependencies
docker exec -it laravel_app composer install

# Generate application key
docker exec -it laravel_app php artisan key:generate

# Create symbolic link for storage
docker exec -it laravel_app php artisan storage:link

# Run migrations
docker exec -it laravel_app php artisan migrate

# Install front-end dependencies
docker exec -it laravel_app npm install

# Build front-end assets
docker exec -it laravel_app npm run build
```
Once completed, you can access the main page at 🔗 http://localhost

### 👑 Creating an Admin User
After a successful installation, you might want to create an admin user for the panel. To do so, run the following command and provide the necessary details:
```sh
docker exec -it laravel_app php artisan app:create-admin
```
Now, you're all set! 🚀🎉
