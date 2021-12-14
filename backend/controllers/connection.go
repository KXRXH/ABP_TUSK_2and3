package controllers

import (
	"dblib/db"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	var employee db.Employee
	// ПРОВЕРКА ЛОГИНА И ПАРОЛЯ
	db.DB.Where("Login = ?", data["login"]).First(&employee)
	if employee.ID == 0 {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": false,
		})
	}
	// ПОДТЯГИВАЕМ ЗНАЧЕНИЯ ИЗ 2 positions
	db.DB.Joins("Position", db.DB.Where("Login = ?", data["login"])).First(&employee)
	// ТУТ ФОРМИРОВАНИЕ ИНФОРМАЦИИ О USER'е
	claim := jwt.MapClaims{
		"ID":           employee.ID,
		"PositionId":   employee.Position.ID,
		"PositionName": employee.Position.Title,
		"Name":         employee.Name,
		"Surname":      employee.Surname,
		"Lastname":     employee.Lastname,
		"Mail":         employee.Mail,
		"Mailing":      employee.Mailing,
	}
	return c.JSON(fiber.Map{
		"message": true,
		"user":    claim,
	})
}

func UserLogin(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	var user db.User
	db.DB.Where("Login = ?", data["login"]).First(&user)
	if user.ID == 0 {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": false,
		})
	}
	db.DB.Joins("Status", db.DB.Where("Login = ?", data["login"])).First(&user)
	claim := jwt.MapClaims{
		"ID":         user.ID,
		"StatusId":   user.Status.ID,
		"StatusName": user.Status.Title,
		"Name":       user.Name,
		"Surname":    user.Surname,
		"Lastname":   user.Lastname,
		"Mail":       user.Mail,
		"Mailing":    user.Mailing,
	}
	return c.JSON(fiber.Map{
		"message": true,
		"user":    claim,
	})

}
