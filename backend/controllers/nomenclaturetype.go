package controllers

import (
	"dblib/db"
	"fmt"
	"net/http"
	"time"

	"github.com/gofiber/fiber/v2"
)

func CreateNomenclatureType(ctx *fiber.Ctx) error {
	model := db.NomenclatureType{}
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
			&fiber.Map{"message": "could not create NomenclatureType"},
		)
		return err
	}
	return nil
}

func UpdateNomenclatureType(context *fiber.Ctx) error {
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	model := db.NomenclatureType{}

	err := context.BodyParser(&model)
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"})
		return err
	}

	pcModel := &db.PriceChange{}
	if err := db.DB.Where("type_id = ?", id).Last(pcModel).Error; err != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not update user (getting old value error)",
		})
		return err
	}
	diff := time.Since(pcModel.Time).Hours()
	fmt.Println(diff)
	// ВОЗМОЖНО РАБОЧАЯ ПРОВЕРКА НА 24Ч DELAY
	if diff >= 24 {
		if err := db.DB.Model(&model).Where("id = ?", id).Updates(&model).Error; err != nil {
			context.Status(http.StatusBadRequest).JSON(&fiber.Map{
				"message": "could not update user (update error)",
			})
			return err
		}
		fmt.Println(pcModel.TypeId)
		if err := CreatePriceChange(context, &pcModel.NewValue, &model.Price, &model.ID); err != nil {
			context.Status(http.StatusOK).JSON(&fiber.Map{
				"message": "price change error",
			})
			return err
		}
		context.Status(http.StatusOK).JSON(&fiber.Map{
			"message": "book has been successfully updated",
			"model":   pcModel,
		})
		return nil

	}
	return context.JSON(fiber.Map{
		"message": "Последнее изменение цены происходило менее 24 часов назад.",
	})
}

func DeleteNomenclatureType(context *fiber.Ctx) error {
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	model := db.NomenclatureType{}

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

func GetAllNomenclatureTypes(context *fiber.Ctx) error {
	models := &[]db.NomenclatureType{}
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

func GetNomenclatureType(context *fiber.Ctx) error {
	id := context.Params("id")
	model := &db.NomenclatureType{}
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

//PRICE
//---------------------------------------------------------------------------//
//PRICE CHANGE

func CreatePriceChange(ctx *fiber.Ctx, oldValue *int, newValue *int, prodType *int) error {
	model := db.PriceChange{
		Time:     time.Now(),
		OldValue: *oldValue,
		NewValue: *newValue,
		TypeId:   *prodType,
	}

	if err := db.DB.Create(&model).Error; err != nil {
		ctx.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create PriceChange"},
		)
		return err
	}
	return nil
}

// НУЖНО ЛИ НАМ УДАЛЯТЬ?
func DeletePriceChange(context *fiber.Ctx) error {
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	model := db.PriceChange{}

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
	models := []db.PriceChange{}
	if err := db.DB.Find(&models).Error; err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get models"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "price change gotten successfully",
		"data":    models,
	})
	return nil

}

/*

 */
