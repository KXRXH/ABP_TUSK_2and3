package controllers

import (
	"dblib/db"
	"dblib/pdfc"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	mail "github.com/xhit/go-simple-mail"
)

const PASSWORD = `ra8ASWNCz7B9bWLX4nc6` // PASSWORD HERE

func SendCheque(c *fiber.Ctx) error {
	var values pdfc.ValuesForTable
	err := c.BodyParser(&values)
	if err != nil {
		c.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{
			"message": "cant parse model",
		})
		return err
	}
	var model db.Nomenclature
	if err := db.DB.Model(&model).Preload("Type").Where("Article = ?", values.Article).First(&model).Error; err != nil {
		c.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not get tariff",
		})
		return err
	}
	fmt.Println(model)
	tariff := strconv.Itoa(model.Type.Price)
	err = pdfc.CreateReport(values)
	if err != nil {
		c.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "could not create report"})
		return err
	}
	err = SendChequeToEmail(values, tariff)
	if err != nil {
		c.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "could not send message to user", "ErrorInfo": err.Error()})
		return err
	}
	c.Status(http.StatusOK).JSON(&fiber.Map{"message": "OK"})
	return nil
}

func SendAdminStatistic(c *fiber.Ctx) error {
	type AdminInfo struct {
		Email string `json:"email"`
	}
	var value AdminInfo
	err := c.BodyParser(&value)
	if err != nil {
		c.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{
			"message": "cant parse model",
		})
		return err
	}
	if value.Email == "" {
		c.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "email cannot be empty",
		})
		return nil
	}
	var values pdfc.ValuesForStatistic
	values, err = GetDataForStatistic(c)
	if err != nil {
		c.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Getting statistic error",
		})
		return err
	}
	err = pdfc.CreateStatistic(values)
	if err != nil {
		c.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "PDF creation error",
		})
		return err
	}
	modelf := db.Employee{}
	err = db.DB.Where("mail = ?", value.Email).Last(&modelf).Error
	if err != nil {
		c.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get finish rent"},
		)
		return err
	}
	fullName := fmt.Sprintf("%s %s %s", modelf.Surname, modelf.Name, modelf.Lastname)
	err = SendStatisticToEmail(fullName, value.Email)
	if err != nil {
		c.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Cant send message to user", "ErrorInfo": err.Error()})
		return err
	}
	c.Status(http.StatusOK).JSON(&fiber.Map{"message": "OK"})
	return nil
}

//--------------------------------------------------------------//
func SendStatisticToEmail(user_name, user_email string) error {
	moscow, _ := time.LoadLocation("Europe/Moscow")
	currDateT := time.Now().In(moscow).Format("02.01.2006 15:04:05")
	var htmlBody = `
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	</head>
	<body>
	<h1 align=center>Письмо администратору</h1>
	<p>Добрый день, ` + user_name + `!</p>
	<p>Сегодня (` + currDateT + ` МСК) вы запросили отчёт
	о работе системы на сегодняшнее число.<br>
	Во вложении письмо в формате .pdf.</p>
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
	email.SetSubject("Отчёт о работе системы аренды")
	email.AddAttachment("statistic.pdf")
	email.SetBody(mail.TextHTML, htmlBody)
	err = email.Send(smtpClient)
	if err != nil {
		return err
	}
	return nil
}

func SendChequeToEmail(info pdfc.ValuesForTable, tariff string) error {
	moscow, _ := time.LoadLocation("Europe/Moscow")
	currDateT := time.Now().In(moscow).Format("02.01.2006 15:04:05")
	var htmlBody = `
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	</head>
	<body>
	<h1>Письмо ` + info.FIO + `.</h1>
	<p>Сегодня (` + currDateT + ` МСК) вы
	взяли в аренду товар "` + info.NName + `",
	артикул - ` + info.Article + `.</p>
	<p>Тариф - ` + tariff + ` за минуту. Ваша скидка Пользователя - ` + strconv.Itoa(info.Dis) + `%</p>
	<p>Приятного использования!<br>
	С уважением, компания КОТЭ.</p>
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
	email.AddTo(info.UMail)
	email.SetSubject("Чек по операции аренда товара")
	email.AddAttachment("cheque.pdf")
	email.SetBody(mail.TextHTML, htmlBody)
	err = email.Send(smtpClient)
	if err != nil {
		return err
	}
	return nil
}

//-----------------------------//
func GetDataForStatistic(context *fiber.Ctx) (pdfc.ValuesForStatistic, error) {
	nom_models := []db.Nomenclature{}
	err := db.DB.Preload("Type").Find(&nom_models).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get models"})
		return pdfc.ValuesForStatistic{}, err
	}
	numOfNomenclatures := len(nom_models)
	err = db.DB.Preload("Type").Where("used = ?", "1").Find(&nom_models).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get models"})
		return pdfc.ValuesForStatistic{}, err
	}
	numOfUsedNomenclatures := len(nom_models)
	user_model := []db.User{}
	err = db.DB.Preload("Status").Find(&user_model).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get models"})
		return pdfc.ValuesForStatistic{}, err
	}
	avg_rent := 0.0
	for _, v := range user_model {
		avg_rent += float64(v.RentTime)
	}
	numOfUsers := len(user_model)
	avg_rent = float64(avg_rent) / float64(numOfUsers)
	return pdfc.ValuesForStatistic{
		NumOfUsers:        numOfUsers,
		NumOfProducts:     numOfNomenclatures,
		NumOfUsedProducts: numOfUsedNomenclatures,
		AvgRentT:          avg_rent,
	}, nil

}
