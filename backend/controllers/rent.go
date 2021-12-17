package controllers

import (
	"dblib/db"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func CreateRent(ctx *fiber.Ctx) error {
	model := db.Rent{}
	err := ctx.BodyParser(&model)
	if err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"},
		)
		return err
	}
	if !model.IsStart {
		// GETTING RENT_START
		modelf := db.Rent{}
		err = db.DB.Preload("User").Preload("Base").Preload("Product").Where("is_start = ? AND user_id = ? AND product_id = ?", true, model.UserId, model.ProductId).Last(&modelf).Error
		if err != nil {
			ctx.Status(http.StatusBadRequest).JSON(
				&fiber.Map{"message": "could not get finish rent"},
			)
			return err
		}
		// GETTING USER BY ID
		v_model := db.User{}
		err := db.DB.Preload("Status").Where("id = ?", model.UserId).First(&v_model).Error
		if err != nil {
			ctx.Status(http.StatusBadRequest).JSON(
				&fiber.Map{"message": "could not get user"})
			return err
		}
		// COUNTING LEN` OF LAST RENT
		dif := model.Time.Sub(modelf.Time).Minutes()
		// ADDING MINUTES TO USER STATS
		umodel := db.User{RentTime: (int(dif) + v_model.RentTime), RentCount: v_model.RentCount + 1}
		err = db.DB.Model(&umodel).Where("id = ?", model.UserId).Updates(&umodel).Error
		if err != nil {
			ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{
				"message": "could not update user",
			})
			return err
		}
		var n_model, prep_model db.Nomenclature
		// CLEARING RENT FOR PRODUCT
		prep_model = db.Nomenclature{
			InUse:  "0",
			UserID: -1,
		}
		// GETTING NOMENCLATURE BY id AND user_id
		err = db.DB.Preload("Type").Preload("CurrUser").Where("id = ?", model.ProductId).Last(&n_model).Error
		if err != nil {
			ctx.Status(http.StatusBadRequest).JSON(
				&fiber.Map{"message": "could not get user"},
			)
			return err
		}
		// UPDATING MODEL
		err = db.DB.Model(&n_model).Updates(&prep_model).Error
		if err != nil {
			ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{
				"message": "could not update nomenclature",
			})
			return err
		}
	} else {
		var n_model, prep_model db.Nomenclature
		// SETTING RENT FOR PRODUCT
		prep_model = db.Nomenclature{
			InUse:  "1",
			UserID: model.UserId,
		}
		// GETTING NOMENCLATURE BY id AND user_id
		err := db.DB.Preload("Type").Preload("CurrUser").Where("id = ?", model.ProductId).Last(&n_model).Error
		if err != nil {
			ctx.Status(http.StatusBadRequest).JSON(
				&fiber.Map{"message": "could not get user"},
			)
			return err
		}
		// UPDATING MODEL
		err = db.DB.Model(&n_model).Updates(&prep_model).Error
		if err != nil {
			ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{
				"message": "could not update nomenclature",
			})
			return err
		}

	}

	err = db.DB.Create(&model).Error
	if err != nil {
		ctx.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create Rent"},
		)
		return err
	}
	return nil
}

func UpdateRent(context *fiber.Ctx) error {
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	model := db.Rent{}

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

func DeleteRent(context *fiber.Ctx) error {
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	model := db.Rent{}

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

func GetAllRents(context *fiber.Ctx) error {
	models := &[]db.Rent{}
	err := db.DB.Preload("User").Preload("Base").Preload("Product").Find(models).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get models"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "rents gotten successfully",
		"data":    models,
	})
	return nil
}

func GetAllStarts(ctx *fiber.Ctx) error {
	models := &[]db.Rent{}
	err := db.DB.Preload("User").Preload("Base").Preload("Product").Where("is_start = ?", true).Find(models).Error
	if err != nil {
		ctx.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get rent starts"})
		return err
	}
	ctx.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "starts gotten success",
		"data":    models,
	})
	return nil
}

func GetAllFinish(ctx *fiber.Ctx) error {
	models := &[]db.Rent{}
	err := db.DB.Preload("User").Preload("Base").Preload("Product").Where("is_start = ?", false).Find(models).Error
	if err != nil {
		ctx.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get rent starts"})
		return err
	}
	ctx.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "starts gotten success",
		"data":    models,
	})
	return nil
}

func GetRent(context *fiber.Ctx) error {
	id := context.Params("id")
	model := &db.Rent{}
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	err := db.DB.Preload("User").Preload("Base").Preload("Product").Where("id = ?", id).First(model).Error
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
