import React, { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import {
  Search, ArrowUpDown, Filter, TrendingUp, TrendingDown, Minus,
  ChevronDown, ChevronUp, DollarSign, Globe, Info
} from 'lucide-react'

// ── Comprehensive Brand Database ──
// RRP in local currency (750ml standard bottle unless noted)
// USA = USD, UK = GBP, EU = EUR, ME = USD (Dubai/Abu Dhabi travel retail)
// Premium Index = (max - min) / min across markets (higher = bigger price spread)

const BRAND_DATABASE = [
  // ═══════════════════════════════════════
  // SCOTCH WHISKY
  // ═══════════════════════════════════════
  { company: 'Diageo', brand: 'Johnnie Walker', expression: 'Black Label', category: 'Scotch Whisky', segment: 'Standard', usa: 32, uk: 25, eu: 28, me: 38 },
  { company: 'Diageo', brand: 'Johnnie Walker', expression: 'Blue Label', category: 'Scotch Whisky', segment: 'Ultra Premium', usa: 185, uk: 140, eu: 155, me: 210 },
  { company: 'Diageo', brand: 'Johnnie Walker', expression: 'Green Label 15yr', category: 'Scotch Whisky', segment: 'Premium', usa: 58, uk: 40, eu: 45, me: 65 },
  { company: 'Diageo', brand: 'Johnnie Walker', expression: 'Gold Label Reserve', category: 'Scotch Whisky', segment: 'Super Premium', usa: 75, uk: 48, eu: 52, me: 85 },
  { company: 'Diageo', brand: 'Talisker', expression: '10 Year Old', category: 'Scotch Whisky', segment: 'Premium', usa: 55, uk: 38, eu: 42, me: 62 },
  { company: 'Diageo', brand: 'Lagavulin', expression: '16 Year Old', category: 'Scotch Whisky', segment: 'Super Premium', usa: 95, uk: 62, eu: 68, me: 105 },
  { company: 'Diageo', brand: 'Oban', expression: '14 Year Old', category: 'Scotch Whisky', segment: 'Super Premium', usa: 80, uk: 52, eu: 58, me: 90 },
  { company: 'Diageo', brand: 'Singleton', expression: '12 Year Old', category: 'Scotch Whisky', segment: 'Premium', usa: 38, uk: 28, eu: 32, me: 42 },
  { company: 'Pernod Ricard', brand: 'Chivas Regal', expression: '12 Year Old', category: 'Scotch Whisky', segment: 'Premium', usa: 32, uk: 24, eu: 26, me: 36 },
  { company: 'Pernod Ricard', brand: 'Chivas Regal', expression: '18 Year Old', category: 'Scotch Whisky', segment: 'Super Premium', usa: 75, uk: 52, eu: 58, me: 85 },
  { company: 'Pernod Ricard', brand: 'The Glenlivet', expression: '12 Year Old', category: 'Scotch Whisky', segment: 'Premium', usa: 42, uk: 28, eu: 32, me: 48 },
  { company: 'Pernod Ricard', brand: 'The Glenlivet', expression: '18 Year Old', category: 'Scotch Whisky', segment: 'Super Premium', usa: 85, uk: 58, eu: 65, me: 95 },
  { company: 'Pernod Ricard', brand: 'Ballantine\'s', expression: 'Finest', category: 'Scotch Whisky', segment: 'Standard', usa: 22, uk: 16, eu: 18, me: 25 },
  { company: 'Pernod Ricard', brand: 'Aberlour', expression: '12 Year Old', category: 'Scotch Whisky', segment: 'Premium', usa: 48, uk: 32, eu: 36, me: 55 },
  { company: 'William Grant', brand: 'Glenfiddich', expression: '12 Year Old', category: 'Scotch Whisky', segment: 'Premium', usa: 42, uk: 30, eu: 34, me: 48 },
  { company: 'William Grant', brand: 'Glenfiddich', expression: '18 Year Old', category: 'Scotch Whisky', segment: 'Super Premium', usa: 95, uk: 62, eu: 70, me: 108 },
  { company: 'William Grant', brand: 'Glenfiddich', expression: '21 Year Old', category: 'Scotch Whisky', segment: 'Ultra Premium', usa: 180, uk: 120, eu: 135, me: 198 },
  { company: 'William Grant', brand: 'The Balvenie', expression: '12yr DoubleWood', category: 'Scotch Whisky', segment: 'Premium', usa: 58, uk: 38, eu: 42, me: 65 },
  { company: 'William Grant', brand: 'The Balvenie', expression: '21yr PortWood', category: 'Scotch Whisky', segment: 'Ultra Premium', usa: 225, uk: 155, eu: 175, me: 250 },
  { company: 'Edrington', brand: 'The Macallan', expression: '12yr Sherry Oak', category: 'Scotch Whisky', segment: 'Super Premium', usa: 75, uk: 58, eu: 65, me: 85 },
  { company: 'Edrington', brand: 'The Macallan', expression: '18yr Sherry Oak', category: 'Scotch Whisky', segment: 'Ultra Premium', usa: 350, uk: 240, eu: 270, me: 395 },
  { company: 'Edrington', brand: 'Highland Park', expression: '12 Year Old', category: 'Scotch Whisky', segment: 'Premium', usa: 48, uk: 32, eu: 36, me: 55 },
  { company: 'Edrington', brand: 'The Famous Grouse', expression: 'Finest', category: 'Scotch Whisky', segment: 'Standard', usa: 22, uk: 14, eu: 16, me: 25 },
  { company: 'Bacardi', brand: 'Dewar\'s', expression: '12 Year Old', category: 'Scotch Whisky', segment: 'Premium', usa: 28, uk: 22, eu: 24, me: 32 },
  { company: 'Bacardi', brand: 'Aberfeldy', expression: '12 Year Old', category: 'Scotch Whisky', segment: 'Premium', usa: 42, uk: 30, eu: 34, me: 48 },
  { company: 'Suntory', brand: 'Bowmore', expression: '12 Year Old', category: 'Scotch Whisky', segment: 'Premium', usa: 52, uk: 35, eu: 38, me: 58 },
  { company: 'Suntory', brand: 'Laphroaig', expression: '10 Year Old', category: 'Scotch Whisky', segment: 'Premium', usa: 52, uk: 36, eu: 40, me: 60 },

  // ═══════════════════════════════════════
  // BOURBON & AMERICAN WHISKEY
  // ═══════════════════════════════════════
  { company: 'Brown-Forman', brand: 'Jack Daniel\'s', expression: 'Old No.7', category: 'Bourbon & American', segment: 'Standard', usa: 25, uk: 22, eu: 24, me: 35 },
  { company: 'Brown-Forman', brand: 'Jack Daniel\'s', expression: 'Single Barrel', category: 'Bourbon & American', segment: 'Premium', usa: 48, uk: 38, eu: 42, me: 58 },
  { company: 'Brown-Forman', brand: 'Woodford Reserve', expression: 'Distiller\'s Select', category: 'Bourbon & American', segment: 'Premium', usa: 38, uk: 30, eu: 34, me: 48 },
  { company: 'Brown-Forman', brand: 'Old Forester', expression: '1897 Bottled in Bond', category: 'Bourbon & American', segment: 'Premium', usa: 30, uk: 32, eu: 35, me: 42 },
  { company: 'Sazerac', brand: 'Buffalo Trace', expression: 'Bourbon', category: 'Bourbon & American', segment: 'Standard', usa: 28, uk: 25, eu: 28, me: 38 },
  { company: 'Sazerac', brand: 'Eagle Rare', expression: '10 Year Old', category: 'Bourbon & American', segment: 'Premium', usa: 35, uk: 38, eu: 42, me: 52 },
  { company: 'Sazerac', brand: 'Blanton\'s', expression: 'Original', category: 'Bourbon & American', segment: 'Super Premium', usa: 65, uk: 55, eu: 58, me: 85 },
  { company: 'Sazerac', brand: 'Pappy Van Winkle', expression: '15 Year Old', category: 'Bourbon & American', segment: 'Ultra Premium', usa: 120, uk: 180, eu: 195, me: 280 },
  { company: 'Suntory', brand: 'Maker\'s Mark', expression: 'Original', category: 'Bourbon & American', segment: 'Premium', usa: 30, uk: 26, eu: 28, me: 38 },
  { company: 'Suntory', brand: 'Maker\'s Mark', expression: '46', category: 'Bourbon & American', segment: 'Premium', usa: 38, uk: 32, eu: 35, me: 48 },
  { company: 'Heaven Hill', brand: 'Elijah Craig', expression: 'Small Batch', category: 'Bourbon & American', segment: 'Premium', usa: 32, uk: 35, eu: 38, me: 45 },
  { company: 'Heaven Hill', brand: 'Evan Williams', expression: 'Black Label', category: 'Bourbon & American', segment: 'Value', usa: 15, uk: 18, eu: 20, me: 28 },
  { company: 'Diageo', brand: 'Bulleit', expression: 'Bourbon', category: 'Bourbon & American', segment: 'Premium', usa: 30, uk: 25, eu: 28, me: 38 },
  { company: 'Wild Turkey', brand: 'Wild Turkey', expression: '101', category: 'Bourbon & American', segment: 'Standard', usa: 25, uk: 28, eu: 30, me: 38 },
  { company: 'Wild Turkey', brand: 'Russell\'s Reserve', expression: '10 Year Old', category: 'Bourbon & American', segment: 'Premium', usa: 38, uk: 35, eu: 38, me: 48 },
  { company: 'MGP', brand: 'Michter\'s', expression: 'US*1 Bourbon', category: 'Bourbon & American', segment: 'Premium', usa: 45, uk: 48, eu: 52, me: 62 },

  // ═══════════════════════════════════════
  // IRISH WHISKEY
  // ═══════════════════════════════════════
  { company: 'Pernod Ricard', brand: 'Jameson', expression: 'Original', category: 'Irish Whiskey', segment: 'Standard', usa: 28, uk: 22, eu: 24, me: 35 },
  { company: 'Pernod Ricard', brand: 'Jameson', expression: 'Black Barrel', category: 'Irish Whiskey', segment: 'Premium', usa: 35, uk: 28, eu: 30, me: 42 },
  { company: 'Pernod Ricard', brand: 'Redbreast', expression: '12 Year Old', category: 'Irish Whiskey', segment: 'Super Premium', usa: 65, uk: 48, eu: 52, me: 75 },
  { company: 'Pernod Ricard', brand: 'Powers', expression: 'Gold Label', category: 'Irish Whiskey', segment: 'Standard', usa: 28, uk: 20, eu: 22, me: 32 },
  { company: 'Brown-Forman', brand: 'Slane', expression: 'Triple Casked', category: 'Irish Whiskey', segment: 'Premium', usa: 32, uk: 25, eu: 28, me: 38 },
  { company: 'Proximo Spirits', brand: 'Bushmills', expression: '10 Year Old', category: 'Irish Whiskey', segment: 'Premium', usa: 38, uk: 30, eu: 32, me: 45 },
  { company: 'William Grant', brand: 'Tullamore D.E.W.', expression: 'Original', category: 'Irish Whiskey', segment: 'Standard', usa: 25, uk: 20, eu: 22, me: 32 },

  // ═══════════════════════════════════════
  // JAPANESE WHISKY
  // ═══════════════════════════════════════
  { company: 'Suntory', brand: 'Hibiki', expression: 'Japanese Harmony', category: 'Japanese Whisky', segment: 'Super Premium', usa: 70, uk: 55, eu: 62, me: 85 },
  { company: 'Suntory', brand: 'Yamazaki', expression: '12 Year Old', category: 'Japanese Whisky', segment: 'Ultra Premium', usa: 160, uk: 105, eu: 120, me: 185 },
  { company: 'Suntory', brand: 'Hakushu', expression: '12 Year Old', category: 'Japanese Whisky', segment: 'Ultra Premium', usa: 120, uk: 85, eu: 95, me: 145 },
  { company: 'Suntory', brand: 'Toki', expression: 'Blended', category: 'Japanese Whisky', segment: 'Premium', usa: 35, uk: 28, eu: 30, me: 42 },
  { company: 'Nikka', brand: 'Nikka', expression: 'From the Barrel', category: 'Japanese Whisky', segment: 'Super Premium', usa: 65, uk: 42, eu: 48, me: 78 },
  { company: 'Nikka', brand: 'Nikka', expression: 'Coffey Grain', category: 'Japanese Whisky', segment: 'Super Premium', usa: 60, uk: 45, eu: 50, me: 72 },

  // ═══════════════════════════════════════
  // VODKA
  // ═══════════════════════════════════════
  { company: 'Diageo', brand: 'Smirnoff', expression: 'No. 21', category: 'Vodka', segment: 'Standard', usa: 14, uk: 14, eu: 12, me: 22 },
  { company: 'Diageo', brand: 'Ketel One', expression: 'Original', category: 'Vodka', segment: 'Premium', usa: 22, uk: 22, eu: 20, me: 32 },
  { company: 'Diageo', brand: 'C\u00eeroc', expression: 'Original', category: 'Vodka', segment: 'Super Premium', usa: 32, uk: 28, eu: 30, me: 42 },
  { company: 'Bacardi', brand: 'Grey Goose', expression: 'Original', category: 'Vodka', segment: 'Super Premium', usa: 32, uk: 32, eu: 28, me: 42 },
  { company: 'Pernod Ricard', brand: 'Absolut', expression: 'Original', category: 'Vodka', segment: 'Premium', usa: 20, uk: 18, eu: 16, me: 28 },
  { company: 'LVMH', brand: 'Belvedere', expression: 'Original', category: 'Vodka', segment: 'Super Premium', usa: 30, uk: 28, eu: 26, me: 38 },
  { company: 'Stoli Group', brand: 'Stolichnaya', expression: 'Premium', category: 'Vodka', segment: 'Premium', usa: 20, uk: 18, eu: 16, me: 28 },
  { company: 'Stoli Group', brand: 'elit by Stolichnaya', expression: 'Ultra Luxury', category: 'Vodka', segment: 'Ultra Premium', usa: 55, uk: 48, eu: 45, me: 68 },
  { company: 'Polmos Zyrardow', brand: 'Belvedere', expression: '10', category: 'Vodka', segment: 'Ultra Premium', usa: 75, uk: 62, eu: 58, me: 88 },
  { company: 'Independent', brand: 'Tito\'s', expression: 'Handmade', category: 'Vodka', segment: 'Premium', usa: 20, uk: 24, eu: 22, me: 32 },
  { company: 'Proximo Spirits', brand: 'Crystal Head', expression: 'Original', category: 'Vodka', segment: 'Super Premium', usa: 50, uk: 42, eu: 45, me: 58 },

  // ═══════════════════════════════════════
  // GIN
  // ═══════════════════════════════════════
  { company: 'Diageo', brand: 'Tanqueray', expression: 'London Dry', category: 'Gin', segment: 'Premium', usa: 22, uk: 18, eu: 20, me: 30 },
  { company: 'Diageo', brand: 'Tanqueray', expression: 'No. Ten', category: 'Gin', segment: 'Super Premium', usa: 32, uk: 26, eu: 28, me: 42 },
  { company: 'Diageo', brand: 'Gordon\'s', expression: 'London Dry', category: 'Gin', segment: 'Standard', usa: 15, uk: 12, eu: 14, me: 22 },
  { company: 'Pernod Ricard', brand: 'Beefeater', expression: '24', category: 'Gin', segment: 'Premium', usa: 28, uk: 22, eu: 24, me: 35 },
  { company: 'William Grant', brand: 'Hendrick\'s', expression: 'Original', category: 'Gin', segment: 'Super Premium', usa: 35, uk: 28, eu: 30, me: 45 },
  { company: 'William Grant', brand: 'Hendrick\'s', expression: 'Orbium', category: 'Gin', segment: 'Ultra Premium', usa: 42, uk: 35, eu: 38, me: 52 },
  { company: 'Bacardi', brand: 'Bombay Sapphire', expression: 'Original', category: 'Gin', segment: 'Premium', usa: 25, uk: 20, eu: 22, me: 32 },
  { company: 'Bacardi', brand: 'Bombay Sapphire', expression: 'Premier Cru', category: 'Gin', segment: 'Super Premium', usa: 38, uk: 30, eu: 32, me: 48 },
  { company: 'Independent', brand: 'The Botanist', expression: 'Islay Dry Gin', category: 'Gin', segment: 'Super Premium', usa: 38, uk: 30, eu: 32, me: 48 },
  { company: 'Independent', brand: 'Monkey 47', expression: 'Schwarzwald Dry Gin', category: 'Gin', segment: 'Ultra Premium', usa: 42, uk: 36, eu: 34, me: 55 },
  { company: 'Davide Campari', brand: 'Aviation', expression: 'American Gin', category: 'Gin', segment: 'Premium', usa: 28, uk: 25, eu: 28, me: 38 },

  // ═══════════════════════════════════════
  // TEQUILA & MEZCAL
  // ═══════════════════════════════════════
  { company: 'Diageo', brand: 'Don Julio', expression: '1942', category: 'Tequila', segment: 'Ultra Premium', usa: 155, uk: 120, eu: 135, me: 180 },
  { company: 'Diageo', brand: 'Don Julio', expression: 'Blanco', category: 'Tequila', segment: 'Premium', usa: 48, uk: 38, eu: 42, me: 58 },
  { company: 'Diageo', brand: 'Don Julio', expression: 'Reposado', category: 'Tequila', segment: 'Premium', usa: 52, uk: 42, eu: 45, me: 62 },
  { company: 'Diageo', brand: 'Casamigos', expression: 'Blanco', category: 'Tequila', segment: 'Super Premium', usa: 48, uk: 42, eu: 45, me: 58 },
  { company: 'Diageo', brand: 'Casamigos', expression: 'A\u00f1ejo', category: 'Tequila', segment: 'Super Premium', usa: 55, uk: 48, eu: 52, me: 68 },
  { company: 'Becle', brand: 'Jos\u00e9 Cuervo', expression: 'Tradicional Silver', category: 'Tequila', segment: 'Standard', usa: 22, uk: 20, eu: 22, me: 30 },
  { company: 'Becle', brand: 'Jos\u00e9 Cuervo', expression: 'Reserva de la Familia', category: 'Tequila', segment: 'Ultra Premium', usa: 130, uk: 105, eu: 115, me: 155 },
  { company: 'Bacardi', brand: 'Patr\u00f3n', expression: 'Silver', category: 'Tequila', segment: 'Super Premium', usa: 42, uk: 38, eu: 40, me: 52 },
  { company: 'Bacardi', brand: 'Patr\u00f3n', expression: 'A\u00f1ejo', category: 'Tequila', segment: 'Super Premium', usa: 55, uk: 48, eu: 52, me: 68 },
  { company: 'Pernod Ricard', brand: 'Avion', expression: 'Reserva 44 Extra A\u00f1ejo', category: 'Tequila', segment: 'Ultra Premium', usa: 85, uk: 72, eu: 78, me: 105 },
  { company: 'Davide Campari', brand: 'Espolon', expression: 'Blanco', category: 'Tequila', segment: 'Premium', usa: 28, uk: 25, eu: 28, me: 38 },
  { company: 'Pernod Ricard', brand: 'Olmeca Altos', expression: 'Plata', category: 'Tequila', segment: 'Premium', usa: 25, uk: 22, eu: 24, me: 32 },
  { company: 'Independent', brand: 'Clase Azul', expression: 'Reposado', category: 'Tequila', segment: 'Ultra Premium', usa: 170, uk: 145, eu: 155, me: 195 },
  { company: 'Pernod Ricard', brand: 'Del Maguey', expression: 'Vida Mezcal', category: 'Tequila', segment: 'Premium', usa: 32, uk: 28, eu: 30, me: 42 },

  // ═══════════════════════════════════════
  // RUM
  // ═══════════════════════════════════════
  { company: 'Bacardi', brand: 'Bacardi', expression: 'Superior', category: 'Rum', segment: 'Standard', usa: 14, uk: 14, eu: 12, me: 22 },
  { company: 'Bacardi', brand: 'Bacardi', expression: 'Reserva Ocho 8yr', category: 'Rum', segment: 'Premium', usa: 28, uk: 24, eu: 26, me: 35 },
  { company: 'Diageo', brand: 'Captain Morgan', expression: 'Original Spiced', category: 'Rum', segment: 'Standard', usa: 16, uk: 16, eu: 14, me: 24 },
  { company: 'Pernod Ricard', brand: 'Havana Club', expression: '7 A\u00f1os', category: 'Rum', segment: 'Premium', usa: null, uk: 24, eu: 22, me: 32 },
  { company: 'Pernod Ricard', brand: 'Malibu', expression: 'Original', category: 'Rum', segment: 'Standard', usa: 18, uk: 14, eu: 15, me: 24 },
  { company: 'Davide Campari', brand: 'Appleton Estate', expression: '12yr Rare Casks', category: 'Rum', segment: 'Premium', usa: 32, uk: 28, eu: 30, me: 42 },
  { company: 'Davide Campari', brand: 'Wray & Nephew', expression: 'Overproof', category: 'Rum', segment: 'Standard', usa: 22, uk: 18, eu: 20, me: 28 },
  { company: 'R\u00e9my Cointreau', brand: 'Mount Gay', expression: 'XO', category: 'Rum', segment: 'Super Premium', usa: 48, uk: 40, eu: 42, me: 58 },
  { company: 'Diageo', brand: 'Ron Zacapa', expression: 'Centenario 23', category: 'Rum', segment: 'Super Premium', usa: 48, uk: 42, eu: 45, me: 58 },
  { company: 'LVMH', brand: 'Eminente', expression: 'Reserva 7yr', category: 'Rum', segment: 'Premium', usa: 42, uk: 35, eu: 38, me: 52 },
  { company: 'Independent', brand: 'Diplomatico', expression: 'Reserva Exclusiva', category: 'Rum', segment: 'Super Premium', usa: 38, uk: 32, eu: 30, me: 48 },
  { company: 'Independent', brand: 'Flor de Ca\u00f1a', expression: '18yr', category: 'Rum', segment: 'Super Premium', usa: 42, uk: 35, eu: 38, me: 52 },
  { company: 'Sazerac', brand: 'Plantation', expression: 'XO 20th Anniversary', category: 'Rum', segment: 'Super Premium', usa: 45, uk: 38, eu: 35, me: 55 },

  // ═══════════════════════════════════════
  // COGNAC & BRANDY
  // ═══════════════════════════════════════
  { company: 'LVMH', brand: 'Hennessy', expression: 'V.S', category: 'Cognac', segment: 'Standard', usa: 38, uk: 30, eu: 28, me: 42 },
  { company: 'LVMH', brand: 'Hennessy', expression: 'V.S.O.P', category: 'Cognac', segment: 'Premium', usa: 55, uk: 42, eu: 40, me: 62 },
  { company: 'LVMH', brand: 'Hennessy', expression: 'X.O', category: 'Cognac', segment: 'Ultra Premium', usa: 200, uk: 145, eu: 140, me: 228 },
  { company: 'LVMH', brand: 'Hennessy', expression: 'Paradis', category: 'Cognac', segment: 'Prestige', usa: 900, uk: 680, eu: 650, me: 1050 },
  { company: 'R\u00e9my Cointreau', brand: 'R\u00e9my Martin', expression: 'V.S.O.P', category: 'Cognac', segment: 'Premium', usa: 48, uk: 38, eu: 36, me: 55 },
  { company: 'R\u00e9my Cointreau', brand: 'R\u00e9my Martin', expression: 'X.O', category: 'Cognac', segment: 'Ultra Premium', usa: 185, uk: 135, eu: 130, me: 215 },
  { company: 'R\u00e9my Cointreau', brand: 'R\u00e9my Martin', expression: 'Louis XIII', category: 'Cognac', segment: 'Prestige', usa: 3800, uk: 2900, eu: 2800, me: 4200 },
  { company: 'Pernod Ricard', brand: 'Martell', expression: 'V.S.O.P', category: 'Cognac', segment: 'Premium', usa: 42, uk: 35, eu: 32, me: 48 },
  { company: 'Pernod Ricard', brand: 'Martell', expression: 'Cordon Bleu', category: 'Cognac', segment: 'Ultra Premium', usa: 165, uk: 120, eu: 115, me: 190 },
  { company: 'Suntory', brand: 'Courvoisier', expression: 'V.S.O.P', category: 'Cognac', segment: 'Premium', usa: 35, uk: 30, eu: 28, me: 42 },
  { company: 'Suntory', brand: 'Courvoisier', expression: 'X.O', category: 'Cognac', segment: 'Ultra Premium', usa: 150, uk: 110, eu: 105, me: 175 },

  // ═══════════════════════════════════════
  // CHAMPAGNE & SPARKLING
  // ═══════════════════════════════════════
  { company: 'LVMH', brand: 'Mo\u00ebt & Chandon', expression: 'Imp\u00e9rial Brut', category: 'Champagne', segment: 'Premium', usa: 48, uk: 32, eu: 35, me: 58 },
  { company: 'LVMH', brand: 'Mo\u00ebt & Chandon', expression: 'Ros\u00e9 Imp\u00e9rial', category: 'Champagne', segment: 'Super Premium', usa: 55, uk: 38, eu: 42, me: 68 },
  { company: 'LVMH', brand: 'Dom P\u00e9rignon', expression: '2015 Vintage', category: 'Champagne', segment: 'Ultra Premium', usa: 220, uk: 155, eu: 170, me: 265 },
  { company: 'LVMH', brand: 'Veuve Clicquot', expression: 'Yellow Label', category: 'Champagne', segment: 'Premium', usa: 52, uk: 38, eu: 42, me: 65 },
  { company: 'LVMH', brand: 'Veuve Clicquot', expression: 'La Grande Dame', category: 'Champagne', segment: 'Ultra Premium', usa: 165, uk: 120, eu: 135, me: 195 },
  { company: 'LVMH', brand: 'Krug', expression: 'Grande Cuv\u00e9e', category: 'Champagne', segment: 'Prestige', usa: 260, uk: 180, eu: 200, me: 310 },
  { company: 'LVMH', brand: 'Ruinart', expression: 'Blanc de Blancs', category: 'Champagne', segment: 'Super Premium', usa: 75, uk: 52, eu: 58, me: 90 },
  { company: 'Pernod Ricard', brand: 'Perrier-Jou\u00ebt', expression: 'Grand Brut', category: 'Champagne', segment: 'Premium', usa: 42, uk: 30, eu: 34, me: 52 },
  { company: 'Pernod Ricard', brand: 'Mumm', expression: 'Grand Cordon', category: 'Champagne', segment: 'Premium', usa: 42, uk: 30, eu: 32, me: 52 },
  { company: 'R\u00e9my Cointreau', brand: 'Charles Heidsieck', expression: 'Brut R\u00e9serve', category: 'Champagne', segment: 'Super Premium', usa: 55, uk: 38, eu: 42, me: 68 },
  { company: 'Vranken-Pommery', brand: 'Pommery', expression: 'Brut Royal', category: 'Champagne', segment: 'Premium', usa: 45, uk: 32, eu: 35, me: 55 },
  { company: 'Laurent-Perrier', brand: 'Laurent-Perrier', expression: 'La Cuv\u00e9e', category: 'Champagne', segment: 'Premium', usa: 42, uk: 30, eu: 34, me: 52 },
  { company: 'Independent', brand: 'Bollinger', expression: 'Special Cuv\u00e9e', category: 'Champagne', segment: 'Super Premium', usa: 62, uk: 42, eu: 48, me: 75 },

  // ═══════════════════════════════════════
  // LIQUEURS & APERITIFS
  // ═══════════════════════════════════════
  { company: 'Davide Campari', brand: 'Campari', expression: 'Original', category: 'Liqueurs', segment: 'Standard', usa: 25, uk: 18, eu: 16, me: 32 },
  { company: 'Davide Campari', brand: 'Aperol', expression: 'Original', category: 'Liqueurs', segment: 'Standard', usa: 22, uk: 14, eu: 12, me: 28 },
  { company: 'Davide Campari', brand: 'Grand Marnier', expression: 'Cordon Rouge', category: 'Liqueurs', segment: 'Premium', usa: 35, uk: 28, eu: 25, me: 42 },
  { company: 'R\u00e9my Cointreau', brand: 'Cointreau', expression: 'Original', category: 'Liqueurs', segment: 'Premium', usa: 32, uk: 22, eu: 20, me: 38 },
  { company: 'Diageo', brand: 'Baileys', expression: 'Original Irish Cream', category: 'Liqueurs', segment: 'Standard', usa: 25, uk: 14, eu: 16, me: 32 },
  { company: 'William Grant', brand: 'Drambuie', expression: 'Original', category: 'Liqueurs', segment: 'Premium', usa: 35, uk: 22, eu: 25, me: 42 },
  { company: 'Pernod Ricard', brand: 'Kahlua', expression: 'Original', category: 'Liqueurs', segment: 'Standard', usa: 22, uk: 16, eu: 18, me: 28 },
  { company: 'Illva Saronno', brand: 'Disaronno', expression: 'Originale', category: 'Liqueurs', segment: 'Premium', usa: 28, uk: 20, eu: 18, me: 35 },
  { company: 'Lucas Bols', brand: 'Bols', expression: 'Genever', category: 'Liqueurs', segment: 'Premium', usa: 32, uk: 25, eu: 22, me: 40 },
  { company: 'Pernod Ricard', brand: 'Pernod', expression: 'Absinthe', category: 'Liqueurs', segment: 'Premium', usa: 55, uk: 40, eu: 35, me: 65 },
  { company: 'Independent', brand: 'Chartreuse', expression: 'Green V.E.P.', category: 'Liqueurs', segment: 'Ultra Premium', usa: 95, uk: 80, eu: 72, me: 115 },
  { company: 'Brown-Forman', brand: 'Chambord', expression: 'Black Raspberry', category: 'Liqueurs', segment: 'Premium', usa: 30, uk: 22, eu: 24, me: 38 },
  { company: 'Davide Campari', brand: 'Frangelico', expression: 'Hazelnut', category: 'Liqueurs', segment: 'Standard', usa: 25, uk: 18, eu: 16, me: 32 },

  // ═══════════════════════════════════════
  // NO & LOW ALCOHOL
  // ═══════════════════════════════════════
  { company: 'Diageo', brand: 'Seedlip', expression: 'Garden 108', category: 'No & Low', segment: 'Premium', usa: 30, uk: 22, eu: 25, me: 35 },
  { company: 'Pernod Ricard', brand: 'Lyre\'s', expression: 'Dry London Spirit', category: 'No & Low', segment: 'Premium', usa: 28, uk: 22, eu: 24, me: 32 },
  { company: 'Pernod Ricard', brand: 'Lyre\'s', expression: 'American Malt', category: 'No & Low', segment: 'Premium', usa: 28, uk: 22, eu: 24, me: 32 },
  { company: 'Diageo', brand: 'Tanqueray', expression: '0.0% Alcohol Free', category: 'No & Low', segment: 'Premium', usa: 22, uk: 16, eu: 18, me: 28 },
  { company: 'Diageo', brand: 'Gordon\'s', expression: '0.0% Alcohol Free', category: 'No & Low', segment: 'Standard', usa: 16, uk: 12, eu: 14, me: 22 },
  { company: 'Independent', brand: 'Monday', expression: 'Mezcal', category: 'No & Low', segment: 'Premium', usa: 32, uk: 28, eu: 30, me: null },
  { company: 'Independent', brand: 'Ritual Zero Proof', expression: 'Tequila Alternative', category: 'No & Low', segment: 'Premium', usa: 28, uk: 25, eu: 28, me: null },
  { company: 'Independent', brand: 'CleanCo', expression: 'Clean G', category: 'No & Low', segment: 'Premium', usa: 28, uk: 20, eu: 22, me: null },

  // ═══════════════════════════════════════
  // RTD / READY-TO-DRINK
  // ═══════════════════════════════════════
  { company: 'Mark Anthony Brands', brand: 'White Claw', expression: 'Variety Pack (12pk)', category: 'RTD', segment: 'Standard', usa: 18, uk: 14, eu: null, me: null },
  { company: 'Boston Beer', brand: 'Truly', expression: 'Variety Pack (12pk)', category: 'RTD', segment: 'Standard', usa: 18, uk: null, eu: null, me: null },
  { company: 'Gallo', brand: 'High Noon', expression: 'Variety Pack (8pk)', category: 'RTD', segment: 'Premium', usa: 20, uk: null, eu: null, me: null },
  { company: 'Sazerac', brand: 'BuzzBallz', expression: 'Chili Mango (20pk)', category: 'RTD', segment: 'Value', usa: 22, uk: null, eu: null, me: null },
  { company: 'Davide Campari', brand: 'Aperol Spritz', expression: 'Ready to Enjoy (3pk)', category: 'RTD', segment: 'Premium', usa: 15, uk: 12, eu: 10, me: null },
  { company: 'Diageo', brand: 'Guinness', expression: '0.0 (6pk)', category: 'RTD', segment: 'Standard', usa: 12, uk: 6, eu: 8, me: 14 },
  { company: 'Cutwater', brand: 'Cutwater', expression: 'Tequila Margarita (4pk)', category: 'RTD', segment: 'Premium', usa: 14, uk: null, eu: null, me: null },
]

// ── Compute derived fields ──
const PRICING = BRAND_DATABASE.map(row => {
  const prices = [row.usa, row.uk ? row.uk * 1.27 : null, row.eu ? row.eu * 1.08 : null, row.me].filter(Boolean)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const differential = prices.length >= 2 ? Math.round(maxPrice - minPrice) : 0
  const premium_index = prices.length >= 2 ? (maxPrice - minPrice) / minPrice : 0
  return { ...row, differential, premium_index }
})

const CATEGORIES = ['all', ...new Set(PRICING.map(p => p.category))]
const SEGMENTS = ['all', ...new Set(PRICING.map(p => p.segment))]

// ── Stats summary ──
function StatsSummary({ data }) {
  const avgPremium = data.length > 0 ? data.reduce((s, d) => s + d.premium_index, 0) / data.length : 0
  const maxSpread = data.length > 0 ? Math.max(...data.map(d => d.differential)) : 0
  const avgUSA = data.filter(d => d.usa).length > 0
    ? Math.round(data.filter(d => d.usa).reduce((s, d) => s + d.usa, 0) / data.filter(d => d.usa).length)
    : 0
  const brandCount = new Set(data.map(d => d.brand)).size

  const stats = [
    { label: 'Brands Tracked', value: brandCount, icon: Globe },
    { label: 'Avg USA RRP', value: `$${avgUSA}`, icon: DollarSign },
    { label: 'Avg Price Spread', value: `${Math.round(avgPremium * 100)}%`, icon: TrendingUp },
    { label: 'Max Differential', value: `$${maxSpread}`, icon: ArrowUpDown },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => {
        const Icon = s.icon
        return (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-navy/5">
                <Icon size={16} className="text-navy" />
              </div>
              <span className="text-xs text-gray-400">{s.label}</span>
            </div>
            <div className="text-xl font-bold text-navy">{s.value}</div>
          </div>
        )
      })}
    </div>
  )
}

