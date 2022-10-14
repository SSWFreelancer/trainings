<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phonenumber = $_POST['phonenumber'];


// Формирование самого письма
$title = 'Курс "Выездные тренинги". Данные нового пользователя';
$body = "
<h2>Форма</h2>
<b>Имя:</b> $name<br><br>
<b>Телефон:</b> $phonenumber<br><br>";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};
    //HGESiRS7qf2aRPJU6BXi
    // Настройки вашей почты
    $mail->Host       = 'server120.hosting.reg.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'info@schoolbox.store'; // Логин на почте
    $mail->Password   = 'tO2xM0hE9c'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('info@schoolbox.store', 'Пользователь'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('sswfreelance22@gmail.com'); //Ещё один, если нужен
    $mail->addAddress('schoolbox@internet.ru');
    $mail->addAddress('okunev-2@yandex.ru');   
    // Прикрипление файлов к письму
if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
    }   
}
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
