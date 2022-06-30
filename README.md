# Инструкция

Сервис конвертирует изображения из формата PNG в формат WEBP.


# Запуск
Для запуска сервера необходимо прописать следующие команды.

    npm install
    npm run deploy || npm run start
Разница между последними двумя командами в том, что start чистит папку с обработанными изображениями при старте сервера.

## Использование

Реализован 1 энд-поинт с адресом `/image-service/webp/`.

- GET запрос принимает два параметра, папку внутри директории temp и имя файла, их можно получить отправив POST запрос. Пример адреса `/image-service/webp/result-JUKfD8/background.webp`. В ответ приходит изображение.
- В теле POST запроса в поле `file` должен отправляться PNG файл для обработки. В ответ придёт либо имя папки внутри директории temp и имя файла, либо само изображении, в зависимости от заголовка `Get-File`. Если такой заголовок есть, а его значение true, сервер отправляет файл.

## Примеры запросов
Отправить изображение на обработку и получить обработанное в ответ.

    curl --location --request POST http://localhost:3000/image-service/webp/ --form file=@"C:\Users\dimad\Desktop\1.png"
Отправить изображение на обработку и получить имя папки и имя файла в ответ.

    curl --location --request POST http://localhost:3000/image-service/webp/ --header "Get-File: true" --form file=@"C:\Users\dimad\Desktop\1.png"

Получить изображение по имени папки и имени файла

    curl --location --request GET http://127.0.0.1:3000/image-service/webp/result-JUKfD8/background.webp
