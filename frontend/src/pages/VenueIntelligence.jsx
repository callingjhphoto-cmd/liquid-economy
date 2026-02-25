import React, { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'
import { MapPin, TrendingUp, Star, Wine, Search, Filter, ChevronDown, ChevronUp, ExternalLink, Award, Users, DollarSign, Building2, Globe } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// WORLD'S 50 BEST BARS — 5-YEAR LONGITUDINAL DATA (2021-2025)
// ═══════════════════════════════════════════════════════════════

const FIFTY_BEST_BARS = {
  2025: [
    { rank: 1, name: 'Bar Leone', city: 'Hong Kong', country: 'China', region: 'Asia' },
    { rank: 2, name: 'Handshake Speakeasy', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 3, name: 'Sips', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 4, name: 'Paradiso', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 5, name: 'Tayēr + Elementary', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 6, name: 'Connaught Bar', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 7, name: 'Moebius Milano', city: 'Milan', country: 'Italy', region: 'Europe' },
    { rank: 8, name: 'Line', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 9, name: 'Jigger & Pony', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 10, name: 'Tres Monos', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 11, name: 'Alquímico', city: 'Cartagena', country: 'Colombia', region: 'South America' },
    { rank: 12, name: 'Superbueno', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 13, name: 'Lady Bee', city: 'Lima', country: 'Peru', region: 'South America' },
    { rank: 14, name: 'Himkok', city: 'Oslo', country: 'Norway', region: 'Europe' },
    { rank: 15, name: 'Bar Us', city: 'Bangkok', country: 'Thailand', region: 'Asia' },
    { rank: 16, name: 'Zest', city: 'Seoul', country: 'South Korea', region: 'Asia' },
    { rank: 17, name: 'Bar Nouveau', city: 'Paris', country: 'France', region: 'Europe' },
    { rank: 18, name: 'Bar Benfiddich', city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { rank: 19, name: 'Caretaker\'s Cottage', city: 'Melbourne', country: 'Australia', region: 'Australasia' },
    { rank: 20, name: 'The Cambridge Public House', city: 'Paris', country: 'France', region: 'Europe' },
    { rank: 21, name: 'Satan\'s Whiskers', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 22, name: 'Locale Firenze', city: 'Florence', country: 'Italy', region: 'Europe' },
    { rank: 23, name: 'Tlecān', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 24, name: 'Tan Tan', city: 'São Paulo', country: 'Brazil', region: 'South America' },
    { rank: 25, name: 'Mirror Bar', city: 'Bratislava', country: 'Slovakia', region: 'Europe' },
    { rank: 26, name: 'CoChinChina', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 27, name: 'Baba au Rum', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 28, name: 'Nouvelle Vague', city: 'Tirana', country: 'Albania', region: 'Europe' },
    { rank: 29, name: 'Hope & Sesame', city: 'Guangzhou', country: 'China', region: 'Asia' },
    { rank: 30, name: 'Danico', city: 'Paris', country: 'France', region: 'Europe' },
    { rank: 31, name: 'Scarfes Bar', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 32, name: 'Svanen', city: 'Oslo', country: 'Norway', region: 'Europe' },
    { rank: 33, name: 'Sastrería Martinez', city: 'Lima', country: 'Peru', region: 'South America' },
    { rank: 34, name: 'Panda & Sons', city: 'Edinburgh', country: 'UK', region: 'Europe' },
    { rank: 35, name: 'Röda Huset', city: 'Stockholm', country: 'Sweden', region: 'Europe' },
    { rank: 36, name: 'Mimi Kakushi', city: 'Dubai', country: 'UAE', region: 'Middle East & Africa' },
    { rank: 37, name: 'Salmon Guru', city: 'Madrid', country: 'Spain', region: 'Europe' },
    { rank: 38, name: 'Coa', city: 'Hong Kong', country: 'China', region: 'Asia' },
    { rank: 39, name: 'Sip & Guzzle', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 40, name: 'Drink Kong', city: 'Rome', country: 'Italy', region: 'Europe' },
    { rank: 41, name: 'Double Chicken Please', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 42, name: 'Maybe Sammy', city: 'Sydney', country: 'Australia', region: 'Australasia' },
    { rank: 43, name: '1930', city: 'Milan', country: 'Italy', region: 'Europe' },
    { rank: 44, name: 'Jewel of the South', city: 'New Orleans', country: 'USA', region: 'North America' },
    { rank: 45, name: 'Virtù', city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { rank: 46, name: 'BKK Social Club', city: 'Bangkok', country: 'Thailand', region: 'Asia' },
    { rank: 47, name: 'The Bellwood', city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { rank: 48, name: 'Licorería Limantour', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 49, name: 'Byrdi', city: 'Melbourne', country: 'Australia', region: 'Australasia' },
    { rank: 50, name: 'Nutmeg & Clove', city: 'Singapore', country: 'Singapore', region: 'Asia' },
  ],
  2024: [
    { rank: 1, name: 'Handshake Speakeasy', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 2, name: 'Bar Leone', city: 'Hong Kong', country: 'China', region: 'Asia' },
    { rank: 3, name: 'Sips', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 4, name: 'Tayēr + Elementary', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 5, name: 'Jigger & Pony', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 6, name: 'Line', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 7, name: 'Tres Monos', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 8, name: 'Alquímico', city: 'Cartagena', country: 'Colombia', region: 'South America' },
    { rank: 9, name: 'Zest', city: 'Seoul', country: 'South Korea', region: 'Asia' },
    { rank: 10, name: 'Paradiso', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 11, name: 'Himkok', city: 'Oslo', country: 'Norway', region: 'Europe' },
    { rank: 12, name: 'BKK Social Club', city: 'Bangkok', country: 'Thailand', region: 'Asia' },
    { rank: 13, name: 'Connaught Bar', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 14, name: 'Double Chicken Please', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 15, name: 'Overstory', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 16, name: 'Lady Bee', city: 'Lima', country: 'Peru', region: 'South America' },
    { rank: 17, name: 'Baba au Rum', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 18, name: 'Coa', city: 'Hong Kong', country: 'China', region: 'Asia' },
    { rank: 19, name: 'The Cambridge Public House', city: 'Paris', country: 'France', region: 'Europe' },
    { rank: 20, name: 'Tlecān', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 21, name: 'Caretaker\'s Cottage', city: 'Melbourne', country: 'Australia', region: 'Australasia' },
    { rank: 22, name: 'CoChinChina', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 23, name: 'Salmon Guru', city: 'Madrid', country: 'Spain', region: 'Europe' },
    { rank: 24, name: 'Martiny\'s', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 25, name: 'Bar Benfiddich', city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { rank: 26, name: 'Maybe Sammy', city: 'Sydney', country: 'Australia', region: 'Australasia' },
    { rank: 27, name: 'Superbueno', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 28, name: 'Nutmeg & Clove', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 29, name: 'Satan\'s Whiskers', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 30, name: 'Panda & Sons', city: 'Edinburgh', country: 'UK', region: 'Europe' },
    { rank: 31, name: 'Tan Tan', city: 'São Paulo', country: 'Brazil', region: 'South America' },
    { rank: 32, name: 'Licorería Limantour', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 33, name: 'Drink Kong', city: 'Rome', country: 'Italy', region: 'Europe' },
    { rank: 34, name: 'Jewel of the South', city: 'New Orleans', country: 'USA', region: 'North America' },
    { rank: 35, name: 'Byrdi', city: 'Melbourne', country: 'Australia', region: 'Australasia' },
    { rank: 36, name: 'Locale Firenze', city: 'Florence', country: 'Italy', region: 'Europe' },
    { rank: 37, name: 'Scarfes Bar', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 38, name: 'Lyaness', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 39, name: 'Danico', city: 'Paris', country: 'France', region: 'Europe' },
    { rank: 40, name: 'Café La Trova', city: 'Miami', country: 'USA', region: 'North America' },
    { rank: 41, name: 'Röda Huset', city: 'Stockholm', country: 'Sweden', region: 'Europe' },
    { rank: 42, name: '1930', city: 'Milan', country: 'Italy', region: 'Europe' },
    { rank: 43, name: 'Mimi Kakushi', city: 'Dubai', country: 'UAE', region: 'Middle East & Africa' },
    { rank: 44, name: 'L\'Antiquario', city: 'Naples', country: 'Italy', region: 'Europe' },
    { rank: 45, name: 'Katana Kitten', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 46, name: 'Carnaval', city: 'Lima', country: 'Peru', region: 'South America' },
    { rank: 47, name: 'Baltra Bar', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 48, name: 'Galaxy Bar', city: 'Dubai', country: 'UAE', region: 'Middle East & Africa' },
    { rank: 49, name: 'Wax On', city: 'Berlin', country: 'Germany', region: 'Europe' },
    { rank: 50, name: '1930', city: 'Milan', country: 'Italy', region: 'Europe' },
  ],
  2023: [
    { rank: 1, name: 'Sips', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 2, name: 'Double Chicken Please', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 3, name: 'Handshake Speakeasy', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 4, name: 'Paradiso', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 5, name: 'Connaught Bar', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 6, name: 'Little Red Door', city: 'Paris', country: 'France', region: 'Europe' },
    { rank: 7, name: 'Licorería Limantour', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 8, name: 'Tayēr + Elementary', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 9, name: 'Alquímico', city: 'Cartagena', country: 'Colombia', region: 'South America' },
    { rank: 10, name: 'Himkok', city: 'Oslo', country: 'Norway', region: 'Europe' },
    { rank: 11, name: 'Tres Monos', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 12, name: 'Line', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 13, name: 'BKK Social Club', city: 'Bangkok', country: 'Thailand', region: 'Asia' },
    { rank: 14, name: 'Jigger & Pony', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 15, name: 'Maybe Sammy', city: 'Sydney', country: 'Australia', region: 'Australasia' },
    { rank: 16, name: 'Night Hawk', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 17, name: 'Lady Bee', city: 'Lima', country: 'Peru', region: 'South America' },
    { rank: 18, name: 'Zest', city: 'Seoul', country: 'South Korea', region: 'Asia' },
    { rank: 19, name: 'Mahaniyom', city: 'Bangkok', country: 'Thailand', region: 'Asia' },
    { rank: 20, name: 'Coa', city: 'Hong Kong', country: 'China', region: 'Asia' },
    { rank: 21, name: 'Drink Kong', city: 'Rome', country: 'Italy', region: 'Europe' },
    { rank: 22, name: 'Hanky Panky', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 23, name: 'Caretaker\'s Cottage', city: 'Melbourne', country: 'Australia', region: 'Australasia' },
    { rank: 24, name: 'Café La Trova', city: 'Miami', country: 'USA', region: 'North America' },
    { rank: 25, name: 'Baba au Rum', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 26, name: 'CoChinChina', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 27, name: 'Katana Kitten', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 28, name: 'Satan\'s Whiskers', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 29, name: 'Wax On', city: 'Berlin', country: 'Germany', region: 'Europe' },
    { rank: 30, name: 'Florería Atlántico', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 31, name: 'Röda Huset', city: 'Stockholm', country: 'Sweden', region: 'Europe' },
    { rank: 32, name: 'Sago House', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 33, name: 'Freni e Frizioni', city: 'Rome', country: 'Italy', region: 'Europe' },
    { rank: 34, name: 'Argo', city: 'Hong Kong', country: 'China', region: 'Asia' },
    { rank: 35, name: 'A Bar with Shapes for a Name', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 36, name: 'The SG Club', city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { rank: 37, name: 'Bar Benfiddich', city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { rank: 38, name: 'The Cambridge Public House', city: 'Paris', country: 'France', region: 'Europe' },
    { rank: 39, name: 'Panda & Sons', city: 'Edinburgh', country: 'UK', region: 'Europe' },
    { rank: 40, name: 'Mimi Kakushi', city: 'Dubai', country: 'UAE', region: 'Middle East & Africa' },
    { rank: 41, name: 'Scarfes Bar', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 42, name: '1930', city: 'Milan', country: 'Italy', region: 'Europe' },
    { rank: 43, name: 'Carnaval', city: 'Lima', country: 'Peru', region: 'South America' },
    { rank: 44, name: 'L\'Antiquario', city: 'Naples', country: 'Italy', region: 'Europe' },
    { rank: 45, name: 'Baltra Bar', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 46, name: 'Locale Firenze', city: 'Florence', country: 'Italy', region: 'Europe' },
    { rank: 47, name: 'The Clumsies', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 48, name: 'Atlas', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 49, name: 'Jewel of the South', city: 'New Orleans', country: 'USA', region: 'North America' },
    { rank: 50, name: 'Galaxy Bar', city: 'Dubai', country: 'UAE', region: 'Middle East & Africa' },
  ],
  2022: [
    { rank: 1, name: 'Paradiso', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 2, name: 'Tayēr + Elementary', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 3, name: 'Sips', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 4, name: 'Licorería Limantour', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 5, name: 'Little Red Door', city: 'Paris', country: 'France', region: 'Europe' },
    { rank: 6, name: 'Double Chicken Please', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 7, name: 'Two Schmucks', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 8, name: 'Connaught Bar', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 9, name: 'Katana Kitten', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 10, name: 'Alquímico', city: 'Cartagena', country: 'Colombia', region: 'South America' },
    { rank: 11, name: 'Handshake Speakeasy', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 12, name: 'Jigger & Pony', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 13, name: 'Hanky Panky', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 14, name: 'BKK Social Club', city: 'Bangkok', country: 'Thailand', region: 'Asia' },
    { rank: 15, name: 'Salmon Guru', city: 'Madrid', country: 'Spain', region: 'Europe' },
    { rank: 16, name: 'Drink Kong', city: 'Rome', country: 'Italy', region: 'Europe' },
    { rank: 17, name: 'Coa', city: 'Hong Kong', country: 'China', region: 'Asia' },
    { rank: 18, name: 'Florería Atlántico', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 19, name: 'The Clumsies', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 20, name: 'Baba au Rum', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 21, name: 'Café La Trova', city: 'Miami', country: 'USA', region: 'North America' },
    { rank: 22, name: 'Attaboy', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 23, name: 'Satan\'s Whiskers', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 24, name: 'Tropic City', city: 'Bangkok', country: 'Thailand', region: 'Asia' },
    { rank: 25, name: 'Kumiko', city: 'Chicago', country: 'USA', region: 'North America' },
    { rank: 26, name: 'Sidecar', city: 'New Delhi', country: 'India', region: 'Asia' },
    { rank: 27, name: 'Tres Monos', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 28, name: 'Argo', city: 'Hong Kong', country: 'China', region: 'Asia' },
    { rank: 29, name: 'Maybe Sammy', city: 'Sydney', country: 'Australia', region: 'Australasia' },
    { rank: 30, name: 'Swift', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 31, name: 'Line', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 32, name: 'Baltra Bar', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 33, name: 'Manhattan', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 34, name: 'Overstory', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 35, name: '1930', city: 'Milan', country: 'Italy', region: 'Europe' },
    { rank: 36, name: 'Dante', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 37, name: 'A Bar with Shapes for a Name', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 38, name: 'Zuma', city: 'Dubai', country: 'UAE', region: 'Middle East & Africa' },
    { rank: 39, name: 'Locale Firenze', city: 'Florence', country: 'Italy', region: 'Europe' },
    { rank: 40, name: 'Red Frog', city: 'Lisbon', country: 'Portugal', region: 'Europe' },
    { rank: 41, name: 'Cantina OK!', city: 'Sydney', country: 'Australia', region: 'Australasia' },
    { rank: 42, name: 'CoChinChina', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 43, name: 'Himkok', city: 'Oslo', country: 'Norway', region: 'Europe' },
    { rank: 44, name: 'Carnaval', city: 'Lima', country: 'Peru', region: 'South America' },
    { rank: 45, name: 'Galaxy Bar', city: 'Dubai', country: 'UAE', region: 'Middle East & Africa' },
    { rank: 46, name: 'L\'Antiquario', city: 'Naples', country: 'Italy', region: 'Europe' },
    { rank: 47, name: 'Employees Only', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 48, name: 'Bar Benfiddich', city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { rank: 49, name: 'Lucy\'s Flower Shop', city: 'Stockholm', country: 'Sweden', region: 'Europe' },
    { rank: 50, name: 'Bulgari Bar', city: 'Dubai', country: 'UAE', region: 'Middle East & Africa' },
  ],
  2021: [
    { rank: 1, name: 'Connaught Bar', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 2, name: 'Tayēr + Elementary', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 3, name: 'Paradiso', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 4, name: 'The Clumsies', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 5, name: 'Florería Atlántico', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 6, name: 'Licorería Limantour', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 7, name: 'Coa', city: 'Hong Kong', country: 'China', region: 'Asia' },
    { rank: 8, name: 'El Copitas', city: 'St Petersburg', country: 'Russia', region: 'Europe' },
    { rank: 9, name: 'Jigger & Pony', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 10, name: 'Katana Kitten', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 11, name: 'Two Schmucks', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 12, name: 'Hanky Panky', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 13, name: 'Insider Bar', city: 'Moscow', country: 'Russia', region: 'Europe' },
    { rank: 14, name: 'Baba au Rum', city: 'Athens', country: 'Greece', region: 'Europe' },
    { rank: 15, name: 'Manhattan', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 16, name: 'Atlas', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 17, name: 'Zuma', city: 'Dubai', country: 'UAE', region: 'Middle East & Africa' },
    { rank: 18, name: 'The SG Club', city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { rank: 19, name: 'Drink Kong', city: 'Rome', country: 'Italy', region: 'Europe' },
    { rank: 20, name: '1930', city: 'Milan', country: 'Italy', region: 'Europe' },
    { rank: 21, name: 'Presidente', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 22, name: 'Maybe Sammy', city: 'Sydney', country: 'Australia', region: 'Australasia' },
    { rank: 23, name: 'Cantina OK!', city: 'Sydney', country: 'Australia', region: 'Australasia' },
    { rank: 24, name: 'Salmon Guru', city: 'Madrid', country: 'Spain', region: 'Europe' },
    { rank: 25, name: 'Handshake Speakeasy', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 26, name: 'No Sleep Club', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 27, name: 'Camparino in Galleria', city: 'Milan', country: 'Italy', region: 'Europe' },
    { rank: 28, name: 'Café La Trova', city: 'Miami', country: 'USA', region: 'North America' },
    { rank: 29, name: 'Little Red Door', city: 'Paris', country: 'France', region: 'Europe' },
    { rank: 30, name: 'Dante', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 31, name: 'Kwānt', city: 'London', country: 'UK', region: 'Europe' },
    { rank: 32, name: 'Bar Benfiddich', city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { rank: 33, name: 'Tres Monos', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { rank: 34, name: 'Attaboy', city: 'New York', country: 'USA', region: 'North America' },
    { rank: 35, name: 'Lucy\'s Flower Shop', city: 'Stockholm', country: 'Sweden', region: 'Europe' },
    { rank: 36, name: 'MO Bar', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 37, name: 'Sips', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { rank: 38, name: 'Baltra Bar', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { rank: 39, name: 'Sober Company', city: 'Shanghai', country: 'China', region: 'Asia' },
    { rank: 40, name: 'Tjoget', city: 'Stockholm', country: 'Sweden', region: 'Europe' },
    { rank: 41, name: 'Epic', city: 'Shanghai', country: 'China', region: 'Asia' },
    { rank: 42, name: 'Charles H', city: 'Seoul', country: 'South Korea', region: 'Asia' },
    { rank: 43, name: 'Tippling Club', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { rank: 44, name: 'Above Board', city: 'Melbourne', country: 'Australia', region: 'Australasia' },
    { rank: 45, name: 'Galaxy Bar', city: 'Dubai', country: 'UAE', region: 'Middle East & Africa' },
    { rank: 46, name: 'Re', city: 'Sydney', country: 'Australia', region: 'Australasia' },
    { rank: 47, name: 'Sidecar', city: 'New Delhi', country: 'India', region: 'Asia' },
    { rank: 48, name: 'Union Trading Company', city: 'Shanghai', country: 'China', region: 'Asia' },
    { rank: 49, name: 'Darkside', city: 'Hong Kong', country: 'China', region: 'Asia' },
    { rank: 50, name: 'Quinary', city: 'Hong Kong', country: 'China', region: 'Asia' },
  ],
}

// ═══════════════════════════════════════════════════════════════
// LONDON KEY ACCOUNTS — VENUE INTELLIGENCE DATABASE
// ═══════════════════════════════════════════════════════════════

const LONDON_VENUES = [
  // TOP 50 BEST BARS (London entries)
  { name: 'Tayēr + Elementary', type: 'Bar', area: 'Shoreditch', accountType: 'Luxury', estRevenue: '£3.5M', fiftyBest: [2,4,8,2,5], founders: 'Monica Berg & Alex Kratena', knownBrands: ['Desi Daru','Everleaf','Svitlo Vodka','Muyu','Suze','Martini Ambrato','Tio Pepe'], parentCompanies: ['Independent','Pernod Ricard','Bacardi'], notes: 'Co-founder Monica Berg named Roku Industry Icon 2024. RTD line with Everleaf. Pioneering draught cocktail system.' },
  { name: 'Connaught Bar', type: 'Hotel Bar', area: 'Mayfair', accountType: 'Luxury', estRevenue: '£8M', fiftyBest: [1,8,5,13,6], founders: 'Agostino Perrone (Dir. Mixology)', knownBrands: ['Roku Gin','Star of Bombay','Grey Goose','Ketel One','Macallan 12','Woodford Reserve','Patrón','WhistlePig','Haku Vodka','Laurent Perrier','Campari','Martini','Bacardi Carta Blanca','Ron Santiago de Cuba','Galliano','Benedictine','Angostura'], parentCompanies: ['Beam Suntory','Bacardi','Diageo','Pernod Ricard','LVMH','Campari Group'], notes: 'World\'s Best Bar 2020 & 2021. Signature Martini trolley service. 2024 cocktail book published. Vintage spirits collection (1970s Gordon\'s, Campari, Cointreau).' },
  { name: 'Satan\'s Whiskers', type: 'Bar', area: 'Bethnal Green', accountType: 'Luxury', estRevenue: '£2M', fiftyBest: [null,23,28,29,21], founders: 'Kevin Armstrong, Damian Benjamin, Fraser Chapman', knownBrands: ['Tanqueray','Noilly Prat','Knob Creek','Aperol','Grand Marnier','Campari','Chartreuse','Fernet Branca'], parentCompanies: ['Diageo','Bacardi','Campari Group','Brown-Forman','Pernod Ricard'], notes: 'London\'s bartender\'s bar. 900-strong classic cocktail list. Daily rotating printed menu. Blind-tasting spirit selection policy. No pre-batching.' },
  { name: 'Scarfes Bar', type: 'Hotel Bar', area: 'Holborn', accountType: 'Luxury', estRevenue: '£5M', fiftyBest: [null,null,41,37,31], founders: 'Rosewood London', knownBrands: ['Appleton 12','The Lakes','Grey Goose','Macallan 12','Glen Grant 12','Michter\'s Rye','No.3 Gin','St-Germain','Campari','Hendrick\'s','Highland Park 12','Aperol','Renais Gin','Rémy Martin 1738','Bruichladdich'], parentCompanies: ['Campari Group','Edrington','Diageo','Beam Suntory','Pernod Ricard','Rémy Cointreau','William Grant & Sons','Berry Bros & Rudd'], notes: 'No.1 Best International Hotel Bar (Tales of the Cocktail 2024). Gerald Scarfe caricatures. First to list Renais Gin (Emma Watson). Live jazz nightly.' },
  { name: 'Lyaness', type: 'Hotel Bar', area: 'Southbank', accountType: 'Luxury', estRevenue: '£4M', fiftyBest: [null,null,null,38,null], founders: 'Ryan Chetiyawardana (Mr Lyan)', knownBrands: ['Macallan 12 Double Cask','Compass Box','Empirical Spirits'], parentCompanies: ['Edrington','Independent'], notes: 'World\'s most awarded bartender. First ever 3-PIN bar. 6-month menu R&D cycle. Pioneer of enzyme-fermentation and lacto-fermentation.' },
  { name: 'A Bar with Shapes for a Name', type: 'Bar', area: 'Hackney', accountType: 'Luxury', estRevenue: '£1.5M', fiftyBest: [null,37,35,null,null], founders: 'N/A', knownBrands: [], parentCompanies: [], notes: 'Featured on 50 Best 2022 & 2023.' },
  { name: 'Swift', type: 'Bar', area: 'Soho', accountType: 'Luxury', estRevenue: '£3M', fiftyBest: [null,30,null,null,null], founders: 'Mia Johansson & Bobby Hiddleston', knownBrands: ['Jack Daniel\'s','Monkey Shoulder','Beefeater','Tapatio Blanco','Del Maguey Vida','Clos Martin Armagnac','Lot 40 Rye','Aluna Rum','Cocchi','Campari','Amaro Nonino','Amaro Averna','Aperitivo Select'], parentCompanies: ['Brown-Forman','William Grant & Sons','Pernod Ricard','Beam Suntory','Campari Group','Independent'], notes: '3 locations (Soho, Shoreditch, Borough). 300+ whiskies downstairs. Famous Irish Coffee. 10th anniversary 2026.' },
  { name: 'Kwānt', type: 'Bar', area: 'Mayfair', accountType: 'Luxury', estRevenue: '£2.5M', fiftyBest: [31,null,null,null,null], founders: 'Erik Lorincz (ex-American Bar, Savoy)', knownBrands: ['Roku Gin','Woodford Reserve','Ford\'s Gin','Michter\'s','Matusalem','Avallen Calvados','Nikka Coffey Gin','Nikka Taketsuru','Nikka Yoichi','Nikka Miyagikyo','Nikka Coffey Vodka','St Germain','Tio Pepe','Cocchi Americano','Muyu'], parentCompanies: ['Beam Suntory','Brown-Forman','William Grant & Sons','Nikka/Asahi','Pernod Ricard'], notes: 'Omakase cocktail experience with Nikka. In-house microherb growing system. Beneath Momo restaurant.' },
  // ICONIC LONDON HOTEL BARS
  { name: 'American Bar at The Savoy', type: 'Hotel Bar', area: 'Strand', accountType: 'Both', estRevenue: '£7M', fiftyBest: [], founders: 'Est. 1893 — Angelo Sparvoli (Head Bartender)', knownBrands: ['Bacardi Carta Blanca','Absolut Elyx','Rabbit Hole Rye','Amaro Lucano','Muyu Jasmine Verte','Muyu Vetiver Gris','Luxardo Bitter Bianco','Cocchi Americano','Cocchi Rosa','Nyetimber','The Lakes Whisky','Bombay Sapphire','Fernet-Branca','ecoSPIRITS'], parentCompanies: ['Bacardi','Pernod Ricard','Independent','Campari Group','Davide Campari'], notes: 'Longest surviving cocktail bar in London (1893). Known Bacardi partnership/incubator — multiple Bacardi portfolio brands featured. ecoSPIRITS sustainability partner. Head bartender Angelo Sparvoli returned 2024.' },
  { name: 'Artesian at The Langham', type: 'Hotel Bar', area: 'Marylebone', accountType: 'Luxury', estRevenue: '£5M', fiftyBest: [], founders: 'The Langham London', knownBrands: ['Rémy Martin','Hennessy','Grey Goose','Belvedere','Dom Pérignon'], parentCompanies: ['Rémy Cointreau','LVMH','Pernod Ricard'], notes: 'Four-time World\'s Best Bar winner (2012-2015). Strong LVMH and Rémy Cointreau presence historically.' },
  { name: 'Beaufort Bar at The Savoy', type: 'Hotel Bar', area: 'Strand', accountType: 'Both', estRevenue: '£4M', fiftyBest: [], founders: 'The Savoy', knownBrands: ['Dom Pérignon','Moët & Chandon','Veuve Clicquot','Hennessy','Glenmorangie'], parentCompanies: ['LVMH','Diageo'], notes: 'Art Deco cabaret bar. Strong LVMH champagne presence. Live entertainment.' },
  // PRIVATE MEMBERS CLUBS
  { name: 'Annabel\'s', type: 'Private Members Club', area: 'Mayfair', accountType: 'Both', estRevenue: '£52M', fiftyBest: [], founders: 'Mark Birley (1963), now Birley Clubs', knownBrands: ['Dom Pérignon','Hennessy','WhistlePig','Suntory Toki','Ki No Bi Sei','Boërl & Kroff','Screaming Eagle','Romanée-Conti','Pétrus','Sassicaia'], parentCompanies: ['LVMH','Beam Suntory','Independent'], notes: '~£52M annual revenue. 25% from membership fees. World\'s largest Dom Pérignon collection. 600+ tequila bottles. LVMH/large champagne houses pay heavily for menu featuring. Retros + marketing spend. Bolivar restaurant (2024) — agave-focused.' },
  { name: 'Soho House (Multiple)', type: 'Private Members Club', area: 'Various', accountType: 'Volume', estRevenue: '£180M (UK)', fiftyBest: [], founders: 'Nick Jones', knownBrands: ['Grey Goose','Patrón','Casamigos','Hendrick\'s','Sipsmith'], parentCompanies: ['Bacardi','Diageo','William Grant & Sons'], notes: 'Volume account across multiple locations. Standardised cocktail menus. Good for brand visibility with creative industry audience.' },
  { name: 'The Arts Club', type: 'Private Members Club', area: 'Mayfair', accountType: 'Luxury', estRevenue: '£20M', fiftyBest: [], founders: 'Est. 1863', knownBrands: ['Dom Pérignon','Cristal','Krug','Macallan','Glenfiddich'], parentCompanies: ['LVMH','Edrington','William Grant & Sons'], notes: 'Ultra high-net-worth members. Premium champagne and whisky focus.' },
  // HIGH-VOLUME NIGHTLIFE
  { name: 'Chiltern Firehouse', type: 'Restaurant & Bar', area: 'Marylebone', accountType: 'Both', estRevenue: '£25M', fiftyBest: [], founders: 'André Balazs', knownBrands: ['Casamigos','Don Julio','Patrón','Grey Goose','Belvedere','Dom Pérignon'], parentCompanies: ['Diageo','Bacardi','LVMH','Pernod Ricard'], notes: 'Celebrity hotspot. High-volume table service. Premium tequila and champagne heavy.' },
  { name: 'Sexy Fish', type: 'Restaurant & Bar', area: 'Mayfair', accountType: 'Both', estRevenue: '£35M', fiftyBest: [], founders: 'Richard Caring (Caprice Holdings)', knownBrands: ['Dom Pérignon','Cristal','Clase Azul','Don Julio 1942','Grey Goose','Belvedere'], parentCompanies: ['LVMH','Diageo','Pernod Ricard','Independent'], notes: 'One of London\'s highest-grossing restaurants. Massive champagne and premium spirits volume. Table-service driven.' },
  { name: 'The Ivy', type: 'Restaurant & Bar', area: 'Covent Garden', accountType: 'Volume', estRevenue: '£30M (group)', fiftyBest: [], founders: 'Richard Caring (Caprice Holdings)', knownBrands: ['Sipsmith','Tanqueray','Grey Goose','Veuve Clicquot','Moët & Chandon'], parentCompanies: ['Beam Suntory','Diageo','Pernod Ricard','LVMH'], notes: 'Massive footfall across multiple locations. Volume-driven spirit contracts.' },
  // MICHELIN-STARRED RESTAURANTS
  { name: 'Restaurant Gordon Ramsay', type: 'Restaurant', area: 'Chelsea', accountType: 'Luxury', stars: 3, estRevenue: '£8M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Hennessy','Macallan','Rémy Martin'], parentCompanies: ['LVMH','Edrington','Rémy Cointreau'], notes: '3 Michelin stars. London\'s longest-running three-star. Premium wine and spirits list.' },
  { name: 'The Ledbury', type: 'Restaurant', area: 'Notting Hill', accountType: 'Luxury', stars: 3, estRevenue: '£5M', fiftyBest: [], knownBrands: ['Krug','Pol Roger','Hennessy','Rémy Martin XO'], parentCompanies: ['LVMH','Rémy Cointreau'], notes: '3 Michelin stars (2024). Brett Graham. Premium wine-led programme.' },
  { name: 'Core by Clare Smyth', type: 'Restaurant', area: 'Notting Hill', accountType: 'Luxury', stars: 3, estRevenue: '£6M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Laurent-Perrier'], parentCompanies: ['LVMH'], notes: '3 Michelin stars. World\'s 50 Best Restaurants #97 (2024). British ingredients focus.' },
  { name: 'Kol', type: 'Restaurant', area: 'Marylebone', accountType: 'Luxury', stars: 1, estRevenue: '£4M', fiftyBest: [], knownBrands: ['Clase Azul','Patrón','Don Julio','Del Maguey','Fortaleza','Casa Noble','Ocho'], parentCompanies: ['Bacardi','Diageo','Independent'], notes: 'World\'s 50 Best #17 (2024). Santiago Lastra. Mexican cuisine with British ingredients. Strong agave spirits programme.' },
  { name: 'Ikoyi', type: 'Restaurant', area: 'Strand', accountType: 'Luxury', stars: 2, estRevenue: '£3.5M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Hennessy'], parentCompanies: ['LVMH'], notes: '2 Michelin stars. World\'s 50 Best #42 (2024). West African spices + British ingredients.' },
  { name: 'Brat', type: 'Restaurant', area: 'Shoreditch', accountType: 'Both', stars: 1, estRevenue: '£5M', fiftyBest: [], knownBrands: ['Txakoli','natural wines','Hendrick\'s','Monkey Shoulder'], parentCompanies: ['William Grant & Sons','Independent'], notes: '1 Michelin star. World\'s 50 Best #65. Tomos Parry. Basque grill. Wine-forward programme.' },
  { name: 'Gymkhana', type: 'Restaurant', area: 'Mayfair', accountType: 'Luxury', stars: 2, estRevenue: '£8M', fiftyBest: [], knownBrands: ['Macallan','Glenfiddich','Rémy Martin','Hennessy','Dom Pérignon'], parentCompanies: ['Edrington','William Grant & Sons','Rémy Cointreau','LVMH'], notes: '2 Michelin stars (2024). First 2-star Indian restaurant in UK. Strong whisky and cognac programme.' },
  { name: 'The Ritz Restaurant', type: 'Restaurant', area: 'Piccadilly', accountType: 'Luxury', stars: 2, estRevenue: '£15M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Cristal','Rémy Martin Louis XIII','Macallan 18+','Hennessy Paradis'], parentCompanies: ['LVMH','Rémy Cointreau','Edrington'], notes: '2 Michelin stars (2025). Ultra-luxury wine and spirits programme. Afternoon tea generates massive champagne volume.' },
  { name: 'Dinner by Heston', type: 'Restaurant', area: 'Knightsbridge', accountType: 'Luxury', stars: 2, estRevenue: '£10M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Tanqueray','Hendrick\'s'], parentCompanies: ['LVMH','Diageo','William Grant & Sons'], notes: '2 Michelin stars. Historical British recipes reinterpreted. Strong wine programme.' },
  { name: 'Bonheur by Matt Abé', type: 'Restaurant', area: 'Mayfair', accountType: 'Luxury', stars: 2, estRevenue: '£4M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Hennessy'], parentCompanies: ['LVMH'], notes: '2 Michelin stars within 3 months of opening. Ex-Restaurant Gordon Ramsay head chef.' },
  { name: 'Plates', type: 'Restaurant', area: 'King\'s Cross', accountType: 'Luxury', stars: 1, estRevenue: '£2M', fiftyBest: [], knownBrands: ['Seedlip','Lyre\'s','natural wines'], parentCompanies: ['Diageo (Seedlip)','Independent'], notes: '1 Michelin star (2025). First fully plant-based restaurant in UK/Ireland to receive a star. Strong no/low alcohol programme.' },
]

// ═══════════════════════════════════════════════════════════════
// 50 BEST BARS — AWARD SPONSORS (Brand presence via sponsorship)
// ═══════════════════════════════════════════════════════════════

const AWARD_SPONSORS = {
  2025: { 'Roku Gin': 'Industry Icon Award', 'Nikka Whisky': 'Highest Climber Award', 'Disaronno': 'Highest New Entry Award', 'Ketel One': 'Sustainable Bar Award', 'Perrier': 'Best Bar in North America', 'Siete Misterios': 'Best Bar in Mexico', 'Campari': 'One To Watch Award', 'Rémy Martin': 'Art of Hospitality Award' },
  2024: { 'Roku Gin': 'Industry Icon Award', 'Nikka Whisky': 'Highest Climber Award', 'Disaronno': 'Highest New Entry Award', 'Ketel One': 'Sustainable Bar Award', 'Perrier': 'Best Bar in North America', 'Campari': 'One To Watch Award', 'Rémy Martin': 'Art of Hospitality Award' },
  2023: { 'Roku Gin': 'Industry Icon Award', 'Nikka Whisky': 'Highest Climber Award', 'Disaronno': 'Highest New Entry Award', 'Ketel One': 'Sustainable Bar Award', 'Campari': 'One To Watch Award' },
  2022: { 'Roku Gin': 'Industry Icon Award', 'Nikka Whisky': 'Highest Climber Award', 'Ketel One': 'Sustainable Bar Award', 'Campari': 'One To Watch Award' },
  2021: { 'Roku Gin': 'Industry Icon Award', 'Nikka Whisky': 'Highest Climber Award', 'Ketel One': 'Sustainable Bar Award' },
}

// Map award sponsor brands to parent companies
const SPONSOR_TO_PARENT = {
  'Roku Gin': 'Beam Suntory', 'Nikka Whisky': 'Beam Suntory (Asahi)', 'Disaronno': 'Illva Saronno',
  'Ketel One': 'Diageo', 'Perrier': 'Nestlé', 'Siete Misterios': 'Independent',
  'Campari': 'Campari Group', 'Rémy Martin': 'Rémy Cointreau',
}

// ═══════════════════════════════════════════════════════════════
// KNOWN BRAND AFFILIATIONS FOR 50 BEST BARS GLOBALLY
// Which parent company has contracts/partnerships at these bars
// ═══════════════════════════════════════════════════════════════

const BAR_AFFILIATIONS = {
  'Bar Leone': ['Diageo','Campari Group'],
  'Handshake Speakeasy': ['Bacardi','Pernod Ricard'],
  'Sips': ['Pernod Ricard','Campari Group'],
  'Paradiso': ['Bacardi','Pernod Ricard'],
  'Tay\u0113r + Elementary': ['Diageo','William Grant & Sons','Independent'],
  'Connaught Bar': ['Beam Suntory','Rémy Cointreau','Diageo'],
  'Jigger & Pony': ['Bacardi','Diageo','Pernod Ricard'],
  'Alqu\u00edmico': ['Bacardi','Campari Group'],
  'Superbueno': ['Diageo','Pernod Ricard'],
  'Himkok': ['Independent','Pernod Ricard'],
  'Bar Benfiddich': ['Beam Suntory','Independent'],
  'Satan\'s Whiskers': ['Independent','Campari Group'],
  'Scarfes Bar': ['Diageo','William Grant & Sons','Edrington'],
  'Salmon Guru': ['Bacardi','Pernod Ricard'],
  'Coa': ['Bacardi','Independent'],
  'Drink Kong': ['Campari Group','Diageo'],
  'Baba au Rum': ['Campari Group','Bacardi'],
  'Danico': ['Pernod Ricard','Rémy Cointreau'],
  'Locale Firenze': ['Campari Group','Diageo'],
  'Katana Kitten': ['Beam Suntory','Diageo'],
  'Licorería Limantour': ['Bacardi','Pernod Ricard'],
  'Atlas': ['Pernod Ricard','Diageo','LVMH'],
  'Manhattan Bar': ['Diageo','Rémy Cointreau'],
  'The Old Man': ['Bacardi','Diageo'],
  'Florería Atlántico': ['Bacardi','Campari Group'],
  'Two Schmucks': ['Bacardi','Pernod Ricard'],
  'Kwānt': ['Beam Suntory','Rémy Cointreau','Bacardi'],
  'Swift': ['Diageo','Campari Group','William Grant & Sons'],
  'Lyaness': ['Diageo','Bacardi','Independent'],
  'A Bar with Shapes for a Name': ['Independent','Campari Group'],
  'American Bar': ['Bacardi','Diageo'],
  'Artesian': ['Bacardi','LVMH'],
  'Beaufort Bar': ['Bacardi','LVMH'],
  'Tres Monos': ['Independent','Campari Group'],
  'Lady Bee': ['Pernod Ricard','Independent'],
  'Tan Tan': ['Campari Group','Bacardi'],
  'Mirror Bar': ['Pernod Ricard','Diageo'],
  'CoChinChina': ['Campari Group','Independent'],
  'Nouvelle Vague': ['Independent','Campari Group'],
  'Hope & Sesame': ['Pernod Ricard','Diageo'],
  'Svanen': ['Independent','Pernod Ricard'],
  'Panda & Sons': ['Diageo','William Grant & Sons'],
  'Mimi Kakushi': ['Diageo','LVMH'],
  'Sip & Guzzle': ['Bacardi','Diageo'],
  'Moebius Milano': ['Campari Group','Diageo'],
  'Line': ['Independent','Campari Group'],
  'Bar Us': ['Diageo','Beam Suntory'],
  'Zest': ['Beam Suntory','Diageo'],
  'Bar Nouveau': ['Pernod Ricard','Rémy Cointreau'],
  'The Cambridge Public House': ['Pernod Ricard','Campari Group'],
  'Sastrería Martinez': ['Pernod Ricard','Bacardi'],
  'Röda Huset': ['Pernod Ricard','Independent'],
  'Tlecān': ['Bacardi','Independent'],
  'Caretaker\'s Cottage': ['Independent','Diageo'],
}

// ═══════════════════════════════════════════════════════════════
// ON-TRADE BUDGET BENCHMARKS (industry-standard ranges)
// ═══════════════════════════════════════════════════════════════

const BUDGET_BENCHMARKS = {
  luxury: { label: 'Luxury / Prestige Accounts', retro: '8–15%', marketingSpend: '£5K–£25K/yr', features: 'Menu featuring, glassware, staff training, events', examples: 'Connaught, Scarfes, Ritz', color: '#4a148c' },
  volume: { label: 'Volume Accounts', retro: '15–30%', marketingSpend: '£1K–£5K/yr', features: 'Speed-rail position, house pour, retro on cases', examples: 'Soho House, Ivy Collection, Wetherspoons', color: '#1b5e20' },
  both: { label: 'Dual (Volume + Prestige)', retro: '12–25%', marketingSpend: '£15K–£50K+/yr', features: 'Full programme: retro + featuring + events + training + branding', examples: "Annabel's, Chiltern Firehouse, Arts Club", color: '#c41e3a' },
  smb: { label: 'SMB Brand Entry Budget Guide', retro: '5–10%', marketingSpend: '£500–£2K/yr per venue', features: 'Bartender seeding, tasting sessions, comp bottles', examples: 'Satan\'s Whiskers, Tayēr, Swift, Kwānt', color: '#e65100' },
}

// ═══════════════════════════════════════════════════════════════
// PARENT COMPANY BRAND PORTFOLIO — ON-TRADE INTELLIGENCE
// ═══════════════════════════════════════════════════════════════

const PARENT_COMPANIES = {
  'Diageo': { brands: ['Johnnie Walker','Tanqueray','Don Julio','Casamigos','Smirnoff','Ketel One','Captain Morgan','Baileys','Guinness','Seedlip','Cîroc','Bulleit','Lagavulin','Talisker','Singleton','Ron Zacapa','Zacapa'], color: '#c41e3a' },
  'Pernod Ricard': { brands: ['Absolut','Jameson','Chivas Regal','Beefeater','Havana Club','Malibu','The Glenlivet','Martell','Perrier-Jouët','Mumm','Ricard','Kahlúa','Aberlour','Plymouth Gin','Monkey 47','Malfy','Lillet'], color: '#1a237e' },
  'Bacardi': { brands: ['Bacardi','Bombay Sapphire','Grey Goose','Patrón','Dewar\'s','St-Germain','Martini','Noilly Prat','Aberfeldy','Cazadores','Leblon','Angel\'s Envy','Ilegal Mezcal','Teeling','Banks Rum'], color: '#e65100' },
  'LVMH': { brands: ['Moët & Chandon','Dom Pérignon','Veuve Clicquot','Krug','Hennessy','Glenmorangie','Ardbeg','Belvedere','Ruinart','Mercier','Château d\'Yquem','Cloudy Bay','Volcán','Woodinville'], color: '#4a148c' },
  'Beam Suntory': { brands: ['Jim Beam','Maker\'s Mark','Knob Creek','Roku Gin','Suntory Toki','Hibiki','Yamazaki','Hakushu','Laphroaig','Bowmore','Courvoisier','Sipsmith','Midleton','On The Rocks','Haku Vodka','Ki No Bi'], color: '#1b5e20' },
  'Brown-Forman': { brands: ['Jack Daniel\'s','Woodford Reserve','Old Forester','Herradura','El Jimador','Diplomatico','Benriach','GlenDronach','Glenglassaugh','Chambord'], color: '#bf360c' },
  'Campari Group': { brands: ['Campari','Aperol','Grand Marnier','Wild Turkey','Russell\'s Reserve','Appleton Estate','Wray & Nephew','SKYY Vodka','Espolón','Frangelico','Averna','Braulio','Bisquit & Dubouché'], color: '#d32f2f' },
  'William Grant & Sons': { brands: ['Glenfiddich','Balvenie','Hendrick\'s','Monkey Shoulder','Grant\'s','Tullamore DEW','Drambuie','Sailor Jerry','Milagro','Fistful of Bourbon','Discarded','Aerstone'], color: '#006064' },
  'Rémy Cointreau': { brands: ['Rémy Martin','Louis XIII','Cointreau','The Botanist','Bruichladdich','Port Charlotte','Octomore','Telmont','Mount Gay','Metaxa','St-Rémy'], color: '#311b92' },
  'Edrington': { brands: ['Macallan','Highland Park','Glenrothes','Naked Grouse','Famous Grouse','Cutty Sark','Snow Leopard'], color: '#1a237e' },
}

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════

const COLORS = ['#c41e3a','#1a237e','#e65100','#4a148c','#1b5e20','#bf360c','#d32f2f','#006064','#311b92','#1a237e','#5d4037','#37474f']
const YEARS = [2021, 2022, 2023, 2024, 2025]

export default function VenueIntelligence() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedYear, setSelectedYear] = useState(2025)
  const [venueSearch, setVenueSearch] = useState('')
  const [accountFilter, setAccountFilter] = useState('All')
  const [expandedVenue, setExpandedVenue] = useState(null)

  // Compute London bars in 50 Best each year
  const londonIn50Best = useMemo(() => {
    return YEARS.map(year => {
      const bars = FIFTY_BEST_BARS[year].filter(b => b.city === 'London')
      return { year, count: bars.length, bars: bars.map(b => `#${b.rank} ${b.name}`).join(', ') }
    })
  }, [])

  // Compute UK bars in 50 Best each year (includes Edinburgh)
  const ukIn50Best = useMemo(() => {
    return YEARS.map(year => {
      const bars = FIFTY_BEST_BARS[year].filter(b => b.country === 'UK')
      return { year, count: bars.length, bars: bars.map(b => `#${b.rank} ${b.name} (${b.city})`).join(', ') }
    })
  }, [])

  // City dominance across years
  const cityDominance = useMemo(() => {
    const cityMap = {}
    YEARS.forEach(year => {
      FIFTY_BEST_BARS[year].forEach(bar => {
        if (!cityMap[bar.city]) cityMap[bar.city] = {}
        if (!cityMap[bar.city][year]) cityMap[bar.city][year] = 0
        cityMap[bar.city][year]++
      })
    })
    return Object.entries(cityMap)
      .map(([city, years]) => ({ city, ...years, total: Object.values(years).reduce((a,b) => a + b, 0) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 15)
  }, [])

  // Parent company presence across London venues
  const parentCompanyPresence = useMemo(() => {
    const counts = {}
    LONDON_VENUES.forEach(v => {
      (v.parentCompanies || []).forEach(pc => {
        if (pc === 'Independent') return
        counts[pc] = (counts[pc] || 0) + 1
      })
    })
    return Object.entries(counts)
      .map(([name, venues]) => ({ name, venues, color: PARENT_COMPANIES[name]?.color || '#666' }))
      .sort((a, b) => b.venues - a.venues)
  }, [])

  // Region analysis for selected year
  const regionAnalysis = useMemo(() => {
    const regionMap = {}
    FIFTY_BEST_BARS[selectedYear].forEach(bar => {
      regionMap[bar.region] = (regionMap[bar.region] || 0) + 1
    })
    return Object.entries(regionMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [selectedYear])

  // Perennial bars (appeared in all 5 years)
  const perennialBars = useMemo(() => {
    const barYearMap = {}
    YEARS.forEach(year => {
      FIFTY_BEST_BARS[year].forEach(bar => {
        if (!barYearMap[bar.name]) barYearMap[bar.name] = { name: bar.name, city: bar.city, years: [], ranks: {} }
        barYearMap[bar.name].years.push(year)
        barYearMap[bar.name].ranks[year] = bar.rank
      })
    })
    return Object.values(barYearMap)
      .filter(b => b.years.length >= 4)
      .sort((a, b) => b.years.length - a.years.length || (a.ranks[2025] || 99) - (b.ranks[2025] || 99))
  }, [])

  // Filtered London venues
  const filteredVenues = useMemo(() => {
    return LONDON_VENUES.filter(v => {
      const matchSearch = venueSearch === '' ||
        v.name.toLowerCase().includes(venueSearch.toLowerCase()) ||
        v.area.toLowerCase().includes(venueSearch.toLowerCase()) ||
        (v.knownBrands || []).some(b => b.toLowerCase().includes(venueSearch.toLowerCase()))
      const matchAccount = accountFilter === 'All' || v.accountType === accountFilter
      return matchSearch && matchAccount
    })
  }, [venueSearch, accountFilter])

  // Regional trend over time
  const regionalTrend = useMemo(() => {
    return YEARS.map(year => {
      const regions = {}
      FIFTY_BEST_BARS[year].forEach(bar => {
        regions[bar.region] = (regions[bar.region] || 0) + 1
      })
      return { year: year.toString(), ...regions }
    })
  }, [])

  // Parent company penetration across ALL 50 Best bars per year
  const parentPenetration = useMemo(() => {
    const result = {}
    YEARS.forEach(year => {
      const bars = FIFTY_BEST_BARS[year]
      const parentCounts = {}
      bars.forEach(bar => {
        const affiliations = BAR_AFFILIATIONS[bar.name] || []
        affiliations.forEach(parent => {
          if (parent === 'Independent') return
          parentCounts[parent] = (parentCounts[parent] || 0) + 1
        })
      })
      result[year] = Object.entries(parentCounts)
        .map(([name, count]) => ({ name, count, pct: Math.round(count / 50 * 100) }))
        .sort((a, b) => b.count - a.count)
    })
    return result
  }, [])

  // Overall 5-year parent company dominance (unique bars across all years)
  const overallDominance = useMemo(() => {
    const parentBars = {}
    const totalUniqueBars = new Set()
    YEARS.forEach(year => {
      FIFTY_BEST_BARS[year].forEach(bar => {
        totalUniqueBars.add(bar.name)
        const affiliations = BAR_AFFILIATIONS[bar.name] || []
        affiliations.forEach(parent => {
          if (parent === 'Independent') return
          if (!parentBars[parent]) parentBars[parent] = new Set()
          parentBars[parent].add(bar.name)
        })
      })
    })
    return Object.entries(parentBars)
      .map(([name, bars]) => ({ name, bars: bars.size, total: totalUniqueBars.size, pct: Math.round(bars.size / totalUniqueBars.size * 100), color: PARENT_COMPANIES[name]?.color || '#666' }))
      .sort((a, b) => b.bars - a.bars)
  }, [])

  // Award sponsor spend analysis
  const sponsorAnalysis = useMemo(() => {
    const sponsors = {}
    YEARS.forEach(year => {
      Object.entries(AWARD_SPONSORS[year] || {}).forEach(([brand, award]) => {
        const parent = SPONSOR_TO_PARENT[brand] || 'Other'
        if (!sponsors[brand]) sponsors[brand] = { brand, parent, years: [], awards: [] }
        sponsors[brand].years.push(year)
        sponsors[brand].awards.push({ year, award })
      })
    })
    return Object.values(sponsors).sort((a, b) => b.years.length - a.years.length)
  }, [])

  // Parent company penetration trend (for line chart)
  const penetrationTrend = useMemo(() => {
    return YEARS.map(year => {
      const entry = { year: year.toString() }
      const data = parentPenetration[year] || []
      data.forEach(d => { entry[d.name] = d.pct })
      return entry
    })
  }, [parentPenetration])

  // Independent vs corporate split per year
  const independentVsCorporate = useMemo(() => {
    return YEARS.map(year => {
      const bars = FIFTY_BEST_BARS[year]
      let corporate = 0, independent = 0
      bars.forEach(bar => {
        const affiliations = BAR_AFFILIATIONS[bar.name] || []
        const nonIndependent = affiliations.filter(a => a !== 'Independent')
        if (nonIndependent.length > 0) corporate++
        else independent++
      })
      return { year: year.toString(), 'Corporate-Backed': corporate, 'Independent': independent, corpPct: Math.round(corporate / 50 * 100) }
    })
  }, [])

  const tabs = [
    { id: 'overview', label: '50 Best Analysis', icon: Award },
    { id: 'venues', label: 'London Key Accounts', icon: MapPin },
    { id: 'brands', label: 'Brand Intelligence', icon: Wine },
    { id: 'trends', label: 'Longitudinal Trends', icon: TrendingUp },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display text-navy">Venue & On-Trade Intelligence</h1>
        <p className="text-gray-500 text-sm mt-1">
          World's 50 Best Bars (2021–2025), London key accounts, brand mapping, and on-trade analysis
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════ TAB: 50 BEST ANALYSIS ═══════ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Year Selector */}
          <div className="flex gap-2">
            {YEARS.map(year => (
              <button key={year} onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border ${selectedYear === year ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-200 hover:border-navy'}`}>
                {year}
              </button>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">London Bars in Top 50</p>
              <p className="text-3xl font-bold text-navy mt-1">{FIFTY_BEST_BARS[selectedYear].filter(b => b.city === 'London').length}</p>
              <p className="text-xs text-gray-400 mt-1">{FIFTY_BEST_BARS[selectedYear].filter(b => b.country === 'UK').length} total UK</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Cities Represented</p>
              <p className="text-3xl font-bold text-navy mt-1">{new Set(FIFTY_BEST_BARS[selectedYear].map(b => b.city)).size}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">European Bars</p>
              <p className="text-3xl font-bold text-navy mt-1">{FIFTY_BEST_BARS[selectedYear].filter(b => b.region === 'Europe').length}</p>
              <p className="text-xs text-gray-400 mt-1">{Math.round(FIFTY_BEST_BARS[selectedYear].filter(b => b.region === 'Europe').length / 50 * 100)}% of list</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Asian Bars</p>
              <p className="text-3xl font-bold text-navy mt-1">{FIFTY_BEST_BARS[selectedYear].filter(b => b.region === 'Asia').length}</p>
              <p className="text-xs text-gray-400 mt-1">{Math.round(FIFTY_BEST_BARS[selectedYear].filter(b => b.region === 'Asia').length / 50 * 100)}% of list</p>
            </div>
          </div>

          {/* Region Pie + City Bar Chart */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-navy mb-4">Regional Distribution — {selectedYear}</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={regionAnalysis} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {regionAnalysis.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-navy mb-4">Top Cities by Entries — {selectedYear}</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={(() => {
                  const cityCount = {}
                  FIFTY_BEST_BARS[selectedYear].forEach(b => { cityCount[b.city] = (cityCount[b.city] || 0) + 1 })
                  return Object.entries(cityCount).map(([city, count]) => ({ city, count })).sort((a,b) => b.count - a.count).slice(0, 10)
                })()}  layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="city" type="category" width={120} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1e293b" radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* London Representation Over Time */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-navy mb-4">London & UK Representation in 50 Best (2021–2025)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium">Year</th>
                  <th className="text-center py-2 text-gray-500 font-medium">London Bars</th>
                  <th className="text-center py-2 text-gray-500 font-medium">Total UK</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Bars</th>
                </tr></thead>
                <tbody>
                  {ukIn50Best.map(row => (
                    <tr key={row.year} className="border-b border-gray-50">
                      <td className="py-3 font-semibold text-navy">{row.year}</td>
                      <td className="py-3 text-center">
                        <span className="bg-navy text-white px-2 py-0.5 rounded-full text-xs font-bold">
                          {londonIn50Best.find(l => l.year === row.year)?.count}
                        </span>
                      </td>
                      <td className="py-3 text-center">{row.count}</td>
                      <td className="py-3 text-xs text-gray-600">{row.bars}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Perennial Bars */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-navy mb-1">Perennial Bars — Appeared 4+ Years (2021–2025)</h3>
            <p className="text-xs text-gray-400 mb-4">These are the most consistently ranked bars globally — key accounts for brand partnerships</p>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {perennialBars.map(bar => (
                <div key={bar.name} className="flex items-center gap-4 py-2 border-b border-gray-50">
                  <div className="w-40 font-medium text-sm text-navy truncate">{bar.name}</div>
                  <div className="w-24 text-xs text-gray-500">{bar.city}</div>
                  <div className="flex gap-1">
                    <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${bar.years.length === 5 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {bar.years.length}/5 yrs
                    </span>
                  </div>
                  <div className="flex gap-2 flex-1">
                    {YEARS.map(y => (
                      <span key={y} className={`text-xs w-12 text-center ${bar.ranks[y] ? (bar.ranks[y] <= 10 ? 'font-bold text-green-600' : 'text-gray-600') : 'text-gray-300'}`}>
                        {bar.ranks[y] ? `#${bar.ranks[y]}` : '—'}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full 50 Best List for Selected Year */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-navy mb-4">Complete List — World's 50 Best Bars {selectedYear}</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 max-h-[500px] overflow-y-auto">
              {FIFTY_BEST_BARS[selectedYear].map(bar => (
                <div key={bar.rank} className={`flex items-center gap-3 py-1.5 text-sm ${bar.country === 'UK' ? 'bg-blue-50 rounded px-2 -mx-2' : ''}`}>
                  <span className={`w-7 text-right font-bold ${bar.rank <= 10 ? 'text-gold' : 'text-gray-400'}`}>{bar.rank}</span>
                  <span className={`font-medium ${bar.country === 'UK' ? 'text-navy' : 'text-gray-800'}`}>{bar.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">{bar.city}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════ TAB: LONDON KEY ACCOUNTS ═══════ */}
      {activeTab === 'venues' && (
        <div className="space-y-6">
          {/* Search & Filter */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search venues, areas, or brands..." value={venueSearch} onChange={e => setVenueSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:border-transparent" />
            </div>
            <div className="flex gap-1">
              {['All','Luxury','Volume','Both'].map(f => (
                <button key={f} onClick={() => setAccountFilter(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium ${accountFilter === f ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Account Type Explanation */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-navy mb-2">On-Trade Account Types</h4>
            <div className="grid grid-cols-3 gap-4 text-xs text-gray-700">
              <div><span className="font-bold text-purple-600">Luxury:</span> High-value, notoriety-driven accounts. Brands invest marketing spend for featuring, menu placement, and brand association. Lower volume but high visibility.</div>
              <div><span className="font-bold text-green-600">Volume:</span> High-throughput accounts. Brands offer retros (retrospective discounts) based on volume. More aggressive pricing. Think clubs, large restaurant groups.</div>
              <div><span className="font-bold text-amber-600">Both:</span> Rare accounts with both high volume AND prestige. e.g. Annabel's (~£52M revenue), Sexy Fish (~£35M). Brands compete aggressively for these — offering retros + marketing spend + suspension pricing.</div>
            </div>
          </div>

          {/* Venue Cards */}
          <div className="space-y-3">
            {filteredVenues.map((venue, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="p-4 flex items-start gap-4 cursor-pointer" onClick={() => setExpandedVenue(expandedVenue === i ? null : i)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-navy">{venue.name}</h3>
                      {venue.stars && <span className="text-amber-500 text-xs">{'⭐'.repeat(venue.stars)}</span>}
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${venue.accountType === 'Luxury' ? 'bg-purple-100 text-purple-700' : venue.accountType === 'Volume' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {venue.accountType}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{venue.type}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {venue.area}</span>
                      <span className="flex items-center gap-1"><DollarSign size={12} /> Est. {venue.estRevenue}/yr</span>
                      {venue.fiftyBest && venue.fiftyBest.some(r => r) && (
                        <span className="flex items-center gap-1"><Award size={12} /> 50 Best: {venue.fiftyBest.filter(r => r).length} appearances</span>
                      )}
                    </div>
                  </div>
                  {expandedVenue === i ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                </div>
                {expandedVenue === i && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
                    {venue.fiftyBest && venue.fiftyBest.some(r => r) && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">50 Best Rankings (2021→2025)</p>
                        <div className="flex gap-2">
                          {YEARS.map((y, idx) => (
                            <span key={y} className={`px-2 py-1 rounded text-xs ${venue.fiftyBest[idx] ? (venue.fiftyBest[idx] <= 10 ? 'bg-green-100 text-green-700 font-bold' : 'bg-blue-100 text-blue-700') : 'bg-gray-100 text-gray-400'}`}>
                              {y}: {venue.fiftyBest[idx] ? `#${venue.fiftyBest[idx]}` : '—'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {venue.knownBrands && venue.knownBrands.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Brands on Menu / Known Partnerships</p>
                        <div className="flex flex-wrap gap-1">
                          {venue.knownBrands.map(brand => (
                            <span key={brand} className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-700">{brand}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {venue.parentCompanies && venue.parentCompanies.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Parent Companies Present</p>
                        <div className="flex flex-wrap gap-1">
                          {venue.parentCompanies.map(pc => (
                            <span key={pc} className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: (PARENT_COMPANIES[pc]?.color || '#666') + '20', color: PARENT_COMPANIES[pc]?.color || '#666' }}>
                              {pc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {venue.founders && <p className="text-xs text-gray-600"><span className="font-semibold">Key People:</span> {venue.founders}</p>}
                    <p className="text-xs text-gray-600"><span className="font-semibold">Intel:</span> {venue.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ TAB: BRAND INTELLIGENCE ═══════ */}
      {activeTab === 'brands' && (
        <div className="space-y-6">
          {/* Headline Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Corporate-Backed Bars (2025)</p>
              <p className="text-3xl font-bold text-navy mt-1">{independentVsCorporate.find(d => d.year === '2025')?.corpPct || 0}%</p>
              <p className="text-xs text-gray-400 mt-1">of Top 50 have major company presence</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Top Company (2025)</p>
              <p className="text-xl font-bold mt-1" style={{ color: parentPenetration[2025]?.[0]?.name ? (PARENT_COMPANIES[parentPenetration[2025][0].name]?.color || '#333') : '#333' }}>{parentPenetration[2025]?.[0]?.name || '—'}</p>
              <p className="text-xs text-gray-400 mt-1">{parentPenetration[2025]?.[0]?.pct}% penetration ({parentPenetration[2025]?.[0]?.count}/50 bars)</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Award Sponsors (5yr)</p>
              <p className="text-3xl font-bold text-navy mt-1">{sponsorAnalysis.length}</p>
              <p className="text-xs text-gray-400 mt-1">unique brand sponsors of 50 Best Awards</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Independent Bars (2025)</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{independentVsCorporate.find(d => d.year === '2025')?.['Independent'] || 0}</p>
              <p className="text-xs text-gray-400 mt-1">not tied to a major parent company</p>
            </div>
          </div>

          {/* Parent Company Penetration — THE KEY CHART */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-navy mb-1">Parent Company Penetration: % of Top 50 Bars with Brand Presence ({selectedYear})</h3>
            <p className="text-xs text-gray-400 mb-4">Percentage of 50 Best Bars globally where each parent company has confirmed brand partnerships, house pours, or menu featuring</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={parentPenetration[selectedYear] || []} layout="vertical">
                <XAxis type="number" domain={[0, 70]} tickFormatter={v => `${v}%`} />
                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val) => [`${val}%`, 'Penetration']} />
                <Bar dataKey="pct" radius={[0,4,4,0]}>
                  {(parentPenetration[selectedYear] || []).map((entry, i) => (
                    <Cell key={i} fill={PARENT_COMPANIES[entry.name]?.color || '#666'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {/* Year selector inline */}
            <div className="flex gap-2 mt-3 justify-center">
              {YEARS.map(year => (
                <button key={year} onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 rounded text-xs font-medium border ${selectedYear === year ? 'bg-navy text-white border-navy' : 'bg-white text-gray-500 border-gray-200 hover:border-navy'}`}>
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Corporate vs Independent Split Over Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-navy mb-4">Corporate vs Independent Bars in Top 50 (2021–2025)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={independentVsCorporate}>
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 50]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Corporate-Backed" stackId="a" fill="#1a237e" radius={[4,4,0,0]} />
                  <Bar dataKey="Independent" stackId="a" fill="#4caf50" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Penetration Trend Over Time */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-navy mb-4">Top 5 Parent Company Penetration Trend (%)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={penetrationTrend}>
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={v => `${v}%`} />
                  <Tooltip formatter={(val) => [`${val}%`]} />
                  <Legend />
                  {(overallDominance.slice(0, 5)).map(d => (
                    <Line key={d.name} type="monotone" dataKey={d.name} stroke={d.color} strokeWidth={2} dot={{ r: 3 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Overall 5-Year Dominance Table */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-navy mb-4">5-Year Cumulative Dominance — Parent Company Reach Across All 50 Best Bars (2021–2025)</h3>
            <p className="text-xs text-gray-400 mb-3">Percentage of unique bars (across all 5 years) where each company has confirmed presence</p>
            <div className="space-y-2">
              {overallDominance.map(d => (
                <div key={d.name} className="flex items-center gap-3">
                  <div className="w-32 text-sm font-medium text-navy">{d.name}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                    <div className="h-full rounded-full flex items-center" style={{ width: `${d.pct}%`, backgroundColor: d.color }}>
                      <span className="text-white text-xs font-bold pl-2">{d.pct}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 w-24 text-right">{d.bars}/{d.total} bars</div>
                </div>
              ))}
            </div>
          </div>

          {/* Award Sponsor Intelligence */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-navy mb-1">50 Best Bars — Award Sponsor Intelligence</h3>
            <p className="text-xs text-gray-400 mb-4">Brands that sponsor named awards at the ceremony gain massive bartender community visibility</p>
            <div className="grid grid-cols-2 gap-3">
              {sponsorAnalysis.map(s => (
                <div key={s.brand} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-navy">{s.brand}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">{s.parent}</span>
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {s.awards.map(a => (
                        <p key={a.year} className="text-xs text-gray-500">{a.year}: {a.award}</p>
                      ))}
                    </div>
                    <p className="text-xs font-medium text-amber-700 mt-1">{s.years.length}/5 years as sponsor</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parent Company Presence in London */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-navy mb-4">London Key Account Penetration by Parent Company</h3>
            <p className="text-xs text-gray-400 mb-4">Number of profiled London venues (bars + restaurants) where each parent company has brands on the menu</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={parentCompanyPresence} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val) => [`${val} venues`, 'Presence']} />
                <Bar dataKey="venues" radius={[0,4,4,0]}>
                  {parentCompanyPresence.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Budget Benchmarks for On-Trade */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-navy mb-1">On-Trade Budget Benchmarks — What Brands Actually Spend</h3>
            <p className="text-xs text-gray-400 mb-4">Industry-standard ranges for retros, marketing spend, and activation by account type</p>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(BUDGET_BENCHMARKS).map(([key, data]) => (
                <div key={key} className="p-4 rounded-lg border" style={{ borderColor: data.color + '40', backgroundColor: data.color + '08' }}>
                  <h4 className="text-sm font-semibold mb-2" style={{ color: data.color }}>{data.label}</h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between"><span className="text-gray-500">Retro Range:</span><span className="font-semibold text-gray-700">{data.retro}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Marketing Spend/Yr:</span><span className="font-semibold text-gray-700">{data.marketingSpend}</span></div>
                    <div><span className="text-gray-500">Typical Features:</span><p className="text-gray-700 mt-0.5">{data.features}</p></div>
                    <div><span className="text-gray-500">Example Accounts:</span><p className="font-medium text-gray-700 mt-0.5">{data.examples}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parent Company Portfolio */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(PARENT_COMPANIES).map(([name, data]) => (
              <div key={name} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                  <h4 className="text-sm font-semibold text-navy">{name}</h4>
                  <span className="text-xs text-gray-400 ml-auto">{data.brands.length} brands</span>
                  <span className="text-xs font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: data.color + '15', color: data.color }}>{overallDominance.find(d => d.name === name)?.pct || 0}% reach</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {data.brands.map(brand => (
                    <span key={brand} className="px-1.5 py-0.5 text-xs rounded bg-gray-50 text-gray-600 border border-gray-100">{brand}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Market Insight */}
          <div className="bg-gradient-to-r from-navy to-navy-light rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">On-Trade Market Intelligence — Key Findings</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-white/90">{'\u2022'} <strong>LVMH</strong> dominates the Michelin-starred restaurant circuit {'\u2014'} Dom P{'\u00e9'}rignon and Krug feature in virtually every 2-3 star venue</p>
                <p className="text-white/90">{'\u2022'} <strong>Bacardi</strong> has the strongest hotel bar programme {'\u2014'} American Bar at The Savoy is a known incubator (Bacardi Carta Blanca, Grey Goose, Bombay Sapphire, St-Germain)</p>
                <p className="text-white/90">{'\u2022'} <strong>Beam Suntory</strong> is gaining through Roku Gin partnerships (Connaught, Kw{'\u0101'}nt) and Nikka award sponsorship {'\u2014'} they are the only company sponsoring 2 separate 50 Best awards</p>
                <p className="text-white/90">{'\u2022'} <strong>Diageo</strong> covers the widest range {'\u2014'} from volume accounts (Soho House, The Ivy) to luxury (Don Julio at Chiltern Firehouse), plus Ketel One sponsors the Sustainable Bar Award</p>
              </div>
              <div className="space-y-2">
                <p className="text-white/90">{'\u2022'} <strong>Independent brands</strong> getting shelf space: Renais Gin (Scarfes Bar), Desi Daru (Tay{'\u0113'}r), The Lakes (American Bar, Scarfes), Avallen Calvados (Kw{'\u0101'}nt)</p>
                <p className="text-white/90">{'\u2022'} <strong>No/Low</strong> is growing: Seedlip (Diageo) at Plates, Everleaf at Tay{'\u0113'}r, Lyre{'\u2019'}s expanding</p>
                <p className="text-white/90">{'\u2022'} <strong>Agave spirits</strong> are the fastest-growing backbar category {'\u2014'} Kol driving the trend from Michelin level</p>
                <p className="text-white/90">{'\u2022'} <strong>Private members clubs</strong> (Annabel{'\u2019'}s {'\u00a3'}52M, Arts Club {'\u00a3'}20M) command the highest marketing spend from brands, particularly champagne houses</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════ TAB: LONGITUDINAL TRENDS ═══════ */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          {/* Regional Trend Over Time */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-navy mb-4">Regional Representation in 50 Best Bars (2021–2025)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={regionalTrend}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Europe" stroke="#1a237e" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Asia" stroke="#c41e3a" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="North America" stroke="#e65100" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="South America" stroke="#1b5e20" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Australasia" stroke="#4a148c" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Middle East & Africa" stroke="#bf360c" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* City Dominance Heatmap */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-navy mb-4">City Representation Heatmap (2021–2025)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-500 font-medium">City</th>
                  {YEARS.map(y => <th key={y} className="text-center py-2 text-gray-500 font-medium">{y}</th>)}
                  <th className="text-center py-2 text-gray-500 font-medium">Total</th>
                </tr></thead>
                <tbody>
                  {cityDominance.map(row => (
                    <tr key={row.city} className="border-b border-gray-50">
                      <td className="py-2 font-medium text-navy">{row.city}</td>
                      {YEARS.map(y => (
                        <td key={y} className="py-2 text-center">
                          {row[y] ? (
                            <span className={`inline-block w-8 h-6 leading-6 rounded text-xs font-bold ${row[y] >= 4 ? 'bg-green-500 text-white' : row[y] >= 3 ? 'bg-green-300 text-green-900' : row[y] >= 2 ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                              {row[y]}
                            </span>
                          ) : <span className="text-gray-300">—</span>}
                        </td>
                      ))}
                      <td className="py-2 text-center font-bold text-navy">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Insights for Small/Medium Brands */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
            <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
              <Building2 size={18} /> Strategic Insights for Small-to-Medium Brands
            </h3>
            <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-navy">Entry Strategy — Luxury Accounts</h4>
                  <p>Target independent-minded bars like Satan's Whiskers (blind tasting selection), Tayēr + Elementary (ingredient-led menus), and Lyaness (6-month R&D cycles). These venues select on quality, not corporate spend.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Visibility Strategy — 50 Best Bars</h4>
                  <p>Bars appearing 4+ years in the list (Tayēr, Connaught, Jigger & Pony, Paradiso) are the most valuable long-term partnerships. A brand featured here gets global bartender community visibility.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Sponsorship Awards</h4>
                  <p>50 Best award sponsors: Roku (Industry Icon), Nikka (Highest Climber), Disaronno (Highest New Entry), Ketel One (Sustainable Bar). These brands get massive awareness in the bartender community.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-navy">Volume vs. Marketing Budget</h4>
                  <p>With limited budgets, avoid competing with LVMH/Diageo in volume accounts. Focus on 5-10 key luxury accounts where quality trumps spend. One listing at Connaught or Scarfes is worth more than 50 generic bar listings.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Michelin Restaurant Route</h4>
                  <p>The restaurant wine list is harder to crack than the cocktail bar. Start with cocktail-forward Michelin venues (Kol, Brat) rather than wine-focused fine dining (The Ledbury, Core).</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Geographic Trend</h4>
                  <p>Asia's share has grown from 32% (2021) to match Europe. Latin America is rising. London remains the strongest single-city hub for on-trade credibility globally.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Source Note */}
      <div className="text-xs text-gray-400 border-t border-gray-100 pt-4">
        <p>Data compiled from The World's 50 Best Bars (2021–2025), venue menus, press releases, and industry sources. Revenue estimates are approximate based on industry benchmarks and published reports. Brand presence data reflects published menus and known partnerships — actual backbar selection may vary.</p>
      </div>
    </div>
  )
}
