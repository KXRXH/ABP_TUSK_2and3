package pdfc

import (
	"dblib/db"
	"fmt"
	"strconv"

	"github.com/jung-kurt/gofpdf"
)

func CreateReport(values ValuesForTable) error {
	type textTable struct {
		obj, value string
	}
	const (
		colCount = 2
		rowCount = 8
		margin   = 16.0
		fontHt   = 26.0
		sMail    = "ooo-kote@mail.ru"
		fontName = "Times"
	)
	if len(values.UMail) > 38 {
		return fmt.Errorf("адрес электронной почты: %v недействительный", values.UMail)
	}
	var result = strconv.FormatFloat(float64(values.Sum)*(1-(float64(values.Dis)/100)), 'f', 2, 64)
	pdf := gofpdf.New("L", "mm", "A4", "")
	pdf.AddUTF8Font("Times", "", "/src/times_new_roman.ttf")
	cellWd := (307 - margin*2) / colCount
	cellHt := pdf.PointToUnitConvert(float64(fontHt + 6))

	pdf.SetCompression(true)
	pdf.AddPage()
	pdf.SetFont(fontName, "", fontHt-4)
	pdf.CellFormat(0, 0, (fmt.Sprintf(`Чек по операции аренда товара "%s", артикул "%s"`,
		values.NName, values.Article)), "0", 0, "TC", false, 0, "")

	pdf.SetFont(fontName, "", fontHt-5)
	pdf.SetY(30)
	pdf.CellFormat(0, 0, (`Компания "КОТЭ"`), "0", 0, "TC", false, 0, "")

	pdf.SetFont(fontName, "", fontHt-5)
	data := []textTable{
		{obj: "Фиксальный документ", value: "№ " + values.Number},
		{obj: "Дата выдачи", value: values.Date},
		{obj: "Эл. адрес покупателя", value: values.UMail},
		{obj: "ФИО", value: values.FIO},
		{obj: "Эл. адрес отправителя", value: sMail},
		{obj: "Сумма", value: strconv.Itoa(values.Sum)},
		{obj: "Скидка", value: strconv.Itoa(values.Dis) + "%"},
		{obj: "ИТОГ", value: result},
	}
	for rowJ := 0; rowJ < rowCount; rowJ++ {
		for colJ := 0; colJ < colCount; colJ++ {
			pdf.SetXY(float64(margin-5)+float64(colJ)*float64(cellWd), float64(margin+35)+float64(rowJ)*cellHt)
			if rowJ == 7 {
				pdf.SetFont(fontName, "", fontHt)
			} else {
				pdf.SetFont(fontName, "", fontHt-7)
			}
			if colJ == 0 {
				pdf.CellFormat(float64(cellWd), cellHt, (data[rowJ].obj), "1", 0, "LM", false, 0, "")
			} else {
				pdf.CellFormat(float64(cellWd), cellHt, (data[rowJ].value), "1", 0, "RM", false, 0, "")
			}
		}
	}
	// ТЕКСТ
	pdf.SetXY(float64(margin-5)+float64(0)*float64(cellWd), float64(margin+45)+float64(9)*cellHt)
	pdf.SetFont(fontName, "", fontHt-7)
	// КАРТИНКА
	pdf.CellFormat(float64(cellWd), cellHt, ("Подпись Ген Директора"), "0", 0, "BL", false, 0, "")
	pdf.Image("./src/Факсимиле.png", float64(margin+20)+float64(1)*float64(cellWd),
		float64(margin+45)+float64(9)*cellHt, 0, 0, false, "", 0, "")
	// ТЕКСТ
	pdf.SetXY(float64(margin-5)+float64(0)*float64(cellWd), float64(margin+45)+float64(10)*cellHt)
	pdf.SetFont(fontName, "", fontHt-7)
	pdf.CellFormat(float64(cellWd), cellHt, ("Печать"), "0", 0, "BL", false, 0, "")
	// КАРТИНКА
	pdf.Image("./src/Печать.png", float64(margin+15)+float64(1.5)*float64(cellWd),
		float64(margin+40)+float64(8)*cellHt, 50, 50, false, "", 0, "")

	if err := pdf.OutputFileAndClose("cheque.pdf"); err != nil {
		return err
	}
	return nil
}

