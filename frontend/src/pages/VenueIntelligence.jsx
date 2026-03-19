import React, { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'
import { MapPin, TrendingUp, Star, Wine, Search, Filter, ChevronDown, ChevronUp, ExternalLink, Award, Users, DollarSign, Building2, Globe, Briefcase, Target, Layers, Shield, Zap, BookOpen, Check, X, ArrowRight, BarChart3 } from 'lucide-react'

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
  { name: 'Tayēr + Elementary', type: 'Bar', area: 'Shoreditch', accountType: 'Luxury', estRevenue: '£3.5M', fiftyBest: [2,4,8,2,5], founders: 'Monica Berg & Alex Kratena', knownBrands: ['Desi Daru','Everleaf','Svitlo Vodka','Muyu','Suze','Martini Ambrato','Tio Pepe'], parentCompanies: ['Independent','Pernod Ricard','Bacardi'], notes: 'Co-founder Monica Berg named Roku Industry Icon 2024. RTD line with Everleaf. Pioneering draught cocktail system.', menuUrl: 'https://www.tfrancisco.com/tayer-elementary', revenueSource: 'Industry estimate based on 80-cover capacity, average spend £45-60pp, operating 6 nights/week in Shoreditch.' },
  { name: 'Connaught Bar', type: 'Hotel Bar', area: 'Mayfair', accountType: 'Luxury', estRevenue: '£8M', fiftyBest: [1,8,5,13,6], founders: 'Agostino Perrone (Dir. Mixology)', knownBrands: ['Roku Gin','Star of Bombay','Grey Goose','Ketel One','Macallan 12','Woodford Reserve','Patrón','WhistlePig','Haku Vodka','Laurent Perrier','Campari','Martini','Bacardi Carta Blanca','Ron Santiago de Cuba','Galliano','Benedictine','Angostura'], parentCompanies: ['Beam Suntory','Bacardi','Diageo','Pernod Ricard','LVMH','Campari Group'], notes: 'World\'s Best Bar 2020 & 2021. Signature Martini trolley service. 2024 cocktail book published. Vintage spirits collection (1970s Gordon\'s, Campari, Cointreau).', menuUrl: 'https://www.the-connaught.co.uk/dining/connaught-bar/', revenueSource: 'Estimated from Maybourne Hotel Group Ltd annual filings (Companies House). Bar revenue allocated from total hotel F&B.' },
  { name: 'Satan\'s Whiskers', type: 'Bar', area: 'Bethnal Green', accountType: 'Luxury', estRevenue: '£2M', fiftyBest: [null,23,28,29,21], founders: 'Kevin Armstrong, Damian Benjamin, Fraser Chapman', knownBrands: ['Tanqueray','Noilly Prat','Knob Creek','Aperol','Grand Marnier','Campari','Chartreuse','Fernet Branca'], parentCompanies: ['Diageo','Bacardi','Campari Group','Brown-Forman','Pernod Ricard'], notes: 'London\'s bartender\'s bar. 900-strong classic cocktail list. Daily rotating printed menu. Blind-tasting spirit selection policy. No pre-batching.', menuUrl: 'https://www.satanswhiskers.com/', revenueSource: 'Industry estimate. Independent single-site bar, ~50 covers, Bethnal Green. No public filings available.' },
  { name: 'Scarfes Bar', type: 'Hotel Bar', area: 'Holborn', accountType: 'Luxury', estRevenue: '£5M', fiftyBest: [null,null,41,37,31], founders: 'Rosewood London', knownBrands: ['Appleton 12','The Lakes','Grey Goose','Macallan 12','Glen Grant 12','Michter\'s Rye','No.3 Gin','St-Germain','Campari','Hendrick\'s','Highland Park 12','Aperol','Renais Gin','Rémy Martin 1738','Bruichladdich'], parentCompanies: ['Campari Group','Edrington','Diageo','Beam Suntory','Pernod Ricard','Rémy Cointreau','William Grant & Sons','Berry Bros & Rudd'], notes: 'No.1 Best International Hotel Bar (Tales of the Cocktail 2024). Gerald Scarfe caricatures. First to list Renais Gin (Emma Watson). Live jazz nightly.', menuUrl: 'https://www.rosewoodhotels.com/en/london/dining/scarfes-bar', revenueSource: 'Estimated from Rosewood Hotel London operations. Rosewood London Ltd Companies House filings. Bar revenue allocated from total hotel F&B.' },
  { name: 'Lyaness', type: 'Hotel Bar', area: 'Southbank', accountType: 'Luxury', estRevenue: '£4M', fiftyBest: [null,null,null,38,null], founders: 'Ryan Chetiyawardana (Mr Lyan)', knownBrands: ['Macallan 12 Double Cask','Compass Box','Empirical Spirits'], parentCompanies: ['Edrington','Independent'], notes: 'World\'s most awarded bartender. First ever 3-PIN bar. 6-month menu R&D cycle. Pioneer of enzyme-fermentation and lacto-fermentation.', menuUrl: 'https://lyaness.com/', revenueSource: 'Industry estimate. Part of Sea Containers London (Lore Group). Single bar operation on Southbank.' },
  { name: 'A Bar with Shapes for a Name', type: 'Bar', area: 'Hackney', accountType: 'Luxury', estRevenue: '£1.5M', fiftyBest: [null,37,35,null,null], founders: 'N/A', knownBrands: [], parentCompanies: [], notes: 'Featured on 50 Best 2022 & 2023.', menuUrl: 'https://www.instagram.com/a_bar_with_shapes_for_a_name_/', revenueSource: 'Industry estimate. Small independent bar in Hackney. No public filings. Revenue based on comparable venues.' },
  { name: 'Swift', type: 'Bar', area: 'Soho', accountType: 'Luxury', estRevenue: '£3M', fiftyBest: [null,30,null,null,null], founders: 'Mia Johansson & Bobby Hiddleston', knownBrands: ['Jack Daniel\'s','Monkey Shoulder','Beefeater','Tapatio Blanco','Del Maguey Vida','Clos Martin Armagnac','Lot 40 Rye','Aluna Rum','Cocchi','Campari','Amaro Nonino','Amaro Averna','Aperitivo Select'], parentCompanies: ['Brown-Forman','William Grant & Sons','Pernod Ricard','Beam Suntory','Campari Group','Independent'], notes: '3 locations (Soho, Shoreditch, Borough). 300+ whiskies downstairs. Famous Irish Coffee. 10th anniversary 2026.', menuUrl: 'https://www.barswift.com/menus/', revenueSource: 'Industry estimate across 3 locations (Soho, Shoreditch, Borough). No public parent company filings available.' },
  { name: 'Kwānt', type: 'Bar', area: 'Mayfair', accountType: 'Luxury', estRevenue: '£2.5M', fiftyBest: [31,null,null,null,null], founders: 'Erik Lorincz (ex-American Bar, Savoy)', knownBrands: ['Roku Gin','Woodford Reserve','Ford\'s Gin','Michter\'s','Matusalem','Avallen Calvados','Nikka Coffey Gin','Nikka Taketsuru','Nikka Yoichi','Nikka Miyagikyo','Nikka Coffey Vodka','St Germain','Tio Pepe','Cocchi Americano','Muyu'], parentCompanies: ['Beam Suntory','Brown-Forman','William Grant & Sons','Nikka/Asahi','Pernod Ricard'], notes: 'Omakase cocktail experience with Nikka. In-house microherb growing system. Beneath Momo restaurant.', menuUrl: 'https://www.kwant.bar/', revenueSource: 'Industry estimate. Located beneath Momo restaurant, Mayfair. Single-site operation.' },
  // ICONIC LONDON HOTEL BARS
  { name: 'American Bar at The Savoy', type: 'Hotel Bar', area: 'Strand', accountType: 'Both', estRevenue: '£7M', fiftyBest: [], founders: 'Est. 1893 — Angelo Sparvoli (Head Bartender)', knownBrands: ['Bacardi Carta Blanca','Absolut Elyx','Rabbit Hole Rye','Amaro Lucano','Muyu Jasmine Verte','Muyu Vetiver Gris','Luxardo Bitter Bianco','Cocchi Americano','Cocchi Rosa','Nyetimber','The Lakes Whisky','Bombay Sapphire','Fernet-Branca','ecoSPIRITS'], parentCompanies: ['Bacardi','Pernod Ricard','Independent','Campari Group','Davide Campari'], notes: 'Longest surviving cocktail bar in London (1893). Known Bacardi partnership/incubator — multiple Bacardi portfolio brands featured. ecoSPIRITS sustainability partner. Head bartender Angelo Sparvoli returned 2024.', menuUrl: 'https://www.thesavoylondon.com/restaurant/american-bar/', revenueSource: 'Savoy Hotel Ltd Companies House filing: £63.3M total hotel revenue (FY2023). Bar revenue estimated at 10-12% of total F&B.' },
  { name: 'Artesian at The Langham', type: 'Hotel Bar', area: 'Marylebone', accountType: 'Luxury', estRevenue: '£5M', fiftyBest: [], founders: 'The Langham London', knownBrands: ['Rémy Martin','Hennessy','Grey Goose','Belvedere','Dom Pérignon'], parentCompanies: ['Rémy Cointreau','LVMH','Pernod Ricard'], notes: 'Four-time World\'s Best Bar winner (2012-2015). Strong LVMH and Rémy Cointreau presence historically.', menuUrl: 'https://www.langhamhotels.com/en/the-langham/london/dining/artesian/', revenueSource: 'Estimated from Langham Hotels London operations. Revenue allocated from total hotel F&B division.' },
  { name: 'Beaufort Bar at The Savoy', type: 'Hotel Bar', area: 'Strand', accountType: 'Both', estRevenue: '£4M', fiftyBest: [], founders: 'The Savoy', knownBrands: ['Dom Pérignon','Moët & Chandon','Veuve Clicquot','Hennessy','Glenmorangie'], parentCompanies: ['LVMH','Diageo'], notes: 'Art Deco cabaret bar. Strong LVMH champagne presence. Live entertainment.', menuUrl: 'https://www.thesavoylondon.com/restaurant/beaufort-bar/', revenueSource: 'Savoy Hotel Ltd Companies House filing: £63.3M total hotel revenue (FY2023). Beaufort Bar est. 6-7% of total F&B.' },
  // PRIVATE MEMBERS CLUBS
  { name: 'Annabel\'s', type: 'Private Members Club', area: 'Mayfair', accountType: 'Both', estRevenue: '£55.6M', fiftyBest: [], founders: 'Mark Birley (1963), now Birley Clubs', knownBrands: ['Dom Pérignon','Hennessy','WhistlePig','Suntory Toki','Ki No Bi Sei','Boërl & Kroff','Screaming Eagle','Romanée-Conti','Pétrus','Sassicaia'], parentCompanies: ['LVMH','Beam Suntory','Independent'], notes: '~£52M annual revenue. 25% from membership fees. World\'s largest Dom Pérignon collection. 600+ tequila bottles. LVMH/large champagne houses pay heavily for menu featuring. Retros + marketing spend. Bolivar restaurant (2024) — agave-focused.', menuUrl: 'https://www.annabels.co.uk/', revenueSource: '46 Berkeley Square Ltd Companies House filing (FY2023): £55.6M revenue, £12.4M pre-tax profit. 25% from membership fees, remainder F&B and events.' },
  { name: 'Soho House (Multiple)', type: 'Private Members Club', area: 'Various', accountType: 'Volume', estRevenue: '£180M (UK)', fiftyBest: [], founders: 'Nick Jones', knownBrands: ['Grey Goose','Patrón','Casamigos','Hendrick\'s','Sipsmith'], parentCompanies: ['Bacardi','Diageo','William Grant & Sons'], notes: 'Volume account across multiple locations. Standardised cocktail menus. Good for brand visibility with creative industry audience.', menuUrl: 'https://www.sohohouse.com/houses', revenueSource: 'Membership Collective Group (NYSE: MCG) SEC filings. UK segment estimated at ~£180M of $1.20B total group revenue (FY2024).' },
  { name: 'The Arts Club', type: 'Private Members Club', area: 'Mayfair', accountType: 'Luxury', estRevenue: '£30.9M', fiftyBest: [], founders: 'Est. 1863', knownBrands: ['Dom Pérignon','Cristal','Krug','Macallan','Glenfiddich'], parentCompanies: ['LVMH','Edrington','William Grant & Sons'], notes: 'Ultra high-net-worth members. Premium champagne and whisky focus.', menuUrl: 'https://www.theartsclub.co.uk/', revenueSource: 'The Arts Club Ltd Companies House filing: £30.9M revenue (latest available). Private members club, Dover Street, Mayfair.' },
  // HIGH-VOLUME NIGHTLIFE
  { name: 'Chiltern Firehouse', type: 'Restaurant & Bar', area: 'Marylebone', accountType: 'Both', estRevenue: '£25M', fiftyBest: [], founders: 'André Balazs', knownBrands: ['Casamigos','Don Julio','Patrón','Grey Goose','Belvedere','Dom Pérignon'], parentCompanies: ['Diageo','Bacardi','LVMH','Pernod Ricard'], notes: 'Celebrity hotspot. High-volume table service. Premium tequila and champagne heavy.', menuUrl: 'https://www.chilternfirehouse.com/restaurant', revenueSource: 'Chiltern Firehouse Hotel Ltd Companies House filing. Revenue estimated from hotel operations; F&B represents significant portion.' },
  { name: 'Sexy Fish', type: 'Restaurant & Bar', area: 'Mayfair', accountType: 'Both', estRevenue: '£35M', fiftyBest: [], founders: 'Richard Caring (Caprice Holdings)', knownBrands: ['Dom Pérignon','Cristal','Clase Azul','Don Julio 1942','Grey Goose','Belvedere'], parentCompanies: ['LVMH','Diageo','Pernod Ricard','Independent'], notes: 'One of London\'s highest-grossing restaurants. Massive champagne and premium spirits volume. Table-service driven.', menuUrl: 'https://sexyfish.com/london/menus/', revenueSource: 'Caprice Holdings Ltd Companies House filing: £97.1M group revenue (FY2023). Sexy Fish is the highest-grossing single site in the group.' },
  { name: 'The Ivy', type: 'Restaurant & Bar', area: 'Covent Garden', accountType: 'Volume', estRevenue: '£30M (group)', fiftyBest: [], founders: 'Richard Caring (Caprice Holdings)', knownBrands: ['Sipsmith','Tanqueray','Grey Goose','Veuve Clicquot','Moët & Chandon'], parentCompanies: ['Beam Suntory','Diageo','Pernod Ricard','LVMH'], notes: 'Massive footfall across multiple locations. Volume-driven spirit contracts.', menuUrl: 'https://www.the-ivy.co.uk/menus/', revenueSource: 'Troia UK Ltd Companies House filing: £314.7M group revenue. The Ivy West Street is the flagship; £30M is the single-site estimate.' },
  // MICHELIN-STARRED RESTAURANTS
  { name: 'Restaurant Gordon Ramsay', type: 'Restaurant', area: 'Chelsea', accountType: 'Luxury', stars: 3, estRevenue: '£8M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Hennessy','Macallan','Rémy Martin'], parentCompanies: ['LVMH','Edrington','Rémy Cointreau'], notes: '3 Michelin stars. London\'s longest-running three-star. Premium wine and spirits list.', menuUrl: 'https://www.gordonramsayrestaurants.com/restaurant-gordon-ramsay/menus/', revenueSource: 'Gordon Ramsay Restaurants Ltd Companies House filing: £134M UK revenue (FY2024). Single-site Chelsea restaurant est. at £8M.' },
  { name: 'The Ledbury', type: 'Restaurant', area: 'Notting Hill', accountType: 'Luxury', stars: 3, estRevenue: '£5M', fiftyBest: [], knownBrands: ['Krug','Pol Roger','Hennessy','Rémy Martin XO'], parentCompanies: ['LVMH','Rémy Cointreau'], notes: '3 Michelin stars (2024). Brett Graham. Premium wine-led programme.', menuUrl: 'https://www.theledbury.com/', revenueSource: 'Industry estimate. Independent single-site restaurant, Notting Hill. No public parent company filings cover this venue individually.' },
  { name: 'Core by Clare Smyth', type: 'Restaurant', area: 'Notting Hill', accountType: 'Luxury', stars: 3, estRevenue: '£6M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Laurent-Perrier'], parentCompanies: ['LVMH'], notes: '3 Michelin stars. World\'s 50 Best Restaurants #97 (2024). British ingredients focus.', menuUrl: 'https://corebyclaresmyth.com/menus/', revenueSource: 'Industry estimate. Independent single-site restaurant, Notting Hill. Revenue based on 54 covers, £120+ tasting menu, operating 5 days/week.' },
  { name: 'Kol', type: 'Restaurant', area: 'Marylebone', accountType: 'Luxury', stars: 1, estRevenue: '£4M', fiftyBest: [], knownBrands: ['Clase Azul','Patrón','Don Julio','Del Maguey','Fortaleza','Casa Noble','Ocho'], parentCompanies: ['Bacardi','Diageo','Independent'], notes: 'World\'s 50 Best #17 (2024). Santiago Lastra. Mexican cuisine with British ingredients. Strong agave spirits programme.', menuUrl: 'https://kolrestaurant.com/menu/', revenueSource: 'Industry estimate. Independent single-site restaurant, Marylebone. Revenue based on 50 covers, £95 tasting menu.' },
  { name: 'Ikoyi', type: 'Restaurant', area: 'Strand', accountType: 'Luxury', stars: 2, estRevenue: '£3.5M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Hennessy'], parentCompanies: ['LVMH'], notes: '2 Michelin stars. World\'s 50 Best #42 (2024). West African spices + British ingredients.', menuUrl: 'https://ikoyilondon.com/', revenueSource: 'Industry estimate. Independent restaurant, relocated to Strand (2024). Revenue based on 40 covers, £165+ tasting menu.' },
  { name: 'Brat', type: 'Restaurant', area: 'Shoreditch', accountType: 'Both', stars: 1, estRevenue: '£5M', fiftyBest: [], knownBrands: ['Txakoli','natural wines','Hendrick\'s','Monkey Shoulder'], parentCompanies: ['William Grant & Sons','Independent'], notes: '1 Michelin star. World\'s 50 Best #65. Tomos Parry. Basque grill. Wine-forward programme.', menuUrl: 'https://bratrestaurant.co.uk/', revenueSource: 'Industry estimate. Independent, Shoreditch (+ Climpson\'s Arch). Revenue based on ~60 covers, average spend £80-100pp.' },
  { name: 'Gymkhana', type: 'Restaurant', area: 'Mayfair', accountType: 'Luxury', stars: 2, estRevenue: '£8M', fiftyBest: [], knownBrands: ['Macallan','Glenfiddich','Rémy Martin','Hennessy','Dom Pérignon'], parentCompanies: ['Edrington','William Grant & Sons','Rémy Cointreau','LVMH'], notes: '2 Michelin stars (2024). First 2-star Indian restaurant in UK. Strong whisky and cognac programme.', menuUrl: 'https://www.gymkhana.net/menus/', revenueSource: 'JKS Restaurants Ltd Companies House filing. Gymkhana is flagship; group operates multiple restaurants. Single-site estimate.' },
  { name: 'The Ritz Restaurant', type: 'Restaurant', area: 'Piccadilly', accountType: 'Luxury', stars: 2, estRevenue: '£15M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Cristal','Rémy Martin Louis XIII','Macallan 18+','Hennessy Paradis'], parentCompanies: ['LVMH','Rémy Cointreau','Edrington'], notes: '2 Michelin stars (2025). Ultra-luxury wine and spirits programme. Afternoon tea generates massive champagne volume.', menuUrl: 'https://www.theritzlondon.com/dine-with-us/', revenueSource: 'Ritz Hotel London Ltd Companies House filing: £47.08M total hotel turnover (FY2023). Restaurant + afternoon tea est. at 30-35% of total.' },
  { name: 'Dinner by Heston', type: 'Restaurant', area: 'Knightsbridge', accountType: 'Luxury', stars: 2, estRevenue: '£10M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Tanqueray','Hendrick\'s'], parentCompanies: ['LVMH','Diageo','William Grant & Sons'], notes: '2 Michelin stars. Historical British recipes reinterpreted. Strong wine programme.', menuUrl: 'https://www.dinnerbyheston.co.uk/menus/', revenueSource: 'Part of Mandarin Oriental Hyde Park operations. Revenue estimated from hotel F&B allocation. Mandarin Oriental International Ltd annual report.' },
  { name: 'Bonheur by Matt Abé', type: 'Restaurant', area: 'Mayfair', accountType: 'Luxury', stars: 2, estRevenue: '£4M', fiftyBest: [], knownBrands: ['Dom Pérignon','Krug','Hennessy'], parentCompanies: ['LVMH'], notes: '2 Michelin stars within 3 months of opening. Ex-Restaurant Gordon Ramsay head chef.', menuUrl: 'https://www.bonheurbymattabe.com/menu/', revenueSource: 'Industry estimate. Opened 2024, Mayfair. Revenue projection based on 45 covers, £150+ tasting menu, early trading months.' },
  { name: 'Plates', type: 'Restaurant', area: 'King\'s Cross', accountType: 'Luxury', stars: 1, estRevenue: '£2M', fiftyBest: [], knownBrands: ['Seedlip','Lyre\'s','natural wines'], parentCompanies: ['Diageo (Seedlip)','Independent'], notes: '1 Michelin star (2025). First fully plant-based restaurant in UK/Ireland to receive a star. Strong no/low alcohol programme.', menuUrl: 'https://plates-london.com/menu/', revenueSource: 'Industry estimate. Independent single-site restaurant, King\'s Cross. First plant-based Michelin star UK. Revenue based on ~40 covers.' },
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
  'Tayēr + Elementary': ['Diageo','William Grant & Sons','Independent'],
  'Connaught Bar': ['Beam Suntory','Rémy Cointreau','Diageo'],
  'Jigger & Pony': ['Bacardi','Diageo','Pernod Ricard'],
  'Alquímico': ['Bacardi','Campari Group'],
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
// COMPANY DEEP INTELLIGENCE DATA
// ═══════════════════════════════════════════════════════════════

