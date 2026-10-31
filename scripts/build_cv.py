from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = [
    ROOT / "public/files/Teeraphat-Raksawong-CV-2026.pdf",
    ROOT / "static/files/Teeraphat-Raksawong-CV-2026.pdf",
]

INK = colors.HexColor("#18253A")
BLUE = colors.HexColor("#2454A6")
MUTED = colors.HexColor("#556477")
PALE = colors.HexColor("#E8EEF7")
RULE = colors.HexColor("#CBD4E1")


def register_fonts():
    windows_fonts = Path("C:/Windows/Fonts")
    regular = windows_fonts / "segoeui.ttf"
    semibold = windows_fonts / "seguisb.ttf"
    bold = windows_fonts / "segoeuib.ttf"
    if regular.exists() and semibold.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("Segoe", str(regular)))
        pdfmetrics.registerFont(TTFont("Segoe-Semibold", str(semibold)))
        pdfmetrics.registerFont(TTFont("Segoe-Bold", str(bold)))
        pdfmetrics.registerFontFamily(
            "Segoe", normal="Segoe", bold="Segoe-Bold", italic="Segoe", boldItalic="Segoe-Bold"
        )
        return "Segoe", "Segoe-Semibold", "Segoe-Bold"
    return "Helvetica", "Helvetica", "Helvetica-Bold"


BODY_FONT, MEDIUM_FONT, BOLD_FONT = register_fonts()

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="Name", fontName=BOLD_FONT, fontSize=24, leading=27,
    textColor=INK, alignment=TA_CENTER, spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="Headline", fontName=MEDIUM_FONT, fontSize=10.5, leading=14,
    textColor=BLUE, alignment=TA_CENTER, spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="Contact", fontName=BODY_FONT, fontSize=8.2, leading=11.1,
    textColor=MUTED, alignment=TA_CENTER, spaceAfter=10,
))
styles.add(ParagraphStyle(
    name="Section", fontName=BOLD_FONT, fontSize=10, leading=13,
    textColor=BLUE, spaceBefore=8, spaceAfter=5, keepWithNext=True,
))
styles.add(ParagraphStyle(
    name="Role", fontName=BOLD_FONT, fontSize=9.2, leading=12,
    textColor=INK, spaceBefore=2.8, spaceAfter=1.5,
))
styles.add(ParagraphStyle(
    name="RoleDate", fontName=BODY_FONT, fontSize=8.4, leading=11,
    textColor=MUTED, alignment=TA_RIGHT,
))
styles.add(ParagraphStyle(
    name="Body", fontName=BODY_FONT, fontSize=8.7, leading=11.6,
    textColor=INK, spaceAfter=2.5,
))
styles.add(ParagraphStyle(
    name="CVBullet", fontName=BODY_FONT, fontSize=8.5, leading=11.3,
    textColor=INK, leftIndent=10, firstLineIndent=-7, bulletIndent=1,
    spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="Small", fontName=BODY_FONT, fontSize=8.2, leading=10.7,
    textColor=INK, spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="Skill", fontName=BODY_FONT, fontSize=8.25, leading=11.1,
    textColor=INK, spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="Footer", fontName=BODY_FONT, fontSize=7.5, leading=9,
    textColor=MUTED,
))


def p(text, style="Body"):
    return Paragraph(text, styles[style])


def bullet(text):
    return Paragraph("&#8226; " + text, styles["CVBullet"])


def role(title, period, company=None):
    label = title if company is None else f"{title} | {company}"
    return KeepTogether([
        Paragraph(
            f'<font name="{BOLD_FONT}">{label}</font>'
            f'<font name="{BODY_FONT}" color="{MUTED.hexval()}">'
            f'<br/>{period}</font>', styles["Role"]
        )
    ])


def section(title):
    return p(title.upper(), "Section")


