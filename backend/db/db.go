package db

import (
	"fmt"

	log "github.com/sirupsen/logrus"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB(dbName string) {
	var err error
	DB, err = gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		return
	}
	err = DB.AutoMigrate(
		&User{}, &Status{}, &Position{}, &Employee{},
		&Nomenclature{}, NomenclatureType{},
		&Payment{}, &Base{}, &Rent{}, &Price{},
	)
	if err != nil {
		log.WithFields(log.Fields{
			"package": "db",
			"func":    "InitDB",
			"error":   err,
		}).Error("err AutoMigrate")
		return
	}
}