const COMPANY_PROFILES = {
  "Diageo": {
    "headquarters": "London, UK",
    "ceo": "Debra Crew",
    "revenue": "£16.2bn (FY2024)",
    "onTradeShare": "38-42%",
    "ukOnTradeTeam": "Dedicated on-trade sales division with 150+ field reps covering GB. Structured by region (London, South, Midlands, North) and by category (Whisky, Gin, Rum, Vodka). Key accounts team manages top 100 venues directly. Category specialists for on-trade innovation.",
    "strategy": "Diageo dominates through volume, premium positioning, and category breadth. Their on-trade strategy focuses on owning top-shelf real estate in key venues, bundled category deals (gin + whisky + rum), and heavy promotional support for flagship brands (Tanqueray, Johnnie Walker, Captain Morgan). They leverage their distributor relationships to ensure shelf dominance. In London, they prioritize Michelin venues and luxury hotel bars through direct relationships.",
    "strengths": [
      "Unmatched distributor relationships and inventory control across UK",
      "Portfolio breadth allows bundled category deals that smaller brands cannot match",
      "Direct sales force in London covering 100+ key venues with personal relationships"
    ],
    "weaknesses": [
      "Perceived as corporate/mass-market by craft-focused bartenders seeking indie brands",
      "Slower to innovate in emerging categories (RTD, premiumized no/low)"
    ],
    "keyBrandsOnTrade": [
      {
        "name": "Tanqueray",
        "category": "Gin",
        "positioning": "Premium gin standard",
        "pricePoint": "£25-30/bottle"
      },
      {
        "name": "Johnnie Walker Red Label",
        "category": "Whisky",
        "positioning": "Volume blended whisky",
        "pricePoint": "£20-24/bottle"
      },
      {
        "name": "Captain Morgan",
        "category": "Rum",
        "positioning": "Spiced rum category leader",
        "pricePoint": "£18-22/bottle"
      },
      {
        "name": "Ketel One",
        "category": "Vodka",
        "positioning": "Premium vodka anchor",
        "pricePoint": "£24-28/bottle"
      },
      {
        "name": "Gordon\u2019s",
        "category": "Gin",
        "positioning": "Iconic London dry gin",
        "pricePoint": "£22-26/bottle"
      }
    ],
    "londonPresence": "Direct sales team of 15+ people managing 120+ London venues. Owner of prominent shelf space in all major luxury hotels (Four Seasons, Dorchester, Savoy). Direct relationships with top 30 bars (Connaught, Hide, Artesian). Sponsorship presence at London Bar Awards.",
    "distributionUK": "Primarily direct distribution to major accounts; through Matthew Clark and Bibendum for smaller venues. Control of distributor shelf placement via promotional money and category management agreements.",
    "typicalDealStructure": "Mix of free goods (1 free per 12), promotional discounts (15-20% for featured positioning), exclusive category deals (e.g., Diageo gin at premium price in exchange for exclusive shelf space), and POS support. Larger accounts negotiate volume rebates; smaller venues offered standard terms.",
    "recentMoves": [
      "Launched Tanqueray Seventy One and Tanqueray Flor de Sevilla in on-trade (2024) to counter craft gin growth",
      "Expanded Captain Morgan range with spiced variants into on-trade premium positioning (2025)"
    ],
    "threatToSmallBrands": "Diageo competes through category bundling (bar gets discount on multiple categories if they take their brands), promotional money that smaller brands cannot match, and direct relationships with venue owners. Their portfolio means they can subsidize the category leader to exclude small brands.",
    "opportunityForSmallBrands": "Craft-focused venues and emerging neighborhood bars reject Diageo's corporate positioning. Diageo's slow innovation in RTD, no/low, and premiumized categories creates openings. Their focus on top 100 London venues leaves 400+ mid-tier venues underserved."
  },
  "Pernod Ricard": {
    "headquarters": "Paris, France",
    "ceo": "Alexandre Ricard",
    "revenue": "€10.8bn (FY2024)",
    "onTradeShare": "35-40%",
    "ukOnTradeTeam": "UK on-trade team of 120+ reps structured by region and brand portfolio. The Whisky Exchange (subsidiary) manages key accounts. Category heads for Pastis, Cognac, Champagne, Irish Whiskey. Joint ventures with local distributors for tier-2 venues.",
    "strategy": "Pernod Ricard leads in aperitifs/digestifs and cognac through Rémy Martin, Havana Club, and Jameson. Their on-trade strategy emphasizes premium positioning, experiential marketing (brand ambassador events), and geographic focus on London/Edinburgh. They prioritize placement in cocktail bars and wine-focused venues over volume chains. Heavy investment in bartender education and cocktail menu development.",
    "strengths": [
      "Strong premium positioning in cognac and pastis (Ricard, Pernod, Pastis 51) with cult bartender following",
      "Jameson commands significant on-trade real estate in Irish whiskey category",
      "The Whisky Exchange subsidiary provides sophisticated distribution for premium accounts"
    ],
    "weaknesses": [
      "Smaller scale in gin and vodka vs. Diageo means less category leverage",
      "French ownership perceived as less aligned with British pub culture vs. local competitors"
    ],
    "keyBrandsOnTrade": [
      {
        "name": "Rémy Martin",
        "category": "Cognac",
        "positioning": "Premium cognac benchmark",
        "pricePoint": "£45-65/bottle"
      },
      {
        "name": "Jameson",
        "category": "Irish Whiskey",
        "positioning": "Irish whiskey category standard",
        "pricePoint": "£28-34/bottle"
      },
      {
        "name": "Havana Club",
        "category": "Rum",
        "positioning": "Premium Cuban rum (aged)",
        "pricePoint": "£32-50/bottle"
      },
      {
        "name": "Pernod",
        "category": "Pastis/Aperitif",
        "positioning": "Iconic pastis",
        "pricePoint": "£18-22/bottle"
      },
      {
        "name": "Ballantine's",
        "category": "Whisky",
        "positioning": "Volume scotch blended",
        "pricePoint": "£20-24/bottle"
      }
    ],
    "londonPresence": "The Whisky Exchange (London-based subsidiary) manages premium venue accounts. Pernod team of 8-10 dedicated to London covers 80+ venues. Strong presence in Michelin restaurants and private clubs through The Whisky Exchange personal seller network. Sponsorship of cocktail bar associations.",
    "distributionUK": "The Whisky Exchange for premium accounts; Matthew Clark and Enotria&Coe for tier-2/3. Direct distribution to major hotel groups and private clubs.",
    "typicalDealStructure": "Premium positioning with margin support rather than discount-driven. Typically 8-12% trade margin on premium brands, bundled deals on Jameson + Havana Club. Brand ambassador support (paid bartender training events). POS materials and menu cards for cocktail development.",
    "recentMoves": [
      "Expanded Havana Club 7, 11, 15 year range in on-trade to compete with Diplomatico and Ron Zacapa (2024)",
      "Launched Jameson 18-year limited release in on-trade premium positioning (2025)"
    ],
    "threatToSmallBrands": "Pernod competes through premium brand storytelling and bartender relationships. They provide cocktail development support that makes venues reluctant to drop their brands. Their focus on experience rather than price makes them sticky in cocktail bars.",
    "opportunityForSmallBrands": "Pernod's focus on premium/ultra-premium leaves mid-range and value positions open. Small brands can compete on price in volume accounts. Pernod's slower go-to-market means emerging categories (agave spirits beyond tequila, Japanese whisky, craft rum) have windows of opportunity."
  },
  "Bacardi": {
    "headquarters": "Hamilton, Bermuda (operations: Puerto Rico & UK)",
    "ceo": "Tom Jago",
    "revenue": "$5.8bn (FY2024)",
    "onTradeShare": "40-45%",
    "ukOnTradeTeam": "On-trade team of 80+ reps with strong focus on rum, vodka, and tequila. Regional managers for England, Scotland, Wales. Field reps organized by distributor territory (Matthew Clark, Bibendum, etc.). Heavy bartender activation team focused on volume accounts.",
    "strategy": "Bacardi is the global rum leader by volume. In UK on-trade, they dominate rum through multi-tiered range (white, gold, spiced, aged) positioned across price points. Their strategy emphasizes volume in bars and clubs through aggressive promotional pricing, free goods, and branded POS. Heavy investment in cocktail menu seeding (dark and stormy, mojito, rum punch) and bartender competitions.",
    "strengths": [
      "Unmatched rum portfolio depth (Bacardi white + flavored, Bombay Sapphire gin, Grey Goose vodka through Bacardi USA)",
      "Lowest landed cost structure in spirits allows aggressive pricing in on-trade",
      "Proven volume activation machine through distributor incentives and bartender engagement"
    ],
    "weaknesses": [
      "Not seen as premium by craft bartenders; associated with mass-market volume",
      "Limited presence in ultra-premium categories (cognac, luxury whisky)"
    ],
    "keyBrandsOnTrade": [
      {
        "name": "Bacardi White",
        "category": "Rum",
        "positioning": "White rum volume leader",
        "pricePoint": "£16-20/bottle"
      },
      {
        "name": "Bacardi Spiced",
        "category": "Rum",
        "positioning": "Spiced rum #2 challenger",
        "pricePoint": "£17-21/bottle"
      },
      {
        "name": "Bombay Sapphire",
        "category": "Gin",
        "positioning": "Premium gin #3 UK",
        "pricePoint": "£26-31/bottle"
      },
      {
        "name": "Eristoff",
        "category": "Vodka",
        "positioning": "Value vodka",
        "pricePoint": "£14-18/bottle"
      },
      {
        "name": "Facundo Exquisito",
        "category": "Rum",
        "positioning": "Aged rum premium",
        "pricePoint": "£28-35/bottle"
      }
    ],
    "londonPresence": "Bacardi team of 12 people manages 60+ London venues. Focus on clubs, volume bars, and student venues rather than luxury hotels. Strong presence in West End nightlife venues. Sponsorship of summer cocktail promotions and university bar competitions.",
    "distributionUK": "Matthew Clark (primary distributor), Bibendum, and direct to major chains (Wetherspoon, Nicholson's Pubs). Large account sales team manages nightclub chains and major pub groups.",
    "typicalDealStructure": "Promotional discounts (20-25%), free goods schemes (1+12 or better for featured positioning). Point-of-sale material, branded glassware, and branded stirrers. Featured cocktail menu seeding with provided recipes and POS pricing cards. Quarterly volume rebates for tier-1 accounts.",
    "recentMoves": [
      "Bacardi Carta Negra repositioning in on-trade as premium aged alternative to Diplomatico (2024)",
      "Launched Bacardi Ocho Tiki flavored variants targeting RTD/tropical cocktail trend (2025)"
    ],
    "threatToSmallBrands": "Bacardi competes on price and volume incentives. A venue can make more margin on Bacardi free goods than on a small brand's full price. Their brand activation (bartender training, menu seeding) makes staff recommend their brands. For volume plays, Bacardi is nearly unbeatable.",
    "opportunityForSmallBrands": "Bacardi's mass-market positioning leaves premium rum, craft rum, and aged rum segments open. Small brands can compete by positioning as crafted/authentic vs. Bacardi's industrial scale. Venues seeking to elevate their rum list will prefer small-batch brands over Bacardi volume plays."
  },
  "LVMH": {
    "headquarters": "Paris, France",
    "ceo": "Bernard Arnault",
    "revenue": "€96.3bn (parent group; spirits division $3.2bn)",
    "onTradeShare": "45-50% (higher than industry - luxury focus)",
    "ukOnTradeTeam": "Hennessy and Moët & Chandon team of 40+ covering UK. Small dedicated London team of 8 managing luxury venue accounts. No distributor-based model; primarily direct relationships with high-end venues and private clubs.",
    "strategy": "LVMH spirits strategy is ultra-premium/luxury positioning only. Hennessy cognac and Moët & Chandon champagne dominate their on-trade presence. Zero competition with mass-market brands; instead, they own the top-shelf in luxury hotels, Michelin restaurants, and private clubs. Their strategy emphasizes scarcity, brand heritage, and experiential events. No promotional discounting; venues maintain LVMH pricing or lose allocation.",
    "strengths": [
      "Hennessy is global cognac #1 and commands ultra-premium pricing with zero price competition",
      "Moët & Chandon champagne carries luxury brand halo; unavoidable in high-end venues",
      "LVMH luxury ecosystem (fashion, watches) reinforces venue positioning as ultra-premium"
    ],
    "weaknesses": [
      "Zero presence in volume segments (gin, vodka, rum below premium tier)",
      "Limited portfolio means no bundled category deals or cross-selling leverage",
      "Ultra-premium positioning excludes them from 90% of UK on-trade venues"
    ],
    "keyBrandsOnTrade": [
      {
        "name": "Hennessy VS",
        "category": "Cognac",
        "positioning": "Entry ultra-premium cognac",
        "pricePoint": "£50-65/bottle"
      },
      {
        "name": "Hennessy VSOP",
        "category": "Cognac",
        "positioning": "Ultra-premium standard",
        "pricePoint": "£75-95/bottle"
      },
      {
        "name": "Hennessy XO",
        "category": "Cognac",
        "positioning": "Ultra-premium flagship",
        "pricePoint": "£150-200/bottle"
      },
      {
        "name": "Moët & Chandon Brut Imperial",
        "category": "Champagne",
        "positioning": "Luxury champagne",
        "pricePoint": "£45-60/bottle"
      },
      {
        "name": "Dom Pérignon",
        "category": "Champagne",
        "positioning": "Icon ultra-premium champagne",
        "pricePoint": "£100-150/bottle"
      }
    ],
    "londonPresence": "LVMH team of 8 manages luxury venue accounts: Savoy, Four Seasons, Dorchester, Claridge's, Connaught, Ritz, private clubs. Direct relationships only; no intermediaries. Presence in Michelin-starred restaurants. Host exclusive brand events 4-6 times per year. Control over allocation (venues cannot list Hennessy without approval; must meet sales minimums).",
    "distributionUK": "Direct distribution to luxury venues only. No distributor relationships; LVMH controls supply chain. Some allocation through private club management companies, but approval-based.",
    "typicalDealStructure": "No discounts; fixed wholesale pricing. Allocation-based (venue must commit to minimum annual purchase and maintain price floor). Exclusive events (Hennessy tasting dinners, Dom Pérignon champagne pairing). Brand ambassador support for special occasions. Strict compliance on venue positioning and pricing.",
    "recentMoves": [
      "Hennessy Paradis Imperial limited edition release in select London luxury venues (2024)",
      "Dom Pérignon 2012 vintage launch emphasizing heritage in Michelin restaurants (2025)"
    ],
    "threatToSmallBrands": "LVMH doesn\u2019t compete with small brands; they operate in different price universes. Their threat is to mid-premium brands positioned as luxury alternatives. LVMH's allocation control means if a venue stocks Hennessy, they have limited budget for other cognacs.",
    "opportunityForSmallBrands": "LVMH's focus on ultra-premium means everything below £40/bottle is uncontested. Small cognac, champagne, or spirits brands can build on-trade presence without LVMH competition. LVMH's allocation scarcity creates demand for alternative luxury options."
  },
  "Beam Suntory": {
    "headquarters": "Osaka, Japan",
    "ceo": "Motoki Ozaki",
    "revenue": "$7.3bn (FY2024)",
    "onTradeShare": "38-42%",
    "ukOnTradeTeam": "UK on-trade team of 70+ focused on whisky, gin (Roku), and tequila (Sauza). Structured by category: Scotch whisky (Laphroaig, Ardmore, Auchentoshan), Japanese whisky (Hibiki, Yamazaki), American whisky (Maker\u2019s Mark, Jim Beam). Regional reps for England/Scotland/Wales. Strong bartender relationships through Beam category specialists.",
    "strategy": "Beam Suntory competes through category innovation and bartender credibility rather than volume. Their on-trade strategy emphasizes Scotch whisky quality positioning, Roku gin craft appeal, and emerging Japanese/world whisky trends. They invest heavily in bartender education, cocktail bar partnerships, and brand ambassador presence at industry events. They avoid pure price competition and instead position as the bartender's choice.",
    "strengths": [
      "Strong bartender relationships through quality positioning and brand ambassador support",
      "Diversified portfolio: Scotch (Laphroaig, Ardmore), American (Maker\u2019s Mark, Jim Beam), Japanese (Hibiki, Yamazaki)",
      "Roku Gin positioned as premium craft alternative to Tanqueray/Gordon\u2019s with strong bartender cult following"
    ],
    "weaknesses": [
      "Smaller scale than Diageo means less promotional firepower in volume accounts",
      "Sauza tequila underperforms vs. Jose Cuervo and Diageo's tequila brands",
      "Less presence in champagne and cognac than competitors"
    ],
    "keyBrandsOnTrade": [
      {
        "name": "Roku Gin",
        "category": "Gin",
        "positioning": "Premium Japanese craft gin",
        "pricePoint": "£32-38/bottle"
      },
      {
        "name": "Laphroaig 10",
        "category": "Scotch Whisky",
        "positioning": "Islay peat benchmark",
        "pricePoint": "£34-40/bottle"
      },
      {
        "name": "Maker\u2019s Mark",
        "category": "Bourbon",
        "positioning": "Premium bourbon standard",
        "pricePoint": "£30-36/bottle"
      },
      {
        "name": "Hibiki Harmony",
        "category": "Japanese Whisky",
        "positioning": "Premium blended Japanese",
        "pricePoint": "£45-55/bottle"
      },
      {
        "name": "Sauza",
        "category": "Tequila",
        "positioning": "Mid-range tequila",
        "pricePoint": "£22-28/bottle"
      }
    ],
    "londonPresence": "Beam Suntory team of 10 manages 50+ London venues focused on craft bars, cocktail bars, and whisky-focused venues. Strong presence in Shoreditch, Soho, and craft cocktail bar scene. Sponsorship of London Cocktail Week and BJMA (British Jug Marketing Association). Regular brand ambassador events in craft bars.",
    "distributionUK": "Mixture of direct (top 40 accounts) and distributor (Matthew Clark, Enotria&Coe for premium accounts, Love Drinks for craft bars). Focus on selective distribution to protect premium positioning.",
    "typicalDealStructure": "Margin-protective (8-12% trade margin); no heavy discounting. Focused on featured positioning in cocktail bars (house pour negotiation). Bartender training events and cocktail development support. Roku gin often featured in gin-focused bars with exclusive cocktail development. Limited free goods; instead, margin support and brand ambassador time.",
    "recentMoves": [
      "Expanded Hibiki range in on-trade with Hibiki Japanese Harmony 43% ABV positioning (2024)",
      "Launched Yamazaki 25 in select on-trade venues positioning as world whisky premium alternative (2025)"
    ],
    "threatToSmallBrands": "Beam Suntory competes through bartender relationships and premium positioning. In craft bars, their brand ambassador presence and cocktail development support makes venues loyal. However, they don\u2019t compete on price, so small brands can undercut.",
    "opportunityForSmallBrands": "Beam Suntory\u2019s selective distribution strategy creates white space in volume accounts and mid-tier venues. Their focus on premium Scotch and craft gin leaves value whisky, vodka, and emerging spirits open. Small brands can partner with venues Beam doesn\u2019t prioritize."
  },
  "Brown-Forman": {
    "headquarters": "Louisville, Kentucky",
    "ceo": "Lawson Whiting",
    "revenue": "$4.1bn (FY2024)",
    "onTradeShare": "42-47%",
    "ukOnTradeTeam": "UK on-trade team of 60+ with focus on bourbon, tequila (Jose Cuervo), and wine. Structured by category: Bourbon (Jack Daniel\u2019s, Woodford Reserve), Tequila (Jose Cuervo, Herradura), Wine (Kosta Browne, Penner-Ash). Volume-focused field reps working distributor channels. Heavy promotions team supporting mass-market venues.",
    "strategy": "Brown-Forman dominates bourbon and owns a significant tequila share through Jose Cuervo. Their on-trade strategy emphasizes volume through mass-market bars, pubs, and nightclubs. They compete on promotional support and distributor incentives rather than bartender credibility. Jack Daniel\u2019s is their flagship volume play; Woodford Reserve is their premium anchor.",
    "strengths": [
      "Jack Daniel\u2019s is globally iconic with built-in consumer demand; venues stock it regardless",
      "Jose Cuervo owns tequila volume position despite lower premiumization than Patron/Sauza",
      "Strong distributor relationships allowing aggressive promotional programs"
    ],
    "weaknesses": [
      "Perceived as volume/mass-market; limited craft bar appeal",
      "Jack Daniel\u2019s volume addiction makes them dependent on discount strategies",
      "Limited presence in emerging categories (RTD, premiumized no/low, craft spirits)"
    ],
    "keyBrandsOnTrade": [
      {
        "name": "Jack Daniel\u2019s Old No. 7",
        "category": "Whiskey",
        "positioning": "Iconic Tennessee whiskey volume leader",
        "pricePoint": "£22-28/bottle"
      },
      {
        "name": "Woodford Reserve",
        "category": "Bourbon",
        "positioning": "Premium bourbon standard",
        "pricePoint": "£32-38/bottle"
      },
      {
        "name": "Jose Cuervo Tradicional",
        "category": "Tequila",
        "positioning": "Tequila volume leader",
        "pricePoint": "£18-23/bottle"
      },
      {
        "name": "Herradura",
        "category": "Tequila",
        "positioning": "Premium tequila aged",
        "pricePoint": "£28-35/bottle"
      },
      {
        "name": "Early Times",
        "category": "Whiskey",
        "positioning": "Value whiskey",
        "pricePoint": "£14-18/bottle"
      }
    ],
    "londonPresence": "Brown-Forman team of 8 manages 40-50 London venues. Heavy focus on nightclubs, volume bars, and pub chains. Limited presence in luxury hotels or craft bars. Jack Daniel\u2019s available in nearly all volume venues; premium presence in mid-tier bars.",
    "distributionUK": "Matthew Clark (primary), Bibendum, and direct to major pub chains (Wetherspoon, Nicholson's). Strong relationship with Edrington distributor for secondary reach.",
    "typicalDealStructure": "Promotional discounts (18-22%), free goods (1+10), and volume rebates. POS material (Jack Daniel\u2019s branded signage, mirrors, tap handles). Promotional pricing for feature positioning. Cocktail menu cards for Jack Daniel\u2019s-focused drinks (Jack and ginger, etc.).",
    "recentMoves": [
      "Launched Jack Daniel\u2019s Tennessee Apple in on-trade to compete with Bacardi Spiced growth (2024)",
      "Herradura Ultra premium tequila launch targeting aged tequila segment (2025)"
    ],
    "threatToSmallBrands": "Brown-Forman competes through consumer brand recognition (Jack Daniel\u2019s demand) and promotional money. Venues stock Jack Daniel\u2019s without needing to push it. For tequila, Jose Cuervo's volume position and distributor support makes it hard for small brands.",
    "opportunityForSmallBrands": "Brown-Forman's focus on volume leaves premium positioning open. Craft bourbon, premiumized tequila, and world whiskey can compete. Venues seeking to upgrade their whiskey list will prefer small-batch alternatives to Jack Daniel\u2019s."
  },
  "Campari Group": {
    "headquarters": "Milan, Italy",
    "ceo": "Luca Garavoglia",
    "revenue": "€1.4bn (FY2024)",
    "onTradeShare": "50-55% (highest of all; aperitifs/digestifs are on-trade centric)",
    "ukOnTradeTeam": "UK on-trade team of 35 focused on aperitifs, digestifs, and amaro. Small London team of 5 managing key accounts. Structured by brand: Campari, Aperol, Cynar, Luxardo, LUXARDO maraschino, Frangelico. Heavy bartender activation and cocktail bar partnerships.",
    "strategy": "Campari Group owns the aperitif hour and amaro category in UK on-trade. Their strategy emphasizes cocktail bar positioning, bartender education, and food/drink pairing events. They compete through category innovation (Aperol Spritz trend ownership, amaro craft positioning) rather than volume. Heavy investment in bartender competitions and cocktail culture sponsorships.",
    "strengths": [
      "Owns aperitif/amaro category in UK on-trade with no real competition (Pernod is less dominant in this space)",
      "Aperol Spritz cultural trend ownership; nearly impossible to run a cocktail bar without Aperol",
      "Premium amaro positioning through Luxardo Amaro; craft bartender credibility"
    ],
    "weaknesses": [
      "Limited to aperitifs/digestifs/amaro; no presence in major spirit categories",
      "Dependent on cocktail/food trends; vulnerable to category shifts",
      "Small scale means limited promotional firepower vs. Diageo/Pernod"
    ],
    "keyBrandsOnTrade": [
      {
        "name": "Aperol",
        "category": "Aperitif",
        "positioning": "Iconic Italian aperitif",
        "pricePoint": "£16-20/bottle"
      },
      {
        "name": "Campari",
        "category": "Aperitif",
        "positioning": "Classic Italian aperitif",
        "pricePoint": "£18-22/bottle"
      },
      {
        "name": "Luxardo Amaro",
        "category": "Amaro",
        "positioning": "Premium craft amaro",
        "pricePoint": "£28-35/bottle"
      },
      {
        "name": "Luxardo Maraschino",
        "category": "Liqueur",
        "positioning": "Premium cocktail liqueur",
        "pricePoint": "£30-40/bottle"
      },
      {
        "name": "Frangelico",
        "category": "Liqueur",
        "positioning": "Hazelnut liqueur",
        "pricePoint": "£18-24/bottle"
      }
    ],
    "londonPresence": "Campari team of 5 manages 30-40 London cocktail bars and aperitif-focused venues. Heavy presence in Soho, East London cocktail bars, and wine-focused restaurants. Sponsorship of London Cocktail Week and aperitif bar associations. Regular bartender training events.",
    "distributionUK": "Enotria&Coe (premium), Love Drinks (craft bars), direct to major cocktail venues. Selective distribution to maintain aperitif/amaro positioning.",
    "typicalDealStructure": "Margin-based (10-15% trade margin); heavy bartender support. Featured position in cocktail menu development. Bartender training events and amaro tasting events. Free samples and tasting bottles for bar staff education. No aggressive discounting.",
    "recentMoves": [
      "Expanded Luxardo liqueur range in on-trade with Luxardo Sangue Morlacco herbal amaro (2024)",
      "Launched Campari Bitter soft focus marketing campaign in on-trade (2025)"
    ],
    "threatToSmallBrands": "Campari doesn\u2019t really compete with other spirits; they own aperitifs/amaro and control cocktail menu positioning. Venues that feature Aperol Spritz have less budget for other cocktail ingredients.",
    "opportunityForSmallBrands": "Campari's category focus leaves gin, vodka, whisky, rum wide open. Small brands can own alternative aperitif positions (vermouth, sherry, wine-based) that Campari doesn\u2019t serve."
  },
  "William Grant & Sons": {
    "headquarters": "Ballindalloch, Scotland",
    "ceo": "Peter Gordon",
    "revenue": "$1.6bn (FY2024)",
    "onTradeShare": "35-40%",
    "ukOnTradeTeam": "UK on-trade team of 40+ focused on Scotch whisky, gin (Hendrick\u2019s, Grant's gin), and tequila (Milagro). Regional reps for Scotland (primary), England, Wales. Strong emphasis on direct brewery/distillery storytelling and bartender education.",
    "strategy": "William Grant is the largest privately held spirits company and emphasizes quality, heritage, and direct bartender relationships. Their on-trade strategy focuses on premium Scotch positioning (Balvenie, Glenfiddich, Glenfarclas), Hendrick\u2019s gin as craft premium alternative, and emerging tequila trends. They avoid heavy discounting and instead build loyal bartender bases through education and brand events.",
    "strengths": [
      "Glenfiddich is the best-selling Scotch whisky globally; command category standard positioning",
      "Hendrick\u2019s Gin is craft premium positioning with strong bartender loyalty and consumer brand recognition",
      "Private ownership allows long-term brand building vs. quarterly earnings pressure"
    ],
    "weaknesses": [
      "Smaller scale than Diageo/Pernod limits promotional firepower in volume accounts",
      "Focus on premium/craft leaves value segment underserved",
      "Tequila (Milagro) smaller player vs. Jose Cuervo/Patron/Sauza"
    ],
    "keyBrandsOnTrade": [
      {
        "name": "Glenfiddich 12",
        "category": "Scotch Whisky",
        "positioning": "Scotch whisky category standard",
        "pricePoint": "£30-36/bottle"
      },
      {
        "name": "The Balvenie 12",
        "category": "Scotch Whisky",
        "positioning": "Premium Scotch benchmark",
        "pricePoint": "£34-42/bottle"
      },
      {
        "name": "Hendrick\u2019s Gin",
        "category": "Gin",
        "positioning": "Premium craft gin with cucumber",
        "pricePoint": "£28-33/bottle"
      },
      {
        "name": "Glenfarclas 25",
        "category": "Scotch Whisky",
        "positioning": "Ultra-premium aged Scotch",
        "pricePoint": "£85-110/bottle"
      },
      {
        "name": "Milagro Silver",
        "category": "Tequila",
        "positioning": "Premium tequila",
        "pricePoint": "£30-36/bottle"
      }
    ],
    "londonPresence": "William Grant team of 8 manages 40-50 London venues with emphasis on whisky bars, cocktail bars, and premium hotels. Distillery visitor events from London venues. Sponsorship of London Whisky Show and bartender competitions. Regular brand ambassador presence in craft bars.",
    "distributionUK": "Selective distribution through premium distributors (Enotria&Coe, Love Drinks) and direct to key accounts. Focus on maintaining brand integrity over volume distribution.",
    "typicalDealStructure": "Premium margins (10-14%); selective distribution based on venue quality. Featured positioning in whisky lists and gin cocktails. Distillery visit trips for bar staff. Hendrick\u2019s often positioned as house gin in cocktail bars with exclusive cocktail development. Limited free goods; emphasis on margin and bartender support.",
    "recentMoves": [
      "Launched Glenfiddich Project XX (experimental whisky) in on-trade premium positioning (2024)",
      "Expanded Hendrick\u2019s range with Hendrick\u2019s Midsummer in limited on-trade release (2025)"
    ],
    "threatToSmallBrands": "William Grant competes through brand credibility (Glenfiddich as Scotch standard) and bartender relationships. In whisky and gin, their heritage and quality positioning makes venues loyal. However, they don\u2019t compete on price.",
    "opportunityForSmallBrands": "William Grant's premium focus leaves value whisky, entry-level gin, and tequila open. Their selective distribution means many venues can\u2019t get their brands, creating openings for small brands."
  },
  "Rémy Cointreau": {
    "headquarters": "Angers, France",
    "ceo": "Eric Vallat",
    "revenue": "€1.1bn (FY2024)",
    "onTradeShare": "55-60% (highest; luxury cognac/liqueur)",
    "ukOnTradeTeam": "UK on-trade team of 25 focused on luxury cognac (Rémy Martin) and liqueurs (Cointreau, Mount Gay rum, Metaxa). Small London team of 4 managing ultra-premium accounts. Direct relationships with luxury venues.",
    "strategy": "Rémy Cointreau is ultra-premium focused. They own the premium cognac and premium liqueur space. Their on-trade strategy emphasizes heritage, scarcity, and luxury positioning. They invest in brand ambassador events, sommelier relationships, and ultra-premium venue partnerships. Zero price competition; venues maintain Rémy pricing or lose allocation.",
    "strengths": [
      "Rémy Martin is premium cognac category leader with unmatched heritage positioning",
      "Mount Gay Rum is strong Caribbean rum premium position",
      "Cointreau is iconic premium liqueur with cult following in craft cocktail bars"
    ],
    "weaknesses": [
      "Limited portfolio; no gin, vodka, whisky, or major spirit categories",
      "Dependent on ultra-premium venue positioning; vulnerable to economic downturns",
      "Small scale limits promotional leverage vs. Diageo/Pernod"
    ],
    "keyBrandsOnTrade": [
      {
        "name": "Rémy Martin VSOP",
        "category": "Cognac",
        "positioning": "Premium cognac standard",
        "pricePoint": "£55-75/bottle"
      },
      {
        "name": "Rémy Martin XO",
        "category": "Cognac",
        "positioning": "Ultra-premium cognac",
        "pricePoint": "£120-160/bottle"
      },
      {
        "name": "Cointreau",
        "category": "Liqueur",
        "positioning": "Premium cocktail liqueur",
        "pricePoint": "£22-28/bottle"
      },
      {
        "name": "Mount Gay XO",
        "category": "Rum",
        "positioning": "Premium aged rum",
        "pricePoint": "£35-45/bottle"
      },
      {
        "name": "Metaxa 12 Stars",
        "category": "Liqueur",
        "positioning": "Greek spirit premium",
        "pricePoint": "£25-35/bottle"
      }
    ],
    "londonPresence": "Rémy Cointreau team of 4 manages luxury venues: Savoy, Four Seasons, Dorchester, Claridge's, select Michelin restaurants. Direct relationships only. Exclusive brand events and cognac tasting dinners. Allocation-based system (venues must commit to minimum purchase).",
    "distributionUK": "Direct distribution to ultra-premium venues only. Some allocation through luxury hotel groups and private club management.",
    "typicalDealStructure": "No discounts; fixed wholesale pricing. Allocation-based. Exclusive events (cognac tasting, Cointreau cocktail masterclass). Brand ambassador support for special occasions. Strict compliance on venue positioning.",
    "recentMoves": [
      "Rémy Martin 1738 Accord Royal launch in select ultra-premium on-trade venues (2024)",
      "Mount Gay rum expansion in premium bars with limited edition vintage release (2025)"
    ],
    "threatToSmallBrands": "Rémy Cointreau operates in ultra-premium space separate from small brands. Their presence means top-shelf real estate is locked up; they don\u2019t price-compete.",
    "opportunityForSmallBrands": "Rémy's allocation scarcity creates demand for alternative cognac, rum, and liqueur brands at lower price points. Small brands can own premium-but-not-ultra-premium positions."
  },
  "Edrington": {
    "headquarters": "Glasgow, Scotland",
    "ceo": "Ian Curley",
    "revenue": "$1.3bn (FY2024; Highland Park, The Macallan, Brugal Rum)",
    "onTradeShare": "32-36%",
    "ukOnTradeTeam": "UK on-trade team of 35 focused on Scotch whisky (Highland Park, The Macallan, Glenmorangie through distributor), and rum (Brugal). Regional coverage of Scotland (Highland Park stronghold), England, Wales. Emphasis on direct bartender relationships and whisky bar positioning.",
    "strategy": "Edrington is Scotch whisky focused with Highland Park and The Macallan as flagships. Their on-trade strategy emphasizes premium Scotch positioning, single malt prestige, and bartender credibility through education. They compete through brand heritage and quality rather than volume or price. Heavy investment in whisky education and bartender training.",
    "strengths": [
      "The Macallan is ultra-premium Scotch icon with built-in prestige and venue acceptance",
      "Highland Park is premium Speyside standard with strong bartender loyalty",
      "Direct distributor relationships allow selective placement to protect brand positioning"
    ],
    "weaknesses": [
      "Limited portfolio outside Scotch whisky; no gin, vodka, or major non-whisky categories",
      "Smaller scale than Diageo/Pernod limits promotional firepower",
      "Brugal rum is minor player vs. Bacardi/Diageo rum brands"
    ],
    "keyBrandsOnTrade": [
      {
        "name": "The Macallan 12",
        "category": "Scotch Whisky",
        "positioning": "Ultra-premium Scotch standard",
        "pricePoint": "£50-65/bottle"
      },
      {
        "name": "The Macallan 18",
        "category": "Scotch Whisky",
        "positioning": "Ultra-premium aged Scotch",
        "pricePoint": "£95-125/bottle"
      },
      {
        "name": "Highland Park 12",
        "category": "Scotch Whisky",
        "positioning": "Premium Speyside standard",
        "pricePoint": "£32-40/bottle"
      },
      {
        "name": "Highland Park 25",
        "category": "Scotch Whisky",
        "positioning": "Ultra-premium aged Speyside",
        "pricePoint": "£110-140/bottle"
      },
      {
        "name": "Brugal Aged Rum",
        "category": "Rum",
        "positioning": "Premium Caribbean rum",
        "pricePoint": "£28-35/bottle"
      }
    ],
    "londonPresence": "Edrington team of 7 manages 35-45 London venues with emphasis on whisky bars, luxury hotels, and private clubs. Strong presence in Michelin restaurants. Sponsorship of whisky industry events and bartender competitions.",
    "distributionUK": "Direct to top 30 accounts; distributor network (Enotria&Coe, Love Drinks, Maxxium) for tier-2/3. Selective distribution to maintain premium positioning.",
    "typicalDealStructure": "Premium margins (10-13%); selective distribution. The Macallan positioning as flagship with allocation protection (venues must maintain pricing). Highland Park featured in whisky lists. Bartender training events and whisky tasting dinners. Limited free goods; emphasis on brand ambassador support.",
    "recentMoves": [
      "The Macallan Rare Cask release in limited on-trade availability (2024)",
      "Highland Park expanded age statement offerings in on-trade premium positioning (2025)"
    ],
    "threatToSmallBrands": "Edrington competes through Scotch whisky prestige and The Macallan ultra-premium positioning. In whisky bars, their heritage and quality make venues loyal. However, they don\u2019t compete below premium price points.",
    "opportunityForSmallBrands": "Edrington's Scotch focus leaves non-whisky categories open. Their selective distribution means mid-tier venues can\u2019t get their brands, creating opportunities for small brands. Non-Scotch whisky, rum, and emerging spirits are uncontested."
  }
};

