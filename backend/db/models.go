package db

import (
	"time"
)

type Item struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

type Status Item
type Position Item

type NomenclatureType struct {
	ID      int    `json:"id"`
	Changed string `json:"time"`
	Title   string `json:"title"`
	Price   int    `json:"price"`
}

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Surname  string `json:"surname"`
	Lastname string `json:"lastname"`
	Phone    string `json:"phone"`
	Mail     string `json:"mail"`
	Birth    string `json:"date"`
	Status   Status `gorm:"foreignKey:ID"`
}

type Employee struct {
	ID       int      `json:"id"`
	Name     string   `json:"name"`
	Surname  string   `json:"surname"`
	Lastname string   `json:"lastname"`
	Phone    string   `json:"phone"`
	Mail     string   `json:"mail"`
	Birth    string   `json:"date"`
	Password string   `json:"password"` //DELETE THIS
	Position Position `gorm:"foreignKey:ID"`
}

type Nomenclature struct {
	ID         int              `json:"id"`
	Article    string           `json:"code"`
	StartDate  time.Time        `json:"start"`
	FinishDate time.Time        `json:"finish"`
	Name       string           `json:"name"`
	Used       bool             `json:"used"`
	Type       NomenclatureType `gorm:"foreignKey:ID"`
}

type Payment struct {
	ID        int          `json:"id"`
	Long      int          `json:"long"`
	StartTime time.Time    `json:"time"`
	User      User         `gorm:"foreignKey:ID"`
	Product   Nomenclature `gorm:"foreignKey:ID"`
	Sum       int          `json:"sum"`
}

type Base struct {
	ID      int    `json:"id"`
	Address string `json:"address"`
	Index   string `json:"index"` // post index
	Coords  string `json:"coords"`
	Name    string `json:"name"`
	Number  string `json:"number"`
}

type Rent struct {
	ID      int          `json:"id"`
	Time    time.Time    `json:"finish"`
	User    User         `gorm:"foreignKey:ID"`
	Base    Base         `gorm:"foreignKey:ID"`
	Product Nomenclature `gorm:"foreignKey:ID"`
	IsStart bool         `json:"is_start"` // is it rent start or rent finished?
}

type PriceChange struct {
	Time     time.Time `json:"time"`
	OldValue int       `json:"oldvalue"`
	NewValue int       `json:"newvalue"`
	TypeId   int       `json:"type_id"`
}