def header_footer(canvas, doc):
    canvas.saveState()
    page_w, _ = A4
    x0 = 19 * mm
    x1 = page_w - 19 * mm
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.55)
    canvas.line(x0, 13.5 * mm, x1, 13.5 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont(BODY_FONT, 7.4)
    canvas.drawString(x0, 9.5 * mm, "TEERAPHAT RAKSAWONG  /  2026")
    canvas.drawRightString(x1, 9.5 * mm, f"{doc.page}  /  2")
    canvas.restoreState()


def add_role(story, title, period, company, bullets):
    story.append(role(title, period, company))
    story.extend(bullet(item) for item in bullets)
    story.append(Spacer(1, 2))


def build():
    for output in OUTPUTS:
        output.parent.mkdir(parents=True, exist_ok=True)

    page_w, page_h = A4
    left = right = 19 * mm
    top = 15 * mm
    bottom = 18 * mm
    doc = BaseDocTemplate(
        str(OUTPUTS[0]), pagesize=A4,
        leftMargin=left, rightMargin=right,
        topMargin=top, bottomMargin=bottom,
        title="Teeraphat Raksawong - CV 2026",
        author="Teeraphat Raksawong",
        subject="AI Lead Engineer and Software Engineering candidate",
    )
    frame = Frame(left, bottom, page_w - left - right, page_h - top - bottom,
                  id="main", leftPadding=0, rightPadding=0,
                  topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="cv", frames=frame, onPage=header_footer)])

    story = [
        p("Teeraphat Raksawong", "Name"),
        p("AI Lead Engineer  |  AI-Native Software Engineering  |  Product &amp; Automation", "Headline"),
        p("Chiang Mai, Thailand  |  +66 95 036 2311  |  pethreeday@gmail.com<br/>"
          "github.com/neckttiie090520  |  "
          "<link href='https://www.linkedin.com/in/teeraphat-raksawong-251514179/'>"
          "linkedin.com/in/teeraphat-raksawong-251514179</link><br/>"
          "teeraphat-raksawong.netlify.app", "Contact"),
        section("Professional Summary"),
        p("AI Lead Engineer and Software Engineering master's candidate with a background in media art, "
          "interactive installations, and independent product development. Connects user needs to AI-enabled "
          "products, Windows systems work, and end-to-end software delivery. Early work pairing physical "
          "installations with AI voice interaction informs a human-centered approach to practical engineering."),
        section("Professional Experience"),
    ]

    add_role(story, "AI Lead Engineer", "Jul 2026 - Present", "DMC Connect", [
        "Own technical direction and hands-on delivery for AI and software initiatives, translating business needs into product scope, architecture, AI workflows, and shipped software.",
        "Lead product and technical work from discovery through implementation and iteration; coordinate integrations, data, cloud services, and quality practices.",
        "Established AI-assisted delivery practices across specifications, coding-agent workflows, review, evaluation, and documentation; support technical hiring and internal systems.",
    ])
    add_role(story, "Workshop Facilitator", "2024 - 2026", "AI & Digital Communication", [
        "Supported AI, Big Data, and digital communication workshops for corporate and government participants, preparing exercises and helping participants apply tools to communication and decision-support work.",
    ])
    add_role(story, "Founder & Developer", "2022 - 2024", "Nextzus Optimizer", [
        "Founded and developed a Windows optimization utility for gaming PCs, with system tuning, diagnostics, repair, and hardware-aware configuration workflows.",
        "Self-reported adoption: 3,000-5,000 users.",
    ])

    story.extend([
        section("Featured Products & Research"),
        p("<b>YouNum | End-to-End Product Development</b>  <font color='#556477'>younum.me</font>", "Small"),
        bullet("Independently designed, built, and launched a Thai-language product from concept through UX/UI, architecture, full-stack implementation, integrations, and iteration."),
        bullet("Created an AI-assisted dream-analysis and personalized lucky-number experience using Next.js, React, TypeScript, and Supabase."),
        p("<b>Decoding Chiang Mai's Khao Soi Experience | Review Analysis</b>  <font color='#556477'>2025 - 2026</font>", "Small"),
        bullet("Analyzed 22,664 Google Maps reviews across 11 restaurants; built a multilingual collection and analysis workflow. Accepted for oral presentation at FAB 2026, Chiang Mai University."),
        PageBreak(),
        section("Selected Projects"),
        p("<b>MCP & AI Tooling</b>  <font color='#556477'>Selected prototypes</font>", "Small"),
        bullet("Built Model Context Protocol integrations, web applications, PWAs, and automation tools for AI-assisted research and information workflows."),
        p("<b>InAndOn Billing PWA</b>  <font color='#556477'>Billing and quotation system</font>", "Small"),
        bullet("Built an installable PWA for cash bills and quotations, with document history, shareable records, and a Google Apps Script backend."),
        p("<b>Valscout</b>  <font color='#556477'>Valorant tactical intelligence</font>", "Small"),
        bullet("Built a scouting app combining team and match data with map-pool, roster, and veto analysis for opponent preparation."),
        p("<b>LINE AI Secretary</b>  <font color='#556477'>Personal assistant</font>", "Small"),
        bullet("Designed a LINE assistant for note capture and search, reminders, to-do lists, and calendar actions backed by structured workflows and persistent memory."),
        section("Education & Creative Research"),
    ])

    story.append(role("Master of Software Engineering Candidate", "2024 - Present", "Chiang Mai University, CAMT"))
    story.append(p("Thesis: A Software Development Approach for Reducing Windows Operating System Latency to Enhance Player Skills in First-Person Shooter Games.", "Small"))
    story.append(Spacer(1, 3))
    story.append(role("Bachelor of Fine Arts, Media Art and Design", "2020 - 2023", "Chiang Mai University"))
    story.append(p("BFA thesis (2024): <i>The Beginning of Force</i> - an interactive installation exploring energy and human perception through a Tesla coil, plasma ball, and AI voice interaction. This media-art project established an early interest in human-machine interaction that continues in AI product engineering.", "Small"))
    story.extend([
        section("Core Skills"),
        p("<b>AI & Automation:</b> LLM integration, AI agents, multi-agent workflows, prompt engineering, AI-assisted SDLC, coding agents (Claude Code, Codex, Gemini), MCP, workflow automation", "Skill"),
        p("<b>Software Engineering:</b> Python, JavaScript, TypeScript, React, Next.js, Flask, REST APIs, Google Apps Script, Git/GitHub, testing, debugging, Windows systems optimization", "Skill"),
        p("<b>Data & Research:</b> Structured data processing, document workflows, web scraping, multilingual text analysis, data collection and research analysis", "Skill"),
        p("<b>Cloud & Delivery:</b> Supabase, Google Cloud, Vercel, databases, CI/CD, Docker, Linux, API integration, deployment", "Skill"),
        p("<b>Product & Collaboration:</b> Product discovery, requirements, system architecture, technical leadership, UX/UI, interactive media, stakeholder communication, technical documentation, workshop facilitation", "Skill"),
        section("Languages"),
        p("<b>Thai:</b> Native  &nbsp;&nbsp; <b>English:</b> Conversational (workplace communication)", "Small"),
    ])

    doc.build(story)
    # Keep both portfolio copies synchronized from the same generated bytes.
    generated = OUTPUTS[0].read_bytes()
    OUTPUTS[1].write_bytes(generated)


if __name__ == "__main__":
    build()
