"""Claude API integration for report narratives."""

import logging
from anthropic import Anthropic

logger = logging.getLogger(__name__)


def generate_section_narrative(section_name: str, data_context: str, anthropic_key: str) -> str:
    """
    Generate analytical narrative for a report section using Claude.

    Args:
        section_name: Name of the section (e.g., "Market Overview")
        data_context: JSON or text with relevant data for this section
        anthropic_key: Anthropic API key

    Returns:
        Analytical narrative text for the section
    """
    if not anthropic_key:
        logger.warning("Anthropic API key not configured, returning placeholder")
        return f"[{section_name} data: {data_context[:100]}...]"

    try:
        client = Anthropic(api_key=anthropic_key)

        system_prompt = """You are an analyst at Palmer Liquid Studios, a leading intelligence provider for global beverage alcohol markets.
You are writing a professional market intelligence report for institutional investors and industry professionals.
Write clear, concise, analytical prose. Include specific data points and insights. Use professional language.
Structure your response as 2-3 paragraphs of analytical narrative suitable for a formal report."""

        user_prompt = f"""Write a {section_name} section for an intelligence report.

Data context:
{data_context}

Generate 2-3 paragraphs of analytical narrative that synthesizes this data into actionable insights."""

        message = client.messages.create(
            model="claude-sonnet-4-5-20250929",
            max_tokens=800,
            system=system_prompt,
            messages=[
                {"role": "user", "content": user_prompt}
            ]
        )

        narrative = message.content[0].text
        logger.info(f"Generated narrative for section: {section_name}")
        return narrative

    except Exception as e:
        logger.error(f"Error generating narrative for {section_name}: {e}")
        return f"Error generating narrative: {str(e)}"
