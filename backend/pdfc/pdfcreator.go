package pdfc

import (
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
		fontHt   = 27.0
		sMail    = "KOTE@gmail.com"
	)
	if len(values.UMail) > 38 {
		return fmt.Errorf("адрес электронной почты: %v недействительный", values.UMail)
	}
	var result = strconv.FormatFloat(float64(values.Sum)*(1-(float64(values.Dis)/100)), 'f', 2, 64)
	pdf := gofpdf.New("L", "mm", "A4", "")
	pdf.AddFont("Helvetica", "", "./src/helvetica_1251.json")
	cellWd := (307 - margin*2) / colCount
	cellHt := pdf.PointToUnitConvert(float64(fontHt + 6))

	pdf.SetCompression(true)
	pdf.AddPage()
	pdf.SetFont("Helvetica", "", fontHt-10)
	tr := pdf.UnicodeTranslatorFromDescriptor("./src/cp1251")

	pdf.SetFont("Helvetica", "", fontHt-4)
	pdf.CellFormat(0, 0, tr(fmt.Sprintf(`Чек по операции аренда товара "%s", артикул "%s"`, values.NName, values.Article)), "0", 0, "TC", false, 0, "")

	pdf.SetFont("Helvetica", "", fontHt-5)
	pdf.SetY(30)
	pdf.CellFormat(0, 0, tr(`Компания "КОТЭ"`), "0", 0, "TC", false, 0, "")

	pdf.SetFont("Helvetica", "", fontHt-7)
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
				pdf.SetFont("Helvetica", "", fontHt)
			} else {
				pdf.SetFont("Helvetica", "", fontHt-7)
			}
			if colJ == 0 {
				pdf.CellFormat(float64(cellWd), cellHt, tr(data[rowJ].obj), "1", 0, "LM", false, 0, "")
			} else {
				pdf.CellFormat(float64(cellWd), cellHt, tr(data[rowJ].value), "1", 0, "RM", false, 0, "")
			}
		}
	}
	// ТЕКСТ
	pdf.SetXY(float64(margin-5)+float64(0)*float64(cellWd), float64(margin+45)+float64(9)*cellHt)
	pdf.SetFont("Helvetica", "", fontHt-7)
	// КАРТИНКА
	pdf.CellFormat(float64(cellWd), cellHt, tr("Подпись Ген Директора"), "0", 0, "BL", false, 0, "")
	pdf.Image("Факсимиле.png", float64(margin+20)+float64(1)*float64(cellWd), float64(margin+45)+float64(9)*cellHt, 0, 0, false, "", 0, "")
	// ТЕКСТ
	pdf.SetXY(float64(margin-5)+float64(0)*float64(cellWd), float64(margin+45)+float64(10)*cellHt)
	pdf.SetFont("Helvetica", "", fontHt-7)
	pdf.CellFormat(float64(cellWd), cellHt, tr("Печать"), "0", 0, "BL", false, 0, "")
	// КАРТИНКА
	pdf.Image("Печать.png", float64(margin+15)+float64(1.5)*float64(cellWd), float64(margin+40)+float64(8)*cellHt, 50, 50, false, "", 0, "")

	if err := pdf.OutputFileAndClose("test.pdf"); err != nil {
		return err
	}
	return nil
}