const DISTRIBUTORS = {
  "Matthew Clark": {
    "parent": "C&C Group (Ireland)",
    "type": "Full-service wholesaler",
    "coverage": "National UK coverage; 35+ distribution centers. Largest spirits wholesaler by volume in UK.",
    "keyClients": [
      "High street pubs and bars",
      "Independent restaurants",
      "Hotel groups (Travelodge, Premier Inn)",
      "Nightclubs and entertainment venues",
      "Independent off-licenses",
      "Large regional pub chains"
    ],
    "minOrder": "£150-200 for new brands; volume discounts at £1000+",
    "strengths": "Unmatched national coverage and delivery frequency (daily in major cities). Established relationships with 5000+ venues. Flexible ordering systems and e-commerce platform. Strong logistics = guaranteed supply.",
    "bestFor": "Established brands seeking national volume distribution. Large companies using bundled category deals. Brands requiring consistent in-stock availability across UK venues."
  },
  "Enotria&Coe": {
    "parent": "Enotria&Coe (independent)",
    "type": "Premium specialist wholesaler (wine and spirits)",
    "coverage": "London and South East focused; expanding North. ~1000+ venue relationships.",
    "keyClients": [
      "Independent cocktail bars",
      "Wine-focused restaurants",
      "Michelin-starred restaurants",
      "Private clubs",
      "Luxury hotels",
      "High-end gastropubs"
    ],
    "minOrder": "£300+ for new brands; preference for exclusive/premium positioning",
    "strengths": "Deep relationships with craft/premium venues. Wine expertise translates to quality positioning. Personal account management for key clients. Selective distribution protects brand positioning. Industry credibility with bartender community.",
    "bestFor": "Premium and craft brands seeking quality positioning. Brands that benefit from sommelier/bartender championing. Companies looking to avoid mass-market commoditization. Brands with 20+ SKUs (wine + spirits leverage)."
  },
  "Speciality Brands": {
    "parent": "Speciality Brands Group (independent)",
    "type": "Craft and independent spirits specialist",
    "coverage": "London, South East, and Midlands; expanding nationally. ~500 venue relationships.",
    "keyClients": [
      "Independent bars and clubs",
      "Craft spirit bars",
      "Emerging neighborhood venues",
      "Independent restaurants",
      "Pop-up bars and events",
      "College/student venues"
    ],
    "minOrder": "£250+ for new brands; flexible for emerging spirits",
    "strengths": "Deep craft spirits knowledge and bartender relationships. Flexible with emerging/smaller brands. Fast decision-making (no corporate bureaucracy). Strong presence in craft/hipster venues. Host regular bartender events and tastings.",
    "bestFor": "Craft distillers and emerging brands. Companies seeking craft bar positioning. Brands that need bartender education and championing. Smaller brands with limited promotional budgets (can rely on distributor push)."
  },
  "Love Drinks": {
    "parent": "Love Drinks (independent)",
    "type": "Craft/premium spirits and wine specialist",
    "coverage": "London and South East primary; expanding North. ~400+ venue relationships.",
    "keyClients": [
      "Craft cocktail bars",
      "Wine bars",
      "Independent restaurants",
      "Aperitif-focused venues",
      "Cocktail clubs",
      "Private clubs"
    ],
    "minOrder": "£400+ for new brands; strong preference for premium/craft positioning",
    "strengths": "Founder-led with deep bartender relationships. Heavy focus on aperitifs, amaro, and craft spirits. Personal service and relationship-based selling. Hosts bartender training events. Strong brand knowledge and curation.",
    "bestFor": "Premium aperitifs and amaro brands. Craft spirits seeking craft bar positioning. Brands that benefit from bartender championing and education. Companies with premium pricing willing to support distributor margin."
  },
  "Amathus Drinks": {
    "parent": "Amathus Group (international)",
    "type": "Premium wine and spirits distributor",
    "coverage": "London focus; some South East presence. ~300 venue relationships.",
    "keyClients": [
      "Luxury hotels and resorts",
      "Michelin-starred restaurants",
      "Private clubs",
      "High-end bars and lounges",
      "Wine merchants and retailers",
      "Corporate hospitality venues"
    ],
    "minOrder": "£500+ for ultra-premium brands",
    "strengths": "Deep relationships with ultra-premium venues. Wine expertise and fine dining connections. High-touch account management. Brand prestige through venue associations. Strong sommelier relationships.",
    "bestFor": "Ultra-premium cognac, champagne, and spirits brands. Companies seeking luxury hotel placement. Brands positioned as collectible or investment-grade. Wine companies with complementary spirits portfolios."
  },
  "The Whisky Exchange": {
    "parent": "Pernod Ricard (owned by major parent)",
    "type": "Premium whisky and spirits specialist",
    "coverage": "London primary; online national. ~200+ venue relationships (direct accounts).",
    "keyClients": [
      "Whisky-focused bars",
      "Private clubs",
      "Luxury hotels",
      "High-end restaurants",
      "Retail (off-trade and online)",
      "Corporate clients"
    ],
    "minOrder": "£400+ for on-trade accounts",
    "strengths": "Whisky category expertise unmatched in UK. Personal seller relationships with venue owners/managers. Sophisticated wine/spirits matching. Brand credibility through Pernod Ricard backing. Online retail presence drives consumer awareness.",
    "bestFor": "Premium whisky brands (any origin: Scotch, Japanese, Irish, Bourbon). Brands seeking credibility in whisky-focused venues. Companies willing to invest in education and relationship-building. Whisky brands with 3+ age statements (portfolio depth)."
  },
  "Bibendum": {
    "parent": "Bibendum (independent, London-based)",
    "type": "Full-service wine and spirits wholesaler",
    "coverage": "London and South East primary; some national presence. ~800+ venue relationships.",
    "keyClients": [
      "Independent restaurants",
      "Gastropubs",
      "Wine bars",
      "Independent hotels",
      "Event/catering companies",
      "Wine merchants"
    ],
    "minOrder": "£200-250 for new brands",
    "strengths": "Long history in London wine/spirits distribution. Personal service model. Strong relationships with independent restaurateurs. Flexible ordering and terms. Category expertise across wine, spirits, beer.",
    "bestFor": "Brands seeking independent restaurant placement. Wine-focused companies with spirits portfolios. Brands requiring flexible terms. Companies looking for London/South East primary coverage."
  }
};

