// этот файл создает большие проблемы после сборки

// $(function() {

// 	'use strict';

// 	// Form
// 	var contactForm = function() {

// 		if ($('#contactForm').length > 0 ) {
// 			$( "#contactForm" ).validate( {
// 				rules: {
// 					name: "required",
// 					email: {
// 						required: true,
// 						email: true
// 					},
// 					message: {
// 						required: true,
// 						minlength: 5
// 					}
// 				},
// 				messages: {
// 					name: "Пожалуйста, введите свое ФИО",
// 					email: "Пожалуйста, введите действительный адрес электронной почты",
// 					message: "Пожалуйста, введите сообщение"
// 				},
// 				/* submit via ajax */
// 				submitHandler: function(form) {		
// 					var $submit = $('.submitting'),
// 						waitText = 'Отправка...';
// 					$.ajax({   	
//                             type: "POST",
//                             url: "php/send-email.php",
//                             data: $(form).serialize(),
//                         beforeSend: function() { 
//                             $submit.css('display', 'block').text(waitText);
//                         },
//                         success: function(msg) {
//                         if (msg == 'OK') {
//                             $('#form-message-warning').hide();
//                             setTimeout(function(){
//                                 $('#contactForm').fadeOut();
//                             }, 1000);
//                             setTimeout(function(){
//                                 $('#form-message-success').fadeIn();   
//                             }, 1400);
//                         } 
// 						else {
//                             $('#form-message-warning').fadeIn();   
//                             $submit.css('display', 'none');
//                         }
//                         },
//                         error: function() {
//                             $('#form-message-warning').fadeIn();
//                             $submit.css('display', 'none');
//                         }
//                     });    		
//                 }
// 			} );
// 		}
// 	};
// 	contactForm();
// });