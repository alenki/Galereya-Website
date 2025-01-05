<?php
$to = 'omarhack810@gmail.com';

function url(){
   return sprintf(
      "%s://%s",
      isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
      $_SERVER['SERVER_NAME']
   );
}

if($_POST) {

   $name = trim(stripslashes($_POST['name']));
   $email = trim(stripslashes($_POST['email']));
   $subject = trim(stripslashes($_POST['subject']));
   $contact_message = trim(stripslashes($_POST['message']));

   $phone = trim(stripslashes($_POST['phone']));
   $company = trim(stripslashes($_POST['company']));

   if ($phone == '') { $phone = "N/A"; }
   if ($company == '') { $company = "N/A"; }

   
	if ($subject == '') { $subject = "Отправка контактной формы"; }

   // Set Message
   $message .= "Почта от: " . $name . "<br />";
	$message .= "Почта: " . $email . "<br />";
   $message .= "Телефон: " . $phone . "<br />";
   $message .= "Компания: " . $company . "<br />";
   $message .= "Сообщение: <br />";
   $message .= nl2br($contact_message);
   $message .= "<br /> ----- <br /> Это письмо было отправлено из контактной формы вашего сайта: " . url() . "<br />";

   // Set From: header
   $from =  $name . " <" . $email . ">";

   // Email Headers
	$headers = "From: " . $from . "\r\n";
	$headers .= "Reply-To: ". $email . "\r\n";
   $headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

   ini_set("sendmail_from", $to); // for windows server
   $mail = mail($to, $subject, $message, $headers);

	if ($mail) { echo "OK"; }
   else { echo "Что-то пошло не так. Пожалуйста, попробуйте еще раз."; }
}

?>