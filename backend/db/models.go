package db

import (
	"time"
)

type Item struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

type Status struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	Discount int    `json:"discount"`
}

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
	Login    string `json:"login"`
	Birth    string `json:"date"`
	StatusId int
	Status   Status `gorm:"foreignKey:StatusId"`
	Mailing  string `json:"mailing"`
	RentTime int    `json:"rent_time"`
}

type Employee struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Surname    string `json:"surname"`
	Lastname   string `json:"lastname"`
	Phone      string `json:"phone"`
	Mail       string `json:"mail"`
	Birth      string `json:"date"`
	Login      string `json:"login"`
	PositionId int
	Position   Position `gorm:"foreignKey:PositionId"`
	Mailing    string   `json:"mailing"`
}

type Nomenclature struct {
	ID         int       `json:"id"`
	Article    string    `json:"code"`
	StartDate  time.Time `json:"start"`
	FinishDate time.Time `json:"finish"`
	Name       string    `json:"name"`
	Used       string    `json:"used"`
	InUse      string    `json:"in_use"`
	TypeId     int
	Type       NomenclatureType `gorm:"foreignKey:TypeId"`
}

type Payment struct {
	ID        int       `json:"id"`
	Long      int       `json:"long"`
	StartTime time.Time `json:"time"`
	UserId    int
	User      User `gorm:"foreignKey:UserId"`
	ProductId int
	Product   Nomenclature `gorm:"foreignKey:ProductId"`
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
	ID        int       `json:"id"`
	Time      time.Time `json:"time"`
	UserId    int       `json:"user_id"`
	User      User      `gorm:"foreignKey:UserId"`
	BaseId    int
	Base      Base         `gorm:"foreignKey:BaseId"`
	ProductId int          `json:"product_id"`
	Product   Nomenclature `gorm:"foreignKey:ProductId"`
	IsStart   bool         `json:"is_start"` // is it rent start or rent finished?
}

type PriceChange struct {
	Time     time.Time `json:"time"`
	OldValue int       `json:"oldvalue"`
	NewValue int       `json:"newvalue"`
	TypeId   int       `json:"type_id"`
}
