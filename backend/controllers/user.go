package controllers

import (
	"dblib/db"
	"dblib/pdfc"
	"net/http"

	"github.com/gofiber/fiber/v2"
	mail "github.com/xhit/go-simple-mail"
)

func CreateUser(ctx *fiber.Ctx) error {
	model := db.User{}
	err := ctx.BodyParser(&model)
	if err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"},
		)
		return err
	}

	err = db.DB.Create(&model).Error

	if err != nil {
		ctx.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create User"},
		)
		return err
	}
	return nil
}

func UpdateUser(context *fiber.Ctx) error {
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	model := db.User{}

	err := context.BodyParser(&model)
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"})
		return err
	}

	err = db.DB.Model(&model).Where("id = ?", id).Updates(&model).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not update user",
		})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "book has been successfully updated",
	})
	return nil
}

func DeleteUser(context *fiber.Ctx) error {
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	model := db.User{}

	err := db.DB.Delete(model, id)

	if err.Error != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not delete nomenclature",
		})
		return err.Error
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "book has been successfully deleted",
	})
	return nil
}

func GetAllUsers(context *fiber.Ctx) error {
	models := &[]db.User{}
	err := db.DB.Preload("Status").Find(&models).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get models"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "users gotten successfully",
		"data":    models,
	})
	return nil

}

func GetUser(context *fiber.Ctx) error {
	id := context.Params("id")
	model := &db.User{}
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	err := db.DB.Preload("Status").Where("id = ?", id).First(model).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get user"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "users id gotten successfully",
		"data":    model,
	})
	return nil
}

func GetUsersStatistic(context *fiber.Ctx) error {
	email := context.Params("email")
	models := &[]db.User{}
	err := db.DB.Preload("Status").Order("rent_time desc").Find(&models).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get models"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "users gotten successfully",
	})
	if err = pdfc.CreateUserStats(*models); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get models"})
		return err
	}
	if err = SendUserStats(email); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get models"})
		return err
	}

	return nil
}

func SendUserStats(user_email string) error {
	var htmlBody = `
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	</head>
	<body>
	<h1 align=center>Письмо со статистикой по пользователям</h1>
	<p>Во вложении отчёт в формате .pdf.</p>
	</body>
	`
	server := mail.NewSMTPClient()
	// SERVER DETAILS
	server.Host = "smtp.mail.ru"
	server.Port = 587
	// HOST EMAIL DITAILS
	server.Username = "ooo-kote@mail.ru"
	server.Password = PASSWORD
	server.Encryption = mail.EncryptionTLS

	smtpClient, err := server.Connect()
	if err != nil {
		return err
	}

	email := mail.NewMSG()
	email.SetFrom(`ООО "КОТЭ" <ooo-kote@mail.ru>`)
	email.AddTo(user_email)
	email.SetSubject("Статистика по пользователям.")
	email.AddAttachment("user_stats.pdf")
	email.SetBody(mail.TextHTML, htmlBody)
	err = email.Send(smtpClient)
	if err != nil {
		return err
	}
	return nil
}
