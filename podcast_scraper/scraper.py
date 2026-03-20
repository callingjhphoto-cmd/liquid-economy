#!/usr/bin/env python3
"""
YouTube / Podcast Scraper for The Curious Bartender Podcast by Tristan Stephenson.

This script provides utilities to:
1. Load and query the scraped episode data
2. Generate analysis reports
3. Export data in various formats (CSV, JSON)

Data was collected from multiple podcast directory sources including:
- Apple Podcasts (https://podcasts.apple.com/us/podcast/the-curious-bartender-podcast/id1781519504)
- Podcast Republic (https://podcastrepublic.net/podcast/1781519504)
- Podscan.fm (https://podscan.fm/podcasts/the-curious-bartender-podcast)

YouTube channel: https://www.youtube.com/@tristanstephenson
"""

import json
import csv
import os
from collections import Counter
from datetime import datetime

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
REPORTS_DIR = os.path.join(os.path.dirname(__file__), "reports")
EPISODES_FILE = os.path.join(DATA_DIR, "episodes.json")


def load_episodes():
    """Load episode data from JSON file."""
    with open(EPISODES_FILE, "r") as f:
        data = json.load(f)
    return data


def export_csv(output_path=None):
    """Export episode data to CSV format."""
    if output_path is None:
        output_path = os.path.join(DATA_DIR, "episodes.csv")

    data = load_episodes()
    episodes = data["episodes"]

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            "Episode #", "Title", "Guest(s)", "Date", "Duration",
            "Topics", "Description"
        ])
        for ep in sorted(episodes, key=lambda x: x["number"]):
            writer.writerow([
                ep["number"],
                ep["title"],
                "; ".join(ep.get("guests", [])),
                ep.get("date", ""),
                ep.get("duration", ""),
                "; ".join(ep.get("topics", [])),
                ep.get("description", "")
            ])

    print(f"CSV exported to {output_path}")
    return output_path


def get_topic_frequency():
    """Count topic frequency across all episodes."""
    data = load_episodes()
    topics = Counter()
    for ep in data["episodes"]:
        for topic in ep.get("topics", []):
            topics[topic.lower()] += 1
    return topics.most_common()


def get_guest_list():
    """Get all unique guests."""
    data = load_episodes()
    guests = set()
    for ep in data["episodes"]:
        for guest in ep.get("guests", []):
            guests.add(guest)
    return sorted(guests)


def get_episodes_by_category():
    """Categorize episodes by drink/topic category."""
    categories = {
        "Whisky & Scotch": ["whisky", "scotch", "dram", "islay", "brora", "clynelish", "mizunara"],
        "Rum": ["rum", "barbados", "jamaica", "caroni", "appleton"],
        "Gin": ["gin", "beefeater", "london dry", "old tom", "g&t"],
        "Tequila & Mezcal": ["tequila", "mezcal", "agave", "raicilla", "sotol"],
        "Wine & Port": ["wine", "port", "terroir", "fortified", "bordeaux", "biodynamic", "natural wine"],
        "Beer & Cider": ["beer", "cider", "perry", "ale", "cask", "guinness", "brewing", "pub"],
        "Coffee & Tea": ["coffee", "tea", "caffeine", "matcha"],
        "Cocktails & Bars": ["cocktail", "martini", "bar", "bartend", "flair", "cosmopolitan"],
        "Food & Fermentation": ["ferment", "food", "sourdough", "bread", "flavour", "flavor", "koji"],
        "Science & Education": ["science", "chemistry", "biology", "multisensory", "psychology"],
        "Business & Industry": ["business", "entrepreneur", "brand", "publishing", "innovation"],
        "Spirits Production": ["distill", "cognac", "brandy", "vodka", "absinthe", "eau de vie"],
        "History & Culture": ["history", "empire", "egyptian", "greek", "churchill"],
        "Non-Alcoholic": ["non-alc", "non-alcoholic", "0% abv", "dry january"]
    }

    data = load_episodes()
    categorized = {cat: [] for cat in categories}

    for ep in data["episodes"]:
        ep_topics = " ".join(ep.get("topics", [])).lower()
        ep_title = ep.get("title", "").lower()
        combined = ep_topics + " " + ep_title

        for cat, keywords in categories.items():
            if any(kw in combined for kw in keywords):
                categorized[cat].append(ep)

    return categorized


