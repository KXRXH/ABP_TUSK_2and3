package db

import "time"

type Item struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

type Status Item
type Position Item
type NomenclatureType struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Price Price  `gorm:"foreignKey:ID"`
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
	StartTime int          `json:"time"`
	User      User         `gorm:"foreignKey:ID"`
	Product   Nomenclature `gorm:"foreignKey:ID"`
	Discont   int          `json:"discont"`
	Sum       int          `json:"sum"`
	Tariff    int          `json:"tariff"`
}

type Base struct {
	ID      int    `json:"id"`
	Address string `json:"address"`
	Index   string `json:"index"` // post index
	Coords  string `json:"coords"`
	Name    string `json:"name"`
	Number  int    `json:"num"`
}

type Rent struct {
	ID      int          `json:"id"`
	Time    time.Time    `json:"finish"`
	User    User         `gorm:"foreignKey:ID"`
	Base    Base         `gorm:"foreignKey:ID"`
	Product Nomenclature `gorm:"foreignKey:ID"`
	IsStart bool         `json:"is_start"` // is it rent start or rent finished?
}

type Price struct {
	ID    int       `json:"id"`
	Time  time.Time `json:"time"`
	Value int       `json:"value"`
}
