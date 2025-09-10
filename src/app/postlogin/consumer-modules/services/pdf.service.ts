import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  generatePdf(elementId: string, filename: string): void {
    const element = document.getElementById(elementId);

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth()-20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
      pdf.save(`${filename}.pdf`);
    });
  }
}
