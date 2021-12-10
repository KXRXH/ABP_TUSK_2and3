package controllers

import (
	"dblib/db"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

var SecureKey string = "КОТЭ"

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var employee db.Employee

	db.DB.Where("Mail = ? AND Password = ?", data["email"], data["password"]).First(&employee)

	if employee.ID == 0 {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "incorrect login or password",
			"token":   "-1",
		})
	}
	claims := jwt.MapClaims{
		"Id":    strconv.Itoa(int(employee.ID)),
		"exp":   time.Now().Add(time.Hour * 72).Unix(),
		"admin": true,
	}
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := t.SignedString([]byte("КОТЭ"))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.JSON(fiber.Map{
		"message": "login success",
		"token":   token,
		"userId":  employee.ID,
	})
}
