package controllers

import (
	"dblib/db"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func CreateStatus(ctx *fiber.Ctx) error {
	model := db.Status{}
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
			&fiber.Map{"message": "could not create Status"},
		)
		return err
	}
	return nil
}

func UpdateStatus(context *fiber.Ctx) error {
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	model := db.Status{}

	err := context.BodyParser(&model)
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"})
		return err
	}

	err = db.DB.Model(model).Where("id = ?", id).Updates(model).Error
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

func DeleteStatus(context *fiber.Ctx) error {
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	model := db.Status{}

	err := db.DB.Delete(model, id).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not delete nomenclature",
		})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "book has been successfully deleted",
	})
	return nil
}

func GetAllStatuses(context *fiber.Ctx) error {
	models := &[]db.Status{}
	err := db.DB.Find(models).Error
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

func GetStatus(context *fiber.Ctx) error {
	id := context.Params("id")
	model := &db.Status{}
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	err := db.DB.Where("id = ?", id).First(model).Error
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
