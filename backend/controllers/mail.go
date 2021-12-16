package controllers

import (
	"dblib/pdfc"
	"net/http"

	"github.com/gofiber/fiber/v2"
	mail "github.com/xhit/go-simple-mail"
)

func SendCheque(c *fiber.Ctx) error {
	var values pdfc.ValuesForTable
	err := c.BodyParser(&values)
	if err != nil {
		c.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{
			"message": "cant parse model",
		})
		return err
	}
	err = pdfc.CreateReport(values)
	if err != nil {
		c.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Cant create report"})
		return err
	}
	err = SendChequeToEmail(values.UMail, values.FIO)
	if err != nil {
		c.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Cant send message to user", "ErrorInfo": err.Error()})
		return err
	}
	c.Status(http.StatusOK).JSON(&fiber.Map{"message": "OK"})
	return nil
}

func SendChequeToEmail(user_email, user_name string) error {
	var htmlBody = `
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	</head>
	<body>
	<h1>Здравствуйте, ` + user_name + `</h1>
	<h2>Спасибо за то, что пользуетесь услугами комании КОТЭ</h2>
	</body>
	`
	server := mail.NewSMTPClient()
	// SERVER DETAILS
	server.Host = "smtp.mail.ru"
	server.Port = 587
	// HOST EMAIL DITAILS
	server.Username = "ooo-kote@mail.ru"
	server.Password = "PASSWORD HERE"

	server.Encryption = mail.EncryptionTLS

	smtpClient, err := server.Connect()
	if err != nil {
		return err
	}

	email := mail.NewMSG()
	email.SetFrom(`ООО "КОТЭ" <ooo-kote@mail.ru>`)
	email.AddTo(user_email)
	email.SetSubject("Чек по операции аренда товара")
	email.AddAttachment("./temp/cheque.pdf")
	email.SetBody(mail.TextHTML, htmlBody)
	err = email.Send(smtpClient)
	if err != nil {
		return err
	}
	return nil
}