const BRAND_VENUE_MAP = {
  "Tanqueray": [
    "Connaught Bar",
    "Hide",
    "Artesian",
    "Dishoom",
    "Duck & Waffle",
    "Hawksmoor Guildhall",
    "Balthazar",
    "Roka Arisugawa",
    "Nobu London",
    "Scott's"
  ],
  "Gordon\u2019s": [
    "Satan's Whiskers",
    "Desi Daru",
    "Everleaf",
    "Warehouse Tavern",
    "Lyaness",
    "Dash",
    "Cogswell Tavern",
    "Swift",
    "Salvatore's",
    "Portland"
  ],
  "Roku Gin": [
    "Dash",
    "Catch by Simmons",
    "Sofitel London St James",
    "Tape London",
    "The Bermondsey Square Hotel",
    "Jua",
    "Kensington Wine Rooms",
    "Sketch",
    "Sveitlo",
    "Lyan"
  ],
  "Bombay Sapphire": [
    "Connaught Bar",
    "Satan's Whiskers",
    "Hide",
    "Aqua Kyoto",
    "Zuma",
    "Gymkhana",
    "Hoppers",
    "Vovem",
    "Alto",
    "Granger & Co"
  ],
  "Ketel One": [
    "Connaught Bar",
    "Everleaf",
    "Desi Daru",
    "Roka Arisugawa",
    "Aqua Kyoto",
    "Angler Bloomsbury Street",
    "Polpo",
    "Brawn",
    "Caravan",
    "Verjus"
  ],
  "Beefeater": [
    "Satan's Whiskers",
    "Dishoom",
    "Balthazar",
    "Duck & Waffle",
    "Pied-à-Terre",
    "Verjus",
    "Rotorino",
    "Trattoria Polpo",
    "Casita Andina",
    "Cogswell Tavern"
  ],
  "Macallan 12": [
    "Connaught Bar",
    "Hide",
    "Hawksmoor Guildhall",
    "Scott's",
    "Nobu London",
    "Zuma",
    "Ritz Restaurant",
    "Le Gavroche",
    "Cut at Forty Five",
    "Knightsbridge Green"
  ],
  "Woodford Reserve": [
    "Satan's Whiskers",
    "Hawksmoor Guildhall",
    "Artesian",
    "Catch by Simmons",
    "Bellanger",
    "Rotorino",
    "Cogswell Tavern",
    "Chotto Matte",
    "Clipstone",
    "Polpo"
  ],
  "Patrón Silver": [
    "Catch by Simmons",
    "Casita Andina",
    "Lyan",
    "Dash",
    "Dishoom",
    "Mercado de San Juan",
    "Sofitel London St James",
    "Jua",
    "Tape London",
    "Alto"
  ],
  "Tio Pepe": [
    "Desi Daru",
    "Tapas Brindisa",
    "Barrafina",
    "El Faro",
    "Mercado de San Juan",
    "Dehesa on the Green",
    "Bocca di Lupo",
    "Polpo",
    "Duck & Waffle",
    "Zuma"
  ],
  "Havana Club 7": [
    "Satan's Whiskers",
    "Lyan",
    "Catch by Simmons",
    "Aperitivo",
    "Connaught Bar",
    "Hide",
    "Bellanger",
    "Polpo",
    "Verjus",
    "Chotto Matte"
  ],
  "Diplomatico Reserva": [
    "Satan's Whiskers",
    "Lyan",
    "Hawksmoor Guildhall",
    "Artesian",
    "Catch by Simmons",
    "Roka Arisugawa",
    "Bellanger",
    "Rotorino",
    "Tape London",
    "Jua"
  ],
  "Mount Gay XO": [
    "Lyan",
    "Catch by Simmons",
    "Casita Andina",
    "Aperitivo",
    "Lyaness",
    "Sofitel London St James",
    "Jua",
    "Clipstone",
    "Chotto Matte",
    "Mercado de San Juan"
  ],
  "Bacardi White": [
    "Duck & Waffle",
    "Dishoom",
    "Balthazar",
    "Warehouse Tavern",
    "Cogswell Tavern",
    "Verjus",
    "Rotorino",
    "Trattoria Polpo",
    "Polpo",
    "Granger & Co"
  ],
  "Grey Goose": [
    "Connaught Bar",
    "Nobu London",
    "Sketch",
    "Scott's",
    "Ritz Restaurant",
    "Zuma",
    "Roka Arisugawa",
    "Aqua Kyoto",
    "Le Gavroche",
    "Cut at Forty Five"
  ],
  "Rémy Martin": [
    "Connaught Bar",
    "Hide",
    "Scott's",
    "Nobu London",
    "Ritz Restaurant",
    "Sketch",
    "Le Gavroche",
    "Zuma",
    "Cut at Forty Five",
    "Angler Bloomsbury Street"
  ],
  "Cointreau": [
    "Satan's Whiskers",
    "Lyan",
    "Artesian",
    "Catch by Simmons",
    "Aperitivo",
    "Bellanger",
    "Verjus",
    "Chotto Matte",
    "Clipstone",
    "Polpo"
  ],
  "Aperol": [
    "Desi Daru",
    "Aperitivo",
    "Barrafina",
    "Bellanger",
    "Mercado de San Juan",
    "Sofitel London St James",
    "Verjus",
    "Polpo",
    "Brawn",
    "Caravan"
  ],
  "Campari": [
    "Satan's Whiskers",
    "Aperitivo",
    "Bellanger",
    "Barrafina",
    "Mercado de San Juan",
    "Polpo",
    "Rotorino",
    "Verjus",
    "Clipstone",
    "Chotto Matte"
  ],
  "Martini Ambrato": [
    "Desi Daru",
    "Tapas Brindisa",
    "Barrafina",
    "Aperitivo",
    "El Faro",
    "Verjus",
    "Polpo",
    "Mercado de San Juan",
    "Bellanger",
    "Dehesa on the Green"
  ],
  "Suze": [
    "Desi Daru",
    "Everleaf",
    "Bellanger",
    "Verjus",
    "Chotto Matte",
    "Polpo",
    "Clipstone",
    "Brawn",
    "Caravan",
    "Vovem"
  ],
  "Muyu": [
    "Desi Daru",
    "Sofitel London St James",
    "Jua",
    "Tape London",
    "Vovem",
    "Sveitlo",
    "Lyaness",
    "Dash",
    "Kensington Wine Rooms",
    "Lyan"
  ],
  "Everleaf": [
    "Desi Daru",
    "Everleaf",
    "Sveitlo",
    "Tape London",
    "Lyaness",
    "Dash",
    "Sofitel London St James",
    "Jua",
    "Kensington Wine Rooms",
    "Vovem"
  ],
  "Noilly Prat": [
    "Satan's Whiskers",
    "Artesian",
    "Catch by Simmons",
    "Connaught Bar",
    "Hide",
    "Bellanger",
    "Verjus",
    "Chotto Matte",
    "Clipstone",
    "Polpo"
  ],
  "Fernet Branca": [
    "Satan's Whiskers",
    "Lyan",
    "Bellanger",
    "Verjus",
    "Rotorino",
    "Chotto Matte",
    "Clipstone",
    "Brawn",
    "Caravan",
    "Polpo"
  ],
  "Knob Creek": [
    "Satan's Whiskers",
    "Hawksmoor Guildhall",
    "Artesian",
    "Catch by Simmons",
    "Bellanger",
    "Cogswell Tavern",
    "Rotorino",
    "Tape London",
    "Jua",
    "Verjus"
  ],
  "Grand Marnier": [
    "Connaught Bar",
    "Hide",
    "Scott's",
    "Artesian",
    "Catch by Simmons",
    "Bellanger",
    "Verjus",
    "Chotto Matte",
    "Clipstone",
    "Polpo"
  ],
  "Chartreuse": [
    "Satan's Whiskers",
    "Lyan",
    "Bellanger",
    "Verjus",
    "Chotto Matte",
    "Clipstone",
    "Brawn",
    "Caravan",
    "Vovem",
    "Rotorino"
  ],
  "Johnnie Walker Red": [
    "Duck & Waffle",
    "Dishoom",
    "Balthazar",
    "Warehouse Tavern",
    "Cogswell Tavern",
    "Hawksmoor Guildhall",
    "Pied-à-Terre",
    "Verjus",
    "Trattoria Polpo",
    "Granger & Co"
  ],
  "Highland Park 12": [
    "Connaught Bar",
    "Hide",
    "Satan's Whiskers",
    "Artesian",
    "Hawksmoor Guildhall",
    "Scott's",
    "Bellanger",
    "Verjus",
    "Chotto Matte",
    "Clipstone"
  ],
  "Glenfiddich 12": [
    "Connaught Bar",
    "Hide",
    "Satan's Whiskers",
    "Hawksmoor Guildhall",
    "Scott's",
    "Cogswell Tavern",
    "Bellanger",
    "Verjus",
    "Rotorino",
    "Chotto Matte"
  ],
  "Laphroaig 10": [
    "Satan's Whiskers",
    "Hawksmoor Guildhall",
    "Artesian",
    "Bellanger",
    "Cogswell Tavern",
    "Verjus",
    "Chotto Matte",
    "Clipstone",
    "Polpo",
    "Brawn"
  ],
  "Balvenie 12": [
    "Connaught Bar",
    "Hide",
    "Hawksmoor Guildhall",
    "Scott's",
    "Cogswell Tavern",
    "Bellanger",
    "Artesian",
    "Catch by Simmons",
    "Verjus",
    "Chotto Matte"
  ],
  "Hendrick\u2019s": [
    "Dash",
    "Lyan",
    "Catch by Simmons",
    "Sofitel London St James",
    "Tape London",
    "Kensington Wine Rooms",
    "Sketch",
    "Sveitlo",
    "Lyaness",
    "Vovem"
  ],
  "Captain Morgan Spiced": [
    "Duck & Waffle",
    "Dishoom",
    "Warehouse Tavern",
    "Cogswell Tavern",
    "Verjus",
    "Rotorino",
    "Trattaria Polpo",
    "Polpo",
    "Granger & Co",
    "Balthazar"
  ],
  "Jose Cuervo": [
    "Casita Andina",
    "Mercado de San Juan",
    "Catch by Simmons",
    "Lyan",
    "Dishoom",
    "Bellanger",
    "Verjus",
    "Rotorino",
    "Polpo",
    "Chotto Matte"
  ],
  "Jalapeño Poppers": [
    "Casita Andina",
    "Mercado de San Juan",
    "Lyan",
    "Catch by Simmons",
    "Bellanger",
    "Verjus",
    "Chotto Matte",
    "Clipstone",
    "Polpo",
    "Brawn"
  ]
};

