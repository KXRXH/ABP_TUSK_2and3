package controllers

import (
	"dblib/db"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func CreatePriceChange(ctx *fiber.Ctx) error {
	model := db.PriceChange{}
	if err := ctx.BodyParser(&model); err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"},
		)
		return err
	}

	if err := db.DB.Create(&model).Error; err != nil {
		ctx.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create PriceChange"},
		)
		return err
	}
	return nil
}

func DeletePriceChange(context *fiber.Ctx) error {
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	model := db.Base{}

	if err := db.DB.Delete(model, id); err.Error != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not delete PriceChange",
		})
		return err.Error
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "book has been successfully deleted",
	})
	return nil
}

func GetAllPriceChange(context *fiber.Ctx) error {
	models := &[]db.Base{}
	if err := db.DB.Preload("NomenclatureType").Find(models).Error; err != nil {
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
