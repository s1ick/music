# 🎵 **Music Player — Тестовое задание Angular**

[![GitHub](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/s1ick/music)
[![Angular](https://img.shields.io/badge/Angular-20-DD0031?logo=angular)](https://angular.io/)

Современный аудиоплеер на **Angular** с реактивным программированием и **Material Design**.

---

## **📌 Технические требования (выполнены)**

- ✅ **Standalone Components** — современный подход без NgModules  
- ✅ **Reactive Programming** — Signals и RxJS для управления состоянием  
- ✅ **Material Design** — единый стиль Angular Material компонентов  
- ✅ **Type Safety** — строгая типизация TypeScript  
- ✅ **Debounced Search** — оптимизированный поиск с задержкой  
- ✅ **Server-Side Pagination** — эффективная работа с большими данными  
- ✅ **Error Handling** — централизованная обработка ошибок  

---

## **🚀 Особенности реализации**

### **Архитектура**
- **Signal-based state management**  
- **Service layer** с чётким разделением ответственности  
- **OnPush change detection** для максимальной производительности  
- **Computed signals** для мемоизированных вычислений  

### **Пользовательский опыт**
- Индикаторы загрузки и состояния ошибок  
- Адаптивный дизайн для мобильных устройств  
- Плавные переходы и hover-эффекты  
- Умный поиск с `debounce(300ms)`  

---

## **🛠 Технологический стек**

- **Angular v20** (Standalone Components)  
- **Angular Material** для UI компонентов  
- **TypeScript** со строгой типизацией  
- **RxJS** для реактивного программирования  
- **SCSS** с CSS-переменными  
- **Signals** для управления состоянием  

---

## **🚀 Установка и запуск**

```bash
# 1. Клонировать репозиторий
git clone https://github.com/s1ick/music.git
cd music

# 2. Установить зависимости
npm install

# 3. Запустить development server
ng serve

# 4. Сборка production версии
ng build
```

---

## **📂 Структура проекта**

```bash
src/app/
├── components/
│   ├── track-table/             # Компонент таблицы треков
│   └── audio-player/            # Компонент аудиоплеера
├── services/
│   ├── audio.service.ts         # Работа с аудиоданными
│   ├── track-filter.service.ts  # Фильтрация и пагинация
│   └── app-state.service.ts     # Управление состоянием приложения
├── models/
│   └── audio-track.model.ts     # Модель данных трека
├── constants/
│   └── table-config.ts          # Конфигурация таблицы
├── utils/
│   └── formatters.ts            # Утилиты форматирования
├── app.component.ts             # Главный компонент
├── app.config.ts                # Конфигурация приложения
└── main.ts                      # Точка входа
```

---

## **👨‍💻 Автор**

**Иван**  
[![GitHub](https://img.shields.io/badge/GitHub-s1ick-181717?logo=github)](https://github.com/s1ick)  
[![Telegram](https://img.shields.io/badge/Telegram-@estheticmadness-26A5E4?logo=telegram)](https://t.me/estheticmadness)

---

> **Примечание:** Проект создан в демонстрационных целях и показывает использование современных подходов Angular 20: Signals, Standalone Components и Material Design.
