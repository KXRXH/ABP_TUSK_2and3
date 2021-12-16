package pdfc

type ValuesForTable struct {
	NName   string `json:"nomenclature"` // *Nomenclature Name
	Article string `json:"code"`
	Number  string `json:"number"`
	Date    string `json:"date"`
	UMail   string `json:"mail"`
	FIO     string `json:"name"`
	Sum     int    `json:"sum"`
	Dis     int    `json:"discount"`
}
