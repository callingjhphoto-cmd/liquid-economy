"""Configuration management for Liquid Economy Intelligence Platform."""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # App
    app_name: str = "Liquid Economy Intelligence"
    app_version: str = "1.0.0"
    debug: bool = False

    # Database
    database_url: str = "postgresql://postgres:postgres@localhost:5432/liquid_economy"

    # Auth
    secret_key: str = "change-me-in-production-use-openssl-rand-hex-32"
    access_token_expire_minutes: int = 1440  # 24 hours
    admin_username: str = "palmer"
    admin_password: str = "change-me-in-production"

    # API Keys (free registrations)
    bls_api_key: str = ""  # https://data.bls.gov/registrationEngine/
    sec_user_agent: str = "Palmer Liquid Studios james@huertas.co.uk"
    companies_house_api_key: str = ""  # https://developer.company-information.service.gov.uk/

    # Collector schedule (cron expressions)
    schedule_yahoo_finance: str = "0 7 * * 1-5"  # Weekdays 7AM
    schedule_bls_ppi: str = "0 9 15 * *"  # 15th of month 9AM
    schedule_sec_edgar: str = "0 6 * * 1-5"  # Weekdays 6AM
    schedule_usitc: str = "0 8 1 * *"  # 1st of month 8AM
    schedule_companies_house: str = "0 10 * * 1"  # Mondays 10AM

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()
