from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = [
    ROOT / "public/files/Teeraphat-Raksawong-CV-2026.pdf",
    ROOT / "static/files/Teeraphat-Raksawong-CV-2026.pdf",
]

INK = colors.HexColor("#111111")
MUTED = colors.HexColor("#555555")
RULE = colors.HexColor("#242424")
PAGE_W, PAGE_H = A4
LEFT = RIGHT = 18 * mm
TOP = 15 * mm
BOTTOM = 18 * mm
CONTENT_W = PAGE_W - LEFT - RIGHT

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="Name", fontName="Times-Bold", fontSize=21, leading=24,
    textColor=INK, alignment=TA_CENTER, spaceAfter=1,
))
styles.add(ParagraphStyle(
    name="Headline", fontName="Times-Bold", fontSize=9.7, leading=12,
    textColor=INK, alignment=TA_CENTER, spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="Contact", fontName="Times-Roman", fontSize=8.6, leading=10.4,
    textColor=INK, alignment=TA_CENTER, spaceAfter=7,
))
styles.add(ParagraphStyle(
    name="Section", fontName="Times-Bold", fontSize=9.8, leading=11.3,
    textColor=INK, spaceBefore=4.5, spaceAfter=2.5, keepWithNext=True,
))
styles.add(ParagraphStyle(
    name="Role", fontName="Times-Bold", fontSize=9.5, leading=11.1,
    textColor=INK,
))
styles.add(ParagraphStyle(
    name="Date", fontName="Times-Italic", fontSize=8.6, leading=10.2,
    textColor=MUTED, alignment=TA_RIGHT,
))
styles.add(ParagraphStyle(
    name="Body", fontName="Times-Roman", fontSize=9, leading=11.1,
    textColor=INK, spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="CVBullet", fontName="Times-Roman", fontSize=8.8, leading=10.8,
    textColor=INK, leftIndent=12, firstLineIndent=-8, bulletIndent=1,
    spaceAfter=1.4,
))
styles.add(ParagraphStyle(
    name="Small", fontName="Times-Roman", fontSize=8.65, leading=10.6,
    textColor=INK, spaceAfter=1.7,
))
styles.add(ParagraphStyle(
    name="Skill", fontName="Times-Roman", fontSize=8.3, leading=10.1,
    textColor=INK, spaceAfter=1.8,
))
styles.add(ParagraphStyle(
    name="Footer", fontName="Times-Bold", fontSize=7.3, leading=8.5,
    textColor=INK,
))


def p(text, style="Body"):
    return Paragraph(text, styles[style])


def bullet(text):
    return Paragraph("-  " + text, styles["CVBullet"])


def section(title):
    return KeepTogether([
        p(title.upper(), "Section"),
        HRFlowable(width="100%", thickness=0.55, color=RULE, spaceBefore=0, spaceAfter=3),
    ])


def role(title, period, company=None):
    label = f"{company} | {title}" if company else title
    row = Table(
        [[p(label, "Role"), p(period, "Date")]],
        colWidths=[CONTENT_W - 120, 120],
        hAlign="LEFT",
    )
    row.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return row


def add_role(story, title, period, company, bullet_items):
    story.append(role(title, period, company))
    story.extend(bullet(item) for item in bullet_items)
    story.append(Spacer(1, 3))


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.5)
    canvas.line(LEFT, 13.5 * mm, PAGE_W - RIGHT, 13.5 * mm)
    canvas.setFillColor(INK)
    canvas.setFont("Times-Bold", 7.3)
    canvas.drawString(LEFT, 9.5 * mm, "TEERAPHAT RAKSAWONG  /  2026")
    canvas.setFont("Times-Roman", 7.3)
    canvas.drawRightString(PAGE_W - RIGHT, 9.5 * mm, f"{doc.page}  /  2")
    canvas.restoreState()


