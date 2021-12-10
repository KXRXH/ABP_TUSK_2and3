package controllers

import (
	"dblib/db"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	var employee db.Employee
	// СВЕРКА ЛОГИНА И ПАРОЛЯ
	db.DB.Where("Mail = ? AND Password = ?", data["email"], data["password"]).First(&employee)
	if employee.ID == 0 {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "No",
		})
	}
	// ТУТ ВОЗВРАТ ЗАПРОСА
	claim := jwt.MapClaims{
		"ID":           employee.ID,
		"PositionId":   employee.Position.ID,
		"PositionName": employee.Position.Title,
		"Name":         employee.Name,
		"Surname":      employee.Surname,
		"Lastname":     employee.Lastname,
	}
	return c.JSON(fiber.Map{
		"message": "ok",
		"user":    claim,
	})
}
