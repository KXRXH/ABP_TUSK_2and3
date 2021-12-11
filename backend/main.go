package main

import (
	"dblib/api"
	"dblib/db"
)

func main() {
	db.InitDB("main.db")
	api := api.ApiInterface{}
	api.InitApp()
	api.Run(":3001")

}