def get_timeline():
    """Get episodes organized by month."""
    data = load_episodes()
    timeline = {}
    for ep in data["episodes"]:
        date_str = ep.get("date", "")
        if date_str:
            month_key = date_str[:7]  # YYYY-MM
            if month_key not in timeline:
                timeline[month_key] = []
            timeline[month_key].append(ep)
    return dict(sorted(timeline.items()))


def generate_all_reports():
    """Generate all analysis reports."""
    os.makedirs(REPORTS_DIR, exist_ok=True)

    # Report 1: Full Episode Catalog
    generate_episode_catalog()

    # Report 2: Topic Analysis
    generate_topic_analysis()

    # Report 3: Guest Directory
    generate_guest_directory()

    # Report 4: Category Breakdown
    generate_category_report()

    # Report 5: Executive Summary
    generate_executive_summary()

    # Export CSV
    export_csv()

    print("\nAll reports generated successfully!")
    print(f"Reports directory: {REPORTS_DIR}")
    print(f"Data directory: {DATA_DIR}")


def generate_episode_catalog():
    """Generate full episode catalog report."""
    data = load_episodes()
    episodes = sorted(data["episodes"], key=lambda x: x["number"], reverse=True)

    lines = [
        "# The Curious Bartender Podcast - Complete Episode Catalog",
        f"## Host: {data['podcast']['host']}",
        f"## Total Episodes: {data['podcast']['total_episodes']}",
        f"## Launch Date: {data['podcast']['launched']}",
        "",
        "---",
        ""
    ]

    for ep in episodes:
        guests = ", ".join(ep.get("guests", [])) or "N/A"
        lines.append(f"### Episode #{ep['number']}: {ep['title']}")
        lines.append(f"**Guest(s):** {guests}")
        lines.append(f"**Date:** {ep.get('date', 'N/A')}")
        if ep.get("duration"):
            lines.append(f"**Duration:** {ep['duration']}")
        if ep.get("description"):
            lines.append(f"\n{ep['description']}")
        if ep.get("topics"):
            lines.append(f"\n**Topics:** {', '.join(ep['topics'])}")
        lines.append("")
        lines.append("---")
        lines.append("")

    path = os.path.join(REPORTS_DIR, "01_episode_catalog.txt")
    with open(path, "w") as f:
        f.write("\n".join(lines))
    print(f"Generated: {path}")


def generate_topic_analysis():
    """Generate topic frequency analysis report."""
    topics = get_topic_frequency()

    lines = [
        "# The Curious Bartender Podcast - Topic Analysis Report",
        "",
        "## Most Discussed Topics (by frequency across episodes)",
        "",
        f"{'Rank':<6} {'Topic':<45} {'Episodes':>8}",
        "-" * 62,
    ]

    for i, (topic, count) in enumerate(topics, 1):
        lines.append(f"{i:<6} {topic:<45} {count:>8}")

    lines.extend([
        "",
        f"## Total unique topics: {len(topics)}",
        "",
        "## Top 20 Topics Visualization",
        ""
    ])

    max_count = topics[0][1] if topics else 1
    for topic, count in topics[:20]:
        bar = "#" * int(count / max_count * 40)
        lines.append(f"  {topic:<35} {bar} ({count})")

    path = os.path.join(REPORTS_DIR, "02_topic_analysis.txt")
    with open(path, "w") as f:
        f.write("\n".join(lines))
    print(f"Generated: {path}")