// ── Main Component ──
export default function BrandPricing() {
  const [filter, setFilter] = useState('all')
  const [segmentFilter, setSegmentFilter] = useState('all')
  const [sortBy, setSortBy] = useState('premium_index')
  const [sortDir, setSortDir] = useState('desc')
  const [search, setSearch] = useState('')
  const [showCount, setShowCount] = useState(50)

  const filtered = useMemo(() => {
    let data = PRICING
    if (filter !== 'all') data = data.filter(p => p.category === filter)
    if (segmentFilter !== 'all') data = data.filter(p => p.segment === segmentFilter)
    if (search) {
      const q = search.toLowerCase()
      data = data.filter(p =>
        p.brand.toLowerCase().includes(q) ||
        p.expression.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q)
      )
    }
    data = [...data].sort((a, b) => {
      const av = a[sortBy] || 0
      const bv = b[sortBy] || 0
      return sortDir === 'desc' ? bv - av : av - bv
    })
    return data
  }, [filter, segmentFilter, search, sortBy, sortDir])

  const displayed = filtered.slice(0, showCount)

  // Top 15 by premium index for chart
  const chartData = useMemo(() =>
    [...filtered]
      .sort((a, b) => (b.premium_index || 0) - (a.premium_index || 0))
      .slice(0, 15)
      .map(p => ({
        name: `${p.brand} ${p.expression}`.slice(0, 28),
        index: Math.round((p.premium_index || 0) * 100),
      })),
    [filtered]
  )

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    } else {
      setSortBy(col)
      setSortDir('desc')
    }
  }

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <ArrowUpDown size={12} className="text-gray-300" />
    return sortDir === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-navy">Brand Pricing Monitor</h1>
        <p className="text-gray-500 text-sm mt-1">
          RRP comparison across USA, UK, Europe, and Middle East — {PRICING.length} expressions tracked
        </p>
      </div>

      {/* Stats */}
      <StatsSummary data={filtered} />

      {/* Premium Index Chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-display text-lg text-navy mb-1">Highest Price Spread by Market</h2>
          <p className="text-xs text-gray-400 mb-4">Premium index = (max regional price – min) / min — indicates travel retail &amp; duty arbitrage opportunity</p>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 140 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" tick={{ fontSize: 11 }} unit="%" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="index" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.index > 80 ? '#C53030' : entry.index > 50 ? '#DD6B20' : entry.index > 30 ? '#C9A96E' : '#38A169'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search brand, expression, or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap items-center">
          <Filter size={14} className="text-gray-400" />
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => { setFilter(cat); setShowCount(50) }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize
                ${filter === cat ? 'bg-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Segment filters */}
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-xs text-gray-400">Segment:</span>
          {SEGMENTS.map(seg => (
            <button key={seg} onClick={() => { setSegmentFilter(seg); setShowCount(50) }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize
                ${segmentFilter === seg ? 'bg-gold text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs text-gray-400">
        Showing {displayed.length} of {filtered.length} expressions
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Company</th>
                <th className="text-left px-4 py-3 font-medium">Brand</th>
                <th className="text-left px-4 py-3 font-medium">Expression</th>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-left px-4 py-3 font-medium">Segment</th>
                <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none"
                  onClick={() => handleSort('usa')}>
                  <span className="inline-flex items-center gap-1 text-blue-300">USA ($) <SortIcon col="usa" /></span>
                </th>
                <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none"
                  onClick={() => handleSort('uk')}>
                  <span className="inline-flex items-center gap-1 text-red-300">UK (£) <SortIcon col="uk" /></span>
                </th>
                <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none"
                  onClick={() => handleSort('eu')}>
                  <span className="inline-flex items-center gap-1 text-green-300">EU (€) <SortIcon col="eu" /></span>
                </th>
                <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none"
                  onClick={() => handleSort('me')}>
                  <span className="inline-flex items-center gap-1 text-yellow-300">ME ($) <SortIcon col="me" /></span>
                </th>
                <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none"
                  onClick={() => handleSort('differential')}>
                  <span className="inline-flex items-center gap-1">Spread <SortIcon col="differential" /></span>
                </th>
                <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none"
                  onClick={() => handleSort('premium_index')}>
                  <span className="inline-flex items-center gap-1">Premium % <SortIcon col="premium_index" /></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((row, i) => (
                <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/30 transition-colors`}>
                  <td className="px-4 py-2.5 text-gray-500 text-xs">{row.company}</td>
                  <td className="px-4 py-2.5 font-medium text-navy">{row.brand}</td>
                  <td className="px-4 py-2.5 text-gray-600 text-xs">{row.expression}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{row.category}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-medium
                      ${row.segment === 'Ultra Premium' || row.segment === 'Prestige' ? 'bg-purple-50 text-purple-600' :
                        row.segment === 'Super Premium' ? 'bg-amber-50 text-amber-600' :
                        row.segment === 'Premium' ? 'bg-blue-50 text-blue-600' :
                        row.segment === 'Value' ? 'bg-gray-100 text-gray-500' :
                        'bg-gray-50 text-gray-500'}`}>
                      {row.segment}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-xs">{row.usa ? `$${row.usa}` : '—'}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-xs">{row.uk ? `£${row.uk}` : '—'}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-xs">{row.eu ? `€${row.eu}` : '—'}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-xs">{row.me ? `$${row.me}` : '—'}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-xs">${row.differential}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={`text-xs font-semibold ${row.premium_index > 0.6 ? 'text-red-600' : row.premium_index > 0.35 ? 'text-accent-orange' : row.premium_index > 0.15 ? 'text-amber-500' : 'text-gray-500'}`}>
                      {Math.round(row.premium_index * 100)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Load more */}
      {showCount < filtered.length && (
        <div className="text-center">
          <button
            onClick={() => setShowCount(c => c + 50)}
            className="px-6 py-2 bg-navy text-white text-sm rounded-lg hover:bg-navy/90 transition-colors"
          >
            Load more ({filtered.length - showCount} remaining)
          </button>
        </div>
      )}

      {/* Methodology note */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
        <div className="flex items-start gap-2">
          <Info size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Methodology:</strong> Prices reflect recommended retail pricing (RRP) for 750ml standard bottles as of Q1 2026.
            UK prices in GBP, EU prices in EUR (converted at £1 = $1.27, €1 = $1.08 for spread calculations).
            Middle East pricing reflects Dubai/Abu Dhabi travel retail. Premium Index measures the percentage spread between cheapest and most expensive market.
            Null values indicate the product is not commercially available in that market.
            Sources include company price lists, Wine-Searcher aggregated data, and travel retail price surveys.
          </div>
        </div>
      </div>
    </div>
  )
}
