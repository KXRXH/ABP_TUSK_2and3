package pdfc

type ValuesForTable struct {
	NName   string `json:"nomenclature"` // *Nomenclature Name
	Article string `json:"code"`
	Number  string `json:"number"`
	Date    string `json:"date"`
	UMail   string `json:"mail"`
	FIO     string `json:"name"`
	Sum     int    `json:"sum"`
	Duraion int    `json:"duration"`
	Dis     int    `json:"discount"`
}

type ValuesForStatistic struct {
	NumOfUsers        int
	NumOfProducts     int
	NumOfUsedProducts int
	AvgRentT          float64
}
