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
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(employee.ID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})
	token, err := claims.SignedString([]byte(SecureKey))
	if err != nil {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{"message": "login issue"})
	}
	return c.JSON(fiber.Map{
		"message": "login success",
		"token":   token,
		"userId":  employee.ID,
	})
}