def generate_guest_directory():
    """Generate guest directory report."""
    data = load_episodes()
    guest_episodes = {}

    for ep in data["episodes"]:
        for guest in ep.get("guests", []):
            if guest not in guest_episodes:
                guest_episodes[guest] = []
            guest_episodes[guest].append(ep)

    lines = [
        "# The Curious Bartender Podcast - Guest Directory",
        "",
        f"## Total Unique Guests: {len(guest_episodes)}",
        "",
        "---",
        ""
    ]

    for guest in sorted(guest_episodes.keys()):
        eps = guest_episodes[guest]
        lines.append(f"### {guest}")
        for ep in eps:
            lines.append(f"  - Episode #{ep['number']}: {ep['title']} ({ep.get('date', 'N/A')})")
        lines.append("")

    path = os.path.join(REPORTS_DIR, "03_guest_directory.txt")
    with open(path, "w") as f:
        f.write("\n".join(lines))
    print(f"Generated: {path}")


def generate_category_report():
    """Generate category breakdown report."""
    categorized = get_episodes_by_category()

    lines = [
        "# The Curious Bartender Podcast - Category Breakdown",
        "",
        "## Episode Distribution by Category",
        "",
    ]

    sorted_cats = sorted(categorized.items(), key=lambda x: len(x[1]), reverse=True)

    lines.append(f"{'Category':<30} {'Episodes':>8}")
    lines.append("-" * 40)
    for cat, eps in sorted_cats:
        lines.append(f"{cat:<30} {len(eps):>8}")

    lines.extend(["", "---", ""])

    for cat, eps in sorted_cats:
        if not eps:
            continue
        lines.append(f"## {cat} ({len(eps)} episodes)")
        lines.append("")
        for ep in sorted(eps, key=lambda x: x["number"], reverse=True):
            guests = ", ".join(ep.get("guests", [])) or "Solo"
            lines.append(f"  - #{ep['number']} {guests}: {ep['title']} ({ep.get('date', '')})")
        lines.append("")

    path = os.path.join(REPORTS_DIR, "04_category_breakdown.txt")
    with open(path, "w") as f:
        f.write("\n".join(lines))
    print(f"Generated: {path}")


