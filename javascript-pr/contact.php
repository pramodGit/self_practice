
<?php
	//echo true;
	class cForm {
		public function getFormValues () {
			$to = "pkumar53@sapient.com, designerp12@gmail.com";
			$subject = "HTML email";
			$message = "<html><head><title>HTML email</title></head><body><p>This email contains HTML Tags!</p><table><tr><th>Firstname</th><th>Lastname</th></tr><tr><td>$post_full_name</td><td>&nbsp;</td></tr></table></body></html>";

			// Always set content-type when sending HTML email
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";

			// More headers
			$headers .= 'From: <pkumar53@sapient.com>' . "\r\n";
			$headers .= 'Cc: pkumar53@sapient.com' . "\r\n";

		}
		public function sendMail () {
			echo $to;
			echo $subject;
			echo $message;
			echo $headers;
			//$mailResponse = mail($to,$subject,$message,$headers);
		}
	};
	
	$callForm = new cForm();
	$callForm->getFormValues();
	$callForm->sendMail();

?>