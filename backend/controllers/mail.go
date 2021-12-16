package controllers

import (
	"dblib/pdfc"
	"net/http"

	"github.com/gofiber/fiber/v2"
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
	c.Status(http.StatusOK).JSON(&fiber.Map{"message": "OK"})
	return nil
}
