# Изображения в FSD структуре

## Правила размещения изображений

### 1. `public/` - Глобальные ресурсы
- Favicon, иконки приложения
- PWA иконки
- Статические файлы, доступные по прямому URL

### 2. `shared/assets/images/` - Переиспользуемые изображения
- Логотипы
- Общие иллюстрации
- Иконки, используемые в UI компонентах
- Placeholder изображения

### 3. Внутри slices - Специфичные изображения
- `entities/user/ui/assets/` - аватары пользователей (если нужны дефолтные)
- `entities/task/ui/assets/` - иконки типов задач
- `features/create-task/ui/assets/` - изображения для фичи создания таски

### 4. `pages/*/assets/` - Изображения страниц
- Фоновые изображения страниц
- Специфичные иллюстрации для конкретной страницы

## Примеры использования

```tsx
// Из shared/assets
import logo from '@/shared/assets/images/logo.svg';

// Из entities
import defaultAvatar from '@/entities/user/ui/assets/default-avatar.png';

// Из public (по URL)
<img src="/images/global-icon.png" />
```
