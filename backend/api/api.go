package api

import (
	"dblib/controllers"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type ApiInterface struct {
	App *fiber.App
}

func (api *ApiInterface) InitApp() {
	api.App = fiber.New(fiber.Config{})
	api.App.Use(cors.New(cors.Config{
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// User
	api.App.Get("/api/user/", controllers.GetAllUsers)
	api.App.Get("/api/user/:id", controllers.GetUser)
	api.App.Post("/api/user/", controllers.CreateUser)
	api.App.Put("/api/user/:id", controllers.UpdateUser)
	api.App.Delete("/api/user/:id", controllers.DeleteUser)
	api.App.Get("/api/user_stats/", controllers.GetUsersStatistic)
	// Base
	api.App.Get("/api/base/", controllers.GetAllBases)
	api.App.Get("/api/base/:id", controllers.GetBase)
	api.App.Post("/api/base/", controllers.CreateBase)
	api.App.Put("/api/base/:id", controllers.UpdateBase)
	api.App.Delete("/api/base/:id", controllers.DeleteBase)
	// Employee
	api.App.Get("/api/employee/", controllers.GetAllEmployees)
	api.App.Get("/api/employee/:id", controllers.GetEmployee)
	api.App.Post("/api/employee/", controllers.CreateEmployee)
	api.App.Put("/api/employee/:id", controllers.UpdateEmployee)
	api.App.Delete("/api/employee/:id", controllers.DeleteEmployee)
	// Nomenclature
	api.App.Get("/api/nomenclature/", controllers.GetAllNomenclatures)
	api.App.Get("/api/nomenclature/:id", controllers.GetNomenclature)
	api.App.Get("/api/nomenclature_user/:id", controllers.NomenclatureForUser)
	api.App.Get("/api/nomenclatureId/", controllers.GetLastNomenclature)
	api.App.Post("/api/nomenclature/", controllers.CreateNomenclature)
	api.App.Put("/api/nomenclature/:id", controllers.UpdateNomenclature)
	api.App.Delete("/api/nomenclature/:id", controllers.DeleteNomenclature)
	// Nomenclature Type
	api.App.Get("/api/nomenclature_type/", controllers.GetAllNomenclatureTypes)
	api.App.Get("/api/nomenclature_type/:id", controllers.GetNomenclatureType)
	api.App.Post("/api/nomenclature_type/", controllers.CreateNomenclatureType)
	api.App.Put("/api/nomenclature_type/:id", controllers.UpdateNomenclatureType)
	api.App.Delete("/api/nomenclature_type/:id", controllers.DeleteNomenclatureType)
	// Payment
	api.App.Get("/api/payment/", controllers.GetAllPayments)
	api.App.Get("/api/payment/:id", controllers.GetPayment)
	api.App.Post("/api/payment/", controllers.CreatePayment)
	api.App.Put("/api/payment/:id", controllers.UpdatePayment)
	api.App.Delete("/api/payment/:id", controllers.DeletePayment)
	// Rent
	api.App.Get("/api/rent/", controllers.GetAllRents)
	api.App.Get("/api/rent_start/", controllers.GetAllStarts)
	api.App.Get("/api/rent_finish/", controllers.GetAllFinish)
	api.App.Get("/api/rent/:id", controllers.GetRent)
	api.App.Post("/api/rent/", controllers.CreateRent)
	api.App.Put("/api/rent/:id", controllers.UpdateRent)
	api.App.Delete("/api/rent/:id", controllers.DeleteRent)
	// Status
	api.App.Get("/api/status/", controllers.GetAllStatuses)
	api.App.Get("/api/status/:id", controllers.GetStatus)
	api.App.Post("/api/status/", controllers.CreateStatus)
	api.App.Put("/api/status/:id", controllers.UpdateStatus)
	api.App.Delete("/api/status/:id", controllers.DeleteStatus)
	// Position
	api.App.Get("/api/position/", controllers.GetAllPositions)
	api.App.Get("/api/position/:id", controllers.GetPosition)
	api.App.Post("/api/position/", controllers.CreatePosition)
	api.App.Put("/api/position/:id", controllers.UpdatePosition)
	api.App.Delete("/api/position/:id", controllers.DeletePosition)
	// PriceChange
	api.App.Get("/api/pricechange/", controllers.GetAllPriceChange)
	api.App.Delete("/api/pricechange/:id", controllers.DeletePriceChange)
	// Login
	api.App.Post("/api/login/", controllers.Login)
	api.App.Post("/api/user_login/", controllers.UserLogin)
	// Mailing
	api.App.Post("/api/finish", controllers.SendFinish)
	api.App.Post("/api/start", controllers.SendStart)
	api.App.Get("/api/available_nomenclature", controllers.GetNotUsed)
	api.App.Post("/api/statistic", controllers.SendAdminStatistic)

}

func (api *ApiInterface) Index(ctx *fiber.Ctx) {

}

func (api *ApiInterface) Run(_port string) {
	log.Fatal(api.App.Listen(_port))
}
