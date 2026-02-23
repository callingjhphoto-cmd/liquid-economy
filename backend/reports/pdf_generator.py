"""ReportLab-based PDF generator with Palmer Liquid Studios branding."""

import logging
from datetime import datetime
from io import BytesIO
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak, Image
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

logger = logging.getLogger(__name__)

# Palmer Liquid Studios brand colors
NAVY = colors.HexColor("#0a1628")
GOLD = colors.HexColor("#c9a84c")
WHITE = colors.white
DARK_GRAY = colors.HexColor("#333333")
LIGHT_GRAY = colors.HexColor("#f5f5f5")


def _create_header(canvas, doc, title: str):
    """Draw header bar on every page."""
    canvas.saveState()

    # Navy background bar
    canvas.setFillColor(NAVY)
    canvas.rect(0, doc.height + doc.topMargin - 0.5*inch,
                doc.pagewidth, 0.5*inch, fill=1)

    # Gold accent line
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(2)
    canvas.line(0, doc.height + doc.topMargin - 0.5*inch,
                doc.pagewidth, doc.height + doc.topMargin - 0.5*inch)

    # Header text
    canvas.setFont("Helvetica-Bold", 14)
    canvas.setFillColor(GOLD)
    canvas.drawString(0.5*inch, doc.height + doc.topMargin - 0.3*inch,
                      "Palmer Liquid Studios")

    canvas.setFont("Helvetica", 10)
    canvas.setFillColor(WHITE)
    canvas.drawRightString(doc.pagewidth - 0.5*inch,
                          doc.height + doc.topMargin - 0.3*inch,
                          title)

    canvas.restoreState()


def _create_footer(canvas, doc, report_type: str):
    """Draw footer on every page."""
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#666666"))

    # Page number
    page_num = doc.page
    canvas.drawString(0.5*inch, 0.3*inch, f"Page {page_num}")

    # Generation date
    gen_date = datetime.now().strftime("%Y-%m-%d %H:%M")
    canvas.drawRightString(doc.pagewidth - 0.5*inch, 0.3*inch,
                          f"Generated {gen_date} | {report_type}")

    canvas.restoreState()


def generate_brief_pdf(title: str, sections_data: dict, narratives: dict) -> bytes:
    """
    Generate a quick intelligence brief PDF (1-2 pages).

    Args:
        title: Report title
        sections_data: Dict of section names to data dicts
        narratives: Dict of section names to narrative text

    Returns:
        PDF content as bytes
    """
    try:
        buffer = BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=0.75*inch,
            leftMargin=0.75*inch,
            topMargin=1*inch,
            bottomMargin=0.75*inch,
            title=title,
            author="Palmer Liquid Studios"
        )

        styles = getSampleStyleSheet()

        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=18,
            textColor=NAVY,
            spaceAfter=6,
            fontName='Helvetica-Bold'
        )

        section_style = ParagraphStyle(
            'SectionHeading',
            parent=styles['Heading2'],
            fontSize=12,
            textColor=NAVY,
            spaceAfter=8,
            spaceBefore=8,
            fontName='Helvetica-Bold'
        )

        body_style = ParagraphStyle(
            'CustomBody',
            parent=styles['BodyText'],
            fontSize=10,
            textColor=DARK_GRAY,
            leading=14,
            spaceAfter=6
        )

        story = []

        # Title
        story.append(Paragraph(title, title_style))
        story.append(Spacer(1, 0.15*inch))

        # Generation info
        gen_text = f"<font size=8 color=#666666>Generated {datetime.now().strftime('%B %d, %Y at %H:%M')} | Palmer Liquid Studios Intelligence Platform</font>"
        story.append(Paragraph(gen_text, body_style))
        story.append(Spacer(1, 0.2*inch))

        # Sections
        for section_name in sections_data.keys():
            # Section header with gold underline effect
            story.append(Paragraph(section_name, section_style))

            # Narrative
            narrative = narratives.get(section_name, "")
            if narrative:
                story.append(Paragraph(narrative, body_style))

            story.append(Spacer(1, 0.15*inch))

        # Build PDF
        doc.build(
            story,
            onFirstPage=lambda c, d: _create_header(c, d, title),
            onLaterPages=lambda c, d: _create_header(c, d, title),
            canvasmaker=None
        )

        pdf_bytes = buffer.getvalue()
        buffer.close()
        logger.info(f"Generated brief PDF: {title}")
        return pdf_bytes

    except Exception as e:
        logger.error(f"Error generating brief PDF: {e}")
        raise