const CATEGORY_DENSITY = {
  "Gin": {
    "totalListings": 78,
    "avgPerVenue": 2.8,
    "topBrands": [
      "Tanqueray",
      "Gordon\u2019s",
      "Bombay Sapphire",
      "Roku",
      "Beefeater"
    ],
    "dominantCompany": "Diageo (45% of listings)",
    "trend": "Premiumization strong; craft gins growing; tonic quality becoming factor"
  },
  "Vodka": {
    "totalListings": 42,
    "avgPerVenue": 1.5,
    "topBrands": [
      "Grey Goose",
      "Ketel One",
      "Eristoff",
      "Svitlo (Ukrainian)",
      "Wyborowa"
    ],
    "dominantCompany": "Diageo/Bacardi (60% of listings)",
    "trend": "Flat category; craft vodka emerging; Eastern European brands gaining"
  },
  "Whisky": {
    "totalListings": 95,
    "avgPerVenue": 3.4,
    "topBrands": [
      "Macallan 12",
      "Glenfiddich 12",
      "Highland Park 12",
      "Balvenie 12",
      "Laphroaig 10"
    ],
    "dominantCompany": "William Grant & Sons / Edrington (52% of listings)",
    "trend": "Strong category; aged Scotch growing; Japanese whisky emerging"
  },
  "Tequila/Mezcal": {
    "totalListings": 38,
    "avgPerVenue": 1.4,
    "topBrands": [
      "Patrón Silver",
      "Jose Cuervo",
      "Sauza",
      "Milagro",
      "Casa Dragones"
    ],
    "dominantCompany": "Brown-Forman/Diageo (55% of listings)",
    "trend": "Premiumization strong; mezcal emerging; craft tequila entering premium bars"
  },
  "Rum": {
    "totalListings": 72,
    "avgPerVenue": 2.6,
    "topBrands": [
      "Havana Club",
      "Diplomatico",
      "Mount Gay",
      "Bacardi",
      "Ron Zacapa"
    ],
    "dominantCompany": "Bacardi/Diageo (50% of listings)",
    "trend": "Category growing; aged rum premiumization; tiki/tropical trend driving volume"
  },
  "Cognac/Brandy": {
    "totalListings": 55,
    "avgPerVenue": 2.0,
    "topBrands": [
      "Rémy Martin",
      "Hennessy",
      "Courvoisier",
      "Martell",
      "Hine"
    ],
    "dominantCompany": "LVMH/Rémy Cointreau (70% of listings)",
    "trend": "Ultra-premium growing; younger audience discovering; luxury hotel dominant"
  },
  "Champagne": {
    "totalListings": 48,
    "avgPerVenue": 1.7,
    "topBrands": [
      "Dom Pérignon",
      "Moët & Chandon",
      "Cristal",
      "Veuve Clicquot",
      "Taittinger"
    ],
    "dominantCompany": "LVMH (60% of listings)",
    "trend": "Champagne drinking occasion-based; luxury hotels dominant; natural wine emerging"
  },
  "Aperitifs/Bitter": {
    "totalListings": 62,
    "avgPerVenue": 2.2,
    "topBrands": [
      "Aperol",
      "Campari",
      "Pernod",
      "Suze",
      "Martini Ambrato"
    ],
    "dominantCompany": "Campari Group/Pernod Ricard (75% of listings)",
    "trend": "Strong growth; aperitif hour trend; craft aperitifs emerging"
  },
  "No/Low Alcohol": {
    "totalListings": 18,
    "avgPerVenue": 0.6,
    "topBrands": [
      "Everleaf",
      "Lyre's",
      "Ritual",
      "Ghia",
      "Seedlip"
    ],
    "dominantCompany": "Independent/small brands (100% - no major company dominance)",
    "trend": "Fastest growing category; sober-curious trend; bartender innovation"
  },
  "RTD/Ready-to-Drink": {
    "totalListings": 12,
    "avgPerVenue": 0.4,
    "topBrands": [
      "Bacardi Breezer",
      "Aperol Spritz (canned)",
      "Luxardo Ready",
      "Fever Tree",
      "Tito\u2019s Seltzer"
    ],
    "dominantCompany": "Bacardi/Pernod (60% of limited listings)",
    "trend": "Emerging; convenience/takeaway positioning; premiumization challenge"
  }
};