func CreateStatistic(values ValuesForStatistic) error {
	type textTable struct {
		obj, value string
	}
	const (
		colCount = 2
		rowCount = 4
		margin   = 16.0
		fontHt   = 26.0
		fontName = "Times"
	)
	pdf := gofpdf.New("L", "mm", "A4", "")
	pdf.AddUTF8Font("Times", "", "/src/times_new_roman.ttf")
	cellWd := (307 - margin*2) / colCount
	cellHt := pdf.PointToUnitConvert(float64(fontHt + 6))

	pdf.SetCompression(true)
	pdf.AddPage()
	pdf.SetFont(fontName, "", fontHt+4)
	pdf.CellFormat(0, 0, `Отчет о работе системы аренды`, "0", 0, "TC", false, 0, "")

	pdf.SetFont(fontName, "", fontHt+2)
	pdf.SetY(30)
	pdf.CellFormat(0, 0, (`Компания "КОТЭ"`), "0", 0, "TC", false, 0, "")

	pdf.SetFont(fontName, "", fontHt)
	data := []textTable{
		{obj: "В системе пользователей", value: strconv.Itoa(values.NumOfUsers)},
		{obj: "Количество товаров", value: strconv.Itoa(values.NumOfProducts)},
		{obj: "Количество товаров в эксплуатации", value: strconv.Itoa(values.NumOfUsedProducts)},
		{obj: "Среднее время аренды", value: strconv.FormatFloat(values.AvgRentT, 'f', 2, 64)},
	}
	for rowJ := 0; rowJ < rowCount; rowJ++ {
		for colJ := 0; colJ < colCount; colJ++ {
			pdf.SetXY(float64(margin-5)+float64(colJ)*float64(cellWd), float64(margin+35)+float64(rowJ)*cellHt)
			pdf.SetFont(fontName, "", fontHt-3)
			if colJ == 0 {
				pdf.CellFormat(float64(cellWd), cellHt, (data[rowJ].obj), "1", 0, "LM", false, 0, "")
			} else {
				pdf.CellFormat(float64(cellWd), cellHt, (data[rowJ].value), "1", 0, "RM", false, 0, "")
			}
		}
	}

	// ТЕКСТ
	pdf.SetXY(float64(margin-5)+float64(0)*float64(cellWd), float64(margin+20)+float64(9)*cellHt)
	pdf.SetFont(fontName, "", fontHt-3)
	// КАРТИНКА
	pdf.CellFormat(float64(cellWd), cellHt, ("Подпись Администратора"), "0", 0, "BL", false, 0, "")
	pdf.Image("./src/admin.png", float64(margin+10)+float64(1)*float64(cellWd),
		float64(margin+20)+float64(9)*cellHt, 0, 0, false, "", 0, "")
	// ТЕКСТ
	pdf.SetXY(float64(margin-5)+float64(0)*float64(cellWd), float64(margin+20)+float64(10)*cellHt)
	pdf.SetFont(fontName, "", fontHt-3)
	pdf.CellFormat(float64(cellWd), cellHt, ("Печать"), "0", 0, "BL", false, 0, "")
	// КАРТИНКА
	pdf.Image("./src/Печать.png", float64(margin+15)+float64(1.5)*float64(cellWd),
		float64(margin+15)+float64(8)*cellHt, 50, 50, false, "", 0, "")

	if err := pdf.OutputFileAndClose("statistic.pdf"); err != nil {
		return err
	}
	return nil
}

func CreateUserStats(values []db.User) error {
	type textTable struct {
		Id, Count, rentTime string
	}
	var data []textTable
	rowCount := len(values)
	const (
		colCount = 3
		margin   = 16.0
		fontHt   = 29.0
		sMail    = "ooo-kote@mail.ru"
		fontName = "Times"
	)
	pdf := gofpdf.New("L", "mm", "A4", "")
	pdf.AddUTF8Font("Times", "", "/src/times_new_roman.ttf")
	cellWd := (307 - margin*2) / colCount
	cellHt := pdf.PointToUnitConvert(float64(fontHt + 6))

	pdf.SetCompression(true)
	pdf.AddPage()
	pdf.SetFont(fontName, "", fontHt-3)
	pdf.CellFormat(0, 0, "Статистика по пользователям.", "0", 0, "TC", false, 0, "")
	pdf.SetFont(fontName, "", fontHt-5)
	data = append(data, textTable{
		Id:       "Пользователь (id)",
		Count:    "Кол-во",
		rentTime: "Время (минуты)",
	})
	var rt string
	for _, j := range values {
		if j.RentCount == 0 {
			rt = strconv.Itoa(j.RentTime)
		} else {
			rt = strconv.Itoa(j.RentTime / j.RentCount)
		}
		data = append(data, textTable{
			Id:       strconv.Itoa(j.ID),
			Count:    strconv.Itoa(j.RentCount),
			rentTime: rt,
		})
	}
	for rowJ := 0; rowJ < rowCount+1; rowJ++ {
		for colJ := 0; colJ < colCount; colJ++ {
			pdf.SetXY(float64(margin-5)+float64(colJ)*float64(cellWd), float64(margin+35)+float64(rowJ)*cellHt)
			if rowJ == 0 {
				pdf.SetFont(fontName, "", fontHt-4)
			} else {
				pdf.SetFont(fontName, "", fontHt-6)
			}
			switch colJ {
			case 0:
				pdf.CellFormat(float64(cellWd), cellHt, (data[rowJ].Id), "1", 0, "LM", false, 0, "")
			case 1:
				pdf.CellFormat(float64(cellWd), cellHt, (data[rowJ].Count), "1", 0, "LM", false, 0, "")
			case 2:
				pdf.CellFormat(float64(cellWd), cellHt, (data[rowJ].rentTime), "1", 0, "LM", false, 0, "")

			}
		}
	}
	if err := pdf.OutputFileAndClose("user_stats.pdf"); err != nil {
		return err
	}
	return nil

}
