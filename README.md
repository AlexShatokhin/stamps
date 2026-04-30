# Stamps

**Stamps** — это веб-приложения для удобного отслеживания кофейных штампов, построенное на стеке Next + TanStack Query + NestJS + Prisma.  
Проект позволяет вести учет кофейных шатмпов посетителями, а также управлять своим заведением через админ. панель.

---

## 🚀 Функционал

- Регистрация и авторизация пользователей
- Распределение ролей
- Отключение нерабочих аккаунтов
- Просмотр зарегестрированных заведений
- Создание и настройка собственного заведения
- Адаптивный дизайн для разных устройств
- Валидация форм и уведомления об ошибках

---

## 🛠️ Основные зависимости

### Frontend (`client`):

- **Next** 
- **TanStack Query**
- **shadcn**
- **Tailwind** 
- **React Hook Form + Zod**

### Backend (`server`):

- **NestJS** 
- **JWT**
- **Prisma**
- **bcryptjs** 
- **MySQL**
---

## 📦 Установка и запуск (Backend)

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/AlexShatokhin/stamps.git
   cd stamps
  ``

2. **Установите зависимости для клиента:**
   ```bash
    npm install
  ``

3. **Настройте переменные окружения для сервера:**
    Создайте файл .env в корне проекта:
   ```bash
    DATABASE_URL= __secret__
    JWT_SECRET = __secret__
    JWT_ACCESS_EXPIRATION = __secret__
    JWT_REFRESH_EXPIRATION = __secret__
    PORT= __secret__
  ``


4. **Запустите в режиме разработки:**
   ```bash
    cd client
    npm run start:dev
  ``
  

## 🖼️ Swagger

http://localhost:<PORT>/api#/

![Swagger1](./images/swagger1.png)
![Swagger2](./images/swagger2.png)
![Swagger3](./images/swagger3.png)