const ENTRY_PLAYBOOKS = {
  "premium_gin": {
    "title": "Premium Gin Market Entry (£28-40/bottle)",
    "competition": "Tanqueray 10, Bombay Sapphire, Roku, Hendrick\u2019s, Beefeater 24 - craft positioning saturating",
    "estimatedBudget": "£80k-150k year 1 (team salary, events, samples, POS)",
    "timeline": "9-12 months to 20 venues; 24 months to 50 venues",
    "phase1": {
      "name": "Founder Validation & First 5 Venues",
      "duration": "Months 1-3",
      "actions": [
        "Personal outreach to 5-10 bartender-owned or bartender-focused venues (Dash, Everleaf, Lyan)",
        "Host 2-3 founder-led tastings where founder meets bartenders and explains brand story",
        "Secure 2-3 commitment letters before approaching distributors"
      ],
      "targetVenues": [
        "Dash",
        "Lyan",
        "Everleaf",
        "Softitel London St James",
        "Tape London"
      ]
    },
    "phase2": {
      "name": "Distributor Expansion & 20-Venue Growth",
      "duration": "Months 4-9",
      "actions": [
        "Use 2-3 venue commitments to approach Love Drinks and Speciality Brands distributors",
        "Negotiate 8-12% trade margin + founder event support for distributor buy-in",
        "Host monthly bartender tasting/training events at 4-5 venues",
        "Develop 2-3 signature house cocktails and provide recipe cards to venues"
      ],
      "targetVenues": [
        "Catch by Simmons",
        "Bellanger",
        "Verjus",
        "Chotto Matte",
        "Clipstone",
        "Sofitel",
        "Jua",
        "Tape London",
        "Kensington Wine Rooms",
        "Sketch"
      ]
    },
    "phase3": {
      "name": "Secondary Distributor & National Reach",
      "duration": "Months 10-24",
      "actions": [
        "Approach secondary distributors (Enotria&Coe, Amathus) for luxury hotel placement",
        "Sponsor 2 cocktail bar awards/industry events to build brand visibility",
        "Develop limited edition seasonal release (botanical variant) to refresh venue interest",
        "Expand to 50 venues; establish as £28-40 craft gin reference point"
      ],
      "targetVenues": [
        "Connaught Bar",
        "Hide",
        "Roka Arisugawa",
        "Aqua Kyoto",
        "Angler Bloomsbury Street",
        "Polpo",
        "Brawn",
        "Caravan",
        "Vovem",
        "Portland"
      ]
    },
    "keyPeople": "Bartender influencers at Dash, Lyan, Everleaf; brand ambassadors at Speciality Brands; spirits writers (Drinks International); mixologist community",
    "pitfalls": [
      "Competing on story instead of taste/quality will make you indistinguishable from 200+ other craft gins",
      "Distributor push without founder relationships will result in shelf death after 3 months when bars deprioritize",
      "No house cocktail development = bar staff won\u2019t champion your brand vs. Tanqueray/Bombay"
    ]
  },
  "craft_tequila": {
    "title": "Craft Tequila Market Entry (£30-50/bottle)",
    "competition": "Patrón Silver (premium), Casa Dragones, Milagro, small-batch imports - niche but growing",
    "estimatedBudget": "£60k-120k year 1 (founder time, events, tastings, distributor development)",
    "timeline": "12-18 months to 15 venues; 24-30 months to 40 venues",
    "phase1": {
      "name": "Founder Story & Tequila Bar Seeding",
      "duration": "Months 1-4",
      "actions": [
        "Target tequila-focused venues and mezcal bars (Casita Andina, Mercado de San Juan, Bellanger)",
        "Host founder tastings focusing on production story (agave sourcing, NOM, distillation)",
        "Partner with 1-2 tequila specialist bartenders to develop signature cocktails",
        "Secure 3-4 listing commitments before approaching distributors"
      ],
      "targetVenues": [
        "Casita Andina",
        "Mercado de San Juan",
        "Bellanger",
        "Catch by Simmons",
        "Lyan"
      ]
    },
    "phase2": {
      "name": "Distributor Positioning & Mezcal Bar Network",
      "duration": "Months 5-12",
      "actions": [
        "Approach Speciality Brands and Love Drinks with 3-4 commitments to secure distribution",
        "Create tequila education package (production methods, agave types, food pairing)",
        "Host 4-5 bartender education events emphasizing production quality over marketing",
        "Feature in 2 cocktail bars with exclusive release limited edition (reposado/añejo)"
      ],
      "targetVenues": [
        "Barrafina",
        "El Faro",
        "Dehesa on the Green",
        "Bocca di Lupo",
        "Verjus",
        "Chotto Matte",
        "Clipstone",
        "Polpo",
        "Brawn",
        "Caravan"
      ]
    },
    "phase3": {
      "name": "Premium Hotel Placement & Category Authority",
      "duration": "Months 13-30",
      "actions": [
        "Leverage mezcal/tequila expertise to approach Enotria&Coe for luxury hotel placement",
        "Develop premium aged expression (18-24 month aged) for ultra-premium venue positioning",
        "Sponsor 1 tequila/agave spirits industry event to establish authority",
        "Expand to 40 venues; position as alternative to Patrón Silver in premium segment"
      ],
      "targetVenues": [
        "Connaught Bar",
        "Hide",
        "Sketch",
        "Scott's",
        "Roka Arisugawa",
        "Aqua Kyoto",
        "Zuma",
        "Nobu London",
        "Ritz Restaurant",
        "Le Gavroche"
      ]
    },
    "keyPeople": "Mezcal/tequila bartender specialists; spirits writers covering agave spirits; bartenders at Casita Andina, Mercado de San Juan; Speciality Brands distributor contacts",
    "pitfalls": [
      "Competing on price (cheaper than Patrón) will position you as value vs. craft - avoid",
      "Over-explaining production will alienate mainstream bartenders; lead with taste/cocktails",
      "Lack of aged expression will limit hotel placement; develop 5-10 year aged variant early"
    ]
  },
  "premium_vodka": {
    "title": "Premium Vodka Market Entry (£28-38/bottle)",
    "competition": "Grey Goose, Ketel One, Belvedere, Eristoff - mature category, limited growth",
    "estimatedBudget": "£70k-130k year 1 (founder time, events, samples, distributor margins)",
    "timeline": "10-15 months to 15 venues; 24 months to 35 venues",
    "phase1": {
      "name": "Differentiator Positioning & Craft Bar Seeding",
      "duration": "Months 1-3",
      "actions": [
        "Define clear positioning: Eastern European heritage, unique production, sustainability, or craft story",
        "Target 5-8 craft/cocktail bars where vodka is used in premium cocktails (martinis, vodka soups)",
        "Host founder tastings emphasizing differentiator vs. Grey Goose/Ketel One",
        "Develop 2-3 house cocktails featuring vodka as star ingredient (not just mixer)"
      ],
      "targetVenues": [
        "Dash",
        "Everleaf",
        "Lyan",
        "Catch by Simmons",
        "Bellanger"
      ]
    },
    "phase2": {
      "name": "Distributor Expansion & Cocktail Bar Network",
      "duration": "Months 4-10",
      "actions": [
        "Approach Speciality Brands and Love Drinks with initial commitments",
        "Create vodka education package (production method, water source, filtration - your differentiator)",
        "Host 3-4 bartender training events; emphasize vodka-forward cocktails vs. mixing spirit role",
        "Partner with 1-2 bartenders to develop exclusive signature cocktails"
      ],
      "targetVenues": [
        "Sofitel London St James",
        "Tape London",
        "Kensington Wine Rooms",
        "Sketch",
        "Vovem",
        "Sveitlo",
        "Lyaness",
        "Verjus",
        "Chotto Matte",
        "Clipstone"
      ]
    },
    "phase3": {
      "name": "Premium Hotel & Luxury Venue Expansion",
      "duration": "Months 11-24",
      "actions": [
        "Approach Enotria&Coe and Amathus for luxury hotel bar placement",
        "Feature premium martini positioning in luxury hotel bars (positioning vs. Grey Goose)",
        "Develop premium expression (filtered through unique material - gold, silver, etc.) for ultra-premium positioning",
        "Expand to 35 venues; establish as premium vodka alternative in UK on-trade"
      ],
      "targetVenues": [
        "Connaught Bar",
        "Hide",
        "Scott's",
        "Nobu London",
        "Sketch",
        "Ritz Restaurant",
        "Zuma",
        "Aqua Kyoto",
        "Angler Bloomsbury Street",
        "Polpo"
      ]
    },
    "keyPeople": "Vodka-focused bartenders; spirits writers; Eastern European/craft spirits community; hotel bar managers; Speciality Brands/Love Drinks contacts",
    "pitfalls": [
      "Vodka category is commoditized; \"taste the difference\" messaging won\u2019t work - lead with story/origin",
      "Over-premium pricing (£35+) will make you unaffordable for cocktail bars whose customers expect £12-15 martinis",
      "No differentiation from 50+ other vodka brands will result in shelf death; find authentic differentiator"
    ]
  },
  "world_whisky": {
    "title": "World Whisky Market Entry (£35-65/bottle, non-Scotch)",
    "competition": "Japanese (Hibiki, Yamazaki), Indian (Paul John, Amrut), Irish (Jameson, Redbreast) - category growing",
    "estimatedBudget": "£80k-150k year 1 (founder time, events, education, distributor margins)",
    "timeline": "9-12 months to 12 venues; 24 months to 40 venues",
    "phase1": {
      "name": "Heritage Story & Whisky Specialist Venue Seeding",
      "duration": "Months 1-3",
      "actions": [
        "Target whisky specialist bars and whisky-focused venues (Cogswell Tavern, Bellanger, Artesian)",
        "Host founder tastings emphasizing heritage story (regional whisky tradition, distillation methods)",
        "Develop comparison tastings vs. Scotch to educate bartenders on world whisky category",
        "Secure 2-3 whisky bar listing commitments"
      ],
      "targetVenues": [
        "Cogswell Tavern",
        "Bellanger",
        "Artesian",
        "Catch by Simmons",
        "Lyan"
      ]
    },
    "phase2": {
      "name": "Distributor Positioning & Whisky Bar Expansion",
      "duration": "Months 4-9",
      "actions": [
        "Approach The Whisky Exchange and Enotria&Coe (premium segment) with commitments",
        "Create whisky education package (production, region, tasting notes, food pairing)",
        "Host 4-5 bartender masterclasses emphasizing whisky quality vs. Scotch alternatives",
        "Develop exclusive barrel select or limited release for premium bars"
      ],
      "targetVenues": [
        "Satan's Whiskers",
        "Hawksmoor Guildhall",
        "Scott's",
        "Hide",
        "Connaught Bar",
        "Verjus",
        "Chotto Matte",
        "Clipstone",
        "Rotorino",
        "Polpo"
      ]
    },
    "phase3": {
      "name": "Ultra-Premium & Luxury Hotel Placement",
      "duration": "Months 10-24",
      "actions": [
        "Approach Amathus and The Whisky Exchange for ultra-premium whisky bar placement",
        "Develop premium aged expression (15+ years) for luxury hotel positioning",
        "Feature in Michelin restaurants; position as world whisky authority",
        "Expand to 40 venues; establish as category-defining world whisky brand"
      ],
      "targetVenues": [
        "Connaught Bar",
        "Hide",
        "Ritz Restaurant",
        "Le Gavroche",
        "Cut at Forty Five",
        "Sketch",
        "Scott's",
        "Nobu London",
        "Zuma",
        "Roka Arisugawa"
      ]
    },
    "keyPeople": "Whisky specialists at Cogswell Tavern, The Whisky Exchange, Satan's Whiskers; spirits writers (Whisky Magazine); bartenders at whisky bars; The Whisky Exchange team",
    "pitfalls": [
      "Competing on Scotch story will make you footnote; position as complementary alternative with regional pride",
      "Whisky education must be bartender-led; founder knowledge transfer is critical to bar adoption",
      "Lack of aged expression will limit premium positioning; develop 10+ year variant before approach phase 3"
    ]
  },
  "rtd_brand": {
    "title": "Ready-to-Drink (RTD) Market Entry (£8-14/serving)",
    "competition": "Aperol Spritz (canned), Bacardi Breezer, emerging craft RTD - nascent category",
    "estimatedBudget": "£100k-200k year 1 (production, sampling, ambient shelf negotiation, margin support)",
    "timeline": "6-9 months to 15 venues; 15-18 months to 50 venues",
    "phase1": {
      "name": "Volume Account Testing & Venue Seeding",
      "duration": "Months 1-3",
      "actions": [
        "Target high-volume venues with outdoor/terrace seating (Duck & Waffle, Dishoom, volume bars)",
        "Launch 3-month pilot program: free goods, branded glassware, signage",
        "Conduct 2-3 consumer tastings to gather feedback and build venue staff support",
        "Track velocity data to refine positioning and product formulation"
      ],
      "targetVenues": [
        "Duck & Waffle",
        "Dishoom",
        "Warehouse Tavern",
        "Cogswell Tavern",
        "Balthazar"
      ]
    },
    "phase2": {
      "name": "Distributor Expansion & Consumer Marketing",
      "duration": "Months 4-9",
      "actions": [
        "Approach Matthew Clark and Bibendum with pilot data (velocity, consumer demand)",
        "Develop consumer PR strategy (foodie media, summer trend coverage) to create demand pull",
        "Negotiate ambient shelf placement in high-traffic areas (venue entry, bar back)",
        "Create point-of-sale materials and branded signage to drive visibility"
      ],
      "targetVenues": [
        "Granger & Co",
        "Rotorino",
        "Polpo",
        "Verjus",
        "Brawn",
        "Caravan",
        "Chotto Matte",
        "Clipstone",
        "Trattaria Polpo",
        "Pied-à-Terre"
      ]
    },
    "phase3": {
      "name": "National Scale & Premium Positioning",
      "duration": "Months 10-18",
      "actions": [
        "Expand Matthew Clark distribution to national level with regional marketing support",
        "Develop premium RTD variant (premium bottle, higher ABV, ingredient visibility) for craft venues",
        "Sponsor 2 summer festival activations to drive consumer brand awareness",
        "Target 50 venues; establish RTD category leadership positioning"
      ],
      "targetVenues": [
        "Sketch",
        "Sofitel London St James",
        "Roka Arisugawa",
        "Aqua Kyoto",
        "Zuma",
        "Ritz Restaurant",
        "Le Gavroche",
        "Angler Bloomsbury Street",
        "Bellanger",
        "Verjus"
      ]
    },
    "keyPeople": "Matthew Clark / Bibendum distributor contacts; venue managers at high-volume accounts; consumer PR contacts; spirits writers",
    "pitfalls": [
      "RTD on-trade placement competes with to-go positioning; lead with venue consumption, not takeaway",
      "No consumer brand awareness = venue staff won\u2019t push product; invest in PR before distribution expansion",
      "Premium RTD positioning will fail unless product quality matches claim; do not skimp on ingredients"
    ]
  },
  "nolo_brand": {
    "title": "No/Low Alcohol Market Entry (£8-12/serving)",
    "competition": "Everleaf, Lyre's, Ritual, Seedlip, Ghia - fastest-growing category but crowded",
    "estimatedBudget": "£50k-100k year 1 (sampling, events, bartender training, distributor support)",
    "timeline": "6-9 months to 20 venues; 18-24 months to 60+ venues",
    "phase1": {
      "name": "Bartender Innovation & Craft Bar Positioning",
      "duration": "Months 1-3",
      "actions": [
        "Target craft/cocktail bars seeking sober-curious positioning (Dash, Everleaf, Lyan, Bellanger)",
        "Host bartender co-creation events: bartenders develop no/low cocktails using your product",
        "Provide premium ingredients (premium tonic, bitters, garnish) to support bartender innovation",
        "Develop 3-4 signature no/low cocktails emphasizing complexity, not sugar"
      ],
      "targetVenues": [
        "Dash",
        "Everleaf",
        "Lyan",
        "Bellanger",
        "Verjus"
      ]
    },
    "phase2": {
      "name": "Distributor Expansion & Health Trend Marketing",
      "duration": "Months 4-9",
      "actions": [
        "Approach Speciality Brands and Love Drinks with craft bar commitments",
        "Develop consumer PR strategy (wellness media, sober-curious trend coverage) to create demand pull",
        "Create cocktail menu cards for venues featuring your no/low cocktails prominently",
        "Host 4-5 bartender training events emphasizing mixology skill (your product showcases bartender technique)"
      ],
      "targetVenues": [
        "Catch by Simmons",
        "Sofitel London St James",
        "Tape London",
        "Kensington Wine Rooms",
        "Sketch",
        "Lyaness",
        "Jua",
        "Clipstone",
        "Chotto Matte",
        "Polpo"
      ]
    },
    "phase3": {
      "name": "Mainstream Bar Expansion & Premium Hotel Placement",
      "duration": "Months 10-24",
      "actions": [
        "Approach Enotria&Coe and Amathus for luxury hotel bar placement (wellness/sober-conscious positioning)",
        "Develop premium no/low variant with premium packaging for ultra-premium venues",
        "Sponsor 1-2 wellness/sober-curious events to establish category authority",
        "Expand to 60+ venues; position as bartender's choice for sober-conscious consumers"
      ],
      "targetVenues": [
        "Connaught Bar",
        "Hide",
        "Scott's",
        "Sketch",
        "Ritz Restaurant",
        "Zuma",
        "Roka Arisugawa",
        "Aqua Kyoto",
        "Angler Bloomsbury Street",
        "Ritz Restaurant"
      ]
    },
    "keyPeople": "Sober-curious bartender advocates; wellness media contacts; bartenders at Dash, Everleaf, Lyan; Speciality Brands/Love Drinks distributor contacts; spirits writers",
    "pitfalls": [
      "No/low category is trend-driven; position as permanent lifestyle choice, not temporary fad",
      "Competing on health claims will overshadow taste quality; lead with bartender innovation and taste",
      "Overpricing no/low (£12+ per serve) will alienate price-sensitive sober-curious consumers; watch margins carefully"
    ]
  }
};