def build():
    for output in OUTPUTS:
        output.parent.mkdir(parents=True, exist_ok=True)

    doc = BaseDocTemplate(
        str(OUTPUTS[0]), pagesize=A4,
        leftMargin=LEFT, rightMargin=RIGHT, topMargin=TOP, bottomMargin=BOTTOM,
        title="Teeraphat Raksawong (Necktie) - CV 2026",
        author="Teeraphat Raksawong",
        subject="AI Lead Engineer and Software Engineering candidate",
    )
    frame = Frame(LEFT, BOTTOM, CONTENT_W, PAGE_H - TOP - BOTTOM,
                  id="main", leftPadding=0, rightPadding=0,
                  topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="cv", frames=frame, onPage=header_footer)])

    story = [
        p("Teeraphat Raksawong", "Name"),
        p("AI Lead Engineer | Product Engineering | Document Intelligence &amp; Automation", "Headline"),
        p("Chiang Mai, Thailand | +66 95 036 2311 | pethreeday@gmail.com<br/>"
          "<link href='https://github.com/neckttiie090520'>GitHub</link> | "
          "<link href='https://www.linkedin.com/in/teeraphat-raksawong-251514179/'>LinkedIn</link> | "
          "<link href='https://teeraphat-raksawong.netlify.app'>Portfolio</link>", "Contact"),
        section("Professional Summary"),
        p("AI Lead Engineer and Software Engineering master's candidate who connects business needs to product direction, "
          "AI-enabled systems, data workflows, and software delivery. Experience spans document intelligence, full-stack "
          "product development, Windows tooling, applied research, and team-level engineering practices."),
        section("Professional Experience"),
    ]

    add_role(story, "AI Lead Engineer", "Jul 2026 - Present", "DMC Connect", [
        "Own technical direction and hands-on delivery for AI and software initiatives, translating business needs into product requirements, system design, and engineering work.",
        "Lead product and technical work across discovery, architecture, AI integration, implementation, testing, and iteration for travel operations.",
        "Design AI-enabled workflow automation and structured data/document systems; coordinate APIs, databases, cloud services, deployment, and quality practices.",
        "Build reusable knowledge resources and workflow documentation; establish AI-assisted engineering practices and support technical hiring, cloud services, and internal systems.",
        "Built an inspectable LiteParse + OCR extraction workflow that preserves document structure and page geometry, links schema-shaped candidates to source context, and supports human review and revision checks.",
    ])
    add_role(story, "Workshop Facilitator", "2024 - 2026", "AI & Digital Communication", [
        "Supported AI, Big Data, and digital communication workshops for corporate and government participants; prepared learning materials, datasets, templates, and hands-on exercises.",
        "Guided tool setup and technical troubleshooting, helping participants apply AI and data workflows to communication and decision-support tasks.",
    ])
    add_role(story, "Founder & Developer", "2022 - 2024", "Nextzus Optimizer", [
        "Founded and built a Windows utility for gaming PCs with automated optimization, diagnostics, repair, and hardware-aware configuration workflows.",
        "Self-reported reach: 3,000-5,000 users.",
    ])

    story.extend([
        section("Featured Product"),
        role("YouNum | End-to-End Product & Full-Stack Development", "younum.me"),
        bullet("Independently designed, built, and launched a Thai-language web product from concept through UX/UI, architecture, full-stack implementation, integrations, testing, release, and iteration using Next.js, React, TypeScript, and Supabase."),
        bullet("Built a Thai-language dream and lucky-number experience with deterministic number generation; AI is disabled in the current MVP."),
        section("Selected Projects & Research"),
        role("Document Intelligence | Structured Extraction & Human Review", "<link href='https://www.linkedin.com/pulse/building-extraction-pipeline-you-can-inspect-teeraphat-raksawong-p7mnc/'>LinkedIn article</link>"),
        bullet("Built a LiteParse + OCR workflow and review interface for PDF content, with reading, text, table, image, and JSON views tied to source-page geometry."),
        bullet("Extended extraction with evidence retrieval and typed source relationships, and connected agent workflows through defined tools for evidence inspection, proposals, and human input."),
        role("Decoding Chiang Mai's Khao Soi Experience | Google Maps Review Analysis", "2025 - 2026"),
        bullet("Analyzed 22,664 Google Maps reviews across 11 Chiang Mai Khao Soi restaurants for food-tourism and consumer-perception research."),
        bullet("Developed a multilingual RPC-based collection framework and structured analysis workflow, reaching 26-40+ reviews per second during extraction."),
        bullet("Accepted for oral presentation at The 8th International Conference on Food and Applied Bioscience (FAB 2026), Chiang Mai University."),
        PageBreak(),
        section("Selected Projects & Research (Continued)"),
        role("ClutchG PC Optimizer | Evidence-Led Windows Tooling", "<link href='https://www.linkedin.com/pulse/clutchg-what-optimize-button-should-allowed-do-teeraphat-raksawong-mlz8c/'>LinkedIn article</link>"),
        bullet("Built a Python desktop optimizer with explanations, backups, and rollback, grounded in research across 23 open-source repositories and 200+ techniques."),
        role("Actually Faster? | Technical Book &amp; Research", "<link href='https://www.linkedin.com/pulse/turning-my-engineering-work-book-ai-assisted-pipeline-raksawong-o1vyc/'>LinkedIn article</link>"),
        bullet("Authored a 158-page account of Windows optimization research, evidence, risk, and reversibility; built an AI-assisted pipeline for manuscript, figures, layout, and review."),
        role("MCP & AI Tooling | Selected Prototypes", ""),
        bullet("Built experimental Model Context Protocol integrations, web applications, PWAs, and automation tools for AI-assisted research and information workflows."),
        role("InAndOn Billing PWA | Billing and Quotation System", ""),
        bullet("Built an installable PWA for creating cash bills and quotations, with document history, shareable records, and a Google Apps Script backend."),
        role("Valscout | Valorant Tactical Intelligence Platform", ""),
        bullet("Built a scouting app for coaches and analysts, combining team and match data with map-pool, roster, and veto analysis to support opponent preparation."),
        role("LINE AI Secretary | Personal Assistant", ""),
        bullet("Designed a LINE assistant for note capture and search, reminders, to-do lists, and calendar actions, backed by structured workflows and persistent memory."),
        section("Education"),
        role("Master of Software Engineering Candidate | Chiang Mai University, CAMT", "2024 - Present"),
        p("Thesis: A Software Development Approach for Reducing Windows Operating System Latency to Enhance Player Skills in First-Person Shooter Games.", "Small"),
        role("Bachelor of Fine Arts, Media Art and Design | Chiang Mai University", "2020 - 2023"),
        p("BFA thesis (2024): <i>The Beginning of Force</i> - an interactive installation exploring energy and human perception through a Tesla coil, plasma ball, and AI voice interaction. Focus: interactive art design and technology integration.", "Small"),
        section("Core Skills"),
        p("<b>AI &amp; Automation:</b> LLM integration, AI agents, multi-agent workflows, prompt engineering, AI-assisted SDLC, coding agents (Claude Code, Codex, Gemini), MCP integrations, workflow automation", "Skill"),
        p("<b>Software Engineering:</b> Python, JavaScript, TypeScript, React, Next.js, Flask, REST APIs, Google Apps Script, Git/GitHub, testing, debugging, Windows systems optimization", "Skill"),
        p("<b>Data &amp; Research:</b> Structured data processing, document workflows, web scraping, multilingual text analysis, data collection, research analysis", "Skill"),
        p("<b>Cloud &amp; Delivery:</b> Supabase, PostgreSQL, Google Cloud, Vercel, databases, CI/CD, Docker, Linux, API integration, deployment", "Skill"),
        p("<b>Product &amp; Design:</b> Product discovery, requirements, system architecture, technical leadership, web design, UX/UI, interactive media", "Skill"),
        p("<b>Collaboration:</b> Stakeholder communication, technical documentation, workshop facilitation, candidate evaluation", "Skill"),
        section("Languages"),
        p("<b>Thai:</b> Native &nbsp;&nbsp; <b>English:</b> Conversational (workplace communication)", "Small"),
    ])

    doc.build(story)
    generated = OUTPUTS[0].read_bytes()
    OUTPUTS[1].write_bytes(generated)


if __name__ == "__main__":
    build()