def generate_portfolio_pdf(title: str, sections_data: dict, narratives: dict) -> bytes:
    """
    Generate a comprehensive portfolio report PDF (10-15 pages).

    Args:
        title: Report title
        sections_data: Dict of section names to data dicts (can include tables)
        narratives: Dict of section names to narrative text

    Returns:
        PDF content as bytes
    """
    try:
        buffer = BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=0.75*inch,
            leftMargin=0.75*inch,
            topMargin=1*inch,
            bottomMargin=0.75*inch,
            title=title,
            author="Palmer Liquid Studios"
        )

        styles = getSampleStyleSheet()

        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=20,
            textColor=NAVY,
            spaceAfter=6,
            fontName='Helvetica-Bold'
        )

        section_style = ParagraphStyle(
            'SectionHeading',
            parent=styles['Heading2'],
            fontSize=13,
            textColor=NAVY,
            spaceAfter=10,
            spaceBefore=10,
            fontName='Helvetica-Bold'
        )

        subsection_style = ParagraphStyle(
            'SubsectionHeading',
            parent=styles['Heading3'],
            fontSize=11,
            textColor=DARK_GRAY,
            spaceAfter=6,
            spaceBefore=6,
            fontName='Helvetica-Bold'
        )

        body_style = ParagraphStyle(
            'CustomBody',
            parent=styles['BodyText'],
            fontSize=10,
            textColor=DARK_GRAY,
            leading=14,
            spaceAfter=6
        )

        story = []

        # Title page
        story.append(Spacer(1, 1*inch))
        story.append(Paragraph(title, title_style))
        story.append(Spacer(1, 0.2*inch))
        story.append(Paragraph(
            "<b>Palmer Liquid Studios Intelligence Platform</b><br/>Comprehensive Portfolio Report",
            body_style
        ))
        story.append(Spacer(1, 0.3*inch))
        gen_text = f"<font size=9>Report Generated: {datetime.now().strftime('%B %d, %Y at %H:%M')}</font>"
        story.append(Paragraph(gen_text, body_style))
        story.append(PageBreak())

        # Table of contents
        story.append(Paragraph("Contents", section_style))
        toc_items = list(sections_data.keys())
        for i, section in enumerate(toc_items, 1):
            story.append(Paragraph(f"{i}. {section}", body_style))
        story.append(PageBreak())

        # Sections
        for section_index, section_name in enumerate(sections_data.keys(), 1):
            story.append(Paragraph(f"{section_index}. {section_name}", section_style))

            # Narrative
            narrative = narratives.get(section_name, "")
            if narrative:
                story.append(Paragraph(narrative, body_style))
                story.append(Spacer(1, 0.15*inch))

            # Data table if available
            section_data = sections_data.get(section_name, {})
            if isinstance(section_data, list) and section_data:
                try:
                    # Create table from data
                    table_data = section_data
                    if table_data:
                        table = Table(table_data, colWidths=[1.5*inch, 1.2*inch, 1.2*inch, 1.2*inch])
                        table.setStyle(TableStyle([
                            ('BACKGROUND', (0, 0), (-1, 0), NAVY),
                            ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
                            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                            ('FONTSIZE', (0, 0), (-1, 0), 9),
                            ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
                            ('BACKGROUND', (0, 1), (-1, -1), LIGHT_GRAY),
                            ('TEXTCOLOR', (0, 1), (-1, -1), DARK_GRAY),
                            ('ALIGN', (0, 1), (-1, -1), 'RIGHT'),
                            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
                            ('FONTSIZE', (0, 1), (-1, -1), 8),
                            ('GRID', (0, 0), (-1, -1), 1, colors.grey),
                            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT_GRAY]),
                        ]))
                        story.append(table)
                        story.append(Spacer(1, 0.2*inch))
                except Exception as table_err:
                    logger.warning(f"Could not add table for {section_name}: {table_err}")

            # Page break between sections (except last)
            if section_index < len(sections_data):
                story.append(PageBreak())

        # Build PDF
        doc.build(
            story,
            onFirstPage=lambda c, d: _create_header(c, d, title),
            onLaterPages=lambda c, d: _create_header(c, d, title),
            canvasmaker=None
        )

        pdf_bytes = buffer.getvalue()
        buffer.close()
        logger.info(f"Generated portfolio PDF: {title}")
        return pdf_bytes

    except Exception as e:
        logger.error(f"Error generating portfolio PDF: {e}")
        raise
