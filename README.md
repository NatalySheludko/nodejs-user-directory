# ContactsApp

**ContactsApp** – це бекенд частина веб-додатку яка використовує бекенд API для роботи та керування контактами користувачів та самих користувачів. Додаток дозволяє створювати, змінювати, переглядати та видаляти контакти, 
а також здійснювати аутентифікацію користувачів. Використовує базу даних MongoDB для збереження контактної інформації та надає API-документацію через Swagger.

## Основні функції

- **Реєстрація користувача:** Реєструє нового користувача з унікальним email та хешованим паролем.
- **Логін:** Авторизує користувача за допомогою email і паролю, видає JWT токен.
- **Логаут:** Видаляє поточну сесію користувача.
- **Оновлення токену (Refresh):** Видає новий токен доступу за допомогою refresh-токену.
- **Робота з контактами:**
  - Створення нового контакту: Додає новий контакт до бази даних.
  - Перегляд усіх контактів: Отримує список усіх контактів, з можливістю фільтрації.
  - Перегляд детальної інформації про контакт: Показує деталі контакту, включаючи дані користувача.
  - Оновлення контактів: Змінює інформацію про контакт за допомогою PATCH-запиту.
  - Видалення контакту: Видаляє контакт із бази даних.
  - Завантаження фотографій: Додає фото контакту через Cloudinary.

## Технічні вимоги

- **Платформа:** Node.js
- **База даних:** MongoDB
- **Документація:** Swagger
- **Мідлвери:** `validateBody` для валідації вхідних даних
- **Аутентифікація та безпека:** для захисту приватних роутів використовується JWT-токен. Авторизація здійснюється через заголовок Authorization: Bearer <token>.
- **Фреймворк:** Express
- **Запити до API:** Axios
- **Файлові завантаження:** Cloudinary для фото контактів

## Встановлення та запуск

1. Клонувати репозиторій:
   ```bash
   git clone https://github.com/NatalySheludko/nodejs-user-directory.git
2. Встановити залежності:
   ```bash
   npm install
3. Запустити сервер:
   ```bash
   npm run dev
4. Перегляд документації:
   ```bash
   npm run preview-docs

## API
- POST /auth/register – реєстрація нового користувача.
- POST /auth/login – логін користувача.
- POST /auth/logout – вихід із системи.
- POST /auth/refresh – оновлення токену доступу.
- POST /auth/send-reset-email - надсилання email-повідомлень для скидання пароля.
- POST /auth/reset-pwd - зміна пароля користувача за підтвердженням валідного токену для скидання пароля.
- GET /auth/get-oauth-url - отримання Google OAuth посилання для автентифікації користувача.
- POST /auth/confirm-oauth - підтвердження Google OAuth автентифікації користувача через створення нової сесії.

- GET /user - отримання інформації про користувача.
- PATCH /users/avatar - оновлення зображення користувача.
- PATCH /user - оновлення інформації про користувача .
- PUT /user/{id} - оновлення інформації про користувача.
 
- POST /contacts – створення нового контакту.
- GET /contacts – отримання списку всіх контактів із можливістю фільтрації. Приклади використання фільтрації:
    - GET /contacts?page=1&perPage=10&sortBy=isFavourite&sortOrder=asc
    - GET /contacts?contactType=work&createdAfter=2023-01-01
    - GET /contacts?isFavourite=true&contactType=personal
- GET /contacts/{id} – отримання деталей про конкретний контакт.
- PATCH /contacts/{id} – оновлення даних контакту (також оновлення зображення контакта).
- DELETE /contacts/{id} – видалення контакту.

## Документація API через Swagger
Swagger-документація доступна за роутом /api-docs за допомогою пакету swagger-ui-express. Вона містить інформацію про всі доступні ендпоінти та їх параметри.

## Додаткові функції
Відправка листів: Інтеграція з Brevo для надсилання email-повідомлень (наприклад, скидання паролю).
Файлове завантаження: Фотографії контактів завантажуються на Cloudinary і зберігаються в базі даних.

## Запуск проєкту на Render.com
Проєкт можна задеплоїти на Render.com. Для цього деплоїть гілку main, переконавшись, що API-документація доступна та всі ендпоінти коректно працюють.