def generate_executive_summary():
    """Generate executive summary report."""
    data = load_episodes()
    episodes = data["episodes"]
    podcast = data["podcast"]

    topics = get_topic_frequency()
    guests = get_guest_list()
    categorized = get_episodes_by_category()

    # Calculate timeline
    dates = [ep["date"] for ep in episodes if ep.get("date")]
    first_date = min(dates) if dates else "N/A"
    latest_date = max(dates) if dates else "N/A"

    # Top categories
    sorted_cats = sorted(categorized.items(), key=lambda x: len(x[1]), reverse=True)

    lines = [
        "# The Curious Bartender Podcast - Executive Summary",
        "",
        "## Overview",
        "",
        f"**Podcast:** {podcast['name']}",
        f"**Host:** {podcast['host']}",
        f"**Description:** {podcast['description']}",
        f"**Total Episodes:** {len(episodes)}",
        f"**First Episode:** {first_date}",
        f"**Latest Episode:** {latest_date}",
        f"**Frequency:** {podcast['frequency']}",
        f"**Rating:** {podcast['rating']}",
        "",
        "## Platform Links",
        "",
        f"- Website: {podcast['website']}",
        f"- Spotify: {podcast['platforms']['spotify']}",
        f"- Apple Podcasts: {podcast['platforms']['apple_podcasts']}",
        f"- YouTube: {podcast['platforms']['youtube']}",
        "",
        "## Key Statistics",
        "",
        f"- **Total unique guests:** {len(guests)}",
        f"- **Total unique topics:** {len(topics)}",
        f"- **Episodes with multiple guests:** {sum(1 for ep in episodes if len(ep.get('guests', [])) > 1)}",
        f"- **Solo/compilation episodes:** {sum(1 for ep in episodes if len(ep.get('guests', [])) == 0)}",
        "",
        "## Top 10 Most Discussed Topics",
        "",
    ]

    for i, (topic, count) in enumerate(topics[:10], 1):
        lines.append(f"  {i}. {topic} ({count} episodes)")

    lines.extend([
        "",
        "## Category Distribution (Top 10)",
        "",
    ])

    for cat, eps in sorted_cats[:10]:
        pct = len(eps) / len(episodes) * 100
        lines.append(f"  - {cat}: {len(eps)} episodes ({pct:.1f}%)")

    lines.extend([
        "",
        "## About the Host",
        "",
        podcast["host_bio"],
        "",
        "## Content Themes",
        "",
        "The Curious Bartender Podcast covers an remarkably diverse range of topics within",
        "the food and drink world. Key content pillars include:",
        "",
        "1. **Spirits Production & History** - Deep dives into how spirits are made, from",
        "   whisky and rum to gin, tequila, and vodka, with visits to legendary distilleries",
        "   and conversations with master distillers and blenders.",
        "",
        "2. **Cocktail Culture & Bartending** - Interviews with legendary bartenders, bar",
        "   entrepreneurs, and cocktail historians, covering everything from the Martini to",
        "   the Cosmopolitan to flair bartending.",
        "",
        "3. **Wine, Beer & Cider** - Exploration of wine regions, beer styles, cider making,",
        "   and pub culture with sommeliers, brewers, and cider makers.",
        "",
        "4. **Food Science & Fermentation** - Scientific approaches to flavour, fermentation",
        "   techniques, multisensory perception, and the future of food systems.",
        "",
        "5. **Business & Industry** - How drinks brands are built, the economics of",
        "   hospitality, publishing in the drinks world, and innovation in non-alcoholic",
        "   beverages.",
        "",
        "6. **History & Culture** - How drinks have shaped civilizations, from the British",
        "   Empire's influence on global drinking to ancient Egyptian drinking vessels.",
        "",
        "## Notable Guests",
        "",
        "The podcast has featured an impressive roster of industry legends including:",
        "",
        "- **Dale DeGroff** - The King of Cocktails, Rainbow Room, NYC",
        "- **Peter Dorelli** - 65 years at the Savoy Hotel's American Bar",
        "- **Salvatore Calabrese** - Record-breaking cocktails, Dukes Martini",
        "- **James Hoffmann** - World Barista Champion, YouTube star",
        "- **Sandor Katz** - Fermentation pioneer and author",
        "- **Dr. Harold McGee** - Legendary food science writer",
        "- **Joy Spence** - World's first female Master Blender (Appleton Estate)",
        "- **Richard Seale** - Foursquare Distillery, Barbados rum authority",
        "- **Agostino Perrone** - Director of Mixology, The Connaught Bar",
        "- **Toby Cecchini** - Inventor of the Cosmopolitan",
        "- **Francois Thibault** - Creator of Grey Goose vodka",
        "- **Desmond Payne MBE** - Beefeater Master Distiller, 50 years of gin",
        "- **Charles MacLean MBE** - The Scotchfather, whisky authority",
        "- **Alessandro Palazzi** - Dukes Hotel, 50 years of bartending",
        "",
        "## Timeline & Growth",
        "",
        "The podcast launched in November 2024 and has maintained a consistent weekly",
        "release schedule, reaching 69 episodes by March 2026. It has quickly established",
        "itself as one of the premier drinks industry podcasts, attracting world-class",
        "guests from day one and maintaining a perfect 5.0 star rating on Apple Podcasts.",
        "",
        "---",
        "",
        "Report generated: 2026-03-20",
        "Data sources: Apple Podcasts, Podcast Republic, Podscan.fm, Podchaser",
    ])

    path = os.path.join(REPORTS_DIR, "05_executive_summary.txt")
    with open(path, "w") as f:
        f.write("\n".join(lines))
    print(f"Generated: {path}")


if __name__ == "__main__":
    print("The Curious Bartender Podcast - Data & Reports Generator")
    print("=" * 55)
    print()
    generate_all_reports()