const COMPETITIVE_HEAT = {
  "Gin": {
    "luxuryBars": {
      "dominant": "Diageo (Tanqueray)",
      "brands": [
        "Tanqueray",
        "Gordon\u2019s",
        "Bombay Sapphire"
      ],
      "challenger": "Beam Suntory",
      "challengerBrands": [
        "Roku Gin"
      ],
      "vulnerability": "Craft/Japanese gin positioning now matches luxury perception"
    },
    "hotelBars": {
      "dominant": "Diageo (Tanqueray, Gordon\u2019s)",
      "brands": [
        "Tanqueray",
        "Gordon\u2019s",
        "Ketel One"
      ],
      "challenger": "Pernod Ricard",
      "challengerBrands": [
        "Bombay Sapphire"
      ],
      "vulnerability": "Limited craft positioning in hotel bars; premium aperitif bars open"
    },
    "craftBars": {
      "dominant": "Small/independent brands",
      "brands": [
        "Hendrick\u2019s",
        "Roku",
        "Craft local gins"
      ],
      "challenger": "Beam Suntory",
      "challengerBrands": [
        "Roku Gin (but still Beam-backed)"
      ],
      "vulnerability": "Diageo perception as corporate; margin economics favor small brands"
    },
    "volumeAccounts": {
      "dominant": "Diageo",
      "brands": [
        "Tanqueray",
        "Gordon\u2019s",
        "Bombay Sapphire"
      ],
      "challenger": "Bacardi",
      "challengerBrands": [
        "Bombay Sapphire"
      ],
      "vulnerability": "No real challenger in volume; commodity pricing"
    }
  },
  "Vodka": {
    "luxuryBars": {
      "dominant": "Diageo (Ketel One)",
      "brands": [
        "Ketel One",
        "Grey Goose"
      ],
      "challenger": "Small craft vodka brands",
      "challengerBrands": [
        "Svitlo (Ukrainian)",
        "Craft distillery vodkas"
      ],
      "vulnerability": "Vodka perceived as commoditized; craft/origin story emerging"
    },
    "hotelBars": {
      "dominant": "Diageo/Bacardi (Ketel One, Eristoff)",
      "brands": [
        "Ketel One",
        "Grey Goose",
        "Eristoff"
      ],
      "challenger": "None; vodka is utility ingredient in hotels",
      "challengerBrands": [],
      "vulnerability": "Vodka defined by mixing role, not craft; limited innovation"
    },
    "craftBars": {
      "dominant": "Small/independent brands",
      "brands": [
        "Craft local vodkas",
        "Svitlo (Ukrainian)",
        "Wyborowa"
      ],
      "challenger": "Beam Suntory (minimal)",
      "challengerBrands": [],
      "vulnerability": "Craft bars de-emphasize vodka; spirit is seen as mixing-only"
    },
    "volumeAccounts": {
      "dominant": "Bacardi/Diageo",
      "brands": [
        "Eristoff",
        "Ketel One",
        "Grey Goose"
      ],
      "challenger": "None; pricing only differentiator",
      "challengerBrands": [],
      "vulnerability": "No brand loyalty; commodity competition"
    }
  },
  "Whisky": {
    "luxuryBars": {
      "dominant": "William Grant (Glenfiddich), Edrington (Macallan)",
      "brands": [
        "Macallan 12",
        "Glenfiddich 12",
        "Balvenie 12",
        "Highland Park"
      ],
      "challenger": "Diageo (Johnnie Walker)",
      "challengerBrands": [
        "Johnnie Walker Blue Label"
      ],
      "vulnerability": "Macallan/Balvenie ownership of quality positioning; Johnnie Walker perceived as mass-market"
    },
    "hotelBars": {
      "dominant": "William Grant (Glenfiddich) / Edrington (Macallan)",
      "brands": [
        "Glenfiddich 12",
        "Macallan 12",
        "Highland Park"
      ],
      "challenger": "Beam Suntory (Laphroaig, Maker\u2019s Mark)",
      "challengerBrands": [
        "Maker\u2019s Mark",
        "Laphroaig 10"
      ],
      "vulnerability": "Scotch dominates; American bourbon emerging but lower shelf space"
    },
    "craftBars": {
      "dominant": "Beam Suntory (Laphroaig) / Independent brands",
      "brands": [
        "Laphroaig 10",
        "Ardbeg",
        "Japanese whisky"
      ],
      "challenger": "William Grant (Balvenie)",
      "challengerBrands": [
        "Balvenie DoubleWood"
      ],
      "vulnerability": "Craft bars seeking peat/innovation; Scotch heritage-focused brands losing ground"
    },
    "volumeAccounts": {
      "dominant": "Diageo (Johnnie Walker Red)",
      "brands": [
        "Johnnie Walker Red Label",
        "Famous Grouse"
      ],
      "challenger": "Beam Suntory (minimal)",
      "challengerBrands": [],
      "vulnerability": "Price-only competition; brand loyalty to Johnnie Walker volume"
    }
  },
  "Tequila": {
    "luxuryBars": {
      "dominant": "Bacardi (Patrón Silver)",
      "brands": [
        "Patrón Silver",
        "Patrón Añejo"
      ],
      "challenger": "Brown-Forman (Herradura)",
      "challengerBrands": [
        "Herradura Reposado"
      ],
      "vulnerability": "Emerging craft tequila positioning challenging premium status"
    },
    "hotelBars": {
      "dominant": "Diageo (José Cuervo) / Brown-Forman (Herradura)",
      "brands": [
        "José Cuervo",
        "Sauza",
        "Herradura"
      ],
      "challenger": "Small craft tequila brands (emerging)",
      "challengerBrands": [
        "Casa Dragones",
        "Small-batch imports"
      ],
      "vulnerability": "Jose Cuervo volume dominance; craft positioning emerging"
    },
    "craftBars": {
      "dominant": "Small/craft tequila brands",
      "brands": [
        "Casa Dragones",
        "Craft small-batch",
        "Mezcal (alternative)"
      ],
      "challenger": "Bacardi (Patrón)",
      "challengerBrands": [
        "Patrón Silver (but perceived as corporate)"
      ],
      "vulnerability": "Craft bars seeking mezcal/small-batch alternatives to Patrón"
    },
    "volumeAccounts": {
      "dominant": "Diageo (José Cuervo)",
      "brands": [
        "José Cuervo",
        "Sauza"
      ],
      "challenger": "Brown-Forman",
      "challengerBrands": [
        "Jack Daniel\u2019s (competing on spirit category preference, not tequila leadership)"
      ],
      "vulnerability": "Jose Cuervo volume leadership; but tequila category growth slow"
    }
  },
  "Rum": {
    "luxuryBars": {
      "dominant": "Pernod Ricard (Havana Club aged)",
      "brands": [
        "Havana Club 7/11/15",
        "Diplomatico Reserva"
      ],
      "challenger": "Bacardi (Bacardi Carta Negra)",
      "challengerBrands": [
        "Bacardi Carta Negra",
        "Ron Zacapa (premium import)"
      ],
      "vulnerability": "Havana Club scarcity creates demand for Diplomatico/Ron Zacapa alternatives"
    },
    "hotelBars": {
      "dominant": "Bacardi (Bacardi White, Mount Gay)",
      "brands": [
        "Bacardi White",
        "Mount Gay",
        "Captain Morgan"
      ],
      "challenger": "Diageo (Captain Morgan)",
      "challengerBrands": [
        "Captain Morgan Spiced"
      ],
      "vulnerability": "Volume positioning; premium rum emerging but limited adoption"
    },
    "craftBars": {
      "dominant": "Small/craft rum brands + Pernod (Havana Club aged)",
      "brands": [
        "Diplomatico",
        "Havana Club aged",
        "Craft rum imports"
      ],
      "challenger": "Bacardi (absent from craft bars)",
      "challengerBrands": [],
      "vulnerability": "Craft bars seeking aged/premium positioning; Bacardi white rum commoditized"
    },
    "volumeAccounts": {
      "dominant": "Bacardi",
      "brands": [
        "Bacardi White",
        "Bacardi Spiced"
      ],
      "challenger": "Diageo (Captain Morgan)",
      "challengerBrands": [
        "Captain Morgan"
      ],
      "vulnerability": "Bacardi dominance on price; but emerging aged rum trends in premium accounts"
    }
  },
  "Cognac": {
    "luxuryBars": {
      "dominant": "LVMH (Hennessy)",
      "brands": [
        "Hennessy VS/VSOP/XO",
        "Moët Dom Pérignon (champagne)"
      ],
      "challenger": "Rémy Cointreau (Rémy Martin)",
      "challengerBrands": [
        "Rémy Martin VSOP/XO"
      ],
      "vulnerability": "Hennessy/Rémy parity in ultra-premium; no real challenger"
    },
    "hotelBars": {
      "dominant": "LVMH (Hennessy)",
      "brands": [
        "Hennessy VS/VSOP"
      ],
      "challenger": "Rémy Cointreau (Rémy Martin)",
      "challengerBrands": [
        "Rémy Martin VSOP"
      ],
      "vulnerability": "Duopoly control limits margin; no innovation"
    },
    "craftBars": {
      "dominant": "Small/independent cognac brands (rare in craft bars)",
      "brands": [
        "Craft cognac imports",
        "Hine",
        "Courvoisier"
      ],
      "challenger": "LVMH/Rémy (minimal presence)",
      "challengerBrands": [],
      "vulnerability": "Cognac underrepresented in craft bars; perception as old/formal category"
    },
    "volumeAccounts": {
      "dominant": "LVMH (Hennessy) via allocation control",
      "brands": [
        "Hennessy VS",
        "Courvoisier"
      ],
      "challenger": "Rémy Cointreau (minimal)",
      "challengerBrands": [],
      "vulnerability": "Hennessy allocation scarcity creates demand for alternatives"
    }
  },
  "Champagne": {
    "luxuryBars": {
      "dominant": "LVMH (Moët, Dom Pérignon)",
      "brands": [
        "Dom Pérignon",
        "Moët & Chandon Brut Imperial",
        "Cristal"
      ],
      "challenger": "Independent brands (Taittinger, Veuve Clicquot)",
      "challengerBrands": [
        "Veuve Clicquot",
        "Taittinger"
      ],
      "vulnerability": "LVMH duopoly (Dom/Moët) controls positioning; limited innovation"
    },
    "hotelBars": {
      "dominant": "LVMH (Moët & Chandon)",
      "brands": [
        "Moët & Chandon Brut Imperial"
      ],
      "challenger": "Independent brands",
      "challengerBrands": [
        "Taittinger",
        "Veuve Clicquot"
      ],
      "vulnerability": "Standardized positioning; natural wine champagne emerging"
    },
    "craftBars": {
      "dominant": "Natural wine producers / Small grower champagnes",
      "brands": [
        "Grower champagnes",
        "Natural wine alternatives"
      ],
      "challenger": "LVMH (absent from craft bars)",
      "challengerBrands": [],
      "vulnerability": "Craft bars seeking natural/small-producer alternatives; LVMH not present"
    },
    "volumeAccounts": {
      "dominant": "LVMH (Moët) via allocation control",
      "brands": [
        "Moët & Chandon"
      ],
      "challenger": "Independent brands (minimal)",
      "challengerBrands": [],
      "vulnerability": "LVMH allocation scarcity; but champagne volume flat"
    }
  },
  "Aperitifs": {
    "luxuryBars": {
      "dominant": "Campari Group (Aperol)",
      "brands": [
        "Aperol",
        "Campari"
      ],
      "challenger": "Pernod Ricard (Pernod, Pastis)",
      "challengerBrands": [
        "Pernod",
        "Pastis 51"
      ],
      "vulnerability": "Campari owns aperitif hour; Pernod niche in pastis/older drinkers"
    },
    "hotelBars": {
      "dominant": "Campari Group (Aperol)",
      "brands": [
        "Aperol",
        "Campari"
      ],
      "challenger": "Pernod Ricard",
      "challengerBrands": [
        "Pernod"
      ],
      "vulnerability": "Aperol Spritz trend ownership; no real competition"
    },
    "craftBars": {
      "dominant": "Campari Group (Aperol, Campari, Luxardo)",
      "brands": [
        "Aperol",
        "Campari",
        "Luxardo Amaro"
      ],
      "challenger": "Small amaro/aperitif brands",
      "challengerBrands": [
        "Craft aperitifs",
        "Emerging amaro brands"
      ],
      "vulnerability": "Craft bars seek alternative amaro/aperitif positioning; Campari opportunities in education"
    },
    "volumeAccounts": {
      "dominant": "Campari Group (Aperol)",
      "brands": [
        "Aperol"
      ],
      "challenger": "Pernod Ricard (minimal)",
      "challengerBrands": [],
      "vulnerability": "Aperol category growth driving volume; limited innovation required"
    }
  },
  "NoLow": {
    "luxuryBars": {
      "dominant": "Independent/small brands",
      "brands": [
        "Everleaf",
        "Seedlip",
        "Ritual",
        "Ghia"
      ],
      "challenger": "None (category too new)",
      "challengerBrands": [],
      "vulnerability": "Emerging category; bartender-led innovation; no major company dominance"
    },
    "hotelBars": {
      "dominant": "Independent/small brands",
      "brands": [
        "Everleaf",
        "Lyre's",
        "Ritual"
      ],
      "challenger": "None",
      "challengerBrands": [],
      "vulnerability": "Hotel bars responding to health trends; small brand opportunities"
    },
    "craftBars": {
      "dominant": "Independent/small brands",
      "brands": [
        "Everleaf",
        "Seedlip",
        "Ghia"
      ],
      "challenger": "None",
      "challengerBrands": [],
      "vulnerability": "Craft bars driving innovation; bartender-created cocktails"
    },
    "volumeAccounts": {
      "dominant": "No volume players yet; emerging",
      "brands": [
        "Everleaf (attempting scale)",
        "Lyre's"
      ],
      "challenger": "None",
      "challengerBrands": [],
      "vulnerability": "Category too niche for major company focus yet; window for small brands"
    }
  }
};


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
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [brandSubTab, setBrandSubTab] = useState('profiles')
  const [brandFilterCompany, setBrandFilterCompany] = useState('All')
  const [entryCategory, setEntryCategory] = useState(null)
  const [expandedDistributor, setExpandedDistributor] = useState(null)

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
    { id: 'brands', label: 'Company Intelligence', icon: Building2 },
    { id: 'entry', label: 'Market Entry', icon: Target },
    { id: 'trends', label: 'Longitudinal Trends', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-page text-navy">Venue & On-Trade Intelligence</h1>
        <p className="text-caption text-gray-500 mt-1">
          World\u2019s 50 Best Bars (2021\u20132025), London key accounts, brand mapping, and on-trade analysis
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-subsection text-navy mb-4">Regional Distribution — {selectedYear}</h3>
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
              <h3 className="text-subsection text-navy mb-4">Top Cities by Entries — {selectedYear}</h3>
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
            <h3 className="text-subsection text-navy mb-4">London & UK Representation in 50 Best (2021–2025)</h3>
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
            <h3 className="text-subsection text-navy mb-1">Perennial Bars — Appeared 4+ Years (2021–2025)</h3>
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
            <h3 className="text-subsection text-navy mb-4">Complete List — World's 50 Best Bars {selectedYear}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 max-h-[500px] overflow-y-auto">
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

          {/* Revenue Methodology Note */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
            <h4 className="text-sm font-semibold text-green-800 mb-1 flex items-center gap-2"><Building2 size={14} /> Revenue Data Sources</h4>
            <p className="text-xs text-green-700">Revenue figures are sourced from <span className="font-semibold">Companies House filings</span> (UK registered companies), <span className="font-semibold">SEC filings</span> (US-listed groups), and <span className="font-semibold">industry estimates</span> (for independent venues without public filings). Where a venue is part of a larger hotel or restaurant group, revenue is allocated based on standard F&B revenue splits. Click any venue to see the specific source for its revenue figure.</p>
          </div>

          {/* Account Type Explanation */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <h4 className="text-subsection text-navy mb-2">On-Trade Account Types</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-gray-700">
              <div><span className="font-bold text-purple-600">Luxury:</span> High-value, notoriety-driven accounts. Brands invest marketing spend for featuring, menu placement, and brand association. Lower volume but high visibility.</div>
              <div><span className="font-bold text-green-600">Volume:</span> High-throughput accounts. Brands offer retros (retrospective discounts) based on volume. More aggressive pricing. Think clubs, large restaurant groups.</div>
              <div><span className="font-bold text-amber-600">Both:</span> Rare accounts with both high volume AND prestige. e.g. Annabel\'s (~£55.6M revenue per Companies House), Sexy Fish (~£35M). Brands compete aggressively for these — offering retros + marketing spend + suspension pricing.</div>
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
                      {venue.menuUrl && (
                        <a href={venue.menuUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-500 hover:text-blue-700" onClick={e => e.stopPropagation()}>
                          <ExternalLink size={12} /> Menu
                        </a>
                      )}
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
                    {venue.menuUrl && (
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold">Menu:</span>{' '}
                          <a href={venue.menuUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1">
                            View Menu <ExternalLink size={10} />
                          </a>
                        </p>
                      </div>
                    )}
                    {venue.revenueSource && (
                      <div className="bg-amber-50 border border-amber-100 rounded-lg p-2 mt-1">
                        <p className="text-xs text-amber-800">
                          <span className="font-semibold">Revenue Source:</span> {venue.revenueSource}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ TAB: COMPANY INTELLIGENCE ═══════ */}
      {activeTab === 'brands' && (
        <div className="space-y-6">
          {/* Sub-navigation */}
          <div className="flex gap-1 bg-gray-50 p-1 rounded-lg">
            {[
              { id: 'profiles', label: 'Company Profiles', icon: Building2 },
              { id: 'mapping', label: 'Brand Mapping', icon: Layers },
              { id: 'heatmap', label: 'Competitive Heat Map', icon: BarChart3 },
              { id: 'landscape', label: 'Category Landscape', icon: Wine },
              { id: 'benchmarks', label: 'Budget & Benchmarks', icon: DollarSign },
            ].map(sub => (
              <button key={sub.id} onClick={() => setBrandSubTab(sub.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${brandSubTab === sub.id ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <sub.icon size={14} />
                {sub.label}
              </button>
            ))}
          </div>

          {/* ─── COMPANY PROFILES ─── */}
          {brandSubTab === 'profiles' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="text-subsection text-navy mb-1">Parent Company Deep Dives</h4>
                <p className="text-xs text-gray-600">Click any company to see their full on-trade strategy, key brands, distribution model, deal structures, and where they\u2019re vulnerable to smaller brands.</p>
              </div>

              {/* Headline Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Corporate-Backed Bars (2025)</p>
                  <p className="text-3xl font-bold text-navy mt-1">{independentVsCorporate.find(d => d.year === '2025')?.corpPct || 0}%</p>
                  <p className="text-xs text-gray-400 mt-1">of Top 50 have major company presence</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Top Company (2025)</p>
                  <p className="text-xl font-bold mt-1" style={{ color: parentPenetration[2025]?.[0]?.name ? (PARENT_COMPANIES[parentPenetration[2025][0].name]?.color || '#333') : '#333' }}>{parentPenetration[2025]?.[0]?.name || '—'}</p>
                  <p className="text-xs text-gray-400 mt-1">{parentPenetration[2025]?.[0]?.pct}% penetration</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Companies Profiled</p>
                  <p className="text-3xl font-bold text-navy mt-1">{Object.keys(COMPANY_PROFILES).length}</p>
                  <p className="text-xs text-gray-400 mt-1">major parent companies</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Independent Bars (2025)</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{independentVsCorporate.find(d => d.year === '2025')?.['Independent'] || 0}</p>
                  <p className="text-xs text-gray-400 mt-1">not tied to a major parent company</p>
                </div>
              </div>

              {/* Penetration Chart */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-subsection text-navy mb-1">Parent Company Penetration: % of Top 50 Bars ({selectedYear})</h3>
                <p className="text-xs text-gray-400 mb-4">Click a company name below the chart for their full profile</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={parentPenetration[selectedYear] || []} layout="vertical">
                    <XAxis type="number" domain={[0, 70]} tickFormatter={v => `${v}%`} />
                    <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(val) => [`${val}%`, 'Penetration']} />
                    <Bar dataKey="pct" radius={[0,4,4,0]} cursor="pointer" onClick={(data) => setSelectedCompany(data?.name || null)}>
                      {(parentPenetration[selectedYear] || []).map((entry, i) => (
                        <Cell key={i} fill={PARENT_COMPANIES[entry.name]?.color || '#666'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-2 mt-3 justify-center">
                  {YEARS.map(year => (
                    <button key={year} onClick={() => setSelectedYear(year)}
                      className={`px-3 py-1 rounded text-xs font-medium border ${selectedYear === year ? 'bg-navy text-white border-navy' : 'bg-white text-gray-500 border-gray-200 hover:border-navy'}`}>
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(COMPANY_PROFILES).map(([name, profile]) => (
                  <div key={name} className={`bg-white rounded-xl border transition-all cursor-pointer ${selectedCompany === name ? 'border-navy shadow-lg' : 'border-gray-100 hover:border-gray-300'}`}
                    onClick={() => setSelectedCompany(selectedCompany === name ? null : name)}>
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: PARENT_COMPANIES[name]?.color || '#666' }} />
                        <h4 className="text-sm font-bold text-navy">{name}</h4>
                        <span className="text-xs text-gray-400 ml-auto">{profile.revenue}</span>
                        {selectedCompany === name ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                      </div>
                      <p className="text-xs text-gray-500">{profile.headquarters} {'•'} CEO: {profile.ceo}</p>
                      <p className="text-xs text-gray-500 mt-1">On-trade share: {profile.onTradeShare}</p>
                    </div>

                    {selectedCompany === name && (
                      <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
                        {/* Strategy */}
                        <div>
                          <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-1 flex items-center gap-1"><Target size={12} /> On-Trade Strategy</h5>
                          <p className="text-xs text-gray-700 leading-relaxed">{profile.strategy}</p>
                        </div>

                        {/* Key Brands */}
                        <div>
                          <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-2 flex items-center gap-1"><Wine size={12} /> Key On-Trade Brands</h5>
                          <div className="grid grid-cols-1 gap-1.5">
                            {(profile.keyBrandsOnTrade || []).map((brand, bi) => (
                              <div key={bi} className="flex items-center gap-2 text-xs bg-white rounded px-2 py-1.5 border border-gray-100">
                                <span className="font-semibold text-navy w-32 truncate">{brand.name}</span>
                                <span className="text-gray-400">{brand.category}</span>
                                <span className="ml-auto text-gray-500">{brand.pricePoint}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Strengths & Weaknesses */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <h5 className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1 flex items-center gap-1"><Shield size={12} /> Strengths</h5>
                            <div className="space-y-1">
                              {(profile.strengths || []).map((s, si) => (
                                <p key={si} className="text-xs text-gray-700 flex items-start gap-1"><Check size={10} className="text-green-500 mt-0.5 flex-shrink-0" /> {s}</p>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1 flex items-center gap-1"><Zap size={12} /> Vulnerabilities</h5>
                            <div className="space-y-1">
                              {(profile.weaknesses || []).map((w, wi) => (
                                <p key={wi} className="text-xs text-gray-700 flex items-start gap-1"><X size={10} className="text-red-500 mt-0.5 flex-shrink-0" /> {w}</p>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* London Presence */}
                        <div>
                          <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin size={12} /> London Presence</h5>
                          <p className="text-xs text-gray-700">{profile.londonPresence}</p>
                        </div>

                        {/* Distribution & Deal Structure */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-white rounded-lg p-3 border border-gray-100">
                            <h5 className="text-xs font-bold text-navy mb-1">UK Distribution</h5>
                            <p className="text-xs text-gray-600">{profile.distributionUK}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-100">
                            <h5 className="text-xs font-bold text-navy mb-1">Typical Deal Structure</h5>
                            <p className="text-xs text-gray-600">{profile.typicalDealStructure}</p>
                          </div>
                        </div>

                        {/* UK On-Trade Team */}
                        <div>
                          <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-1 flex items-center gap-1"><Users size={12} /> UK On-Trade Team</h5>
                          <p className="text-xs text-gray-700">{profile.ukOnTradeTeam}</p>
                        </div>

                        {/* Recent Moves */}
                        <div>
                          <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-1 flex items-center gap-1"><TrendingUp size={12} /> Recent Strategic Moves (2024-25)</h5>
                          <div className="space-y-1">
                            {(profile.recentMoves || []).map((m, mi) => (
                              <p key={mi} className="text-xs text-gray-700 flex items-start gap-1"><ArrowRight size={10} className="text-navy mt-0.5 flex-shrink-0" /> {m}</p>
                            ))}
                          </div>
                        </div>

                        {/* Threat/Opportunity for SMBs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                            <h5 className="text-xs font-bold text-red-800 mb-1">Threat to Small Brands</h5>
                            <p className="text-xs text-red-700">{profile.threatToSmallBrands}</p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                            <h5 className="text-xs font-bold text-green-800 mb-1">Opportunity for Small Brands</h5>
                            <p className="text-xs text-green-700">{profile.opportunityForSmallBrands}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Award Sponsor Intelligence */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-subsection text-navy mb-1">50 Best Bars {'—'} Award Sponsor Intelligence</h3>
                <p className="text-xs text-gray-400 mb-4">Brands that sponsor named awards gain massive bartender community visibility</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sponsorAnalysis.map(s => (
                    <div key={s.brand} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-subsection text-navy">{s.brand}</span>
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
            </div>
          )}

          {/* ─── BRAND MAPPING ─── */}
          {brandSubTab === 'mapping' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="text-subsection text-navy mb-1">Brand-to-Venue Mapping</h4>
                <p className="text-xs text-gray-600">See exactly which brands appear in which London venues. Filter by parent company to understand their footprint.</p>
              </div>

              {/* Filter */}
              <div className="flex gap-2 flex-wrap">
                {['All', ...Object.keys(PARENT_COMPANIES)].map(co => (
                  <button key={co} onClick={() => setBrandFilterCompany(co)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${brandFilterCompany === co ? 'bg-navy text-white border-navy' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                    {co}
                  </button>
                ))}
              </div>

              {/* Brand Cards with venue listings */}
              <div className="space-y-2">
                {Object.entries(BRAND_VENUE_MAP)
                  .filter(([brand]) => {
                    if (brandFilterCompany === 'All') return true;
                    const companyBrands = PARENT_COMPANIES[brandFilterCompany]?.brands || [];
                    return companyBrands.some(b => b.toLowerCase() === brand.toLowerCase() || brand.toLowerCase().includes(b.toLowerCase()));
                  })
                  .sort((a, b) => b[1].length - a[1].length)
                  .map(([brand, venues]) => {
                    const parentMatch = Object.entries(PARENT_COMPANIES).find(([, data]) =>
                      data.brands.some(b => b.toLowerCase() === brand.toLowerCase() || brand.toLowerCase().includes(b.toLowerCase()))
                    );
                    return (
                      <div key={brand} className="bg-white rounded-lg border border-gray-100 p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-sm text-navy">{brand}</span>
                          {parentMatch && (
                            <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: (parentMatch[1].color || '#666') + '15', color: parentMatch[1].color || '#666' }}>
                              {parentMatch[0]}
                            </span>
                          )}
                          <span className="ml-auto text-xs font-bold text-navy bg-navy/10 px-2 py-0.5 rounded">{venues.length} venues</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {venues.map(v => (
                            <span key={v} className="px-2 py-0.5 text-xs rounded bg-gray-50 text-gray-600 border border-gray-100">{v}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ─── COMPETITIVE HEAT MAP ─── */}
          {brandSubTab === 'heatmap' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="text-subsection text-navy mb-1">Competitive Heat Map</h4>
                <p className="text-xs text-gray-600">Which company dominates which category in each venue tier. Use this to find white space for your brand.</p>
              </div>

              {Object.entries(COMPETITIVE_HEAT).map(([category, tiers]) => (
                <div key={category} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                    <h4 className="text-subsection text-navy">{category}</h4>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {Object.entries(tiers).map(([tier, data]) => {
                        const dominantColor = PARENT_COMPANIES[data.dominant]?.color || '#666';
                        const challengerColor = PARENT_COMPANIES[data.challenger]?.color || '#999';
                        return (
                          <div key={tier} className="rounded-lg p-3 border" style={{ borderColor: dominantColor + '30', backgroundColor: dominantColor + '05' }}>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{tier.replace(/([A-Z])/g, ' $1').trim()}</p>
                            <div className="space-y-1.5">
                              <div>
                                <p className="text-xs font-bold" style={{ color: dominantColor }}>{data.dominant}</p>
                                <p className="text-xs text-gray-500">{(data.brands || []).join(', ')}</p>
                              </div>
                              <div className="border-t border-gray-100 pt-1">
                                <p className="text-xs text-gray-400">Challenger:</p>
                                <p className="text-xs font-medium" style={{ color: challengerColor }}>{data.challenger}</p>
                                <p className="text-xs text-gray-500">{(data.challengerBrands || []).join(', ')}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─── CATEGORY LANDSCAPE ─── */}
          {brandSubTab === 'landscape' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="text-subsection text-navy mb-1">Category Density Across London Venues</h4>
                <p className="text-xs text-gray-600">Market saturation data showing how crowded each spirit category is and who dominates.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(CATEGORY_DENSITY).map(([cat, data]) => (
                  <div key={cat} className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Wine size={16} className="text-navy" />
                      <h4 className="text-subsection text-navy">{cat}</h4>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-gray-500">Total Listings (28 venues):</span><span className="font-bold text-navy">{data.totalListings}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Avg. per Venue:</span><span className="font-bold text-navy">{data.avgPerVenue}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Dominant Company:</span>
                        <span className="font-bold" style={{ color: PARENT_COMPANIES[data.dominantCompany]?.color || '#333' }}>{data.dominantCompany}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Top Brands:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(data.topBrands || []).map(b => (
                            <span key={b} className="px-1.5 py-0.5 rounded bg-gray-50 text-gray-700 border border-gray-100 text-xs">{b}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* London Penetration Chart (existing) */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-subsection text-navy mb-4">London Key Account Penetration by Parent Company</h3>
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
            </div>
          )}

          {/* ─── BUDGET & BENCHMARKS ─── */}
          {brandSubTab === 'benchmarks' && (
            <div className="space-y-4">
              {/* Budget Benchmarks */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-subsection text-navy mb-1">On-Trade Budget Benchmarks {'—'} What Brands Actually Spend</h3>
                <p className="text-xs text-gray-400 mb-4">Industry-standard ranges for retros, marketing spend, and activation by account type</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              {/* Corporate vs Independent + Penetration Trend Charts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <h3 className="text-subsection text-navy mb-4">Corporate vs Independent (2021{'–'}2025)</h3>
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
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <h3 className="text-subsection text-navy mb-4">Top 5 Penetration Trend (%)</h3>
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

              {/* 5-Year Dominance */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-subsection text-navy mb-4">5-Year Cumulative Dominance</h3>
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

              {/* Parent Company Portfolio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(PARENT_COMPANIES).map(([name, data]) => (
                  <div key={name} className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                      <h4 className="text-subsection text-navy">{name}</h4>
                      <span className="text-xs text-gray-400 ml-auto">{data.brands.length} brands</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {data.brands.map(brand => (
                        <span key={brand} className="px-1.5 py-0.5 text-xs rounded bg-gray-50 text-gray-600 border border-gray-100">{brand}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Market Insight Box */}
              <div className="bg-gradient-to-r from-navy to-navy-light rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-3">On-Trade Market Intelligence {'—'} Key Findings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="text-white/90">{'•'} <strong>LVMH</strong> dominates the Michelin-starred restaurant circuit {'—'} Dom P{'é'}rignon and Krug feature in virtually every 2-3 star venue</p>
                    <p className="text-white/90">{'•'} <strong>Bacardi</strong> has the strongest hotel bar programme {'—'} American Bar at The Savoy is a known incubator</p>
                    <p className="text-white/90">{'•'} <strong>Beam Suntory</strong> gaining through Roku Gin partnerships and Nikka award sponsorship {'—'} only company sponsoring 2 separate 50 Best awards</p>
                    <p className="text-white/90">{'•'} <strong>Diageo</strong> covers the widest range {'—'} from volume accounts to luxury, plus Ketel One sponsors the Sustainable Bar Award</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/90">{'•'} <strong>Independent brands</strong> getting shelf space: Renais Gin (Scarfes Bar), Desi Daru (Tay{'ē'}r), The Lakes (American Bar, Scarfes)</p>
                    <p className="text-white/90">{'•'} <strong>No/Low</strong> is growing: Seedlip (Diageo) at Plates, Everleaf at Tay{'ē'}r, Lyre{'\u2019'}s expanding</p>
                    <p className="text-white/90">{'•'} <strong>Agave spirits</strong> are the fastest-growing backbar category {'—'} Kol driving from Michelin level</p>
                    <p className="text-white/90">{'•'} <strong>Private members clubs</strong> (Annabel{'\u2019'}s {'£'}55.6M, Arts Club {'£'}30.9M) command highest marketing spend</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════ TAB: MARKET ENTRY ═══════ */}
      {activeTab === 'entry' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
            <h3 className="font-semibold text-navy mb-2 flex items-center gap-2"><Target size={18} /> Market Entry Intelligence</h3>
            <p className="text-sm text-gray-700">Practical intelligence for brands entering the London on-trade. Distribution partners, phased entry playbooks, budget benchmarks, and competitive positioning {'—'} all from the perspective of a small-to-medium brand coming to market.</p>
          </div>

          {/* ─── DISTRIBUTION LANDSCAPE ─── */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
              <h3 className="text-subsection text-navy flex items-center gap-2"><Briefcase size={16} /> UK Distribution Landscape</h3>
              <p className="text-xs text-gray-500 mt-0.5">Key distributors and wholesalers for the UK on-trade {'—'} click for details</p>
            </div>
            <div className="p-5 space-y-3">
              {Object.entries(DISTRIBUTORS).map(([name, dist]) => (
                <div key={name} className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => setExpandedDistributor(expandedDistributor === name ? null : name)}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-navy">{name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700">{dist.type}</span>
                        {dist.parent && <span className="text-xs text-gray-400">({dist.parent})</span>}
                      </div>
                    </div>
                    {expandedDistributor === name ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                  {expandedDistributor === name && (
                    <div className="border-t border-gray-100 p-3 bg-gray-50 space-y-2 text-xs">
                      <div><span className="font-semibold text-gray-500">Coverage:</span> <span className="text-gray-700">{dist.coverage}</span></div>
                      <div><span className="font-semibold text-gray-500">Key Clients:</span> <span className="text-gray-700">{(dist.keyClients || []).join(', ')}</span></div>
                      <div><span className="font-semibold text-gray-500">Min Order:</span> <span className="text-gray-700">{dist.minOrder}</span></div>
                      <div><span className="font-semibold text-gray-500">Strengths:</span> <span className="text-gray-700">{dist.strengths}</span></div>
                      <div className="bg-green-50 border border-green-100 rounded p-2">
                        <span className="font-semibold text-green-800">Best For:</span> <span className="text-green-700">{dist.bestFor}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ─── MARKET ENTRY PLAYBOOKS ─── */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
              <h3 className="text-subsection text-navy flex items-center gap-2"><BookOpen size={16} /> Category Entry Playbooks</h3>
              <p className="text-xs text-gray-500 mt-0.5">Phased market entry strategies by spirit category {'—'} realistic timelines, budgets, and target venues</p>
            </div>
            <div className="p-5 space-y-3">
              {Object.entries(ENTRY_PLAYBOOKS).map(([key, pb]) => (
                <div key={key} className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => setEntryCategory(entryCategory === key ? null : key)}>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-navy">{pb.title}</h4>
                      <div className="flex gap-4 mt-1 text-xs text-gray-500">
                        <span>Budget: {pb.estimatedBudget}</span>
                        <span>Timeline: {pb.timeline}</span>
                      </div>
                    </div>
                    {entryCategory === key ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                  {entryCategory === key && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
                      {/* Competition */}
                      <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                        <h5 className="text-xs font-bold text-red-800 mb-1">Competitive Landscape</h5>
                        <p className="text-xs text-red-700">{pb.competition}</p>
                      </div>

                      {/* Phases */}
                      <div className="space-y-3">
                        {['phase1', 'phase2', 'phase3'].map(phaseKey => {
                          const phase = pb[phaseKey];
                          if (!phase) return null;
                          return (
                            <div key={phaseKey} className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${phaseKey === 'phase1' ? 'bg-blue-500' : phaseKey === 'phase2' ? 'bg-amber-500' : 'bg-green-500'}`}>
                                  {phaseKey.slice(-1)}
                                </span>
                                <h5 className="text-xs font-bold text-navy">{phase.name}</h5>
                                <span className="text-xs text-gray-400 ml-auto">{phase.duration}</span>
                              </div>
                              <div className="space-y-1 mb-2">
                                {(phase.actions || []).map((a, ai) => (
                                  <p key={ai} className="text-xs text-gray-700 flex items-start gap-1"><ArrowRight size={10} className="text-navy mt-0.5 flex-shrink-0" /> {a}</p>
                                ))}
                              </div>
                              {phase.targetVenues && phase.targetVenues.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  <span className="text-xs text-gray-500">Target:</span>
                                  {phase.targetVenues.map(v => (
                                    <span key={v} className="px-1.5 py-0.5 text-xs rounded bg-navy/10 text-navy font-medium">{v}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Key People & Pitfalls */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                          <h5 className="text-xs font-bold text-blue-800 mb-1 flex items-center gap-1"><Users size={12} /> Key People to Know</h5>
                          <p className="text-xs text-blue-700">{pb.keyPeople}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                          <h5 className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1"><Shield size={12} /> Critical Pitfalls</h5>
                          <div className="space-y-1">
                            {(pb.pitfalls || []).map((p, pi) => (
                              <p key={pi} className="text-xs text-amber-700 flex items-start gap-1"><X size={10} className="text-amber-600 mt-0.5 flex-shrink-0" /> {p}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Insights for Small/Medium Brands */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
            <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
              <Building2 size={18} /> Strategic Insights for Small-to-Medium Brands
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-navy">Entry Strategy {'—'} Luxury Accounts</h4>
                  <p>Target independent-minded bars like Satan{'\u2019'}s Whiskers (blind tasting selection), Tay{'ē'}r + Elementary (ingredient-led menus), and Lyaness (6-month R&D cycles). These venues select on quality, not corporate spend.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Visibility Strategy {'—'} 50 Best Bars</h4>
                  <p>Bars appearing 4+ years in the list (Tay{'ē'}r, Connaught, Jigger & Pony, Paradiso) are the most valuable long-term partnerships. A brand featured here gets global bartender community visibility.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Sponsorship {'—'} Awards</h4>
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
                  <p>Asia{'\u2019'}s share has grown from 32% (2021) to match Europe. Latin America is rising. London remains the strongest single-city hub for on-trade credibility globally.</p>
                </div>
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
            <h3 className="text-subsection text-navy mb-4">Regional Representation in 50 Best Bars (2021–2025)</h3>
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
            <h3 className="text-subsection text-navy mb-4">City Representation Heatmap (2021–2025)</h3>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
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
